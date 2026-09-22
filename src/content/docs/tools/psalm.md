---
title: Psalm
description: Check PHP types and code behavior, with a separate taint-analysis mode for security questions.
tool:
  modes: [Static]
  inputTypes: [Source code]
  techniques: [Type checking, Bug finding, Taint analysis]
  languages: [PHP]
  languageNote: Analyzes PHP projects using code, annotations, dependencies, and configured models. Framework behavior may need plugins or additional annotations.
  targets: [PHP applications, Libraries]
  findings: [Type errors, Logic errors, Injection risks]
  findingNote: Type and code checks differ from the separate taint-analysis mode. Injection findings depend on modeled sources, sinks, and sanitization; enabling ordinary analysis does not establish taint coverage.
  environment: A compatible PHP and Composer environment. Current installation documentation requires PHP 8.2 or newer; check requirements for the chosen release.
  setup: Install the project development dependency, initialize configuration, and include the intended code and dependencies. Enable taint analysis separately for its security checks.
  licenseCategory: Open source
  license: MIT
  cost: [Free]
  costNote: Free open-source analyzer, including the documented taint-analysis mode. No paid Psalm edition is required for these checks.
  website: https://psalm.dev/
  verified: '2026-09-22'
  scope: Current Psalm CLI type checking and explicit taint-analysis workflow. This entry does not assume every framework or dynamic PHP construct is fully modeled.
  sources:
    - label: Installation and configuration
      url: https://psalm.dev/docs/running_psalm/installation/
    - label: Security and taint analysis
      url: https://psalm.dev/docs/security_analysis/
    - label: License
      url: https://github.com/vimeo/psalm/blob/master/LICENSE
    - label: OCPP study
      url: https://www.cs.montana.edu/izurieta/pubs/CSR_2026_Wadhams.pdf
---

## What it does

Psalm uses inferred types and annotations to examine PHP code. Its security mode follows data from modeled untrusted sources toward sensitive operations, including output and database sinks.

Compare [PHPStan](../phpstan/) for another PHP type-analysis workflow. Similar language coverage does not mean identical rules or framework models.

## Example

**Illustrative workflow, not run here.** In a PHP project with Composer configured:

```sh
composer require --dev vimeo/psalm
vendor/bin/psalm --init
vendor/bin/psalm --no-cache
```

Review the generated `psalm.xml` and its included paths. For the separate security workflow, run:

```sh
vendor/bin/psalm --taint-analysis
```

Inspect the reported path and the expected escaping or validation at its sink. A sanitizer appropriate for one output context may not be appropriate for another.

## Limits

Dynamic behavior and missing models can affect results. Suppressions and baselines change which issues are visible; retain them with the report. A successful ordinary run is not evidence that the separate taint mode checked the project.

## Related research

We used Psalm for the PHP implementation in our [OCPP study](https://www.cs.montana.edu/izurieta/pubs/CSR_2026_Wadhams.pdf). The paper does not establish that we enabled its separate taint-analysis mode. I keep that current capability distinct from the reported study configuration in [Comparing SAST tools](../../research/comparing-tools/).
