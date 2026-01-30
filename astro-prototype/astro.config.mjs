// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.thymelesstreatsbakery.com',
  // Output static HTML (default, but explicit for clarity)
  output: 'static',
  build: {
    // Generate clean URLs (/about/ instead of /about.html)
    format: 'directory',
  },
  integrations: [
    sitemap(),
  ],
});
