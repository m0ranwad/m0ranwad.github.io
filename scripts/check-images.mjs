// Astro integration: fail the build when menu or gallery data points at a
// photo that is not in public/. A mistyped photo path is the most likely
// mistake in a seasonal update, and without this check it ships as a broken
// image. Runs on `astro build` (fails) and `astro dev` (warns at startup).

import { fileURLToPath } from 'node:url';
import { allMenus, galleryImages } from '../src/data/index.ts';
import { createExactPathChecker } from './lib/exact-path.mjs';

/** @returns {{ where: string, path: string | undefined }[]} */
function imageReferences() {
  const refs = [];
  for (const menu of allMenus) {
    const file = `src/data/menus/${menu.slug}.ts`;
    if (menu.headerImage !== undefined) {
      refs.push({ where: `${file}, headerImage`, path: menu.headerImage });
    }
    for (const item of menu.items) {
      refs.push({ where: `${file}, item "${item.name}"`, path: item.image });
    }
  }
  for (const image of galleryImages) {
    refs.push({ where: `src/data/gallery.ts, "${image.alt}"`, path: image.src });
  }
  return refs;
}

/** @param {string} publicDir */
function findProblems(publicDir) {
  const { lookup } = createExactPathChecker(publicDir);
  const problems = [];
  for (const { where, path } of imageReferences()) {
    if (!path || !path.startsWith('/')) {
      problems.push(`${where}: "${path ?? ''}" should start with /assets/img/`);
      continue;
    }
    const result = lookup(decodeURI(path));
    if (result.found && !result.isDir) continue;
    const hint = result.suggestion
      ? ` (capitals differ: the file is ${result.suggestion})`
      : '';
    problems.push(`${where}: ${path} is not in public/${hint}`);
  }
  return problems;
}

/** @returns {import('astro').AstroIntegration} */
export default function checkImages() {
  let publicDir = '';
  return {
    name: 'check-images',
    hooks: {
      'astro:config:done': ({ config }) => {
        publicDir = fileURLToPath(config.publicDir);
      },
      'astro:build:start': ({ logger }) => {
        const problems = findProblems(publicDir);
        if (problems.length) {
          for (const p of problems) logger.error(p);
          throw new Error(
            `${problems.length} photo path(s) in menu or gallery data point at missing files. See ADDING_PHOTOS.md.`,
          );
        }
        logger.info('All menu and gallery photo paths exist.');
      },
      'astro:server:start': ({ logger }) => {
        for (const p of findProblems(publicDir)) logger.warn(p);
      },
    },
  };
}
