---
title: detekt
description: Check Kotlin source for code smells, complexity, and selected bug patterns.
tool:
  modes: [Static]
  inputTypes: [Source code]
  techniques: [Linting, Bug finding]
  languages: [Kotlin]
  languageNote: Kotlin source analysis. Type-aware rules need the compilation classpath and a matching analysis configuration; a plain syntax-only run has narrower coverage.
  targets: [Kotlin applications, Android applications, Libraries]
  findings: [Coding conventions, Logic errors, Code complexity]
  findingNote: Selected rules report maintainability and potential correctness issues. A code smell is not automatically a security weakness; rules requiring type resolution do not run without it.
  environment: A compatible JVM and Gradle or CLI setup. Match Kotlin, JDK, Gradle, and detekt versions using the release documentation.
  setup: Configure source sets, rules, and exclusions. Use type-resolution tasks or supply the classpath when those rules are needed.
  licenseCategory: Open source
  license: Apache-2.0
  cost: [Free]
  costNote: Free open-source analyzer and Gradle integration. No paid tier is required for the documented rule sets.
  website: https://detekt.dev/
  verified: '2026-09-22'
  scope: Version 1.23.8 documentation and Gradle task names. The site's 2.0 alpha documentation is a separate version and should not be mixed into this setup.
  sources:
    - label: Version 1.23.8 CLI
      url: https://detekt.dev/docs/1.23.8/gettingstarted/cli/
    - label: Type resolution and Gradle tasks
      url: https://detekt.dev/docs/1.23.8/gettingstarted/type-resolution/
    - label: License
      url: https://github.com/detekt/detekt/blob/main/LICENSE
    - label: OCPP study
      url: https://www.cs.montana.edu/izurieta/pubs/CSR_2026_Wadhams.pdf
---

## Setup

detekt can run through its CLI or build integration. The distinction between syntax inspection and type resolution matters: knowledge of return types and symbols enables checks that a source-only parse cannot perform.

## Example

**Illustrative workflow, not run here.** In a Kotlin JVM project with the detekt 1.23.8 Gradle plugin already configured, run:

```sh
./gradlew detektMain detektTest
```

On Windows, use `gradlew.bat detektMain detektTest`. These tasks analyze the main and test source sets with type resolution. The plain `detekt` task runs without type resolution in this documented configuration.

Review a finding together with its rule, source set, and analysis task. If an expected type-aware check is missing, verify the classpath and task before concluding that the rule found nothing.

## Limits

Rule selections and baselines affect visibility. Android variants and Kotlin Multiplatform projects have different generated tasks; use the matching release guide rather than copying the JVM task names unchanged.

## Related research

We used Detekt for the Kotlin implementation in our [OCPP study](https://www.cs.montana.edu/izurieta/pubs/CSR_2026_Wadhams.pdf). The study's mention of the tool does not establish that every type-aware rule was enabled. See [Comparing SAST tools](../../research/comparing-tools/) for how configuration and analysis scope affect comparisons.
