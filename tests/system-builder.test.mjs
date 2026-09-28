import assert from 'node:assert/strict';
import test from 'node:test';
import { workflowSchema } from '../src/lib/system-schema.mjs';
import { analyzeSystem, newComponent, newConnection, newProfile, parseProfile, removalSnapshot, removeComponent, restoreProfile, saveProfile, serializeProfile, STORAGE_KEY, undoRemoval } from '../src/lib/system-builder.mjs';

const workflow = (overrides = {}) => workflowSchema.parse({ id: 'source', label: 'Source checks', subject: 'component', inputs: ['Source code'], languageScope: 'source', languages: ['Python'], findings: ['Logic errors'], caveat: 'Selected checks only.', sources: ['https://example.org/docs'], ...overrides });
const tool = (id, w, extra = {}) => ({ id, title: id, cost: ['Free'], licenseCategory: 'Open source', analysisWorkflows: [w], ...extra });
const python = tool('Python checker', workflow());
const native = tool('C++ checker', workflow({ languages: ['C++'], findings: ['Memory safety'] }));
const inventory = tool('Dependency scanner', workflow({ inputs: ['Dependency metadata'], languageScope: 'ecosystem', findings: ['Known vulnerable dependencies'] }));
const http = tool('HTTP tests', workflow({ id: 'http', subject: 'connection', inputs: ['Running applications'], languageScope: 'independent', languages: [], findings: ['Server errors'], interfaces: ['HTTP API'], definitions: ['OpenAPI'], requires: ['testInstance'] }));
const protocol = tool('Custom protocol fuzzer', workflow({ id: 'custom', subject: 'connection', inputs: ['Running applications'], languageScope: 'independent', languages: [], findings: ['Crashes and hangs'], interfaces: ['Custom protocol'], transports: ['TCP', 'UDP', 'Serial'], requires: ['harness', 'testInstance'] }));
const sanitizer = tool('Instrumented checker', workflow({ languages: ['C++'], findings: ['Memory safety'], requires: ['rebuild', 'instrument', 'testInstance'], targetPlatforms: ['Linux'], excludedTargets: ['Windows'] }));
const makeProfile = () => ({ ...newProfile(), components: [{ ...newComponent('service'), name: 'Service', languages: ['Python'], inputs: ['Source code'], inputsComplete: true }], connections: [] });
const addConnection = (p, overrides = {}) => {
  p.components.push({ ...newComponent('device'), languages: ['C++'], inputs: ['Source code'], inputsComplete: true });
  p.connections.push({ ...newConnection('wire', 'service', 'device'), interface: 'HTTP API', definition: 'OpenAPI', testInstance: 'yes', ...overrides });
};
const status = result => result.gaps[0]?.status;

test('mixed-language components get their own tools with automatically described findings', () => {
  const p = makeProfile(); addConnection(p);
  const result = analyzeSystem(p, [python, native, http]);
  assert.deepEqual(result.subjects[0].candidates.map(c => c.toolId), ['Python checker']);
  assert.deepEqual(result.subjects[1].candidates.map(c => c.toolId), ['C++ checker']);
  assert.deepEqual(result.subjects[2].candidates.map(c => c.toolId), ['HTTP tests']);
  assert.equal(result.matches.find(m => m.toolId === 'HTTP tests').subjectType, 'connection');
  assert.deepEqual(result.matches[0].goalIds, ['correctness']);
  assert.deepEqual(result.matches[0].findings, ['Logic errors']);
  assert.equal(result.matches[0].workflowId, 'source');
});

test('dependency tags do not imply source inspection', () => {
  const p = makeProfile();
  const result = analyzeSystem(p, [inventory]);
  assert.equal(result.gaps[0].status, 'blocked');
  assert.equal(result.subjects[0].candidates.length, 0);
  p.components[0].inputs = ['Dependency metadata'];
  assert.equal(analyzeSystem(p, [inventory]).gaps[0].status, 'candidate');
});

test('capabilities from different workflows are never combined', () => {
  const hybrid = tool('Hybrid', workflow({ inputs: ['Source code'], findings: ['Logic errors'] }));
  hybrid.analysisWorkflows.push(workflow({ id: 'dependencies', inputs: ['Dependency metadata'], languageScope: 'ecosystem', findings: ['Known vulnerable dependencies'] }));
  const p = makeProfile();
  const result = analyzeSystem(p, [hybrid]);
  assert.equal(status(result), 'candidate');
  assert.deepEqual(result.subjects[0].candidates[0].matches.map(m => m.workflowId), ['source']);
  assert.deepEqual(result.subjects[0].candidates[0].matches.flatMap(m => m.findings), ['Logic errors']);
  assert.equal(result.matches.find(m => m.workflowId === 'dependencies').status, 'blocked');
});

test('native binaries, JVM bytecode, and LLVM bitcode remain distinct', () => {
  const p = makeProfile(); Object.assign(p.components[0], { languages: ['Java'], inputs: ['Binaries'], binaryFormat: 'Native executable' });
  const jvm = tool('JVM checker', workflow({ languages: ['Java'], inputs: ['Binaries'], binaryFormats: ['JVM bytecode'] }));
  assert.equal(status(analyzeSystem(p, [jvm])), 'gap');
  p.components[0].binaryFormat = '';
  assert.equal(status(analyzeSystem(p, [jvm])), 'details');
  p.components[0].binaryFormat = 'JVM bytecode';
  assert.equal(status(analyzeSystem(p, [jvm])), 'candidate');
  p.components[0].binaryFormat = 'LLVM bitcode';
  assert.equal(status(analyzeSystem(p, [jvm])), 'gap');
});

test('protocol support cannot be inferred from TCP transport', () => {
  const p = makeProfile(); addConnection(p, { interface: 'MQTT', transport: 'TCP', harness: 'yes' });
  assert.equal(analyzeSystem(p, [protocol, http]).gaps.at(-1).status, 'gap');
  p.connections[0].interface = 'Custom protocol';
  assert.equal(analyzeSystem(p, [protocol, http]).gaps.at(-1).status, 'candidate');
  assert.deepEqual(analyzeSystem(p, [protocol, http]).subjects.at(-1).candidates.map(c => c.toolId), ['Custom protocol fuzzer']);
});

test('API definitions and test endpoints are separate prerequisites', () => {
  const p = makeProfile(); addConnection(p, { definition: '' });
  assert.equal(analyzeSystem(p, [http]).gaps.at(-1).status, 'details');
  p.connections[0].definition = 'GraphQL schema';
  assert.equal(analyzeSystem(p, [http]).gaps.at(-1).status, 'blocked');
  p.connections[0].definition = 'OpenAPI'; p.connections[0].testInstance = 'no';
  assert.equal(analyzeSystem(p, [http]).gaps.at(-1).status, 'blocked');
});

test('rebuild access and supported target OS affect instrumented workflows', () => {
  const p = makeProfile(); Object.assign(p.components[0], { languages: ['C++'], targetPlatform: 'Linux', access: { rebuild: 'yes', instrument: 'yes', harness: 'unknown', testInstance: 'yes' } });
  assert.equal(status(analyzeSystem(p, [sanitizer])), 'candidate');
  p.components[0].access.rebuild = 'no';
  assert.equal(status(analyzeSystem(p, [sanitizer])), 'blocked');
  assert.equal(analyzeSystem(p, [sanitizer]).subjects[0].candidates.length, 0);
  p.components[0].access.rebuild = 'unknown';
  assert.equal(status(analyzeSystem(p, [sanitizer])), 'details');
  p.components[0].targetPlatform = 'Windows';
  assert.equal(status(analyzeSystem(p, [sanitizer])), 'blocked');
});

test('host support examples do not become exhaustive exclusions', () => {
  const p = makeProfile(); const local = tool('Local', workflow({ hostPlatforms: ['Linux'] }));
  assert.equal(status(analyzeSystem(p, [local])), 'details');
  p.components[0].hostPlatform = 'Windows';
  assert.equal(status(analyzeSystem(p, [local])), 'details');
  p.components[0].hostPlatform = 'Linux'; p.components[0].targetPlatform = 'Windows';
  assert.equal(status(analyzeSystem(p, [local])), 'candidate');
});

test('unknown inputs differ from explicitly unavailable inputs', () => {
  const p = makeProfile(); p.components[0].inputs = []; p.components[0].inputsComplete = false;
  assert.equal(status(analyzeSystem(p, [python])), 'details');
  p.components[0].inputsComplete = true;
  assert.equal(status(analyzeSystem(p, [python])), 'blocked');
  assert.equal(status(analyzeSystem(p, [])), 'gap');
});

test('unknown language can request detail but Other does not promise supported syntax', () => {
  const p = makeProfile(); p.components[0].languages = ['Not sure'];
  assert.equal(status(analyzeSystem(p, [python])), 'details');
  p.components[0].languages = ['Other'];
  assert.equal(status(analyzeSystem(p, [python])), 'gap');
});

test('cost and license stay attached to the same edition', () => {
  const p = makeProfile(); p.preferences.cost = 'any-free';
  const paid = tool('Paid edition', workflow(), { cost: ['Paid'], licenseCategory: 'Proprietary' });
  const free = tool('Free edition', workflow({ languages: ['Java'] }));
  assert.equal(status(analyzeSystem(p, [paid, free])), 'blocked');
  const limited = tool('Conditional free', workflow(), { cost: ['Free with limits'], licenseCategory: 'Proprietary' });
  assert.equal(status(analyzeSystem(p, [limited])), 'candidate');
  p.preferences.license = 'Open source';
  assert.equal(status(analyzeSystem(p, [limited])), 'blocked');
});

test('deduplicated tool cards retain findings and requirement statuses per workflow', () => {
  const p = makeProfile();
  const hybrid = tool('Hybrid', workflow()); hybrid.analysisWorkflows.push(workflow({ id: 'dependencies', inputs: ['Dependency metadata'], findings: ['Known vulnerable dependencies'] }));
  p.components[0].inputsComplete = false;
  const result = analyzeSystem(p, [hybrid]);
  assert.equal(result.subjects[0].candidates.length, 1);
  assert.deepEqual(result.gaps.map(g => g.status), ['candidate']);
  assert.deepEqual(result.matches.map(m => m.status), ['candidate', 'details']);
  assert.deepEqual(result.matches.flatMap(m => m.findings), ['Logic errors', 'Known vulnerable dependencies']);
  assert.equal(result.subjects[0].candidates[0].matches.length, 2);
});

test('ready candidates precede conditional candidates with alphabetical tie-breaking', () => {
  const p = makeProfile();
  const tools = [tool('Zebra', workflow()), tool('A conditional', workflow({ requires: ['rebuild'] })), tool('Alpha', workflow())];
  assert.deepEqual(analyzeSystem(p, tools).subjects[0].candidates.map(c => c.toolId), ['Alpha', 'Zebra', 'A conditional']);
});

test('excluded parts remain in the profile and connections are independently selectable', () => {
  const p = makeProfile(); addConnection(p); p.components[0].included = false;
  const result = analyzeSystem(p, [python, http]);
  assert.ok(!result.subjects.some(s => s.subjectId === 'service'));
  assert.equal(result.subjects.at(-1).candidates[0].toolId, 'HTTP tests');
  assert.equal(p.components.length, 2);
});

test('removing a component removes incident connections without mutating the undo snapshot', () => {
  const p = makeProfile(); addConnection(p); const snapshot = serializeProfile(p);
  const next = removeComponent(p, 'service');
  assert.equal(next.components.length, 1); assert.equal(next.connections.length, 0);
  assert.equal(serializeProfile(p), snapshot);
  assert.deepEqual(parseProfile(snapshot), p);
});

test('export/import round-trips descriptions without saving derived recommendations', () => {
  const p = makeProfile(); addConnection(p); p.name = '<img src=x onerror=alert(1)>'; p.components[0].notes = 'Custom context';
  assert.deepEqual(parseProfile(serializeProfile(p)), p);
  assert.ok(!serializeProfile(p).includes('analysisWorkflows'));
  assert.equal(analyzeSystem(parseProfile(serializeProfile(p)), []).subjects[0].candidates.length, 0);
});

test('undo removal preserves later edits and restores incident connections in order', () => {
  const p = makeProfile(); addConnection(p);
  const snapshot = removalSnapshot(p, 'device', 'component');
  const changed = removeComponent(p, 'device');
  changed.components[0].name = 'Renamed after removal'; changed.name = 'New system name'; changed.components.push(newComponent('new-part'));
  const restored = undoRemoval(changed, snapshot);
  assert.deepEqual(restored.components.map(c => c.id), ['service', 'device', 'new-part']);
  assert.equal(restored.components[0].name, 'Renamed after removal');
  assert.equal(restored.name, 'New system name');
  assert.deepEqual(restored.connections, p.connections);
  const connectionSnapshot = removalSnapshot(restored, 'wire', 'connection');
  const connectionRestored = undoRemoval({ ...restored, connections: [] }, connectionSnapshot);
  assert.deepEqual(connectionRestored.connections, restored.connections);
});

test('malformed, oversized, unsupported and structurally invalid imports are rejected', () => {
  const p = makeProfile();
  for (const raw of ['no json', '{}', 'x'.repeat(1024 * 1024 + 1), JSON.stringify({ ...p, version: 2 }), JSON.stringify({ ...p, unrelated: true })]) assert.throws(() => parseProfile(raw));
  const broken = makeProfile(); addConnection(broken); broken.connections[0].to = 'missing';
  assert.throws(() => parseProfile(JSON.stringify(broken)));
  broken.connections[0].to = broken.connections[0].from;
  assert.throws(() => parseProfile(JSON.stringify(broken)));
  broken.connections = []; broken.components[1].id = broken.components[0].id;
  assert.throws(() => parseProfile(JSON.stringify(broken)));
  const badId = makeProfile(); badId.components[0].id = 'bad"]selector';
  assert.throws(() => parseProfile(JSON.stringify(badId)));
});

test('local saving restores the latest profile and storage failures remain recoverable', () => {
  const values = new Map(); const storage = { getItem: key => values.get(key) || null, setItem: (key, value) => values.set(key, value) };
  const p = makeProfile(); assert.equal(saveProfile(storage, p), ''); assert.deepEqual(restoreProfile(storage).profile, p);
  values.set(STORAGE_KEY, '{broken'); assert.ok(restoreProfile(storage).error);
  assert.ok(saveProfile(null, p).includes('export'));
  assert.ok(restoreProfile(null).error);
  assert.deepEqual(parseProfile(serializeProfile(p)), p);
});

test('candidates appear without goals and old saved goal selections do not narrow them', () => {
  const p = makeProfile(); p.components[0].inputs = ['Source code', 'Dependency metadata'];
  const expected = analyzeSystem(p, [python, inventory]);
  assert.equal(expected.subjects[0].candidates.length, 2);
  p.components[0].goals = ['memory'];
  assert.deepEqual(analyzeSystem(parseProfile(serializeProfile(p)), [python, inventory]), expected);
  delete p.components[0].goals;
  assert.deepEqual(analyzeSystem(parseProfile(JSON.stringify(p)), [python, inventory]), expected);
});

test('blank components and connections ask for a description instead of listing every tool', () => {
  const p = newProfile(); p.connections = [newConnection('empty')];
  const result = analyzeSystem(p, [python, inventory, http, protocol]);
  assert.deepEqual(result.gaps, []);
  assert.deepEqual(result.matches, []);
  assert.ok(result.subjects.every(s => s.needsDescription && !s.candidates.length));
});

test('language selection alone suggests related tools without inventing unrelated inputs', () => {
  const p = makeProfile(); p.components[0].inputs = []; p.components[0].inputsComplete = false;
  const binary = tool('Binary inspector', workflow({ inputs: ['Binaries'], languageScope: 'independent', languages: [], binaryFormats: ['Native executable'], findings: ['Code structure'] }));
  const result = analyzeSystem(p, [python, inventory, native, binary]);
  assert.deepEqual(result.subjects[0].candidates.map(c => c.toolId), ['Dependency scanner', 'Python checker']);
  assert.ok(result.matches.every(m => m.status === 'details'));
});

test('connection candidates also ignore legacy goals and explain their full finding scope', () => {
  const p = makeProfile(); addConnection(p, { goals: ['security'] });
  const result = analyzeSystem(parseProfile(serializeProfile(p)), [http]);
  assert.equal(result.subjects.at(-1).candidates[0].toolId, 'HTTP tests');
  assert.deepEqual(result.matches[0].findings, ['Server errors']);
  assert.deepEqual(result.matches[0].goalIds, ['robustness']);
});

test('workflow metadata requires explicit interface, artifact and language scope', () => {
  assert.throws(() => workflow({ subject: 'connection' }));
  assert.throws(() => workflow({ inputs: ['Binaries'] }));
  assert.throws(() => workflow({ languages: [] }));
});
