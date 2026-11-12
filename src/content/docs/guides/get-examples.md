---
title: Get the examples
description: Download the tested example files and open the right working directory.
---

Use this snapshot for the walkthroughs below. It contains the example files;
each walkthrough explains which tools to install.

## Download the snapshot

[Download the example snapshot (ZIP)](https://github.com/zwadhams/ToolWiki/archive/1a1cabbdf6dca8ca55aa289020ba98777aabc6f1.zip)
and extract it, or run these commands in PowerShell from an empty working
directory:

```powershell
Invoke-WebRequest 'https://github.com/zwadhams/ToolWiki/archive/1a1cabbdf6dca8ca55aa289020ba98777aabc6f1.zip' -OutFile examples.zip
Expand-Archive -LiteralPath examples.zip -DestinationPath .
Set-Location '.\ToolWiki-1a1cabbdf6dca8ca55aa289020ba98777aabc6f1'
```

You are now at the repository root: the directory containing `README.md` and
`examples`. If you extracted the ZIP elsewhere, open that directory instead.

| Walkthrough | Working directory from the repository root |
| --- | --- |
| [Python linting and types](../python-checks/) | `Set-Location examples/python-checks` |
| [Disposable HTTP API](../api-testing/) | Stay at the repository root. |
| [Windows memory check](../windows-memory-check/) | `Set-Location examples/windows-memory` |
| [Browser behavior and accessibility](../browser-testing/) | `Set-Location examples/browser-testing` |
| [API descriptions and contracts](../api-contracts/) | `Set-Location examples/api-contracts` |
| [Software inventories](../sbom-inventory/) | `Set-Location examples/sbom-inventory` |
| [Finite model checking](../model-checking/) | `Set-Location examples/tlc` |
| [Coverage and mutation](../test-evidence/) | Follow the selected recipe under `examples/python-coverage` or `examples/test-quality`. |

## Use Git instead

Clone into a new directory and select the same snapshot:

```powershell
git clone https://github.com/zwadhams/ToolWiki.git ToolWiki-examples
Set-Location ToolWiki-examples
git checkout --detach 1a1cabbdf6dca8ca55aa289020ba98777aabc6f1
```

The [snapshot revision](https://github.com/zwadhams/ToolWiki/commit/1a1cabbdf6dca8ca55aa289020ba98777aabc6f1)
keeps the examples stable while the wiki changes. Keep your reports outside a
fresh checkout or in the output directories named by the walkthrough.
