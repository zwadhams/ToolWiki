import { z } from 'zod';

export const INPUTS = ['Source code', 'Binaries', 'Dependency metadata', 'Container images', 'Configuration files', 'Running applications', 'Callable code', 'Executable models', 'Execution traces'];
export const COMPONENT_TYPES = ['Frontend', 'Backend/service', 'Library', 'Command-line application', 'Firmware/device', 'Database', 'Simulator/model', 'Other'];
export const INTERFACES = ['HTTP API', 'GraphQL', 'gRPC', 'WebSocket', 'MQTT', 'Custom protocol'];
export const TRANSPORTS = ['TCP', 'UDP', 'Serial', 'Other'];
export const PLATFORMS = ['Windows', 'Linux', 'macOS', 'FreeBSD', 'NetBSD', 'Android', 'Browser', 'RTOS', 'Bare metal', 'Other'];
export const FORMATS = ['Native executable', 'JVM bytecode', '.NET assembly', 'LLVM bitcode', 'Firmware image', 'Other'];
export const TECHNOLOGIES = ['.NET', 'Ruby on Rails', 'Docker', 'Kubernetes/Helm', 'Terraform', 'CloudFormation', 'Azure Resource Manager', 'GitHub Actions', 'MATLAB', 'Simulink', 'Scenic'];
export const ACCESS = { rebuild: 'Rebuild this component', instrument: 'Add instrumentation', harness: 'Write a test or verification harness', testInstance: 'Run a test instance or workload' };
export const GOALS = [
  { id: 'correctness', label: 'Coding and type errors', findings: ['Logic errors', 'Type errors', 'Portability issues'] },
  { id: 'memory', label: 'Memory safety and resource leaks', findings: ['Memory safety', 'Undefined behavior', 'Resource leaks'] },
  { id: 'concurrency', label: 'Concurrency and data races', findings: ['Concurrency issues'] },
  { id: 'security', label: 'Injection risks and unsafe APIs', findings: ['Injection risks', 'Unsafe API use'] },
  { id: 'dependencies', label: 'Known vulnerable dependencies', findings: ['Known vulnerable dependencies'] },
  { id: 'configuration', label: 'Security configuration', findings: ['Security misconfiguration'] },
  { id: 'secrets', label: 'Exposed secrets', findings: ['Exposed secrets'] },
  { id: 'robustness', label: 'Input validation, crashes, and server errors', findings: ['Input validation', 'Crashes and hangs', 'Server errors'] },
  { id: 'specification', label: 'Behavior against a specification', findings: ['Specification violations'] },
  { id: 'temporal', label: 'Requirements over time', findings: ['Temporal requirement violations'] },
  { id: 'quality', label: 'Coding conventions and complexity', findings: ['Coding conventions', 'Coding-standard violations', 'Code complexity'] },
  { id: 'understanding', label: 'Understand binaries and their contents', findings: ['Code structure', 'Program capabilities', 'Recovered strings', 'Embedded file formats', 'File pattern matches'] },
];
export const CONNECTION_GOALS = ['security', 'configuration', 'robustness', 'specification'];
export const STATUS_LABELS = { candidate: 'Candidates found', details: 'More information needed', blocked: 'Requirements not currently met', gap: 'No verified catalog match' };
const tri = z.enum(['unknown', 'yes', 'no']);
const text = z.string().max(200);
const notes = z.string().max(2000);
const id = z.string().regex(/^[a-zA-Z0-9_-]{1,80}$/);
const list = (schema, max = 80) => z.array(schema).max(max).refine(a => new Set(a).size === a.length, 'Repeated values are not allowed.');
// Retain the optional v1 field for saved systems. It no longer filters results.
const goals = list(z.enum(GOALS.map(g => g.id)), GOALS.length).default([]);
const shared = { id, name: text, included: z.boolean(), goals, notes, hostPlatform: z.enum(['', ...PLATFORMS]) };
export const componentSchema = z.object({
  ...shared, kind: z.enum(['', ...COMPONENT_TYPES]), languages: list(text), inputs: list(z.enum(INPUTS)), inputsComplete: z.boolean(),
  binaryFormat: z.enum(['', ...FORMATS]), targetPlatform: z.enum(['', ...PLATFORMS]),
  deployment: z.enum(['', 'Local/desktop', 'Server/cloud', 'Browser', 'Container', 'Kubernetes', 'Embedded device', 'Simulation', 'Other']),
  technologies: list(z.enum(TECHNOLOGIES)),
  access: z.object(Object.fromEntries(Object.keys(ACCESS).map(key => [key, tri]))).strict(),
}).strict();
export const connectionSchema = z.object({
  ...shared, from: z.union([z.literal(''), id]), to: z.union([z.literal(''), id]),
  interface: z.enum(['', ...INTERFACES]), transport: z.enum(['', ...TRANSPORTS]),
  definition: z.enum(['', 'None', 'OpenAPI', 'GraphQL schema', 'Other']), testInstance: tri, harness: tri,
  goals: list(z.enum(CONNECTION_GOALS), CONNECTION_GOALS.length).default([]),
}).strict();
export const profileSchema = z.object({
  version: z.literal(1), name: text,
  preferences: z.object({ cost: z.enum(['', 'any-free', 'Free', 'Free with limits', 'Paid']), license: z.enum(['', 'Open source', 'Source available', 'Proprietary']) }).strict(),
  components: z.array(componentSchema).max(50), connections: z.array(connectionSchema).max(100),
}).strict().superRefine((profile, ctx) => {
  const ids = [...profile.components, ...profile.connections].map(s => s.id);
  if (new Set(ids).size !== ids.length) ctx.addIssue({ code: 'custom', message: 'Each system part needs a unique ID.' });
  const components = new Set(profile.components.map(c => c.id));
  for (const connection of profile.connections) {
    if ((connection.from && !components.has(connection.from)) || (connection.to && !components.has(connection.to))) ctx.addIssue({ code: 'custom', message: 'A connection refers to a missing component.' });
    if (connection.from && connection.from === connection.to) ctx.addIssue({ code: 'custom', message: 'Choose two different connection endpoints.' });
  }
});

// Every array within a workflow is scoped to this workflow, never the tool's
// aggregate tags. Inputs are all required; alternatives are separate workflows.
export const workflowSchema = z.object({
  id, label: z.string().min(1), subject: z.enum(['component', 'connection']),
  inputs: z.array(z.enum(INPUTS)).min(1),
  languageScope: z.enum(['source', 'ecosystem', 'independent', 'model', 'configuration']),
  languages: z.array(z.string().min(1)).default([]),
  findings: z.array(z.string().min(1)).min(1),
  interfaces: z.array(z.enum(INTERFACES)).default([]),
  transports: z.array(z.enum(TRANSPORTS)).default([]),
  definitions: z.array(z.enum(['OpenAPI', 'GraphQL schema'])).default([]),
  binaryFormats: z.array(z.enum(FORMATS)).default([]),
  technologies: z.array(z.enum(TECHNOLOGIES)).default([]),
  requires: z.array(z.enum(Object.keys(ACCESS))).default([]),
  hostPlatforms: z.array(z.enum(PLATFORMS)).default([]),
  targetPlatforms: z.array(z.enum(PLATFORMS)).default([]),
  // Non-exhaustive support lists cannot establish incompatibility by omission.
  excludedHosts: z.array(z.enum(PLATFORMS)).default([]),
  excludedTargets: z.array(z.enum(PLATFORMS)).default([]),
  caveat: z.string().min(1), sources: z.array(z.url()).min(1),
}).strict().superRefine((workflow, ctx) => {
  if (workflow.languageScope !== 'independent' && !workflow.languages.length) ctx.addIssue({ code: 'custom', message: 'Scoped language workflows need languages or formats.' });
  if (workflow.subject === 'connection' && !workflow.interfaces.length) ctx.addIssue({ code: 'custom', message: 'Connections need explicit interface support.' });
  if (workflow.subject === 'connection' && (workflow.inputs.some(input => input !== 'Running applications') || workflow.requires.some(requirement => !['harness', 'testInstance'].includes(requirement)))) ctx.addIssue({ code: 'custom', message: 'Connection workflows currently support running endpoints with testInstance and harness prerequisites.' });
  if (workflow.languageScope === 'independent' && workflow.languages.length) ctx.addIssue({ code: 'custom', message: 'Language-independent workflows must not list implementation languages.' });
  if (workflow.subject === 'component' && workflow.inputs.includes('Binaries') && !workflow.binaryFormats.length) ctx.addIssue({ code: 'custom', message: 'Binary workflows need explicit artifact formats.' });
});
