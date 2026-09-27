---
title: "Checkstyle"
description: "Check Java source against configured coding standards and selected structural rules."
tool:
  aliases: ["Check Style"]
  searchTerms: ["Java style checker","Java coding standard","Java linting","Google Java Style"]
  modes: ["Static"]
  inputTypes: ["Source code"]
  techniques: ["Linting"]
  languages: ["Java"]
  languageNote: "Java source; parser support and the Java runtime needed to run Checkstyle depend on the release."
  targets: ["Java applications","Libraries"]
  findings: ["Coding conventions","Coding-standard violations"]
  findingNote: "Checks the configured rules, such as naming, layout, imports, and selected structural patterns; it does not provide general semantic bug detection."
  environment: "A Java runtime compatible with the chosen Checkstyle release; CLI and build integrations are documented."
  setup: "Supply Java files and an XML rules configuration, optionally starting from a bundled style configuration."
  license: "LGPL-2.1 for Checkstyle, with separate dependency notices"
  costNote: "Free open-source analyzer. Build-system integration does not require a paid analyzer edition."
  website: "https://checkstyle.org/"
  scope: "Checkstyle's Java source checks; bytecode analysis and application security testing are separate workflows."
  licenseCategory: "Open source"
  cost: ["Free"]
  verified: "2026-09-26"
  sources:
    - label: "Overview and compatibility"
      url: https://checkstyle.org/
    - label: "Command-line setup and configuration"
      url: https://checkstyle.org/cmdline.html
    - label: "Project and licensing"
      url: https://github.com/checkstyle/checkstyle
---

## Where it fits

Choose Checkstyle when the main question is whether Java source follows an agreed standard. [SpotBugs](../spotbugs/) examines compiled classes for bug patterns, while [PMD](../pmd/) offers another source-rule workflow.

## Start with an explicit standard

Select a configuration, run it on a small source set, and review the resulting rule identifiers. A bundled Google or Sun style configuration is a starting point; it may not match the project's chosen conventions.

## Interpret the result

Keep the rule configuration, tool version, and exclusions with reports. A style violation is not automatically a functional defect, and a clean report does not establish correctness. Verify source-language compatibility separately from the Java version required to run the checker.

[Compare Checkstyle, PMD, and SpotBugs](../../compare/?tools=tools%2Fcheckstyle%2Ctools%2Fpmd%2Ctools%2Fspotbugs).
