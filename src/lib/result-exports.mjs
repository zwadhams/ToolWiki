import { markdownText as md, markdownLink as link } from './knowledge-markdown.mjs';
import { analyzeSystem } from './system-builder.mjs';
import { profileSchema } from './system-schema.mjs';
import { catalogResultSchema, recommendationReportSchema } from './result-schema.mjs';

export const COMPARISON_ROWS = [
  ['Use it for', 'useWhen'], ['What you need', 'setup'], ['What it can tell you', 'result'],
  ['Checks and limits', 'limit'], ['Where it runs', 'environment'], ['Cost', 'cost'],
];
export const COMPARISON_DETAILS = [
  ['Analysis mode', 'modes'], ['What it examines', 'inputTypes'], ['Languages / ecosystem', 'languages'],
  ['Language support', 'languageNote'], ['Techniques', 'techniques'], ['Cost and edition limits', 'costNote'],
  ['License', 'license'], ['Edition and scope', 'scope'], ['Docs checked', 'verified'],
];
const value = text => Array.isArray(text) ? text.join(' / ') : String(text ?? '');
const json = data => JSON.stringify(data, null, 2) + '\n';

export function catalogSelection(catalog, ids, filters, sourceUrl, knowledgeBase, expectedRevision) {
  if (catalog.revision !== expectedRevision) throw new Error('This site changed since it was loaded. Reload the page and try again.');
  const byId = new Map(catalog.tools.map(tool => [tool.id, tool]));
  const tools = ids.map(id => {
    const tool = byId.get(id);
    if (!tool) throw new Error('A selected tool is missing. Reload the page and try again.');
    return tool;
  });
  return catalogResultSchema.parse({ version: 1, kind: 'catalog-results', snapshotRevision: catalog.revision, sourceUrl, knowledgeBase, filters, count: tools.length, tools });
}

/** Quote RFC 4180 cells; neutralize formula-like strings for spreadsheet use. */
export function csvCell(raw) {
  let text = value(raw);
  if (/^[\s]*[=+@-]/.test(text) || /^[\t\r\n]/.test(text)) text = "'" + text;
  return `"${text.replaceAll('"', '""')}"`;
}
export function catalogCsv(selection) {
  const columns = ['id', 'title', 'description', 'url', 'revision', 'snapshotRevision', 'languages', 'languageNote', 'inputTypes', 'findings', 'findingNote', 'techniques', 'cost', 'costNote', 'licenseCategory', 'environment', 'reviewedHostPlatforms', 'reviewedTargetPlatforms', 'scope', 'documentationReviewedOn', 'executionStatus', 'executionScope', 'record', 'markdown'];
  const rows = selection.tools.map(tool => ({
    ...tool, snapshotRevision: selection.snapshotRevision,
    documentationReviewedOn: tool.evidence.documentationReviewedOn,
    executionStatus: tool.evidence.execution.status, executionScope: tool.evidence.execution.scope,
    record: new URL(tool.record, selection.knowledgeBase).href,
    markdown: new URL(tool.markdown, selection.knowledgeBase).href,
  }));
  return [columns.map(csvCell).join(','), ...rows.map(row => columns.map(key => csvCell(row[key])).join(','))].join('\r\n') + '\r\n';
}

const evidenceLines = citation => `Source: ${link(citation.title, citation.url)}\n\nContent revision: ${citation.revision}\n\nDocumentation reviewed: ${citation.evidence.documentationReviewedOn || 'Not recorded'}\n\nExecution evidence: ${citation.evidence.execution.status}. ${md(citation.evidence.execution.scope)}\n\n${citation.evidence.execution.sources.map(url => `- ${link('Execution record', url)}\n`).join('')}`;

export function comparisonMarkdown(tools, choices, sourceUrl, snapshotRevision, site) {
  if (tools.length < 2) throw new Error('Choose at least two tools to export a comparison.');
  let text = `# Tool comparison\n\n${link('Open this comparison', sourceUrl)}\n\nSnapshot revision: ${snapshotRevision}\n\nDocumentation comparison, not a benchmark or a guarantee of equal checks or coverage.\n\n`;
  text += `| Field | ${tools.map(t => md(t.title)).join(' | ')} |\n| --- | ${tools.map(() => '---').join(' | ')} |\n`;
  for (const [label, key] of [...COMPARISON_ROWS, ...COMPARISON_DETAILS]) text += `| ${label} | ${tools.map(t => md(value(t[key]))).join(' | ')} |\n`;
  for (const choice of choices.filter(choice => choice.tools.every(id => tools.some(t => t.id === id)))) {
    text += `\n## ${md(choice.title)}\n\n${md(choice.summary)}\n\n${link(choice.linkText, new URL(choice.href, site).href)}\n`;
  }
  for (const tool of tools) {
    text += `\n## ${md(tool.title)} sources and evidence\n\n${evidenceLines(tool.citation)}\n`;
    text += tool.sources.map(source => `- ${link(source.label, source.url)}\n`).join('');
  }
  return text;
}

export function recommendationReport(profile, tools, selectedToolIds, sourceUrl, snapshotRevision) {
  const savedProfile = profileSchema.parse(profile);
  const results = analyzeSystem(savedProfile, tools);
  const selected = selectedToolIds.filter(id => tools.some(tool => tool.id === id));
  const used = new Set([...results.matches.map(match => match.toolId), ...selected]);
  return recommendationReportSchema.parse({
    version: 1, kind: 'recommendations', snapshotRevision, sourceUrl,
    limitation: 'Recommendations use reviewed workflows and the supplied description. They do not measure coverage or establish that a check was executed. Unknown details are not confirmed support.',
    profile: savedProfile, selectedToolIds: selected, results, tools: tools.filter(tool => used.has(tool.id)),
  });
}

export function recommendationMarkdown(report) {
  let text = `# ${md(report.profile.name || 'System')} recommendations\n\n${link('ToolWiki system builder', report.sourceUrl)}\n\nSnapshot revision: ${report.snapshotRevision}\n\n${report.limitation}\n\n`;
  text += `Selected tools: ${report.selectedToolIds.map(md).join(', ') || 'None'}.\n\n`;
  for (const subject of report.results.subjects) {
    text += `## ${md(subject.name)}\n\n`;
    const gap = report.results.gaps.find(gap => gap.subjectId === subject.subjectId);
    text += `Status: ${subject.needsDescription ? 'Needs a description' : gap?.status || 'gap'}.\n\n`;
    if (gap) text += gap.reasons.map(reason => `- ${md(reason)}\n`).join('');
    const matches = report.results.matches.filter(match => match.subjectId === subject.subjectId);
    if (!matches.length) text += 'No reviewed workflow matches this description yet.\n';
    for (const match of matches) {
      const tool = report.tools.find(tool => tool.id === match.toolId);
      const workflow = tool.analysisWorkflows.find(workflow => workflow.id === match.workflowId);
      text += `\n### ${md(tool.title)}: ${md(workflow.label)}\n\nStatus: ${match.status}\n\nCan help find: ${md(match.findings.join(', '))}\n\n`;
      for (const [label, reasons] of [['Match reasons', match.reasons], ['Information needed', match.unresolved], ['Unmet requirements', match.blocked]]) {
        if (reasons.length) text += `${label}:\n\n${reasons.map(reason => `- ${md(reason)}\n`).join('')}\n`;
      }
      if (match.questions.length) text += `Questions:\n\n${match.questions.map(question => `- ${md(question.field)}: ${md(question.message)}\n`).join('')}\n`;
      text += `Workflow limits: ${md(workflow.caveat)}\n\n`;
      text += workflow.sources.map(url => `- ${link('Workflow source', url)}\n`).join('');
    }
  }
  for (const tool of report.tools) {
    text += `\n## ${md(tool.title)} requirements and evidence\n\n`;
    for (const [label, key] of [['Setup', 'setup'], ['Environment', 'environment'], ['Scope', 'scope'], ['Cost', 'cost'], ['Cost conditions', 'costNote'], ['License category', 'licenseCategory']]) text += `- **${label}:** ${md(value(tool[key]))}\n`;
    text += `\n${evidenceLines(tool.citation)}\n`;
  }
  text += `\n## System description\n\nThis is the input used for this report, including notes and excluded components.\n\n\`\`\`json\n${json(report.profile)}\`\`\`\n`;
  return text;
}
