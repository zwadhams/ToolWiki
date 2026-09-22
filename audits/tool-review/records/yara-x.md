# YARA-X: evidence record

Access/review date: 2026-09-22. Existing scope: YARA-X file-scanning CLI. The Binaries tag covers binary inspection, but the engine can also match arbitrary file contents without understanding their source-language semantics.

File: `src/content/docs/tools/yara-x.md`. Baseline SHA-256: `c3302cb4eb0f9436964aae6cbfe1b43c5ad8b789fedf3db18f4326f9c8491f41`. Reviewed SHA-256: `c3302cb4eb0f9436964aae6cbfe1b43c5ad8b789fedf3db18f4326f9c8491f41`. Original text is preserved in baseline.json.

Status: Assessed against primary documentation; see qualifications below.

## E1: evidence assessment

The scan syntax takes rule paths then a target path. Rules match strings, byte patterns and conditions over file contents; interfaces do not make it a source-language analyzer. Prebuilt Windows/Linux/macOS routes and BSD-3-Clause licensing are documented. The project announcement explicitly moves original YARA to maintenance mode. The marker rule has a straightforward conditional match and remains unexecuted.

Source sections: CLI Commands: scan; Installation; Differences with YARA; YARA-X is stable; BSD-3-Clause LICENSE

- [S1](https://virustotal.github.io/yara-x/docs/intro/installation/)
- [S2](https://virustotal.github.io/yara-x/docs/cli/commands/)
- [S3](https://virustotal.github.io/yara-x/docs/writing_rules/differences-with-yara/)
- [S4](https://virustotal.github.io/yara-x/blog/yara-x-is-stable/)
- [S5](https://github.com/VirusTotal/yara-x/blob/main/LICENSE)

Correction: No content correction recorded.

## Claims and dispositions

Counts: {"supported":23,"supported with qualification":13,"contradicted":0,"unresolved":0}. Compound paragraphs retain their qualifications; list-valued fields are assessed member by member. Quoted relative links point to the corresponding repository Markdown pages.

| Location | Claim as reviewed | Verdict | Evidence / limitation |
| --- | --- | --- | --- |
| title | YARA-X | supported | See evidence assessment E1. |
| description | Scan file contents using rules that combine text, byte patterns, and conditions. | supported | See evidence assessment E1. |
| tool.modes[0] | Static | supported | See evidence assessment E1. |
| tool.inputTypes[0] | Binaries | supported | See evidence assessment E1. |
| tool.techniques[0] | Pattern matching | supported | See evidence assessment E1. |
| tool.techniques[1] | Rule-based matching | supported | See evidence assessment E1. |
| tool.languages[0] | Language independent | supported | See evidence assessment E1. |
| tool.languageNote | Matches file bytes and available format metadata. Rust, C/C++, Go, and Python interfaces do not imply source-level analysis of those languages. | supported | See evidence assessment E1. |
| tool.targets[0] | Native binaries | supported | See evidence assessment E1. |
| tool.targets[1] | Firmware | supported | See evidence assessment E1. |
| tool.targets[2] | Files | supported | See evidence assessment E1. |
| tool.findings[0] | File pattern matches | supported | See evidence assessment E1. |
| tool.findingNote | Findings mean that a supplied rule matched. Their meaning depends on that rule; a match alone does not prove maliciousness or a software defect. | supported | See evidence assessment E1. |
| tool.environment | CLI distributions for Windows, Linux, and macOS. Library integrations have their own build and runtime requirements. | supported | See evidence assessment E1. |
| tool.setup | Provide YARA-compatible rules and target files. Review compatibility differences when migrating an existing YARA rule set. | supported | See evidence assessment E1. |
| tool.licenseCategory | Open source | supported | See evidence assessment E1. |
| tool.license | BSD-3-Clause | supported | See evidence assessment E1. |
| tool.cost[0] | Free | supported | See evidence assessment E1. |
| tool.costNote | Free engine and CLI. Third-party rule collections and services have their own terms; they are not included paid detection tiers of this entry. | supported | See evidence assessment E1. |
| tool.website | https://virustotal.github.io/yara-x/ | supported | See evidence assessment E1. |
| tool.verified | 2026-09-22 | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.scope | YARA-X file-scanning CLI. The Binaries tag covers binary inspection, but the engine can also match arbitrary file contents without understanding their source-language semantics. | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.sources[0] | Installation: https://virustotal.github.io/yara-x/docs/intro/installation/ | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.sources[1] | CLI commands: https://virustotal.github.io/yara-x/docs/cli/commands/ | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.sources[2] | Rule compatibility with YARA: https://virustotal.github.io/yara-x/docs/writing_rules/differences-with-yara/ | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.sources[3] | YARA-X and the original YARA project: https://virustotal.github.io/yara-x/blog/yara-x-is-stable/ | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.sources[4] | License: https://github.com/VirusTotal/yara-x/blob/main/LICENSE | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| What it does, line 37 | YARA-X evaluates rules over files. A rule can combine recognizable strings, hexadecimal patterns, regular expressions, and conditions. This is useful for grouping related artifacts or checking for a specific marker. | supported | See evidence assessment E1. |
| What it does, line 39 | The original YARA project is in maintenance mode, with new development focused on YARA-X. Existing rules should still be checked against the documented compatibility differences. | supported | See evidence assessment E1. |
| Example, line 43 | **Illustrative example, not run here.** Save this harmless marker rule as `marker.yar`: | supported with qualification | Author recommendation or conditional inference, not a measured effectiveness claim. Factual premises reviewed against E1. |
| Example, line 45 | ```text<br>rule WikiMarker {<br>    strings:<br>        $marker = "TOOLWIKI_SAMPLE"<br>    condition:<br>        $marker<br>}<br>``` | supported with qualification | Documentation/static reasoning only; this example has not been executed. See E1. |
| Example, line 54 | Create `sample.bin` containing the ASCII text `TOOLWIKI_SAMPLE`, then run: | supported with qualification | Author recommendation or conditional inference, not a measured effectiveness claim. Factual premises reviewed against E1. |
| Example, line 56 | ```sh<br>yr scan marker.yar sample.bin<br>``` | supported with qualification | Documentation/static reasoning only; this example has not been executed. See E1. |
| Example, line 60 | The intended result is a `WikiMarker` match. Removing the marker should remove that match. This establishes a byte-pattern condition, not a vulnerability. | supported with qualification | Author recommendation or conditional inference, not a measured effectiveness claim. Factual premises reviewed against E1. |
| Limits, line 64 | Rules can match benign files or miss changed and encoded content. Preserve the rule revision with the artifact. Compare [capa](../../../src/content/docs/tools/capa.md) for capability rules over extracted features and [FLOSS](../../../src/content/docs/tools/floss.md) for recovering obscured strings. | supported | See evidence assessment E1. |
| Related research, line 68 | Our [malware sophistication paper](https://www.cs.montana.edu/izurieta/pubs/iETC_Porcella_2026.pdf) discusses the original YARA, not YARA-X. I include its successor here as a related tool; we did not evaluate YARA-X. See [Malware sophistication](../../../src/content/docs/research/binary-analysis.md). | supported with qualification | Historical attribution only; see the research reconciliation record. No current-edition performance inference. |
