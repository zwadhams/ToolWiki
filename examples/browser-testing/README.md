# Browser behavior and accessibility example

This disposable page has two independent faults: its search checks names but
not capabilities, and its search input has no accessible name. The corrected
page searches the visible text and adds an explicit label. The same Playwright
and axe-core tests run against both versions.

From this directory, with Node.js 24 and pnpm 11.25.0:

```sh
pnpm install --ignore-workspace --frozen-lockfile
pnpm run install:browser
pnpm test:bad
pnpm test:good
pnpm verify
```

`test:bad` should exit 1 with two specific failures. `test:good` should exit 0
with two passes. `verify` runs both and rejects infrastructure failures or an
unexpected test outcome. It writes `.results/verification.json` with versions,
input hashes and results. Full JSON reports and axe attachments remain in
`.results/{bad,good}/report.json`; failure screenshots are in each variant's
`artifacts/` directory. Running a variant again replaces its generated results.

The fixture uses only `http://127.0.0.1:8837/`, and the runner manages its server.
An occupied port is an error; an unrelated server is never reused. The tests
inspect external link destinations without visiting them. No account, remote
target, credentials, or permanent service is required.

The browser installer writes the matching Chromium build under `.browsers/`.
On Linux, install the [documented system dependencies](https://playwright.dev/docs/browsers#install-system-dependencies)
if your host lacks them. Use a normal local terminal when a restricted process
environment prevents the test runner from cleaning up its child processes.

The recorded run used a Windows ARM64 host (kernel build 10.0.26300), Node.js 24.22.1,
Playwright Test 1.65.0, axe-core/adapter 4.14.0, and bundled win64 headless
Chromium 158.0.8127.18. The test viewport is 1000x720. Only the initial page is
scanned by axe, with `wcag2a`, `wcag2aa`, `wcag21a`, and `wcag21aa` tags.
Other browsers, platforms, states, and manual accessibility were not tested.

See the [worked guide](../../src/content/docs/guides/browser-testing.md) and
[retained evidence](../../audits/browser-testing/README.md). A passing example
does not establish accessibility conformance or complete application coverage.
