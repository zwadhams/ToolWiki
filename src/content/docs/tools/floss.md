---
title: FLOSS
description: Recover ordinary and obfuscated strings from compiled programs for further investigation.
tool:
  modes: [Static, Dynamic]
  inputTypes: [Binaries]
  techniques: [Binary analysis, String extraction, Emulation]
  languages: [Language independent, Go, Rust]
  languageNote: Go and Rust tags refer to specialized string extraction from compiled programs. They do not describe source-code checks. Decoder support depends on format and architecture.
  targets: [Native binaries, Obfuscated programs]
  findings: [Recovered strings]
  findingNote: Recovers candidate strings and locations. Strings provide investigation leads; their presence does not establish a program's intent or that a real execution used them.
  environment: Standalone release routes for Windows, Linux, and macOS, or a compatible Python environment with the required analysis dependencies.
  setup: Provide a supported executable. Plain string extraction and code-based deobfuscation have different format and architecture requirements.
  licenseCategory: Open source
  license: Apache-2.0
  cost: [Free]
  costNote: Free open-source string recovery tool. No paid analysis tier is required for the documented CLI workflow.
  website: https://github.com/mandiant/flare-floss
  verified: '2026-09-22'
  scope: Static string extraction plus decoder emulation. The Dynamic tag identifies emulated execution of selected code, not a full-program sandbox run or live application scan.
  sources:
    - label: String types, language support, and license
      url: https://github.com/mandiant/flare-floss
    - label: Decoder recovery and emulation
      url: https://github.com/mandiant/flare-floss/blob/master/doc/theory.md
    - label: Installation
      url: https://github.com/mandiant/flare-floss/blob/master/doc/installation.md
    - label: Usage and output
      url: https://github.com/mandiant/flare-floss/blob/master/doc/usage.md
---

## What it does

FLOSS extracts ordinary strings, strings assembled on the stack, and strings recovered from selected decoding routines. It also supports specialized extraction for Go and Rust binaries.

The project describes an advanced static-analysis workflow, but part of that workflow emulates instructions. Its [deobfuscation algorithm](https://github.com/mandiant/flare-floss/blob/master/doc/theory.md) identifies likely decoder functions, reconstructs arguments, and inspects emulator memory changes. I expose both modes in the catalog to make that distinction visible.

## Example

**Illustrative workflow, not run here.** Install a compatible standalone release and inspect a known test executable:

```sh
floss sample.exe
floss -j sample.exe > strings.json
```

Review a recovered string together with its type and code location. Use [Ghidra](../ghidra/) to inspect the surrounding function. A decoded path or hostname is a lead to examine, not proof that the application contacted it.

## Limits

Recovery depends on recognizing code and reproducing enough decoder behavior. Unsupported instructions, packing, environmental dependencies, or missed arguments can prevent recovery. A clean or short listing does not establish that a program contains no other strings.

For direct file-pattern matching, compare [YARA-X](../yara-x/). For broader capability rules, compare [capa](../capa/).
