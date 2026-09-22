---
title: capa
description: Match binary features or recorded execution behavior to rules describing program capabilities.
tool:
  modes: [Static, Dynamic]
  inputTypes: [Binaries, Execution traces]
  techniques: [Binary analysis, Rule-based matching, Trace analysis]
  languages: [Language independent]
  languageNote: Coverage depends on the binary format, architecture, analysis backend, or sandbox report format. Python is an implementation interface, not the target-language scope.
  targets: [Native binaries, .NET assemblies, Sandbox reports]
  findings: [Program capabilities]
  findingNote: Matches capability rules to extracted evidence. A match does not establish malicious intent, a vulnerability, or that every identified static capability executed.
  environment: Standalone distributions and documented installation routes for Windows, Linux, and macOS. Optional analysis backends have additional requirements.
  setup: Supply a supported binary or an existing supported sandbox report. Use the bundled rules in a standalone release, or configure rules and signatures separately for a library installation.
  licenseCategory: Open source
  license: Apache-2.0
  cost: [Free]
  costNote: Free analyzer with a public rule collection. Producing a sandbox report or using an optional external analysis backend can involve separate tools or services.
  website: https://github.com/mandiant/capa
  verified: '2026-09-22'
  scope: Static feature matching and dynamic analysis of supported CAPE, DRAKVUF, or VMRay reports. capa does not itself supply a full malware-execution sandbox.
  sources:
    - label: Capabilities, formats, backends, and license
      url: https://github.com/mandiant/capa
    - label: Installation and bundled resources
      url: https://github.com/mandiant/capa/blob/master/doc/installation.md
    - label: Analysis limitations
      url: https://github.com/mandiant/capa/blob/master/doc/limitations.md
    - label: Malware sophistication paper
      url: https://www.cs.montana.edu/izurieta/pubs/iETC_Porcella_2026.pdf
---

## Inputs

For static analysis, capa extracts features from supported artifacts such as PE, ELF, .NET modules, or shellcode. For dynamic analysis, it reads recorded behavior from a supported sandbox report. These workflows do not necessarily expose the same evidence.

The Dynamic tag describes analysis of previously observed execution. Passing a binary to the ordinary static workflow does not run it in a sandbox.

## Example

**Illustrative workflow, not run here.** With the standalone release and its bundled resources, inspect a known test executable:

```sh
capa -vv sample.exe
```

Review each matched rule and its evidence locations. Follow interesting locations in [Ghidra](../ghidra/) before drawing conclusions about the surrounding behavior.

## Limits

Packing can expose mostly the unpacker rather than the payload. An installer can expose its installation framework rather than the installed program. Missing features, unsupported code, and incomplete sandbox coverage all limit matching.

A capability such as file access can be ordinary application behavior. Record the rule set and analysis mode alongside the result.

## Related research

We discuss capa in our [malware sophistication paper](https://www.cs.montana.edu/izurieta/pubs/iETC_Porcella_2026.pdf) as part of the binary-analysis context. We did not evaluate its accuracy or validate a capability count as a sophistication measure. See [Malware sophistication](../../research/binary-analysis/) for those limits.
