# MCP guidance update and comparison retest

Reader sessions recorded November 9, 2026. The historical checker was reconciled
with the retained snapshot archive on November 12, 2026.

## Changes

- MCP initialization now tells agents to preserve existing project rules,
  targets, exclusions and tool versions, label defaults and overrides, and cite
  document URLs plus the exact returned snapshot revision. Both main rules fit
  within the first 512 characters. The instructions explain Ruff's `--select`
  override specifically.
- Every tool description repeats the short configuration and citation guidance,
  including for clients that expose tool descriptions without server instructions.
- The agent reference documents the behavior. The local snapshot was rebuilt.
- The protocol check verifies delivery through actual MCP initialization and
  discovery. The historical evidence checker validates recorded snapshot IDs,
  document revisions, complete guide text, and pagination against the original
  retained snapshot. Archive checksums and document counts are also verified.
  Current exports and protocol behavior are checked separately by `pnpm verify`.
  Later export additions therefore do not invalidate the historical sessions.

## Fresh reader results

Two fresh Codex sessions used the actual stdio MCP connection, with no inherited
conversation or prior critique. Their prompts did not mention the desired
configuration or citation changes. Server instructions, requests, responses,
commands and final answers are retained in their respective reader directories.

| Case | Result |
| --- | --- |
| Original comparison prompt, empty workspace | Five successful MCP calls. The answer made new-project defaults conditional, warned that `--select` overrides configured rules, advised reusing existing settings, and cited the exact snapshot. |
| Existing synthetic Python project | Four successful MCP calls after recovering from one short-ID lookup error. The answer read and retained Python 3.12, Ruff 0.14.3, mypy 1.18.2, the selected E4/E7/E9/F/B/I/UP rules, F401 ignore, strict mypy with unreachable warnings, and generated-code exclusions. All project file hashes remained unchanged. |

The second reader first tried `ruff` and `mypy` as IDs. The server returned its
normal unknown-ID error with search guidance; the reader searched and retried
successfully with `tools/ruff` and `tools/mypy`. This recovery is retained in the
validation record rather than counted as a successful call.

The existing-project reader recommended:

```powershell
python -m ruff check src
python -m mypy --config-file pyproject.toml src
```

It specified the project's pinned tools in a Python 3.12 environment. The readers
only compared tools and recommended commands; they did not execute analyzers.

## Evidence

- [Original-prompt answer](../readers/comparison-guidance-generic/final.txt)
- [Existing-project answer](../readers/comparison-guidance-existing/final.txt)
- [Existing configuration](../readers/comparison-guidance-existing/inputs/pyproject.toml)
- [Input hashes before the test](../readers/comparison-guidance-existing/inputs-before.json)
- [Validation results](validation.json)
- [November 12 integration validation](integration-validation-2026-11-12.json):
  137 current tests, four MCP checks, and 190 retained-file hash checks passed.
  The original server-file digest, received instructions, successful call counts,
  cited snapshot, prompts, and three retained project inputs were rechecked.
  No new agent sessions or analyzer runs were performed for this integration.
- [Original verification output](verification.txt): the November 9 checks passed
  with 110 tests. This is a historical result, not a count of the current suite.

Both answers cite snapshot
`42dd95ef4d15f352944311bc871106279330b0204eaabfa5899c9013abe43656`.
The transcript snapshot remains historical. Restart an existing ToolWiki MCP
connection to load updated server instructions and the selected current snapshot.
