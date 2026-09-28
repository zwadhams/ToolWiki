---
title: "actionlint"
description: "Check GitHub Actions workflow syntax, expressions, and action usage."
tool:
  analysisWorkflows:
    - id: source
      label: Configuration checks
      subject: component
      inputs:
        - Configuration files
      languageScope: configuration
      languages:
        - GitHub Actions
      findings:
        - Logic errors
        - Type errors
      caveat: Checks workflow structure, expressions, and selected action interfaces; optional script
        checks require their external linters.
      sources:
        - https://github.com/rhysd/actionlint
        - https://raw.githubusercontent.com/rhysd/actionlint/main/docs/usage.md
        - https://raw.githubusercontent.com/rhysd/actionlint/main/LICENSE.txt
      requires: []
  aliases: ["GitHub Actions linter"]
  searchTerms: ["GitHub Actions","workflow linting","CI configuration","workflow expressions"]
  modes: ["Static"]
  inputTypes: ["Configuration files"]
  techniques: ["Linting","Type checking"]
  languages: ["GitHub Actions"]
  languageNote: "GitHub Actions YAML and its expression language. Optional shell and Python integrations check embedded scripts."
  targets: ["CI workflows","GitHub Actions workflows"]
  findings: ["Logic errors","Type errors"]
  findingNote: "Checks workflow structure, expressions, and selected action interfaces; optional script checks require their external linters."
  environment: "The actionlint executable; optional ShellCheck and Pyflakes integrations require those tools."
  setup: "Run against a repository's workflow files or provide individual YAML paths. Configure custom runner labels when needed."
  license: "MIT"
  costNote: "Free open-source checker."
  website: "https://github.com/rhysd/actionlint"
  scope: "Static GitHub Actions workflow checks. It does not execute jobs or validate every external service used by them."
  licenseCategory: "Open source"
  cost: ["Free"]
  verified: "2026-09-26"
  sources:
    - label: "Features and installation"
      url: https://github.com/rhysd/actionlint
    - label: "Usage and integrations"
      url: https://raw.githubusercontent.com/rhysd/actionlint/main/docs/usage.md
    - label: "License"
      url: https://raw.githubusercontent.com/rhysd/actionlint/main/LICENSE.txt
---

## Where it fits

actionlint can catch workflow problems before a CI run. It understands workflow keys and expression types, giving it a more specific role than a general YAML parser.

## Check a workflow first

Use the documented installation, then select an existing workflow file. Confirm whether optional script linters are enabled. [ShellCheck](../shellcheck/) findings inside a workflow still depend on its shell context.

## Read the diagnostic context

Review the expression, input, or workflow field named by the report. Keep a real CI run as part of validation: credentials, network access, service behavior, and job runtime are outside a static workflow check.
