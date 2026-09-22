---
title: ZAP
description: Inspect web traffic and test running web applications with passive and active security checks.
tool:
  modes: [Dynamic]
  inputTypes: [Running applications]
  techniques: [DAST, Passive scanning, Active scanning]
  languages: [Language independent]
  languageNote: Tests exposed HTTP interfaces rather than parsing a particular server-side language. Coverage depends on discovery, authentication, and enabled rules.
  targets: [Web applications, HTTP APIs]
  licenseCategory: Open source
  cost: [Free]
  costNote: Free and open-source scanner. Core passive and active scanning do not require a paid edition.
  license: Apache-2.0
  website: https://www.zaproxy.org/
  verified: '2026-09-22'
  scope: ZAP core and documented scanning features; add-ons and configuration affect coverage.
  findings: ["Injection risks","Security misconfiguration"]
  findingNote: "Selected active/passive web scan rules; add-ons, authentication, and reachable endpoints control coverage."
  environment: "Windows, Linux, and macOS desktop or supported container deployments, with the required Java runtime."
  setup: "A reachable application and discovery inputs or API definition. Configure scope, login, and scan rules; no source build or target harness."
  sources:
    - label: Downloads and host prerequisites
      url: https://www.zaproxy.org/download/
    - label: ZAP scanning and API guide
      url: https://www.zaproxy.org/docs/api/
    - label: ZAP authentication methods
      url: https://www.zaproxy.org/docs/getting-further/authentication/authentication-methods/
    - label: ZAP project and license
      url: https://github.com/zaproxy/zaproxy
---

## What it does

ZAP proxies and inspects web traffic. Passive checks examine messages, while active scanning sends test requests to investigate potential vulnerabilities. Discovery and authentication determine which parts of an application it reaches.

## When it is useful

Use it to investigate the behavior of a running web application or include security checks in a test workflow. Logged-in functionality requires suitable authentication setup.

## What to keep in mind

Crawling is discovery, not proof of security coverage. Passive checks and active tests reveal different kinds of evidence. An active scan can change application state, so use an authorized test environment.

## Getting started

Start by observing a small test application's traffic. Review the difference between passive and active scanning, then configure the target scope and any login flow before expanding the test.
