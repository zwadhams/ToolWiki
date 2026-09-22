# Ghidra: evidence record

Access/review date: 2026-09-22. Existing scope: CodeBrowser and offline binary analysis. Ghidra also includes debugger capabilities, which are outside this entry's Static mode tag.

File: `src/content/docs/tools/ghidra.md`. Baseline SHA-256: `d3bbd13c32acc5dc7a05502a31be09d208ff4d8ccd340ffae2cf65b9f1c8b1b6`. Reviewed SHA-256: `d3bbd13c32acc5dc7a05502a31be09d208ff4d8ccd340ffae2cf65b9f1c8b1b6`. Original text is preserved in baseline.json.

Status: Assessed against primary documentation; see qualifications below.

## E1: evidence assessment

Ghidra supports disassembly, decompilation, graphing and scripting across processor formats, on Windows/Linux/macOS with the release JDK. The launch scripts and import/CodeBrowser workflow are documented. Reconstructed code is not the original source. Apache-2.0 applies to the framework with bundled notices. Debugger capabilities exist but are outside the explicitly static entry.

Source sections: Repository: Features, Install, License; Getting Started: platforms and launch; original malware paper

- [S1](https://github.com/NationalSecurityAgency/ghidra)
- [S2](https://github.com/NationalSecurityAgency/ghidra/blob/master/GhidraDocs/GettingStarted.md)
- [S3](https://www.cs.montana.edu/izurieta/pubs/iETC_Porcella_2026.pdf)

Correction: No content correction recorded.

## Claims and dispositions

Counts: {"supported":23,"supported with qualification":8,"contradicted":0,"unresolved":0}. Compound paragraphs retain their qualifications; list-valued fields are assessed member by member. Quoted relative links point to the corresponding repository Markdown pages.

| Location | Claim as reviewed | Verdict | Evidence / limitation |
| --- | --- | --- | --- |
| title | Ghidra | supported | See evidence assessment E1. |
| description | Recover and inspect code structure from compiled programs with disassembly and decompilation. | supported | See evidence assessment E1. |
| tool.modes[0] | Static | supported | See evidence assessment E1. |
| tool.inputTypes[0] | Binaries | supported | See evidence assessment E1. |
| tool.techniques[0] | Binary analysis | supported | See evidence assessment E1. |
| tool.techniques[1] | Disassembly | supported | See evidence assessment E1. |
| tool.techniques[2] | Decompilation | supported | See evidence assessment E1. |
| tool.languages[0] | Language independent | supported | See evidence assessment E1. |
| tool.languageNote | Support depends on executable format, processor language, and compiler conventions. Java and Python scripting support does not describe the source languages analyzed. | supported | See evidence assessment E1. |
| tool.targets[0] | Native binaries | supported | See evidence assessment E1. |
| tool.targets[1] | Firmware | supported | See evidence assessment E1. |
| tool.findings[0] | Code structure | supported | See evidence assessment E1. |
| tool.findingNote | Produces disassembly, recovered functions, references, and decompiled code for investigation. These are analysis aids, not an automatic list of confirmed vulnerabilities. | supported | See evidence assessment E1. |
| tool.environment | Windows, Linux, and macOS with the JDK required by the selected Ghidra release. | supported | See evidence assessment E1. |
| tool.setup | Import a supported executable and select the appropriate architecture and analysis options. Raw firmware can require a load address, memory map, and manual setup. | supported | See evidence assessment E1. |
| tool.licenseCategory | Open source | supported | See evidence assessment E1. |
| tool.license | Apache-2.0 for Ghidra; bundled components can have separate licenses | supported | See evidence assessment E1. |
| tool.cost[0] | Free | supported | See evidence assessment E1. |
| tool.costNote | Free desktop and headless analysis framework. No paid edition is needed for the disassembly and decompilation workflow described here. | supported | See evidence assessment E1. |
| tool.website | https://ghidra-sre.org/ | supported | See evidence assessment E1. |
| tool.verified | 2026-09-22 | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.scope | CodeBrowser and offline binary analysis. Ghidra also includes debugger capabilities, which are outside this entry's Static mode tag. | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.sources[0] | Features, installation, and licensing: https://github.com/NationalSecurityAgency/ghidra | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.sources[1] | Getting started and importing programs: https://github.com/NationalSecurityAgency/ghidra/blob/master/GhidraDocs/GettingStarted.md | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.sources[2] | Malware sophistication paper: https://www.cs.montana.edu/izurieta/pubs/iETC_Porcella_2026.pdf | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| What it does, line 33 | Ghidra helps an analyst work from machine instructions toward an understanding of a program. The listing, decompiler, function graph, and cross-references provide different views of the same artifact. Renaming functions and correcting types can improve that reconstruction. | supported | See evidence assessment E1. |
| Example, line 37 | **Illustrative workflow, not run here.** Install a release and its required JDK, then launch `ghidraRun.bat` on Windows or `ghidraRun` on Linux/macOS. Create a project and import a small program you compiled yourself. | supported with qualification | Author recommendation or conditional inference, not a measured effectiveness claim. Factual premises reviewed against E1. |
| Example, line 39 | Open it in CodeBrowser, accept the relevant analysis options, and locate a function with a recognizable string. Follow its references and compare the decompiler view with the source and disassembly. Keep the executable and build settings with your notes. | supported with qualification | Author recommendation or conditional inference, not a measured effectiveness claim. Factual premises reviewed against E1. |
| Limits, line 43 | Decompiled output is a reconstruction, not the original source. Stripped symbols, optimization, indirect calls, and obfuscation can obscure structure. A plausible function name or type still needs supporting evidence. | supported | See evidence assessment E1. |
| Limits, line 45 | For predefined weakness checks, see [cwe-checker](../../../src/content/docs/tools/cwe-checker.md). For a programmable path exploration workflow, see [angr](../../../src/content/docs/tools/angr.md). | supported | See evidence assessment E1. |
| Related research, line 49 | In our [malware sophistication paper](https://www.cs.montana.edu/izurieta/pubs/iETC_Porcella_2026.pdf), we discuss Ghidra in the context of binary analysis and obfuscation. We did not benchmark its detection performance. I connect this entry to [Malware sophistication](../../../src/content/docs/research/binary-analysis.md) because recovered structure affects how software quality can be interpreted. | supported with qualification | Historical attribution only; see the research reconciliation record. No current-edition performance inference. |
