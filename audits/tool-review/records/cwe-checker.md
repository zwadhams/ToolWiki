# cwe-checker: evidence record

Access/review date: 2026-09-22. Existing scope: Official cwe_checker repository and checker documentation; ELF is the main target, with experimental kernel-module and bare-metal support.

File: `src/content/docs/tools/cwe-checker.md`. Baseline SHA-256: `d4281fedce94a8edf1cb0e5a10674804f5a22aa9db259d3fe4f296f2919fb3ae`. Reviewed SHA-256: `aafa8aabdcd305b4dd8624bfee091561018747e62b5b825286f3e829dec76155`. Original text is preserved in baseline.json.

Status: Assessed against primary documentation; see qualifications below.

## E1: evidence assessment

Ghidra IR and custom data flow support binary weakness detection, primarily ELF on x86/ARM/MIPS/PPC. Kernel modules and bare-metal support are experimental. The checker list includes memory defects, TOCTOU and dangerous APIs; CWE-78 is explicitly disabled in standard runs. The project expects both false positives and false negatives. Rust/Ghidra prerequisites and container architecture limits are distinct from analyzed target architectures.

Source sections: README: inputs, installation, implemented checks and JSON; checkers index; LGPL-3.0 LICENSE

- [S1](https://github.com/fkie-cad/cwe_checker)
- [S2](https://docs.cwe-checker.io/cwe_checker_lib/checkers/index.html)
- [S3](https://github.com/fkie-cad/cwe_checker/blob/master/LICENSE)

Correction: No content correction recorded.

## Claims and dispositions

Counts: {"supported":28,"supported with qualification":8,"contradicted":0,"unresolved":0}. Compound paragraphs retain their qualifications; list-valued fields are assessed member by member. Quoted relative links point to the corresponding repository Markdown pages.

| Location | Claim as reviewed | Verdict | Evidence / limitation |
| --- | --- | --- | --- |
| title | cwe-checker | supported | See evidence assessment E1. |
| description | Find potential weakness patterns in native binaries using Ghidra and static data flow analysis. | supported | See evidence assessment E1. |
| tool.modes[0] | Static | supported | See evidence assessment E1. |
| tool.inputTypes[0] | Binaries | supported | See evidence assessment E1. |
| tool.techniques[0] | Binary analysis | supported | See evidence assessment E1. |
| tool.techniques[1] | Data flow analysis | supported | See evidence assessment E1. |
| tool.techniques[2] | Weakness detection | supported | See evidence assessment E1. |
| tool.languages[0] | Language independent | supported | See evidence assessment E1. |
| tool.languageNote | The target is machine code, not Rust source even though the analyzer is implemented in Rust. Coverage depends on binary format, architecture, recovered code, and modeled APIs. | supported | See evidence assessment E1. |
| tool.targets[0] | Native binaries | supported | See evidence assessment E1. |
| tool.targets[1] | Firmware | supported | See evidence assessment E1. |
| tool.licenseCategory | Open source | supported | See evidence assessment E1. |
| tool.license | LGPL-3.0 | supported | See evidence assessment E1. |
| tool.cost[0] | Free | supported | See evidence assessment E1. |
| tool.costNote | Free open-source analyzer. Ghidra and the other required analysis components have their own licenses; a container runtime or hosted compute can add costs. | supported | See evidence assessment E1. |
| tool.website | https://github.com/fkie-cad/cwe_checker | supported | See evidence assessment E1. |
| tool.verified | 2026-09-22 | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.scope | Official cwe_checker repository and checker documentation; ELF is the main target, with experimental kernel-module and bare-metal support. | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.findings[0] | Memory safety | supported | See evidence assessment E1. |
| tool.findings[1] | Concurrency issues | supported | See evidence assessment E1. |
| tool.findings[2] | Unsafe API use | supported | See evidence assessment E1. |
| tool.findingNote | Selected binary CWE checks, including lifetime errors and TOCTOU patterns. Enabled checks and recovered program models determine coverage. | supported | See evidence assessment E1. |
| tool.environment | Official Linux container workflow, or a compatible Rust and Ghidra build host. The prebuilt image and target architecture are separate constraints. | supported | See evidence assessment E1. |
| tool.setup | Provide an executable artifact and Ghidra. No source rebuild or runtime harness; bare-metal analysis needs load and architecture configuration. | supported | See evidence assessment E1. |
| tool.sources[0] | cwe_checker capabilities, architectures, and setup: https://github.com/fkie-cad/cwe_checker | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.sources[1] | Individual checker behavior and limitations: https://docs.cwe-checker.io/cwe_checker_lib/checkers/index.html | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.sources[2] | cwe_checker license: https://github.com/fkie-cad/cwe_checker/blob/master/LICENSE | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| What it does, line 33 | The project calls its executable `cwe_checker`. It uses Ghidra to recover an intermediate representation from a binary, then applies heuristics and data flow analyses to identify potentially vulnerable code paths. | supported | See evidence assessment E1. |
| What it does, line 35 | Checks cover weakness classes such as buffer errors, unsafe format strings, use after free, and null pointer dereferences. A CWE identifies a class of weakness. This tool does not work by looking up a component version in a CVE database; see [CVE Binary Tool](../../../src/content/docs/tools/cve-bin-tool.md) for that workflow. | supported | See evidence assessment E1. |
| What it can analyze, line 39 | \| Input \| Documented scope \|<br>\| --- \| --- \|<br>\| ELF executables \| Main focus; examples include x86, ARM, MIPS, and PowerPC architectures. \|<br>\| Linux loadable kernel modules \| Experimental; only a subset of checks runs. \|<br>\| Bare-metal binaries \| Experimental; requires a configuration describing the target. \| | supported | See evidence assessment E1. |
| What it can analyze, line 45 | Support in Ghidra is a prerequisite, not a guarantee that every checker fully models a particular platform. Firmware analysis still requires identifying suitable executable content and the right load configuration. | supported | See evidence assessment E1. |
| Results and limitations, line 49 | The tool produces CWE warnings, offers JSON output, and includes a Ghidra integration for reviewing findings. Use the check-specific documentation to understand each warning's assumptions and likely false positives or missed cases. | supported | See evidence assessment E1. |
| Results and limitations, line 51 | Do not equate every implemented check with default coverage: the repository explicitly notes that the command-injection check is disabled in standard runs. A warning is a lead for manual analysis, not confirmation of an exploit. | supported | See evidence assessment E1. |
| A useful first evaluation, line 55 | Use the official stable release workflow with one known ELF binary. Confirm its architecture, review enabled checks and API configuration, and inspect a warning alongside the recovered code. Record the binary hash, analyzer and Ghidra versions, and configuration for reproducibility. | supported with qualification | Author recommendation or conditional inference, not a measured effectiveness claim. Factual premises reviewed against E1. |
| Related research, line 59 | **Discussed in a paper:** [Characterizing and Codifying Malware Sophistication](https://www.cs.montana.edu/izurieta/pubs/iETC_Porcella_2026.pdf) cites cwe-checker as an example of detecting selected reliability-related weaknesses in binaries. It does not benchmark the tool or validate a malware sophistication score. | supported with qualification | Historical attribution only; see the research reconciliation record. No current-edition performance inference. |
| Related research, line 61 | [Malware sophistication](../../../src/content/docs/research/binary-analysis.md) connects this example to recovered-code coverage, observable features, and the limits of inferring quality from them. | supported with qualification | Historical attribution only; see the research reconciliation record. No current-edition performance inference. |
