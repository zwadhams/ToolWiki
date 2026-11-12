import type { APIRoute } from 'astro';

export const GET: APIRoute = () => {
  const site = new URL(import.meta.env.BASE_URL.replace(/\/$/, '') + '/', import.meta.env.SITE).href;
  return new Response(`# ToolWiki

> Software analysis tools, practical workflows, concepts, and research notes.

All knowledge is available as static files. Fetch the index, choose document IDs,
then follow their Markdown or JSON paths relative to the manifest URL. Filter
downloaded data locally; query parameters do not filter static JSON responses.
Read prerequisites, edition limits, and evidence scope. Preserve existing project
configuration when adapting commands. Cite page URLs and JSON record revisions.
Documentation review is separate from recorded execution; not-recorded means no
structured execution record is supplied. For a consistent collection, validate
the snapshot against its manifest byte count and SHA-256 and keep it for the task.

## Start here

- [Tool catalog](${site}knowledge/v1/catalog.json): Compact tool metadata for local filtering, with links to complete records. Platform lists cover reviewed workflows only.
- [Data access guide](${site}knowledge/v1/documents/guides/data-access.md): Downloads and a Python fetch example.
- [Document index](${site}knowledge/v1/index.json): IDs, descriptions, sections, and paths to all records.
- [Manifest](${site}knowledge/v1/manifest.json): Current snapshot path, revision, byte counts, and checksums.
- [Format reference](${site}knowledge/v1/documents/guides/agents-reference.md): Record format and evidence semantics.

## Example workflows

- [Python checks](${site}knowledge/v1/documents/guides/python-checks.md): Linting and type checking.
- [HTTP API testing](${site}knowledge/v1/documents/guides/api-testing.md): A disposable API example.
- [Memory checks](${site}knowledge/v1/documents/guides/memory-error-detection.md): Requirements and platform scope.
`, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
