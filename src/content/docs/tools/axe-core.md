---
title: axe-core
description: Evaluate a rendered web page against automated accessibility rules and report affected elements.
executionEvidence:
  status: recorded
  scope: axe-core and @axe-core/playwright 4.14.0 through Playwright Test 1.65.0 and bundled headless Chromium 158.0.8127.18 on a Windows ARM64 host. Initial local page at 1000x720, using wcag2a, wcag2aa, wcag21a, and wcag21aa tags. The faulty input produced the label violation; the corrected page had no violations or incomplete results in that scan. No manual assessment or other state/browser/platform was executed.
  sources:
    - https://github.com/zwadhams/ToolWiki/blob/main/audits/browser-testing/record.json
tool:
  cardRequirement: Supply a rendered browser page and decide which states and accessibility rules to evaluate.
  decision:
    useWhen: Find automatically detectable accessibility issues in a specific rendered web-page state.
    result: Violations with rule IDs, affected nodes and guidance, plus passed, inapplicable and incomplete rule results.
    limit: Automated rules detect only part of accessibility. A scan with no violations does not establish WCAG conformance, usable keyboard behavior, or successful assistive-technology use.
  analysisWorkflows:
    - id: browser-accessibility
      label: Automated checks of a browser page state
      subject: component
      inputs: [Running applications]
      languageScope: independent
      languages: []
      findings: [Accessibility issues]
      technologies: [Browser UI]
      requires: [harness, testInstance]
      hostPlatforms: [Windows, Linux, macOS]
      caveat: The reviewed route runs axe-core through @axe-core/playwright in a browser-renderable UI. Specify rule tags and scanned states, inspect incomplete results, and combine automation with manual accessibility assessment. The retained run used only initial-page Chromium on Windows.
      sources:
        - https://playwright.dev/docs/accessibility-testing
        - https://playwright.dev/docs/browsers
        - https://github.com/dequelabs/axe-core/blob/v4.14.0/doc/API.md
  aliases: [axe, axe core]
  searchTerms: [accessibility testing, a11y, WCAG, missing form labels, color contrast, browser accessibility, axe playwright]
  modes: [Dynamic]
  inputTypes: [Running applications]
  techniques: [Automated accessibility testing]
  languages: [HTML]
  languageNote: Rules inspect the rendered HTML page and browser state. The backend implementation language is not restricted to HTML, and this profile does not describe static HTML source linting.
  targets: [Web applications, Rendered web pages, Browser user interfaces]
  findings: [Accessibility issues]
  findingNote: Violations apply to the rule set, page content, and state actually scanned. Incomplete results need review; unvisited states and checks that require people are outside the result.
  environment: A supported browser and JavaScript test harness. This route uses @axe-core/playwright with Playwright's browser installation; the adapter's supported Node.js version can be stricter than the core engine's.
  setup: Install the project's locked axe integration, render a test page, select its intended state and rule tags, run a scan, and retain the full results before asserting on violations.
  licenseCategory: Open source
  license: MPL-2.0 for axe-core and @axe-core/playwright; the test runner and browser components have separate licenses.
  cost: [Free]
  costNote: The open-source engine and Playwright integration require no hosted account. Commercial Deque products, manual assessment, and execution infrastructure are separate.
  website: https://github.com/dequelabs/axe-core
  verified: '2026-11-12'
  scope: axe-core 4.14.0 through @axe-core/playwright 4.14.0. The executed example covers selected WCAG-tagged rules on one initial page; it is not a conformance audit or a review of commercial axe products.
  sources:
    - label: Engine scope and supported environments
      url: https://github.com/dequelabs/axe-core
    - label: Playwright integration and automation limits
      url: https://playwright.dev/docs/accessibility-testing
    - label: Browser installation and support
      url: https://playwright.dev/docs/browsers
    - label: Rule selection and result categories
      url: https://github.com/dequelabs/axe-core/blob/v4.14.0/doc/API.md
    - label: Selected engine release
      url: https://github.com/dequelabs/axe-core/releases/tag/v4.14.0
    - label: Engine license
      url: https://github.com/dequelabs/axe-core/blob/v4.14.0/LICENSE
    - label: Playwright adapter package and license
      url: https://registry.npmjs.org/@axe-core%2Fplaywright/4.14.0
---

## First try

Use the [worked browser example](../../guides/browser-testing/) to compare a
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
correct. [Playwright](../playwright/) assertions check the selected workflow;
axe-core checks the selected accessibility rules. Neither result substitutes
for the other.
