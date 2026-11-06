---
title: Get the examples
description: Download the tested example files and open the right working directory.
---

Use this snapshot for the Python, API, and Windows memory walkthroughs. It
contains the example files; each walkthrough explains which tools to install.

## Download the snapshot

[Download the example snapshot (ZIP)](https://github.com/zwadhams/ToolWiki/archive/506c522ca86fd8c9d7b688f35a4d37f842d04cc9.zip)
and extract it, or run these commands in PowerShell from an empty working
directory:

```powershell
Invoke-WebRequest 'https://github.com/zwadhams/ToolWiki/archive/506c522ca86fd8c9d7b688f35a4d37f842d04cc9.zip' -OutFile examples.zip
Expand-Archive -LiteralPath examples.zip -DestinationPath .
Set-Location '.\ToolWiki-506c522ca86fd8c9d7b688f35a4d37f842d04cc9'
```

You are now at the repository root: the directory containing `README.md` and
`examples`. If you extracted the ZIP elsewhere, open that directory instead.

| Walkthrough | Working directory from the repository root |
| --- | --- |
| [Python linting and types](../python-checks/) | `Set-Location examples/python-checks` |
| [Disposable HTTP API](../api-testing/) | Stay at the repository root. |
| [Windows memory check](../windows-memory-check/) | `Set-Location examples/windows-memory` |

## Use Git instead

Clone into a new directory and select the same snapshot:

```powershell
git clone https://github.com/zwadhams/ToolWiki.git ToolWiki-examples
Set-Location ToolWiki-examples
git checkout --detach 506c522ca86fd8c9d7b688f35a4d37f842d04cc9
```

The [snapshot revision](https://github.com/zwadhams/ToolWiki/commit/506c522ca86fd8c9d7b688f35a4d37f842d04cc9)
keeps the examples stable while the wiki changes. Keep your reports outside a
fresh checkout or in the output directories named by the walkthrough.
