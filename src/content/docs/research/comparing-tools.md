---
title: Comparing SAST tools
description: Detection patterns and language-specific analysis capabilities in twelve OCPP implementations.
---

In our [OCPP study](https://www.cs.montana.edu/izurieta/pubs/CSR_2026_Wadhams.pdf), we examined how static application security testing (SAST) findings vary across programming languages and their analysis tools. We used implementations of the Open Charge Point Protocol (OCPP) as our software corpus.

## Methods

We selected twelve open-source OCPP 1.6 implementations, with one project per language. We ran SonarQube, Semgrep, and language-specific analyzers using default configurations and examined the number and types of reported issues.

## Findings

Across the implementations we analyzed, the tools reported 4,660 findings, approximately 89% of which were classified as code quality or maintainability issues. Totals ranged from two for Rust to 1,689 for Java.

Detection scope contributed to these differences. Broader quality checks and narrower bug-pattern checks produced different reports. Tool execution also affected interpretation: Semgrep failed on the C project, while some other combinations completed without findings.

## Limitations

We analyzed one implementation per language and did not validate false positives or false negatives. Project size, configuration, and differences in analysis scope limit direct comparison. The results describe detection patterns; they do not establish relative security or isolate tool maturity as the cause of variation.

## Tool selection

For a new evaluation, I recommend considering:

- **Language-specific capabilities.** Check the relevant rules, supported frameworks, and required inputs. A shared language label does not establish equivalent analysis coverage.
- **Complementary analysis.** Consider whether a specialized analyzer examines issue categories that a broader tool covers less extensively.
- **Comparable conditions.** Record the project revision, tool version and edition, enabled rules, exclusions, and analysis status.
- **Finding validation.** Review results before comparing their practical value. Examine duplicate reports and review effort when combining tools.

I use the [catalog comparison](../../compare/) to present documented capabilities. Evaluating those capabilities on representative code requires a separate analysis.

## Related tools

We used [SonarQube](../../tools/sonarqube/), Semgrep, [Cppcheck](../../tools/cppcheck/), [gosec](../../tools/gosec/), [SpotBugs](../../tools/spotbugs/), [Bandit](../../tools/bandit/), and [Brakeman](../../tools/brakeman/).

I list [Semgrep CE](../../tools/semgrep-ce/) and [Semgrep Code](../../tools/semgrep-code/) separately, as I do [SonarQube Community Build](../../tools/sonarqube-community/) and Server. Our paper does not provide enough edition detail to assign the findings to these current offerings.

## Paper

Zachary Wadhams, Emma Sheppard, Dalton Arford, Clemente Izurieta, and Ann Marie Reinhold. **How Well Do SAST Tools Work Across Languages? An Empirical Study Using OCPP Implementations.** IEEE CSR, 2026. [Read the author copy](https://www.cs.montana.edu/izurieta/pubs/CSR_2026_Wadhams.pdf), especially Sections III-V.

Related notes: [static analysis approaches](../../concepts/static-approaches/) and [SAST adoption](../sast-adoption/).
