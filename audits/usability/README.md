# Clarity and navigation review

Date: 2026-10-29.

## Scope

Implemented the five-step improvement plan: shared plain language, four pilot
profiles, task-based discovery, more useful comparisons and system suggestions,
and independent reader checks. The shared layout applies to all 89 tool entries.
The detailed pilot profiles are Ruff, CodeQL, AddressSanitizer, and RTAMT.

A separate frontend design review used
[Zach's personal site](https://zwadhams.github.io/) as the reference. The wiki
now uses its warm charcoal, cream, and amber palette, Inter body text, and
Departure Mono headings. Font files and licenses are bundled locally.

## Independent reader checks

Three fresh subagents received only a task prompt and the local site URL. They
used the rendered production preview without reading the source or the earlier
discussion. These are agent walkthroughs, not a study with human participants.

| Scenario | What the reader could explain | Findings incorporated |
| --- | --- | --- |
| Python coding mistakes and types | Chose Ruff plus mypy; explained complementary checks, inputs, example results, and the documentation-review date. | Preserve filters through comparison and profile browsing; identify tools in comparison links; add representative diagnostics and an adjacent mypy setup link. |
| Windows executable with memory errors, then source access | Identified Dr. Memory as a possible existing-binary route and ASan as a conditional rebuild route; explained why a clean execution has limited meaning. | Repair the malformed three-tool comparison link; add a Windows ASan command variant and annotated report outline; make compatibility setup links easier to find. |
| Python backend, client, and HTTP API | Found source and API candidates, distinguished RESTler from Schemathesis, verified description persistence and temporary comparison choices, and understood catalog omissions. | Include undescribed parts in match status; explain JSON export contents; link questions to their fields; move names earlier; add language search and nearby comparison actions. |

The system walkthrough preserved existing data at 127.0.0.1. It used a separate
localhost origin for a disposable two-component description. That description
produced 19 candidates, and reloading preserved the description while clearing
the temporary comparison selection.

## Verification

- Type checking, unit tests, production build, and generated-site checks are run
  through `pnpm verify`.
- The suite contains 49 passing tests, including regressions for returning to a
  filtered catalog and directing a connection question to its own host field.
- Generated-site validation covers 111 pages, local links and fragments, assets,
  search, all 89 catalog entries, and 80 reviewed matching workflows. It now also
  rejects comparison links that silently drop invalid tool IDs and checks links
  in authored comparison guidance.
- Browser checks covered the catalog-to-comparison-to-profile return path, the
  repaired three-tool memory comparison, global search, blank-component status,
  export help, language search, question focus, and nearby comparison links.
- Layouts were inspected at the default desktop viewport, 768 x 1024, and
  390 x 844. The mobile comparison table scrolls within its region; the checked
  pages did not introduce page-wide horizontal overflow. Dark and light themes
  were inspected, and temporary viewport/theme changes were restored.
- Final text changes are checked for non-ASCII characters and whitespace errors.

The restricted build initially failed while Pagefind wrote its search assets.
The same build succeeded with normal filesystem permissions. Astro continues
to emit the pre-existing duplicate-404-route warning while producing a valid
404 page; the site checks pass.

## Evidence limits

Tool examples distinguish illustrative output from captured output. Ruff, mypy,
ASan, and CodeQL example instructions were not executed as tool evaluations.
Relevant official instructions were checked while editing them.

The RTAMT reproduction attempt failed before evaluation: saved RTAMT 0.4.10
and antlr4-python3-runtime 4.7 packages could not import `typing.io` on
Windows/Python 3.13.15. The page retains the earlier reported output with that
limitation. No benchmark or new successful run is claimed.

Exact product-release compatibility remains linked to primary documentation.
The new preparation notes are not a certification of every OS, architecture,
compiler, or dependency combination.
