import { ACCESS, COMPONENT_TYPES, FORMATS, INPUTS, INTERFACES, PLATFORMS, STATUS_LABELS, TECHNOLOGIES, TRANSPORTS } from './system-schema.mjs';
import { analyzeSystem, MAX_IMPORT_BYTES, newComponent, newConnection, parseProfile, removalSnapshot, removeComponent, restoreProfile, saveProfile, serializeProfile, subjectName, undoRemoval } from './system-builder.mjs';
import { comparisonHref } from './comparison.mjs';

const el = (tag, text = '', className = '') => {
  const node = document.createElement(tag);
  if (text) node.textContent = text;
  if (className) node.className = className;
  return node;
};
const button = (text, callback, className = '') => {
  const node = el('button', text, className); node.type = 'button'; node.addEventListener('click', callback); return node;
};
const unique = values => [...new Set(values)];
const choice = (value, label = value) => ({ value, label });
const unknown = choice('', 'Not sure / not specified');
const tri = [choice('unknown', 'Not sure'), choice('yes', 'Yes'), choice('no', 'No')];

class SystemBuilder extends HTMLElement {
  connectedCallback() {
    if (this.initialized) return;
    this.initialized = true;
    const data = JSON.parse(this.querySelector('[data-builder-data]').textContent);
    this.tools = data.tools;
    this.totalTools = data.totalTools;
    this.languages = unique([...data.languages.filter(l => !TECHNOLOGIES.includes(l)), '.NET', 'Other', 'Not sure']);
    this.base = this.dataset.base;
    this.root = this.querySelector('[data-builder-root]');
    this.selected = [];
    this.openSections = new Map();
    this.undo = null;
    let restored;
    try { this.storage = window.localStorage; restored = restoreProfile(this.storage); }
    catch { restored = restoreProfile(null); }
    this.profile = restored.profile;
    this.initialSaveError = restored.error;
    this.render();
  }

  field(parent, labelText, value, change, options = null, multiline = false) {
    const label = el('label', '', 'suite-field'); label.append(el('span', labelText));
    const input = el(options ? 'select' : multiline ? 'textarea' : 'input');
    if (options) for (const item of options) {
      const option = typeof item === 'string' ? choice(item) : item;
      const node = el('option', option.label); node.value = option.value; input.append(node);
    }
    else { input.maxLength = multiline ? 2000 : 200; if (!multiline) input.type = 'text'; else input.rows = 3; }
    input.value = value;
    input.addEventListener(options ? 'change' : 'input', () => change(input.value));
    label.append(input); parent.append(label); return input;
  }

  checkbox(parent, labelText, checked, change) {
    const label = el('label', '', 'suite-check'); const input = el('input'); input.type = 'checkbox'; input.checked = checked;
    input.addEventListener('change', () => change(input.checked)); label.append(input, el('span', labelText)); parent.append(label); return input;
  }

  checklist(parent, title, options, values, change, className = '') {
    const fieldset = el('fieldset', '', className); fieldset.append(el('legend', title));
    const grid = el('div', '', 'suite-check-grid');
    for (const item of options) {
      const option = typeof item === 'string' ? choice(item) : item;
      const input = this.checkbox(grid, option.label, values.includes(option.value), checked => {
        const hadFocus = document.activeElement === input;
        change(checked ? unique([...values, option.value]) : values.filter(v => v !== option.value));
        if (hadFocus && !input.isConnected) {
          [...parent.querySelectorAll('input[data-choice]')].find(node => node.dataset.choice === option.value)?.focus({ preventScroll: true });
        }
      });
      input.dataset.choice = option.value;
    }
    fieldset.append(grid); parent.append(fieldset); return fieldset;
  }

  disclosure(parent, key, title, open = false) {
    const details = el('details', '', 'suite-disclosure');
    const summary = el('summary', title); details.append(summary);
    details.open = this.openSections.get(key) ?? open;
    details.addEventListener('toggle', () => { if (details.isConnected) this.openSections.set(key, details.open); });
    parent.append(details); return details;
  }

  changed(message = '') {
    const saveError = saveProfile(this.storage, this.profile);
    if (!saveError) this.initialSaveError = '';
    this.saveStatus.textContent = saveError || 'Saved in this browser.';
    if (message) this.announce.textContent = message;
    clearTimeout(this.resultTimer);
    this.resultTimer = setTimeout(() => this.renderResults(), 180);
  }

  render() {
    this.root.replaceChildren();
    const header = el('section', '', 'suite-panel');
    header.append(el('h2', 'Your system'));
    this.field(header, 'System name (optional)', this.profile.name, value => { this.profile.name = value; this.changed(); });
    const toolbar = el('div', '', 'suite-actions');
    toolbar.append(button('Export system', () => this.exportSystem()));
    const file = el('input'); file.type = 'file'; file.accept = '.json,application/json'; file.hidden = true;
    file.addEventListener('change', () => this.importSystem(file.files?.[0]));
    toolbar.append(button('Import system', () => file.click()), file);
    this.undoButton = button('Undo removal or import', () => {
      if (!this.undo) return;
      try { this.profile = this.undo.type === 'import' ? this.undo.profile : undoRemoval(this.profile, this.undo); }
      catch { this.announce.textContent = 'Restoring this content would exceed the system limits. Your current system has been kept.'; return; }
      this.undo = null; this.render(); this.changed('Removed content or previous import restored.'); this.root.querySelector('input')?.focus();
    });
    this.undoButton.hidden = !this.undo; toolbar.append(this.undoButton); header.append(toolbar);
    this.saveStatus = el('p', this.initialSaveError || 'Changes save automatically in this browser.', 'suite-muted');
    this.saveStatus.setAttribute('role', 'status');
    this.announce = el('p', '', 'suite-notice'); this.announce.setAttribute('role', 'status'); this.announce.setAttribute('aria-live', 'polite');
    header.append(this.saveStatus, this.announce);
    const prefs = el('div', '', 'suite-field-grid');
    this.field(prefs, 'Cost preference', this.profile.preferences.cost, value => { this.profile.preferences.cost = value; this.changed(); }, [choice('', 'Any cost'), choice('any-free', 'Any continuing free option'), 'Free', 'Free with limits', 'Paid']);
    this.field(prefs, 'License preference', this.profile.preferences.license, value => { this.profile.preferences.license = value; this.changed(); }, [choice('', 'Any license'), 'Open source', 'Source available', 'Proprietary']);
    header.append(prefs, el('p', 'Free with limits can include eligibility conditions. Trial access does not count as a free edition.', 'suite-muted'));
    this.root.append(header);
    const jump = el('nav', '', 'suite-actions'); jump.setAttribute('aria-label', 'Builder sections');
    for (const [id, text] of [['suite-components', 'Components'], ['suite-connections', 'Connections'], ['suite-results', 'Tool candidates']]) {
      const link = el('a', text); link.href = `#${id}`; jump.append(link);
    }
    this.root.append(jump);
    this.componentSection = el('section'); this.componentSection.id = 'suite-components';
    this.componentSection.append(el('h2', 'Components'), el('p', 'Choose the languages and material available for each part. Candidates will explain what they can find. Collapse a card when you are finished.', 'suite-muted'));
    this.componentList = el('div', '', 'suite-parts'); this.componentSection.append(this.componentList);
    for (const component of this.profile.components) this.renderComponent(component);
    if (!this.profile.components.length) this.componentList.append(el('p', 'Add a component to begin describing your system.'));
    const addComponent = button('Add component', () => {
      if (this.profile.components.length >= 50) return;
      const component = newComponent(); this.profile.components.push(component); this.openSections.set(component.id, true); this.render(); this.changed('Component added.');
      this.root.querySelector(`[data-part-id="${component.id}"] input[type=text]`)?.focus();
    }, 'suite-primary');
    addComponent.disabled = this.profile.components.length >= 50; this.componentSection.append(addComponent); this.root.append(this.componentSection);
    this.connectionSection = el('section'); this.connectionSection.id = 'suite-connections';
    this.connectionSection.append(el('h2', 'Connections'), el('p', 'Describe an interface between two components. A transport such as TCP does not establish support for the protocol carried over it.', 'suite-muted'));
    this.connectionList = el('div', '', 'suite-parts'); this.connectionSection.append(this.connectionList);
    for (const connection of this.profile.connections) this.renderConnection(connection);
    if (!this.profile.connections.length) this.connectionList.append(el('p', 'No connections yet. Add two components to describe how they communicate.', 'suite-muted'));
    const addConnection = button('Add connection', () => {
      if (this.profile.components.length < 2 || this.profile.connections.length >= 100) return;
      const connection = newConnection(undefined, this.profile.components[0].id, this.profile.components[1].id);
      this.profile.connections.push(connection); this.openSections.set(connection.id, true); this.render(); this.changed('Connection added.');
      this.root.querySelector(`[data-part-id="${connection.id}"] input[type=text]`)?.focus();
    });
    addConnection.disabled = this.profile.components.length < 2 || this.profile.connections.length >= 100;
    this.connectionSection.append(addConnection); this.root.append(this.connectionSection);
    this.results = el('section'); this.results.id = 'suite-results'; this.root.append(this.results);
    this.renderResults();
  }

  partShell(part, type) {
    const list = type === 'component' ? this.componentList : this.connectionList;
    const isInitial = type === 'component' && this.profile.components.length === 1;
    const details = this.disclosure(list, part.id, subjectName(this.profile, part), isInitial);
    details.classList.add('suite-part'); details.dataset.partId = part.id;
    const content = el('div', '', 'suite-part-content'); details.append(content);
    const controls = el('div', '', 'suite-actions');
    this.checkbox(controls, 'Include in analysis', part.included, value => { part.included = value; this.changed(value ? 'Included in analysis.' : 'Excluded from analysis; description kept.'); });
    controls.append(button(`Remove ${type}`, () => {
      this.undo = removalSnapshot(this.profile, part.id, type);
      const removedConnections = type === 'component' ? this.profile.connections.filter(c => c.from === part.id || c.to === part.id).length : 0;
      this.profile = type === 'component' ? removeComponent(this.profile, part.id) : { ...this.profile, connections: this.profile.connections.filter(c => c.id !== part.id) };
      this.render(); this.changed(`${type === 'component' ? 'Component' : 'Connection'} removed${removedConnections ? ` with ${removedConnections} incident connection(s)` : ''}. Undo is available above.`); this.undoButton.focus();
    }, 'suite-remove'));
    content.append(controls);
    return { content, details };
  }

  renderComponent(part) {
    const { content, details } = this.partShell(part, 'component');
    const fields = el('div', '', 'suite-field-grid');
    this.field(fields, 'Component name', part.name, value => {
      part.name = value; details.querySelector('summary').textContent = subjectName(this.profile, part); this.refreshEndpoints(); this.changed();
    });
    this.field(fields, 'Component type', part.kind, value => { part.kind = value; this.changed(); }, [unknown, ...COMPONENT_TYPES]);
    content.append(fields);
    const languages = this.disclosure(content, `${part.id}-languages`, `Languages and ecosystems (${part.languages.length} selected)`, true);
    const languageContainer = el('div'); languages.append(languageContainer);
    const updateLanguages = value => {
      part.languages = value; languages.querySelector('summary').textContent = `Languages and ecosystems (${value.length} selected)`;
      renderLanguages(); this.changed();
    };
    const renderLanguages = () => {
      languageContainer.replaceChildren();
      this.checklist(languageContainer, 'Languages and ecosystems in this component', unique([...this.languages, ...part.languages]), part.languages, updateLanguages, 'suite-language-list');
    };
    renderLanguages();
    const inputsContainer = el('div'); content.append(inputsContainer);
    const renderInputs = () => {
      inputsContainer.replaceChildren();
      this.checklist(inputsContainer, 'Material you can provide', INPUTS, part.inputs, value => { part.inputs = value; renderInputs(); this.changed(); });
      this.checkbox(inputsContainer, 'Only these materials are available', part.inputsComplete, value => { part.inputsComplete = value; this.changed(); });
      inputsContainer.append(el('p', 'Unchecked materials are unknown unless you select "Only these materials are available".', 'suite-muted'));
      if (part.inputs.includes('Binaries')) this.field(inputsContainer, 'Binary format', part.binaryFormat, value => { part.binaryFormat = value; this.changed(); }, [unknown, ...FORMATS]);
    };
    renderInputs();
    const advanced = this.disclosure(content, `${part.id}-advanced`, 'Environment and testing access (optional)');
    const advancedFields = el('div', '', 'suite-field-grid');
    this.field(advancedFields, 'Target operating system', part.targetPlatform, value => { part.targetPlatform = value; this.changed(); }, [unknown, ...PLATFORMS]);
    this.field(advancedFields, 'Analysis host operating system', part.hostPlatform, value => { part.hostPlatform = value; this.changed(); }, [unknown, ...PLATFORMS]);
    this.field(advancedFields, 'Deployment context', part.deployment, value => { part.deployment = value; this.changed(); }, [unknown, 'Local/desktop', 'Server/cloud', 'Browser', 'Container', 'Kubernetes', 'Embedded device', 'Simulation', 'Other']);
    advanced.append(advancedFields, el('p', 'The analysis host is where you would run the tool. If using WSL or a Linux container, choose Linux for that host. OS choices do not confirm CPU, compiler, or version compatibility.', 'suite-muted'));
    const techContainer = el('div'); advanced.append(techContainer);
    const renderTech = () => {
      techContainer.replaceChildren(); this.checklist(techContainer, 'Runtime, configuration, or model technologies', TECHNOLOGIES, part.technologies, value => { part.technologies = value; renderTech(); this.changed(); });
    };
    renderTech();
    const access = el('div', '', 'suite-field-grid');
    for (const [key, label] of Object.entries(ACCESS)) this.field(access, `Can you ${label.toLowerCase()}?`, part.access[key], value => { part.access[key] = value; this.changed(); }, tri);
    advanced.append(access);
    this.field(advanced, 'Other technology or context (optional notes)', part.notes, value => { part.notes = value; this.changed(); }, null, true);
    advanced.append(el('p', 'Names, component types, deployment context, and notes describe your system. Recommendations use the selected capabilities and verified workflow requirements, not keywords in your notes.', 'suite-muted'));
  }

  refreshEndpoints() {
    for (const select of this.root.querySelectorAll('[data-endpoint]')) {
      const connection = this.profile.connections.find(c => c.id === select.dataset.connectionId);
      const field = select.dataset.endpoint, other = field === 'from' ? connection.to : connection.from;
      select.replaceChildren();
      for (const option of [choice('', 'Choose a component'), ...this.profile.components.filter(c => c.id !== other).map(c => choice(c.id, subjectName(this.profile, c)))]) {
        const node = el('option', option.label); node.value = option.value; select.append(node);
      }
      select.value = connection[field];
    }
    for (const connection of this.profile.connections) {
      const summary = this.root.querySelector(`[data-part-id="${connection.id}"] > summary`);
      if (summary) summary.textContent = subjectName(this.profile, connection);
    }
  }

  renderConnection(part) {
    const { content, details } = this.partShell(part, 'connection');
    this.field(content, 'Connection name (optional)', part.name, value => { part.name = value; details.querySelector('summary').textContent = subjectName(this.profile, part); this.changed(); });
    const endpoints = el('div', '', 'suite-field-grid');
    for (const key of ['from', 'to']) {
      const other = key === 'from' ? part.to : part.from;
      const select = this.field(endpoints, key === 'from' ? 'From component' : 'To component', part[key], value => { part[key] = value; this.refreshEndpoints(); this.changed(); }, [choice('', 'Choose a component'), ...this.profile.components.filter(c => c.id !== other).map(c => choice(c.id, subjectName(this.profile, c)))]);
      select.dataset.endpoint = key; select.dataset.connectionId = part.id;
    }
    content.append(endpoints);
    const fields = el('div', '', 'suite-field-grid');
    this.field(fields, 'Application interface', part.interface, value => { part.interface = value; this.changed(); }, [unknown, ...INTERFACES]);
    this.field(fields, 'Underlying transport', part.transport, value => { part.transport = value; this.changed(); }, [unknown, ...TRANSPORTS]);
    this.field(fields, 'Available interface definition', part.definition, value => { part.definition = value; this.changed(); }, [unknown, 'None', 'OpenAPI', 'GraphQL schema', 'Other']);
    this.field(fields, 'Can you run a test endpoint?', part.testInstance, value => { part.testInstance = value; this.changed(); }, tri);
    content.append(fields);
    const advanced = this.disclosure(content, `${part.id}-advanced`, 'Testing details and notes (optional)');
    this.field(advanced, 'Analysis host operating system', part.hostPlatform, value => { part.hostPlatform = value; this.changed(); }, [unknown, ...PLATFORMS]);
    this.field(advanced, 'Can you write a protocol test harness?', part.harness, value => { part.harness = value; this.changed(); }, tri);
    this.field(advanced, 'Custom protocol or other context (optional notes)', part.notes, value => { part.notes = value; this.changed(); }, null, true);
    advanced.append(el('p', 'Custom protocol descriptions are saved as notes. They do not imply verified support by a tool.', 'suite-muted'));
  }

  renderResults() {
    if (!this.results) return;
    const result = analyzeSystem(this.profile, this.tools);
    this.results.replaceChildren(); this.results.append(el('h2', 'Tool candidates'));
    this.results.append(el('p', `${this.tools.length} of ${this.totalTools} catalog entries have reviewed matching workflows. The shortlist describes potential analyses, not measured test coverage or a security score.`, 'suite-muted'));
    if (!result.gaps.length) {
      this.results.append(el('p', 'Choose a language, ecosystem, available material, or connection interface on an included part to see candidates.', 'suite-empty'));
      if (this.selected.length) { this.tray = el('section', '', 'suite-comparison'); this.results.append(this.tray); this.renderComparison(); }
      return;
    }
    const count = unique(result.subjects.flatMap(subject => subject.candidates.map(candidate => candidate.toolId))).length;
    const summary = el('p', `${count} potential tool${count === 1 ? '' : 's'} for your system. Each card explains what it can find and what it needs.`, 'suite-summary');
    summary.setAttribute('role', 'status'); this.results.append(summary);
    const gapDetails = el('details', '', 'suite-panel'); gapDetails.append(el('summary', 'System parts and gaps'));
    const gapList = el('ul', '', 'suite-gaps');
    for (const gap of result.gaps) {
      const subject = result.subjects.find(s => s.subjectId === gap.subjectId);
      const item = el('li'); item.append(el('strong', subject.name), el('span', STATUS_LABELS[gap.status], `suite-status suite-status-${gap.status}`));
      if (gap.status === 'gap') item.append(el('p', 'No verified workflow in this catalog matches this part. This does not establish that no suitable tool exists.', 'suite-muted'));
      else if (gap.reasons.length) {
        const more = el('details'); more.append(el('summary', gap.status === 'blocked' ? 'See unmet requirements' : 'See information to clarify'));
        const reasons = el('ul'); for (const reason of gap.reasons) reasons.append(el('li', reason)); more.append(reasons); item.append(more);
      }
      gapList.append(item);
    }
    gapDetails.append(gapList); this.results.append(gapDetails);
    const tray = el('section', '', 'suite-comparison'); tray.setAttribute('aria-label', 'Compare shortlisted tools'); this.results.append(tray); this.tray = tray;
    this.renderComparison();
    for (const subject of result.subjects) {
      const section = el('section', '', 'suite-result-group'); section.append(el('h3', subject.name));
      if (!subject.candidates.length) section.append(el('p', subject.needsDescription
        ? 'Choose a language, ecosystem, available material, or connection interface for this part to see candidates.'
        : 'No applicable candidates yet. Review this part\'s gaps above, add more detail, or browse the full catalog.', 'suite-muted'));
      const grid = el('div', '', 'suite-candidates');
      for (const entry of subject.candidates) grid.append(this.renderCandidate(entry));
      section.append(grid);
      this.results.append(section);
    }
    const browse = el('a', 'Browse all tools'); browse.href = `${this.base}/`; this.results.append(browse);
  }

  renderCandidate(entry) {
    const tool = this.tools.find(t => t.id === entry.toolId);
    const card = el('article', '', 'suite-candidate');
    const badge = entry.status === 'candidate'
      ? entry.matches.some(m => m.status === 'details') ? 'Candidate; other workflows need details' : 'Recorded requirements matched'
      : 'Needs more information';
    card.append(el('span', badge, `suite-status suite-status-${entry.status}`));
    const heading = el('h4'); const link = el('a', tool.title); link.href = `${this.base}/${tool.id}/`; heading.append(link); card.append(heading);
    const findings = el('p'); findings.append(el('strong', 'Can help find: '), document.createTextNode(unique(entry.matches.flatMap(m => m.findings)).join(', ')));
    card.append(findings, el('p', `${tool.cost.join(' / ')} | ${tool.licenseCategory}`, 'suite-muted'));
    const evidence = el('details'); evidence.append(el('summary', 'Why this tool appears and what it needs'));
    for (const workflowId of unique(entry.matches.map(m => m.workflowId))) {
      const workflow = tool.analysisWorkflows.find(w => w.id === workflowId);
      const matches = entry.matches.filter(m => m.workflowId === workflowId);
      evidence.append(el('h5', workflow.label), el('p', `Can help find: ${unique(matches.flatMap(m => m.findings)).join(', ')}`));
      const reasons = el('ul'); for (const reason of unique(matches.flatMap(m => m.reasons))) reasons.append(el('li', reason)); evidence.append(reasons);
      const unresolved = unique(matches.flatMap(m => m.unresolved));
      if (unresolved.length) {
        evidence.append(el('p', 'To clarify:', 'suite-requirement-label'));
        const list = el('ul'); unresolved.forEach(reason => list.append(el('li', reason))); evidence.append(list);
      }
      evidence.append(el('p', workflow.caveat, 'suite-muted'));
    }
    const facts = el('dl', '', 'suite-facts');
    for (const [label, value] of [['Setup', tool.setup], ['Environment', tool.environment], ['Scope', tool.scope], ['Cost details', tool.costNote]]) facts.append(el('dt', label), el('dd', value));
    evidence.append(facts, el('p', `Documentation checked ${tool.verified}. Verify the exact rules, versions, and target compatibility in the tool notes.`, 'suite-muted'));
    card.append(evidence);
    const compare = this.checkbox(card, `Compare ${tool.title}`, this.selected.includes(tool.id), checked => {
      if (checked && this.selected.length >= 3) { compare.checked = false; this.comparisonStatus.textContent = 'You can compare up to three tools. Remove one to choose another.'; return; }
      this.selected = checked ? [...this.selected, tool.id] : this.selected.filter(id => id !== tool.id);
      this.updateCompareChecks(); this.renderComparison();
    });
    compare.dataset.compareTool = tool.id;
    compare.disabled = this.selected.length >= 3 && !this.selected.includes(tool.id);
    return card;
  }

  updateCompareChecks() {
    for (const checkbox of this.results.querySelectorAll('[data-compare-tool]')) {
      checkbox.checked = this.selected.includes(checkbox.dataset.compareTool);
      checkbox.disabled = this.selected.length >= 3 && !checkbox.checked;
    }
  }

  renderComparison() {
    this.tray.replaceChildren();
    this.comparisonStatus = el('p', this.selected.length >= 2 ? `${this.selected.length} tools selected.` : 'Select two or three candidates to compare.');
    this.comparisonStatus.setAttribute('role', 'status'); this.tray.append(this.comparisonStatus);
    const actions = el('div', '', 'suite-actions');
    for (const id of this.selected) {
      const tool = this.tools.find(t => t.id === id);
      actions.append(button(`Remove ${tool.title}`, () => { this.selected = this.selected.filter(s => s !== id); this.updateCompareChecks(); this.renderComparison(); this.tray.querySelector('button, a')?.focus(); }));
    }
    if (this.selected.length >= 2) { const link = el('a', 'Open comparison'); link.href = comparisonHref(this.base, this.selected); link.target = '_blank'; link.rel = 'noopener'; link.setAttribute('aria-label', 'Open comparison in a new tab'); actions.append(link); }
    this.tray.append(actions);
  }

  exportSystem() {
    const url = URL.createObjectURL(new Blob([serializeProfile(this.profile)], { type: 'application/json' }));
    const link = el('a'); link.href = url; link.download = 'toolwiki-system.json'; this.root.append(link); link.click(); link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000); this.announce.textContent = 'System file exported. Import it here to restore the description.';
  }

  async importSystem(file) {
    if (!file) return;
    try {
      if (file.size > MAX_IMPORT_BYTES) throw new Error('Choose a system file smaller than 1 MB.');
      const profile = parseProfile(await file.text());
      this.undo = { type: 'import', profile: structuredClone(this.profile) }; this.profile = profile; this.selected = [];
      this.initialSaveError = ''; this.render(); this.changed('System imported. Recommendations use the current catalog. Undo is available above.'); this.root.querySelector('input')?.focus();
    } catch (error) { this.announce.textContent = error.message; }
    finally { const input = this.root.querySelector('input[type=file]'); if (input) input.value = ''; }
  }
}

if (!customElements.get('system-builder')) customElements.define('system-builder', SystemBuilder);
