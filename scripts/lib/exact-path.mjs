// Case-exact file lookups.
//
// GitHub Pages is case-sensitive, but Windows and macOS disks usually are
// not, so `fs.existsSync('Cake.jpg')` can succeed locally for a file named
// `cake.jpg` that will 404 in production. These helpers compare each path
// segment against the real directory listing instead.

import { readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

/**
 * @param {string} rootDir Absolute directory that URL paths are resolved against.
 */
export function createExactPathChecker(rootDir) {
  /** @type {Map<string, string[] | null>} */
  const listings = new Map();

  /** @param {string} dir */
  function list(dir) {
    if (!listings.has(dir)) {
      try {
        listings.set(dir, readdirSync(dir));
      } catch {
        listings.set(dir, null);
      }
    }
    return listings.get(dir) ?? null;
  }

  /**
   * Look up a path such as `/assets/img/cake.jpg` under rootDir.
   * @param {string} urlPath
   * @returns {{ found: boolean, isDir?: boolean, suggestion?: string }}
   * `suggestion` is the same path with corrected capitalisation, when one exists.
   */
  function lookup(urlPath) {
    const parts = urlPath.split('/').filter(Boolean);
    let dir = rootDir;
    let exact = true;
    const corrected = [];
    for (const part of parts) {
      const entries = list(dir);
      if (!entries) return { found: false };
      let match = entries.find((e) => e === part);
      if (!match) {
        exact = false;
        match = entries.find((e) => e.toLowerCase() === part.toLowerCase());
        if (!match) return { found: false };
      }
      corrected.push(match);
      dir = join(dir, match);
    }
    if (!exact) return { found: false, suggestion: '/' + corrected.join('/') };
    return { found: true, isDir: statSync(dir).isDirectory() };
  }

  return { lookup };
}
