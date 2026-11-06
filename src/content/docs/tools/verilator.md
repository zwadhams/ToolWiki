---
title: Verilator (HDL lint)
description: Check Verilog and SystemVerilog source for width mismatches and other selected lint diagnostics.
tool:
  cardRequirement: Supply the HDL source list, top module, includes, and defines.
  decision:
    useWhen: Check a hardware design's source for lint issues before simulation or deeper verification.
    result: Diagnostics report a warning or error code, message, and usually a source location. The rule reference explains the condition to investigate.
    limit: Enabled lint checks and supported constructs bound the result. A clean lint run is not functional verification, timing analysis, or hardware signoff.
  analysisWorkflows:
    - id: hdl-lint
      label: Verilog and SystemVerilog lint
      subject: component
      inputs: [Source code]
      languageScope: source
      languages: [Verilog, SystemVerilog]
      findings: [Logic errors, Coding conventions]
      hostPlatforms: [Linux]
      requires: []
      caveat: Verilator 5.054 --lint-only with the intended top module, source list, includes, defines, and warning settings. Unsupported constructs are incomplete analysis, not a passing design.
      sources:
        - https://github.com/verilator/verilator/blob/v5.054/docs/guide/exe_verilator.rst
        - https://github.com/verilator/verilator/blob/v5.054/docs/guide/warnings.rst
        - https://github.com/verilator/verilator/blob/v5.054/docs/guide/install.rst
  aliases: [Verilator lint]
  searchTerms: [HDL lint, Verilog lint, SystemVerilog lint, width mismatch, WIDTHTRUNC]
  modes: [Static]
  inputTypes: [Source code]
  techniques: [Linting]
  languages: [Verilog, SystemVerilog]
  languageNote: HDL source only in this workflow. Generated simulation-model code does not make it an analyzer for arbitrary application source.
  targets: [Hardware designs, RTL]
  findings: [Logic errors, Coding conventions]
  findingNote: Lint diagnostics identify selected questionable constructs. Warning selection, design configuration, and language support affect which checks run.
  environment: The documented installation has primary testing on Ubuntu. This workflow uses a Linux host with Verilator 5.054.
  setup: Install Verilator 5.054 and supply the design's top module, source files, include paths, preprocessor definitions, and chosen warning flags.
  licenseCategory: Open source
  license: LGPL-3.0-only OR Artistic-2.0
  cost: [Free]
  costNote: The open-source lint tool is free. Commercial support and compute are separate.
  website: https://verilator.org/
  verified: '2026-11-06'
  scope: Verilator 5.054 static --lint-only checks. Simulation, execution coverage, and formal hardware verification are outside this entry.
  sources:
    - label: Versioned overview and dual-license declaration
      url: https://github.com/verilator/verilator/blob/v5.054/README.rst
    - label: Versioned installation and host requirements
      url: https://github.com/verilator/verilator/blob/v5.054/docs/guide/install.rst
    - label: Lint mode, language selection, top module, and warning flags
      url: https://github.com/verilator/verilator/blob/v5.054/docs/guide/exe_verilator.rst
    - label: Diagnostic format, width checks, and unsupported constructs
      url: https://github.com/verilator/verilator/blob/v5.054/docs/guide/warnings.rst
---

## First try

**Illustrative example, not executed here.** Use the
[5.054 installation guide](https://github.com/verilator/verilator/blob/v5.054/docs/guide/install.rst)
and confirm `verilator --version`. The fixture is in
[`examples/verilator`](https://github.com/zwadhams/ToolWiki/tree/main/examples/verilator).
Run from that directory on Linux. It has one module, no included files, and no
preprocessor definitions.

The faulty assignment narrows an eight-bit input into a four-bit output without
stating which bits to retain. Check it with the source list, language standard,
top module, and warning flag explicit:

```sh
verilator --lint-only --language 1800-2017 --top-module width_demo -Wwarn-WIDTHTRUNC bad/width_demo.sv
```

Expect `WIDTHTRUNC` at the assignment. Inspect the reported widths and location;
the output shown by your run is the evidence, not this expectation. Warnings are
fatal by default, so a warning can cause a nonzero exit. An unsupported-language
error or missing source is an incomplete check.

The corrected fixture explicitly selects `word[3:0]`, assuming the low four bits
are intended. Run the same options against it:

```sh
verilator --lint-only --language 1800-2017 --top-module width_demo -Wwarn-WIDTHTRUNC good/width_demo.sv
```

The truncation warning should disappear. This establishes the intended source
change for that check; it does not test the design's behavior. For a real
project, record all source files, `-I` include paths, `-D` definitions, warning
changes, and the top module in a [run record](../../guides/run-record/).

## Keep lint separate from simulation

This profile uses `--lint-only`, which does not generate a simulation model.
Other Verilator modes can generate C++ or SystemC, but those output languages
are not input-language tags for this workflow. Simulation results and hardware
proof obligations need their own tools, harnesses, and evidence.
