---
title: Burp Suite Community Edition
description: Inspect and modify web requests with a free toolkit for manual security testing.
tool:
  modes: [Dynamic]
  inputTypes: [Running applications]
  techniques: [Manual web testing, HTTP interception]
  languages: [Language independent]
  languageNote: Works with web traffic rather than source languages. Manual testing coverage depends on what you explore.
  targets: [Web applications, HTTP APIs]
  licenseCategory: Proprietary
  license: Free-to-use proprietary Community Edition
  cost: [Free]
  costNote: Permanently free manual toolkit. It does not include automated Burp Scanner; Professional is a separate paid edition.
  editionGroup: burp
  website: https://portswigger.net/burp/communitydownload
  verified: '2026-09-21'
  scope: Community Edition; automated vulnerability scanning is not included.
  findings: ["Injection risks","Security misconfiguration"]
  findingNote: "Manual investigation using intercepted and edited requests. Community Edition does not include automated Burp Scanner."
  environment: "Windows, Linux, and macOS; browser support and CPU requirements depend on the installer."
  setup: "A reachable web application, proxy/browser setup, and manual test requests. Authentication is configured for the test; no source build is required."
  sources:
    - label: Desktop system requirements
      url: https://portswigger.net/burp/documentation/desktop/getting-started/system-requirements
    - label: Community and Professional comparison
      url: https://portswigger.net/burp/communitydownload
---

## What it does

Community Edition provides a proxy and traffic history, plus manual tools including Repeater, Decoder, Sequencer, and Comparer. It helps you inspect a request and deliberately test variations.

## What differs from Professional

Community does not include the automated Burp Scanner. Professional adds automation and workflow features, including project saving, crawling, the full Intruder, and Collaborator.

This entry is tagged for manual web testing rather than automated DAST, so filtering for a free automated scanner does not incorrectly include it.

## When it is useful

Use it for learning, request inspection, and hands-on investigation. You design the tests and interpret the application's responses.
