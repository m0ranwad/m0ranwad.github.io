// Check every internal link and asset reference in the built site (dist/).
//
// Covers href, src, srcset and data-* attributes, absolute URLs to this
// site (canonical, og:image, the form redirect), url() in inline styles and
// in stylesheets the pages load, same-site #fragments, and the sitemap.
// External links are not fetched. Exits 1 if anything is broken.
//
// Usage: node scripts/check-links.mjs   (after `astro build`)

import { readFileSync, readdirSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { decodeHTMLAttribute } from 'entities';
import { createExactPathChecker } from './lib/exact-path.mjs';

const root = fileURLToPath(new URL('..', import.meta.url));
const dist = join(root, 'dist');
const host = readFileSync(join(root, 'public', 'CNAME'), 'utf8').trim();
const siteHosts = new Set([host, host.replace(/^www\./, '')]);
const { lookup } = createExactPathChecker(dist);

/** Attributes whose values are URLs, including relative ones. */
const URL_ATTRS = new Set(['href', 'src', 'srcset', 'imagesrcset', 'poster', 'action']);
const SRCSET_ATTRS = new Set(['srcset', 'imagesrcset']);

/** @param {string} dir @returns {string[]} */
function walk(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? walk(join(dir, e.name)) : [join(dir, e.name)],
  );
}

/** Decode an attribute value the way a browser does: every entity, in one pass. */
const decodeEntities = decodeHTMLAttribute;

/** URL path a dist file is served at, e.g. dist/about/index.html -> /about/ */
function pageUrlPath(file) {
  const rel = relative(dist, file).split(sep).join('/');
  return '/' + rel.replace(/(^|\/)index\.html$/, '$1');
}

/**
 * Resolve a reference to a same-site URL, or null if it is external or not a URL.
 * @param {string} value
 * @param {string} base page URL path the reference appears on
 * @param {boolean} allowRelative
 */
function resolveInternal(value, base, allowRelative) {
  const v = value.trim();
  if (!v || /^(mailto:|tel:|sms:|javascript:|data:|blob:|about:)/i.test(v)) return null;
  const isRootRelative = v.startsWith('/') && !v.startsWith('//');
  const isAbsolute = /^https?:\/\//i.test(v);
  // Relative values, including bare #fragments, only count in URL attributes:
  // elsewhere "#8FA378" is a colour and "cookies" is a word.
  if (!isRootRelative && !isAbsolute && !allowRelative) return null;
  let url;
  try {
    url = new URL(v, `https://${host}${base}`);
  } catch {
    return null;
  }
  if (!siteHosts.has(url.hostname)) return null;
  // Read the raw path: the URL parser hides some mistakes, like a doubled slash.
  const rawPath = isAbsolute ? v.replace(/^https?:\/\/[^/]+/i, '').split(/[?#]/)[0] : null;
  return { url, rawPath };
}

/** @type {Map<string, Set<string>>} page path -> ids on that page */
const idsByPage = new Map();
/** @type {{ page: string, ref: string, target: { url: URL, rawPath: string | null } }[]} */
const refs = [];
const stylesheets = new Set();

const files = walk(dist);
const htmlFiles = files.filter((f) => f.endsWith('.html'));

for (const file of htmlFiles) {
  const page = pageUrlPath(file);
  // Drop comments and inline script bodies: scripts may build HTML strings
  // like '<img src="' + path + '">' that are not real attributes.
  const html = readFileSync(file, 'utf8')
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/(<script\b[^>]*>)[\s\S]*?(<\/script>)/gi, '$1$2');
  const tags = html.replace(/(<style\b[^>]*>)[\s\S]*?(<\/style>)/gi, '$1$2');
  idsByPage.set(page, new Set([...tags.matchAll(/\sid="([^"]+)"/g)].map((m) => decodeEntities(m[1]))));

  for (const m of tags.matchAll(/\s([a-zA-Z][\w:.-]*)=("([^"]*)"|'([^']*)')/g)) {
    const name = m[1].toLowerCase();
    const raw = decodeEntities(m[3] ?? m[4] ?? '');
    const values = SRCSET_ATTRS.has(name)
      ? raw.split(',').map((c) => c.trim().split(/\s+/)[0])
      : [raw];
    for (const value of values) {
      const target = resolveInternal(value, page, URL_ATTRS.has(name));
      if (target) refs.push({ page, ref: `${name}="${value}"`, target });
    }
  }
  for (const m of tags.matchAll(/<link\b[^>]*>/gi)) {
    if (!/\brel=["']?stylesheet\b/i.test(m[0])) continue;
    const href = m[0].match(/\bhref=["']([^"']+)["']/i)?.[1];
    const target = href ? resolveInternal(decodeEntities(href), page, true) : null;
    if (target) stylesheets.add(target.url.pathname);
  }
  for (const m of html.matchAll(/url\(\s*(['"]?)([^'")]+)\1\s*\)/g)) {
    const target = resolveInternal(decodeEntities(m[2]), page, true);
    if (target) refs.push({ page, ref: `url(${m[2]})`, target });
  }
}

// Stylesheets the pages actually load (Astro's bundles, plus any linked file).
for (const file of files.filter((f) => f.endsWith('.css'))) {
  const path = pageUrlPath(file);
  if (!path.startsWith('/_astro/') && !stylesheets.has(path)) continue;
  const css = readFileSync(file, 'utf8');
  for (const m of css.matchAll(/url\(\s*(['"]?)([^'")]+)\1\s*\)/g)) {
    const target = resolveInternal(m[2], path, true);
    if (target) refs.push({ page: path, ref: `url(${m[2]})`, target });
  }
}

// Every URL in the sitemap must be a real page.
for (const file of files.filter((f) => /sitemap.*\.xml$/.test(f))) {
  const xml = readFileSync(file, 'utf8');
  for (const m of xml.matchAll(/<loc>([^<]+)<\/loc>/g)) {
    const target = resolveInternal(m[1], '/', false);
    if (target) refs.push({ page: pageUrlPath(file), ref: m[1], target });
  }
}

/** @returns {string | null} problem description, or null if fine */
function problemWith({ url, rawPath }) {
  if (rawPath !== null && rawPath.includes('//')) return 'path contains a doubled slash';
  const path = decodeURIComponent(url.pathname);
  let result = lookup(path);
  let pagePath = path;
  if (result.found && result.isDir) {
    pagePath = path.endsWith('/') ? path : path + '/';
    result = lookup(pagePath + 'index.html');
  }
  if (!result.found) {
    return result.suggestion ? `not found (did you mean ${result.suggestion}?)` : 'not found';
  }
  // /about/index.html is the same page as /about/.
  if (pagePath.endsWith('/index.html')) pagePath = pagePath.slice(0, -'index.html'.length);
  const fragment = decodeURIComponent(url.hash.slice(1));
  if (fragment && idsByPage.has(pagePath) && !idsByPage.get(pagePath)?.has(fragment)) {
    return `no element with id="${fragment}" on ${pagePath}`;
  }
  return null;
}

/** @type {Map<string, { problem: string, pages: Set<string> }>} */
const broken = new Map();
for (const { page, ref, target } of refs) {
  const problem = problemWith(target);
  if (!problem) continue;
  const key = `${ref}: ${problem}`;
  if (!broken.has(key)) broken.set(key, { problem, pages: new Set() });
  broken.get(key)?.pages.add(page);
}

if (broken.size) {
  console.error(`\nBroken internal links (${broken.size}):\n`);
  for (const [key, { pages }] of broken) {
    const list = [...pages].sort();
    const shown = list.slice(0, 3).join(', ') + (list.length > 3 ? `, and ${list.length - 3} more` : '');
    console.error(`  ${key}\n    on ${shown}`);
  }
  console.error('');
  process.exit(1);
}
console.log(`Link check passed: ${refs.length} internal references across ${htmlFiles.length} pages.`);
