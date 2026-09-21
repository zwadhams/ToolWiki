---
title: Semgrep CE
description: Match code patterns and apply local data flow checks using customizable analysis rules.
tool:
  modes: [Static]
  inputTypes: [Source code]
  techniques: [SAST, Pattern matching, Data flow analysis]
  languages: [C, C++, 'C#', Go, Java, JavaScript, Kotlin, Python, Ruby, Rust, TypeScript, PHP]
  languageNote: Selected supported language examples, not an exhaustive list. Language maturity and analysis features differ; the product support matrix also describes features outside CE.
  targets: [Source code]
  licenseCategory: Open source
  cost: [Free]
  costNote: The standalone Community Edition engine is free. Semgrep Code is a separate platform offering with a limited free plan and paid plans.
  editionGroup: semgrep
  license: LGPL-2.1 engine; rules may have different licenses.
  website: https://github.com/semgrep/semgrep
  verified: '2026-09-21'
  scope: Community Edition engine. Do not assume Semgrep Code platform capabilities are included.
  findings: ["Injection risks","Unsafe API use","Coding conventions"]
  findingNote: "Selected local rules and supported local taint checks. Cross-file platform features and separate Supply Chain detection are outside CE scope."
  environment: "Linux and macOS; native Windows is documented as beta. Requires the supported Python runtime."
  setup: "Source and selected rules; no application build or runtime harness for the normal CE workflow. Rule licensing and language maturity vary."
  sources:
    - label: Host prerequisites
      url: https://docs.semgrep.dev/prerequisites
    - label: Semgrep Free Edition and paid plans
      url: https://semgrep.dev/pricing/
    - label: Semgrep usage and billing
      url: https://docs.semgrep.dev/usage-and-billing/overview
    - label: Semgrep CE project and license
      url: https://github.com/semgrep/semgrep
    - label: Semgrep CE design and scope
      url: https://semgrep.dev/docs/contributing/semgrep-philosophy
    - label: Product language support matrix
      url: https://docs.semgrep.dev/supported-languages
---

## What it does

Semgrep CE matches source-code structures using rules that resemble the code being checked. Rules can express security checks or project-specific conventions, including supported local taint-analysis checks.

## When it is useful

Use it when you want to turn a recognizable coding mistake into a repeatable check. A small custom rule can be easier to maintain than a manual search performed during every review.

## What to keep in mind

CE and [Semgrep Code](../semgrep-code/) have different analysis capabilities. Cross-file analysis and Pro rules are platform capabilities available even on its limited free plan; they are not features of standalone CE. Rule quality and language support influence what a scan finds.

## Getting started

Start with a small, relevant rule set, inspect the findings, and tune the rules against representative examples. Check rule licenses separately from the engine license.
