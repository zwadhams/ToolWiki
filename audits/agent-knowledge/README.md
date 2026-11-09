# Agent knowledge release validation

Acceptance evidence prepared November 9, 2026, on `codex/agent-knowledge`.
Release: [PR #2](https://github.com/zwadhams/ToolWiki/pull/2). Its merge state and
the [Publish Tool Wiki runs](https://github.com/zwadhams/ToolWiki/actions/workflows/deploy.yml)
are the authoritative release status. The deployment job verifies the public
export after publishing; a successful upload alone does not satisfy that gate.

## Six-step evidence map

| Planned step | Implementation and evidence |
| --- | --- |
| Shared format | `src/lib/knowledge-schema.mjs`, `knowledge-format.mjs`, and the published agent reference define IDs, URLs, revisions, citations and separate review/execution fields. Existing Markdown and tool metadata remain authoritative. |
| Static export | Astro's loaded content generates 134 documents, an index, Markdown/JSON records, and a snapshot. Source membership, 488 website anchors, 142 unchanged code blocks, and preserved prose/caveats are checked. Drafts, error pages and audit scratch files are excluded. |
| Local MCP | `mcp/knowledge.mjs` implements four read-only operations with the existing comparison and recommendation rules. `mcp/server.ts` uses official SDK 2.4.0 over stdio with a validated immutable snapshot. |
| Export/protocol validation | [Final verification](verification-final.txt), [Inspector discovery](inspector/discovery.json), [search](inspector/search.json), [resource](inspector/resource.json), and [native Codex smoke test](readers/smoke/final.txt). There are 106 unit tests and four real protocol/integration tests, plus site/export checks. |
| Fresh agent workflows | Independent Python and API readers reproduced faults/corrections and adapted separate targets. A memory reader prepared commands through MCP, native x64 CI ran them unchanged, and another reader interpreted actual outputs. Reports and transcripts are linked below. |
| Release/static access | [Local direct-static check](static-local-check.json) fetched all 271 files and matched build hashes. The Pages deployment repeats this check against public URLs using the manifest hash from its tested build. The local server can also load the published manifest. Hosting an MCP request handler remains deferred. |

Tested snapshot revision:
`3492d6a8c829b74b47514351643ba74e59df0cdd803138435101fbe90635a22d`.
Tested manifest SHA-256:
`96c7f592083dcc0763accfd0e2e14bc3099c6f29eac1a69b5f9e501bdada2c03`.

## Independent reader results

Fresh Codex CLI 0.167.0-alpha.3.2 sessions received only their task, connection,
scratch paths, and evidence requirements. They discovered knowledge with actual
MCP requests; reading local source documentation or static exports was excluded.
The native client negotiated MCP 2025-06-18 with the SDK's compatibility support.
MCP Inspector 2.14.0 and the SDK client were also exercised. The audit-only
recorder forwards bytes and retains requests/responses; the production server
does not write transcripts. Each reader records outside knowledge and recovery.

| Reader | Observed result | Evidence |
| --- | --- | --- |
| Python | Faulty fixture: Ruff F401 and mypy arg-type, both exit 1. Corrected fixture: both exit 0. Separate `parcel_cost/pricing.py` project reproduced both fault classes and passed after correction. | [Report](readers/python/reader-20261109-091356/report.md), [commands](readers/python/reader-20261109-091356/commands.json), [MCP transcript](readers/python/mcp.jsonl) |
| HTTP API | Reproduced zero-quantity HTTP 500 and its correction. Adapted to `/parcels`, port 8793 and `parcel-contract.json`. Stronger negative tests detected an additional HTTP 501 from unsupported methods; a separate target correction passed four positive and 25 negative generated cases. | [Report](readers/api/run-20261109-091329/report.txt), [hashes](readers/api/run-20261109-091329/sha256.json), [MCP transcript](readers/api/mcp.jsonl) |
| Windows memory | Independently prepared commands built and ran on native Windows Server 2022 x64. Faulty run: ASan heap-buffer-overflow, four-byte write at `bounds.c:5`, exit 1. Correction: exit 0 with no output. | [Reader script](readers/memory/reader-commands.ps1), [initial report](readers/memory/initial-report.txt), [new CI record](ci/42653327079/run.json), [independent interpretation](readers/memory-results/ci-42653327079-interpretation.txt) |

The memory run is [GitHub Actions 42653327079](https://github.com/zwadhams/ToolWiki/actions/runs/42653327079),
commit `86811380a887aaf117c6108ceed398e512180c4b`. The downloaded artifact digest
was verified before extraction. [Provenance](ci/42653327079/source.json) records
the archive, run-record and script hashes. After the interpreter noted that the
record lacked an executed-script hash, the coordinator compared the reviewed
script byte-for-byte with its blob at the exact checked-out CI commit. That
comparison closes the script-identity question without changing the historical
interpretation report. Fixture hashes also match the reader's fresh download.

## Findings and disposition

- The final response limit now includes both structured data and its compatible
  text representation. Unit and protocol checks were repeated, followed by the
  [fresh native interface retest](readers/protocol-retest/final.txt).
- A verifier callback initially returned an array length, which the Markdown
  visitor interpreted as a traversal instruction. The verifier was corrected;
  no exported command changed. Prose checks normalize only ordinary rendered
  whitespace, while code remains exact.
- The readers found no remaining ToolWiki workflow blocker. Their capture-script
  quoting/command-length errors were recovered and reported. The API's HTTP 501
  was a finding in the reader's disposable target, not a failure of the wiki or
  MCP interface; its correction and successful reruns are retained.
- The whole-repository example ZIP is intentionally versioned and shared with
  human readers. Agents extracted only the relevant examples. Chunked document
  retrieval is available when a client's display budget is smaller than a full
  response; text and structured representations support different MCP clients.

## Scope and retention

Python and API executions used Python 3.13.15 built for AMD64 on an ARM64 Windows
host. They do not validate native ARM64 analyzer binaries. Memory execution used
installed VS 2022/MSVC tools in native x64 CI; fresh Visual Studio installation
and ARM64 memory checking were not tested. Passing cases establish the stated
bounded scenarios, not general correctness, security or platform support. Other
MCP clients and remote MCP hosting are outside this release's validation.

Input files, commands, versions, outputs, exit codes, revisions and outside
knowledge are retained. Binary mypy caches, virtual environments, downloaded ZIPs,
and built executables/PDBs are not committed. Reader hash lists may name these
auxiliary scratch files; their hashes are retained as observations. The memory
diagnostic is fully symbolized in `run.json`. Non-ASCII output is represented
with explicit escapes, and audit bytes are protected from Git newline conversion.

Run `node scripts/check-agent-evidence.mjs` after `pnpm build` to verify native
MCP retrievals, fault/correction outcomes, input/script provenance, retained
hashes, and ASCII evidence. [Evidence validation output](evidence-validation.txt)
records that check. Run `node scripts/check-published-knowledge.mjs` to compare
the published export against the current local build. Existing audits remain
unchanged as historical records.
