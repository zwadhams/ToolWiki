# First implementation batch

Implemented November 6, 2026, from the seven-item batch in the
[improvement roadmap](../improvement-review/README.md#first-implementation-batch).
Three implementation subagents handled storage, navigation, and authoring; a
fourth subagent independently reviewed the changes. The coordinator handled
edition rendering, the Jazzer example, integration, and acceptance checks.

## Implemented behavior

| Roadmap item | Result |
| --- | --- |
| MAT-01 | Saves, ordinary exports, and normalized imports enforce the inclusive 1 MiB UTF-8 limit. Failed writes preserve the previous save. Unreadable saved data stays protected during edits, imports, and undo until explicit replacement succeeds. Recovery download and storage-read retry are available. |
| ARC-01, CMP-01 | Catalog category, filters, and known comparison IDs survive profile, comparison, related-note, guide, and cost-link navigation. A comparison page's current choices remain authoritative. |
| A11Y-01 | Removing the final selection focuses the catalog result count or builder comparison status. Keyboard navigation continues near the results. |
| SEA-02 | Test an API uses the HTTP query and Running applications input filter, including ZAP and Burp Professional. |
| ARC-02 | Edition notes and contextual sources render independently, including Polyspace's source-only citation. |
| REX-06 | The Jazzer PowerShell example restores the previous presence and value of JAZZER_FUZZ in finally, including exceptional exits. |
| MNT-01, MNT-02 | The project-owned tool schema rejects unknown keys. Published source profiles are reconciled with loader-resolved catalog identities before missing metadata can silently omit entries. |

Version 1 system files, the existing storage key, two-space JSON, the three-tool
comparison limit, and supported Starlight frontmatter remain compatible. Drafts,
ordinary documentation pages, and catalog profiles without workflows retain
their intended behavior. Authoring guards also cover cached metadata, duplicate
IDs, Windows case-only renames, slug changes, and cached MDX registration.
The checked loader revalidates unchanged entries, adding some content-loading
work in exchange for validating raw metadata and source ownership.

## Automated verification

The final `pnpm verify` passed:

- Astro diagnostics: 34 files, zero errors, warnings, or hints.
- Node tests: 80 passed, zero failed.
- Production build and Pagefind index: 111 pages.
- Generated-site checks: local links, fragments, assets, search, all 89 source
  profiles and catalog identities, and builder membership for 80 reviewed tools.
- The generated API destination and all four edition note/source combinations.

The build retains the existing duplicate `/404` route warning; the generated
404 page and site checks pass. See the [final verification output](verification.txt).
The [initial verification output](verification-initial.txt) predates five added
authoring regressions. Console glyphs are replaced with ASCII question marks;
trailing horizontal whitespace is removed without changing substantive output.

Nine harmless PowerShell 7.6.9 stub scenarios passed for the Jazzer wrapper:
absent, populated, and empty prior settings, each with success, nonzero status,
and an exception. Maven and Jazzer were not executed.

Independent review found two loader edge cases during implementation. Case-only
renames and rejected identical development duplicates now pass independent
reproductions; the full suite includes their regression checks.

## Browser acceptance

The production preview used the isolated `http://127.0.0.1:4333` origin and
synthetic descriptions from [the fixture generator](prepare-browser-fixtures.mjs).
The local Import system control reads these files in the browser.

Observed checks covered:

- Static and Dynamic category return paths, comparison edits, selections absent
  from the current results, related comparisons, guides, and cost anchors.
- Catalog and builder focus after removing the final selection, followed by Tab.
- The API shortcut's rendered results and Polyspace's edition citation.
- Normal edit/save/reload and rejection of a 996,723-byte compact import whose
  normalized representation exceeds the cap, preserving the current description.
- Recovery protection for malformed data during edits, valid import, and undo.
  Its stored byte count and SHA-256 digest stayed unchanged. Explicit replacement
  subsequently saved the current description and resumed automatic saving.
- A 1,048,476-byte valid description grew beyond the cap through a name edit.
  Save and export were rejected while the previous saved digest stayed unchanged.
  Reducing the name produced exactly 1,048,576 bytes and saved successfully.
- A 1,203,365-byte stored description opened the recovery interface instead of
  being overwritten by the blank fallback.

The recovery download button reached its completion message without clearing
protection. Browser download-file capture stalled, so downloaded bytes were not
independently inspected. Confirmation cancellation was not verified. Storage
read/write failures and rejected replacement preservation were tested through
the storage unit tests, not by forcing browser permissions or quota failures.

These checks do not establish screen-reader behavior, full accessibility
conformance, or analyzer runtime correctness. Temporary generated fixtures are
removed from `dist` after acceptance; the generator is retained for reproduction.
No commit or publication was performed.
