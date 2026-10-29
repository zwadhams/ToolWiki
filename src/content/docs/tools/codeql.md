---
title: CodeQL
description: Query a structured model of code to investigate vulnerabilities and trace data flow.
tool:
  decision:
    useWhen: Use CodeQL to investigate security problems and data flow in a source project, or to write queries for a recurring coding problem.
    result: Alerts identifying code locations and, for path queries, a possible route through the program. CLI analysis can save a SARIF report.
    limit: Results depend on extraction, selected queries, and framework models. No alerts does not establish that the project is secure.
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
  verified: '2026-09-22'
  scope: CodeQL CLI and query libraries; catalog license category describes the CLI.
  findings: ["Injection risks","Memory safety","Concurrency issues"]
  findingNote: "Selected query families; availability depends on language, query pack, framework models, and extraction mode."
  environment: "Windows, macOS, and supported glibc Linux hosts; architecture and language prerequisites vary."
  setup: "Create a CodeQL database from source. Some language and extraction modes require a build; others support no-build extraction. Then run a selected query suite."
  sources:
    - label: Analyze a database and interpret results
      url: https://docs.github.com/en/code-security/tutorials/customize-code-scanning/analyze-code
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

<span id="what-it-does"></span>

## First try

**Documented workflow; not executed in this review.** Start with one small source project you are eligible to analyze under the CLI terms.

1. Follow the [CLI setup guide](https://docs.github.com/en/code-security/how-tos/find-and-fix-code-vulnerabilities/scan-from-the-command-line/set-up-codeql-cli). Check the language's build and extraction requirements.
2. Follow [GitHub's database analysis tutorial](https://docs.github.com/en/code-security/tutorials/customize-code-scanning/analyze-code), including its database-creation prerequisite. Run the standard queries for that database and save a SARIF report, a format for analysis results.
3. Review extraction diagnostics before interpreting the alerts. Open a reported location or path and check whether its assumptions match your code.

The expected artifact is a results file, which may contain no alerts. For an alert, record the query, affected code, and why you accept or dismiss it. Keep the CLI and query-pack versions with the result.

<span id="when-it-is-useful"></span>

## Choose the question to investigate

Start with the standard security checks. Use custom queries when you need to find variants of a known problem or investigate how data reaches an operation. The [query help](https://codeql.github.com/codeql-query-help/) explains individual checks and their recommendations.

## What to keep in mind

Check the support matrix for the language version and framework you use. A successful database creation still needs its diagnostics reviewed for extraction problems.

The CLI and the public query libraries have different licensing terms. Check the linked CLI terms before adopting it for a particular repository or service.

<span id="getting-started"></span>

## Alternatives and complements

For Java, [SpotBugs](../spotbugs/) checks compiled class files for bug patterns, while [JBMC](../jbmc/) checks stated properties within configured bounds. Use the [Java workflow guide](../../guides/java-analysis/) to choose the input and result type that fit your task.
