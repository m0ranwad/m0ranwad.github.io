// Fail when a photo in src/assets/ carries location or author metadata.
//
// The site only serves resized copies, which carry no metadata. But the
// original files are committed to this public repository, so a phone photo
// with GPS coordinates would publish where it was taken (often the owner's
// kitchen), and an author field can carry a full name. CLAUDE.md's privacy
// rule forbids both. Checks EXIF and TIFF tags (GPS, Artist), XMP (GPS,
// creator, artist, creator contact; any namespace prefix) and IPTC (by-line).
//
// Usage: node scripts/check-photo-metadata.mjs

import { readdirSync, readFileSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = fileURLToPath(new URL('..', import.meta.url));
const assets = join(root, 'src', 'assets');

/** @param {string} dir @returns {string[]} */
function walk(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? walk(join(dir, e.name)) : [join(dir, e.name)],
  );
}

/**
 * Tags present in IFD0 of an EXIF block.
 * @param {Buffer} exif
 * @returns {Set<number>}
 */
function exifTags(exif) {
  const start = exif.subarray(0, 6).toString('latin1') === 'Exif\0\0' ? 6 : 0;
  const tiff = exif.subarray(start);
  if (tiff.length < 8) return new Set();
  const little = tiff.subarray(0, 2).toString('latin1') === 'II';
  const u16 = (o) => (little ? tiff.readUInt16LE(o) : tiff.readUInt16BE(o));
  const u32 = (o) => (little ? tiff.readUInt32LE(o) : tiff.readUInt32BE(o));
  const ifd = u32(4);
  if (ifd + 2 > tiff.length) return new Set();
  const tags = new Set();
  const count = u16(ifd);
  for (let i = 0; i < count && ifd + 2 + i * 12 + 2 <= tiff.length; i++) tags.add(u16(ifd + 2 + i * 12));
  return tags;
}

const GPS_IFD = 0x8825;
const ARTIST = 0x013b;

// XMP fields that hold a location or a person, matched by local name with
// any namespace prefix (prefixes are only aliases in XML), as an element
// or as an attribute with a value. GPSLatitude/Longitude are EXIF's,
// creator is Dublin Core's, Artist is TIFF's, CreatorContactInfo is IPTC
// Core's (it can hold an address).
const XMP_GPS_NAMES = 'GPSLatitude|GPSLongitude';
const XMP_AUTHOR_NAMES = 'creator|Artist|CreatorContactInfo';
const xmpField = (names) => [
  new RegExp(String.raw`<(?:[\w.-]+:)?(?:${names})(?=[\s>/])`),
  new RegExp(String.raw`\s(?:[\w.-]+:)?(?:${names})\s*=\s*("[^"]+"|'[^']+')`),
];
const XMP_GPS = xmpField(XMP_GPS_NAMES);
const XMP_AUTHOR = xmpField(XMP_AUTHOR_NAMES);

const problems = [];
const photos = walk(assets).filter((f) => /\.(jpe?g|png|webp|tiff?|heic|heif|avif)$/i.test(f));
for (const file of photos) {
  const name = relative(root, file).split(sep).join('/');
  let meta;
  try {
    meta = await sharp(file).metadata();
  } catch {
    problems.push(`${name}: can't be read as an image`);
    continue;
  }
  const found = [];
  const raw = readFileSync(file);
  // EXIF from sharp; a TIFF file is itself a TIFF structure, and sharp
  // doesn't expose its IFD0 tags, so read those from the file
  const ifd0 = new Set([
    ...(meta.exif ? exifTags(meta.exif) : []),
    ...(/\.tiff?$/i.test(file) ? exifTags(raw) : []),
  ]);
  if (ifd0.has(GPS_IFD)) found.push('GPS location');
  if (ifd0.has(ARTIST)) found.push('author (EXIF Artist)');
  // XMP is plain XML text wherever it is stored, so also search the file's
  // bytes: that covers containers sharp doesn't expose XMP for (TIFF)
  const xmpText = (meta.xmp ? meta.xmp.toString('utf8') : '') + '\n' + raw.toString('latin1');
  if (XMP_GPS.some((re) => re.test(xmpText))) found.push('GPS location (XMP)');
  if (XMP_AUTHOR.some((re) => re.test(xmpText))) found.push('author (XMP)');
  // IPTC record 2, dataset 80 is the by-line (author)
  if (meta.iptc && meta.iptc.includes(Buffer.from([0x1c, 0x02, 0x50]))) found.push('author (IPTC by-line)');
  if (found.length) problems.push(`${name}: ${[...new Set(found)].join(', ')}`);
}

if (problems.length) {
  console.error(`\nPhotos with private metadata (${problems.length}):\n`);
  for (const p of problems) console.error(`  ${p}`);
  console.error(`
The original file is public in this repository. Remove the metadata (the photo
keeps how it looks):

  npm run photo:clean -- <photo>

Then run npm run check again. See ADDING_PHOTOS.md.
`);
  process.exit(1);
}
console.log(`Photo metadata check passed: ${photos.length} photos, no location or author data.`);
