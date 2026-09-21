---
title: cwe-checker
description: Find potential weakness patterns in native binaries using Ghidra and static data flow analysis.
tool:
  modes: [Static]
  inputTypes: [Binaries]
  techniques: [Binary analysis, Data flow analysis, Weakness detection]
  languages: [Language independent]
  languageNote: The target is machine code, not Rust source even though the analyzer is implemented in Rust. Coverage depends on binary format, architecture, recovered code, and modeled APIs.
  targets: [Native binaries, Firmware]
  licenseCategory: Open source
  license: LGPL-3.0
  cost: [Free]
  costNote: Free open-source analyzer. Ghidra and the other required analysis components have their own licenses; a container runtime or hosted compute can add costs.
  website: https://github.com/fkie-cad/cwe_checker
  verified: '2026-09-21'
  scope: Official cwe_checker repository and checker documentation; ELF is the main target, with experimental kernel-module and bare-metal support.
  findings: ["Memory safety","Concurrency issues","Unsafe API use"]
  findingNote: "Selected binary CWE checks, including lifetime errors and TOCTOU patterns. Enabled checks and recovered program models determine coverage."
  environment: "Official Linux container workflow, or a compatible Rust and Ghidra build host. The prebuilt image and target architecture are separate constraints."
  setup: "Provide an executable artifact and Ghidra. No source rebuild or runtime harness; bare-metal analysis needs load and architecture configuration."
  sources:
    - label: cwe_checker capabilities, architectures, and setup
      url: https://github.com/fkie-cad/cwe_checker
    - label: Individual checker behavior and limitations
      url: https://docs.cwe-checker.io/cwe_checker_lib/checkers/index.html
    - label: cwe_checker license
      url: https://github.com/fkie-cad/cwe_checker/blob/master/LICENSE
---

## What it does

The project calls its executable `cwe_checker`. It uses Ghidra to recover an intermediate representation from a binary, then applies heuristics and data flow analyses to identify potentially vulnerable code paths.

Checks cover weakness classes such as buffer errors, unsafe format strings, use after free, and null pointer dereferences. A CWE identifies a class of weakness. This tool does not work by looking up a component version in a CVE database; see [CVE Binary Tool](../cve-bin-tool/) for that workflow.

## What it can analyze

| Input | Documented scope |
| --- | --- |
| ELF executables | Main focus; examples include x86, ARM, MIPS, and PowerPC architectures. |
| Linux loadable kernel modules | Experimental; only a subset of checks runs. |
| Bare-metal binaries | Experimental; requires a configuration describing the target. |

Support in Ghidra is a prerequisite, not a guarantee that every checker fully models a particular platform. Firmware analysis still requires identifying suitable executable content and the right load configuration.

## Results and limitations

The tool produces CWE warnings, offers JSON output, and includes a Ghidra integration for reviewing findings. Use the check-specific documentation to understand each warning's assumptions and likely false positives or missed cases.

Do not equate every implemented check with default coverage: the repository explicitly notes that the command-injection check is disabled in standard runs. A warning is a lead for manual analysis, not confirmation of an exploit.

## A useful first evaluation

Use the official stable release workflow with one known ELF binary. Confirm its architecture, review enabled checks and API configuration, and inspect a warning alongside the recovered code. Record the binary hash, analyzer and Ghidra versions, and configuration for reproducibility.
