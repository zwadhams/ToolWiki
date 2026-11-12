import { McpServer } from '@modelcontextprotocol/server';
import { serveStdio } from '@modelcontextprotocol/server/stdio';
import { fileURLToPath } from 'node:url';
import { createKnowledge, loadKnowledge } from './knowledge.mjs';
import { boundedToolResult } from './result.mjs';

export function createServer(knowledge: ReturnType<typeof createKnowledge>) {
  const server = new McpServer({ name: 'toolwiki', version: '0.1.0' }, {
    instructions: 'Preserve existing project configuration when recommending or running checks. Inspect it before proposing changes; if unavailable, give conditional advice. Reuse project rules, targets, exclusions and tool versions. Label new-project defaults and CLI overrides explicitly; never silently replace settings. In every answer based on ToolWiki, cite the document URLs and exact snapshotRevision returned by the tools. Keep documentation review separate from execution evidence. For Ruff, --select overrides the configured rule selection; prefer the existing configuration and explain any proposed additions.',
  });
  const descriptions = {
    search_knowledge: 'Search published ToolWiki documents. Empty query browses. Language/input/mode/finding filters apply to tool metadata only; use kind=guide for workflow instructions. Results include document IDs and section IDs.',
    get_document: 'Read a ToolWiki document or section with sources, evidence scope and revision. Follow nextOffset until null to obtain all content; chunks may split code blocks. Read prerequisites and limitations before executing examples.',
    compare_tools: 'Compare 2-4 distinct tool profiles using the same metadata as the website. Returns requirements, scope, costs, limitations and citations.',
    recommend_checks: 'Evaluate a version-1 system-builder profile with the website rules. Returns candidate/details/blocked matches, missing information and gaps. Paginate with nextOffset. The profile format is documented in guides/agents-reference.',
  };
  for (const name of Object.keys(descriptions) as (keyof typeof descriptions)[]) {
    server.registerTool(name, {
      description: `${descriptions[name]} Preserve existing project configuration when recommending commands; label defaults and overrides. Cite source URLs and the exact returned snapshotRevision in your answer.`, inputSchema: knowledge.schemas[name],
      annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false },
    }, async (input: unknown) => {
      try {
        const result = knowledge.call(name, input);
        return boundedToolResult(result) as { content: { type: 'text'; text: string }[]; structuredContent: typeof result };
      } catch (error) {
        return { isError: true, content: [{ type: 'text' as const, text: error instanceof Error ? error.message : 'Knowledge request failed.' }] };
      }
    });
  }
  server.registerResource('snapshot', 'toolwiki://snapshot', { mimeType: 'application/json', description: 'Pinned snapshot identity and document inventory. Read documents with get_document.' }, async uri => {
    const result = { contents: [{ uri: uri.href, mimeType: 'application/json', text: JSON.stringify({ version: 1, revision: knowledge.snapshot.revision, documents: knowledge.snapshot.documents.map(({ id, title, url, revision }: { id: string; title: string; url: string; revision: string }) => ({ id, title, url, revision })) }) }] };
    if (Buffer.byteLength(JSON.stringify(result)) > 120000) throw new Error('Resource inventory exceeds 120000 bytes. Browse with paginated search_knowledge instead.');
    return result;
  });
  return server;
}

const args = process.argv.slice(2);
if (args.length && (args.length !== 2 || args[0] !== '--manifest')) {
  console.error('Usage: node --experimental-strip-types mcp/server.ts [--manifest PATH_OR_URL]'); process.exitCode = 1;
} else {
  try {
    const manifest = args[1] || fileURLToPath(new URL('../dist/knowledge/v1/manifest.json', import.meta.url));
    const knowledge = createKnowledge(await loadKnowledge(manifest));
    serveStdio(() => createServer(knowledge));
  } catch (error) {
    console.error(`ToolWiki startup failed: ${error instanceof Error ? error.message : error}`); process.exitCode = 1;
  }
}
