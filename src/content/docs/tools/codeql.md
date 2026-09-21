---
title: CodeQL
description: Query a structured model of code to investigate vulnerabilities and trace data flow.
tool:
  modes: [Static]
  inputTypes: [Source code]
  techniques: [SAST, Data flow analysis]
  languages: [C, C++, 'C#', Go, Java, JavaScript, Kotlin, Python, Ruby, Rust, Swift, TypeScript, GitHub Actions]
  languageNote: These are documented language and ecosystem families. Supported versions, frameworks, extraction modes, and operating systems vary; see the support matrix.
  targets: [Source code, CI workflows]
  licenseCategory: Proprietary
  cost: [Free with limits, Paid]
  costNote: Free for public repositories and eligible uses under the CodeQL terms. Standard private organization scanning requires a paid GitHub Code Security entitlement.
  editionGroup: codeql
  license: CodeQL CLI terms; query libraries have separate licenses. Check eligibility for your use.
  website: https://codeql.github.com/docs/
  verified: '2026-09-21'
  scope: CodeQL CLI and query libraries; catalog license category describes the CLI.
  findings: ["Injection risks","Memory safety","Concurrency issues"]
  findingNote: "Selected query families; availability depends on language, query pack, framework models, and extraction mode."
  environment: "Windows, macOS, and supported glibc Linux hosts; architecture and language prerequisites vary."
  setup: "Create a CodeQL database from source. Some language and extraction modes require a build; others support no-build extraction. Then run a selected query suite."
  sources:
    - label: CLI host prerequisites
      url: https://docs.github.com/en/code-security/how-tos/find-and-fix-code-vulnerabilities/scan-from-the-command-line/set-up-codeql-cli
    - label: Query families and scope
      url: https://codeql.github.com/codeql-query-help/
    - label: CodeQL free and paid availability
      url: https://docs.github.com/en/code-security/concepts/code-scanning/codeql/codeql-cli
    - label: About CodeQL
      url: https://codeql.github.com/docs/codeql-overview/about-codeql/
    - label: Supported languages and frameworks
      url: https://codeql.github.com/docs/codeql-overview/supported-languages-and-frameworks/
    - label: CodeQL CLI license terms
      url: https://github.com/github/codeql-cli-binaries/blob/main/LICENSE.md
---

## What it does

CodeQL builds a database representing a codebase, then runs queries against it. Security queries can follow data through a program to identify potentially unsafe paths.

## When it is useful

Use it for repeatable security checks or to investigate variants of a known coding problem. Custom queries let an investigation express properties beyond a simple text match.

## What to keep in mind

Extraction and build requirements depend on the language and configuration. Framework models and query selection affect the results. A language appearing in the catalog does not mean every version or library is supported.

The CLI and the public query libraries have different licensing terms. Check the linked CLI terms before adopting it for a particular repository or service.

## Getting started

Choose a language, check its support requirements, and start with a documented query suite. Record the CLI and query-pack versions alongside any evaluation results.
