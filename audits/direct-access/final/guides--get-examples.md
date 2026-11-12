# Get the examples

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

| Walkthrough                                                                                       | Working directory from the repository root                                              |
| ------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| [Python linting and types](https://zwadhams.github.io/ToolWiki/guides/python-checks/)             | `Set-Location examples/python-checks`                                                   |
| [Disposable HTTP API](https://zwadhams.github.io/ToolWiki/guides/api-testing/)                    | Stay at the repository root.                                                            |
| [Windows memory check](https://zwadhams.github.io/ToolWiki/guides/windows-memory-check/)          | `Set-Location examples/windows-memory`                                                  |
| [Browser behavior and accessibility](https://zwadhams.github.io/ToolWiki/guides/browser-testing/) | `Set-Location examples/browser-testing`                                                 |
| [API descriptions and contracts](https://zwadhams.github.io/ToolWiki/guides/api-contracts/)       | `Set-Location examples/api-contracts`                                                   |
| [Software inventories](https://zwadhams.github.io/ToolWiki/guides/sbom-inventory/)                | `Set-Location examples/sbom-inventory`                                                  |
| [Finite model checking](https://zwadhams.github.io/ToolWiki/guides/model-checking/)               | `Set-Location examples/tlc`                                                             |
| [Coverage and mutation](https://zwadhams.github.io/ToolWiki/guides/test-evidence/)                | Follow the selected recipe under `examples/python-coverage` or `examples/test-quality`. |

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

Source: [ToolWiki page](https://zwadhams.github.io/ToolWiki/guides/get-examples/). [JSON record and content revision](https://zwadhams.github.io/ToolWiki/knowledge/v1/documents/guides/get-examples.json).

- **Documentation reviewed:** Not recorded
- **Execution evidence:** not-recorded
- **Execution scope:** No structured execution record for this document. Read the text for illustrative examples and limitations.

Documentation review is separate from execution evidence. A recorded execution applies only to its stated environment and scope; not-recorded means no structured execution record is supplied.
