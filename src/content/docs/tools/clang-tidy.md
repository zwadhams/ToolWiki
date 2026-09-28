---
title: clang-tidy
description: Check C and C++ source for selected bugs, coding conventions, and modernization opportunities using Clang-based rules.
tool:
  analysisWorkflows:
    - id: source
      label: Source analysis
      subject: component
      inputs:
        - Source code
      languageScope: source
      languages:
        - C
        - C++
      findings:
        - Logic errors
        - Coding conventions
        - Unsafe API use
      caveat: Coverage depends on enabled checks and successful parsing. clang-analyzer checks can be
        selected, but their availability does not mean every analyzer runs by default.
      sources:
        - https://clang.llvm.org/extra/clang-tidy/
        - https://clang.llvm.org/docs/HowToSetupToolingForLLVM.html
        - https://clang.llvm.org/extra/clang-tidy/checks/modernize/use-nullptr.html
        - https://llvm.org/docs/GettingStarted.html
        - https://github.com/llvm/llvm-project/blob/main/clang-tools-extra/LICENSE.TXT
      requires: []
      hostPlatforms:
        - Windows
        - Linux
        - macOS
  aliases: [Clang Tidy, clangtidy]
  searchTerms: [C++ linter, C linter, modernization, readability, clang tidy checks, automatic fixes]
  modes: [Static]
  inputTypes: [Source code]
  techniques: [Linting, Bug finding]
  languages: [C, C++]
  languageNote: This entry covers C and C++ source. Individual checks have language-standard and version requirements; many modernization checks apply specifically to C++.
  targets: [Native programs, Libraries]
  findings: [Logic errors, Coding conventions, Unsafe API use]
  findingNote: Coverage depends on enabled checks and successful parsing. clang-analyzer checks can be selected, but their availability does not mean every analyzer runs by default.
  environment: LLVM/Clang installations on supported hosts such as Linux, macOS, and Windows that include clang-tidy.
  setup: Provide source, headers, and accurate compilation flags. A compile_commands.json database is useful for projects; a small file can use flags after --. No runtime harness is required.
  licenseCategory: Open source
  license: Apache-2.0 WITH LLVM-exception, with retained notices where applicable
  cost: [Free]
  costNote: Free LLVM tool. Local analysis and supported fixes do not require a paid analyzer edition.
  website: https://clang.llvm.org/extra/clang-tidy/
  verified: '2026-09-26'
  scope: clang-tidy's configurable source checks and fixes. A separate Clang Static Analyzer entry describes its path-sensitive analysis workflow.
  sources:
    - label: Check selection, configuration, and usage
      url: https://clang.llvm.org/extra/clang-tidy/
    - label: Compilation database setup
      url: https://clang.llvm.org/docs/HowToSetupToolingForLLVM.html
    - label: modernize-use-nullptr check
      url: https://clang.llvm.org/extra/clang-tidy/checks/modernize/use-nullptr.html
    - label: LLVM host requirements
      url: https://llvm.org/docs/GettingStarted.html
    - label: Extra Clang tools license
      url: https://github.com/llvm/llvm-project/blob/main/clang-tools-extra/LICENSE.TXT
---

## Where it fits

Use clang-tidy for repeatable source checks during development or code review. Select the check families your project needs, and record the configuration in `.clang-tidy`.

It can invoke checks from [Clang Static Analyzer](../clang-static-analyzer/), alongside its own rules. Treat the selected checks as the scope of a run; the tool name alone does not identify that scope.

## Worked example: a null pointer constant

**Illustrative example, not run here.** With clang-tidy installed, save this C++ source as `sample.cpp`:

```cpp
int* missing_value() {
    return 0;
}
```

Select one check and supply the language standard:

```sh
clang-tidy sample.cpp '-checks=-*,modernize-use-nullptr' -- -std=c++11
```

The intended suggestion is to use `nullptr` for the returned null pointer. This command reports diagnostics without requesting automatic edits. Change `0` to `nullptr` and run it again.

## Project setup and limits

For a project, point `-p` at the directory containing its compilation database. Missing include paths, generated headers, or build definitions can prevent useful analysis.

Review fixes and run project tests before accepting them. Compare [Cppcheck](../cppcheck/) for another native-source workflow, or [compare the three tools](../../compare/?tools=tools%2Fclang-tidy%2Ctools%2Fclang-static-analyzer%2Ctools%2Fcppcheck).
