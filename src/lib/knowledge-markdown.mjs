import { editionComparisons } from '../data/editions.mjs';

export const markdownText = value => String(value).replace(/[\\`*_[\]<>|#!]/g, '\\$&').replace(/\r?\n/g, ' ');
export const markdownLink = (label, url) => `[${markdownText(label)}](${url.replace(/\(/g, '%28').replace(/\)/g, '%29')})`;
const fact = (label, value) => `- **${label}:** ${markdownText(Array.isArray(value) ? value.join(', ') : value)}\n`;

export function builderScopeMarkdown(tools, site) {
  const unmatched = tools.filter(tool => !tool.analysisWorkflows.length);
  let text = `\n## Suggestion scope\n\n${tools.length - unmatched.length} of ${tools.length} catalog tools have reviewed workflows used by the builder.\n\n`;
  if (unmatched.length) {
    text += 'These tools are not matched yet but may still be suitable:\n\n';
    text += unmatched.map(tool => `- ${markdownLink(tool.title, new URL(tool.id + '/', site).href)}\n`).join('');
  }
  return text;
}

/** Include the metadata rendered by ArticleContent and EditionComparison. */
export function profileMarkdown(tool, site, description = '') {
  if (!tool) return '';
  let text = '\n';
  if (description) text += fact('Summary', description);
  text += fact('Use it for', tool.decision?.useWhen || description || tool.scope);
  text += fact('What you need', tool.setup);
  if (tool.decision) text += fact('What you get', tool.decision.result);
  text += fact('Checks and limits', tool.decision?.limit || tool.findingNote);
  text += fact('Finding scope', tool.findingNote);
  text += `\n## Compatibility and scope\n\n`;
  if (tool.aliases.length) text += fact('Also known as', tool.aliases);
  for (const [label, key] of [
    ['Analysis mode', 'modes'], ['What it examines', 'inputTypes'], ['Context', 'targets'],
    ['Techniques', 'techniques'], ['Finding categories', 'findings'], ['Where it runs', 'environment'],
    ['Languages / ecosystem', 'languages'], ['Language support', 'languageNote'], ['Edition and scope', 'scope'],
  ]) text += fact(label, tool[key]);
  text += `\n## Cost and editions\n\n`;
  for (const [label, key] of [['Cost', 'cost'], ['Cost conditions', 'costNote'], ['License category', 'licenseCategory'], ['License', 'license']]) text += fact(label, tool[key]);
  const comparison = editionComparisons[tool.editionGroup];
  if (comparison) {
    text += `\n${markdownText(comparison.intro)}\n\n| Edition or use | Cost | Capabilities and limits |\n| --- | --- | --- |\n`;
    for (const edition of comparison.editions) {
      const wiki = edition.slug ? ` (${markdownLink('Wiki entry', new URL(edition.slug + '/', site).href)})` : '';
      text += `| ${markdownLink(edition.name, edition.url)}${wiki} | ${markdownText(edition.cost)} | ${markdownText(edition.difference)} |\n`;
    }
    if (comparison.note) text += `\n${markdownText(comparison.note)}\n`;
    if (comparison.source) text += `\n${markdownLink(comparison.source.label, comparison.source.url)}\n`;
  }
  text += `\nCost information checked ${tool.verified}. Runtimes, hosting, and compute may cost extra. Free trials are not counted as free editions.\n`;
  text += `\n## Sources and evidence\n\n${markdownLink('Official website', tool.website)}\n\n`;
  text += tool.sources.map(source => `- ${markdownLink(source.label, source.url)}\n`).join('');
  return text;
}

export function evidenceMarkdown(evidence, url, recordUrl) {
  let text = `\nSource: ${markdownLink('ToolWiki page', url)}. ${markdownLink('JSON record and content revision', recordUrl)}.\n\n`;
  text += fact('Documentation reviewed', evidence.documentationReviewedOn || 'Not recorded');
  text += fact('Execution evidence', evidence.execution.status);
  text += fact('Execution scope', evidence.execution.scope);
  text += evidence.execution.sources.map(source => `- ${markdownLink('Execution record', source)}\n`).join('');
  text += '\nDocumentation review is separate from execution evidence. A recorded execution applies only to its stated environment and scope; not-recorded means no structured execution record is supplied.\n';
  return text;
}
