# Browser testing execution and documentation review

Reviewed and executed November 12, 2026. This addition introduces Playwright
Test and axe-core profiles, a shared guide, and an isolated faulty/corrected
search page. The profiles describe different results: authored behavior
assertions and selected automated accessibility rules.

## Retained execution

[record.json](record.json) records the example's input hashes, dependency
versions, process statuses, browser versions, viewport, rule-result IDs, and
digests of the retained output files.

| Variant | Process status | Browser behavior check | axe check |
| --- | --- | --- | --- |
| Faulty | 1 | `memory` found zero visible results where one was expected. | Rule `label` identified `#tool-query`. |
| Corrected | 0 | Capability and case-insensitive name queries retained the expected result; the profile URL was checked. | No violations or incomplete results for the selected initial-page scan. |

The run used Node.js 24.22.1 on a Windows ARM64 host with kernel build
10.0.26300, Playwright Test 1.65.0, @axe-core/playwright and axe-core 4.14.0,
and bundled win64 headless Chromium 158.0.8127.18. The viewport was 1000x720.
The axe tags were `wcag2a`, `wcag2aa`, `wcag21a`, and `wcag21aa`.

- [Faulty Playwright JSON report](reports/bad.json)
- [Faulty stdout](reports/bad.stdout.txt) and [stderr](reports/bad.stderr.txt)
- [Corrected Playwright JSON report](reports/good.json)
- [Corrected stdout](reports/good.stdout.txt) and [stderr](reports/good.stderr.txt)

JSON attachments in the reports include full axe results and a smaller summary.
Screenshot and error-context paths inside the reports identify generated local
files; these binary artifacts are not retained here. The recorded JSON and
diagnostics establish the asserted outcomes. Text transcripts remove ANSI color
sequences and escape non-ASCII code units; JSON escapes preserve string values.

An earlier restricted-process attempt showed the two failures but did not
complete server cleanup or produce a final report. It was cancelled, its child
processes were confirmed gone, and the example was rerun with normal process
permissions. That incomplete attempt is not counted as execution evidence.
The completed verifier rejects missing browsers, runner errors, changed test
counts, retries, and failures that do not identify the intended faults.

## Scope limits

This is one local page, browser build, host, and viewport. The behavior check
does not cover all queries, states, browsers, devices, or journeys. The axe scan
covers only the initial page, not the filtered states from the behavior check.
No manual keyboard, screen-reader, zoom, or user assessment was performed.
Passing this scan does not establish WCAG conformance or complete accessibility.

## Documentation and matching review

The profiles cite official Playwright installation, browser, assertion, locator,
configuration, and licensing documentation, and official axe engine/API/release
and package metadata. The examples pin installed versions and distinguish
documentation-supported host routes from the one route actually executed.

Both reviewed workflows require **Browser UI**, **Running applications**, and
the ability to prepare a harness and run a test instance. The backend language
is independent. Missing Browser UI confirmation must remain a question rather
than turning an arbitrary running process into a confirmed candidate.

[review.json](review.json) records the source files and review digests. Central
navigation and the shared Browser UI vocabulary are integrated separately by
the coordinating change.
