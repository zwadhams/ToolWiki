---
title: Burp Suite Professional
description: Investigate web applications manually and use Burp Scanner for automated vulnerability checks.
tool:
  modes: [Dynamic]
  inputTypes: [Running applications]
  techniques: [DAST, Active scanning, Passive scanning]
  languages: [Language independent]
  languageNote: Tests web interfaces rather than source languages. Reachable routes, sessions, API definitions, and scanner configuration determine coverage.
  targets: [Web applications, HTTP APIs]
  licenseCategory: Proprietary
  cost: [Paid]
  costNote: Professional requires a paid license beyond any trial. Community Edition is permanently free, but does not include the automated Burp Scanner.
  editionGroup: burp
  license: Commercial proprietary license
  website: https://portswigger.net/burp/pro
  verified: '2026-09-22'
  scope: Professional edition with Burp Scanner; do not assume these features are present in Community Edition.
  findings: ["Injection risks","Security misconfiguration"]
  findingNote: "Automated and manual web testing; reachable endpoints, authentication, and enabled checks determine coverage."
  environment: "Windows, Linux, and macOS; browser support and CPU requirements depend on the installer."
  setup: "A reachable web application and discovery or API input; configure scope and authentication. No application source build is required."
  sources:
    - label: Desktop system requirements
      url: https://portswigger.net/burp/documentation/desktop/getting-started/system-requirements
    - label: Community and Professional feature comparison
      url: https://portswigger.net/burp/communitydownload
    - label: Burp Scanner documentation
      url: https://portswigger.net/burp/documentation/scanner
    - label: Burp Suite Professional
      url: https://portswigger.net/burp/pro
---

## What it does

Burp Scanner discovers application content and audits its behavior for potential vulnerabilities. Professional combines automated scanning with tools for hands-on web testing.

## When it is useful

Consider it for investigations that alternate between manual exploration and automated checks. Authenticated scanning can exercise functionality behind a login when its session configuration works correctly.

## What to keep in mind

This entry covers Professional; [Community Edition](../burp-suite-community/) has separate manual-testing capabilities. Scan results depend on discovery and configuration; complex authorization and business workflows still need deliberate test cases. Active testing should run against an authorized target with suitable test data.

## Getting started

Use the scanner documentation to understand the crawl and audit phases. Configure scope and login behavior, then inspect what the scanner actually reached before interpreting an empty report.
