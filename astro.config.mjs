// @ts-check
import { defineConfig } from 'astro/config';

// BASE is set only for the temporary GitHub Pages preview, which lives under /Studio-site/
const base = process.env.BASE || '/';

export default defineConfig({
  // replace with the real domain before launch
  site: 'https://example.com',
  base,
  i18n: {
    defaultLocale: 'he',
    locales: ['he', 'en'],
    routing: { prefixDefaultLocale: false },
  },
});
