// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  // replace with the real domain before launch
  site: 'https://example.com',
  i18n: {
    defaultLocale: 'he',
    locales: ['he', 'en'],
    routing: { prefixDefaultLocale: false },
  },
});
