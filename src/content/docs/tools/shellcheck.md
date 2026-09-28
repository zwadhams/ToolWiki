---
title: ShellCheck
description: Find quoting mistakes, portability problems, and other bugs in shell scripts without executing them.
tool:
  analysisWorkflows:
    - id: source
      label: Source analysis
      subject: component
      inputs:
        - Source code
      languageScope: source
      languages:
        - Bash
        - POSIX sh
        - Dash
        - Ksh
        - BusyBox sh
      findings:
        - Logic errors
        - Coding conventions
        - Portability issues
      caveat: Syntax and semantic checks include quoting, expansion, and shell-dialect mistakes. Findings
        depend on the selected dialect and the code that can be inspected statically.
      sources:
        - https://github.com/koalaman/shellcheck
        - https://github.com/koalaman/shellcheck/blob/master/shellcheck.1.md
        - https://www.shellcheck.net/wiki/SC2086
        - https://github.com/koalaman/shellcheck/blob/master/ShellCheck.cabal
        - https://github.com/koalaman/shellcheck/blob/master/LICENSE
      requires: []
      hostPlatforms:
        - Windows
        - Linux
        - macOS
  aliases: [Shell Check]
  searchTerms: [shell linter, bash linter, shell scripts, quoting, word splitting, globbing, shell portability]
  modes: [Static]
  inputTypes: [Source code]
  techniques: [Linting, Bug finding]
  languages: [Bash, POSIX sh, Dash, Ksh, BusyBox sh]
  languageNote: Supported Bourne-style dialects are selected from the shebang, a directive, or an explicit shell option. This is not a PowerShell, fish, or general-purpose shell analyzer.
  targets: [Shell scripts, Build scripts, CI scripts]
  findings: [Logic errors, Coding conventions, Portability issues]
  findingNote: Syntax and semantic checks include quoting, expansion, and shell-dialect mistakes. Findings depend on the selected dialect and the code that can be inspected statically.
  environment: Command-line distributions for Linux, macOS, and Windows, plus editor integrations and a browser interface.
  setup: Supply a script and its intended shell dialect. Configure access to sourced files when needed. The target script does not need to be executed.
  licenseCategory: Open source
  license: GPL-3.0
  cost: [Free]
  costNote: Free open-source command-line analyzer. A paid service is not required to check local scripts.
  website: https://www.shellcheck.net/
  verified: '2026-09-26'
  scope: ShellCheck's documented Bourne-shell analysis and selected diagnostics. Runtime command behavior and every possible expansion are outside its guarantees.
  sources:
    - label: Purpose, installation, and integrations
      url: https://github.com/koalaman/shellcheck
    - label: Dialects, options, and source-file handling
      url: https://github.com/koalaman/shellcheck/blob/master/shellcheck.1.md
    - label: SC2086 expansion diagnostic
      url: https://www.shellcheck.net/wiki/SC2086
    - label: Package license declaration
      url: https://github.com/koalaman/shellcheck/blob/master/ShellCheck.cabal
    - label: License
      url: https://github.com/koalaman/shellcheck/blob/master/LICENSE
---

## Where it fits

Use ShellCheck on shell scripts in local projects, build steps, or CI jobs. It reports diagnostic codes with explanations, making it useful for reviewing a script without executing its commands.

Choose the intended dialect. A script meant for POSIX `sh` can have portability problems even when it happens to run under Bash on your machine.

## Worked example: an unquoted expansion

**Illustrative example, not run here.** Save this as `sample.sh`:

```sh
#!/bin/sh
file_name='quarterly report.txt'
printf '%s\n' $file_name
```

Analyze the file with ShellCheck installed:

```sh
shellcheck sample.sh
```

The intended SC2086 warning concerns word splitting and filename expansion. For this example, change the last argument to `"$file_name"` and run the check again. Quoting preserves the value as one argument; it is not merely a formatting preference.

## Limits and configuration

Source-file resolution and dynamic code can affect what is visible to the analyzer. Set source paths and external-source options deliberately, and explain diagnostic suppressions. Use the matching diagnostic's documentation before accepting a suggested change.

ShellCheck does not execute the script to verify filesystem state, external command results, or operational effects. Keep runtime tests for those behaviors, and record the tool version and shell selection with review results.
