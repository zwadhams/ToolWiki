---
title: "SwiftLint"
description: "Check Swift source against selected style, convention, and code-quality rules."
tool:
  aliases: ["Swift Lint"]
  searchTerms: ["Swift linter","Swift code quality","Swift style"]
  modes: ["Static"]
  inputTypes: ["Source code"]
  techniques: ["Linting"]
  languages: ["Swift"]
  languageNote: "Swift source. Match the toolchain and rule set; analyzer rules have additional build-information requirements."
  targets: ["Swift applications","Libraries"]
  findings: ["Coding conventions","Logic errors"]
  findingNote: "Selected lint and analyzer rules; opt-in rules do not run merely because they exist in the rule catalog."
  environment: "Documented macOS and Linux workflows with compatible Swift tooling; some checks use SourceKit."
  setup: "Provide Swift files and .swiftlint.yml. Match the Swift toolchain; the analyze workflow also needs compiler invocation information."
  license: "MIT"
  costNote: "Free open-source project. No paid analyzer edition is required for the documented local workflow."
  website: "https://github.com/realm/SwiftLint"
  scope: "SwiftLint's configured lint and analyzer rules; not comprehensive Swift security analysis."
  licenseCategory: "Open source"
  cost: ["Free"]
  verified: "2026-09-26"
  sources:
    - label: "Installation, configuration, and toolchains"
      url: https://github.com/realm/SwiftLint
    - label: "Rule descriptions and examples"
      url: https://realm.github.io/SwiftLint/rule-directory.html
    - label: "License"
      url: https://github.com/realm/SwiftLint/blob/main/LICENSE
---

## Where it fits

Use SwiftLint to make a project's Swift conventions and selected quality checks repeatable. Review the rule directory to decide which findings are useful rather than enabling every rule indiscriminately.

## Configure the intended workflow

Start with linting a small source set and an explicit configuration. Keep included paths, excluded paths, and opt-in rules visible in review. Use the same Swift toolchain as the project.

## Interpret coverage

Some analyzer rules need compiler information beyond ordinary linting. Record which workflow ran and whether that information was available. Automatic fixes and diagnostic suppression should be reviewed with the project's tests; a successful lint run does not validate runtime behavior.
