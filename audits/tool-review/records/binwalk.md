# Binwalk: evidence record

Access/review date: 2026-09-22. Existing scope: Binwalk version 3. Earlier version 2 tutorials can have different dependencies, commands, and licensing.

File: `src/content/docs/tools/binwalk.md`. Baseline SHA-256: `27653e7586d1266765332303780ec1b6092bf405fc4385626887e8e75803bdeb`. Reviewed SHA-256: `27653e7586d1266765332303780ec1b6092bf405fc4385626887e8e75803bdeb`. Original text is preserved in baseline.json.

Status: Assessed against primary documentation; see qualifications below.

## E1: evidence assessment

The Rust rewrite is version 3 and MIT-licensed. File signatures, offsets, optional extraction and entropy support firmware/embedded-format investigation, not vulnerability claims. The platform guide explicitly supports 64-bit Linux and calls Windows/macOS largely untested. Extractors have separate dependencies. The identification command does not enable extraction by itself.

Source sections: v3 README; Supported Platforms; File Analysis and Extraction; MIT LICENSE

- [S1](https://github.com/ReFirmLabs/binwalk)
- [S2](https://github.com/ReFirmLabs/binwalk/wiki/Supported-Platforms)
- [S3](https://github.com/ReFirmLabs/binwalk/wiki/File-Analysis-and-Extraction)
- [S4](https://github.com/ReFirmLabs/binwalk/blob/master/LICENSE)

Correction: No content correction recorded.

## Claims and dispositions

Counts: {"supported":24,"supported with qualification":9,"contradicted":0,"unresolved":0}. Compound paragraphs retain their qualifications; list-valued fields are assessed member by member. Quoted relative links point to the corresponding repository Markdown pages.

| Location | Claim as reviewed | Verdict | Evidence / limitation |
| --- | --- | --- | --- |
| title | Binwalk | supported | See evidence assessment E1. |
| description | Identify embedded file formats and inspect firmware images and other binary containers. | supported | See evidence assessment E1. |
| tool.modes[0] | Static | supported | See evidence assessment E1. |
| tool.inputTypes[0] | Binaries | supported | See evidence assessment E1. |
| tool.techniques[0] | Binary analysis | supported | See evidence assessment E1. |
| tool.techniques[1] | Signature matching | supported | See evidence assessment E1. |
| tool.techniques[2] | Entropy analysis | supported | See evidence assessment E1. |
| tool.languages[0] | Language independent | supported | See evidence assessment E1. |
| tool.languageNote | Operates on file bytes and embedded formats. Rust is the implementation language of version 3, not a source language analyzed by this workflow. | supported | See evidence assessment E1. |
| tool.targets[0] | Firmware | supported | See evidence assessment E1. |
| tool.targets[1] | Embedded files | supported | See evidence assessment E1. |
| tool.targets[2] | Archives | supported | See evidence assessment E1. |
| tool.findings[0] | Embedded file formats | supported | See evidence assessment E1. |
| tool.findingNote | Reports candidate embedded formats and offsets. Entropy can suggest compressed or encrypted regions, but neither signatures nor entropy establish a vulnerability. | supported | See evidence assessment E1. |
| tool.environment | The project primarily supports 64-bit Linux and documents an Ubuntu-based Docker setup. Windows and macOS are largely untested according to its platform guide. | supported | See evidence assessment E1. |
| tool.setup | Supply a firmware image or other file. Extraction can require external utilities; the documented Docker build supplies a fuller dependency environment. | supported | See evidence assessment E1. |
| tool.licenseCategory | Open source | supported | See evidence assessment E1. |
| tool.license | MIT for Binwalk version 3; external extractors have separate licenses | supported | See evidence assessment E1. |
| tool.cost[0] | Free | supported | See evidence assessment E1. |
| tool.costNote | Free version 3 scanner and extraction framework. This entry does not cover separate commercial firmware-analysis services or older version 2 licensing. | supported | See evidence assessment E1. |
| tool.website | https://github.com/ReFirmLabs/binwalk | supported | See evidence assessment E1. |
| tool.verified | 2026-09-22 | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.scope | Binwalk version 3. Earlier version 2 tutorials can have different dependencies, commands, and licensing. | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.sources[0] | Version 3 features and installation: https://github.com/ReFirmLabs/binwalk | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.sources[1] | Supported platforms: https://github.com/ReFirmLabs/binwalk/wiki/Supported-Platforms | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.sources[2] | File analysis and extraction: https://github.com/ReFirmLabs/binwalk/wiki/File-Analysis-and-Extraction | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.sources[3] | Version 3 license: https://github.com/ReFirmLabs/binwalk/blob/master/LICENSE | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| What it does, line 35 | Binwalk helps identify what a firmware image or other binary container may contain. A result gives an offset and a candidate format, which can guide extraction and inspection of an embedded filesystem, archive, or executable. | supported | See evidence assessment E1. |
| Example, line 39 | **Illustrative workflow, not run here.** In a supported Binwalk 3 environment, scan a firmware image you already have: | supported with qualification | Author recommendation or conditional inference, not a measured effectiveness claim. Factual premises reviewed against E1. |
| Example, line 41 | ```sh<br>binwalk firmware.bin<br>``` | supported with qualification | Documentation/static reasoning only; this example has not been executed. See E1. |
| Example, line 45 | Review the reported offsets and formats. Enable extraction separately if needed, using the release's documented options and extractor dependencies. The command above is the initial identification step. | supported with qualification | Author recommendation or conditional inference, not a measured effectiveness claim. Factual premises reviewed against E1. |
| Limits, line 49 | A recognizable header is evidence of a candidate format, not a guarantee that extraction will succeed. Compression and encryption can both affect entropy, so an entropy result needs context. | supported | See evidence assessment E1. |
| Limits, line 51 | Binwalk does not by itself determine whether an embedded component has a known CVE. After locating an artifact, use [CVE Binary Tool](../../../src/content/docs/tools/cve-bin-tool.md) for supported component/advisory matching or [Ghidra](../../../src/content/docs/tools/ghidra.md) to inspect recovered code. Keep the original image and offsets so findings can be traced back to their source. | supported | See evidence assessment E1. |
