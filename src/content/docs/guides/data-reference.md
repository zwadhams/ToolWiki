---
title: Data format reference
description: Static JSON schemas, field meanings, filter values, revisions, and evidence semantics.
---

Start with [Data and AI access](../data-access/) for downloads and a fetch example.
All paths below are relative to the
[knowledge manifest](../../knowledge/v1/manifest.json) at `/ToolWiki/knowledge/v1/`.
Files use UTF-8. No request parameters or authentication are required.

## Files and schemas

The [schema index](../../knowledge/v1/schemas/index.json) lists the downloadable
schemas and their stable identifiers. They use JSON Schema Draft 2020-12 and are
generated from the schemas used by the site. The
[vocabulary file](../../knowledge/v1/vocabulary.json) lists the current filter
values and system-builder choices.

| Data | JSON Schema | Purpose |
| --- | --- | --- |
| `manifest.json` | [Manifest](../../knowledge/v1/schemas/manifest.schema.json) | Snapshot pointer and file checksums. |
| `index.json` | [Document index](../../knowledge/v1/schemas/index.schema.json) | All published documents and links to their records. |
| `documents/{id}.json` | [Document](../../knowledge/v1/schemas/document.schema.json) | One complete document, including its Markdown. |
| The document's `tool` property | [Tool metadata](../../knowledge/v1/schemas/tool.schema.json) | Tool capabilities, costs, scope, and reviewed workflows. |
| `snapshots/{revision}.json` | [Snapshot](../../knowledge/v1/schemas/snapshot.schema.json) | All records from one revision. |
| `catalog.json` | [Catalog](../../knowledge/v1/schemas/catalog.schema.json) | Compact tool discovery records. |
| **Export system** download | [System profile](../../knowledge/v1/schemas/system-profile.schema.json) | Editable components, connections, and preferences. |
| Filtered catalog JSON download | [Catalog results](../../knowledge/v1/schemas/catalog-results.schema.json) | Filter state and ordered tool records. |
| Recommendation JSON download | [Recommendations](../../knowledge/v1/schemas/recommendations.schema.json) | Input, matches, gaps, selections, and cited tools. |

`documents/{id}.md` is the document's Markdown as a standalone text file. Its
canonical page URL and JSON-record link identify the source. **Copy as Markdown**
adds the content revision from that JSON record. Comparison and recommendation
Markdown downloads are readable reports; their structured equivalents are the
tool records and recommendation JSON respectively.

## Document fields

| Field | Meaning |
| --- | --- |
| `id` | Stable document identifier such as `tools/ruff` or `guides/python-checks`. |
| `kind` | `tool`, `guide`, `concept`, `research`, or `page`. |
| `title`, `description` | Display name and concise description. |
| `url` | Canonical website URL to cite. |
| `revision` | SHA-256 content identity for this record, not a date or tool version. |
| `markdown` | Complete article text, with tool decision facts, compatibility, editions, sources, and evidence where applicable. Relative Markdown links become absolute; code blocks remain unchanged. |
| `sections` | Heading `id`, `title`, `depth`, `start`, and `end`. Offsets are zero-based UTF-16 code units into `markdown`, with an exclusive end. A section includes child headings. IDs match website anchors, including custom metadata-section anchors. |
| `sources` | Objects with a `label` and absolute `url`. Includes tool references and links found in the exported text; not every link is independent evidence. |
| `evidence` | Documentation-review date and separately recorded execution evidence. See below. |
| `tool` | Present only for tool profiles. Validated metadata used by the catalog, comparisons, and system builder. |

The index replaces `markdown` text with a relative Markdown file path, adds a
`record` path to JSON, and omits `tool`, `sources`, and section offsets. It keeps
each document's identity, description, evidence, and revision. Its top-level
`revision` is the snapshot revision.

## Catalog and tool fields

The catalog's `tools` array contains discovery records, not full workflow
definitions. Fetch a record through its `record` path before choosing a workflow.
The catalog's top-level `revision` identifies the snapshot; each tool's
`revision` identifies that document. Paths are relative to the manifest.

| Field or group | Meaning |
| --- | --- |
| `id`, `title`, `description`, `url`, `revision`, `evidence` | Same identity and evidence as the document record. |
| `record`, `markdown` | Relative JSON and Markdown paths. |
| `aliases`, `searchTerms` | Alternate names and documented search phrases. |
| `modes`, `techniques` | Static/dynamic categories and analysis methods. |
| `inputTypes`, `targets` | Materials examined and software context. A language tag alone does not imply source-code analysis. |
| `languages`, `languageNote` | Languages or ecosystems and qualifications on that support. |
| `findings`, `findingNote` | Finding categories and the conditions under which checks apply. Matching labels do not imply equal detection or coverage. |
| `cost`, `costNote`, `licenseCategory` | Continuing cost categories, eligibility or edition conditions, and license class. Trials are not free editions. |
| `environment`, `scope` | Where the tool runs and the edition, component, or verified version described. |
| `reviewedHostPlatforms`, `reviewedTargetPlatforms` | Catalog-only unions of reviewed workflow platforms. They are not exhaustive support lists and do not establish support for every tool mode. |

The full `tool` object additionally supplies `website`, `license`, `verified`,
`setup`, optional `cardRequirement`, optional `decision` (`useWhen`, `result`,
`limit`), optional `editionGroup`, and `analysisWorkflows`. It uses `verified`
for the same date exposed as `evidence.documentationReviewedOn` in the record.
The [authoring field guide](../editing/#metadata-fields) explains every tool field.

Each workflow has its own inputs, findings, requirements, platform lists,
sources, and caveat. Keep alternative workflows separate; do not combine their
requirements or capabilities. See [workflow fields](../editing/#add-a-builder-workflow)
for the complete dictionary.

## Allowed values and unknowns

Use `vocabulary.json` rather than guessing spelling or capitalization. Its
`catalog` object maps filter names to current values: `mode`, `input`,
`language`, `finding`, `technique`, `license`, and `cost`. For example,
`input: "Source code"` maps to membership in a tool's `inputTypes` array.
`filterSentinels` describes the UI's empty selection, `any-free` cost preference,
and sort values; these are not tool metadata tags.

In system profiles, `unknown` is an unanswered access question, while `no` is an
explicit negative answer. Empty platform choices mean unspecified. An empty
workflow platform list does not mean unsupported; explicit `excludedHosts` and
`excludedTargets` carry exclusions. When `inputsComplete` is false, an omitted
input remains unconfirmed. When true, omitted inputs are unavailable.

`candidate` means the recorded requirements match the supplied description.
`details` means more information is needed. `blocked` means at least one stated
requirement is unmet. `gap` means no reviewed workflow matched that subject;
it does not prove no suitable tool exists. An undescribed subject has
`needsDescription: true` and may have no gap entry. None of these statuses
establishes execution, measured coverage, or permission to run a check.

## Evidence and freshness

| Field | Meaning |
| --- | --- |
| `evidence.documentationReviewedOn` | `YYYY-MM-DD` documentation review date, or `null` when no structured date is supplied. It is not the build date. |
| `evidence.execution.status` | `recorded` or `not-recorded`. |
| `evidence.execution.scope` | The tested environment and limits, or an explanation of missing structured evidence. |
| `evidence.execution.sources` | URLs to execution records. A recorded status requires at least one source. |

`not-recorded` does not mean an example failed or has never run. Read the scope
and article qualifications. A recorded execution applies to its stated
environment and version; it is separate from a current documentation review.

## Revisions and validation

`version` is the format version. `revision` in the manifest, index, catalog, and
snapshot identifies the snapshot content. Reports and vocabulary call that value
`snapshotRevision` to distinguish it from document revisions. A document hash is
computed from its JSON without `revision`, sorting object keys recursively,
preserving array order, using two-space indentation and one final newline. The
snapshot hash uses the same rule over its payload.

Manifest SHA-256 values cover exact UTF-8 file bytes. Verify both hashes and byte
counts when retaining a snapshot. Hashes detect changed bytes and mixed files;
they do not authenticate the publisher. Additional downloadable files can appear
in version 1, so follow the manifest inventory instead of hardcoding its length.

Schemas validate structure, required fields, types, enum values, and bounds.
They do not recompute hashes or fully express cross-field rules. The site also
checks unique IDs, valid connection endpoints, unique profile list values,
workflow findings and sources against their tool profile, and workflow-specific
input requirements. Saved system files additionally have a 1 MiB UTF-8 limit.
Section offsets must be ordered and within the Markdown string. Reports must
refer to their included tool and subject IDs and retain the results of the
matching rules. Do not treat structural schema validation as evidence of factual
correctness or compatibility.

To validate a downloaded Ruff record, first save the document schema as
`document.schema.json` and the record as `ruff.json` in the same directory.
With Python 3 and the `jsonschema` package installed, run:

```python
import json
from pathlib import Path
from jsonschema import Draft202012Validator

schema = json.loads(Path("document.schema.json").read_text(encoding="utf-8"))
record = json.loads(Path("ruff.json").read_text(encoding="utf-8"))
Draft202012Validator.check_schema(schema)
Draft202012Validator(schema).validate(record)
print("Document structure is valid.")
```

## Downloaded report fields

Filtered catalog JSON includes `version`, `kind: "catalog-results"`,
`snapshotRevision`, `sourceUrl`, `knowledgeBase`, `filters`, `count`, and ordered
`tools`. Resolve record paths against `knowledgeBase`. CSV flattens these tool
fields; lists use ` / `, standard CSV quoting preserves commas and newlines, and
an apostrophe protects formula-like cells. JSON preserves the original strings.

Recommendation JSON includes `version`, `kind: "recommendations"`,
`snapshotRevision`, `sourceUrl`, `limitation`, `profile`, `selectedToolIds`,
`results`, and the referenced `tools`. The input profile contains components,
connections, notes, and preferences; the
[system authoring guide](../editing/#use-and-save-a-system) explains import and
recovery. `selectedToolIds` records a comparison shortlist, not executed checks.

`results.subjects` contains each included part's name, description status, and
grouped nonblocked candidates. `results.matches` contains all applicable
workflow evaluations, including blocked ones. Each match names its tool,
workflow, subject, findings, status, `reasons`, `unresolved` questions, and
`blocked` requirements. `questions` gives a field, message, and whether an answer
or compatibility verification is needed. `goalIds` classifies findings and does
not filter matches. `results.gaps` summarizes each described part's match status
and reasons. The referenced tool records retain setup, scope, costs, workflows,
and a `citation` containing the document URL, revision, and evidence.
