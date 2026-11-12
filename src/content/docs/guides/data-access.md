---
title: Data and AI access
description: Download ToolWiki data or give an agent direct access through ordinary URLs.
dataAccess: true
---

Read ToolWiki from the website, a script, or an agent that can fetch URLs. The
files below are generated with the site. No account, API key, repository clone,
or local server is needed.

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

Start with the [tool catalog](../../knowledge/v1/catalog.json) or
[document index](../../knowledge/v1/index.json), or try the
[Ruff Markdown profile](../../knowledge/v1/documents/tools/ruff.md) and
[Ruff JSON record](../../knowledge/v1/documents/tools/ruff.json).
The [agent format reference](../agents-reference/#static-format-version-1)
explains the record structure and revision calculation.

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
using that agent's file input. The optional [local MCP connection](../using-with-agents/)
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

## Keep a consistent copy

Read the [manifest](../../knowledge/v1/manifest.json), then fetch the path in
`snapshot.path` relative to the manifest URL. Check its byte count and SHA-256
against `snapshot.bytes` and `snapshot.sha256`. Keep that validated snapshot
for the whole task. A deployment can replace individual files between requests;
if a snapshot disappears during an update, fetch the manifest again and retry.
Old snapshot URLs are not an archive, so save the file when reproducibility matters.

A revision identifies content, not a review date. Documentation review and
recorded execution are separate. `not-recorded` means no structured execution
record is supplied; it does not mean a check failed or an example was never run.
