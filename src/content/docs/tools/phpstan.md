---
title: PHPStan
description: Use PHP types, declarations, and inference to find incorrect calls, invalid access, and other code errors.
tool:
  modes: [Static]
  inputTypes: [Source code]
  techniques: [Type checking, Bug finding]
  languages: [PHP]
  languageNote: PHP source analysis. Runtime and analyzed PHP versions are separate settings; framework-specific behavior may require extensions, stubs, or additional type information.
  targets: [Source code]
  licenseCategory: Open source
  license: MIT for PHPStan; PHPStan Pro is a separate paid add-on
  cost: [Free]
  costNote: The open-source analyzer and its rule levels are free. Optional PHPStan Pro adds a local web interface, continuous analysis, and migration assistance; it is not required for the core analysis listed here.
  editionGroup: phpstan
  website: https://phpstan.org/
  verified: '2026-09-21'
  scope: PHPStan 2.x open-source analysis; optional PHPStan Pro is compared separately.
  findings: ["Type errors","Logic errors"]
  findingNote: "Type and symbol checks depend on rule level, annotations, stubs, and framework extensions. This is not a general injection scanner."
  environment: "A host with a compatible PHP runtime and Composer or PHAR support; application target PHP version is configured separately."
  setup: "Source and discoverable dependency symbols, often through Composer. No ordinary application build or runtime test harness; extensions may need configuration."
  sources:
    - label: PHPStan overview and free analyzer
      url: https://phpstan.org/
    - label: Getting started and symbol discovery
      url: https://phpstan.org/user-guide/getting-started
    - label: Rule levels and type checks
      url: https://phpstan.org/user-guide/rule-levels
    - label: Baseline behavior
      url: https://phpstan.org/user-guide/baseline
    - label: PHPStan Pro functionality
      url: https://phpstan.org/blog/introducing-phpstan-pro
    - label: PHPStan license
      url: https://github.com/phpstan/phpstan/blob/2.1.x/LICENSE
---

## What it does

PHPStan reasons about PHP code using declarations, inferred types, and PHPDoc annotations. Depending on the chosen rule level, it can report undefined symbols, incompatible arguments or return values, invalid member access, and unsafe use of nullable or mixed values.

Its focus is code correctness through static analysis. A clean PHPStan report does not establish that an application is free of injection flaws or other security defects.

## Inputs and setup

Supply your source, PHPStan configuration, and enough dependency information for symbol discovery. Composer installations, stubs, and framework extensions help the analyzer understand libraries and dynamically supplied behavior.

The analyzer's own PHP runtime requirement differs from the PHP version targeted by the application. Set the intended target and consult the requirements of the installed release.

## Rule levels and gradual adoption

Rule levels increase the strictness of analysis. Type hints and accurate PHPDoc give stricter checks more useful information; inaccurate annotations can also make results misleading.

A baseline records existing errors so later checks can focus on new ones. It is useful for adopting analysis in a large codebase, but the recorded errors remain unresolved. Treat the baseline as maintained analysis scope rather than evidence that those errors are harmless.

## When it is useful

Consider it for a PHP application undergoing refactoring, stricter typing, or framework upgrades. For example, changing a method's accepted type can expose incompatible callers before they are reached by tests.

## A useful first evaluation

Follow the official Composer-based setup, analyze your own source directories, and resolve missing-symbol configuration before judging the findings. Choose a rule level you can review, then raise it as type information improves. Keep extensions, target PHP version, and baseline changes under version control.
