import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection } from 'astro:content';
import { buildKnowledge } from '../../../lib/knowledge-export.mjs';

export const getStaticPaths: GetStaticPaths = async () => {
  const { files } = buildKnowledge(await getCollection('docs'), new URL(import.meta.env.BASE_URL.replace(/\/$/, '') + '/', import.meta.env.SITE).href);
  return [...files].map(([file, content]) => ({ params: { file }, props: { content, file } }));
};
export const GET: APIRoute = ({ props }) => new Response(props.content, {
  headers: { 'Content-Type': props.file.endsWith('.md') ? 'text/markdown; charset=utf-8' : 'application/json; charset=utf-8' },
});
