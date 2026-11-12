import { markdownText as md, markdownLink as link } from './knowledge-markdown.mjs';

export const STATIC_COMPARISON_ROWS = [
  ['Use it for', 'useWhen'], ['What you need', 'setup'], ['What you get', 'result'],
  ['Checks and limits', 'limit'], ['Where it runs', 'environment'],
  ['Cost conditions', 'costNote'], ['Edition and scope', 'scope'],
];

/** @returns {Array<{id: string, title: string, url: string, verified: string, sources: Array<{label: string, url: string}>, execution: {status: string, scope: string, sources: string[]}} & Record<string, any>>} */
export function staticComparisonTools(ids, entries, site) {
  return (ids || []).map(id => {
    const entry = entries.find(entry => entry.id === id && entry.data.tool && !entry.data.draft);
    if (!entry) throw new Error(`Missing static comparison tool: ${id}`);
    const tool = entry.data.tool;
    return { id, title: entry.data.title, url: new URL(id + '/', site).href,
      ...tool, ...tool.decision,
      execution: entry.data.executionEvidence || { status: 'not-recorded', scope: 'No structured execution record is supplied.', sources: [] },
    };
  });
}

export function staticComparisonMarkdown(ids, entries, site) {
  const tools = staticComparisonTools(ids, entries, site);
  if (!tools.length) return '';
  let text = '\n## Requirements and results\n\nDocumentation comparison; shared labels do not establish equal checks or coverage.\n\n';
  text += `| Field | ${tools.map(tool => link(tool.title, tool.url)).join(' | ')} |\n| --- | ${tools.map(() => '---').join(' | ')} |\n`;
  for (const [label, key] of STATIC_COMPARISON_ROWS) text += `| ${label} | ${tools.map(tool => md(tool[key] || '')).join(' | ')} |\n`;
  text += '\n## Comparison sources and evidence\n\n';
  for (const tool of tools) {
    text += `### ${md(tool.title)}\n\nDocs checked ${tool.verified}. Execution: ${tool.execution.status}. ${md(tool.execution.scope)}\n\n`;
    text += [...tool.sources, ...tool.execution.sources.map(url => ({ label: 'Execution record', url }))].map(source => `- ${link(source.label, source.url)}\n`).join('') + '\n';
  }
  return text;
}
