---
title: "SQLFluff"
description: "Lint SQL files using a selected dialect, templater, and rule configuration."
tool:
  aliases: ["SQL Fluff"]
  searchTerms: ["SQL linter","SQL linting","SQL style","SQL dialect","dbt"]
  modes: ["Static"]
  inputTypes: ["Source code"]
  techniques: ["Linting"]
  languages: ["SQL"]
  languageNote: "Supported SQL dialects differ. Templated SQL needs the matching templater and configuration; dbt integration has additional prerequisites."
  targets: ["SQL queries","Templated SQL"]
  findings: ["Coding conventions","Coding-standard violations"]
  findingNote: "Reports selected parsing and lint issues. It does not prove query correctness or predict database execution performance."
  environment: "A supported Python environment; CLI and project integrations are documented."
  setup: "Provide SQL files, choose the dialect, and configure the templater and lint rules."
  license: "MIT"
  costNote: "Free open-source linter. Database, transformation-platform, and CI costs are separate."
  website: "https://docs.sqlfluff.com/en/stable/"
  scope: "SQLFluff linting and documented dialect parsing; query execution and database security assessment are excluded."
  licenseCategory: "Open source"
  cost: ["Free"]
  verified: "2026-09-26"
  sources:
    - label: "Overview"
      url: https://docs.sqlfluff.com/en/stable/
    - label: "Installation and first lint run"
      url: https://docs.sqlfluff.com/en/stable/gettingstarted.html
    - label: "Dialect reference"
      url: https://docs.sqlfluff.com/en/stable/reference/dialects.html
    - label: "License"
      url: https://raw.githubusercontent.com/sqlfluff/sqlfluff/main/LICENSE.md
---

## Where it fits

Use SQLFluff for SQL conventions and selected structural checks in query files or a data-transformation project. Choose the actual dialect before interpreting a parse error.

## Start with a representative query

Follow the getting-started guide to lint one SQL file. Configure the dialect and any templating inputs, then inspect whether the rendered SQL parses as intended. Add project-wide linting after this small case works.

## Review fixes and coverage

Linting and fixing are separate actions. Review changes before applying them to a wider query set. A templater or parser failure leaves an analysis gap; it should not be counted as a clean file. Validate query semantics and performance against an appropriate database workflow.
