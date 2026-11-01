// Temporary GitHub Pages preview only: the site is served under /Studio-site/,
// so root links like href="/collections/" and src="/images/..." in the built HTML get that prefix.
import { readdirSync, readFileSync, writeFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const base = (process.env.BASE || '/').replace(/\/$/, '');
if (!base) process.exit(0);

const esc = base.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const pattern = new RegExp(`(href|src)="/(?!/|${esc.slice(1)}/)`, 'g');

function walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p);
    else if (p.endsWith('.html')) {
      const html = readFileSync(p, 'utf8');
      writeFileSync(p, html.replace(pattern, `$1="${base}/`));
    }
  }
}
walk('dist');
