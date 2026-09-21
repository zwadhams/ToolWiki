---
title: Add or update a tool
description: Maintain one Markdown file per tool and let the catalog update itself.
---

Each tool has one Markdown file in `src/content/docs/tools/`. Its metadata supplies the catalog filters and facts panel. The rest of the file contains your notes.

## Update an existing entry

1. Open its file, or use **Edit page** at the bottom of the tool's page to edit on GitHub.
2. Update the facts and notes against primary documentation.
3. Update `verified` only when you have checked the sources. Record an exact version in `scope` when the claim depends on one.
4. Review the live preview and run the checks described in the repository README.

## Add an entry

1. Copy a similar tool file into the same folder using a lowercase, hyphenated filename ending in `.md`.
2. Replace its title, description, metadata, sources, and notes.
3. Use existing tag spellings where possible. New tags in filterable fields automatically appear in the filters.

The entry automatically appears in the catalog, the matching analysis section, the tool sidebar, and the published site's search index. A tool can use both `Static` and `Dynamic` in `modes`.

## Metadata fields

| Field | What to record |
| --- | --- |
| `title`, `description` | Tool name and a short factual description. |
| `tool.modes` | A list containing `Static`, `Dynamic`, or both. |
| `tool.inputTypes` | One or more of `Source code`, `Binaries`, `Dependency metadata`, `Container images`, `Running applications`, `Callable code`, `Executable models`, or `Execution traces`. Drives the Input type filter. |
| `tool.findings` | Selected finding categories, such as `Memory safety`, `Injection risks`, `Type errors`, or `Specification violations`. Drives What can it find? |
| `tool.findingNote` | Explain whether the findings need selected rules, manual investigation, assertions, instrumentation, or user-supplied specifications. |
| `tool.environment` | Where the analyzer runs, including OS, runtime, container/WSL routes, and documented compatibility limits. Distinguish host from target. |
| `tool.setup` | Build, dependency, harness, annotation, and other preparation requirements. |
| `tool.techniques` | Analysis methods such as `SAST`, `DAST`, or `Coverage-guided fuzzing`. |
| `tool.languages` | Languages or ecosystems in this entry's verified scope. |
| `tool.languageNote` | Coverage limits, incomplete lists, or language-independent behavior. |
| `tool.targets` | Software context such as `Firmware`, `Notebooks`, or `HTTP APIs`. Searchable in the catalog and shown as Context in the tool notes, with exact Input type duplicates omitted. This is not a separate filter. |
| `tool.licenseCategory` | `Open source`, `Source available`, or `Proprietary`, for the component this entry covers. Source access alone does not establish open-source licensing. |
| `tool.license` | Specific terms and edition caveats. |
| `tool.cost` | A list containing `Free`, `Free with limits`, and/or `Paid`. Multiple values represent different usage entitlements or plans for this entry. |
| `tool.costNote` | Explain free-use eligibility, usage limits, and any paid alternatives. Do not count a time-limited trial as a free edition. |
| `tool.editionGroup` | Optional shared comparison: `codeql`, `sonarqube`, `semgrep`, `burp`, `cppcheck`, `pvs-studio`, `phpstan`, `coverity`, or `polyspace`. The table lives in `src/data/editions.ts`. |
| `tool.website` | The official product or project URL. |
| `tool.verified` | A quoted date such as `'2026-09-21'`. |
| `tool.scope` | Product edition, component, and any verified version. |
| `tool.sources` | A list of `label` and `url` pairs for primary references. |

## Keep claims scoped

Record what the analyzer examines in `inputTypes`, rather than the language used to implement the analyzer. Binary inspection is `Binaries`; manifest or SBOM matching is `Dependency metadata`. Use multiple values when separate documented workflows accept different inputs. Analysis mode remains separate: a binary can be inspected statically or executed under a dynamic checker.

Explain native executable versus JVM bytecode in the notes, and say whether a binary must be rebuilt with instrumentation. `Container images` describes an image artifact inspected at rest, not a running container. Trace monitoring remains dynamic analysis even when a monitor reads saved execution data offline.

Language tags on a dependency scanner describe package ecosystems. They do not imply source-level analysis. Do not copy a bundled utility's broader language list into an entry for a different capability, such as PMD rules versus CPD duplicate detection.

Finding categories are selected capabilities, not exhaustive coverage claims. Do not claim that a fuzzer supplies a property checker just because an assertion can be placed in its harness. Explain that dependency in `findingNote`. The comparison page reads these same fields automatically, so keep them useful without relying on the surrounding article.

Cost and license type answer different questions. Proprietary software can be free to use. "Free with limits" means a continuing free option with eligibility or usage conditions, rather than a trial.

Keep separately filterable entries when editions have different language or analysis capabilities. For example, do not label the paid edition's C++ analyzer as free just because a free edition of the product exists. Update the shared edition comparison when a product changes its free plan or paid features.

Separate documentation review from hands-on experience. Record your test environment and versions if you add evaluation results. Avoid treating an unlisted language as unsupported when an entry only includes selected examples.

For worked examples, state the prerequisites, input, command or configuration, and how to interpret the result. Label examples that have not been run; do not present expected output as a captured result. Keep simulator, compiler, plugin, and license requirements explicit.

Use ordinary Markdown headings beginning at level two (`##`); the site supplies the page title. Relative links should point to the rendered page path and end with a slash.

## Add research notes and connections

Research notes live in `src/content/docs/research/`. Copy the structure of a similar note: the practical question, study or proposal, findings, limitations, suggested application, and a full paper citation with a source link. Keep your suggested workflow separate from observations actually reported in the paper.

Write research notes from Zach's perspective: use "I" for personal discussion and recommendations, and "we" for work with coauthors. Follow the papers' terminology and keep headings short and descriptive, such as Methods, Findings, and Limitations. Preserve uncertainty and the distinction between proposed methods and evaluated results.

Add a new note to the Research notes group in `astro.config.mjs` and link it from the research overview. Record the publication year separately from a later preprint-upload date. Prefer an author copy or publisher source and point readers to the relevant sections. Do not treat a thesis chapter and its corresponding conference paper as independent evidence.

On a relevant tool page, add a `## Related research` section in the Markdown body. Link to both the local note and the paper, and explain the connection: used in the study, discussed in a proposal, or related through a product family. A mention alone does not establish that the tool was evaluated.

Keep current edition coverage and historical study configurations distinct. Record missing configuration details rather than assigning old findings to a current paid or free edition. Updating a research connection alone does not update the tool's documentation-verification date.
