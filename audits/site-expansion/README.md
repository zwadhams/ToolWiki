# Task navigation, history, evidence, and tool expansion

Completed November 12, 2026. This work keeps deployment static and adds:

- A task directory and nine comparisons rendered as HTML and exported Markdown.
  Comparison requirements and evidence come from the current tool profiles.
- A readable change history, JSON and Markdown feeds, and selected immutable
  snapshot files with byte counts and SHA-256 checksums.
- Six new profiles with local execution evidence: Playwright, axe-core,
  Spectral, Pact, Syft, and TLC. heaptrack and PIT have illustrative examples.
- Structured execution metadata for thirteen existing profiles, drawn from
  retained evidence without rerunning those analyzers or rewriting old records.
- A review of twelve original catalog-only profiles: four narrow matching
  workflows added and eight specific exclusions documented. The resulting
  catalog has 106 tools, with reviewed system-builder workflows for 96.
- A URL-only reader audit, including static comparisons, citation revisions,
  snapshot integrity, and change-feed interpretation.

## Verification

[The validation record](record.json) identifies the exact committed source and
release snapshot. [Full verification output](verification.txt) records 134 unit
tests, four MCP tests, 161 built pages, 159 exported documents, 912 matching
website anchors, and 166 unchanged fenced code blocks. All checks passed.
Non-ASCII console glyphs are represented by explicit Unicode escapes in that
transcript; the delivered text files are ASCII.

The committed source was extracted to an isolated directory and checked using
the repository's existing dependency installation. The commands match
`pnpm verify`: Astro check, the complete unit suite, Astro build, generated-site
and knowledge checks, and the MCP suite. Direct Node entry points avoided pnpm's
automatic installation attempt for the isolated directory. No package versions,
project rules, or targets were changed. The original working-tree verification
also passed before this isolated check.

[Browser results](browser.json) cover task navigation, a static Ruff/mypy
comparison, and change history at widths 390 and 1440 with JavaScript disabled.
Each page returned 200, had one title, and had no document-wide horizontal
overflow. The table remains horizontally scrollable on narrow screens. An
interactive pass verified the comparison's selectable Markdown fallback when
clipboard access was unavailable. These checks are not a full accessibility audit.

The [initial HTTP reader report](../direct-access/report.md) records an earlier
integration snapshot. The [final reader report](../direct-access/final/report.md)
checks the committed release and retained archive using only discovered HTTP
links, without repository-source or MCP knowledge access. Earlier artifacts
remain as evidence for their explicitly named revisions.

## Provenance and limits

- [Browser fixtures and source review](../browser-testing/README.md)
- [TLC execution and formal-tool review](../formal-tools/README.md)
- [API contracts and software inventories](../api-supply-tools/README.md)
- [Existing execution metadata reconciliation](../execution-evidence/README.md)
- [System-builder workflow review](../workflow-coverage/README.md)

The archive retains a published baseline captured on November 12 and the
verified committed release. It does not reconstruct every past deployment.
Hash changes include formatting and export changes and do not imply tool
releases or new documentation reviews. Synthetic unit checks cover removal
semantics; no real document removal occurred in this release.

The four pre-existing modified source files remain byte-identical to the
starting baseline. They were excluded from these commits and the isolated
release build. Existing untracked guidance audits were also left alone. The
changes are committed locally; this audit does not establish publication.
