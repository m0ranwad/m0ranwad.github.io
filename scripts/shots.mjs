// Screenshot every page of the built site at phone and desktop width.
//
//   npm run shots                        build, then shoot into shots/<branch>/
//   npm run shots -- --label before      shoot into shots/before/ instead
//   npm run shots:compare -- main mine   compare shots/main/ with shots/mine/
//
// Each page is scrolled top to bottom so lazy images load, and the clock
// is frozen. Two runs of the same site almost always give identical files;
// the exception is faint scaling noise inside large photos, which the
// comparison recognises and does not count as a change. shots/ is
// git-ignored. Needs Chromium: run `npx playwright install chromium` once,
// or have Chrome or Edge installed.

import { createHash } from 'node:crypto';
import { execSync } from 'node:child_process';
import { createServer } from 'node:http';
import { existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { extname, join, relative, sep } from 'node:path';
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

const sha = (file) => createHash('sha256').update(readFileSync(file)).digest('hex');

// Largest per-channel difference (0-255) still treated as photo scaling noise.
// Observed noise peaks around 23; real changes inside a photo, such as a
// different photo or a badge drawn over it, differ by far more.
const NOISE_LIMIT = 40;

/** @param {string} dir @returns {Record<string, number[][]>} */
const readPhotoBoxes = (dir) => {
  try {
    return JSON.parse(readFileSync(join(dir, 'photos.json'), 'utf8'));
  } catch {
    return {};
  }
};

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
  const inPhoto = (x, y) => boxes.some(([l, t, r, b]) => x >= l && x < r && y >= t && y < b);
  let real = 0, noise = 0, maxNoise = 0;
  let box = [width, height, -1, -1];
  for (let i = 0, p = 0; i < A.data.length; i += 3, p++) {
    const d = Math.max(
      Math.abs(A.data[i] - B.data[i]),
      Math.abs(A.data[i + 1] - B.data[i + 1]),
      Math.abs(A.data[i + 2] - B.data[i + 2]),
    );
    if (!d) continue;
    const x = p % width, y = (p - x) / width;
    if (d <= NOISE_LIMIT && inPhoto(x, y)) {
      noise++;
      maxNoise = Math.max(maxNoise, d);
      continue;
    }
    real++;
    box = [Math.min(box[0], x), Math.min(box[1], y), Math.max(box[2], x), Math.max(box[3], y)];
  }
  if (real) {
    return { kind: 'DIFFERENT', detail: `${real} px changed within x ${box[0]}-${box[2]}, y ${box[1]}-${box[3]}` };
  }
  return { kind: 'same', detail: `photo scaling noise only (${noise} px, max ${maxNoise}/255)` };
}

async function compare([a, b] = []) {
  if (!a || !b) throw new Error('Usage: npm run shots:compare -- <labelA> <labelB>');
  const dirA = join(shotsDir, a);
  const dirB = join(shotsDir, b);
  for (const d of [dirA, dirB]) if (!existsSync(d)) throw new Error(`No shots at ${d}`);
  const boxesA = readPhotoBoxes(dirA);
  const boxesB = readPhotoBoxes(dirB);
  const pngs = (dir) => readdirSync(dir).filter((n) => n.endsWith('.png'));
  const names = [...new Set([...pngs(dirA), ...pngs(dirB)])].sort();
  let differences = 0;
  for (const name of names) {
    const inA = existsSync(join(dirA, name));
    const inB = existsSync(join(dirB, name));
    let status = 'same';
    let detail = '';
    if (!inA) status = `only in ${b}`;
    else if (!inB) status = `only in ${a}`;
    else if (sha(join(dirA, name)) !== sha(join(dirB, name))) {
      const boxes = [...(boxesA[name] ?? []), ...(boxesB[name] ?? [])];
      ({ kind: status, detail } = await pixelDiff(join(dirA, name), join(dirB, name), boxes));
    }
    if (status !== 'same') differences++;
    console.log(`${status === 'same' ? '  ' : '! '}${name.padEnd(30)} ${status}${detail ? ': ' + detail : ''}`);
  }
  console.log(`\n${names.length - differences} of ${names.length} match.`);
  if (differences) {
    console.log(`Open the differing files in shots/${a}/ and shots/${b}/ side by side and explain each change.`);
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
    res.writeHead(200, { 'content-type': type }).end(readFileSync(join(dist, path)));
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
  const label = (flag('--label')?.[0] ?? defaultLabel()).replace(/[^\w.-]+/g, '-');
  const outDir = join(shotsDir, label);
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

  try {
    for (const viewport of VIEWPORTS) {
      const context = await browser.newContext({ viewport, deviceScaleFactor: 1, reducedMotion: 'reduce' });
      for (const route of routes) {
        const page = await context.newPage();
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
          .catch(() => warnings.push(`${route} at ${viewport.width}px: some images were still loading`));
        // A downloaded image can still be decoding (decoding="async"), and paints
        // nothing until it finishes. Large photos take a moment.
        await page.evaluate(() =>
          Promise.all([...document.images].map((img) => img.decode().catch(() => undefined))),
        );
        await page.evaluate(() => document.fonts.ready);
        await page.waitForTimeout(250); // let scroll-driven UI settle back to its top-of-page state
        const name = (route === '/' ? 'home' : route.replace(/^\/|\/$/g, '').replace(/\//g, '_')) + `-${viewport.width}.png`;
        // Where photos sit on the page, so the comparison can tell scaling
        // noise inside a photo from a real change.
        photoBoxes[name] = await page.evaluate(() =>
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
        await page.screenshot({ path: join(outDir, name), fullPage: true, animations: 'disabled', caret: 'hide' });
        await page.close();
      }
      await context.close();
    }
  } finally {
    await browser.close();
    server.close();
  }

  writeFileSync(join(outDir, 'photos.json'), JSON.stringify(photoBoxes));
  writeFileSync(join(outDir, 'README.txt'), `Taken ${frozenNow.toISOString()} from ${label}. ${routes.length} routes x ${VIEWPORTS.map((v) => v.width + 'px').join(', ')}.\n`);
  for (const w of warnings) console.warn(`Warning: ${w}`);
  const seconds = Math.round((Date.now() - started) / 1000);
  console.log(`${routes.length * VIEWPORTS.length} screenshots in shots/${label}/ (${seconds}s).`);
}

const compareArgs = flag('--compare');
if (compareArgs) await compare(compareArgs);
else await shoot();
