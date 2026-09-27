# Documentation-led catalog expansion

Reviewed September 26, 2026. This pass adds 24 tools to the previous 65-entry
catalog, bringing it to 89. It broadens language linting, configuration analysis,
secret and dependency checks, runtime checking, generated testing, and program
verification. These are documentation reviews; the tools themselves were not
installed or benchmarked during this pass.

## Admission standard

Every admitted profile has primary references supporting its purpose and input,
setup workflow, findings, limitations, and licensing. The profile records the
review date and narrows its scope when documentation does not support a broader
claim. Official repository documentation can qualify; popularity, a directory
listing, or the number of citations alone cannot.

The ongoing policy is in the [editing guide](../../src/content/docs/guides/editing.md).
It applies to free and paid tools alike. Candidates with unresolved material
facts remain outside the catalog until those facts can be checked.

## Discovery sources

The [Analysis Tools directory](https://analysis-tools.dev/tools), its companion
[dynamic-analysis catalog](https://github.com/analysis-tools-dev/dynamic-analysis),
the [OWASP analysis list](https://community.owasp.org/Source_Code_Analysis_Tools),
and [SV-COMP systems](https://sv-comp.sosy-lab.org/2026/systems.php) helped identify
coverage gaps. Individual project documentation supplied the admission evidence;
listing or competition participation was not treated as an endorsement.

## Admitted tools

Each profile below contains the reviewed official guides and license evidence,
along with searchable capabilities and scope notes.

| Tool | Documentation supporting admission |
| --- | --- |
| [Pyright](../../src/content/docs/tools/pyright.md) | CLI and diagnostic configuration; imports and type-checking scope. |
| [Pylint](../../src/content/docs/tools/pylint.md) | Installation and invocation guide; message behavior and dependency context. |
| [RuboCop](../../src/content/docs/tools/rubocop.md) | Current project guide, versioned CLI guide, and license; defaults remain release-specific. |
| [Checkstyle](../../src/content/docs/tools/checkstyle.md) | Command-line configuration, Java compatibility, and project licensing. |
| [SwiftLint](../../src/content/docs/tools/swiftlint.md) | Installation/toolchain guide, rule directory, and analyzer prerequisites. |
| [SQLFluff](../../src/content/docs/tools/sqlfluff.md) | Getting-started and dialect references; templating and parsing limits. |
| [Stylelint](../../src/content/docs/tools/stylelint.md) | Installation and configuration guides; core CSS versus extension scope. |
| [Hadolint](../../src/content/docs/tools/hadolint.md) | CLI/configuration guide and documented Dockerfile rule explanations. |
| [Checkov](../../src/content/docs/tools/checkov.md) | Quick start and runner/CLI reference; local IaC policy scope. |
| [actionlint](../../src/content/docs/tools/actionlint.md) | Feature reference and CLI guide; expression checks and optional script integrations. |
| [go vet](../../src/content/docs/tools/go-vet.md) | Go vet analyzer reference and Go command documentation. |
| [govulncheck](../../src/content/docs/tools/govulncheck.md) | Go security guide and command reference, including source/binary limitations. |
| [Grype](../../src/content/docs/tools/grype.md) | Installation, target, ecosystem, and result-interpretation guides. |
| [OWASP Dependency-Check](../../src/content/docs/tools/dependency-check.md) | CLI guide, analyzer coverage, and current runtime/data-service prerequisites. |
| [detect-secrets](../../src/content/docs/tools/detect-secrets.md) | Scan and baseline guide plus a separate audit guide. |
| [MemorySanitizer](../../src/content/docs/tools/memory-sanitizer.md) | Clang usage guide, supported platforms, and instrumentation restrictions. |
| [Valgrind Helgrind](../../src/content/docs/tools/valgrind-helgrind.md) | Dedicated manual covering error types, reports, and synchronization limits. |
| [Go race detector](../../src/content/docs/tools/go-race-detector.md) | Go race guide, platform/compiler requirements, and command reference. |
| [Miri](../../src/content/docs/tools/miri.md) | Cargo/nightly workflow, documented interpreter limits, and Rust behavior reference. |
| [Atheris](../../src/content/docs/tools/atheris.md) | Python harness guide and separate native-extension instrumentation guide. |
| [fast-check](../../src/content/docs/tools/fast-check.md) | Installation, generators/properties, shrinking, and run configuration. |
| [KLEE](../../src/content/docs/tools/klee.md) | Installation routes, worked tutorials, output reference, and external-call options. |
| [CPAchecker](../../src/content/docs/tools/cpachecker.md) | Installation, program preparation, configuration, specification, and solver notices. |
| [ESBMC](../../src/content/docs/tools/esbmc.md) | Build routes, property examples, unwinding semantics, and solver/component notices. |

## Scope decisions

- Dependency scanners use the existing Known vulnerable dependencies category. Their ecosystem tags do not imply source-code bug analysis.
- Hadolint, actionlint, and Checkov are configuration tools. Checkov's entry covers local infrastructure policies; platform-only and separate image/SCA features are excluded.
- Miri is listed as dynamic Callable code analysis because its Cargo workflow interprets program code. It is not advertised as an arbitrary native-binary checker.
- KLEE's Binary input means LLVM bitcode. Its symbolic exploration sits in the Static category, consistent with the existing angr entry; this taxonomy choice is explicit on the page.
- CPAchecker and ESBMC record solver licensing separately from the analyzer license. Verification claims remain tied to properties, models, bounds, and completeness conditions.
- RuboCop's current repository guide is supplemented by an official versioned usage guide. The profile does not claim those historical defaults apply to every release.

## Discovery and navigation

Every new tool has capability search terms, applicable filters, and a sourced
profile. Common commands or abbreviations such as MSan, cargo miri, and
go test -race lead to the relevant entry. New pages link to related tools;
existing Python, container, concurrency, and memory-checking pages link back.
The existing comparison view and full-page search index include the additions.

Regression checks cover representative language and capability queries with
filters, all tool titles and aliases, and misleading combinations such as a
configuration scanner appearing as a general source analyzer. Broad capability
queries are checked for relevant matches, rather than assuming one tool must
always rank first as the catalog grows.

## Validation

- `pnpm verify` passed: Astro checks, all 22 tests, the production build, and checks of 110 pages, local links, fragments, assets, and the search index.
- All 89 catalog titles and their aliases were discoverable. Capability/filter checks covered the new categories, including negative scope combinations.
- Browser checks confirmed secret-scanning discovery, Python type-checker results, mypy/Pyright comparison details, and MSan in full-page search. The MemorySanitizer profile and its source links rendered correctly in the narrow preview panel.
- Both research reports passed the Markdown validator. Changed and new files passed ASCII and whitespace checks.

The build still reports the pre-existing duplicate `/404` route warning. No
deployment was performed, and the tool guides were not presented as hands-on
benchmark results.

## Remaining coverage

This is a substantial expansion, not an exhaustive inventory. Further research
can prioritize mobile-specific security checks, HDL and embedded-system analysis,
additional language-specific analyzers, and additional secret-detection workflows.
Absence from this batch means not admitted in this review, not necessarily poor
documentation or an unsupported tool. Apply the same admission standard before
adding any of those candidates.
