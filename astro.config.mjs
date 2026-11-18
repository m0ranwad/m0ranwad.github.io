// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import checkImages from './scripts/check-images.mjs';

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
  integrations: [
    sitemap(),
    // Fails the build if menu or gallery data names a photo that doesn't exist
    checkImages(),
  ],
});
