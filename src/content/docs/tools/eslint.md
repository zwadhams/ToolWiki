---
title: ESLint
description: Apply configurable lint rules to JavaScript and, with typescript-eslint, TypeScript source.
tool:
  modes: [Static]
  inputTypes: [Source code]
  techniques: [Linting, Bug finding]
  languages: [JavaScript, TypeScript]
  languageNote: JavaScript is the core language. TypeScript requires the typescript-eslint parser and rules; rules that use type information require additional configuration. Other plugin languages are outside this entry's scope.
  targets: [Source code]
  licenseCategory: Open source
  license: MIT core; check the licenses of additional plugins
  cost: [Free]
  costNote: Free open-source linter. The documented local JavaScript and typescript-eslint workflows require no paid ESLint plan. Optional support services and hosted CI are separate.
  website: https://eslint.org/
  verified: '2026-09-21'
  scope: ESLint core linting and the official typescript-eslint integration; third-party security and framework plugins need their own coverage review.
  findings: ["Logic errors","Coding conventions"]
  findingNote: "Configured core and plugin rules. TypeScript typed rules require type information; arbitrary security checks are not built into every setup."
  environment: "A host supported by the required Node.js release, including standard Windows, Linux, and macOS workflows."
  setup: "Source and ESLint configuration; TypeScript needs typescript-eslint, with project type information for typed rules. No executable target or runtime harness."
  sources:
    - label: Runtime and configuration prerequisites
      url: https://eslint.org/docs/latest/use/getting-started
    - label: ESLint core concepts and plugin model
      url: https://eslint.org/docs/latest/use/core-concepts/
    - label: ESLint rules
      url: https://eslint.org/docs/latest/rules/
    - label: TypeScript integration
      url: https://typescript-eslint.io/getting-started/
    - label: Linting with TypeScript type information
      url: https://typescript-eslint.io/getting-started/typed-linting/
    - label: ESLint license
      url: https://github.com/eslint/eslint/blob/main/LICENSE
---

## What it does

ESLint parses source and runs configured rules to identify problematic code. Rules cover potential bugs, suspicious constructs, and coding conventions. Plugins add rules, parsers, or support for frameworks and other file types.

It is a configurable linting system. Security plugins can add useful checks, but a default ESLint run is not equivalent to a full security analysis of an application.

## JavaScript versus TypeScript

| Setup | What it provides |
| --- | --- |
| ESLint with its JavaScript parser | JavaScript parsing and the enabled core or plugin rules. |
| ESLint with typescript-eslint | TypeScript parsing and TypeScript-specific lint rules. |
| TypeScript setup with typed linting enabled | Additional rules that use TypeScript's type information, with extra setup and analysis cost. |

For example, the typescript-eslint rule set includes checks for incorrectly handled promises. The relevant rules require type information; adding a TypeScript parser alone does not enable them.

## Inputs and results

Provide source files and a compatible Node.js environment, then configure file patterns, language options, plugins, and rules. The current configuration workflow uses an ESLint configuration file; use guidance matching your installed major version.

Findings include rule names and source locations and can appear in the terminal, an editor, or a CI report. Some rules supply automatic fixes, while others supply suggestions for a developer to review.

## A useful first evaluation

Start with the recommended configuration for your language. For TypeScript, decide whether you need type-aware rules and configure them explicitly. Inspect which files and rules actually run before making lint failures block a build.

Record plugin versions and suppressions. ESLint's capabilities depend strongly on that configuration, so two projects using ESLint may be performing different checks.
