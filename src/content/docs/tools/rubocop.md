---
title: "RuboCop"
description: "Check Ruby source for coding conventions and selected bug patterns with configurable cops."
tool:
  analysisWorkflows:
    - id: source
      label: Source analysis
      subject: component
      inputs:
        - Source code
      languageScope: source
      languages:
        - Ruby
      findings:
        - Logic errors
        - Coding conventions
        - Code complexity
      caveat: Cops cover selected lint, style, and metric rules. Enabled departments, target Ruby version,
        and exclusions determine coverage.
      sources:
        - https://raw.githubusercontent.com/rubocop/rubocop/master/README.md
        - https://docs.rubocop.org/rubocop/1.61/usage/basic_usage.html
        - https://raw.githubusercontent.com/rubocop/rubocop/master/LICENSE.txt
      requires: []
  aliases: ["Rubo Cop"]
  searchTerms: ["Ruby linter","Ruby code quality","Ruby style","Ruby linting"]
  modes: ["Static"]
  inputTypes: ["Source code"]
  techniques: ["Linting","Bug finding"]
  languages: ["Ruby"]
  languageNote: "Core Ruby cops. Rails, RSpec, and other extensions require separate packages and configuration."
  targets: ["Ruby applications","Libraries"]
  findings: ["Logic errors","Coding conventions","Code complexity"]
  findingNote: "Cops cover selected lint, style, and metric rules. Enabled departments, target Ruby version, and exclusions determine coverage."
  environment: "A supported Ruby environment, commonly with Bundler for project version control."
  setup: "Install the gem, supply Ruby files, and configure .rubocop.yml and the target Ruby version."
  license: "MIT"
  costNote: "Free open-source analyzer and formatter. Hosted integrations are optional and may have separate terms."
  website: "https://github.com/rubocop/rubocop"
  scope: "Core RuboCop analysis; framework extensions and automatic correction have their own scope."
  licenseCategory: "Open source"
  cost: ["Free"]
  verified: "2026-09-26"
  sources:
    - label: "Project purpose and usage"
      url: https://raw.githubusercontent.com/rubocop/rubocop/master/README.md
    - label: "Documented CLI workflow"
      url: https://docs.rubocop.org/rubocop/1.61/usage/basic_usage.html
    - label: "License"
      url: https://raw.githubusercontent.com/rubocop/rubocop/master/LICENSE.txt
---

## Where it fits

Use RuboCop for consistent Ruby conventions and selected code problems. [Brakeman](../brakeman/) provides a separate Rails security-analysis workflow.

## Start with reporting

Use the documented CLI to inspect a small directory before enabling automatic correction. Record the gem version, target Ruby version, and configured cops. The linked versioned usage guide illustrates core CLI behavior; consult the installed release for defaults and new cops.

## Review corrections and limits

Distinguish reporting from rewriting code. Review the safety classification of a correction and run tests after applying it. A framework extension's checks are not automatically included in core RuboCop. Suppressed offenses and baseline files need review rather than being treated as resolved defects.
