import { createHash } from 'node:crypto';
import { readFile, readdir, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const slash = value => value.replaceAll('\\', '/');
const digest = contents => createHash('sha256').update(contents).digest('hex');
const documentPattern = /\.(?:md|mdx|markdown|mdown|mkdn|mkd|mdwn|mdoc)$/i;

function localPath(root, relative) {
  if (typeof relative !== 'string' || !relative || path.isAbsolute(relative)) throw new Error(`Expected repository-relative path: ${relative}`);
  const resolved = path.resolve(root, relative);
  if (!resolved.startsWith(path.resolve(root) + path.sep)) throw new Error(`Path leaves the repository: ${relative}`);
  return resolved;
}

async function documents(directory) {
  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    if (entry.name.startsWith('.')) continue;
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await documents(file));
    else if (entry.isFile() && documentPattern.test(entry.name)) files.push(file);
  }
  return files;
}

/** Report provenance without editing reviewed content, dates, or historical ledgers. */
export async function currentReviewStatus(root, historical, followups) {
  const known = new Map();
  function add(file, review) {
    const normalized = slash(file);
    localPath(root, normalized);
    if (!/^[a-f0-9]{64}$/i.test(review.sha256)) throw new Error(`Invalid review digest for ${normalized}`);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(review.date)) throw new Error(`Invalid review date for ${normalized}`);
    const list = known.get(normalized) || [];
    list.push({ ...review, sha256: review.sha256.toLowerCase(), order: list.length });
    known.set(normalized, list);
  }
  for (const entry of historical) add(entry.file, {
    id: 'tool-review-2026-09-22', date: '2026-09-22', type: 'historical',
    reference: 'audits/tool-review/README.md', scope: 'Historical documentation review; see its scope and unresolved findings.',
    sha256: entry.reviewedSha256,
  });
  for (const review of followups) {
    if (!review.id || !review.scope || !review.reference || !review.reviewer || !Array.isArray(review.files)) throw new Error('A follow-up review needs an ID, reviewer, scope, reference, and files.');
    await stat(localPath(root, review.reference));
    for (const file of review.files) add(file.path, {
      id: review.id, date: review.date, type: 'follow-up', reviewer: review.reviewer,
      reference: review.reference, scope: review.scope, sha256: file.sha256,
    });
  }
  const current = new Set((await documents(path.join(root, 'src/content/docs'))).map(file => slash(path.relative(root, file))));
  // Include non-document content covered by an explicit review, and report removals.
  for (const file of known.keys()) current.add(file);
  const files = [];
  for (const file of [...current].sort()) {
    const reviews = (known.get(file) || []).sort((a, b) => a.date.localeCompare(b.date) || a.order - b.order);
    const latest = reviews.at(-1);
    let currentSha256 = null;
    try { currentSha256 = digest(await readFile(localPath(root, file))); }
    catch (error) { if (error.code !== 'ENOENT') throw error; }
    const status = currentSha256 === null ? 'removed-since-review'
      : !latest ? 'not-yet-linked-to-review'
      : currentSha256 !== latest.sha256 ? 'changed-since-review'
      : latest.type === 'follow-up' ? 'reviewed-follow-up' : 'unchanged-since-review';
    files.push({ path: file, status, currentSha256, latestReview: latest ? Object.fromEntries(Object.entries(latest).filter(([key]) => key !== 'order')) : null, reviewCount: reviews.length });
  }
  const counts = Object.fromEntries(['unchanged-since-review', 'changed-since-review', 'reviewed-follow-up', 'not-yet-linked-to-review', 'removed-since-review'].map(status => [status, files.filter(file => file.status === status).length]));
  return { version: 1, purpose: 'Informational provenance only. A changed digest does not establish a false claim, and a scoped review does not verify every claim.', counts, files };
}

export function reviewStatusMarkdown(report) {
  const escape = value => String(value).replaceAll('|', '\\|').replaceAll('\n', ' ');
  return '# Current content review status\n\n' + report.purpose + '\n\n'
    + 'Regenerate this report with `node scripts/review-status.mjs --format markdown --output audits/review-status/current.md`. Source dates and historical records are not changed.\n\n'
    + '| File | Status | Latest review and scope |\n| --- | --- | --- |\n'
    + report.files.map(file => `| [${escape(file.path)}](../../${file.path}) | ${file.status} | ${file.latestReview ? `[${escape(file.latestReview.id)}](../../${file.latestReview.reference}) (${file.latestReview.date}): ${escape(file.latestReview.scope)}` : 'No linked review digest.'} |`).join('\n') + '\n';
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  const allowed = new Set(['--format', '--output']);
  for (let i = 0; i < args.length; i += 2) if (!allowed.has(args[i]) || !args[i + 1]) throw new Error('Usage: node scripts/review-status.mjs [--format json|markdown] [--output repository/path]');
  const options = Object.fromEntries(Array.from({ length: args.length / 2 }, (_, i) => [args[i * 2], args[i * 2 + 1]]));
  const root = path.resolve(fileURLToPath(new URL('../', import.meta.url)));
  const historical = JSON.parse(await readFile(path.join(root, 'audits/tool-review/reviewed-files.json'), 'utf8'));
  const followups = JSON.parse(await readFile(path.join(root, 'audits/review-status/reviews.json'), 'utf8'));
  const report = await currentReviewStatus(root, historical, followups);
  if (options['--format'] && !['json', 'markdown'].includes(options['--format'])) throw new Error('Format must be json or markdown.');
  const output = options['--format'] === 'markdown' ? reviewStatusMarkdown(report) : JSON.stringify(report, null, 2) + '\n';
  if (options['--output']) await writeFile(localPath(root, options['--output']), output, 'utf8');
  else process.stdout.write(output);
}
