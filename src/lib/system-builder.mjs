import { ACCESS, GOALS, profileSchema } from './system-schema.mjs';

export const STORAGE_KEY = 'toolwiki.analysis-suite.v1';
export const MAX_IMPORT_BYTES = 1024 * 1024;
const sizeLabel = '1 MiB';
export class ProfileDataError extends Error {
  constructor(code, message) { super(message); this.name = 'ProfileDataError'; this.code = code; }
}
const byteLength = raw => new TextEncoder().encode(raw).length;
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
  if (typeof raw !== 'string') throw new ProfileDataError('format', 'This file is not valid JSON. Your current system has been kept.');
  if (byteLength(raw) > MAX_IMPORT_BYTES) throw new ProfileDataError('size', `System files can be up to ${sizeLabel}. Your current system has been kept.`);
  let value;
  try { value = JSON.parse(raw); } catch { throw new ProfileDataError('format', 'This file is not valid JSON. Your current system has been kept.'); }
  if (value?.version !== 1) throw new ProfileDataError('version', 'This system file version is not supported. Your current system has been kept.');
  const parsed = profileSchema.safeParse(value);
  if (!parsed.success) throw new ProfileDataError('schema', 'This system file contains invalid fields or connections. Your current system has been kept.');
  return parsed.data;
}
export function serializeProfile(profile) {
  const parsed = profileSchema.safeParse(profile);
  if (!parsed.success) throw new ProfileDataError('schema', 'This description contains invalid fields or connections. Correct them before saving or exporting.');
  const raw = JSON.stringify(parsed.data, null, 2);
  if (byteLength(raw) > MAX_IMPORT_BYTES) throw new ProfileDataError('size', `The formatted description exceeds ${sizeLabel}. Reduce notes, selected languages, or system parts before saving or exporting.`);
  return raw;
}
/** Preflight the representation we will save, before committing any import state. */
export function prepareProfileImport(raw) {
  const profile = parseProfile(raw);
  try { serializeProfile(profile); }
  catch (error) {
    if (error instanceof ProfileDataError && error.code === 'size') throw new ProfileDataError('normalized-size', `This file expands beyond ${sizeLabel} when prepared for saving. Reduce its contents before importing. Your current system has been kept.`);
    throw error;
  }
  return profile;
}
export function recoveryMessage(recovery) {
  return recovery?.kind === 'read-error'
    ? 'Saved data could not be read. Automatic saving is paused; current edits remain in memory. Retry reading saved data.'
    : 'Automatic saving is paused to protect saved data. Download recovery data before choosing Replace saved system to save this description.';
}
export function restoreProfile(storage) {
  let raw;
  try {
    raw = storage.getItem(STORAGE_KEY);
  } catch {
    const recovery = { kind: 'read-error', raw: null, reason: 'Browser storage could not be read.' };
    return { profile: newProfile(), raw: null, recovery, error: recoveryMessage(recovery) };
  }
  try { return { profile: raw === null ? newProfile() : parseProfile(raw), raw, recovery: null, error: '' }; }
  catch (error) {
    const recovery = { kind: 'unreadable', raw, reason: error.message };
    return { profile: newProfile(), raw, recovery, error: recoveryMessage(recovery) };
  }
}
/** A retry reads only. A discovered saved copy stays protected from current in-memory edits. */
export function retryProfileRead(storage) {
  const restored = restoreProfile(storage);
  if (restored.recovery || restored.raw === null) return restored;
  const recovery = { kind: 'saved-copy', raw: restored.raw, reason: 'Saved data is available again. Your current description has been kept in memory.' };
  return { ...restored, recovery, error: recoveryMessage(recovery) };
}
function writeProfile(storage, profile) {
  let raw;
  try { raw = serializeProfile(profile); }
  catch (error) { return `${error.message} Current edits have not been saved; existing stored data has been kept.`; }
  try { storage.setItem(STORAGE_KEY, raw); return ''; }
  catch { return 'Browser saving is unavailable. Current edits remain in memory; export your system before leaving.'; }
}
export function saveProfile(storage, profile, recovery = null) {
  if (recovery) {
    try { serializeProfile(profile); }
    catch (error) { return `${error.message} ${recoveryMessage(recovery)}`; }
    return recoveryMessage(recovery);
  }
  return writeProfile(storage, profile);
}
/** Called only by the explicit replacement action, never by autosave. */
export function replaceSavedProfile(storage, profile, recovery) {
  if (!recovery || recovery.kind === 'read-error') return 'Read the saved data successfully before choosing to replace it.';
  return writeProfile(storage, profile);
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
  const reasons = [], unresolved = [], questions = [], blocked = [];
  const ask = (field, message, kind = 'answer') => { unresolved.push(message); questions.push({ field, message, kind }); };
  const checkChoice = (value, allowed, label, field, excluded = []) => {
    if (!allowed.length && !excluded.length) return;
    if (!value) ask(field, `Specify ${label}.`);
    else if (excluded.includes(value)) blocked.push(`${label}: ${value} is outside this workflow's documented support.`);
    else if (allowed.length && !allowed.includes(value)) ask(field, `Verify ${label}: ${value} is not in this workflow's documented examples.`, 'compatibility');
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
      if (!matches.length) ask(workflow.languageScope === 'configuration' ? 'technologies' : 'languages', `Specify a supported ${workflow.languageScope === 'configuration' ? 'configuration format' : 'language or ecosystem'}: ${workflow.languages.join(', ')}.`);
      else reasons.push(`${workflow.languageScope === 'ecosystem' ? 'Dependency ecosystem' : 'Language or format'}: ${matches.join(', ')}`);
    }
    // Unknown answers qualify a plausible match; they do not make every tool
    // relevant. Require evidence from this component before suggesting a workflow.
    if (!hasEvidence) return null;
    for (const input of workflow.inputs) {
      if (subject.inputs.includes(input)) reasons.push(`Available input: ${input}`);
      else if (subject.inputsComplete) blocked.push(`Requires ${input.toLowerCase()}, which is not available.`);
      else ask('inputs', `Can you provide ${input.toLowerCase()}?`);
    }
    if (workflow.binaryFormats.length) {
      if (!subject.binaryFormat) ask('binaryFormat', `Specify the binary format: ${workflow.binaryFormats.join(' or ')}.`);
      else if (!workflow.binaryFormats.includes(subject.binaryFormat)) return null;
      else reasons.push(`Binary format: ${subject.binaryFormat}`);
    }
    if (workflow.technologies.length && !workflow.technologies.some(t => subject.technologies.includes(t))) ask('technologies', `Confirm the required technology: ${workflow.technologies.join(' or ')}.`);
    checkChoice(subject.targetPlatform, workflow.targetPlatforms, 'target OS', 'targetPlatform', workflow.excludedTargets);
  } else {
    // A TCP transport is never evidence of MQTT, HTTP, or another application protocol.
    if (subject.interface && !workflow.interfaces.includes(subject.interface)) return null;
    if (!workflow.interfaces.includes(subject.interface)
      && !workflow.transports.includes(subject.transport)
      && !workflow.definitions.includes(subject.definition)) return null;
    if (!subject.interface) ask('interface', `Specify the interface: ${workflow.interfaces.join(' or ')}.`);
    else reasons.push(`Interface: ${subject.interface}`);
    if (!subject.from || !subject.to) ask(!subject.from ? 'from' : 'to', 'Choose both connection endpoints.');
    if (workflow.transports.length) {
      if (!subject.transport) ask('transport', `Specify the transport: ${workflow.transports.join(' or ')}.`);
      else if (!workflow.transports.includes(subject.transport)) return null;
      else reasons.push(`Transport: ${subject.transport}`);
    }
    if (workflow.definitions.length) {
      if (!subject.definition) ask('definition', `Can you provide ${workflow.definitions.join(' or ')}?`);
      else if (!workflow.definitions.includes(subject.definition)) blocked.push(`Requires ${workflow.definitions.join(' or ')}; selected definition: ${subject.definition}.`);
      else reasons.push(`Definition: ${subject.definition}`);
    }
  }
  checkChoice(subject.hostPlatform, workflow.hostPlatforms, 'analysis host OS', 'hostPlatform', workflow.excludedHosts);
  for (const requirement of workflow.requires) {
    const answer = type === 'component' ? subject.access[requirement] : subject[requirement];
    if (answer === 'no') blocked.push(`Requires the ability to ${ACCESS[requirement].toLowerCase()}.`);
    else if (answer !== 'yes') ask(requirement, `Can you ${ACCESS[requirement].toLowerCase()}?`);
    else reasons.push(`You can ${ACCESS[requirement].toLowerCase()}.`);
  }
  if (preferences.license && preferences.license !== tool.licenseCategory) blocked.push(`This edition uses a ${tool.licenseCategory.toLowerCase()} license.`);
  if (preferences.cost && !(preferences.cost === 'any-free' ? tool.cost.some(c => c === 'Free' || c === 'Free with limits') : tool.cost.includes(preferences.cost))) blocked.push(`This edition does not match your cost preference (${tool.cost.join(' / ')}).`);
  return { reasons, unresolved, questions, blocked, status: blocked.length ? 'blocked' : unresolved.length ? 'details' : 'candidate' };
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
