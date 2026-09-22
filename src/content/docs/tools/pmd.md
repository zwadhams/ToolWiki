---
title: PMD
description: Apply language-specific rules to find coding defects and maintainability problems across several source languages.
tool:
  modes: [Static]
  inputTypes: [Source code]
  techniques: [Linting, Bug finding]
  languages: [Java, Apex, JavaScript, Kotlin, Swift, Modelica, PL/SQL, HTML, XML, Visualforce, JSP]
  languageNote: Selected languages with documented PMD rule support. The bundled CPD duplicate-code detector has a different, broader language list; its languages are not inherited by these rule-analysis tags.
  targets: [Source code]
  licenseCategory: Open source
  license: BSD-style license with an acknowledgment clause; additional Apache-2.0 components
  cost: [Free]
  costNote: Free open-source analyzer and bundled CPD utility. Local use and CI do not require a PMD subscription. Build infrastructure costs are separate.
  website: https://pmd.github.io/
  verified: '2026-09-22'
  scope: PMD 7.27.0 rule analysis. CPD is described for comparison but is not the language scope of this catalog entry.
  findings: ["Logic errors","Coding conventions"]
  findingNote: "Language-specific rules only. CPD duplication support does not imply defect-rule support for the same language."
  environment: "Windows, Linux, or macOS with the supported Java runtime; CLI and build-plugin prerequisites vary."
  setup: "Source and a ruleset; Java type resolution may need dependency classpaths. No runtime harness or executed target."
  sources:
    - label: PMD and CPD language coverage
      url: https://pmd.github.io/
    - label: PMD rule references and integration documentation
      url: https://docs.pmd-code.org/latest/
    - label: Installation and basic usage
      url: https://docs.pmd-code.org/latest/pmd_userdocs_installation.html
    - label: PMD licenses
      url: https://github.com/pmd/pmd/blob/main/LICENSE
---

## What it does

PMD parses source code and applies a configured set of rules. Depending on the language and ruleset, findings can cover suspicious constructs, unused code, error handling, complexity, and maintainability. Rules can be extended through Java or XPath.

Java and Salesforce Apex are major use cases. Other supported languages have their own rule inventories; selecting a language does not promise equivalent detection depth across all languages.

## PMD versus CPD

| Component | Main job | Language caveat |
| --- | --- | --- |
| PMD rule analysis | Report violations of coding rules. | Use the rule reference for the chosen language. |
| CPD, bundled with PMD | Find repeated code fragments. | Its larger language list includes languages that do not have PMD bug-finding rules. |

For example, CPD's C++ support does not make PMD a C++ defect analyzer. Likewise, parser support alone is insufficient: the documentation lists Scala parsing but no supplied Scala rules. These cases are excluded from this entry's language tags.

## Inputs and results

Provide source files, a compatible Java runtime for PMD, a language configuration, and a ruleset. Java analysis may also need an auxiliary classpath for dependencies so type resolution has the right information.

You can run PMD from its command line or through build integrations such as Maven and Gradle. Reports identify violated rules and source locations. Keep rule priorities, exclusions, and suppressions with the results.

## A useful first evaluation

Choose one language and inspect its available rules before adopting a ruleset. Run it on representative source, review several findings, and adjust rules that do not express your project's requirements. A quality gate based on rule violations is a configured policy, not a proof that all defects have been found.
