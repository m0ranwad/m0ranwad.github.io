// Fail when any image in the built site (dist/) is over 400 KB.
//
// Every photo should reach the site through src/lib/photos.ts, which keeps
// each version well under that. A file over the limit is usually a photo
// in src/assets/img/ that nothing resizes (published as the original) or an
// image added to public/.
//
// Usage: node scripts/check-image-sizes.mjs   (after `astro build`)

import { readdirSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const LIMIT_KB = 400;
const root = fileURLToPath(new URL('..', import.meta.url));
const dist = join(root, 'dist');

/** @param {string} dir @returns {string[]} */
function walk(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? walk(join(dir, e.name)) : [join(dir, e.name)],
  );
}

// Every image format a browser can show, including icons and vector images
const IMAGE = /\.(avif|webp|jpe?g|jfif|pjpeg|pjp|png|apng|gif|svgz?|ico|cur|bmp|tiff?|heic|heif|jxl)$/i;

const images = walk(dist).filter((f) => IMAGE.test(f));
const tooBig = images
  .map((f) => ({ file: relative(dist, f).split(sep).join('/'), bytes: statSync(f).size }))
  .filter(({ bytes }) => bytes > LIMIT_KB * 1024);

if (tooBig.length) {
  console.error(`\nImages over ${LIMIT_KB} KB (${tooBig.length}):\n`);
  for (const { file, bytes } of tooBig) {
    console.error(`  /${file}: ${(bytes / 1024).toFixed(1)} KB (${bytes} bytes; the limit is ${LIMIT_KB * 1024})`);
  }
  console.error(`\nA photo in src/assets/img/ that no page shows is published at full size: remove it or move it`);
  console.error(`to src/assets/brand/. An image in public/ is published as-is: shrink it. See ADDING_PHOTOS.md.\n`);
  process.exit(1);
}
console.log(`Image size check passed: ${images.length} images, none over ${LIMIT_KB} KB.`);
