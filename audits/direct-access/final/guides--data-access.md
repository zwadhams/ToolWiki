# Data and AI access

Read ToolWiki from the website, a script, or an agent that can fetch URLs. The
files below are generated with the site. No account, API key, repository clone,
or local server is needed.

On tool profiles and articles, use **Copy as Markdown** to copy the text with
sources, evidence status, and its content revision. **Read Markdown** and
**View JSON** open the files directly and work without JavaScript. If clipboard
access is unavailable, the copy button provides selectable text instead.

## Choose what to download

- **Tool catalog:** Filter a compact list of tool names, aliases, languages,
  inputs, findings, costs, and reviewed workflow platforms. Follow each record's
  links for complete requirements and workflow details.
- **Document index:** Find tool profiles, guides, concepts, and research notes by
  title and description. Each entry links to its Markdown and JSON record.
- **Markdown:** Read a profile or workflow as text, including tool compatibility,
  cost conditions, sources, and evidence status.
- **JSON record:** Read the same document with structured tool metadata, section
  offsets, citations, and its content revision.
- **Complete snapshot:** Download every document and tool record in one JSON
  file for local search, comparison, or offline use.
- **Manifest:** Find the current snapshot, its revision, and file checksums.

Start with the [tool catalog](https://zwadhams.github.io/ToolWiki/knowledge/v1/catalog.json) or
[document index](https://zwadhams.github.io/ToolWiki/knowledge/v1/index.json), or try the
[Ruff Markdown profile](https://zwadhams.github.io/ToolWiki/knowledge/v1/documents/tools/ruff.md) and
[Ruff JSON record](https://zwadhams.github.io/ToolWiki/knowledge/v1/documents/tools/ruff.json).
The [data format reference](https://zwadhams.github.io/ToolWiki/guides/data-reference/) explains fields, allowed values,
and evidence semantics. Download the [JSON Schema index](https://zwadhams.github.io/ToolWiki/knowledge/v1/schemas/index.json)
and [filter vocabulary](https://zwadhams.github.io/ToolWiki/knowledge/v1/vocabulary.json) for programmatic use.

## Give an agent access

Copy this request into an agent that can fetch public URLs, replacing the task
in the first sentence:

```text
Use ToolWiki to find tools for Python linting and type checks.
Start at https://zwadhams.github.io/ToolWiki/llms.txt and follow its links to
the document index and relevant JSON or Markdown records. Read requirements,
limitations, and evidence scope before recommending a tool. Inspect my existing
project configuration before proposing commands or configuration changes.
Cite the ToolWiki page URLs and the revisions from the JSON records you use.
```

If the agent cannot fetch URLs, download the relevant records and attach them
using that agent's file input. The optional [local MCP connection](https://zwadhams.github.io/ToolWiki/guides/using-with-agents/)
offers named search and comparison tools for clients that support it.

## Fetch documents from a script

This Python 3 example uses only the standard library. It reads the index and
prints Markdown URLs for documents mentioning Python in their title or description:

```python
import json
from urllib.request import urlopen

base = "https://zwadhams.github.io/ToolWiki/knowledge/v1/"
with urlopen(base + "index.json", timeout=30) as response:
    index = json.load(response)

for document in index["documents"]:
    summary = document["title"] + " " + document["description"]
    if "python" in summary.lower():
        print(document["id"], base + document["markdown"])
```

These are static files. A URL query such as `?language=Python` does not filter
the JSON response; your script or agent filters downloaded data locally.

To find Python source tools, fetch `catalog.json` instead and filter its `tools`
array where `languages` includes `Python` and `inputTypes` includes `Source code`.
Retain `languageNote`, `findingNote`, and `costNote` when presenting matches.
`reviewedHostPlatforms` and `reviewedTargetPlatforms` are unions of the tool's
reviewed workflows, not exhaustive support lists or guarantees for every mode.
An empty list means no platform is listed there; it does not mean unsupported.

## Download selections and recommendations

In the catalog, **Download these results** saves the current filtered results
in their displayed order as JSON or CSV. JSON includes the filters, source URL,
snapshot revision, and tool records. CSV keeps the tool fields and scope notes;
lists use `/` between values and cells that could be spreadsheet formulas are
prefixed with an apostrophe. Use JSON when you need the exact structured values.

On **Compare tools**, choose two or three tools and use **Download comparison
(Markdown)**. It includes the comparison fields, related explanations, sources,
and evidence status, including details in the collapsed table.

In **Find tools for your system**, download recommendations as Markdown or JSON
from **Tool candidates**. Reports include your current description and notes,
selected tools, candidate and blocked matches, unanswered questions, gaps, and
source revisions. They do not establish that any check has run. **Export system**
still saves just the description for later import; recommendation reports are a
separate format for reading and sharing. Files are created in your browser.

## Keep a consistent copy

Read the [manifest](https://zwadhams.github.io/ToolWiki/knowledge/v1/manifest.json), then fetch the path in
`snapshot.path` relative to the manifest URL. Check its byte count and SHA-256
against `snapshot.bytes` and `snapshot.sha256`. Keep that validated snapshot
for the whole task. A deployment can replace individual files between requests;
if a snapshot disappears during an update, fetch the manifest again and retry.
The [change history](https://zwadhams.github.io/ToolWiki/changes/) and [JSON change feed](https://zwadhams.github.io/ToolWiki/history/index.json)
list selected retained snapshots with byte counts and SHA-256 checksums. A snapshot
listed there remains available at its revision URL. The archive does not include
every deployment; save unlisted snapshots when reproducibility matters. A capture
date records when a snapshot was retained, not when its documentation was reviewed.

A revision identifies content, not a review date. Documentation review and
recorded execution are separate. `not-recorded` means no structured execution
record is supplied; it does not mean a check failed or an example was never run.

Source: [ToolWiki page](https://zwadhams.github.io/ToolWiki/guides/data-access/). [JSON record and content revision](https://zwadhams.github.io/ToolWiki/knowledge/v1/documents/guides/data-access.json).

- **Documentation reviewed:** Not recorded
- **Execution evidence:** not-recorded
- **Execution scope:** No structured execution record for this document. Read the text for illustrative examples and limitations.

Documentation review is separate from execution evidence. A recorded execution applies only to its stated environment and scope; not-recorded means no structured execution record is supplied.
