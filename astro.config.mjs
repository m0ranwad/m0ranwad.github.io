// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import checkImages from './scripts/check-images.mjs';
import checkSeasons from './scripts/check-seasons.mjs';

// The oldest browsers the site supports: Vite 6's default ("modules"), which
// the site was built with until Astro 7. Pinned so an upgrade cannot raise
// them silently. Vite 8's own default writes media queries as
// `(width<=768px)`, which iOS before 16.4 ignores, so older iPhones would
// get the desktop layout.
const BROWSERS = ['es2020', 'edge88', 'firefox78', 'chrome87', 'safari14'];

// Preview builds for the redesign (epic #2) run on Cloudflare Pages, which
// sets CF_PAGES=1. They are hidden from search engines on every page, use
// the preview's own address, and send the order form to a test inbox. A
// preview build without a test-inbox key fails, so it can never email the
// owner. GitHub Pages (production) is unaffected.
const PREVIEW = process.env.CF_PAGES === '1';
const PREVIEW_FORM_KEY = process.env.PREVIEW_WEB3FORMS_KEY;
if (PREVIEW && !PREVIEW_FORM_KEY) {
  throw new Error(
    'Preview build: set PREVIEW_WEB3FORMS_KEY (a Web3Forms key for a test inbox) in the Cloudflare Pages project settings.',
  );
}

// https://astro.build/config
export default defineConfig({
  site: PREVIEW && process.env.CF_PAGES_URL ? process.env.CF_PAGES_URL : 'https://www.thymelesstreatsbakery.com',
  // Output static HTML (default, but explicit for clarity)
  output: 'static',
  build: {
    // Generate clean URLs (/about/ instead of /about.html)
    format: 'directory',
  },
  // Astro 7 defaults to 'jsx', which drops whitespace around text inside
  // elements (e.g. the space between the tick icon and "Added!"). Keep
  // Astro 6's whitespace until the redesign (#2) rewrites this markup.
  compressHTML: true,
  vite: {
    define: {
      __PREVIEW__: JSON.stringify(PREVIEW),
      __PREVIEW_FORM_KEY__: JSON.stringify(PREVIEW ? PREVIEW_FORM_KEY : null),
    },
    build: {
      cssTarget: [...BROWSERS],
    },
    plugins: [
      {
        // Astro sets the browser JavaScript target to esnext, and
        // vite.build.target does not reach it, so set it once Astro's
        // config is resolved.
        name: 'browser-target',
        configEnvironment(name, config) {
          if (name === 'client') (config.build ??= {}).target = [...BROWSERS];
        },
      },
    ],
  },
  integrations: [
    sitemap(),
    // Fails the build if menu or gallery data names a photo that doesn't exist
    checkImages(),
    // Fails the build if more than one seasonal menu is open, or a status or date is malformed
    checkSeasons(),
  ],
});
