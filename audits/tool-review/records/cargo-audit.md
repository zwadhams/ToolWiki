# cargo-audit: evidence record

Access/review date: 2026-09-22. Existing scope: Current documented cargo audit and cargo audit bin workflows. Optional automatic dependency fixes and separate reachability tools are outside this entry.

File: `src/content/docs/tools/cargo-audit.md`. Baseline SHA-256: `d7ef93bf86cc95ac3ef8335ab5a3de82313348a28be2dd230b702cd47574c27c`. Reviewed SHA-256: `d7ef93bf86cc95ac3ef8335ab5a3de82313348a28be2dd230b702cd47574c27c`. Original text is preserved in baseline.json.

Status: Assessed against primary documentation; see qualifications below.

## E1: evidence assessment

The README supports lockfile auditing and the bin command, embedded cargo-auditable metadata, partial fallback recovery from panic strings, and omitted C components. It documents Cargo installation and package-manager alternatives and Apache-2.0 OR MIT licensing. Advisory matching does not establish affected-code reachability; the README explicitly discusses unused affected APIs/features. Commands remain illustrative. The paper identifies cargo-audit as the Rust tool, without making it a source analyzer.

Source sections: RustSec homepage: cargo-audit and cargo-auditable; cargo-audit README: Requirements, Installation, bin subcommand, Ignoring advisories, License

- [S1](https://rustsec.org/)
- [S2](https://github.com/RustSec/rustsec/tree/main/cargo-audit)
- [S3](https://www.cs.montana.edu/izurieta/pubs/CSR_2026_Wadhams.pdf)

Correction: No content correction recorded.

## Claims and dispositions

Counts: {"supported":23,"supported with qualification":13,"contradicted":0,"unresolved":0}. Compound paragraphs retain their qualifications; list-valued fields are assessed member by member. Quoted relative links point to the corresponding repository Markdown pages.

| Location | Claim as reviewed | Verdict | Evidence / limitation |
| --- | --- | --- | --- |
| title | cargo-audit | supported | See evidence assessment E1. |
| description | Check Rust dependency versions against RustSec security advisories. | supported | See evidence assessment E1. |
| tool.modes[0] | Static | supported | See evidence assessment E1. |
| tool.inputTypes[0] | Dependency metadata | supported | See evidence assessment E1. |
| tool.inputTypes[1] | Binaries | supported | See evidence assessment E1. |
| tool.techniques[0] | Software composition analysis | supported | See evidence assessment E1. |
| tool.techniques[1] | Known vulnerability detection | supported | See evidence assessment E1. |
| tool.languages[0] | Rust | supported | See evidence assessment E1. |
| tool.languageNote | Rust describes the dependency ecosystem. This tool does not inspect Rust source logic for new defects. | supported | See evidence assessment E1. |
| tool.targets[0] | Cargo projects | supported | See evidence assessment E1. |
| tool.targets[1] | Rust binaries | supported | See evidence assessment E1. |
| tool.findings[0] | Known vulnerable dependencies | supported | See evidence assessment E1. |
| tool.findingNote | Matches identified crate versions to advisories. A match does not establish reachability or exploitability; incomplete binary inventories can miss dependencies. | supported | See evidence assessment E1. |
| tool.environment | A host compatible with the selected cargo-audit release and Rust/Cargo toolchain, or a documented package-manager installation. | supported | See evidence assessment E1. |
| tool.setup | Provide Cargo.lock and advisory data for the project workflow. Binary auditing uses embedded dependency metadata when present, or a less complete recovery method otherwise. | supported | See evidence assessment E1. |
| tool.licenseCategory | Open source | supported | See evidence assessment E1. |
| tool.license | Apache-2.0 OR MIT | supported | See evidence assessment E1. |
| tool.cost[0] | Free | supported | See evidence assessment E1. |
| tool.costNote | Free CLI and public RustSec advisory data. No paid tier is required for the documented audit workflows. | supported | See evidence assessment E1. |
| tool.website | https://rustsec.org/ | supported | See evidence assessment E1. |
| tool.verified | 2026-09-22 | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.scope | Current documented cargo audit and cargo audit bin workflows. Optional automatic dependency fixes and separate reachability tools are outside this entry. | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.sources[0] | RustSec and lockfile auditing: https://rustsec.org/ | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.sources[1] | CLI installation, binary support, and license: https://github.com/RustSec/rustsec/tree/main/cargo-audit | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.sources[2] | OCPP study: https://www.cs.montana.edu/izurieta/pubs/CSR_2026_Wadhams.pdf | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| Inputs, line 33 | The project workflow reads `Cargo.lock` to identify resolved dependencies and consults the RustSec advisory database. It does not execute the application or require a source-analysis build. | supported | See evidence assessment E1. |
| Inputs, line 35 | The binary workflow can use dependency information embedded by `cargo auditable`. Without that metadata, recovery from panic strings is partial and can miss Rust crates and embedded C components. The Binaries tag therefore does not promise a complete inventory of every Rust executable. | supported | See evidence assessment E1. |
| Example, line 39 | **Illustrative workflow, not run here.** With Cargo installed: | supported with qualification | Author recommendation or conditional inference, not a measured effectiveness claim. Factual premises reviewed against E1. |
| Example, line 41 | ```sh<br>cargo install cargo-audit --locked<br>``` | supported with qualification | Documentation/static reasoning only; this example has not been executed. See E1. |
| Example, line 45 | From a project containing `Cargo.lock`, run: | supported with qualification | Author recommendation or conditional inference, not a measured effectiveness claim. Factual premises reviewed against E1. |
| Example, line 47 | ```sh<br>cargo audit<br>``` | supported with qualification | Documentation/static reasoning only; this example has not been executed. See E1. |
| Example, line 51 | For a supported release's binary workflow: | supported with qualification | Author recommendation or conditional inference, not a measured effectiveness claim. Factual premises reviewed against E1. |
| Example, line 53 | ```sh<br>cargo audit bin path/to/program<br>``` | supported with qualification | Documentation/static reasoning only; this example has not been executed. See E1. |
| Example, line 57 | Review each identified version and advisory. Preserve the lockfile or binary revision and advisory-data date with the report. | supported with qualification | Author recommendation or conditional inference, not a measured effectiveness claim. Factual premises reviewed against E1. |
| Limits, line 61 | An inventory/advisory match is not a source defect diagnosis. For Rust source checks, compare [Clippy](../../../src/content/docs/tools/clippy.md) or [Kani](../../../src/content/docs/tools/kani.md). For multiple dependency ecosystems, compare [OSV-Scanner](../../../src/content/docs/tools/osv-scanner.md). | supported | See evidence assessment E1. |
| Related research, line 65 | We used Cargo-audit for Rust in our [OCPP study](https://www.cs.montana.edu/izurieta/pubs/CSR_2026_Wadhams.pdf). Its dependency-advisory scope is important when interpreting the Rust findings alongside source analyzers. I make that distinction explicit in [Comparing SAST tools](../../../src/content/docs/research/comparing-tools.md). | supported with qualification | Historical attribution only; see the research reconciliation record. No current-edition performance inference. |
