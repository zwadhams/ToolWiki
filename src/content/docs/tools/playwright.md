---
title: Playwright Test
description: Exercise browser-visible workflows and check their results with authored assertions.
executionEvidence:
  status: recorded
  scope: Playwright Test 1.65.0 with bundled headless Chromium 158.0.8127.18 on a Windows ARM64 host, Node.js 24.22.1, and one 1000x720 viewport. A local capability-search fault failed its assertion; the corrected page passed. Firefox, WebKit, Linux, macOS, and mobile behavior were not executed.
  sources:
    - https://github.com/zwadhams/ToolWiki/blob/main/audits/browser-testing/record.json
tool:
  cardRequirement: Supply a browser-renderable test application and assertions for the workflows you want to check.
  decision:
    useWhen: Check a web application's visible behavior after actions such as typing, navigation, and form submission.
    result: Passed or failed assertions with locations and diagnostics; configured screenshots or traces can help reproduce failures.
    limit: Tests cover the scenarios, assertions, browsers, and states you select. A passing suite does not establish complete correctness or accessibility.
  analysisWorkflows:
    - id: browser-assertions
      label: Authored browser workflow checks
      subject: component
      inputs: [Running applications]
      languageScope: independent
      languages: []
      findings: [Specification violations]
      technologies: [Browser UI]
      requires: [harness, testInstance]
      hostPlatforms: [Windows, Linux, macOS]
      caveat: Requires a browser-renderable UI, supported browser installation, test data, and explicit assertions. Backend language does not establish browser compatibility. The retained example exercised only bundled Chromium on Windows at one viewport.
      sources:
        - https://playwright.dev/docs/intro
        - https://playwright.dev/docs/browsers
        - https://playwright.dev/docs/test-assertions
        - https://playwright.dev/docs/locators
  aliases: [Playwright, Playwright Test]
  searchTerms: [browser testing, end to end testing, web UI regression, browser automation, JavaScript tests, TypeScript tests, Chromium, Firefox, WebKit]
  modes: [Dynamic]
  inputTypes: [Running applications]
  techniques: [Browser testing]
  languages: [Language independent]
  languageNote: This entry uses the JavaScript/TypeScript Playwright Test runner to exercise a browser UI. The application's backend can use another language; this is not source-code analysis or a claim that other language bindings have identical APIs.
  targets: [Web applications, Browser user interfaces]
  findings: [Specification violations]
  findingNote: Failed assertions identify disagreement with the expected behavior encoded in a test. Missing assertions or unexplored states can leave faults undetected.
  environment: Node.js and a supported browser distribution on documented Windows, Linux, or macOS versions. Each Playwright release expects particular browser binaries; Linux can also need system browser dependencies.
  setup: Install the project's locked Playwright Test dependency and matching browsers. Prepare a reachable test UI, isolated test state, locators, actions, and assertions. Preserve existing project configuration and browser projects.
  licenseCategory: Open source
  license: Apache-2.0 for Playwright; browser distributions and other bundled components have their own notices.
  cost: [Free]
  costNote: The open-source local test runner requires no hosted service. CI compute, test infrastructure, and optional hosted products have separate costs.
  website: https://playwright.dev/
  verified: '2026-11-12'
  scope: Playwright Test 1.65.0 for authored browser workflows. The worked example uses headless Chromium; API-request testing, mobile-device testing, and other language bindings are outside its executed scope.
  sources:
    - label: Installation and supported hosts
      url: https://playwright.dev/docs/intro
    - label: Browser installation and version coupling
      url: https://playwright.dev/docs/browsers
    - label: Assertions and retry behavior
      url: https://playwright.dev/docs/test-assertions
    - label: Locators and accessible attributes
      url: https://playwright.dev/docs/locators
    - label: Test configuration
      url: https://playwright.dev/docs/test-configuration
    - label: Trace viewer
      url: https://playwright.dev/docs/trace-viewer
    - label: Selected release
      url: https://github.com/microsoft/playwright/releases/tag/v1.65.0
    - label: Playwright license
      url: https://github.com/microsoft/playwright/blob/v1.65.0/LICENSE
---

## First try

Follow the [browser-testing guide](../../guides/browser-testing/) and the
[isolated example](https://github.com/zwadhams/ToolWiki/tree/main/examples/browser-testing).
It searches a small local catalog for a capability and verifies the remaining
result and link. An intentional implementation that searches names only fails
that assertion. The corrected implementation searches the displayed capability
text as well.

From the example directory, after installing its locked dependencies and browser:

```sh
pnpm test:bad
pnpm test:good
```

The first command should exit 1; the second should exit 0. Both commands also run
the separate [axe-core](../axe-core/) check. `pnpm verify` checks that the faulty
case failed for the intended reasons and that both corrected tests passed. It
does not accept a missing browser, occupied fixture port, or runner error as a
successful reproduction.

**Executed on Windows with the versions in the evidence record.** The browser
assertion found zero results for `memory` where one was expected on the faulty
page. The corrected page retained the AddressSanitizer result and its link.
The [run record](https://github.com/zwadhams/ToolWiki/blob/main/audits/browser-testing/record.json)
contains input hashes, process statuses, browser versions, and diagnostics.

## Adapt a test to your project

Start with the repository's existing test configuration, browser projects, and
test-data reset strategy. Prefer locators based on roles or labels when those
match the user-facing contract. The fixture uses a test ID to reach its
intentionally unlabeled input; that choice does not repair accessibility.

Write an assertion for the result that matters. Successfully clicking a button
or loading a page alone does not establish that the workflow produced the right
outcome. Web assertions can retry while the page settles, but retries do not
turn a wrong expectation into a correct one.

Retain the configured browser/version, viewport, application revision, test
inputs, assertions, and any failure artifacts. Run additional browser projects
and states when they are part of your application's supported contract.

## Related checks

[axe-core](../axe-core/) evaluates selected accessibility rules in a page state;
Playwright supplies the browser actions and the test assertions around it.
[Schemathesis](../schemathesis/) exercises an HTTP API from its schema, while
[k6](../k6/) measures a defined workload against thresholds. These checks cover
different parts of a web application's behavior.
