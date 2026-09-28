import { ACCESS, GOALS, profileSchema } from './system-schema.mjs';

export const STORAGE_KEY = 'toolwiki.analysis-suite.v1';
export const MAX_IMPORT_BYTES = 1024 * 1024;
export function newComponent(id = crypto.randomUUID()) {
  return { id, name: '', included: true, kind: '', languages: [], inputs: [], inputsComplete: false, goals: [], notes: '', binaryFormat: '', hostPlatform: '', targetPlatform: '', deployment: '', technologies: [], access: { rebuild: 'unknown', instrument: 'unknown', harness: 'unknown', testInstance: 'unknown' } };
}
export function newConnection(id = crypto.randomUUID(), from = '', to = '') {
  return { id, name: '', included: true, from, to, interface: '', transport: '', definition: '', testInstance: 'unknown', harness: 'unknown', hostPlatform: '', goals: [], notes: '' };
}
export function newProfile() {
  return { version: 1, name: '', preferences: { cost: '', license: '' }, components: [newComponent()], connections: [] };
}
export function parseProfile(raw) {
  if (typeof raw !== 'string' || new TextEncoder().encode(raw).length > MAX_IMPORT_BYTES) throw new Error('Choose a system file smaller than 1 MB.');
  let value;
  try { value = JSON.parse(raw); } catch { throw new Error('This file is not valid JSON. Your current system has been kept.'); }
  if (value?.version !== 1) throw new Error('This system file version is not supported. Your current system has been kept.');
  const parsed = profileSchema.safeParse(value);
  if (!parsed.success) throw new Error('This system file contains invalid fields or connections. Your current system has been kept.');
  return parsed.data;
}
export function serializeProfile(profile) { return JSON.stringify(profileSchema.parse(profile), null, 2); }
export function restoreProfile(storage) {
  let raw;
  try {
    raw = storage.getItem(STORAGE_KEY);
  } catch { return { profile: newProfile(), error: 'Browser saving is unavailable. You can continue and export your system.' }; }
  try { return { profile: raw ? parseProfile(raw) : newProfile(), error: '' }; }
  catch { return { profile: newProfile(), error: 'The saved system could not be read. Import an exported system file or start a new description.' }; }
}
export function saveProfile(storage, profile) {
  try { storage.setItem(STORAGE_KEY, serializeProfile(profile)); return ''; }
  catch { return 'Browser saving is unavailable. You can continue and export your system.'; }
}
export function removeComponent(profile, id) {
  return { ...profile, components: profile.components.filter(c => c.id !== id), connections: profile.connections.filter(c => c.from !== id && c.to !== id) };
}
export function removalSnapshot(profile, id, type) {
  return {
    type,
    component: type === 'component' ? { value: structuredClone(profile.components.find(c => c.id === id)), index: profile.components.findIndex(c => c.id === id) } : null,
    connections: profile.connections.map((value, index) => ({ value: structuredClone(value), index })).filter(({ value }) => type === 'component' ? value.from === id || value.to === id : value.id === id),
  };
}
export function undoRemoval(profile, snapshot) {
  const restored = structuredClone(profile);
  if (snapshot.component && !restored.components.some(c => c.id === snapshot.component.value.id)) restored.components.splice(snapshot.component.index, 0, snapshot.component.value);
  const ids = new Set(restored.components.map(c => c.id));
  for (const { value, index } of snapshot.connections) {
    if (!restored.connections.some(c => c.id === value.id) && (!value.from || ids.has(value.from)) && (!value.to || ids.has(value.to))) restored.connections.splice(index, 0, value);
  }
  return profileSchema.parse(restored);
}
export function subjectName(profile, subject) {
  if (subject.name.trim()) return subject.name.trim();
  if ('from' in subject) {
    const endpoint = id => { const index = profile.components.findIndex(c => c.id === id); return index < 0 ? 'Choose endpoint' : subjectName(profile, profile.components[index]); };
    return `${endpoint(subject.from)} to ${endpoint(subject.to)}`;
  }
  return `Component ${profile.components.findIndex(c => c.id === subject.id) + 1}`;
}
const unique = values => [...new Set(values)];
const knownLanguages = subject => (subject.languages || []).filter(l => !['Other', 'Not sure'].includes(l));

function evaluateWorkflow(subject, type, workflow, preferences, tool) {
  if (workflow.subject !== type) return null;
  const reasons = [], unresolved = [], blocked = [];
  const checkChoice = (value, allowed, label, excluded = []) => {
    if (!allowed.length && !excluded.length) return;
    if (!value) unresolved.push(`Specify ${label}.`);
    else if (excluded.includes(value)) blocked.push(`${label}: ${value} is outside this workflow's documented support.`);
    else if (allowed.length && !allowed.includes(value)) unresolved.push(`Verify ${label}: ${value} is not in this workflow's documented examples.`);
    else reasons.push(`${label}: ${value}`);
  };
  if (type === 'component') {
    let hasEvidence = workflow.inputs.some(input => subject.inputs.includes(input))
      || (subject.binaryFormat && workflow.binaryFormats.includes(subject.binaryFormat))
      || workflow.technologies.some(technology => subject.technologies.includes(technology));
    if (workflow.languageScope !== 'independent') {
      const languages = workflow.languageScope === 'configuration' || workflow.languageScope === 'model' || workflow.languageScope === 'ecosystem'
        ? unique([...knownLanguages(subject), ...subject.technologies]) : knownLanguages(subject);
      const matches = languages.filter(l => workflow.languages.includes(l));
      if (!matches.length && languages.length) return null;
      if (!matches.length && subject.languages.includes('Other') && !subject.languages.includes('Not sure')) return null;
      if (matches.length) hasEvidence = true;
      if (!matches.length) unresolved.push(`Specify a supported ${workflow.languageScope === 'configuration' ? 'configuration format' : 'language or ecosystem'}: ${workflow.languages.join(', ')}.`);
      else reasons.push(`${workflow.languageScope === 'ecosystem' ? 'Dependency ecosystem' : 'Language or format'}: ${matches.join(', ')}`);
    }
    // Unknown answers qualify a plausible match; they do not make every tool
    // relevant. Require evidence from this component before suggesting a workflow.
    if (!hasEvidence) return null;
    for (const input of workflow.inputs) {
      if (subject.inputs.includes(input)) reasons.push(`Available input: ${input}`);
      else if (subject.inputsComplete) blocked.push(`Requires ${input.toLowerCase()}, which is not available.`);
      else unresolved.push(`Can you provide ${input.toLowerCase()}?`);
    }
    if (workflow.binaryFormats.length) {
      if (!subject.binaryFormat) unresolved.push(`Specify the binary format: ${workflow.binaryFormats.join(' or ')}.`);
      else if (!workflow.binaryFormats.includes(subject.binaryFormat)) return null;
      else reasons.push(`Binary format: ${subject.binaryFormat}`);
    }
    if (workflow.technologies.length && !workflow.technologies.some(t => subject.technologies.includes(t))) unresolved.push(`Confirm the required technology: ${workflow.technologies.join(' or ')}.`);
    checkChoice(subject.targetPlatform, workflow.targetPlatforms, 'target OS', workflow.excludedTargets);
  } else {
    // A TCP transport is never evidence of MQTT, HTTP, or another application protocol.
    if (subject.interface && !workflow.interfaces.includes(subject.interface)) return null;
    if (!workflow.interfaces.includes(subject.interface)
      && !workflow.transports.includes(subject.transport)
      && !workflow.definitions.includes(subject.definition)) return null;
    if (!subject.interface) unresolved.push(`Specify the interface: ${workflow.interfaces.join(' or ')}.`);
    else reasons.push(`Interface: ${subject.interface}`);
    if (!subject.from || !subject.to) unresolved.push('Choose both connection endpoints.');
    if (workflow.transports.length) {
      if (!subject.transport) unresolved.push(`Specify the transport: ${workflow.transports.join(' or ')}.`);
      else if (!workflow.transports.includes(subject.transport)) return null;
      else reasons.push(`Transport: ${subject.transport}`);
    }
    if (workflow.definitions.length) {
      if (!subject.definition) unresolved.push(`Can you provide ${workflow.definitions.join(' or ')}?`);
      else if (!workflow.definitions.includes(subject.definition)) blocked.push(`Requires ${workflow.definitions.join(' or ')}; selected definition: ${subject.definition}.`);
      else reasons.push(`Definition: ${subject.definition}`);
    }
  }
  checkChoice(subject.hostPlatform, workflow.hostPlatforms, 'analysis host OS', workflow.excludedHosts);
  for (const requirement of workflow.requires) {
    const answer = type === 'component' ? subject.access[requirement] : subject[requirement];
    if (answer === 'no') blocked.push(`Requires the ability to ${ACCESS[requirement].toLowerCase()}.`);
    else if (answer !== 'yes') unresolved.push(`Can you ${ACCESS[requirement].toLowerCase()}?`);
    else reasons.push(`You can ${ACCESS[requirement].toLowerCase()}.`);
  }
  if (preferences.license && preferences.license !== tool.licenseCategory) blocked.push(`This edition uses a ${tool.licenseCategory.toLowerCase()} license.`);
  if (preferences.cost && !(preferences.cost === 'any-free' ? tool.cost.some(c => c === 'Free' || c === 'Free with limits') : tool.cost.includes(preferences.cost))) blocked.push(`This edition does not match your cost preference (${tool.cost.join(' / ')}).`);
  return { reasons, unresolved, blocked, status: blocked.length ? 'blocked' : unresolved.length ? 'details' : 'candidate' };
}

export function analyzeSystem(profile, tools) {
  const matches = [], gaps = [], subjects = [];
  for (const [type, parts] of [['component', profile.components], ['connection', profile.connections]]) {
    for (const subject of parts.filter(s => s.included)) {
      const subjectMatches = [];
      const needsDescription = type === 'component'
        ? !subject.languages.some(language => language !== 'Not sure') && !subject.inputs.length && !subject.technologies.length && !subject.binaryFormat && !subject.inputsComplete
        : !subject.interface && !subject.transport && !subject.definition;
      if (!needsDescription) {
        for (const tool of tools) {
          for (const workflow of tool.analysisWorkflows || []) {
            const evaluation = evaluateWorkflow(subject, type, workflow, profile.preferences, tool);
            if (!evaluation) continue;
            const goalIds = GOALS.filter(goal => workflow.findings.some(finding => goal.findings.includes(finding))).map(goal => goal.id);
            subjectMatches.push({ toolId: tool.id, workflowId: workflow.id, subjectType: type, subjectId: subject.id, goalIds, findings: [...workflow.findings], ...evaluation });
          }
        }
        const status = subjectMatches.some(m => m.status === 'candidate') ? 'candidate'
          : subjectMatches.some(m => m.status === 'details') ? 'details'
          : subjectMatches.some(m => m.status === 'blocked') ? 'blocked' : 'gap';
        gaps.push({ subjectType: type, subjectId: subject.id, status, reasons: unique(subjectMatches.filter(m => m.status === status).flatMap(m => {
          const title = tools.find(t => t.id === m.toolId)?.title || m.toolId;
          return (status === 'blocked' ? m.blocked : status === 'details' ? m.unresolved : []).map(reason => `${title}: ${reason}`);
        })) });
      }
      matches.push(...subjectMatches);
      const grouped = new Map();
      for (const match of subjectMatches.filter(m => m.status !== 'blocked')) {
        if (!grouped.has(match.toolId)) grouped.set(match.toolId, { toolId: match.toolId, status: 'details', matches: [] });
        const entry = grouped.get(match.toolId);
        entry.matches.push(match);
        if (match.status === 'candidate') entry.status = 'candidate';
      }
      const title = id => tools.find(t => t.id === id)?.title || id;
      const candidates = [...grouped.values()].sort((a, b) => (a.status === 'candidate' ? 0 : 1) - (b.status === 'candidate' ? 0 : 1) || title(a.toolId).localeCompare(title(b.toolId), 'en'));
      subjects.push({ subjectId: subject.id, subjectType: type, name: subjectName(profile, subject), candidates, needsDescription });
    }
  }
  return { matches, gaps, subjects };
}
