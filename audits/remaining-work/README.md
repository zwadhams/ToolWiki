# Completed roadmap implementation

Completed November 6, 2026. All 44 findings from the
[improvement roadmap](../improvement-review/README.md), plus its cross-cutting
regression requirement, are addressed. The [completion ledger](implementation.json)
retains the original acceptance criteria and links each item to evidence.
Historical audit files remain unchanged.

## What changed

- Added nine profiles: TypeScript, PSScriptAnalyzer, Gitleaks, MobSF, Verilator,
  coverage.py, StrykerJS, py-spy, and k6. The catalog now has 98 profiles;
  the system builder uses reviewed workflows for 86 tools.
- Added reusable Python, HTTP API, protocol, temporal-monitoring, coverage, and
  mutation examples, with separate setup, findings, and execution records.
- Added reader orientation, finding triage, CI handling, decision and run records,
  secret-history guidance, and explanations of advanced analysis methods and
  execution/data boundaries.
- Improved capability search, full-page search recovery, selected-language cues,
  comparison cost links, concrete result summaries, and compatibility actions.
- Split browser data by consumer, shared metadata vocabularies, made featured
  comparisons explicit, and added current review provenance reporting.
- Retained the [first batch's](../first-batch/README.md) saved-data protection,
  navigation state, keyboard focus, authoring guards, and example fixes.

Sidebar category links still start a fresh view; in-page category tabs retain
filters. The reader guide now explains that deliberate distinction.

## Review and verification

Independent reviews covered [architecture](reviews/architecture.json),
[content and recipes](reviews/content.json), [catalog expansion](reviews/expansion.json),
and [measurement and runtime evidence](reviews/measurement-runtime.json).
All actionable findings were resolved and rechecked. Fixes included stale Jest
sandbox discovery, RESTler's report path, Windows Schemathesis output capture,
boofuzz readiness failures, and Semgrep host qualifications.

The final [`pnpm verify` run](verification-final.txt) passed:

- Astro diagnostics: 43 files, zero errors, warnings, or hints.
- Node tests: 101 passed, zero failed or skipped.
- Production build and Pagefind search: 131 pages.
- Site checks: links, fragments, assets, search data, all 98 catalog identities,
  and builder recommendations for 86 reviewed tools.

The build still reports the pre-existing duplicate `/404` route warning. The
generated 404 page and site checks pass. A search-index issue found during browser
acceptance was fixed; the site checker now rejects empty or malformed Pagefind
assets even when the build itself reports success.

[Browser acceptance](browser-acceptance.json) covered search handoff and results,
language cues, cost and return links, missing-answer versus compatibility actions,
keyboard focus, and a synthetic saved-system reload. The final build was also
checked after language edits. Earlier boundary and recovery checks are retained
in the first-batch report.

## Language review

After implementation and technical review, three subagents reviewed the
[interface](reviews/language-ui.json), [guides](reviews/language-guides.json), and
[all 98 profiles](reviews/language-profiles.json). The coordinator applied all
55 suggestions and one matching cleanup in the editing guide: 56 changes across
42 files. Reviewers then checked the applied text and recorded fresh digests.

The [change record](reviews/language-changes.json) retains every replacement.
Changes remove repeated explanations, author commentary, vague phrases, and byte
expansions after `1 MiB`. Commands, formulas, limits, licenses, evidence labels,
and recovery behavior remain intact.

## Execution evidence and limits

Retained runs cover Ruff, mypy, RTAMT, Schemathesis, boofuzz, TypeScript,
PSScriptAnalyzer, Semgrep CE, coverage.py, StrykerJS, and k6. See the linked review
records, `executions/`, `expansion-runs/`, and the examples' evidence files for
versions, inputs, commands, outputs, and bounds.

CodeQL and RESTler procedures, several first-use pilots, and the Gitleaks, MobSF,
Verilator, and py-spy examples remain explicitly illustrative. Documentation
review does not establish execution or broad compatibility. Browser checks are
focused acceptance checks, not full accessibility certification.

The [current review report](../review-status/README.md) records scoped follow-up
reviews without changing historical source dates. Language reviews have their
own scope and do not replace technical evidence. All 116 frozen historical audit
files retain their original digests.

No commit or publication was performed.
