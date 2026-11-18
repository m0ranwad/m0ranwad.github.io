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

const images = walk(dist).filter((f) => /\.(avif|webp|jpe?g|png|gif)$/i.test(f));
const tooBig = images
  .map((f) => ({ file: relative(dist, f).split(sep).join('/'), kb: Math.round(statSync(f).size / 1024) }))
  .filter(({ kb }) => kb > LIMIT_KB);

if (tooBig.length) {
  console.error(`\nImages over ${LIMIT_KB} KB (${tooBig.length}):\n`);
  for (const { file, kb } of tooBig) console.error(`  /${file}: ${kb} KB`);
  console.error(`\nA photo in src/assets/img/ that no page shows is published at full size: remove it or move it`);
  console.error(`to src/assets/brand/. See ADDING_PHOTOS.md.\n`);
  process.exit(1);
}
console.log(`Image size check passed: ${images.length} images, none over ${LIMIT_KB} KB.`);
