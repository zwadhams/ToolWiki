---
title: YARA-X
description: Scan file contents using rules that combine text, byte patterns, and conditions.
tool:
  modes: [Static]
  inputTypes: [Binaries]
  techniques: [Pattern matching, Rule-based matching]
  languages: [Language independent]
  languageNote: Matches file bytes and available format metadata. Rust, C/C++, Go, and Python interfaces do not imply source-level analysis of those languages.
  targets: [Native binaries, Firmware, Files]
  findings: [File pattern matches]
  findingNote: Findings mean that a supplied rule matched. Their meaning depends on that rule; a match alone does not prove maliciousness or a software defect.
  environment: CLI distributions for Windows, Linux, and macOS. Library integrations have their own build and runtime requirements.
  setup: Provide YARA-compatible rules and target files. Review compatibility differences when migrating an existing YARA rule set.
  licenseCategory: Open source
  license: BSD-3-Clause
  cost: [Free]
  costNote: Free engine and CLI. Third-party rule collections and services have their own terms; they are not included paid detection tiers of this entry.
  website: https://virustotal.github.io/yara-x/
  verified: '2026-09-22'
  scope: YARA-X file-scanning CLI. The Binaries tag covers binary inspection, but the engine can also match arbitrary file contents without understanding their source-language semantics.
  sources:
    - label: Installation
      url: https://virustotal.github.io/yara-x/docs/intro/installation/
    - label: CLI commands
      url: https://virustotal.github.io/yara-x/docs/cli/commands/
    - label: Rule compatibility with YARA
      url: https://virustotal.github.io/yara-x/docs/writing_rules/differences-with-yara/
    - label: YARA-X and the original YARA project
      url: https://virustotal.github.io/yara-x/blog/yara-x-is-stable/
    - label: License
      url: https://github.com/VirusTotal/yara-x/blob/main/LICENSE
---

## What it does

YARA-X evaluates rules over files. A rule can combine recognizable strings, hexadecimal patterns, regular expressions, and conditions. This is useful for grouping related artifacts or checking for a specific marker.

The original YARA project is in maintenance mode, with new development focused on YARA-X. Existing rules should still be checked against the documented compatibility differences.

## Example

**Illustrative example, not run here.** Save this harmless marker rule as `marker.yar`:

```text
rule WikiMarker {
    strings:
        $marker = "TOOLWIKI_SAMPLE"
    condition:
        $marker
}
```

Create `sample.bin` containing the ASCII text `TOOLWIKI_SAMPLE`, then run:

```sh
yr scan marker.yar sample.bin
```

The intended result is a `WikiMarker` match. Removing the marker should remove that match. This establishes a byte-pattern condition, not a vulnerability.

## Limits

Rules can match benign files or miss changed and encoded content. Preserve the rule revision with the artifact. Compare [capa](../capa/) for capability rules over extracted features and [FLOSS](../floss/) for recovering obscured strings.

## Related research

Our [malware sophistication paper](https://www.cs.montana.edu/izurieta/pubs/iETC_Porcella_2026.pdf) discusses the original YARA, not YARA-X. I include its successor here as a related tool; we did not evaluate YARA-X. See [Malware sophistication](../../research/binary-analysis/).
