---
title: Use ToolWiki with agents
description: Read published knowledge files directly or connect a local MCP server to your coding agent.
---

Agents can read the same tool profiles, workflows, concepts, and research notes
that appear on this website. Start with static files if your agent can fetch
URLs. Use the local Model Context Protocol (MCP) server when you want named
tools for searching, reading, comparing, and selecting checks.

## Read the static export

Open the [knowledge manifest](../../knowledge/v1/manifest.json) and
[document index](../../knowledge/v1/index.json). The index lists stable document
IDs, website URLs, revisions, section IDs, and paths to Markdown and JSON records.
For example, read the [Python guide as Markdown](../../knowledge/v1/documents/guides/python-checks.md).

Resolve every file path relative to the manifest URL. For a consistent collection,
fetch the snapshot named in `manifest.snapshot.path`, then check its byte count
and SHA-256 against the manifest. The server performs these checks automatically.
A deployment can replace the available snapshot; if a fetch fails during an
update, fetch the manifest again and retry. Keep the validated snapshot for your
whole task. Individual index and document files can change between requests.

Revisions identify content, not dates. Tool review dates describe documentation
review. Recorded execution evidence names the tested environment and its limits;
`not-recorded` means that no structured execution record is supplied for that
document. It does not establish that an example fails or has never been run.

## Run the local MCP prototype

You need Git, Node.js 24, and pnpm 11.19.0. No service account or API key is needed
by this server. It reads knowledge and returns instructions; your agent's normal
tools execute commands only when your task calls for them.

1. Clone the repository and build its knowledge snapshot:

   ```powershell
   git clone https://github.com/zwadhams/ToolWiki.git
   Set-Location ToolWiki
   pnpm install --frozen-lockfile
   pnpm build
   ```

2. Test the protocol from the repository root:

   ```powershell
   pnpm test:mcp
   ```

   Expect passing tests for discovery, tool calls, resources, errors, and clean
   shutdown. A build must exist before these tests run.

3. Register the server in your MCP client. For Codex, add this to your trusted
   project's `.codex/config.toml`, replacing the path with your clone's absolute
   path. Use forward slashes in Windows TOML strings:

   ```toml
   [mcp_servers.toolwiki]
   command = "node"
   args = ["--experimental-strip-types", "C:/path/to/ToolWiki/mcp/server.ts"]
   startup_timeout_sec = 30
   tool_timeout_sec = 30
   ```

   Start a fresh Codex session in that project. This configuration follows the
   [official Codex MCP instructions](https://learn.chatgpt.com/docs/extend/mcp?surface=cli).
   A client starts the server and communicates over standard input and output.
   Running `pnpm mcp` alone waits for that protocol; it does not open a web page.

4. Ask the agent to discover and follow a workflow:

   ```text
   Use ToolWiki MCP to find checks for Python lint and type errors. Read the
   prerequisites and evidence scope, then reproduce the faulty and corrected
   example in a scratch directory. Cite the document and snapshot revisions.
   ```

The default server reads the clone's `dist/knowledge/v1/manifest.json`, regardless
of the client's working directory. To use published knowledge instead, append
`"--manifest", "https://zwadhams.github.io/ToolWiki/knowledge/v1/manifest.json"`
to the `args` array. This still runs the MCP program locally; GitHub Pages hosts
the data. The server loads once at startup. Restart it after rebuilding or when
you want the latest published snapshot.

## Available operations

| Tool | Use |
| --- | --- |
| `search_knowledge` | Find document IDs with text, kind, and tool metadata filters. |
| `get_document` | Read a document or section, its sources, and evidence scope. |
| `compare_tools` | Compare two to four tool profiles using website metadata. |
| `recommend_checks` | Evaluate a saved system-builder profile, including missing information and unmet requirements. |

The `toolwiki://snapshot` resource lists the pinned revision and document inventory.
See the [format and tool reference](../agents-reference/) for inputs, limits,
pagination, and a complete recommendation example.

## Troubleshoot startup and results

- **Missing manifest:** run `pnpm build` in the clone, or check the explicit
  `--manifest` path. The server reports startup errors on standard error.
- **Integrity or fetch error:** rebuild local files, or retry a remote startup
  after deployment. The server rejects mixed or altered snapshots.
- **No tools appear:** check the Node executable, absolute script path, project
  trust, and your client's MCP startup log. Start a fresh client session.
- **No search results:** remove tool metadata filters when looking for a guide;
  those filters match tool profiles only. Try a shorter query.
- **Partial document:** continue `get_document` with `nextOffset` until it is
  `null`, retaining the same ID and section. Reassemble chunks before copying
  commands because a chunk can end inside a code block.

The initial supported connection is local stdio. Remote MCP hosting and hosted
authentication are deferred. A local server cannot make an untested platform
supported; follow each workflow's stated environment limits.
