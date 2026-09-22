# capa: evidence record

Access/review date: 2026-09-22. Existing scope: Static feature matching and dynamic analysis of supported CAPE, DRAKVUF, or VMRay reports. capa does not itself supply a full malware-execution sandbox.

File: `src/content/docs/tools/capa.md`. Baseline SHA-256: `1c5da7a1058c8bcf848f7f56e754150e50e7a5a84fd5a8888cf9251462f1fc11`. Reviewed SHA-256: `1c5da7a1058c8bcf848f7f56e754150e50e7a5a84fd5a8888cf9251462f1fc11`. Original text is preserved in baseline.json.

Status: Assessed against primary documentation; see qualifications below.

## E1: evidence assessment

The README supports PE, ELF, .NET, shellcode and CAPE/DRAKVUF/VMRay reports. Dynamic mode reads reports; it is not a built-in execution sandbox. Standalone releases bundle rules/signatures, unlike the library route. Verbose output exposes evidence locations. Packing/installers and feature extraction limit matching; capabilities alone do not prove maliciousness or execution of static code.

Source sections: README: accepted inputs, dynamic capabilities and verbose output; Installation; Limitations; Apache-2.0 License

- [S1](https://github.com/mandiant/capa)
- [S2](https://github.com/mandiant/capa/blob/master/doc/installation.md)
- [S3](https://github.com/mandiant/capa/blob/master/doc/limitations.md)
- [S4](https://www.cs.montana.edu/izurieta/pubs/iETC_Porcella_2026.pdf)

Correction: No content correction recorded.

## Claims and dispositions

Counts: {"supported":27,"supported with qualification":10,"contradicted":0,"unresolved":0}. Compound paragraphs retain their qualifications; list-valued fields are assessed member by member. Quoted relative links point to the corresponding repository Markdown pages.

| Location | Claim as reviewed | Verdict | Evidence / limitation |
| --- | --- | --- | --- |
| title | capa | supported | See evidence assessment E1. |
| description | Match binary features or recorded execution behavior to rules describing program capabilities. | supported | See evidence assessment E1. |
| tool.modes[0] | Static | supported | See evidence assessment E1. |
| tool.modes[1] | Dynamic | supported | See evidence assessment E1. |
| tool.inputTypes[0] | Binaries | supported | See evidence assessment E1. |
| tool.inputTypes[1] | Execution traces | supported | See evidence assessment E1. |
| tool.techniques[0] | Binary analysis | supported | See evidence assessment E1. |
| tool.techniques[1] | Rule-based matching | supported | See evidence assessment E1. |
| tool.techniques[2] | Trace analysis | supported | See evidence assessment E1. |
| tool.languages[0] | Language independent | supported | See evidence assessment E1. |
| tool.languageNote | Coverage depends on the binary format, architecture, analysis backend, or sandbox report format. Python is an implementation interface, not the target-language scope. | supported | See evidence assessment E1. |
| tool.targets[0] | Native binaries | supported | See evidence assessment E1. |
| tool.targets[1] | .NET assemblies | supported | See evidence assessment E1. |
| tool.targets[2] | Sandbox reports | supported | See evidence assessment E1. |
| tool.findings[0] | Program capabilities | supported | See evidence assessment E1. |
| tool.findingNote | Matches capability rules to extracted evidence. A match does not establish malicious intent, a vulnerability, or that every identified static capability executed. | supported | See evidence assessment E1. |
| tool.environment | Standalone distributions and documented installation routes for Windows, Linux, and macOS. Optional analysis backends have additional requirements. | supported | See evidence assessment E1. |
| tool.setup | Supply a supported binary or an existing supported sandbox report. Use the bundled rules in a standalone release, or configure rules and signatures separately for a library installation. | supported | See evidence assessment E1. |
| tool.licenseCategory | Open source | supported | See evidence assessment E1. |
| tool.license | Apache-2.0 | supported | See evidence assessment E1. |
| tool.cost[0] | Free | supported | See evidence assessment E1. |
| tool.costNote | Free analyzer with a public rule collection. Producing a sandbox report or using an optional external analysis backend can involve separate tools or services. | supported | See evidence assessment E1. |
| tool.website | https://github.com/mandiant/capa | supported | See evidence assessment E1. |
| tool.verified | 2026-09-22 | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.scope | Static feature matching and dynamic analysis of supported CAPE, DRAKVUF, or VMRay reports. capa does not itself supply a full malware-execution sandbox. | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.sources[0] | Capabilities, formats, backends, and license: https://github.com/mandiant/capa | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.sources[1] | Installation and bundled resources: https://github.com/mandiant/capa/blob/master/doc/installation.md | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.sources[2] | Analysis limitations: https://github.com/mandiant/capa/blob/master/doc/limitations.md | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.sources[3] | Malware sophistication paper: https://www.cs.montana.edu/izurieta/pubs/iETC_Porcella_2026.pdf | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| Inputs, line 35 | For static analysis, capa extracts features from supported artifacts such as PE, ELF, .NET modules, or shellcode. For dynamic analysis, it reads recorded behavior from a supported sandbox report. These workflows do not necessarily expose the same evidence. | supported | See evidence assessment E1. |
| Inputs, line 37 | The Dynamic tag describes analysis of previously observed execution. Passing a binary to the ordinary static workflow does not run it in a sandbox. | supported | See evidence assessment E1. |
| Example, line 41 | **Illustrative workflow, not run here.** With the standalone release and its bundled resources, inspect a known test executable: | supported with qualification | Author recommendation or conditional inference, not a measured effectiveness claim. Factual premises reviewed against E1. |
| Example, line 43 | ```sh<br>capa -vv sample.exe<br>``` | supported with qualification | Documentation/static reasoning only; this example has not been executed. See E1. |
| Example, line 47 | Review each matched rule and its evidence locations. Follow interesting locations in [Ghidra](../../../src/content/docs/tools/ghidra.md) before drawing conclusions about the surrounding behavior. | supported with qualification | Author recommendation or conditional inference, not a measured effectiveness claim. Factual premises reviewed against E1. |
| Limits, line 51 | Packing can expose mostly the unpacker rather than the payload. An installer can expose its installation framework rather than the installed program. Missing features, unsupported code, and incomplete sandbox coverage all limit matching. | supported | See evidence assessment E1. |
| Limits, line 53 | A capability such as file access can be ordinary application behavior. Record the rule set and analysis mode alongside the result. | supported | See evidence assessment E1. |
| Related research, line 57 | We discuss capa in our [malware sophistication paper](https://www.cs.montana.edu/izurieta/pubs/iETC_Porcella_2026.pdf) as part of the binary-analysis context. We did not evaluate its accuracy or validate a capability count as a sophistication measure. See [Malware sophistication](../../../src/content/docs/research/binary-analysis.md) for those limits. | supported with qualification | Historical attribution only; see the research reconciliation record. No current-edition performance inference. |
