---
title: Cppcheck (Open Source)
description: Find undefined behavior, memory errors, and other defects in C and C++ source code.
tool:
  modes: [Static]
  inputTypes: [Source code]
  techniques: [Bug finding, Data flow analysis]
  languages: [C, C++]
  languageNote: C and C++ source analysis. Configure the target platform, preprocessor definitions, and library models for the build you actually ship.
  targets: [Source code]
  licenseCategory: Open source
  license: GPL-3.0
  cost: [Free]
  costNote: The open-source analyzer is free, including for commercial code analysis. Cppcheck Premium is a separate paid offering with additional analysis and reporting; its features are not included in this entry's filter tags.
  editionGroup: cppcheck
  website: https://cppcheck.sourceforge.io/
  verified: '2026-09-21'
  scope: Open-source Cppcheck 2.22 and its manual; Premium is compared separately below.
  findings: ["Memory safety","Logic errors","Coding-standard violations"]
  findingNote: "Selected defect checks and partial open-source coding-standard checks. Premium coverage is not inherited by these tags."
  environment: "Windows, Linux, macOS, and other buildable hosts; package availability varies."
  setup: "Source can be checked directly; a compilation database or project import improves build context. Supply includes, macros, target platform, and library models."
  sources:
    - label: Cppcheck overview and open-source feature matrix
      url: https://cppcheck.sourceforge.io/
    - label: Cppcheck manual and configuration
      url: https://github.com/cppcheck-opensource/cppcheck/blob/main/man/manual.md
    - label: Cppcheck license
      url: https://github.com/cppcheck-opensource/cppcheck/blob/main/COPYING
    - label: Premium capabilities and license options
      url: https://www.cppcheck.com/
---

## What it does

Cppcheck examines C/C++ code for defects such as null pointer use, out-of-bounds access, uninitialized variables, and invalid memory management. Its flow-sensitive analysis tracks information about values through code. A finding can identify a correctness problem with security consequences; it does not necessarily establish an exploitable vulnerability.

## Inputs and workflow

You can analyze files directly or import a project configuration, including a compilation database. Build information helps supply the right includes and definitions. Library configuration files describe behavior that the analyzer cannot infer from a declaration alone.

The command-line tool fits local checks and continuous integration. The graphical interface provides another way to configure analysis and browse diagnostics. Findings identify the check and source location; the manual documents text and XML reporting.

## When it is useful

Consider it for native or embedded C/C++ projects, including code with platform-specific definitions. It can complement [Clang Static Analyzer](../clang-static-analyzer/) because the tools use different analyses and checks.

## Coverage limits

- A different platform or set of preprocessor definitions can expose different code paths. Record which configuration was checked.
- The analyzer deliberately makes tradeoffs that can miss defects. An empty report is not a proof of correctness.
- Open-source MISRA support is partial. Premium offers additional standards coverage and compliance reporting; a tool report alone does not establish product compliance.

## A useful first evaluation

Follow the official manual to import a representative build configuration. Review configuration diagnostics before judging defect findings, then examine a small set of results with the check descriptions. Keep the analyzer version, enabled checks, exclusions, and library configuration with the report.
