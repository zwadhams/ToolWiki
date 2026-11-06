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
    - label: Workflow-key diagnostic examples
      url: https://github.com/rhysd/actionlint/blob/main/docs/checks.md#check-unexpected-keys
---

## Where it fits

actionlint can catch workflow problems before a CI run. It understands workflow keys and expression types, giving it a more specific role than a general YAML parser.

<span id="check-a-workflow-first"></span>

## First try

**Illustrative example; not executed here.** Use the
[actionlint 1.7.7 release](https://github.com/rhysd/actionlint/releases/tag/v1.7.7)
archive matching your host OS and CPU, and record `actionlint -version`.
Save this local file as `workflow.yml`; there is no
need to upload it to GitHub:

```yaml
name: Example
on: push
jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - run: echo ready
        unexpected-key: true
```

Check the workflow structure with the optional script linters disabled:

```sh
actionlint -shellcheck= -pyflakes= workflow.yml
```

Expect an unexpected-key diagnostic for the step. Remove `unexpected-key: true`
and rerun; that diagnostic should disappear. This exercises actionlint's own
workflow checks without installing ShellCheck or Pyflakes. The
[check reference](https://github.com/rhysd/actionlint/blob/main/docs/checks.md#check-unexpected-keys)
and [usage guide](https://github.com/rhysd/actionlint/blob/main/docs/usage.md)
describe the diagnostic and integration flags.

For a real repository, check its `.github/workflows` files and configure custom
runner labels when needed. Enable external script linters deliberately;
[ShellCheck](../shellcheck/) findings still depend on the selected shell context.

## Read the diagnostic context

Review the expression, input, or workflow field named by the report. Keep a real CI run as part of validation: credentials, network access, service behavior, and job runtime are outside a static workflow check.
