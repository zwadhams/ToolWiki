# axe-core

## First try

Use the [worked browser example](https://zwadhams.github.io/ToolWiki/guides/browser-testing/) to compare a
page whose search input has no accessible name with a corrected page containing
an explicit label. The fixture pins axe-core through its dependency lockfile and
scans the initial page with `wcag2a`, `wcag2aa`, `wcag21a`, and `wcag21aa` tags.

After the example setup, run from its directory:

```sh
pnpm test:bad
pnpm test:good
```

**Executed on the recorded Windows host.** The faulty scan reported rule `label`
against `#tool-query`; the corrected scan reported no violations. Neither scan
had incomplete results. The
[execution record](https://github.com/zwadhams/ToolWiki/blob/main/audits/browser-testing/record.json)
retains engine/browser versions, viewport, rule-result IDs, and input hashes.

## Interpret the result categories

Inspect each violation's rule ID, affected nodes, help URL, and failure summary.
Fix the cause and repeat the same scan so a changed rule set or omitted element
does not explain the disappearance. Keep `incomplete` results visible for human
review. Passed rules describe evaluated conditions; inapplicable rules did not
find relevant content in that scan.

The absence of violations is scoped to the selected rules and page state.
Open dialogs, expand menus, exercise validation errors, and scan other relevant
states explicitly. Add keyboard, screen-reader, zoom, and usability assessment
appropriate to the application. Automated testing alone cannot establish full
accessibility or conformance.

## Keep accessibility and behavior checks separate

The example's capability-search bug can exist even when the input has a correct
label. Its missing label can exist even when search results are functionally
correct. [Playwright](https://zwadhams.github.io/ToolWiki/tools/playwright/) assertions check the selected workflow;
axe-core checks the selected accessibility rules. Neither result substitutes
for the other.

- **Summary:** Evaluate a rendered web page against automated accessibility rules and report affected elements.
- **Use it for:** Find automatically detectable accessibility issues in a specific rendered web-page state.
- **What you need:** Install the project's locked axe integration, render a test page, select its intended state and rule tags, run a scan, and retain the full results before asserting on violations.
- **What you get:** Violations with rule IDs, affected nodes and guidance, plus passed, inapplicable and incomplete rule results.
- **Checks and limits:** Automated rules detect only part of accessibility. A scan with no violations does not establish WCAG conformance, usable keyboard behavior, or successful assistive-technology use.
- **Finding scope:** Violations apply to the rule set, page content, and state actually scanned. Incomplete results need review; unvisited states and checks that require people are outside the result.

## Compatibility and scope

- **Also known as:** axe, axe core
- **Analysis mode:** Dynamic
- **What it examines:** Running applications
- **Context:** Web applications, Rendered web pages, Browser user interfaces
- **Techniques:** Automated accessibility testing
- **Finding categories:** Accessibility issues
- **Where it runs:** A supported browser and JavaScript test harness. This route uses @axe-core/playwright with Playwright's browser installation; the adapter's supported Node.js version can be stricter than the core engine's.
- **Languages / ecosystem:** HTML
- **Language support:** Rules inspect the rendered HTML page and browser state. The backend implementation language is not restricted to HTML, and this profile does not describe static HTML source linting.
- **Edition and scope:** axe-core 4.14.0 through @axe-core/playwright 4.14.0. The executed example covers selected WCAG-tagged rules on one initial page; it is not a conformance audit or a review of commercial axe products.

## Cost and editions

- **Cost:** Free
- **Cost conditions:** The open-source engine and Playwright integration require no hosted account. Commercial Deque products, manual assessment, and execution infrastructure are separate.
- **License category:** Open source
- **License:** MPL-2.0 for axe-core and @axe-core/playwright; the test runner and browser components have separate licenses.

Cost information checked 2026-11-12. Runtimes, hosting, and compute may cost extra. Free trials are not counted as free editions.

## Sources and evidence

[Official website](https://github.com/dequelabs/axe-core)

- [Engine scope and supported environments](https://github.com/dequelabs/axe-core)
- [Playwright integration and automation limits](https://playwright.dev/docs/accessibility-testing)
- [Browser installation and support](https://playwright.dev/docs/browsers)
- [Rule selection and result categories](https://github.com/dequelabs/axe-core/blob/v4.14.0/doc/API.md)
- [Selected engine release](https://github.com/dequelabs/axe-core/releases/tag/v4.14.0)
- [Engine license](https://github.com/dequelabs/axe-core/blob/v4.14.0/LICENSE)
- [Playwright adapter package and license](https://registry.npmjs.org/@axe-core%2Fplaywright/4.14.0)

Source: [ToolWiki page](https://zwadhams.github.io/ToolWiki/tools/axe-core/). [JSON record and content revision](https://zwadhams.github.io/ToolWiki/knowledge/v1/documents/tools/axe-core.json).

- **Documentation reviewed:** 2026-11-12
- **Execution evidence:** recorded
- **Execution scope:** axe-core and @axe-core/playwright 4.14.0 through Playwright Test 1.65.0 and bundled headless Chromium 158.0.8127.18 on a Windows ARM64 host. Initial local page at 1000x720, using wcag2a, wcag2aa, wcag21a, and wcag21aa tags. The faulty input produced the label violation; the corrected page had no violations or incomplete results in that scan. No manual assessment or other state/browser/platform was executed.
- [Execution record](https://github.com/zwadhams/ToolWiki/blob/main/audits/browser-testing/record.json)

Documentation review is separate from execution evidence. A recorded execution applies only to its stated environment and scope; not-recorded means no structured execution record is supplied.
