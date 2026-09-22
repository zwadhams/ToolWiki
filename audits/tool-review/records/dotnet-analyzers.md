# .NET analyzers: evidence record

Access/review date: 2026-09-22. Existing scope: First-party .NET SDK code-quality analyzers and CA diagnostics. Code-style IDE rules, compiler diagnostics, and third-party analyzer packages are distinct sets.

File: `src/content/docs/tools/dotnet-analyzers.md`. Baseline SHA-256: `b4c1d9aa79133b3765e57060290872ddce6e63bacf11bf63866927101e278f20`. Reviewed SHA-256: `b4c1d9aa79133b3765e57060290872ddce6e63bacf11bf63866927101e278f20`. Original text is preserved in baseline.json.

Status: Assessed against primary documentation; see qualifications below.

## E1: evidence assessment

The SDK documentation identifies C#/Visual Basic source analyzers and default enablement for .NET 5+ targets. Analysis enablement does not enable every rule. The severity syntax and CA2014 stackalloc-in-loop explanation match Microsoft documentation. SDK CLI use is separate from Visual Studio licensing and project-specific host requirements. Roslyn in the study is correctly treated as an unspecified historical analyzer rather than current SDK defaults.

Source sections: .NET code analysis overview: CA rules, SDK defaults and IDE rules; Configuration options; CA2014; SDK MIT LICENSE

- [S1](https://learn.microsoft.com/en-us/dotnet/fundamentals/code-analysis/overview)
- [S2](https://learn.microsoft.com/en-us/dotnet/fundamentals/code-analysis/configuration-options)
- [S3](https://learn.microsoft.com/en-us/dotnet/fundamentals/code-analysis/quality-rules/ca2014)
- [S4](https://github.com/dotnet/sdk/blob/main/LICENSE.TXT)
- [S5](https://www.cs.montana.edu/izurieta/pubs/CSR_2026_Wadhams.pdf)

Correction: No content correction recorded.

## Claims and dispositions

Counts: {"supported":24,"supported with qualification":12,"contradicted":0,"unresolved":0}. Compound paragraphs retain their qualifications; list-valued fields are assessed member by member. Quoted relative links point to the corresponding repository Markdown pages.

| Location | Claim as reviewed | Verdict | Evidence / limitation |
| --- | --- | --- | --- |
| title | .NET analyzers | supported | See evidence assessment E1. |
| description | Run the .NET SDK's Roslyn-based code-quality rules on C# and Visual Basic projects. | supported | See evidence assessment E1. |
| tool.modes[0] | Static | supported | See evidence assessment E1. |
| tool.inputTypes[0] | Source code | supported | See evidence assessment E1. |
| tool.techniques[0] | Linting | supported | See evidence assessment E1. |
| tool.techniques[1] | Bug finding | supported | See evidence assessment E1. |
| tool.languages[0] | C# | supported | See evidence assessment E1. |
| tool.languages[1] | VB.NET | supported | See evidence assessment E1. |
| tool.languageNote | This entry covers the SDK's C# and Visual Basic analyzers. Roslyn is also a compiler and extensibility platform; arbitrary third-party Roslyn analyzers have different coverage. | supported | See evidence assessment E1. |
| tool.targets[0] | .NET applications | supported | See evidence assessment E1. |
| tool.targets[1] | Libraries | supported | See evidence assessment E1. |
| tool.findings[0] | Logic errors | supported | See evidence assessment E1. |
| tool.findings[1] | Coding conventions | supported | See evidence assessment E1. |
| tool.findings[2] | Unsafe API use | supported | See evidence assessment E1. |
| tool.findingNote | Selected CA rules cover correctness, design, performance, and security concerns. Rule availability and default severity depend on the SDK and configuration; these are not comprehensive security guarantees. | supported | See evidence assessment E1. |
| tool.environment | Windows, Linux, or macOS with a supported .NET SDK. Project-specific targets can impose additional operating-system requirements. | supported | See evidence assessment E1. |
| tool.setup | Provide a buildable project and dependencies. Check whether SDK analysis is enabled, then configure analysis level and individual rule severities as needed. | supported | See evidence assessment E1. |
| tool.licenseCategory | Open source | supported | See evidence assessment E1. |
| tool.license | MIT for the .NET SDK implementation | supported | See evidence assessment E1. |
| tool.cost[0] | Free | supported | See evidence assessment E1. |
| tool.costNote | SDK analyzers can run for free through dotnet build. A paid Visual Studio license is not required for this CLI workflow; IDE products have separate terms. | supported | See evidence assessment E1. |
| tool.website | https://learn.microsoft.com/en-us/dotnet/fundamentals/code-analysis/overview | supported | See evidence assessment E1. |
| tool.verified | 2026-09-22 | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.scope | First-party .NET SDK code-quality analyzers and CA diagnostics. Code-style IDE rules, compiler diagnostics, and third-party analyzer packages are distinct sets. | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.sources[0] | SDK analyzers and enabling analysis: https://learn.microsoft.com/en-us/dotnet/fundamentals/code-analysis/overview | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.sources[1] | Rule configuration: https://learn.microsoft.com/en-us/dotnet/fundamentals/code-analysis/configuration-options | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.sources[2] | CA2014 stack allocation rule: https://learn.microsoft.com/en-us/dotnet/fundamentals/code-analysis/quality-rules/ca2014 | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.sources[3] | SDK license: https://github.com/dotnet/sdk/blob/main/LICENSE.TXT | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.sources[4] | OCPP study: https://www.cs.montana.edu/izurieta/pubs/CSR_2026_Wadhams.pdf | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| What it does, line 37 | The .NET SDK includes analyzers that use compiler information to check source code. They can run during a build and in a compatible editor. The documented default enables SDK analysis for projects targeting .NET 5 or later, but the selected rules still depend on configuration and SDK version. | supported | See evidence assessment E1. |
| Example, line 41 | **Illustrative configuration, not run here.** In a C# SDK project with analysis enabled, add a rule severity to the project's `.editorconfig`: | supported with qualification | Author recommendation or conditional inference, not a measured effectiveness claim. Factual premises reviewed against E1. |
| Example, line 43 | ```ini<br>[*.cs]<br>dotnet_diagnostic.CA2014.severity = warning<br>``` | supported with qualification | Documentation/static reasoning only; this example has not been executed. See E1. |
| Example, line 48 | Run `dotnet build`. Rule CA2014 flags `stackalloc` inside loops because repeated stack allocation can exhaust stack space. To check the configuration, use a small method containing that construct and then a revision with allocation moved outside the loop. | supported with qualification | Author recommendation or conditional inference, not a measured effectiveness claim. Factual premises reviewed against E1. |
| Example, line 50 | Record the SDK version and effective configuration. Do not infer that every CA rule runs just because one warning appeared. | supported with qualification | Author recommendation or conditional inference, not a measured effectiveness claim. Factual premises reviewed against E1. |
| Limits, line 54 | An analyzer's finding is different from a compiler error or an IDE style suggestion. Generated code, disabled rules, and severity settings can change what a build reports. Inspect the documented rule scope when comparing results with [CodeQL](../../../src/content/docs/tools/codeql.md) or [SonarQube](../../../src/content/docs/tools/sonarqube.md). | supported | See evidence assessment E1. |
| Related research, line 58 | Our [OCPP study](https://www.cs.montana.edu/izurieta/pubs/CSR_2026_Wadhams.pdf) identifies the C# analyzer as Roslyn. That label does not establish the exact package, SDK, or rule set used. I link this related implementation in [Comparing SAST tools](../../../src/content/docs/research/comparing-tools.md) without assigning the historical findings to today's SDK defaults. | supported with qualification | Historical attribution only; see the research reconciliation record. No current-edition performance inference. |
