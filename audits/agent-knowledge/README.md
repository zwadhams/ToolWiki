# Agent knowledge release validation

Implementation branch: `codex/agent-knowledge`.

This release follows the six-step plan: shared knowledge format, static build
export, local MCP interface, export and protocol verification, three independent
agent workflows, then a merged release and published static-access checks.

Validation is in progress. Completion requires fresh Python, API and native
Windows x64 memory workflow evidence through actual MCP requests, all repository
checks, a merged GitHub PR, and retrieval of the deployed snapshot.

The server uses the pinned official MCP SDK 2.4.0 and stdio. The audit recorder
passes protocol bytes through unchanged and retains requests/responses separately
from the production server. Fresh reader sessions receive tasks and a connection,
not prior findings or implementation guidance. Python and API tasks also require
adaptation to separate synthetic targets. The memory reader prepares commands
for native Windows x64 CI and interprets their new outputs.

Evidence, findings and final release references will be retained here. Existing
audits are preserved as historical records.
