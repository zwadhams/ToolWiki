import assert from 'node:assert/strict';
import test from 'node:test';
import { createHash } from 'node:crypto';
import { mkdtemp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { currentReviewStatus } from '../scripts/review-status.mjs';

const hash = value => createHash('sha256').update(value).digest('hex');
async function fixture(t) {
  const parent = path.resolve(os.tmpdir());
  const root = await mkdtemp(path.join(parent, 'toolwiki-review-'));
  t.after(async () => {
    assert.equal(path.dirname(root), parent);
    assert.ok(path.basename(root).startsWith('toolwiki-review-'));
    await rm(root, { recursive: true, force: true });
  });
  await mkdir(path.join(root, 'src/content/docs'), { recursive: true });
  await writeFile(path.join(root, 'review.md'), 'Specific review evidence.');
  return root;
}

test('review report enumerates unchanged, changed, new, removed and scoped follow-up content without modifying it', async t => {
  const root = await fixture(t);
  for (const [file, contents] of Object.entries({ 'old.md': 'same', 'changed.md': 'after', 'new.md': 'new', 'reviewed.md': 'reviewed' })) await writeFile(path.join(root, 'src/content/docs', file), contents);
  const historic = ['old', 'changed', 'removed'].map(name => ({ file: `src/content/docs/${name}.md`, reviewedSha256: hash(name === 'old' ? 'same' : 'before') }));
  const followup = [{ id: 'narrow', date: '2026-11-06', reviewer: 'Tester', scope: 'First example only.', reference: 'review.md', files: [{ path: 'src/content/docs/reviewed.md', sha256: hash('reviewed') }] }];
  const report = await currentReviewStatus(root, historic, followup);
  assert.equal(report.files.length, 5);
  assert.deepEqual(report.counts, { 'unchanged-since-review': 1, 'changed-since-review': 1, 'reviewed-follow-up': 1, 'not-yet-linked-to-review': 1, 'removed-since-review': 1 });
  assert.equal(report.files.find(file => file.path.endsWith('/reviewed.md')).latestReview.scope, 'First example only.');
  assert.equal(await readFile(path.join(root, 'src/content/docs/changed.md'), 'utf8'), 'after');
  await writeFile(path.join(root, 'src/content/docs/reviewed.md'), 'later change');
  const changed = (await currentReviewStatus(root, historic, followup)).files.find(file => file.path.endsWith('/reviewed.md'));
  assert.equal(changed.status, 'changed-since-review');
  assert.equal(changed.latestReview.sha256, hash('reviewed'));
});

test('latest applicable review wins by date without replacing older evidence', async t => {
  const root = await fixture(t);
  await writeFile(path.join(root, 'src/content/docs/page.md'), 'current');
  const review = (id, date, contents) => ({ id, date, reviewer: 'Tester', scope: id, reference: 'review.md', files: [{ path: 'src/content/docs/page.md', sha256: hash(contents) }] });
  const records = [review('new', '2026-11-06', 'current'), review('old', '2026-10-01', 'old')];
  const report = await currentReviewStatus(root, [], records);
  assert.equal(report.files[0].latestReview.id, 'new');
  assert.equal(report.files[0].reviewCount, 2);
  assert.equal(records[1].files[0].sha256, hash('old'));
});

test('follow-up evidence must exist and cannot refer outside the repository', async t => {
  const root = await fixture(t);
  const review = { id: 'bad', date: '2026-11-06', reviewer: 'Tester', scope: 'Scope', reference: '../outside.md', files: [] };
  await assert.rejects(currentReviewStatus(root, [], [review]), /leaves the repository/);
  await assert.rejects(currentReviewStatus(root, [], [{ ...review, reference: 'missing.md' }]), /ENOENT/);
});
