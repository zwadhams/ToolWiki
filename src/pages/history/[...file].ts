import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection } from 'astro:content';
import { buildKnowledge } from '../../lib/knowledge-export.mjs';
import { readArchive, buildHistory, historyMarkdown } from '../../lib/knowledge-history.mjs';

export const getStaticPaths: GetStaticPaths = async () => {
  const site = new URL(import.meta.env.BASE_URL.replace(/\/$/, '') + '/', import.meta.env.SITE).href;
  const { snapshot } = buildKnowledge(await getCollection('docs'), site);
  const history = buildHistory(snapshot, await readArchive());
  return [
    { params: { file: 'index.json' }, props: { content: JSON.stringify(history, null, 2) + '\n', type: 'application/json' } },
    { params: { file: 'changes.md' }, props: { content: historyMarkdown(history, site), type: 'text/markdown' } },
  ];
};
export const GET: APIRoute = ({ props }) => new Response(props.content, { headers: { 'Content-Type': props.type + '; charset=utf-8' } });
