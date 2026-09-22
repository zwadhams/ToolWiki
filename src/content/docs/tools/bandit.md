---
title: Bandit
description: Find common security issues in Python source code using checks against its syntax tree.
tool:
  modes: [Static]
  inputTypes: [Source code]
  techniques: [SAST, Pattern matching]
  languages: [Python]
  languageNote: Analyzes Python source. Check the installed release for supported Python syntax.
  targets: [Source code]
  licenseCategory: Open source
  cost: [Free]
  costNote: Free local Python security checker; no paid edition is covered by this entry.
  license: Apache-2.0
  website: https://bandit.readthedocs.io/en/latest/
  verified: '2026-09-22'
  scope: Bandit project; documentation overview, not a version-specific evaluation.
  findings: ["Injection risks","Unsafe API use","Security misconfiguration"]
  findingNote: "Selected security-pattern plugins; a flagged call requires context and is not a demonstrated exploit."
  environment: "A supported Python environment; package and dependency compatibility determine the host requirements."
  setup: "No application build or runtime harness. Supply Python source and configure plugins, exclusions, and severity thresholds."
  sources:
    - label: Getting started and runtime requirements
      url: https://bandit.readthedocs.io/en/latest/start.html
    - label: Bandit documentation and license
      url: https://bandit.readthedocs.io/en/latest/
    - label: Bandit source and usage
      url: https://github.com/PyCQA/bandit
---

## What it does

Bandit parses Python files and runs security checks against their abstract syntax trees. Its plugins look for patterns associated with unsafe behavior and produce findings for review.

## When it is useful

Use it as a focused check in a Python development workflow. Its narrow language scope makes it a useful entry point for learning how rule-based security analysis works.

## What to keep in mind

A flagged pattern needs context: an API call may be intentional, or its input may already be constrained. Bandit is not a proof that a project is secure, and its checks do not replace runtime testing or a review of application logic.

## Getting started

The official documentation links installation, configuration, plugin, and CI/CD guides. Begin with the default checks on a small Python project, then review findings before adding exclusions.

## Related research

**Used in a study:** The [OCPP paper](https://www.cs.montana.edu/izurieta/pubs/CSR_2026_Wadhams.pdf) used Bandit for its Python implementation. Its results illustrate how a focused analyzer can produce a different report from a multi-language platform. They do not establish that every reported pattern is a confirmed vulnerability.

See [comparing SAST tools](../../research/comparing-tools/) for interpreting counts and [SAST adoption](../../research/sast-adoption/) for planning the effort needed to review them.
