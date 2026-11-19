// Remove all metadata (location, author, camera details) from the photos
// named on the command line, in place, keeping how they look.
//
//   npm run photo:clean -- src/assets/img/christmas/grinch-cookies.jpg
//
// The photo is re-saved without EXIF, XMP or IPTC data. Its rotation is
// applied to the pixels first, so it doesn't turn sideways when the
// orientation tag goes. JPEG and WebP are re-saved at quality 95 (no
// visible change; the site makes its own small copies anyway), PNG
// losslessly. Only the files you name are touched.

import { readFileSync, renameSync, writeFileSync } from 'node:fs';
import { extname } from 'node:path';
import sharp from 'sharp';

const files = process.argv.slice(2);
if (!files.length) {
  console.error('Usage: npm run photo:clean -- <photo> [<photo> ...]');
  process.exit(1);
}

let failed = false;
for (const file of files) {
  const ext = extname(file).toLowerCase();
  const image = sharp(readFileSync(file)).rotate();
  let output;
  if (ext === '.jpg' || ext === '.jpeg') output = image.jpeg({ quality: 95 });
  else if (ext === '.png') output = image.png();
  else if (ext === '.webp') output = image.webp({ quality: 95 });
  else {
    console.error(`${file}: only JPEG, PNG and WebP are supported; save it as a JPEG first.`);
    failed = true;
    continue;
  }
  const temp = `${file}.cleaning`;
  writeFileSync(temp, await output.toBuffer());
  renameSync(temp, file);
  console.log(`${file}: metadata removed.`);
}
process.exit(failed ? 1 : 0);
