---
title: Ghidra
description: Recover and inspect code structure from compiled programs with disassembly and decompilation.
tool:
  modes: [Static]
  inputTypes: [Binaries]
  techniques: [Binary analysis, Disassembly, Decompilation]
  languages: [Language independent]
  languageNote: Support depends on executable format, processor language, and compiler conventions. Java and Python scripting support does not describe the source languages analyzed.
  targets: [Native binaries, Firmware]
  findings: [Code structure]
  findingNote: Produces disassembly, recovered functions, references, and decompiled code for investigation. These are analysis aids, not an automatic list of confirmed vulnerabilities.
  environment: Windows, Linux, and macOS with the JDK required by the selected Ghidra release.
  setup: Import a supported executable and select the appropriate architecture and analysis options. Raw firmware can require a load address, memory map, and manual setup.
  licenseCategory: Open source
  license: Apache-2.0 for Ghidra; bundled components can have separate licenses
  cost: [Free]
  costNote: Free desktop and headless analysis framework. No paid edition is needed for the disassembly and decompilation workflow described here.
  website: https://ghidra-sre.org/
  verified: '2026-09-22'
  scope: CodeBrowser and offline binary analysis. Ghidra also includes debugger capabilities, which are outside this entry's Static mode tag.
  sources:
    - label: Features, installation, and licensing
      url: https://github.com/NationalSecurityAgency/ghidra
    - label: Getting started and importing programs
      url: https://github.com/NationalSecurityAgency/ghidra/blob/master/GhidraDocs/GettingStarted.md
    - label: Malware sophistication paper
      url: https://www.cs.montana.edu/izurieta/pubs/iETC_Porcella_2026.pdf
---

## What it does

Ghidra helps an analyst work from machine instructions toward an understanding of a program. The listing, decompiler, function graph, and cross-references provide different views of the same artifact. Renaming functions and correcting types can improve that reconstruction.

## Example

**Illustrative workflow, not run here.** Install a release and its required JDK, then launch `ghidraRun.bat` on Windows or `ghidraRun` on Linux/macOS. Create a project and import a small program you compiled yourself.

Open it in CodeBrowser, accept the relevant analysis options, and locate a function with a recognizable string. Follow its references and compare the decompiler view with the source and disassembly. Keep the executable and build settings with your notes.

## Limits

Decompiled output is a reconstruction, not the original source. Stripped symbols, optimization, indirect calls, and obfuscation can obscure structure. A plausible function name or type still needs supporting evidence.

For predefined weakness checks, see [cwe-checker](../cwe-checker/). For a programmable path exploration workflow, see [angr](../angr/).

## Related research

In our [malware sophistication paper](https://www.cs.montana.edu/izurieta/pubs/iETC_Porcella_2026.pdf), we discuss Ghidra in the context of binary analysis and obfuscation. We did not benchmark its detection performance. I connect this entry to [Malware sophistication](../../research/binary-analysis/) because recovered structure affects how software quality can be interpreted.
