# Search and discovery review

Reviewed September 26, 2026 against the 60-entry catalog at commit `cc618a0`.
The external comparison is a review of public pages and project documentation,
not a benchmark of their search algorithms. The recommendations below are our
assessment of what fits this wiki.

The first follow-up added mypy, ShellCheck, clang-tidy,
UndefinedBehaviorSanitizer, and Trivy, bringing the catalog to 65 entries.
The [documentation-led expansion](../catalog-expansion/README.md) adds another
24, bringing it to 89. The baseline findings below describe the original
60-entry review.

## Recommendation

Make tool discovery the main job of the catalog: recognizable names, accurate
matches, and a short path from a task to a few suitable tools. Preserve the
existing scope notes, separate editions, comparisons, and source citations.
These already help readers make better decisions than a long list of names.

## Similar sites and useful patterns

| Reference | Observed pattern | Application to this wiki |
| --- | --- | --- |
| [Analysis Tools directory](https://analysis-tools.dev/tools) | Filters for language, category, tool type, license, pricing, and tags; cards include maintenance labels and votes. | Keep common filters visible and put specialist choices under More filters. Consider explicit interface and maintenance fields later. |
| [Analysis Tools source catalog](https://github.com/analysis-tools-dev/static-analysis) | Language sections, project links, and markers for archived or long-unupdated projects. This powers the same directory, so it is not an independent competitor. | Use it to find omissions, then verify candidates against official documentation. Do not infer abandonment solely from release frequency. |
| [OWASP source code analysis list](https://community.owasp.org/Source_Code_Analysis_Tools) | Selection guidance covers frameworks, build requirements, IDE/CI integration, cost, and output interoperability. | Promote the existing setup and scope information in comparisons. Add structured integration or output fields only after a content review. |
| [AlternativeTo's SonarQube alternatives](https://alternativeto.net/software/sonarqube/) | Alternatives are presented in the context of a known product, with cost/license and platform information. | Add Related tools to profiles, matching task and input before language. A formatter, source checker, and dependency scanner are not interchangeable. |
| [SV-COMP 2026 systems](https://sv-comp.sosy-lab.org/2026/systems.php) | Tools link to languages, versioned archives, and benchmark definitions; entries distinguish competition participation states. | Provide reproducibility links for verification tools. Keep competition participation separate from project maintenance and general product quality. |

The Analysis Tools team's [redesign retrospective](https://analysis-tools.dev/blog/relaunch)
also identifies poor recommendations across tool categories as a previous problem.
For this wiki, similarity should be based on the job and inputs before popularity.

## Search problems reproduced

The baseline below used the actual catalog with the original search function.
Counts are from that snapshot, not estimates of user demand.

| Query | Before | Implemented result |
| --- | --- | --- |
| `ASan`, `TSan` | No matches. | Find the corresponding Clang sanitizer through explicit aliases. |
| `AFL plus plus` | No matches. | Finds AFL++. |
| `C sharp` | No matches. | Matches C# metadata. |
| `cpp` | Only Cppcheck. | Matches C++ metadata across relevant entries. |
| `go` | 13 matches, including cargo-audit through a substring. | Matches the word Go; cargo-audit no longer qualifies through its name. |
| `java` | 16 matches, including ESLint through JavaScript. | Keeps Java and JavaScript distinct. |
| `semgerp` | No matches or recovery suggestion. | Offers Semgrep spelling suggestions without changing filters. |
| `buffer overflow`, `race conditions` | No matches. | Finds the explicitly tagged sanitizer entries. Further verified vocabulary coverage remains useful. |
| `python type checker` | No matches. | The initial search pass identified a catalog gap; the follow-up mypy entry now fills it. |

The previous algorithm searched cost caveats too. A phrase such as "no paid
edition required" could make a free tool match a search for paid software.
The catalog now searches selected descriptive metadata; full notes remain
available through Search all pages.

## Implemented in this pass

- Rank exact names and aliases first. Preserve alphabetical and date sorts.
- Normalize language abbreviations and punctuation while keeping short language names distinct.
- Add maintainable aliases and capability phrases to tool metadata, with initial coverage for six profiles.
- Offer conservative spelling suggestions for tool names after an empty result. Suggestions keep all active filters.
- Make the query field prominent, retain input/language/finding/cost controls, and collapse technique/license into More filters.
- Show removable active filters and explain when filters are hiding otherwise matching tools.
- Carry the query, filters, sort, and comparison selection across catalog category links.
- Distinguish Find a tool from Search all pages. Exclude repeated catalog cards from the full-page index so tool profiles supply their own content. This follows [Pagefind's indexing controls](https://pagefind.app/docs/indexing/).

The visual style remains the existing dark/light theme. The initial search pass
added no tool profiles, analytics service, accounts, or external search service.
The five profiles listed in the follow-up note were added afterward.

## Prioritized next features

| Priority | Feature | Benefit and acceptance criteria | Effort |
| --- | --- | --- | --- |
| 1 | Task-based starting points | Offer curated starting filters for Python security, C/C++ memory errors, dependency vulnerabilities, and API testing. Each preset must lead to relevant existing entries and explain source vs. dependency scope. | Small |
| 1 | Broader search vocabulary | Review aliases and supported capability phrases for every entry. Add query examples to a regression set; verify expected matches and misleading near-matches. Avoid broad synonyms that imply unsupported capabilities. | Medium, mostly content review |
| 2 | Related tools and companion tools | Link alternatives with the same job/input and label complementary tools separately, such as a fuzzer plus sanitizer. Offer the existing comparison view directly. | Medium |
| 2 | Useful filter counts | Show how many results each option would produce with other filters retained. Keep selected zero-result choices visible and removable; do not silently relax them. | Medium |
| 2 | Platform, interface, and integration filters | Separate where the tool runs from what it analyzes; record CLI, IDE, service, CI, and SARIF support where verified. Convert current prose carefully before enabling filters. | Medium to large |
| 3 | Maintenance and evidence status | Distinguish documented, locally tested, archived, and maintenance-only status with sources and dates. Keep the existing verification date; avoid an unsupported "recommended" badge. | Medium |
| 3 | Compact list view and saved shortlists | Help frequent visitors scan more tools and revisit selections. Start with local storage and shareable URLs using the existing comparison mechanism. | Small to medium |

Defer public ratings and popularity ranking until there is enough participation
to make them meaningful. The wiki's value is accurate tool selection; votes
alone do not establish fit or detection quality. A unified tool-and-guide search
can follow later, but the first pass keeps each search's purpose explicit.

## Candidate tools to add

These names were absent from the original 60-entry catalog. Candidates 1-5 have
since received documentation reviews and are now catalog entries; candidates
6-9 were admitted in the subsequent documentation-led expansion. The order favors gaps before overlap. The additions are
documentation reviews, not hands-on tool evaluations.

| Order | Candidate and official source | Gap filled | Scope to check before adding |
| --- | --- | --- | --- |
| 1 | [mypy](https://mypy.readthedocs.io/en/stable/) | Dedicated Python static type checking alongside Ruff and Bandit. | Configuration, untyped code, stubs, and supported Python versions. |
| 2 | [ShellCheck](https://www.shellcheck.net/) | Shell-script analysis. | Shell dialects and checks; distinguish linting from executing scripts. |
| 3 | [clang-tidy](https://clang.llvm.org/extra/clang-tidy/) | C++ linting, diagnostics, and selected fixes. | Compilation database and enabled checks; distinguish from Clang Static Analyzer. |
| 4 | [UndefinedBehaviorSanitizer](https://clang.llvm.org/docs/UndefinedBehaviorSanitizer.html) | Executed undefined-behavior checks complementing ASan and TSan. | Enabled check groups, instrumentation, and target restrictions. |
| 5 | [Trivy](https://trivy.dev/docs/latest/guide/) | Broader container and configuration analysis. | Scanner/target combinations, vulnerability versus misconfiguration findings, database needs. |
| 6 | [Pyright](https://github.com/microsoft/pyright) | Another Python type-checking workflow with CLI and editor support. | Keep the open-source checker distinct from Pylance and other integrations. |
| 7 | [CPAchecker](https://cpachecker.sosy-lab.org/) | Configurable software verification, especially useful beside CBMC. | Supported language/property configurations and reproducible examples. |
| 8 | [KLEE](https://klee-se.org/) | Symbolic execution and generated test cases for LLVM-based workflows. | Build requirements, environment modeling, and bounded exploration limits. |
| 9 | [Grype](https://github.com/anchore/grype) | Container/filesystem vulnerability scanning for comparison with OSV-Scanner and Trivy. | SBOM inputs, supported package ecosystems, and advisory matching limits. |

Secret scanning is another gap. [Gitleaks](https://github.com/gitleaks/gitleaks)
is a candidate, but its current README states that future releases are limited
to security patches and points to Betterleaks. Review both projects before
choosing how to represent that workflow; do not label Gitleaks actively developed
without that qualification.

## Validation

The change includes regression tests for ranking, aliases, language distinctions,
punctuation, negative cost/platform notes, and conservative spelling suggestions.
Existing edition, input-type, and comparison tests remain part of the suite.
Production content checks exercise real tool names and representative aliases.

Executed results:

- `pnpm verify` passed: type checks, 22 tests, production build, and checks of 81 pages, local links, fragments, assets, and the search index.
- All 60 real tool titles and their configured aliases were discoverable in the built catalog.
- Browser checks passed for spelling correction, filter removal while keeping the query, category links, comparison persistence, saved advanced filters, and ASan in full-page search.
- The 390-pixel mobile view had no horizontal overflow; filter removal restored results. Light and dark layouts were inspected.
- The research report passed the documentation validator, and edited files passed the ASCII and whitespace checks.

The build retains an existing duplicate `/404` route warning. No publishing or
deployment was performed.
