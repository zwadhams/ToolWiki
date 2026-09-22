// Capture source bytes before any audit corrections. Never overwrite the baseline.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { execFileSync } from 'node:child_process';
import yaml from '../../node_modules/.pnpm/js-yaml@4.3.2/node_modules/js-yaml/index.js';
const root = 'audits/tool-review';
const walk = (dir) => fs.readdirSync(dir, { withFileTypes: true }).flatMap(e => e.isDirectory() ? walk(`${dir}/${e.name}`) : [`${dir}/${e.name}`]);
const files = [...walk('src/content/docs').filter(f => f.endsWith('.md')), 'src/data/editions.ts'];
const sha = text => crypto.createHash('sha256').update(text).digest('hex');
const records = files.map(file => {
  const bytes = fs.readFileSync(file);
  const text = bytes.toString('utf8');
  const frontmatter = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  return { file, sha256: sha(bytes), text, metadata: frontmatter ? yaml.load(frontmatter[1]) : null };
});
const result = { date: '2026-09-22', head: execFileSync('git', ['rev-parse', 'HEAD'], {encoding:'utf8'}).trim(), status: execFileSync('git', ['status', '--short'], {encoding:'utf8'}), files: records };
fs.writeFileSync(path.join(root, 'baseline.json'), JSON.stringify(result, null, 2) + '\n', {flag:'wx'});
const urls = [...new Set(records.flatMap(r => [...r.text.matchAll(/https?:\/\/[^\s)'"<>]+/g)].map(m=>m[0])))].sort();
fs.writeFileSync(path.join(root, 'source-inventory.json'), JSON.stringify(urls, null, 2) + '\n', {flag:'wx'});
console.log(JSON.stringify({ files: records.length, tools: records.filter(r=>r.metadata?.tool).length, urls: urls.length, head: result.head, initialStatus: result.status }, null, 2));
