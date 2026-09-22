# Tool information accuracy review

Review date: 2026-09-22. Baseline commit: `0851ee497774556fddb090a3d9a6b266c998c417`.

The documentation audit and corrections are complete. Full independent verification is not: the unresolved items below remain visible in the Wiki and in the evidence records. No analysis tools were installed, no examples were executed, and nothing was committed or published.

## Coverage and evidence

| Material | Reviewed | Evidence records |
| --- | ---: | ---: |
| Tool profiles, metadata and notes | 60 | 2,202 |
| Shared edition comparison groups | 9 | 145 |
| Related Wiki pages screened for tool claims | 20 | 213 |

The records contain scalar metadata, individual members of list-valued fields, paragraphs, table groups and example blocks. A compound paragraph is one claim group, with its qualifications retained; these counts are not counts of independent scientific facts. Administrative fields and recommendations are distinguished from product claims. One personal-profile passage is explicitly outside scope. The 404 page is excluded.

- [Tool-by-tool index](tool-index.md): links to all 60 claim records, with scope, reviewed hashes, source URLs, source sections, evidence, dispositions and corrections.
- [Shared edition comparisons](edition-comparisons.md): field-level review of all nine groups.
- [Related pages and original papers](related-pages.md): tool claims in guides, concepts, research notes and entry pages.
- [External source checks](link-check.json): 265 retrieved/attempted URLs, including 254 distinct URLs cited in the final reviewed files. Retrieval status is separate from evidence sufficiency.
- [Starting inventory and original text](baseline.json), [reviewed file hashes](reviewed-files.json), [tool coverage counts](coverage.json), and [related-page counts](reconciliation-coverage.json).

The starting working tree was clean before creating the audit directory. The capture's status includes its own newly created audit script. The baseline includes all 15 tools that had been uncommitted during planning; they were committed before implementation began. No pre-existing edits were overwritten.

## Corrections

| Finding | Original disposition | Correction |
| --- | --- | --- |
| S-TaLiRo attributed to GPL-3.0 by ARCH-COMP 2019 | Contradicted attribution | The report says GPL; the superscript 3 is a project-link footnote. Visually checked p. 3. Removed the version assertion from the profile and model-falsification table. The actual license version remains unknown. |
| Semgrep CE described only as local analysis | Supported with qualification | Added the documented single-function data flow limit and community support qualification; used the CE-specific language matrix and synchronized the shared edition table. |
| Cppcheck 2.22 linked to a moving development manual | Unsupported version match | The linked main-branch manual identifies 2.23 development. Pinned manual/license sources to the confirmed 2.22.0 release without changing the tool scope. |
| RTAMT example presented as a verified local execution | Unresolved provenance | Preserved the earlier account, environment and outputs, while clearly stating that this audit did not rerun it or locate a saved execution record. Removed the unqualified claim that those reported outputs validate the example. |
| Dynamic analysis described as always executing the target during analysis | Contradicted by included workflows | Included recorded traces in the overview and dynamic landing page, consistent with RTAMT and capa. Distinguished FLOSS decoder emulation from a full sandbox run. |
| PHPStan subscription link used as a current-pricing reference | Unresolved current pricing | The page requires account access. The shared comparison now says current prices were not verified and identifies the introduction's prices as historical. |
| angr example lacked direct stream/exploration sources | Supported with qualification | Added the official symbolic-stdin and simulation-manager references. |
| OSV-Scanner illustrative command placed output flags after the directory | Documentation clarity | Moved options before the positional directory; no runtime success is claimed. |
| Research overview implied every profile describes current offerings | Supported with qualification | Pointed readers to the profile's stated edition/version scope. |

The OCPP paper's tool assignments and reported totals match the notes. Its tool/count tables were visually inspected. The CI/CD, malware and EVSE papers support the distinctions between tools used, tools discussed and unvalidated proposals. No current-edition accuracy claims were inferred from historical results.

## Unresolved items and boundaries

There are 10 unresolved records across tool, related-page and edition records. Repeated records describe three areas, not ten independent defects:

1. **S-TaLiRo:** the historical project URL redirects to Google sign-in. A current distribution, host compatibility and exact GPL version could not be verified. Historical MATLAB/MTL/STL workflows are supported by the original papers. The version claim was narrowed rather than guessed.
2. **RTAMT:** the previous local execution and exact reported output lack a saved run record in this repository. The API structure and arithmetic interpretation are consistent with documentation, but they do not establish that the historical run occurred.
3. **PHPStan Pro:** the account page does not expose current prices anonymously. No exact current price is asserted. Core PHPStan 2.x and documented Pro workflow distinctions were reviewed.

Private commercial entitlements and release-specific host combinations beyond public documentation remain outside the relevant entry scopes. The CVE overview requires JavaScript for its article body in the HTTP cache; it is an auxiliary terminology link, not the evidence for a tool capability. Two supplemental Cppcheck lookups using an incorrect tag returned 404; the corrected `2.22.0` references succeeded. No final Wiki citation returned an HTTP error. A loopback URL in the Schemathesis example is a test input, not an external citation.

Documentation dates were advanced or confirmed as 2026-09-22 for 57 profiles. S-TaLiRo, RTAMT and PHPStan retain their previous dates because of the identified verification limits. Earlier version scopes and illustrative-example labels were preserved.

## Validation and reproducibility

The existing verification command passed after the correction batches and at the end: no Astro diagnostics, all 17 tests passed, and all 81 built pages passed internal-link, fragment, asset and search-index checks. The build emits an existing 404-route precedence warning while successfully producing the 404 page. The first attempt encountered an Astro telemetry configuration-directory permission error; setting `ASTRO_TELEMETRY_DISABLED=1` allowed verification without changing user settings.

Browser inspection checked catalog filtering/selection, the Semgrep CE/Code comparison, corrected profile text, and visible uncertainty notes. Source PDFs were rendered where footnotes and table relationships mattered. These checks verify presentation and repository behavior, not hands-on tool effectiveness.

The supporting scripts capture the baseline, retrieve public sources, render manually written assessments, reconcile related pages, and check record integrity. They do not infer truth from successful HTTP responses. Source bodies are in a temporary cache; the repository retains URLs, access dates, response hashes and summarized evidence instead of republishing third-party documents. Validation logs retain the command output with non-ASCII characters escaped.

Run `node audits/tool-review/check-records.mjs` to detect content changed since this audit. A hash mismatch requires a new evidence review; regenerating the ledger alone does not reverify a claim. `capture.mjs` refuses to overwrite the baseline. `finalize.mjs` is a record-generation helper and must only be rerun after manual review, not as an automatic date updater.
