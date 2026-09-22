# FLOSS: evidence record

Access/review date: 2026-09-22. Existing scope: Static string extraction plus decoder emulation. The Dynamic tag identifies emulated execution of selected code, not a full-program sandbox run or live application scan.

File: `src/content/docs/tools/floss.md`. Baseline SHA-256: `6e7c541eafb2cdf3be6e6710affa535d10340d4764b167f683af48fc12ce1261`. Reviewed SHA-256: `6e7c541eafb2cdf3be6e6710affa535d10340d4764b167f683af48fc12ce1261`. Original text is preserved in baseline.json.

Status: Assessed against primary documentation; see qualifications below.

## E1: evidence assessment

FLOSS extracts static, stack, tight and decoded strings, with special Go/Rust binary handling. The algorithm explicitly emulates candidate decoders and examines memory changes. The Wiki deliberately labels that emulation Dynamic while preserving the project's static-analysis description; it does not imply full-program execution. Standalone/Python routes and -j JSON output are documented. Strings are investigation leads, not evidence of actual network activity.

Source sections: README: string types and language-specific strings; Theory: Algorithm; Installation; Usage: JSON; Apache-2.0 License

- [S1](https://github.com/mandiant/flare-floss)
- [S2](https://github.com/mandiant/flare-floss/blob/master/doc/theory.md)
- [S3](https://github.com/mandiant/flare-floss/blob/master/doc/installation.md)
- [S4](https://github.com/mandiant/flare-floss/blob/master/doc/usage.md)

Correction: No content correction recorded.

## Claims and dispositions

Counts: {"supported":27,"supported with qualification":9,"contradicted":0,"unresolved":0}. Compound paragraphs retain their qualifications; list-valued fields are assessed member by member. Quoted relative links point to the corresponding repository Markdown pages.

| Location | Claim as reviewed | Verdict | Evidence / limitation |
| --- | --- | --- | --- |
| title | FLOSS | supported | See evidence assessment E1. |
| description | Recover ordinary and obfuscated strings from compiled programs for further investigation. | supported | See evidence assessment E1. |
| tool.modes[0] | Static | supported | See evidence assessment E1. |
| tool.modes[1] | Dynamic | supported | See evidence assessment E1. |
| tool.inputTypes[0] | Binaries | supported | See evidence assessment E1. |
| tool.techniques[0] | Binary analysis | supported | See evidence assessment E1. |
| tool.techniques[1] | String extraction | supported | See evidence assessment E1. |
| tool.techniques[2] | Emulation | supported | See evidence assessment E1. |
| tool.languages[0] | Language independent | supported | See evidence assessment E1. |
| tool.languages[1] | Go | supported | See evidence assessment E1. |
| tool.languages[2] | Rust | supported | See evidence assessment E1. |
| tool.languageNote | Go and Rust tags refer to specialized string extraction from compiled programs. They do not describe source-code checks. Decoder support depends on format and architecture. | supported | See evidence assessment E1. |
| tool.targets[0] | Native binaries | supported | See evidence assessment E1. |
| tool.targets[1] | Obfuscated programs | supported | See evidence assessment E1. |
| tool.findings[0] | Recovered strings | supported | See evidence assessment E1. |
| tool.findingNote | Recovers candidate strings and locations. Strings provide investigation leads; their presence does not establish a program's intent or that a real execution used them. | supported | See evidence assessment E1. |
| tool.environment | Standalone release routes for Windows, Linux, and macOS, or a compatible Python environment with the required analysis dependencies. | supported | See evidence assessment E1. |
| tool.setup | Provide a supported executable. Plain string extraction and code-based deobfuscation have different format and architecture requirements. | supported | See evidence assessment E1. |
| tool.licenseCategory | Open source | supported | See evidence assessment E1. |
| tool.license | Apache-2.0 | supported | See evidence assessment E1. |
| tool.cost[0] | Free | supported | See evidence assessment E1. |
| tool.costNote | Free open-source string recovery tool. No paid analysis tier is required for the documented CLI workflow. | supported | See evidence assessment E1. |
| tool.website | https://github.com/mandiant/flare-floss | supported | See evidence assessment E1. |
| tool.verified | 2026-09-22 | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.scope | Static string extraction plus decoder emulation. The Dynamic tag identifies emulated execution of selected code, not a full-program sandbox run or live application scan. | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.sources[0] | String types, language support, and license: https://github.com/mandiant/flare-floss | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.sources[1] | Decoder recovery and emulation: https://github.com/mandiant/flare-floss/blob/master/doc/theory.md | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.sources[2] | Installation: https://github.com/mandiant/flare-floss/blob/master/doc/installation.md | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.sources[3] | Usage and output: https://github.com/mandiant/flare-floss/blob/master/doc/usage.md | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| What it does, line 35 | FLOSS extracts ordinary strings, strings assembled on the stack, and strings recovered from selected decoding routines. It also supports specialized extraction for Go and Rust binaries. | supported | See evidence assessment E1. |
| What it does, line 37 | The project describes an advanced static-analysis workflow, but part of that workflow emulates instructions. Its [deobfuscation algorithm](https://github.com/mandiant/flare-floss/blob/master/doc/theory.md) identifies likely decoder functions, reconstructs arguments, and inspects emulator memory changes. I expose both modes in the catalog to make that distinction visible. | supported | See evidence assessment E1. |
| Example, line 41 | **Illustrative workflow, not run here.** Install a compatible standalone release and inspect a known test executable: | supported with qualification | Author recommendation or conditional inference, not a measured effectiveness claim. Factual premises reviewed against E1. |
| Example, line 43 | ```sh<br>floss sample.exe<br>floss -j sample.exe &gt; strings.json<br>``` | supported with qualification | Documentation/static reasoning only; this example has not been executed. See E1. |
| Example, line 48 | Review a recovered string together with its type and code location. Use [Ghidra](../../../src/content/docs/tools/ghidra.md) to inspect the surrounding function. A decoded path or hostname is a lead to examine, not proof that the application contacted it. | supported with qualification | Author recommendation or conditional inference, not a measured effectiveness claim. Factual premises reviewed against E1. |
| Limits, line 52 | Recovery depends on recognizing code and reproducing enough decoder behavior. Unsupported instructions, packing, environmental dependencies, or missed arguments can prevent recovery. A clean or short listing does not establish that a program contains no other strings. | supported | See evidence assessment E1. |
| Limits, line 54 | For direct file-pattern matching, compare [YARA-X](../../../src/content/docs/tools/yara-x.md). For broader capability rules, compare [capa](../../../src/content/docs/tools/capa.md). | supported | See evidence assessment E1. |
