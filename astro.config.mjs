// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import checkImages from './scripts/check-images.mjs';

// The oldest browsers the site supports: Vite 6's default ("modules"), which
// the site was built with until Astro 7. Pinned so an upgrade cannot raise
// them silently. Vite 8's own default writes media queries as
// `(width<=768px)`, which iOS before 16.4 ignores, so older iPhones would
// get the desktop layout.
const BROWSERS = ['es2020', 'edge88', 'firefox78', 'chrome87', 'safari14'];

// https://astro.build/config
export default defineConfig({
  site: 'https://www.thymelesstreatsbakery.com',
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
  ],
});
