import fs from 'node:fs';
import crypto from 'node:crypto';
import ts from 'typescript';
import {reviews} from './assessments.mjs';
import {rebase} from './rebase-links.mjs';
const base=JSON.parse(fs.readFileSync('audits/tool-review/baseline.json','utf8'));
const sha=b=>crypto.createHash('sha256').update(b).digest('hex');
const esc=s=>String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('|','\\|').replaceAll('\n','<br>');
const paper={
  ocpp:['https://www.cs.montana.edu/izurieta/pubs/CSR_2026_Wadhams.pdf','Sections III-V; Table I (p. 3), Table II (p. 4), visually checked. Twelve implementations; 4,660 findings; 4,160 quality/maintainability findings (about 89%); Java 1,689 and Rust 2. C Semgrep failed, unlike successful zero-finding combinations. The listed language tools match Table I. No accuracy validation or exact modern edition attribution.'],
  cicd:['https://arxiv.org/pdf/2609.00676','Sections IV-VII, especially use case and findings (pp. 5-6). Python controller, SonarQube and GitLab; access restricted to two senior developers in a team of more than twenty; nightly workflow followed by a merge-request gate. The paper describes issue formatting, duplicate-prevention design, positive feedback and adoption friction. It is one organizational case, not an edition benchmark.'],
  malware:['https://www.cs.montana.edu/izurieta/pubs/iETC_Porcella_2026.pdf','Section II discusses Ghidra/CAPA/YARA; Sections III-V discuss quality, binary measurement and future validation. CWE-Checker appears under Reliability. No evaluation of YARA-X, CVE Binary Tool, or comparative analyzer accuracy is reported. The proposed interpretation is separate from measured tool effectiveness.'],
  evse:['https://www.cs.montana.edu/izurieta/pubs/Sheppard_CSR_2025.pdf','Sections III-VI; PIQUE in the HSQA discussion; threats to validity (p. 6) identify generic SonarQube source analysis and CVE Binary Tool compiled-code analysis. These are inputs to ongoing quality-model work, not a validated universal score or tool-accuracy study.'],
  adoption:['https://arxiv.org/pdf/2609.01669','Sections 3-5; 89 retained papers from ACM/IEEE searches, 2019-2023 window, and over two-thirds mentioning false positives. Frequency of a reported barrier is not an analyzer false-positive rate. Recommendations in the Wiki remain author judgment.'],
};
const pages={
  'research/comparing-tools': {papers:['ocpp'], tools:['cargo-audit','dotnet-analyzers','semgrep-ce','semgrep-code','sonarqube','sonarqube-community','cppcheck','spotbugs','detekt','psalm','gosec','bandit','brakeman','wartremover'], note:'All tool attributions, study quantities and limitations match the paper. Recommendations are labeled as recommendations, not evaluated effects.'},
  'research/sast-workflow': {papers:['cicd'],tools:['sonarqube','sonarqube-community'],note:'Historical integration and feedback are supported; the Wiki does not claim to supply a tested connector or establish current-edition performance.'},
  'research/binary-analysis': {papers:['malware'],tools:['cwe-checker','capa','ghidra','yara-x','cve-bin-tool'],note:'Discussed tools are separated from evaluated tools. YARA-X is a successor connection, not a participant in the paper. Unrelated quality-model claims are outside this tool audit.'},
  'research/software-quality': {papers:['evse'],tools:['sonarqube','cve-bin-tool'],note:'Tool references and PIQUE attribution are supported. A proposed quality-model application does not validate the analyzer or a universal security score.'},
  'research/sast-adoption': {papers:['adoption'],tools:[],note:'Tool-related literature-review quantities and usability interpretations were checked. The checklist is an author recommendation, not a measured ranking of tools.'},
  'research/index': {papers:['ocpp','cicd','malware','evse','adoption'],tools:[],note:'Tool/research summaries agree with the underlying notes. The thesis and corresponding conference papers are not counted as independent studies. Personal profile and unrelated internship claims are outside scope. Changed the profile pointer from current capabilities to the stated edition/version scope.'},
  'guides/java-analysis': {tools:['codeql','spotbugs','jbmc','jazzer'],note:'Source/database, JVM bytecode and executed fuzz-harness workflows agree with the profiles. Optional plugins, missing classes, JUnit regression defaults and unrun examples remain explicit.'},
  'guides/memory-error-detection': {tools:['infer','cppcheck','clang-static-analyzer','address-sanitizer','valgrind-memcheck','dr-memory','cbmc','frama-c','polyspace-code-prover','afl-plus-plus','libfuzzer','thread-sanitizer'],note:'Build control, source modeling, runtime workload and sanitizer coverage distinctions agree with the primary tool documentation. A sanitizer and a fuzzer are different parts of the testing workflow.'},
  'guides/temporal-monitoring-and-falsification': {tools:['rtamt','breach','psy-taliro','verifai'],note:'Trace monitoring is distinguished from scenario search. The temperature example is a mathematical illustration; the RTAMT execution provenance is unresolved on its own page. No repeated execution claim is made here.'},
  'guides/editing': {tools:[],note:'Tool-maintenance instructions were compared with content.config.ts, catalog/comparison components and editions.ts. Source-vs-ecosystem, edition separation and verification-date rules agree with implementation. Research-authoring guidance is maintained policy, not an external factual claim.'},
  'concepts/static-approaches': {tools:['cppcheck','phpstan','clippy','cwe-checker','cve-bin-tool','cargo-audit','osv-scanner','valgrind-memcheck','eslint','ruff','staticcheck','pmd','pvs-studio','codeql','cbmc','frama-c','dafny','binwalk','ghidra','floss','yara-x','capa'],note:'Each named-tool classification and comparison matches its scoped profile. SCA inventories, binary weakness checks, recovered structure and capability rules are not treated as equivalent results.'},
  'concepts/dast-approaches': {tools:['zap','burp-suite-professional','schemathesis','restler','boofuzz','libfuzzer','jazzer','valgrind-memcheck','dr-memory','thread-sanitizer','rtamt','hypothesis'],note:'Named-tool capabilities, authentication and active/passive distinctions are supported by their source references. General IAST terminology is outside the named-tool review.'},
  'concepts/static-vs-dynamic': {tools:['clang-static-analyzer','valgrind-memcheck','rtamt','capa','floss'],note:'Corrected the overly strict claim that all dynamic analysis executes the target during analysis. Recorded traces and decoder emulation now match the catalog classifications.'},
  'concepts/sast-vs-dast': {tools:['codeql','bandit','zap','burp-suite-professional'],note:'Named examples match code-based security checks and live web/API testing. Recommendations are conditional on the target, not evidence of equivalent coverage.'},
  'concepts/model-falsification': {tools:['breach','s-taliro','psy-taliro'],note:'Named workflows and cost dependencies match primary sources. Corrected S-TaLiRo GPL version attribution to match the visually checked footnote. Current distribution and exact GPL version remain explicitly unresolved.'},
  'concepts/verification-and-generated-tests': {tools:['afl-plus-plus','libfuzzer','hypothesis','breach','psy-taliro','cbmc','frama-c','dafny'],note:'Tool examples and failure-detector/proof distinctions match their source documentation. The common parser example is explicitly illustrative and does not claim every tool accepts the same target.'},
  'index': {tools:[],note:'Catalog labels and actions are local product behavior, checked against components, tests and the built site.'},
  'static': {tools:[],note:'The generated static catalog uses metadata modes. Its source/binary/inventory distinction matches tool scopes.'},
  'dynamic': {tools:['rtamt','capa','floss'],note:'Updated the introduction to include recorded execution traces, matching dynamic catalog entries.'},
  'compare': {tools:[],note:'Comparison view uses the same tool metadata and supports two or three selections; existing tests and browser checks cover this local behavior.'},
};
let count=0;
const output=['# Related-page reconciliation','','Review date: 2026-09-22. Review is limited to tool claims, their factual premises, and historical tool attribution. General concepts, personal biography and unrelated research claims are not certified. Recommendations are not measured effectiveness claims.','','## Primary research evidence',''];
for(const [id,[url,note]] of Object.entries(paper))output.push(`### ${id}`,'',`[Original paper](${url}). ${note}`,'');
for(const [slug,assessment] of Object.entries(pages)){
  const file=`src/content/docs/${slug}.md`;const original=base.files.find(r=>r.file===file);const text=fs.readFileSync(file,'utf8');
  output.push(`## ${slug}`,'',`File: \`${file}\`. Baseline SHA-256: \`${original.sha256}\`. Reviewed SHA-256: \`${sha(fs.readFileSync(file))}\`.`, '',assessment.note,'',...(assessment.papers||[]).map(id=>`- Evidence: [${id}](${paper[id][0]}), sections identified above.`),...assessment.tools.map(id=>`- Evidence: [${id}](records/${id}.md), E1 source sections.`),'','| Location | Passage or claim group | Disposition |','| --- | --- | --- |');
  const lines=text.split(/\r?\n/);let inFront=true, fences=0, heading='Introduction', block=[],start=0;
  const flush=()=>{if(!block.length)return;const claim=block.join('\n');let disposition='Supported with qualification: tool premises match cited records; recommendations remain advice.';
    if(slug==='research/index'&&/Scholar|NVMeoF/.test(claim))disposition='Outside scope: personal profile and unrelated internship claim.';
    if(slug==='concepts/model-falsification'&&claim.includes('exact license version'))disposition='Unresolved: exact S-TaLiRo license version/current distribution; historical scope supported.';
    output.push(`| ${esc(heading)}, line ${start} | ${esc(rebase(claim,file,'audits/tool-review/related-pages.md'))} | ${disposition} |`);count++;block=[];};
  lines.forEach((line,i)=>{if(line==='---'&&fences<2){fences++;if(fences===2)inFront=false;return;}if(inFront)return;if(/^## /.test(line)){flush();heading=line.slice(3);return;}if(!line.trim()){flush();return;}if(!block.length)start=i+1;block.push(line);});flush();output.push('');
}
fs.writeFileSync('audits/tool-review/related-pages.md',output.join('\n'));
const source=fs.readFileSync('src/data/editions.ts','utf8');
const js=ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.ESNext}}).outputText;
const {editionComparisons}=await import(`data:text/javascript;base64,${Buffer.from(js).toString('base64')}`);
const groupTool={coverity:'coverity',polyspace:'polyspace-code-prover',cppcheck:'cppcheck','pvs-studio':'pvs-studio',phpstan:'phpstan',codeql:'codeql',sonarqube:'sonarqube',semgrep:'semgrep-ce',burp:'burp-suite-professional'};
const editionRows=[];let claims=0;
for(const [group,comparison] of Object.entries(editionComparisons)){
  const tool=groupTool[group];editionRows.push(`## ${group}`,'',`Evidence: [${tool}](records/${tool}.md), E1: ${reviews[tool].sections}. Accessed 2026-09-22.`,'','| Field | Claim | Verdict |','| --- | --- | --- |');
  for(const [key,value] of Object.entries(comparison)){
    const values=Array.isArray(value)?value.flatMap((row,i)=>Object.entries(row).map(([k,v])=>[`${key}[${i}].${k}`,v])):typeof value==='object'?Object.entries(value).map(([k,v])=>[`${key}.${k}`,v]):[[key,value]];
    for(const [field,claim] of values){claims++;const verdict=group==='phpstan'&&field==='note'?'unresolved: current price not verified behind account access; historical pricing not reused':'supported with qualification: applies only to the named edition/use and the cited documentation';editionRows.push(`| ${field} | ${esc(claim)} | ${verdict} |`);}
  }editionRows.push('');
}
fs.writeFileSync('audits/tool-review/edition-comparisons.md',['# Shared edition comparison review','',`File: src/data/editions.ts. Baseline SHA-256: ${base.files.find(r=>r.file==='src/data/editions.ts').sha256}. Reviewed SHA-256: ${sha(fs.readFileSync('src/data/editions.ts'))}.`, '',`Nine groups, ${claims} field-level records. No exact commercial quote or customer entitlement is independently verified.`, '',...editionRows].join('\n'));
fs.writeFileSync('audits/tool-review/reconciliation-coverage.json',JSON.stringify({pages:Object.keys(pages),passages:count,editionGroups:Object.keys(editionComparisons),editionClaims:claims},null,2)+'\n');
console.log(JSON.stringify({pages:Object.keys(pages).length,passages:count,editionGroups:9,editionClaims:claims}));
