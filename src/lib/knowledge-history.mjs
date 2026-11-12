import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { sha256, json } from './knowledge-format.mjs';
import { validateSnapshot } from '../../mcp/knowledge.mjs';
import { markdownLink as link } from './knowledge-markdown.mjs';

/** @typedef {{id: string, title: string, url: string, revision: string, previousRevision?: string}} ChangeRecord */
/** @returns {{added: ChangeRecord[], changed: ChangeRecord[], removed: ChangeRecord[]}} */
export function diffDocuments(before, after) {
  const old = new Map((before?.documents || []).map(doc => [doc.id, doc]));
  const current = new Map(after.documents.map(doc => [doc.id, doc]));
  const summary = doc => ({ id: doc.id, title: doc.title, url: doc.url, revision: doc.revision });
  return {
    added: after.documents.filter(doc => !old.has(doc.id)).map(summary),
    changed: after.documents.filter(doc => old.has(doc.id) && old.get(doc.id).revision !== doc.revision).map(doc => ({ ...summary(doc), previousRevision: old.get(doc.id).revision })),
    removed: [...old.values()].filter(doc => !current.has(doc.id)).map(summary),
  };
}

export async function readArchive(root = process.cwd()) {
  const entries = JSON.parse(await readFile(path.join(root, 'data/knowledge-history.json'), 'utf8'));
  const seen = new Set();
  return Promise.all(entries.map(async entry => {
    if (!/^[a-f0-9]{64}$/.test(entry.revision) || seen.has(entry.revision)) throw new Error('Invalid or duplicate archived revision');
    seen.add(entry.revision);
    const snapshotPath = `knowledge/v1/snapshots/${entry.revision}.json`;
    const bytes = await readFile(path.join(root, 'public', snapshotPath));
    if (sha256(bytes) !== entry.sha256 || bytes.length !== entry.bytes) throw new Error(`Archived snapshot checksum mismatch: ${entry.revision}`);
    const snapshot = validateSnapshot(JSON.parse(bytes.toString('utf8')));
    if (snapshot.revision !== entry.revision) throw new Error('Archive revision mismatch');
    return { ...entry, path: snapshotPath, snapshot };
  }));
}

/** @returns {{version: number, site: string, currentRevision: string, retention: string, entries: Array<{revision: string, label: string, capturedOn: string|null, path: string, sha256: string, bytes: number, current: boolean, previousRevision: string|null, documentCount: number, changes: ReturnType<typeof diffDocuments>|null}>}} */
export function buildHistory(current, archive) {
  const snapshots = [...archive];
  if (!snapshots.some(entry => entry.revision === current.revision)) snapshots.push({
    revision: current.revision, label: 'Current build', capturedOn: null,
    path: `knowledge/v1/snapshots/${current.revision}.json`,
    bytes: Buffer.byteLength(json(current)), sha256: sha256(json(current)), snapshot: current,
  });
  for (const entry of snapshots) if (entry.snapshot.site !== current.site) throw new Error('Archived snapshot belongs to another site');
  return {
    version: 1, site: current.site, currentRevision: current.revision,
    retention: 'Selected snapshots are retained in the repository. This is not a record of every deployment. Capture dates record when snapshots were saved, not when pages were published or documentation was reviewed. Removed records remain readable inside the preceding snapshot.',
    entries: snapshots.map((entry, i) => {
      const { snapshot, ...metadata } = entry;
      return { ...metadata, current: entry.revision === current.revision, previousRevision: snapshots[i - 1]?.revision || null,
        documentCount: snapshot.documents.length, changes: i ? diffDocuments(snapshots[i - 1].snapshot, snapshot) : null };
    }).reverse(),
  };
}

export function historyMarkdown(history, site) {
  let text = `# Knowledge changes\n\n${history.retention}\n\n${link('JSON change feed', new URL('history/index.json', site).href)}\n\n`;
  for (const entry of history.entries) {
    text += `## ${entry.label}\n\nRevision: ${entry.revision}\n\nCaptured: ${entry.capturedOn || 'Current build; not a retained release yet'}\n\n${link('Complete snapshot', new URL(entry.path, site).href)}\n\nSHA-256: ${entry.sha256}\n\nBytes: ${entry.bytes}\n\n`;
    if (!entry.changes) { text += 'Archive baseline. No earlier snapshot is retained for comparison.\n\n'; continue; }
    text += `Compared with: ${entry.previousRevision}\n\n`;
    for (const [kind, records] of Object.entries(entry.changes)) {
      text += `### ${kind[0].toUpperCase() + kind.slice(1)} (${records.length})\n\n`;
      text += records.length ? records.map(record => `- ${kind === 'removed' ? record.title : link(record.title, record.url)}: ${record.id}, revision ${record.revision}${record.previousRevision ? ` (previous ${record.previousRevision})` : ''}\n`).join('') + '\n' : 'None.\n\n';
    }
  }
  return text;
}
