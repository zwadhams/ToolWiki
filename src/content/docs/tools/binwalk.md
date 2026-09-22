---
title: Binwalk
description: Identify embedded file formats and inspect firmware images and other binary containers.
tool:
  modes: [Static]
  inputTypes: [Binaries]
  techniques: [Binary analysis, Signature matching, Entropy analysis]
  languages: [Language independent]
  languageNote: Operates on file bytes and embedded formats. Rust is the implementation language of version 3, not a source language analyzed by this workflow.
  targets: [Firmware, Embedded files, Archives]
  findings: [Embedded file formats]
  findingNote: Reports candidate embedded formats and offsets. Entropy can suggest compressed or encrypted regions, but neither signatures nor entropy establish a vulnerability.
  environment: The project primarily supports 64-bit Linux and documents an Ubuntu-based Docker setup. Windows and macOS are largely untested according to its platform guide.
  setup: Supply a firmware image or other file. Extraction can require external utilities; the documented Docker build supplies a fuller dependency environment.
  licenseCategory: Open source
  license: MIT for Binwalk version 3; external extractors have separate licenses
  cost: [Free]
  costNote: Free version 3 scanner and extraction framework. This entry does not cover separate commercial firmware-analysis services or older version 2 licensing.
  website: https://github.com/ReFirmLabs/binwalk
  verified: '2026-09-22'
  scope: Binwalk version 3. Earlier version 2 tutorials can have different dependencies, commands, and licensing.
  sources:
    - label: Version 3 features and installation
      url: https://github.com/ReFirmLabs/binwalk
    - label: Supported platforms
      url: https://github.com/ReFirmLabs/binwalk/wiki/Supported-Platforms
    - label: File analysis and extraction
      url: https://github.com/ReFirmLabs/binwalk/wiki/File-Analysis-and-Extraction
    - label: Version 3 license
      url: https://github.com/ReFirmLabs/binwalk/blob/master/LICENSE
---

## What it does

Binwalk helps identify what a firmware image or other binary container may contain. A result gives an offset and a candidate format, which can guide extraction and inspection of an embedded filesystem, archive, or executable.

## Example

**Illustrative workflow, not run here.** In a supported Binwalk 3 environment, scan a firmware image you already have:

```sh
binwalk firmware.bin
```

Review the reported offsets and formats. Enable extraction separately if needed, using the release's documented options and extractor dependencies. The command above is the initial identification step.

## Limits

A recognizable header is evidence of a candidate format, not a guarantee that extraction will succeed. Compression and encryption can both affect entropy, so an entropy result needs context.

Binwalk does not by itself determine whether an embedded component has a known CVE. After locating an artifact, use [CVE Binary Tool](../cve-bin-tool/) for supported component/advisory matching or [Ghidra](../ghidra/) to inspect recovered code. Keep the original image and offsets so findings can be traced back to their source.
