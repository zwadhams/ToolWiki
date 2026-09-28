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

Only admit a tool when its primary documentation supports a useful, scoped profile. A directory listing or product landing page can identify a candidate, but is not sufficient evidence by itself.

Before adding it, verify:

- What it examines, which languages or formats it covers, and which component or edition is described.
- How to install or access it, prepare its inputs, and follow a documented first-use workflow.
- What its findings mean, with a rule reference, example report, or explanation of result types.
- The material limits, such as required instrumentation, incomplete language support, exploration bounds, or external data dependencies.
- Its license and usage terms, including restrictions on required solvers or services.

Link the relevant official guides and license evidence, and record the review date. A detailed official repository guide can qualify; the number of links alone does not establish documentation quality. If a required fact cannot be verified, keep the candidate in research notes until it can be resolved. Limit the entry to documented capabilities instead of filling gaps with assumptions.

1. Copy a similar tool file into the same folder using a lowercase, hyphenated filename ending in `.md`.
2. Replace its title, description, metadata, sources, and notes.
3. Use existing tag spellings where possible. New tags in filterable fields automatically appear in the filters.

The entry automatically appears in the catalog, the matching analysis section, the tool sidebar, and the published site's search index. A tool can use both `Static` and `Dynamic` in `modes`.

## Metadata fields

| Field | What to record |
| --- | --- |
| `title`, `description` | Tool name and a short factual description. |
| `tool.aliases` | Optional list of common names or abbreviations, such as `[ASan, Address Sanitizer]`. Used for catalog matching and shown on the tool page. Defaults to an empty list. |
| `tool.searchTerms` | Optional list of additional, source-supported capability phrases, such as `[buffer overflow]`. Used only by catalog search. Defaults to an empty list. |
| `tool.modes` | A list containing `Static`, `Dynamic`, or both. |
| `tool.inputTypes` | One or more of `Source code`, `Binaries`, `Dependency metadata`, `Container images`, `Configuration files`, `Running applications`, `Callable code`, `Executable models`, or `Execution traces`. Drives the Input type filter. |
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
| `tool.analysisWorkflows` | Optional scoped workflows for the analysis suite builder. Defaults to an empty list; see below. |

## Add a builder workflow

The [analysis suite builder](../../analysis-suite/) matches individual workflows rather than combining a tool's catalog tags. A tool without a reviewed workflow remains in the catalog but does not generate builder recommendations. The matching review is recorded in the repository's `audits/system-builder/README.md`.

1. Check the entry's primary documentation for one concrete workflow, including its language, input, findings, and preparation requirements.
2. Add an item to `tool.analysisWorkflows`. Keep alternative inputs, plugins, editions, and analysis modes separate whenever their requirements or findings differ.
3. Reference evidence URLs already listed in `tool.sources`. Retain the entry's verification date unless you have rechecked its documented claims.
4. Try a matching system, an incomplete description, and an incompatible system in the builder. Run `pnpm verify` to check metadata, matching, and generated pages.

This example describes a hypothetical Python source workflow; adapt its finding and evidence to the actual tool:

```yaml
analysisWorkflows:
  - id: python-source
    label: Python source checks
    subject: component
    inputs: [Source code]
    languageScope: source
    languages: [Python]
    findings: [Logic errors]
    caveat: Selected rules only; verify supported syntax and configuration.
    sources:
      - https://example.org/official-tool-documentation
```

The fields above are required, except `languages` may be empty for `languageScope: independent`. These additional fields default to empty lists:

| Field | Meaning |
| --- | --- |
| `interfaces`, `transports` | Explicit application interfaces and transports for a connection workflow. Connections require at least one interface. TCP support alone is not MQTT or HTTP support. |
| `definitions` | Accepted API definitions: `OpenAPI` or `GraphQL schema`. A definition and a reachable test service are separate requirements. |
| `binaryFormats` | Accepted binary artifacts, such as `Native executable`, `JVM bytecode`, or `LLVM bitcode`. Required when a component workflow takes `Binaries`. |
| `technologies` | Additional required technologies, such as `Ruby on Rails` or `MATLAB`. At least one must be confirmed. |
| `requires` | Required access: `rebuild`, `instrument`, `harness`, and/or `testInstance`. Unknown answers request detail; an explicit No blocks the workflow. |
| `hostPlatforms`, `targetPlatforms` | Documented OS examples for the analysis host and target. Unlisted platforms need confirmation; these lists are not exhaustive exclusions. |
| `excludedHosts`, `excludedTargets` | Explicit, evidence-backed incompatibilities. Do not infer them from a platform missing from an example list. |

`subject` is `component` or `connection`. `languageScope` is `source`, `ecosystem`, `independent`, `model`, or `configuration`. Ecosystem languages describe dependency support. Ecosystem, configuration, and model workflows also inspect selected technologies. All listed `inputs` are required together; use separate workflows for alternatives. An instrumented-build workflow can require source even when the catalog input is the executable it eventually checks.

Workflow findings must be supported by the entry and that particular workflow. Do not give every language all of a product's aggregate capabilities. Record rule, version, plugin, solver, and architecture qualifications in `caveat`; results also display setup, environment, scope, and cost notes. Candidate status means recorded requirements matched, not that all compatibility details or findings were demonstrated.

Keep controlled choices in `src/lib/system-schema.mjs` consistent with metadata. Add focused tests for new matching distinctions. Preserve subject, goal, tool, and workflow relationships so a future coverage view can use the same evidence.

## Use and save a system

Add component cards, available material, and analysis goals, then optionally describe connections. Unchecked material is unknown until you select **Only these materials are available**. Names, component types, deployment context, and free-text notes describe the system; they are not searched for inferred capabilities.

Each included part/goal combination reports candidates, missing information, unmet requirements, or no verified catalog match. A catalog gap does not establish that no suitable tool exists. A candidate does not represent completed testing or full coverage of its goal.

The latest description saves in this browser. **Export system** downloads a version 1 JSON file; **Import system** validates it before replacing the description and recomputes candidates from the current catalog. Imports accept up to 1 MB, 50 components, and 100 connections. Invalid imports preserve the current system. **Undo removal or import** restores the most recently removed part and its incident connections while preserving later edits. Undoing an import restores the entire description from before that import.

If browser storage is unavailable, continue editing and export before leaving. Clearing site data removes the local copy. Comparison selections are temporary and open the comparison page in a new tab. System exports contain descriptions and preferences, not tool results.

## Make tools easy to find

Catalog search ranks exact names and aliases first, followed by names, capability tags, and descriptions. With no query, Best match lists entries alphabetically. Readers can still choose an explicit name or verification-date sort.

Add aliases for the exact entry's name, not for a different edition or predecessor. Keep capability phrases tied to the sources and scope already documented on the page. For example, a race detector can have `race conditions` as a search phrase without implying that it detects all concurrency failures.

Search understands common language spellings such as `cpp`, `C sharp`, `js`, and `golang`. It keeps C, C++, C#, Java, and JavaScript distinct. Search terms must all match; spelling suggestions appear separately when there are no results and retain the current filters. This is keyword search, not a natural-language question-answering system.

The catalog does not search the full article, platform caveats, or cost notes. Those can mention unsupported features or other editions. Use **Search all pages** to search the full notes and guides. Aliases shown on tool pages are also indexed there when the site is built.

Check the official name, each alias, a capability phrase, and a relevant combination of filters after editing an entry. Ensure a free-edition search cannot inherit a paid edition's capabilities. Search and filter choices remain in category links and bookmark URLs.

## Keep claims scoped

Record what the analyzer examines in `inputTypes`, rather than the language used to implement the analyzer. Binary inspection is `Binaries`; manifest or SBOM matching is `Dependency metadata`. Use multiple values when separate documented workflows accept different inputs. Analysis mode remains separate: a binary can be inspected statically or executed under a dynamic checker.

Explain native executable versus JVM bytecode in the notes, and say whether a binary must be rebuilt with instrumentation. `Container images` describes an image artifact inspected at rest, not a running container. Trace monitoring remains dynamic analysis even when a monitor reads saved execution data offline.

Use `Configuration files` for infrastructure definitions such as Terraform, Dockerfiles, or Kubernetes manifests. Configuration analysis does not establish support for general application-source analysis; do not tag a dependency/configuration scanner as `Source code` merely because it scans a repository.

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
