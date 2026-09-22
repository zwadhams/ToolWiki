# Psalm: evidence record

Access/review date: 2026-09-22. Existing scope: Current Psalm CLI type checking and explicit taint-analysis workflow. This entry does not assume every framework or dynamic PHP construct is fully modeled.

File: `src/content/docs/tools/psalm.md`. Baseline SHA-256: `f5db066cefd709fe8e3c44c64fc899fd09c4762f1a0310f201580ed5f8905863`. Reviewed SHA-256: `f5db066cefd709fe8e3c44c64fc899fd09c4762f1a0310f201580ed5f8905863`. Original text is preserved in baseline.json.

Status: Assessed against primary documentation; see qualifications below.

## E1: evidence assessment

Installation specifies PHP 8.2+, Composer, --init and --no-cache. The security guide documents --taint-analysis, modeled inputs, SQL/output sinks and context-sensitive sanitization. Type analysis, plugins and annotations support ordinary checks; a successful ordinary run does not establish taint coverage. The project is MIT-licensed. The OCPP paper identifies Psalm but does not establish use of taint mode.

Source sections: Installation: PHP/Composer and initialization; Security Analysis: taint flag, sources and sinks; MIT LICENSE

- [S1](https://psalm.dev/docs/running_psalm/installation/)
- [S2](https://psalm.dev/docs/security_analysis/)
- [S3](https://github.com/vimeo/psalm/blob/master/LICENSE)
- [S4](https://www.cs.montana.edu/izurieta/pubs/CSR_2026_Wadhams.pdf)

Correction: No content correction recorded.

## Claims and dispositions

Counts: {"supported":25,"supported with qualification":12,"contradicted":0,"unresolved":0}. Compound paragraphs retain their qualifications; list-valued fields are assessed member by member. Quoted relative links point to the corresponding repository Markdown pages.

| Location | Claim as reviewed | Verdict | Evidence / limitation |
| --- | --- | --- | --- |
| title | Psalm | supported | See evidence assessment E1. |
| description | Check PHP types and code behavior, with a separate taint-analysis mode for security questions. | supported | See evidence assessment E1. |
| tool.modes[0] | Static | supported | See evidence assessment E1. |
| tool.inputTypes[0] | Source code | supported | See evidence assessment E1. |
| tool.techniques[0] | Type checking | supported | See evidence assessment E1. |
| tool.techniques[1] | Bug finding | supported | See evidence assessment E1. |
| tool.techniques[2] | Taint analysis | supported | See evidence assessment E1. |
| tool.languages[0] | PHP | supported | See evidence assessment E1. |
| tool.languageNote | Analyzes PHP projects using code, annotations, dependencies, and configured models. Framework behavior may need plugins or additional annotations. | supported | See evidence assessment E1. |
| tool.targets[0] | PHP applications | supported | See evidence assessment E1. |
| tool.targets[1] | Libraries | supported | See evidence assessment E1. |
| tool.findings[0] | Type errors | supported | See evidence assessment E1. |
| tool.findings[1] | Logic errors | supported | See evidence assessment E1. |
| tool.findings[2] | Injection risks | supported | See evidence assessment E1. |
| tool.findingNote | Type and code checks differ from the separate taint-analysis mode. Injection findings depend on modeled sources, sinks, and sanitization; enabling ordinary analysis does not establish taint coverage. | supported | See evidence assessment E1. |
| tool.environment | A compatible PHP and Composer environment. Current installation documentation requires PHP 8.2 or newer; check requirements for the chosen release. | supported | See evidence assessment E1. |
| tool.setup | Install the project development dependency, initialize configuration, and include the intended code and dependencies. Enable taint analysis separately for its security checks. | supported | See evidence assessment E1. |
| tool.licenseCategory | Open source | supported | See evidence assessment E1. |
| tool.license | MIT | supported | See evidence assessment E1. |
| tool.cost[0] | Free | supported | See evidence assessment E1. |
| tool.costNote | Free open-source analyzer, including the documented taint-analysis mode. No paid Psalm edition is required for these checks. | supported | See evidence assessment E1. |
| tool.website | https://psalm.dev/ | supported | See evidence assessment E1. |
| tool.verified | 2026-09-22 | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.scope | Current Psalm CLI type checking and explicit taint-analysis workflow. This entry does not assume every framework or dynamic PHP construct is fully modeled. | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.sources[0] | Installation and configuration: https://psalm.dev/docs/running_psalm/installation/ | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.sources[1] | Security and taint analysis: https://psalm.dev/docs/security_analysis/ | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.sources[2] | License: https://github.com/vimeo/psalm/blob/master/LICENSE | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.sources[3] | OCPP study: https://www.cs.montana.edu/izurieta/pubs/CSR_2026_Wadhams.pdf | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| What it does, line 35 | Psalm uses inferred types and annotations to examine PHP code. Its security mode follows data from modeled untrusted sources toward sensitive operations, including output and database sinks. | supported | See evidence assessment E1. |
| What it does, line 37 | Compare [PHPStan](../../../src/content/docs/tools/phpstan.md) for another PHP type-analysis workflow. Similar language coverage does not mean identical rules or framework models. | supported | See evidence assessment E1. |
| Example, line 41 | **Illustrative workflow, not run here.** In a PHP project with Composer configured: | supported with qualification | Author recommendation or conditional inference, not a measured effectiveness claim. Factual premises reviewed against E1. |
| Example, line 43 | ```sh<br>composer require --dev vimeo/psalm<br>vendor/bin/psalm --init<br>vendor/bin/psalm --no-cache<br>``` | supported with qualification | Documentation/static reasoning only; this example has not been executed. See E1. |
| Example, line 49 | Review the generated `psalm.xml` and its included paths. For the separate security workflow, run: | supported with qualification | Author recommendation or conditional inference, not a measured effectiveness claim. Factual premises reviewed against E1. |
| Example, line 51 | ```sh<br>vendor/bin/psalm --taint-analysis<br>``` | supported with qualification | Documentation/static reasoning only; this example has not been executed. See E1. |
| Example, line 55 | Inspect the reported path and the expected escaping or validation at its sink. A sanitizer appropriate for one output context may not be appropriate for another. | supported with qualification | Author recommendation or conditional inference, not a measured effectiveness claim. Factual premises reviewed against E1. |
| Limits, line 59 | Dynamic behavior and missing models can affect results. Suppressions and baselines change which issues are visible; retain them with the report. A successful ordinary run is not evidence that the separate taint mode checked the project. | supported | See evidence assessment E1. |
| Related research, line 63 | We used Psalm for the PHP implementation in our [OCPP study](https://www.cs.montana.edu/izurieta/pubs/CSR_2026_Wadhams.pdf). The paper does not establish that we enabled its separate taint-analysis mode. I keep that current capability distinct from the reported study configuration in [Comparing SAST tools](../../../src/content/docs/research/comparing-tools.md). | supported with qualification | Historical attribution only; see the research reconciliation record. No current-edition performance inference. |
