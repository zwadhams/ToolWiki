# PHPStan: evidence record

Access/review date: 2026-09-22. Existing scope: PHPStan 2.x open-source analysis; optional PHPStan Pro is compared separately.

File: `src/content/docs/tools/phpstan.md`. Baseline SHA-256: `2d58632f00db7172a4225848080e90f89e482a0f2affb6bbb6c919ce80e1f14b`. Reviewed SHA-256: `2d58632f00db7172a4225848080e90f89e482a0f2affb6bbb6c919ce80e1f14b`. Original text is preserved in baseline.json.

Status: Assessed against primary documentation; see qualifications below.

## E1: evidence assessment

PHPStan 2.x supports PHP source/type analysis, configured rule levels, dependency symbol discovery and framework extensions. Runtime PHP and analyzed PHP are separate concerns. The baseline suppresses existing errors without fixing them. Core MIT licensing is distinct from the optional Pro subscription. The Pro introduction supports its workflow features, but launch pricing is historical; the edition table already points readers to current subscriptions rather than asserting that price.

Source sections: Getting Started; Rule Levels; Baseline; Introducing PHPStan Pro: browser UI, continuous analysis and migration; 2.1.x LICENSE; subscriptions

- [S1](https://phpstan.org/)
- [S2](https://phpstan.org/user-guide/getting-started)
- [S3](https://phpstan.org/user-guide/rule-levels)
- [S4](https://phpstan.org/user-guide/baseline)
- [S5](https://phpstan.org/blog/introducing-phpstan-pro)
- [S6](https://github.com/phpstan/phpstan/blob/2.1.x/LICENSE)

Correction: No content correction recorded.

## Claims and dispositions

Counts: {"supported":25,"supported with qualification":11,"contradicted":0,"unresolved":0}. Compound paragraphs retain their qualifications; list-valued fields are assessed member by member. Quoted relative links point to the corresponding repository Markdown pages.

| Location | Claim as reviewed | Verdict | Evidence / limitation |
| --- | --- | --- | --- |
| title | PHPStan | supported | See evidence assessment E1. |
| description | Use PHP types, declarations, and inference to find incorrect calls, invalid access, and other code errors. | supported | See evidence assessment E1. |
| tool.modes[0] | Static | supported | See evidence assessment E1. |
| tool.inputTypes[0] | Source code | supported | See evidence assessment E1. |
| tool.techniques[0] | Type checking | supported | See evidence assessment E1. |
| tool.techniques[1] | Bug finding | supported | See evidence assessment E1. |
| tool.languages[0] | PHP | supported | See evidence assessment E1. |
| tool.languageNote | PHP source analysis. Runtime and analyzed PHP versions are separate settings; framework-specific behavior may require extensions, stubs, or additional type information. | supported | See evidence assessment E1. |
| tool.targets[0] | Source code | supported | See evidence assessment E1. |
| tool.licenseCategory | Open source | supported | See evidence assessment E1. |
| tool.license | MIT for PHPStan; PHPStan Pro is a separate paid add-on | supported | See evidence assessment E1. |
| tool.cost[0] | Free | supported | See evidence assessment E1. |
| tool.costNote | The open-source analyzer and its rule levels are free. Optional PHPStan Pro adds a local web interface, continuous analysis, and migration assistance; it is not required for the core analysis listed here. | supported | See evidence assessment E1. |
| tool.editionGroup | phpstan | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.website | https://phpstan.org/ | supported | See evidence assessment E1. |
| tool.verified | 2026-09-21 | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.scope | PHPStan 2.x open-source analysis; optional PHPStan Pro is compared separately. | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.findings[0] | Type errors | supported | See evidence assessment E1. |
| tool.findings[1] | Logic errors | supported | See evidence assessment E1. |
| tool.findingNote | Type and symbol checks depend on rule level, annotations, stubs, and framework extensions. This is not a general injection scanner. | supported | See evidence assessment E1. |
| tool.environment | A host with a compatible PHP runtime and Composer or PHAR support; application target PHP version is configured separately. | supported | See evidence assessment E1. |
| tool.setup | Source and discoverable dependency symbols, often through Composer. No ordinary application build or runtime test harness; extensions may need configuration. | supported | See evidence assessment E1. |
| tool.sources[0] | PHPStan overview and free analyzer: https://phpstan.org/ | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.sources[1] | Getting started and symbol discovery: https://phpstan.org/user-guide/getting-started | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.sources[2] | Rule levels and type checks: https://phpstan.org/user-guide/rule-levels | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.sources[3] | Baseline behavior: https://phpstan.org/user-guide/baseline | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.sources[4] | PHPStan Pro functionality: https://phpstan.org/blog/introducing-phpstan-pro | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.sources[5] | PHPStan license: https://github.com/phpstan/phpstan/blob/2.1.x/LICENSE | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| What it does, line 40 | PHPStan reasons about PHP code using declarations, inferred types, and PHPDoc annotations. Depending on the chosen rule level, it can report undefined symbols, incompatible arguments or return values, invalid member access, and unsafe use of nullable or mixed values. | supported | See evidence assessment E1. |
| What it does, line 42 | Its focus is code correctness through static analysis. A clean PHPStan report does not establish that an application is free of injection flaws or other security defects. | supported | See evidence assessment E1. |
| Inputs and setup, line 46 | Supply your source, PHPStan configuration, and enough dependency information for symbol discovery. Composer installations, stubs, and framework extensions help the analyzer understand libraries and dynamically supplied behavior. | supported | See evidence assessment E1. |
| Inputs and setup, line 48 | The analyzer's own PHP runtime requirement differs from the PHP version targeted by the application. Set the intended target and consult the requirements of the installed release. | supported | See evidence assessment E1. |
| Rule levels and gradual adoption, line 52 | Rule levels increase the strictness of analysis. Type hints and accurate PHPDoc give stricter checks more useful information; inaccurate annotations can also make results misleading. | supported | See evidence assessment E1. |
| Rule levels and gradual adoption, line 54 | A baseline records existing errors so later checks can focus on new ones. It is useful for adopting analysis in a large codebase, but the recorded errors remain unresolved. Treat the baseline as maintained analysis scope rather than evidence that those errors are harmless. | supported | See evidence assessment E1. |
| When it is useful, line 58 | Consider it for a PHP application undergoing refactoring, stricter typing, or framework upgrades. For example, changing a method's accepted type can expose incompatible callers before they are reached by tests. | supported with qualification | Author recommendation or conditional inference, not a measured effectiveness claim. Factual premises reviewed against E1. |
| A useful first evaluation, line 62 | Follow the official Composer-based setup, analyze your own source directories, and resolve missing-symbol configuration before judging the findings. Choose a rule level you can review, then raise it as type information improves. Keep extensions, target PHP version, and baseline changes under version control. | supported with qualification | Author recommendation or conditional inference, not a measured effectiveness claim. Factual premises reviewed against E1. |
