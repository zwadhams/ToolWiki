---
title: "Stylelint"
description: "Lint CSS for rule violations and consistency problems."
tool:
  aliases: []
  searchTerms: ["CSS linter","stylesheet linting","CSS conventions"]
  modes: ["Static"]
  inputTypes: ["Source code"]
  techniques: ["Linting"]
  languages: ["CSS"]
  languageNote: "Core CSS workflow. Other syntaxes and embedded styles need compatible configurations, plugins, or custom syntax packages."
  targets: ["Stylesheets","Web applications"]
  findings: ["Coding conventions"]
  findingNote: "Reports enabled rules. Configuration and parser coverage determine which styles are checked."
  environment: "Node.js and a compatible package manager."
  setup: "Install Stylelint and a selected configuration, add stylelint.config.mjs, and select stylesheet paths."
  license: "MIT"
  costNote: "Free open-source core. Community packages have their own licenses."
  website: "https://stylelint.io/"
  scope: "Stylelint core with a configured CSS ruleset; third-party syntax support is not assumed."
  licenseCategory: "Open source"
  cost: ["Free"]
  verified: "2026-09-26"
  sources:
    - label: "Getting started"
      url: https://stylelint.io/user-guide/get-started/
    - label: "Configuration"
      url: https://stylelint.io/user-guide/configure/
    - label: "License"
      url: https://raw.githubusercontent.com/stylelint/stylelint/main/LICENSE
---

## Where it fits

Stylelint adds a dedicated stylesheet check to a web project. Pair it with [ESLint](../eslint/) when a repository contains both CSS and JavaScript.

## Choose the stylesheet scope

Follow the official setup guide, choose a shared configuration, and start with a small set of CSS files. Record ignored paths and any custom syntax package. Do not assume that a working CSS configuration also understands every preprocessor or component format.

## Review findings

Treat rule changes as a policy change for the project. Review automatic fixes before accepting them, and keep a visual browser check for layout and rendering behavior.
