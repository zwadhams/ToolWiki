# OSV-Scanner: evidence record

Access/review date: 2026-09-22. Existing scope: Current v2 scan source and scan image workflows. The input tags cover dependency inventories and images; this entry does not claim general source-defect detection.

File: `src/content/docs/tools/osv-scanner.md`. Baseline SHA-256: `5736b5b77cdbab30e1839a09e33c07f2eef1750d0a25e26094176c753a48abfb`. Reviewed SHA-256: `e096acad5d7c1c95552a721d0611780efba4dc10a55f98cd9bff4d17a1d71e12`. Original text is preserved in baseline.json.

Status: Assessed against primary documentation; see qualifications below.

## E1: evidence assessment

The manifest table supports every listed ecosystem. Image scanning inspects installed artifacts; source scanning identifies project dependencies, not arbitrary source defects. CLI binaries cover Linux/macOS/Windows and offline matching requires prepared databases. The documented source/image commands and JSON output flags support the example. Package/advisory matching alone does not show exploitability. Flags were moved before the positional directory for an unambiguous example invocation.

Source sections: v2 Usage: extraction/matching, subcommands, format/output and offline flags; Supported artifacts and manifests; Installation; Apache-2.0 LICENSE

- [S1](https://google.github.io/osv-scanner/)
- [S2](https://google.github.io/osv-scanner/supported-languages-and-lockfiles/)
- [S3](https://google.github.io/osv-scanner/usage/)
- [S4](https://google.github.io/osv-scanner/installation/)
- [S5](https://github.com/google/osv-scanner/blob/main/LICENSE)

Correction: Placed output flags before the positional source directory in the illustrative command.

## Claims and dispositions

Counts: {"supported":38,"supported with qualification":13,"contradicted":0,"unresolved":0}. Compound paragraphs retain their qualifications; list-valued fields are assessed member by member. Quoted relative links point to the corresponding repository Markdown pages.

| Location | Claim as reviewed | Verdict | Evidence / limitation |
| --- | --- | --- | --- |
| title | OSV-Scanner | supported | See evidence assessment E1. |
| description | Match project dependencies and supported container artifacts against known vulnerability records. | supported | See evidence assessment E1. |
| tool.modes[0] | Static | supported | See evidence assessment E1. |
| tool.inputTypes[0] | Dependency metadata | supported | See evidence assessment E1. |
| tool.inputTypes[1] | Container images | supported | See evidence assessment E1. |
| tool.techniques[0] | Software composition analysis | supported | See evidence assessment E1. |
| tool.techniques[1] | Known vulnerability detection | supported | See evidence assessment E1. |
| tool.languages[0] | C | supported | See evidence assessment E1. |
| tool.languages[1] | C++ | supported | See evidence assessment E1. |
| tool.languages[2] | Dart | supported | See evidence assessment E1. |
| tool.languages[3] | Elixir | supported | See evidence assessment E1. |
| tool.languages[4] | Go | supported | See evidence assessment E1. |
| tool.languages[5] | Haskell | supported | See evidence assessment E1. |
| tool.languages[6] | Java | supported | See evidence assessment E1. |
| tool.languages[7] | JavaScript | supported | See evidence assessment E1. |
| tool.languages[8] | .NET | supported | See evidence assessment E1. |
| tool.languages[9] | PHP | supported | See evidence assessment E1. |
| tool.languages[10] | Python | supported | See evidence assessment E1. |
| tool.languages[11] | R | supported | See evidence assessment E1. |
| tool.languages[12] | Ruby | supported | See evidence assessment E1. |
| tool.languages[13] | Rust | supported | See evidence assessment E1. |
| tool.languageNote | Tags describe supported dependency ecosystems, not source-level security analysis. Container artifact and manifest support differ; a source-directory scan mainly identifies dependencies. | supported | See evidence assessment E1. |
| tool.targets[0] | Dependency manifests | supported | See evidence assessment E1. |
| tool.targets[1] | Container images | supported | See evidence assessment E1. |
| tool.targets[2] | Software packages | supported | See evidence assessment E1. |
| tool.findings[0] | Known vulnerable dependencies | supported | See evidence assessment E1. |
| tool.findingNote | Matches identified package versions or commits to advisories. This does not by itself establish that a vulnerable function is reachable or exploitable in the application. | supported | See evidence assessment E1. |
| tool.environment | Official CLI binaries for Linux, macOS, and Windows. Container workflows and optional integrations have additional prerequisites. | supported | See evidence assessment E1. |
| tool.setup | Provide supported manifests, lockfiles, or a container image. Online advisory lookup is the default; offline matching needs prepared local data. A test harness is unnecessary. | supported | See evidence assessment E1. |
| tool.licenseCategory | Open source | supported | See evidence assessment E1. |
| tool.license | Apache-2.0 | supported | See evidence assessment E1. |
| tool.cost[0] | Free | supported | See evidence assessment E1. |
| tool.costNote | Free open-source scanner. Registry access, CI execution, and optional surrounding services can have separate costs. | supported | See evidence assessment E1. |
| tool.website | https://google.github.io/osv-scanner/ | supported | See evidence assessment E1. |
| tool.verified | 2026-09-22 | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.scope | Current v2 scan source and scan image workflows. The input tags cover dependency inventories and images; this entry does not claim general source-defect detection. | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.sources[0] | Purpose and advisory matching: https://google.github.io/osv-scanner/ | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.sources[1] | Supported artifacts, ecosystems, and manifests: https://google.github.io/osv-scanner/supported-languages-and-lockfiles/ | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.sources[2] | Current command syntax and output formats: https://google.github.io/osv-scanner/usage/ | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.sources[3] | Supported host installations: https://google.github.io/osv-scanner/installation/ | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.sources[4] | License: https://github.com/google/osv-scanner/blob/main/LICENSE | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| What it examines, line 37 | OSV-Scanner identifies dependencies and looks them up in vulnerability data. Its source scanning command refers to scanning a project directory; it does not imply the same code-behavior analysis as [CodeQL](../../../src/content/docs/tools/codeql.md). | supported | See evidence assessment E1. |
| What it examines, line 39 | Image scanning extracts supported installed artifacts. It is static inspection of the image, not a test of a running container. | supported | See evidence assessment E1. |
| Worked example: inspect a dependency inventory, line 43 | **Illustrative workflow, not run here.** With OSV-Scanner v2 installed, enter a project with a supported lockfile, such as `pnpm-lock.yaml` or `Cargo.lock`: | supported with qualification | Author recommendation or conditional inference, not a measured effectiveness claim. Factual premises reviewed against E1. |
| Worked example: inspect a dependency inventory, line 45 | ```sh<br>osv-scanner scan source --format json --output-file osv-results.json -r .<br>``` | supported with qualification | Documentation/static reasoning only; this example has not been executed. See E1. |
| Worked example: inspect a dependency inventory, line 49 | Review the identified package, version, ecosystem, and advisory identifiers. A result means the identified version matches the advisory conditions; investigate whether the affected behavior is used. The exact findings change with the lockfile and advisory database. | supported with qualification | Author recommendation or conditional inference, not a measured effectiveness claim. Factual premises reviewed against E1. |
| Worked example: inspect a dependency inventory, line 51 | For an image workflow, replace `IMAGE_REFERENCE` with a specific image you intend to inspect: | supported with qualification | Author recommendation or conditional inference, not a measured effectiveness claim. Factual premises reviewed against E1. |
| Worked example: inspect a dependency inventory, line 53 | ```sh<br>osv-scanner scan image IMAGE_REFERENCE<br>``` | supported with qualification | Documentation/static reasoning only; this example has not been executed. See E1. |
| Worked example: inspect a dependency inventory, line 57 | Prefer recording its immutable digest with the result. | supported with qualification | Author recommendation or conditional inference, not a measured effectiveness claim. Factual premises reviewed against E1. |
| Limits and comparisons, line 61 | A resolved lockfile is generally more precise about selected versions than an unpinned manifest. Missing inventories or unsupported extractors can leave dependencies invisible. Updating advisory data can change results without changing your software. | supported | See evidence assessment E1. |
| Limits and comparisons, line 63 | Compare [CVE Binary Tool](../../../src/content/docs/tools/cve-bin-tool.md) when your starting point is embedded component identification. Keep component detection accuracy separate from advisory matching, and distinguish a scan error from a clean report. | supported | See evidence assessment E1. |
