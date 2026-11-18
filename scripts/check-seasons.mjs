// Astro integration: fail the build when menu data breaks the season rules
// in src/data/season.ts (checkMenus): more than one seasonal menu open, an
// unknown status, a badly written date, or two menus with the same slug.
// Also warns when an open menu's orderBy or a coming-soon menu's opens date
// has passed. Runs on `astro build` (fails) and `astro dev` (warns).

import { allMenus } from '../src/data/menus/index.ts';
import { checkMenus } from '../src/data/season.ts';

/** @returns {import('astro').AstroIntegration} */
export default function checkSeasons() {
  return {
    name: 'check-seasons',
    hooks: {
      'astro:build:start': ({ logger }) => {
        const { errors, warnings } = checkMenus(allMenus);
        for (const w of warnings) logger.warn(w);
        if (errors.length) {
          for (const e of errors) logger.error(e);
          throw new Error(`${errors.length} problem(s) in menu season data. See SeasonStatus in src/data/types.ts.`);
        }
        logger.info('Menu season data is consistent.');
      },
      'astro:server:start': ({ logger }) => {
        const { errors, warnings } = checkMenus(allMenus);
        for (const p of [...errors, ...warnings]) logger.warn(p);
      },
    },
  };
}
