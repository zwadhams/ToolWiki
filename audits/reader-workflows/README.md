# Reader workflow improvements and retests

All five reader-workflow improvements are implemented on
`codex/reader-workflows`. Three fresh agents started at the integrated home page
and followed visible instructions. Each reproduced a fault and a successful
correction. The Python and API readers also used the adaptation instructions on
separate synthetic targets. A fourth fresh reader repeated the memory workflow
after a small expected-output wording correction. No documentation blocker
remains.

This batch is not merged into `main` and has not deployed GitHub Pages.

## Changes

- Added a shared **Get the examples** page with a public snapshot ZIP, an
  optional Git route, and explicit working-directory commands.
- Added standalone Ruff/mypy commands for a reader's project, preserving
  configuration and retaining separate reports. Added Pylint's pinned first
  run, warning explanation, and correction beside the setup links.
- Selected and checked Python 3.13 for the API walkthrough while retaining the
  historical Python 3.12 record. Added bounded Schemathesis commands for another
  schema, URL and operation, with a separate invalid-input check.
- Added a native Windows x64 MSVC AddressSanitizer walkthrough and small bad/good
  C fixtures. It covers toolchain preflight, diagnostic interpretation and the
  correction. The Clang catalog entry keeps its existing scope.
- Corrected Dr. Memory's Windows installation link and distinguished installation
  instructions from compatibility evidence.

The public source snapshot is
[`506c522`](https://github.com/zwadhams/ToolWiki/commit/506c522ca86fd8c9d7b688f35a4d37f842d04cc9).
The first readers tested the guides built from
[`46be6de`](https://github.com/zwadhams/ToolWiki/commit/46be6de2a5fbb2c9e9472b8c18d9e043625e4991).
The memory confirmation used the corrected guide from
[`f930842`](https://github.com/zwadhams/ToolWiki/commit/f9308424ca218959b10a6ecb5860bd637c8fc025).
The [protocol](retest-protocol.json) records isolation, tasks and boundaries.

## Comparison with the original walkthroughs

| Task | Original walkthrough | Fresh retest |
| --- | --- | --- |
| Example acquisition | Used an existing checkout; fresh download untested | All three readers acquired the pinned public ZIP into a new empty directory |
| Python | Demo passed; separate-project adaptation untested | Pylint and Ruff/mypy demos passed; separate invoice project produced findings and then clean results |
| API | Demo passed using a labeled Python 3.13 recovery; own-API adaptation untested | Checked Python 3.13 setup passed; demo and separate shipment API both reproduced the server error and correction; negative-input check executed |
| Windows memory | No diagnostic run; setup and compatibility unresolved | Reader-derived commands passed on native Windows x64 CI, with a sourced heap-buffer-overflow and a clean correction |

The [original walkthroughs](../reader-usability/README.md) remain unchanged.
Retests are expert-agent walkthroughs, not observations of human completion
times or population-wide usability.

## Retained execution evidence

| Retest | Observed result | Evidence |
| --- | --- | --- |
| Python | Pylint W0611/exit 4 then exit 0; Ruff and mypy findings/exit 1 then exit 0 for both demo and invoice targets | [Reader report](retests/python/report.md), command scripts and raw reports beside it |
| API | Faulty demo and shipment positive scans exit 1; corrected scans exit 0; selected negative scan completes with passed and skipped cases recorded | [Reader report](retests/api/report.md), command records, JUnit and captured output beside it |
| Memory | Both fresh replays: builds exit 0; bad run exits 1 with a four-byte write at `bounds.c:5` beyond an eight-byte allocation; good run exits 0 without an ASan diagnostic | [Initial report](retests/memory/reader-report.md), [confirmation report](retests/memory-confirmation/report.md), [confirmation CI record](retests/memory-confirmation/ci-42306409445/reader-run.json) |

The initial independent memory replay ran in
[GitHub Actions run 42305217668](https://github.com/zwadhams/ToolWiki/actions/runs/42305217668)
from commit `56bc97faa43a0448ee5fbe73d293c3b0ce291b9d`. The agent prepared
[the initial script](retests/memory/reader-commands-initial.ps1) from public instructions;
the coordinator reviewed and submitted it, then returned the new outputs to
the reader for interpretation. The replay used a fresh download, the installed
Windows Server 2022 x64 toolchain, and the default ASan options. It did not reuse
the implementation verifier or its results.

The reader found one minor mismatch: bare `cl` printed usage and exited 0,
while the guide said it would report a missing source filename. The sentence
now describes a banner check that may print usage. No compiler or run command
changed. A new reader independently prepared
[the confirmation script](retests/memory/reader-commands.ps1), which passed in
[run 42306409445](https://github.com/zwadhams/ToolWiki/actions/runs/42306409445)
from commit `f7e6eec324057646915c0688715ba0e69e9fce71`. Its
[provenance](retests/memory-confirmation/ci-42306409445/provenance.json) retains
the artifact identity and hashes.

Earlier [Python](implementation/python/README.md),
[API](implementation/api/README.md), and
[native memory](implementation/memory/ci-42303178089/run.json) implementation
checks remain separate. Retained text is ASCII; normalization and raw digests
are recorded where output required conversion. Generated environments and
caches stay under ignored scratch directories.
The scoped `.gitattributes` rule disables newline conversion for this evidence
directory, so captured bytes and recorded hashes survive Git checkout.

## Verification and review

`pnpm verify` passed after the wording correction: 43 Astro files with no
errors or warnings, all 101 tests, and 133 built pages. Site checks covered
local links, fragments, assets, search and discovery for 98 tools, plus builder
navigation and recommendations for 86 reviewed tools. The exact output is in
[verification-final.txt](verification-final.txt).

The [coordinator review](coordinator-review.json) records the exact scope,
primary-source checks and file digests. Scoped review records are appended to
the [review ledger](../review-status/reviews.json); whole-profile verification
dates are not advanced by a narrow workflow test. The
[implementation ledger](implementation.json) tracks the five requirements and
completion gates. The [final validation record](validation.json) records
repository checks, evidence integrity and cleanup.

## Limits

- The memory result is native Windows x64 CI, not this ARM64 development host.
  It validates an installed toolchain, not a fresh Visual Studio installation.
- Python targets use standard-library imports. Third-party dependencies, stubs,
  framework plugins and other operating systems were not exercised.
- The shipment API changes the fixture's route, port and schema filename. It
  tests the documented adaptation, not an unrelated production service.
  Authentication, combined `--mode all`, and RESTler were not executed.
- A selected negative-data check is not complete API validation; skipped cases
  and the check's accepted error statuses are retained and explained.
- Clean results cover these inputs and selected checks. They do not prove
  correctness, security, or coverage of every tool in the catalog.
