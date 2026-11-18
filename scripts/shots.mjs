// Screenshot every page of the built site at phone and desktop width.
//
//   npm run shots                        build, then shoot into shots/<branch>/
//   npm run shots -- --label before      shoot into shots/before/ instead
//   npm run shots:compare -- main mine   compare shots/main/ with shots/mine/
//
// Each page is scrolled top to bottom so lazy images load, and the clock
// is frozen. Chrome occasionally draws a scaled photo slightly differently,
// so each page is loaded until two attempts match. Every difference fails
// the comparison, even a faint one: a faint change can be a real badge or a
// photo that failed to load. When the only differences are faint and inside
// photos, the report says so; retake both sets, and if it persists it is
// real. Each shot
// also records which image files the page loaded, so the report can name a
// missing, swapped or edited photo. shots/ is git-ignored. Needs Chromium:
// run `npx playwright install chromium` once, or have Chrome or Edge
// installed.

import { createHash } from 'node:crypto';
import { execSync } from 'node:child_process';
import { createServer } from 'node:http';
import { existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, extname, join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createExactPathChecker } from './lib/exact-path.mjs';

const root = fileURLToPath(new URL('..', import.meta.url));
const dist = join(root, 'dist');
const shotsDir = join(root, 'shots');

const VIEWPORTS = [
  { width: 390, height: 844 }, // phone
  { width: 1280, height: 800 }, // desktop
];

const TYPES = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript',
  '.json': 'application/json', '.xml': 'application/xml', '.txt': 'text/plain',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
  '.gif': 'image/gif', '.webp': 'image/webp', '.avif': 'image/avif', '.ico': 'image/x-icon',
  '.woff': 'font/woff', '.woff2': 'font/woff2',
};

const args = process.argv.slice(2);
const flag = (name) => {
  const i = args.indexOf(name);
  return i === -1 ? undefined : args.slice(i + 1);
};

/** @param {string} dir @returns {string[]} */
function walk(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? walk(join(dir, e.name)) : [join(dir, e.name)],
  );
}

const sha = (data) => createHash('sha256').update(data).digest('hex');

/**
 * The folder for a set of shots. Branch names become labels by turning
 * slashes into hyphens, the same way for taking shots and comparing them.
 * @param {string} name a label or branch name
 */
function shotsFolder(name) {
  const label = name.replace(/[^\w.-]+/g, '-').replace(/^[.-]+/, '');
  const dir = join(shotsDir, label);
  // shoot() deletes this folder, so it must be a plain folder inside shots/.
  if (!label || dirname(dir) !== shotsDir) throw new Error(`"${name}" can't be used as a shots label.`);
  return { label, dir };
}

// Largest per-channel difference (0-255) that may be photo scaling noise.
// Observed noise peaks around 23. This only words the report; any
// difference still fails.
const NOISE_LIMIT = 40;

/** @param {string} dir @param {string} file */
const readJson = (dir, file) => {
  try {
    return JSON.parse(readFileSync(join(dir, file), 'utf8'));
  } catch {
    return undefined;
  }
};

/**
 * Describe how the image files two shots of a page loaded differ, or ''.
 * @param {Record<string, string>} a path -> content hash, or "missing (HTTP 404)"
 * @param {Record<string, string>} b
 */
function imageChanges(a, b) {
  const changes = [];
  for (const path of [...new Set([...Object.keys(a), ...Object.keys(b)])].sort()) {
    if (a[path] === b[path]) continue;
    if (!(path in a)) changes.push(`${path} newly loaded${b[path].startsWith('missing') ? ', ' + b[path] : ''}`);
    else if (!(path in b)) changes.push(`${path} no longer loaded`);
    else if (b[path].startsWith('missing')) changes.push(`${path} ${b[path]}`);
    else changes.push(`${path} file changed`);
  }
  if (!changes.length) return '';
  const more = changes.length > 3 ? `, and ${changes.length - 3} more` : '';
  return `images: ${changes.slice(0, 3).join('; ')}${more}`;
}

/**
 * Classify the pixel differences between two screenshots of the same page.
 * @param {number[][]} boxes [left, top, right, bottom] of photos in either shot
 */
async function pixelDiff(fileA, fileB, boxes) {
  const { default: sharp } = await import('sharp');
  const [A, B] = await Promise.all(
    [fileA, fileB].map((f) => sharp(f).removeAlpha().raw().toBuffer({ resolveWithObject: true })),
  );
  const { width, height } = A.info;
  if (width !== B.info.width || height !== B.info.height) {
    return { kind: 'DIFFERENT', detail: `page size ${width}x${height} -> ${B.info.width}x${B.info.height}` };
  }
  const diff = new Uint8Array(width * height);
  for (let i = 0, p = 0; p < diff.length; i += 3, p++) {
    diff[p] = Math.max(
      Math.abs(A.data[i] - B.data[i]),
      Math.abs(A.data[i + 1] - B.data[i + 1]),
      Math.abs(A.data[i + 2] - B.data[i + 2]),
    );
  }
  const inPhoto = (x, y) => boxes.some(([l, t, r, b]) => x >= l && x < r && y >= t && y < b);
  let changed = 0, max = 0, faintInPhotos = true;
  let box = [width, height, -1, -1];
  for (let p = 0; p < diff.length; p++) {
    const d = diff[p];
    if (!d) continue;
    const x = p % width, y = (p - x) / width;
    changed++;
    max = Math.max(max, d);
    if (d > NOISE_LIMIT || !inPhoto(x, y)) faintInPhotos = false;
    box = [Math.min(box[0], x), Math.min(box[1], y), Math.max(box[2], x), Math.max(box[3], y)];
  }
  if (!changed) return { kind: 'same', detail: '' };
  const where = `${changed} px changed within x ${box[0]}-${box[2]}, y ${box[1]}-${box[3]}, max ${max}/255`;
  const hint = faintInPhotos
    ? '; faint and inside photos only, so possibly scaling noise. Retake both sets: if it is still there, it is a real change'
    : '';
  return { kind: 'DIFFERENT', detail: where + hint };
}

async function compare([a, b] = []) {
  if (!a || !b) throw new Error('Usage: npm run shots:compare -- <labelA> <labelB>');
  const { label: labelA, dir: dirA } = shotsFolder(a);
  const { label: labelB, dir: dirB } = shotsFolder(b);
  for (const d of [dirA, dirB]) if (!existsSync(d)) throw new Error(`No shots at ${d}`);
  const boxesA = readJson(dirA, 'photos.json') ?? {};
  const boxesB = readJson(dirB, 'photos.json') ?? {};
  const imagesA = readJson(dirA, 'images.json');
  const imagesB = readJson(dirB, 'images.json');
  if (!imagesA || !imagesB) {
    console.log('One set of shots predates image tracking, so photo files were not compared. Retake it to compare them.\n');
  }
  const pngs = (dir) => readdirSync(dir).filter((n) => n.endsWith('.png'));
  const names = [...new Set([...pngs(dirA), ...pngs(dirB)])].sort();
  let differences = 0;
  for (const name of names) {
    const fileA = join(dirA, name);
    const fileB = join(dirB, name);
    let status = 'same';
    let detail = '';
    if (!existsSync(fileA)) status = `only in ${labelB}`;
    else if (!existsSync(fileB)) status = `only in ${labelA}`;
    else {
      detail = imagesA && imagesB ? imageChanges(imagesA[name] ?? {}, imagesB[name] ?? {}) : '';
      if (detail) status = 'DIFFERENT';
      else if (sha(readFileSync(fileA)) !== sha(readFileSync(fileB))) {
        const boxes = [...(boxesA[name] ?? []), ...(boxesB[name] ?? [])];
        ({ kind: status, detail } = await pixelDiff(fileA, fileB, boxes));
      }
    }
    if (status !== 'same') differences++;
    console.log(`${status === 'same' ? '  ' : '! '}${name.padEnd(30)} ${status}${detail ? ': ' + detail : ''}`);
  }
  console.log(`\n${names.length - differences} of ${names.length} match.`);
  if (differences) {
    console.log(`Open the differing files in shots/${labelA}/ and shots/${labelB}/ side by side and explain each change.`);
    process.exit(1);
  }
}

function defaultLabel() {
  try {
    return execSync('git rev-parse --abbrev-ref HEAD', { cwd: root, encoding: 'utf8' }).trim();
  } catch {
    return 'current';
  }
}

/** Serve dist/ the way GitHub Pages does, including case-sensitive names. */
function serve() {
  const { lookup } = createExactPathChecker(dist);
  const server = createServer((req, res) => {
    let path = decodeURIComponent(new URL(req.url ?? '/', 'http://x').pathname);
    let found = lookup(path);
    if (found.found && found.isDir) {
      path = path.replace(/\/?$/, '/index.html');
      found = lookup(path);
    }
    if (!found.found) {
      res.writeHead(404, { 'content-type': 'text/plain' }).end('Not found');
      return;
    }
    const type = TYPES[extname(path).toLowerCase()] ?? 'application/octet-stream';
    // no-store: every page fetches its own images, so each shot records them all.
    res.writeHead(200, { 'content-type': type, 'cache-control': 'no-store' }).end(readFileSync(join(dist, path)));
  });
  return new Promise((resolve) => server.listen(0, '127.0.0.1', () => resolve(server)));
}

async function launchBrowser() {
  const { chromium } = await import('playwright');
  // --disable-checker-imaging: otherwise Chrome draws large photos it has not
  //   finished decoding as empty boxes in full-page captures; on the gallery,
  //   over half the tiles came out blank, and a different half each run.
  // --disable-gpu-rasterization: GPU drawing scales photos slightly
  //   differently from run to run, so identical pages gave different files.
  const args = ['--disable-checker-imaging', '--disable-gpu-rasterization'];
  const attempts = [
    { name: 'Playwright Chromium', options: { args } },
    { name: 'Google Chrome', options: { args, channel: 'chrome' } },
    { name: 'Microsoft Edge', options: { args, channel: 'msedge' } },
  ];
  for (const { name, options } of attempts) {
    try {
      const browser = await chromium.launch(options);
      console.log(`Using ${name} ${browser.version()}`);
      return browser;
    } catch {
      // try the next one
    }
  }
  throw new Error('No Chromium browser found. Run `npx playwright install chromium` once, then retry.');
}

async function shoot() {
  if (!existsSync(dist)) throw new Error('dist/ is missing. Run `npm run build` first.');
  const { label, dir: outDir } = shotsFolder(flag('--label')?.[0] ?? defaultLabel());
  rmSync(outDir, { recursive: true, force: true });
  mkdirSync(outDir, { recursive: true });

  const routes = walk(dist)
    .filter((f) => f.endsWith('index.html'))
    .map((f) => '/' + relative(dist, f).split(sep).join('/').replace(/index\.html$/, ''))
    .sort();

  const server = await serve();
  const { port } = /** @type {import('node:net').AddressInfo} */ (server.address());
  const browser = await launchBrowser();
  const frozenNow = new Date();
  const started = Date.now();
  const warnings = [];
  /** @type {Record<string, number[][]>} */
  const photoBoxes = {};
  /** @type {Record<string, Record<string, string>>} */
  const imageFiles = {};

  /**
   * Load a page in a fresh tab and screenshot it.
   * @param {import('playwright').BrowserContext} context
   * @param {string} route
   */
  async function capture(context, route) {
    const page = await context.newPage();
    const problems = [];
    // Record every image the page loads (img tags and CSS backgrounds),
    // with a hash of its contents or the HTTP error it got.
    /** @type {Map<string, string>} */
    const images = new Map();
    const reading = [];
    page.on('response', (response) => {
      const url = new URL(response.url());
      if (response.request().resourceType() !== 'image' || !url.protocol.startsWith('http')) return;
      const path = decodeURIComponent(url.pathname);
      reading.push(
        (response.ok()
          ? response.body().then((body) => sha(body).slice(0, 16))
          : Promise.resolve(`missing (HTTP ${response.status()})`)
        )
          .catch(() => 'unreadable')
          .then((result) => images.set(path, result)),
      );
    });
    await page.clock.setFixedTime(frozenNow);
    await page.goto(`http://127.0.0.1:${port}${route}`, { waitUntil: 'load' });
    // Load lazy images: make them eager and scroll through the page.
    await page.evaluate(async () => {
      for (const img of document.images) img.loading = 'eager';
      const step = Math.max(200, Math.floor(window.innerHeight / 2));
      for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 40));
      }
      window.scrollTo(0, 0);
    });
    await page
      .waitForFunction(() => [...document.images].every((img) => img.complete), null, { timeout: 30_000 })
      .catch(() => problems.push('some images were still loading'));
    // A downloaded image can still be decoding (decoding="async"), and paints
    // nothing until it finishes. Large photos take a moment.
    await page.evaluate(() =>
      Promise.all([...document.images].map((img) => img.decode().catch(() => undefined))),
    );
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(250); // let scroll-driven UI settle back to its top-of-page state
    const broken = await page.evaluate(() =>
      [...document.images].filter((img) => img.complete && img.currentSrc && !img.naturalWidth).map((img) => img.currentSrc.slice(0, 80)),
    );
    for (const src of broken) problems.push(`image did not load: ${src}`);
    // Where photos sit on the page, so the comparison can say when a
    // difference is faint and inside a photo.
    const boxes = await page.evaluate(() =>
      [...document.querySelectorAll('*')]
        .filter((el) =>
          el instanceof HTMLImageElement
            ? el.naturalWidth > 0
            : getComputedStyle(el).backgroundImage.includes('url('),
        )
        .map((el) => {
          const r = el.getBoundingClientRect();
          return [r.left, r.top, r.right, r.bottom].map((v, i) =>
            Math[i < 2 ? 'floor' : 'ceil'](v + (i % 2 ? window.scrollY : window.scrollX)),
          );
        })
        .filter(([l, t, r, b]) => r > l && b > t),
    );
    const png = await page.screenshot({ fullPage: true, animations: 'disabled', caret: 'hide' });
    await Promise.all(reading);
    for (const [path, result] of images) {
      if (!/^[0-9a-f]+$/.test(result)) problems.push(`${path} is ${result}`);
    }
    await page.close();
    return {
      png,
      hash: sha(png),
      boxes,
      images: Object.fromEntries([...images].sort(([a], [b]) => a.localeCompare(b))),
      problems,
    };
  }

  let retaken = 0;
  try {
    for (const viewport of VIEWPORTS) {
      const context = await browser.newContext({ viewport, deviceScaleFactor: 1, reducedMotion: 'reduce' });
      for (const route of routes) {
        const name = (route === '/' ? 'home' : route.replace(/^\/|\/$/g, '').replace(/\//g, '_')) + `-${viewport.width}.png`;
        // Chrome occasionally draws a scaled photo a little differently. Load
        // each page until two attempts give the same picture (at most three),
        // so that noise doesn't show up as a difference between sets.
        const attempts = [await capture(context, route)];
        let shot;
        while (!shot && attempts.length < 3) {
          const next = await capture(context, route);
          shot = attempts.find((a) => a.hash === next.hash);
          attempts.push(next);
        }
        if (attempts.length > 2) retaken++;
        if (!shot) {
          shot = attempts[0];
          warnings.push(`${route} at ${viewport.width}px: three attempts all differed, so compare may report noise`);
        }
        writeFileSync(join(outDir, name), shot.png);
        photoBoxes[name] = shot.boxes;
        imageFiles[name] = shot.images;
        for (const p of shot.problems) warnings.push(`${route} at ${viewport.width}px: ${p}`);
      }
      await context.close();
    }
  } finally {
    await browser.close();
    server.close();
  }

  writeFileSync(join(outDir, 'photos.json'), JSON.stringify(photoBoxes));
  writeFileSync(join(outDir, 'images.json'), JSON.stringify(imageFiles, null, 1));
  writeFileSync(join(outDir, 'README.txt'), `Taken ${frozenNow.toISOString()} from ${label}. ${routes.length} routes x ${VIEWPORTS.map((v) => v.width + 'px').join(', ')}.\n`);
  for (const w of warnings) console.warn(`Warning: ${w}`);
  const seconds = Math.round((Date.now() - started) / 1000);
  const steadied = retaken ? `; ${retaken} needed a third attempt` : '';
  console.log(`${routes.length * VIEWPORTS.length} screenshots in shots/${label}/ (${seconds}s${steadied}).`);
}

const compareArgs = flag('--compare');
if (compareArgs) await compare(compareArgs);
else await shoot();
