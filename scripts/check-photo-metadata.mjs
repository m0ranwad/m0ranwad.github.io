// Fail when a photo in src/assets/ carries location or author metadata.
//
// The site only serves resized copies, which carry no metadata. But the
// original files are committed to this public repository, so a phone photo
// with GPS coordinates would publish where it was taken (often the owner's
// kitchen), and an author field can carry a full name. CLAUDE.md's privacy
// rule forbids both. Checks EXIF (GPS, Artist), XMP (GPS, creator, artist)
// and IPTC (by-line).
//
// Usage: node scripts/check-photo-metadata.mjs

import { readdirSync } from 'node:fs';
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
const XMP_GPS = /exif:GPSLatitude/;
const XMP_AUTHOR = [/<dc:creator\b/, /<tiff:Artist\b/, /tiff:Artist=/];

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
  if (meta.exif) {
    const tags = exifTags(meta.exif);
    if (tags.has(GPS_IFD)) found.push('GPS location');
    if (tags.has(ARTIST)) found.push('author (EXIF Artist)');
  }
  if (meta.xmp) {
    const xmp = meta.xmp.toString('utf8');
    if (XMP_GPS.test(xmp)) found.push('GPS location (XMP)');
    if (XMP_AUTHOR.some((re) => re.test(xmp))) found.push('author (XMP)');
  }
  // IPTC record 2, dataset 80 is the by-line (author)
  if (meta.iptc && meta.iptc.includes(Buffer.from([0x1c, 0x02, 0x50]))) found.push('author (IPTC by-line)');
  if (found.length) problems.push(`${name}: ${[...new Set(found)].join(', ')}`);
}

if (problems.length) {
  console.error(`\nPhotos with private metadata (${problems.length}):\n`);
  for (const p of problems) console.error(`  ${p}`);
  console.error(`
The original file is public in this repository. Replace it with a copy that has
no location or author: on an iPhone, Share > Options > turn off Location, then
save; in Google Photos, remove the location in the photo's details and download
it again. Then run npm run check again. See ADDING_PHOTOS.md.
`);
  process.exit(1);
}
console.log(`Photo metadata check passed: ${photos.length} photos, no location or author data.`);
