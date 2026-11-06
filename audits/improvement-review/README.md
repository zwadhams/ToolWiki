# ToolWiki improvement audit

Reviewed November 6, 2026, against commit `27c229bd7079ede31cd30ce500e999461eb97eef`.
The starting working tree was clean. This audit produced reports and a roadmap;
it did not change the site, install analyzers, execute analyzer examples, or publish anything.

Fifteen agents completed twelve specialist audits and three independent reviews.
The consolidated backlog contains **44 findings: 22 P2 and 22 P3**, including
six confirmed defects and nine proposed tool additions. No P1 finding was established.
Every P2 finding received independent review. P2 means useful next work, not an emergency;
P3 covers bounded improvements and later expansion.

The wiki already supports useful reader journeys. The six newcomer scenarios succeeded,
and the system finder correctly handled the sampled language, input, platform, access,
cost, and edition distinctions. The strongest improvements are preserving reader state,
making examples easier to reuse, strengthening authoring checks, and filling specific
coverage gaps.

## Use the audit package

- [Findings and implementation contracts](findings.json) contain evidence, source locations,
  reproduction steps, priorities, independent dispositions, acceptance criteria, dependencies,
  and compatibility notes. Search by the finding IDs used below.
- [Coverage ledger](coverage.csv) contains 120 rows: all 89 profiles, 22 other documentation
  pages, and nine candidates. It records completeness screening, deep-review families,
  deferred matching reasons, proposed scope, and source links.
- [Baseline and file hashes](baseline.json) identify the inspected revision and all 239
  pre-existing tracked files. [Inventory](inventory.json) records the 89 profiles and 93 workflows.
- The specialist and independent reports are linked in the review table below. They preserve
  observations, successful checks, rejected leads, and evidence limitations.

The CSV's `present`, `partial`, and `missing` values describe guidance completeness under
the [screening rubric](reports/agent02.json). They are not ratings of tool quality or
verification of every capability. Thirty-four profiles contain fenced examples and 55 do
not; a useful GUI procedure or exact official tutorial can satisfy a first-result task.

## Findings that should lead the work

| Finding | Established behavior | Practical consequence |
| --- | --- | --- |
| MAT-01 | Serialization can exceed the restore/import limit while saving reports success. | A large saved description can become inaccessible, and a later edit can overwrite its retained raw data. |
| ARC-01 | Profile and comparison return links lose the Static/Dynamic category. | Static/C++ changes from 15 candidates to the 24 in All/C++ on explicit return. |
| CMP-01 | Opening a profile and explicitly returning clears selected comparison IDs. | Readers rebuild their shortlist. Direct comparison return is a passing control. |
| A11Y-01 | Removing the last shortlisted tool leaves focus on BODY in catalog and builder. | The next Tab restarts at Skip to content instead of continuing near the results. |
| SEA-02 | The broad Test an API shortcut omits two already-tagged HTTP API profiles. | Its wording and membership disagree; underlying keyword matching behaves as implemented. |
| MNT-01 / MNT-02 | Optional tool-field typos are stripped; expected catalog membership is derived from the filtered catalog. | Future authoring mistakes can silently omit metadata or a profile. All current 89 profiles are represented. |

Two smaller confirmed defects are also inexpensive to correct: the Polyspace edition
comparison hides a contextual source when no note accompanies it (ARC-02), and the
Jazzer PowerShell example discards an existing `JAZZER_FUZZ` value (REX-06).
Polyspace's general source list remains present; no analyzer was run to assess Jazzer.

MAT-01 is a large-input boundary case, not an observed failure of ordinary descriptions.
The independent reproduction grew an accepted 903,365-byte description to 1,203,365 bytes.
A second case accepted 996,723 bytes of compact JSON that became 1,053,365 bytes after
serialization, without further editing. The current inclusive cap is 1,048,576 UTF-8 bytes.
Reload retains the raw stored value but presents a blank fallback with an error; subsequent
autosave is the overwrite point. The exact synthetic scripts and outputs are retained in
the [matching report](reports/agent11.json) and [independent implementation review](reports/agent15.json).

## First implementation batch

Implement these seven items in order. The complete tests and saved-state contract are in
`first_implementation_batch` and `saved_state_fix_contract` in [findings.json](findings.json).
These are recommendations for subsequent work, not changes made by this audit.

1. **Protect save, import, export, and recovery boundaries (MAT-01).** Keep version 1,
   the existing storage key, two-space JSON, and the inclusive 1 MiB cap. Validate the
   actual normalized UTF-8 serialization before committing imports, writing storage,
   or downloading ordinary exports. Reject oversized writes without replacing the
   previous valid save; retain in-memory edits for reduction. Protect unreadable stored
   raw data from every autosave path until an explicit replacement succeeds. Offer a
   separately labeled raw recovery download, without promising that it is importable.
   Test exact boundaries, multibyte text, compact/default expansion, edit growth, failure
   preservation, and isolated browser recovery wiring.
2. **Preserve one safe navigation context (ARC-01, CMP-01).** Carry `category=all|static|dynamic`
   and normalized `compare` IDs inside the existing catalog context, separate from form
   filter iteration. Map only to existing local routes. Keep the comparison page's own
   `tools` parameter authoritative after choices change. Cover profiles, comparisons,
   related notes, cost anchors, selection-only visits, legacy links, and invalid or nested
   context. Preserve the three-tool limit and known-ID validation.
3. **Restore focus after the final removal (A11Y-01).** Focus the catalog's visible result
   count; in the builder, make the surviving comparison status programmatically focusable
   and focus it after rendering. Keep useful behavior when choices remain. Verify the next
   Tab path and removal of a selected tool absent from current filtered results.
4. **Correct the API shortcut (SEA-02).** Use the existing `HTTP` query plus `Running applications`
   filter. Check the actual generated destination and current intended membership, including
   ZAP and Burp Professional, without enforcing a permanent count or ranking. Preserve
   distinctions between manual testing, security scanning, and generated API tests.
5. **Render edition notes and sources independently (ARC-02).** Cover source-only, note-only,
   both, and neither. Verify the citation inside the edition section, not merely somewhere
   on the page.
6. **Restore Jazzer example shell state (REX-06).** Capture the environment variable's previous
   presence and value, then restore them in `finally`. Retain native exit reporting and the
   illustrative label. Any later wrapper check can use harmless stubs; it need not execute Jazzer.
7. **Add focused authoring guards (MNT-01, MNT-02).** Reject unknown keys only in the project-owned
   tool object, leaving supported Starlight frontmatter intact. Derive expected published tool
   identities before filtering missing metadata, then reconcile them with generated catalog IDs.
   Respect drafts, ordinary documentation pages, and catalog-only profiles with no workflows.
   Test the production schema, intentional omissions, typo failures, and identity-set equality.

Use existing Node and generated-site checks for logic and content assertions. Add a focused
isolated-browser acceptance pass for event wiring and focus. MNT-04 is folded into these
checks; it is not a separate testing-platform project. Broader architecture changes are
independent follow-up work.

## Flesh out the content and catalog

**Reusable content comes next.** Introduce one human-readable run record that separates
planned commands and expected output from observed execution. Build a Ruff-plus-mypy
recipe around one small faulty/corrected project, with separate reports and explicit
complementary roles. Extend the existing full decision-summary format to mypy, SpotBugs,
and PSY-TaLiRo with corresponding First try guidance. Pilot one or two additional first-result
paths before expanding the pattern (REX-01, REX-03, REX-04, N01).

Consolidate finding triage and CI result handling, sharing the same evidence vocabulary.
Distinguish completion, findings, skipped/incomplete work, and a chosen pipeline gate;
exit codes are tool-specific. Extend the static primer to configuration and secret scanning,
then explain abstract interpretation, symbolic execution, data flow, and proof obligations
through reader decisions and outputs (KNO-01 through KNO-03, EXP-01).

A later HTTP example should supply its service, schema, launch/reset/stop procedure, known
fault, correction, and replayable request. Select the shared OpenAPI and environment scope
before promising reuse across RESTler and Schemathesis. A boofuzz target and monitor are a
separate fixture. Preserve the distinction between an illustrative procedure and an executed
experiment (REX-02).

**Improve discovery and maintenance in bounded changes.** Add reviewed positive vocabulary
and displayed taxonomy labels while retaining current keyword semantics. Require mode
population recall rather than exact result-set equality. Offer a nearby handoff to full-page
search, show the matched language, and link directly to existing cost and compatibility notes.
Keep the global sidebar's fresh-category behavior for now; changing it is a design opportunity,
not an established defect (SEA-03 through SEA-05, N02, CMP-03, EXP-03).

Use small purpose-specific data projections, shared identical vocabularies, and explicit
featured-comparison flags where they remove demonstrated maintenance risk. The catalog's
252,211 uncompressed JSON bytes include unused fields; a specialist estimated a 48,257-byte
consumed-field projection. No latency improvement was measured, and that projected byte count
was not independently recreated. Keep current-review provenance separate from immutable
historical ledgers and from execution records (ARC-03 through ARC-05, MNT-03).

**Admit tools for specific missing tasks.** Start with TypeScript and PowerShell checks,
then one narrow CodeQL Python workflow for an existing profile. The following additions have
primary-documentation support within the stated scope; none was installed, executed, or added.
Pin releases and matching prerequisites during authoring. Full license, setup, limitation,
and independent-review evidence is in the finding records.

| Candidate | Initial reader task and boundary |
| --- | --- |
| [TypeScript compiler](https://www.typescriptlang.org/docs/handbook/2/basic-types.html) | Check a configured TypeScript project without emitting code; distinguish compiler diagnostics from ESLint and runtime validation. |
| [PSScriptAnalyzer](https://learn.microsoft.com/en-us/powershell/utility-modules/psscriptanalyzer/overview?view=ps-modules) | Analyze PowerShell source; keep this separate from ShellCheck's shell-language scope. |
| [Gitleaks](https://github.com/gitleaks/gitleaks) | Review local Git history for candidate secrets, with its maintenance-only qualification explicit. Betterleaks remains deferred pending matched release/documentation scope. |
| [coverage.py](https://coverage.readthedocs.io/en/latest/) | Measure one Python test run's lines and branches; execution coverage does not establish assertion quality. |
| [py-spy](https://github.com/benfred/py-spy) | Sample one local CPython workload; specify host/process permissions even for a launch-under-profiler route. |
| [StrykerJS](https://stryker-mutator.io/docs/stryker-js/getting-started/) | Assess selected source mutations in one working JavaScript/Jest suite; teach exact mutant states and score semantics. |
| [k6 OSS](https://grafana.com/docs/k6/latest/get-started/running-k6/) | Run bounded local HTTP load with explicit thresholds; checks alone do not establish a failed test status. |
| [MobSF](https://github.com/MobSF/Mobile-Security-Framework-MobSF) | Inspect Android APKs statically; scope the local service boundary and exclude iOS and dynamic modes. |
| [Verilator](https://verilator.org/guide/latest/overview.html) | Lint Verilog/SystemVerilog; keep simulation and formal hardware verification outside this first entry. |

Catalog-only admission is appropriate when the builder cannot yet express the required
runner, package format, or process access. k6 can use existing HTTP connection requirements
after workflow evidence is reviewed. A new finding does not require a legacy goal mapping
to appear: the current matcher retains evaluated workflows with empty `goalIds`.

All nine currently deferred profiles have an individual review row in the coverage ledger.
CodeQL Python has a named query/extraction starting point; Semgrep CE still needs an exact
rule and license selection. Other language/edition combinations remain deferred until
their evidence supports each workflow field (MAT-03).

## Reconcile earlier audits

| Earlier work | Current disposition |
| --- | --- |
| Initial nine candidate additions and later 24-entry expansion | Resolved as catalog breadth; all are present. First-result depth remains a separate task. |
| Names, aliases, and search recovery | Name/alias checks pass; positive capability vocabulary and the API shortcut retain concrete gaps. |
| Four enhanced usability pilots | Completed within the stated pilot scope. Wider summary/example work extends that effort. |
| Filtered catalog return | Form filters work; category and profile-shortlist subcases remain open. No evidence establishes that these subcases previously worked. |
| Conservative system recommendations | 93 workflows across 80 profiles remain reviewed; nine omissions are intentional and disclosed. |
| Historical claim ledger | 62 of 82 recorded files changed, including 53 of 60 recorded tool profiles. This does not establish false claims or erase later reviews. |
| S-TaLiRo, RTAMT, and PHPStan Pro | Current distribution/license, historical execution/environment, and current pricing uncertainties respectively remain disclosed and unresolved. |
| Pagefind permissions and duplicate 404 warning | Restricted Pagefind failure resolved with normal permissions. The existing 404 warning remains low-impact; the generated 404 and site checks pass. |

The [maintenance report](reports/agent09.json) retains all 22 reconciliation rows, including
partially resolved proposals for filter counts, saved shortlists, and integration metadata.

## Review coverage and validation

Up to three subagents ran concurrently. Browser ownership was serialized; auditors used a
separate production origin at `127.0.0.1:4331`. Source work overlapped report completion between
waves. The newcomer first pass used only the site and task prompts before source inspection.

| Agent | Lane | Evidence report |
| --- | --- | --- |
| 1 | Newcomer experience | [Six reader journeys](reports/agent01.json) |
| 2 | Reusable examples and recipes | [All 89 profiles and four guides](reports/agent02.json) |
| 3 | Architecture and data reuse | [Data flow and shared components](reports/agent03.json) |
| 4 | Search and navigation | [Live discovery and 132 title/alias queries](reports/agent04.json) |
| 5 | Existing-domain coverage | [Five scoped candidates](reports/agent05.json) |
| 6 | Concepts and knowledge structure | [Six concepts, six research notes, and guides](reports/agent06.json) |
| 7 | Experienced-engineer workflows | [Project constraints and adoption](reports/agent07.json) |
| 8 | Comparisons and alternatives | [Selection continuity and decision guidance](reports/agent08.json) |
| 9 | Authoring and maintenance | [Schema guards and prior-audit reconciliation](reports/agent09.json) |
| 10 | Accessibility and responsive UI | [Keyboard and viewport checks](reports/agent10.json) |
| 11 | System matching | [Size reproduction and nine deferrals](reports/agent11.json) |
| 12 | Adjacent categories | [Four bounded additions](reports/agent12.json) |
| 13 | Independent experience review | [13 dispositions and live reproductions](reports/agent13.json) |
| 14 | Independent evidence review | [16 dispositions and primary sources](reports/agent14.json) |
| 15 | Independent implementation review | [19 dispositions and implementation contracts](reports/agent15.json) |

The baseline `pnpm verify` passed Astro diagnostics and all 49 unit tests, then Pagefind
encountered a restricted-filesystem write failure. The incomplete output caused 111 missing
sitemap-reference errors. A normal-permission build and generated-site check passed all
111 pages, internal links/fragments/assets, the search index, 89-tool discovery, and matching
checks for 80 profiles. Preserve both attempts:

- [Original verification output](verification.txt)
- [Successful build retry](build-retry.txt)
- [Successful generated-site checks](site-check-retry.txt)
- [Audit artifact validation](artifact-validation.txt)

Sampled live checks covered six reader scenarios, filters, Pagefind search, comparison
returns, system persistence, cost/license choices, Windows binary/rebuild transitions,
keyboard controls, and layouts at 390 x 844, 768 x 1024, and desktop size. Source/unit checks
covered import rejection, round trips, undo, unknown versus unavailable inputs, and the large
storage cases. Viewport and theme changes were restored after browser work.

These are agent walkthroughs and documentation reviews, not a human usability study,
benchmark, full accessibility certification, network/privacy test, or exhaustive reverification
of every tool claim. Actual 200% browser zoom and screen-reader speech were not verified;
narrow-viewport reflow is not a substitute. Large storage cases used synthetic in-memory
storage. KNO-04, the optional reader-orientation idea, remains a specialist heuristic without
a separate independent disposition. Historical runtime uncertainties were not closed by
reading newer documentation. Audit artifacts use ASCII, and all pre-existing tracked files
retain their baseline hashes.
