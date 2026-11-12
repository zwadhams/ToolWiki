---
title: Agent knowledge reference
description: Static knowledge format, MCP tool inputs, evidence semantics, limits, and recommendation profiles.
---

Start with [Use ToolWiki with agents](../using-with-agents/) for setup.
All four tools return `snapshotRevision`. Document citations contain `id`,
`title`, `url`, `revision`, and `evidence`. These tools read data and do not
execute target programs, install analyzers, or write files.

The MCP server instructs agents to preserve existing project configuration when
recommending or running checks. Inspect the project's settings before proposing
changes, or give conditional advice when they are unavailable. Reuse existing
rules, targets, exclusions, and tool versions; label new-project defaults and
command-line overrides explicitly. For example, Ruff's `--select` overrides the
configured rule selection, so do not present it as a neutral way to run an
already configured project. See [Ruff rule selection](https://docs.astral.sh/ruff/linter/#rule-selection).

Answers based on ToolWiki should cite the relevant document URLs and the exact
`snapshotRevision` returned by the tools. Cite a shared snapshot once when all
results use it. Keep documentation review separate from execution evidence.
These instructions are delivered during MCP initialization and repeated briefly
in tool descriptions. Restart an existing server connection to load updates.

## Static format version 1

The base path is `/ToolWiki/knowledge/v1/`. `manifest.json` gives the format
version, snapshot revision, document count, and each exported file's path,
SHA-256, and UTF-8 byte count. The manifest itself is not in its file list.

`index.json` lists all published documents. `documents/{id}.json` contains each
structured record; `documents/{id}.md` contains its clean Markdown with absolute
links. `snapshots/{revision}.json` contains every record in one file. There are
no audit scratch files, drafts, or error pages in the export. Links to relevant execution
records are retained as citations.

Each record has `kind` (`tool`, `guide`, `concept`, `research`, or `page`), title,
description, canonical URL, revision, Markdown, sections, sources, and evidence.
Tool records also contain the validated `tool` metadata used by the website.
Section offsets are JavaScript UTF-16 string offsets into the record's Markdown;
the section includes child headings until the next heading of equal or lower
depth. Section IDs match website anchors.

Document revisions are SHA-256 hashes of their JSON payload without `revision`,
with object keys sorted recursively, two-space indentation, and one final newline.
Array order is preserved. Snapshot revisions use the same rule over the snapshot
payload. Manifest hashes instead cover the exact bytes of the exported files.
Hashes detect corruption and mixed files; they do not authenticate a publisher.

`evidence.documentationReviewedOn` is a documentation review date or `null`.
`evidence.execution` has a `status`, `scope`, and source URLs. A `recorded` status
is a reference to the named execution and environment, not a new execution by
the MCP server. `not-recorded` does not mean an example was run or failed.
Read the document for qualifications and illustrative examples.

## search_knowledge

All inputs are optional. `query` defaults to an empty string and allows at most
300 characters. Every query term must occur in the title, ID, description,
aliases, search terms, or body; title matches rank first. There is no embedding
service or semantic search. Results are sorted deterministically.

`filters` accepts `kind`, `language`, `input`, `mode`, and `finding`. Values are
case-sensitive and enumerated by the tool schema. Except for `kind`, these are
tool metadata filters and exclude guides. Unknown fields or values are errors.
`offset` defaults to 0 and is at most 2000. `limit` defaults to 8, from 1 to 20.
Results include the match count and `nextOffset` (`null` when complete).

```json
{ "query": "Python", "filters": { "kind": "guide" }, "limit": 5 }
```

## get_document

`id` is required. Obtain it from search or the snapshot resource. Optional
`section` selects a returned section ID. `offset` defaults to 0; `maxChars`
defaults to 20000 and must be between 1000 and 40000. Offsets are within the
selected section when one is given. The maximum offset is 200000.

The response includes Markdown, sources, all section IDs, total character count,
and `nextOffset`. Pagination can split a code block; join all chunks before
executing commands. Unknown IDs, sections, or offsets beyond the selected
content return errors.

```json
{ "id": "guides/python-checks", "section": "prepare-an-isolated-environment" }
```

## compare_tools

`ids` is required and accepts two to four distinct tool document IDs. Every ID
must identify a tool profile. The result uses the website comparison fields,
including setup, environment, result, scope, cost, sources, and limitations.

```json
{ "ids": ["tools/ruff", "tools/mypy"] }
```

## recommend_checks

`profile` is required and uses the version-1 JSON exported by
[Find tools for your system](../../analysis-suite/). The server validates it
with the same schema and evaluates it with the same rules as the website.
Unknowns remain unknown; omitted prerequisites do not imply permission or
support. Profile goals are retained for compatibility and do not filter matches.

Here is a complete small profile for Python source on Windows. Empty strings,
empty lists, `inputsComplete: false`, and `unknown` intentionally leave details
unconfirmed:

```json
{
  "profile": {
    "version": 1,
    "name": "Python example",
    "preferences": { "cost": "", "license": "" },
    "components": [{
      "id": "app", "name": "Application", "included": true,
      "kind": "Command-line application", "languages": ["Python"],
      "inputs": ["Source code"], "inputsComplete": false,
      "goals": [], "notes": "", "binaryFormat": "",
      "hostPlatform": "Windows", "targetPlatform": "Windows",
      "deployment": "Local/desktop", "technologies": [],
      "access": {
        "rebuild": "unknown", "instrument": "unknown",
        "harness": "unknown", "testInstance": "unknown"
      }
    }],
    "connections": []
  },
  "limit": 10
}
```

Optional `subjectId` selects an included component or connection. `offset`
defaults to 0 and is at most 20000; `limit` defaults to 10 and ranges from 1 to
20. Results include paginated matches, subject descriptions, gaps, and citations.
Each match includes its `candidate`, `details`, or `blocked` status and the
associated reasons or unanswered questions. Gaps include at most 20 summary
reasons with a `totalReasons` count; paginate matches for the complete per-tool
details. Profiles allow at most 50 components and 100 connections.

## Resource and error behavior

`toolwiki://snapshot` is a read-only MCP resource containing the current snapshot
revision and document inventory. Use `get_document` to read its records.

Tool responses are limited to 120000 UTF-8 bytes. Narrow the request or lower
`limit` or `maxChars` if the result exceeds that bound. Snapshot files are limited
to 16 MiB and remote reads have a 15-second timeout. Remote exports require
HTTPS; HTTP is accepted only on localhost for testing. Redirects are rejected.

Invalid arguments are rejected by the MCP schema; domain errors return an error
result. Startup rejects malformed manifests, unsupported versions, invalid
records, duplicate IDs, mismatched revisions, and altered snapshot bytes.
The server holds a validated immutable snapshot until restarted.
