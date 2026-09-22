---
title: .NET analyzers
description: Run the .NET SDK's Roslyn-based code-quality rules on C# and Visual Basic projects.
tool:
  modes: [Static]
  inputTypes: [Source code]
  techniques: [Linting, Bug finding]
  languages: [C#, VB.NET]
  languageNote: This entry covers the SDK's C# and Visual Basic analyzers. Roslyn is also a compiler and extensibility platform; arbitrary third-party Roslyn analyzers have different coverage.
  targets: [.NET applications, Libraries]
  findings: [Logic errors, Coding conventions, Unsafe API use]
  findingNote: Selected CA rules cover correctness, design, performance, and security concerns. Rule availability and default severity depend on the SDK and configuration; these are not comprehensive security guarantees.
  environment: Windows, Linux, or macOS with a supported .NET SDK. Project-specific targets can impose additional operating-system requirements.
  setup: Provide a buildable project and dependencies. Check whether SDK analysis is enabled, then configure analysis level and individual rule severities as needed.
  licenseCategory: Open source
  license: MIT for the .NET SDK implementation
  cost: [Free]
  costNote: SDK analyzers can run for free through dotnet build. A paid Visual Studio license is not required for this CLI workflow; IDE products have separate terms.
  website: https://learn.microsoft.com/en-us/dotnet/fundamentals/code-analysis/overview
  verified: '2026-09-22'
  scope: First-party .NET SDK code-quality analyzers and CA diagnostics. Code-style IDE rules, compiler diagnostics, and third-party analyzer packages are distinct sets.
  sources:
    - label: SDK analyzers and enabling analysis
      url: https://learn.microsoft.com/en-us/dotnet/fundamentals/code-analysis/overview
    - label: Rule configuration
      url: https://learn.microsoft.com/en-us/dotnet/fundamentals/code-analysis/configuration-options
    - label: CA2014 stack allocation rule
      url: https://learn.microsoft.com/en-us/dotnet/fundamentals/code-analysis/quality-rules/ca2014
    - label: SDK license
      url: https://github.com/dotnet/sdk/blob/main/LICENSE.TXT
    - label: OCPP study
      url: https://www.cs.montana.edu/izurieta/pubs/CSR_2026_Wadhams.pdf
---

## What it does

The .NET SDK includes analyzers that use compiler information to check source code. They can run during a build and in a compatible editor. The documented default enables SDK analysis for projects targeting .NET 5 or later, but the selected rules still depend on configuration and SDK version.

## Example

**Illustrative configuration, not run here.** In a C# SDK project with analysis enabled, add a rule severity to the project's `.editorconfig`:

```ini
[*.cs]
dotnet_diagnostic.CA2014.severity = warning
```

Run `dotnet build`. Rule CA2014 flags `stackalloc` inside loops because repeated stack allocation can exhaust stack space. To check the configuration, use a small method containing that construct and then a revision with allocation moved outside the loop.

Record the SDK version and effective configuration. Do not infer that every CA rule runs just because one warning appeared.

## Limits

An analyzer's finding is different from a compiler error or an IDE style suggestion. Generated code, disabled rules, and severity settings can change what a build reports. Inspect the documented rule scope when comparing results with [CodeQL](../codeql/) or [SonarQube](../sonarqube/).

## Related research

Our [OCPP study](https://www.cs.montana.edu/izurieta/pubs/CSR_2026_Wadhams.pdf) identifies the C# analyzer as Roslyn. That label does not establish the exact package, SDK, or rule set used. I link this related implementation in [Comparing SAST tools](../../research/comparing-tools/) without assigning the historical findings to today's SDK defaults.
