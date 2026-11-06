---
title: PSScriptAnalyzer
description: Review PowerShell scripts and modules with selected static-analysis rules.
tool:
  aliases: [PSSA, PowerShell ScriptAnalyzer]
  searchTerms: [PowerShell linter, PowerShell source analysis, ps1, psm1, DiagnosticRecord]
  decision:
    useWhen: Review PowerShell source with a selected set of script-quality rules without running the script.
    result: DiagnosticRecord objects with a rule name, severity, source location, and message.
    limit: Enabled rules and suppressions determine coverage. Diagnostics do not validate every external command or runtime effect.
  analysisWorkflows:
    - id: powershell-output-rule
      label: PowerShell output convention check
      subject: component
      inputs: [Source code]
      languageScope: source
      languages: [PowerShell]
      findings: [Coding conventions]
      hostPlatforms: [Windows]
      caveat: PSScriptAnalyzer 1.25.0 on PowerShell 7.6 for Windows, selecting PSAvoidUsingWriteHost. Other rules, hosts, and target runtime compatibility need their own configuration review.
      sources:
        - https://learn.microsoft.com/en-us/powershell/module/psscriptanalyzer/invoke-scriptanalyzer?view=ps-modules
        - https://learn.microsoft.com/en-us/powershell/utility-modules/psscriptanalyzer/rules/avoidusingwritehost?view=ps-modules
        - https://raw.githubusercontent.com/PowerShell/PSScriptAnalyzer/1.25.0/Engine/PSScriptAnalyzer.psm1
  modes: [Static]
  inputTypes: [Source code]
  techniques: [Linting]
  languages: [PowerShell]
  languageNote: PowerShell scripts, modules, and manifests. The PowerShell version hosting the analyzer is separate from the intended runtime and compatibility rules for the target script.
  targets: [PowerShell scripts, PowerShell modules, PowerShell manifests]
  findings: [Coding conventions]
  findingNote: The reviewed matching workflow selects PSAvoidUsingWriteHost. Broader built-in and custom rule sets need separate selection and interpretation.
  environment: PSScriptAnalyzer 1.25.0; its PowerShell Core loader requires 7.4.6 or later. The fixture was checked on Windows with PowerShell 7.6.9.
  setup: Install and import the selected module version, then pass an explicit script path and rule selection to Invoke-ScriptAnalyzer. Leave Fix disabled for inspection.
  licenseCategory: Open source
  license: MIT
  cost: [Free]
  costNote: Free open-source module; no hosted analysis service is required for the local check.
  website: https://github.com/PowerShell/PSScriptAnalyzer
  verified: '2026-11-06'
  scope: PSScriptAnalyzer 1.25.0 source inspection, with one named output-convention rule in matching. Formatting, fixes, and broad runtime-compatibility claims are outside this first workflow.
  sources:
    - label: Purpose and installation
      url: https://learn.microsoft.com/en-us/powershell/utility-modules/psscriptanalyzer/overview?view=ps-modules
    - label: Path, rule, result, and exit controls
      url: https://learn.microsoft.com/en-us/powershell/module/psscriptanalyzer/invoke-scriptanalyzer?view=ps-modules
    - label: Write-Host diagnostic and intended output
      url: https://learn.microsoft.com/en-us/powershell/utility-modules/psscriptanalyzer/rules/avoidusingwritehost?view=ps-modules
    - label: Selected release
      url: https://github.com/PowerShell/PSScriptAnalyzer/releases/tag/1.25.0
    - label: Release-specific PowerShell prerequisite
      url: https://raw.githubusercontent.com/PowerShell/PSScriptAnalyzer/1.25.0/Engine/PSScriptAnalyzer.psm1
    - label: MIT license
      url: https://raw.githubusercontent.com/PowerShell/PSScriptAnalyzer/1.25.0/LICENSE
---

## First try

**Executed on Windows with PowerShell 7.6.9 and PSScriptAnalyzer 1.25.0.** The faulty file produced one `PSAvoidUsingWriteHost` warning at line 2; the corrected file produced none. The target scripts were not run.

Install the selected module into your user scope and import that version:

```powershell
Install-Module PSScriptAnalyzer -RequiredVersion 1.25.0 -Scope CurrentUser
Import-Module PSScriptAnalyzer -RequiredVersion 1.25.0
```

Save this as `greeting.ps1`:

```powershell
function Get-Greeting {
    Write-Host 'Hello, Ada'
}
```

Inspect the file with the named rule, without `-Fix`:

```powershell
Invoke-ScriptAnalyzer -Path ./greeting.ps1 -IncludeRule PSAvoidUsingWriteHost |
    Select-Object RuleName, Severity, Line, Message
```

The diagnostic asks whether display-only output is appropriate. To return this function's greeting through the pipeline, replace `Write-Host` with `Write-Output` and repeat the check. A deliberate display function can have a different design; the rule is not a claim that every `Write-Host` use is a defect.

The repository retains the pair in [`examples/powershell-check`](https://github.com/zwadhams/ToolWiki/tree/main/examples/powershell-check). Use explicit `-IncludeRule` or a reviewed settings file as you expand the check.

## Interpret records before choosing a CI gate

Ordinary command completion does not mean that no diagnostics were returned. Inspect the returned records and execution errors separately. `-EnableExit` terminates the PowerShell session and uses the number of error records for its status; it is not a general gate for every warning. Define which severities and rules block your change, and retain the records with the [run record](../../guides/run-record/).

## Related checks

[ShellCheck](../shellcheck/) covers Bourne-style shell languages, not PowerShell. A general [secret scanner](../detect-secrets/) can complement either source analyzer, with its own candidate-review and exposure-response workflow.
