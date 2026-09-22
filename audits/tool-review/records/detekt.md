# detekt: evidence record

Access/review date: 2026-09-22. Existing scope: Version 1.23.8 documentation and Gradle task names. The site's 2.0 alpha documentation is a separate version and should not be mixed into this setup.

File: `src/content/docs/tools/detekt.md`. Baseline SHA-256: `958990b7699cb6ffb70a296e67bd4939c3d8d248b08a2ddfed80f835026e6585`. Reviewed SHA-256: `958990b7699cb6ffb70a296e67bd4939c3d8d248b08a2ddfed80f835026e6585`. Original text is preserved in baseline.json.

Status: Assessed against primary documentation; see qualifications below.

## E1: evidence assessment

The preserved 1.23.8 documentation distinguishes detekt (without type resolution) from detektMain/detektTest with type resolution. Classpaths enable symbol-aware rules, and required-type-resolution rules are skipped without them. CLI/Gradle/JVM and Android variant qualifications are appropriate. Baselines/exclusions affect visible findings. The site now labels 1.23.8 unmaintained, but the entry intentionally preserves that version and does not import 2.0 alpha task behavior.

Source sections: 1.23.8 CLI; 1.23.8 Type Resolution: JVM and Android tasks; Apache-2.0 LICENSE

- [S1](https://detekt.dev/docs/1.23.8/gettingstarted/cli/)
- [S2](https://detekt.dev/docs/1.23.8/gettingstarted/type-resolution/)
- [S3](https://github.com/detekt/detekt/blob/main/LICENSE)
- [S4](https://www.cs.montana.edu/izurieta/pubs/CSR_2026_Wadhams.pdf)

Correction: No content correction recorded.

## Claims and dispositions

Counts: {"supported":24,"supported with qualification":11,"contradicted":0,"unresolved":0}. Compound paragraphs retain their qualifications; list-valued fields are assessed member by member. Quoted relative links point to the corresponding repository Markdown pages.

| Location | Claim as reviewed | Verdict | Evidence / limitation |
| --- | --- | --- | --- |
| title | detekt | supported | See evidence assessment E1. |
| description | Check Kotlin source for code smells, complexity, and selected bug patterns. | supported | See evidence assessment E1. |
| tool.modes[0] | Static | supported | See evidence assessment E1. |
| tool.inputTypes[0] | Source code | supported | See evidence assessment E1. |
| tool.techniques[0] | Linting | supported | See evidence assessment E1. |
| tool.techniques[1] | Bug finding | supported | See evidence assessment E1. |
| tool.languages[0] | Kotlin | supported | See evidence assessment E1. |
| tool.languageNote | Kotlin source analysis. Type-aware rules need the compilation classpath and a matching analysis configuration; a plain syntax-only run has narrower coverage. | supported | See evidence assessment E1. |
| tool.targets[0] | Kotlin applications | supported | See evidence assessment E1. |
| tool.targets[1] | Android applications | supported | See evidence assessment E1. |
| tool.targets[2] | Libraries | supported | See evidence assessment E1. |
| tool.findings[0] | Coding conventions | supported | See evidence assessment E1. |
| tool.findings[1] | Logic errors | supported | See evidence assessment E1. |
| tool.findings[2] | Code complexity | supported | See evidence assessment E1. |
| tool.findingNote | Selected rules report maintainability and potential correctness issues. A code smell is not automatically a security weakness; rules requiring type resolution do not run without it. | supported | See evidence assessment E1. |
| tool.environment | A compatible JVM and Gradle or CLI setup. Match Kotlin, JDK, Gradle, and detekt versions using the release documentation. | supported | See evidence assessment E1. |
| tool.setup | Configure source sets, rules, and exclusions. Use type-resolution tasks or supply the classpath when those rules are needed. | supported | See evidence assessment E1. |
| tool.licenseCategory | Open source | supported | See evidence assessment E1. |
| tool.license | Apache-2.0 | supported | See evidence assessment E1. |
| tool.cost[0] | Free | supported | See evidence assessment E1. |
| tool.costNote | Free open-source analyzer and Gradle integration. No paid tier is required for the documented rule sets. | supported | See evidence assessment E1. |
| tool.website | https://detekt.dev/ | supported | See evidence assessment E1. |
| tool.verified | 2026-09-22 | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.scope | Version 1.23.8 documentation and Gradle task names. The site's 2.0 alpha documentation is a separate version and should not be mixed into this setup. | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.sources[0] | Version 1.23.8 CLI: https://detekt.dev/docs/1.23.8/gettingstarted/cli/ | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.sources[1] | Type resolution and Gradle tasks: https://detekt.dev/docs/1.23.8/gettingstarted/type-resolution/ | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.sources[2] | License: https://github.com/detekt/detekt/blob/main/LICENSE | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.sources[3] | OCPP study: https://www.cs.montana.edu/izurieta/pubs/CSR_2026_Wadhams.pdf | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| Setup, line 35 | detekt can run through its CLI or build integration. The distinction between syntax inspection and type resolution matters: knowledge of return types and symbols enables checks that a source-only parse cannot perform. | supported | See evidence assessment E1. |
| Example, line 39 | **Illustrative workflow, not run here.** In a Kotlin JVM project with the detekt 1.23.8 Gradle plugin already configured, run: | supported with qualification | Author recommendation or conditional inference, not a measured effectiveness claim. Factual premises reviewed against E1. |
| Example, line 41 | ```sh<br>./gradlew detektMain detektTest<br>``` | supported with qualification | Documentation/static reasoning only; this example has not been executed. See E1. |
| Example, line 45 | On Windows, use `gradlew.bat detektMain detektTest`. These tasks analyze the main and test source sets with type resolution. The plain `detekt` task runs without type resolution in this documented configuration. | supported with qualification | Author recommendation or conditional inference, not a measured effectiveness claim. Factual premises reviewed against E1. |
| Example, line 47 | Review a finding together with its rule, source set, and analysis task. If an expected type-aware check is missing, verify the classpath and task before concluding that the rule found nothing. | supported with qualification | Author recommendation or conditional inference, not a measured effectiveness claim. Factual premises reviewed against E1. |
| Limits, line 51 | Rule selections and baselines affect visibility. Android variants and Kotlin Multiplatform projects have different generated tasks; use the matching release guide rather than copying the JVM task names unchanged. | supported | See evidence assessment E1. |
| Related research, line 55 | We used Detekt for the Kotlin implementation in our [OCPP study](https://www.cs.montana.edu/izurieta/pubs/CSR_2026_Wadhams.pdf). The study's mention of the tool does not establish that every type-aware rule was enabled. See [Comparing SAST tools](../../../src/content/docs/research/comparing-tools.md) for how configuration and analysis scope affect comparisons. | supported with qualification | Historical attribution only; see the research reconciliation record. No current-edition performance inference. |
