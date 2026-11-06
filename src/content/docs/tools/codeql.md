---
title: CodeQL
description: Query a structured model of code to investigate vulnerabilities and trace data flow.
tool:
  cardRequirement: Source checkout, language-specific extraction, and CLI eligibility.
  analysisWorkflows:
    - id: python-sql-injection
      label: Python SQL-injection query
      subject: component
      inputs: [Source code]
      languageScope: source
      languages: [Python]
      findings: [Injection risks]
      hostPlatforms: [Linux]
      caveat: CodeQL CLI 2.27.4 and python-queries 1.9.0, selecting py/sql-injection on Python 3.12 source. The reviewed route uses Ubuntu 22.04 x86-64 and modeled Django request/SQL cursor calls. Confirm extraction, framework coverage, and CLI eligibility; no other language or query family is implied.
      sources:
        - https://docs.github.com/en/code-security/tutorials/customize-code-scanning/prepare-code-for-analysis
        - https://codeql.github.com/codeql-query-help/python/py-sql-injection/
        - https://raw.githubusercontent.com/github/codeql/1be292a1e54696ca543b4ad0f9b4537b9687caa7/python/ql/src/qlpack.yml
        - https://raw.githubusercontent.com/github/codeql/1be292a1e54696ca543b4ad0f9b4537b9687caa7/python/ql/src/Security/CWE-089/SqlInjection.ql
        - https://codeql.github.com/docs/codeql-overview/system-requirements/
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
    - label: Reviewed CLI and query bundle
      url: https://github.com/github/codeql-action/releases/tag/codeql-bundle-v2.27.4
    - label: Python database extraction
      url: https://docs.github.com/en/code-security/tutorials/customize-code-scanning/prepare-code-for-analysis
    - label: Python SQL-injection query help
      url: https://codeql.github.com/codeql-query-help/python/py-sql-injection/
    - label: Pinned Python query pack version
      url: https://raw.githubusercontent.com/github/codeql/1be292a1e54696ca543b4ad0f9b4537b9687caa7/python/ql/src/qlpack.yml
    - label: Pinned SQL-injection query
      url: https://raw.githubusercontent.com/github/codeql/1be292a1e54696ca543b4ad0f9b4537b9687caa7/python/ql/src/Security/CWE-089/SqlInjection.ql
    - label: Pinned Django query example
      url: https://raw.githubusercontent.com/github/codeql/1be292a1e54696ca543b4ad0f9b4537b9687caa7/python/ql/src/Security/CWE-089/examples/sql_injection.py
    - label: Host and Python extraction requirements
      url: https://codeql.github.com/docs/codeql-overview/system-requirements/
    - label: Exact query-pack selection syntax
      url: https://docs.github.com/en/code-security/reference/code-scanning/codeql/codeql-cli-manual/database-analyze
    - label: Query library license
      url: https://raw.githubusercontent.com/github/codeql/1be292a1e54696ca543b4ad0f9b4537b9687caa7/LICENSE
---

<span id="what-it-does"></span>

## First try

**Documentation reviewed on November 6, 2026; not executed here.** This builder workflow covers only Python SQL injection. Other catalog capabilities were not re-reviewed.

Use the [CodeQL 2.27.4 bundle](https://github.com/github/codeql-action/releases/tag/codeql-bundle-v2.27.4) for Linux x86-64 on Ubuntu 22.04. The reviewed query pack is `codeql/python-queries@1.9.0`, with `py/sql-injection` at `Security/CWE-089/SqlInjection.ql`. The tagged query/library revision is `1be292a1e54696ca543b4ad0f9b4537b9687caa7`.

1. Check that your project is eligible under the [CLI terms](https://github.com/github/codeql-cli-binaries/blob/main/LICENSE.md). The query repository's MIT license does not replace those terms. Public-repository and private-organization entitlements differ.
2. Follow the [CLI setup guide](https://docs.github.com/en/code-security/how-tos/find-and-fix-code-vulnerabilities/scan-from-the-command-line/set-up-codeql-cli). Make Python 3.12 available as `python3` and prepare the source and its dependencies. Use `codeql resolve packs` to confirm the query-pack version.
3. Choose a small Python project using modeled request sources and SQL APIs. The [upstream example](https://codeql.github.com/codeql-query-help/python/py-sql-injection/) shows Django request data reaching cursor queries. Check your framework/version and call shapes against the models; the example's legacy Django routing syntax is not a current application setup recipe.
4. Create a database without a build command, then analyze only the pinned query. In this example, `src` is your source directory and `codeql-python-db` must not already exist:

```sh
codeql database create codeql-python-db --language=python --source-root=src
codeql database analyze codeql-python-db codeql/python-queries@1.9.0:Security/CWE-089/SqlInjection.ql --format=sarifv2.1.0 --output=python-sql.sarif
```

The expected artifact is a SARIF file with any modeled source-to-SQL paths. Inspect extraction diagnostics first, then the source, sink, and intervening transformations. A finding calls for investigation; absence of a finding does not establish that every request path was modeled.

For a confirmed string-built query, use the database API's parameter binding and rerun the same query on a fresh database. Preserve the before/after source, CLI and pack versions, extraction logs, and reports in a [run record](../../guides/run-record/). This local result-writing command does not upload SARIF to GitHub.

For another language, follow the [language-specific database preparation guide](https://docs.github.com/en/code-security/tutorials/customize-code-scanning/prepare-code-for-analysis), then the [query analysis tutorial](https://docs.github.com/en/code-security/tutorials/customize-code-scanning/analyze-code). Check that language's build, host, and query requirements before reusing a Python procedure.

<span id="when-it-is-useful"></span>

## Choose the question to investigate

Start with the standard security checks. Use custom queries when you need to find variants of a known problem or investigate how data reaches an operation. The [query help](https://codeql.github.com/codeql-query-help/) explains individual checks and their recommendations.

## What to keep in mind

Check the support matrix for the language version and framework you use. A successful database creation still needs its diagnostics reviewed for extraction problems.

The CLI and the public query libraries have different licensing terms. Check the linked CLI terms before adopting it for a particular repository or service.

[Understand static analysis methods](../../concepts/advanced-static-methods/#data-flow-and-taint-where-can-an-input-reach) explains what a modeled data-flow path establishes. The system builder currently uses only the Python query above; other catalog languages and query families remain outside its reviewed matching scope.

<span id="getting-started"></span>

## Alternatives and complements

For Java, [SpotBugs](../spotbugs/) checks compiled class files for bug patterns, while [JBMC](../jbmc/) checks stated properties within configured bounds. Use the [Java workflow guide](../../guides/java-analysis/) to choose the input and result type that fit your task.
