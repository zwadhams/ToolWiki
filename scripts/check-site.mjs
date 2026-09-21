import { readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';

const root = path.resolve('dist');
const base = '/ToolWiki/';
const origin = 'https://zwadhams.github.io';
async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  return (await Promise.all(entries.map((entry) => entry.isDirectory() ? walk(path.join(dir, entry.name)) : path.join(dir, entry.name)))).flat();
}
const pages = (await walk(root)).filter((file) => file.endsWith('.html'));
const errors = [];
const contents = new Map(await Promise.all(pages.map(async (file) => [file, await readFile(file, 'utf8')])));
for (const [file, html] of contents) {
  const route = '/' + path.relative(root, file).replaceAll(path.sep, '/').replace(/index\.html$/, '');
  const current = new URL(base.slice(0, -1) + route, origin);
  assert.equal((html.match(/<h1\b/g) || []).length, 1, `Expected one page title: ${file}`);
  for (const tag of html.matchAll(/<(?:a|link|script|img)\b[^>]*>/g)) {
    if (/\brel="(?:canonical|alternate)"/.test(tag[0])) continue;
    const match = tag[0].match(/\b(?:href|src)="([^"]+)"/);
    if (!match) continue;
    const raw = match[1].replaceAll('&amp;', '&');
    if (/^(mailto:|tel:|data:|javascript:)/.test(raw)) continue;
    const url = new URL(raw, current);
    if (url.origin !== origin || !url.pathname.startsWith(base)) continue;
    const relative = decodeURIComponent(url.pathname.slice(base.length));
    let target = path.join(root, relative);
    if (!target.startsWith(root + path.sep) && target !== root) { errors.push(`Invalid target: ${raw}`); continue; }
    try {
      if ((await stat(target)).isDirectory()) target = path.join(target, 'index.html');
      await stat(target);
      if (url.hash && target.endsWith('.html')) {
        const targetHtml = contents.get(target) || await readFile(target, 'utf8');
        const fragment = decodeURIComponent(url.hash.slice(1));
        if (!targetHtml.includes(`id="${fragment}"`)) errors.push(`${route}: missing fragment ${raw}`);
      }
    } catch { errors.push(`${route}: missing ${raw}`); }
  }
}
assert.equal(errors.length, 0, errors.join('\n'));
await stat(path.join(root, 'pagefind', 'pagefind.js'));
console.log(`Verified ${pages.length} built pages, local links, fragments, assets, and search index.`);
