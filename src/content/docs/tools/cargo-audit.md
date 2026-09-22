---
title: cargo-audit
description: Check Rust dependency versions against RustSec security advisories.
tool:
  modes: [Static]
  inputTypes: [Dependency metadata, Binaries]
  techniques: [Software composition analysis, Known vulnerability detection]
  languages: [Rust]
  languageNote: Rust describes the dependency ecosystem. This tool does not inspect Rust source logic for new defects.
  targets: [Cargo projects, Rust binaries]
  findings: [Known vulnerable dependencies]
  findingNote: Matches identified crate versions to advisories. A match does not establish reachability or exploitability; incomplete binary inventories can miss dependencies.
  environment: A host compatible with the selected cargo-audit release and Rust/Cargo toolchain, or a documented package-manager installation.
  setup: Provide Cargo.lock and advisory data for the project workflow. Binary auditing uses embedded dependency metadata when present, or a less complete recovery method otherwise.
  licenseCategory: Open source
  license: Apache-2.0 OR MIT
  cost: [Free]
  costNote: Free CLI and public RustSec advisory data. No paid tier is required for the documented audit workflows.
  website: https://rustsec.org/
  verified: '2026-09-22'
  scope: Current documented cargo audit and cargo audit bin workflows. Optional automatic dependency fixes and separate reachability tools are outside this entry.
  sources:
    - label: RustSec and lockfile auditing
      url: https://rustsec.org/
    - label: CLI installation, binary support, and license
      url: https://github.com/RustSec/rustsec/tree/main/cargo-audit
    - label: OCPP study
      url: https://www.cs.montana.edu/izurieta/pubs/CSR_2026_Wadhams.pdf
---

## Inputs

The project workflow reads `Cargo.lock` to identify resolved dependencies and consults the RustSec advisory database. It does not execute the application or require a source-analysis build.

The binary workflow can use dependency information embedded by `cargo auditable`. Without that metadata, recovery from panic strings is partial and can miss Rust crates and embedded C components. The Binaries tag therefore does not promise a complete inventory of every Rust executable.

## Example

**Illustrative workflow, not run here.** With Cargo installed:

```sh
cargo install cargo-audit --locked
```

From a project containing `Cargo.lock`, run:

```sh
cargo audit
```

For a supported release's binary workflow:

```sh
cargo audit bin path/to/program
```

Review each identified version and advisory. Preserve the lockfile or binary revision and advisory-data date with the report.

## Limits

An inventory/advisory match is not a source defect diagnosis. For Rust source checks, compare [Clippy](../clippy/) or [Kani](../kani/). For multiple dependency ecosystems, compare [OSV-Scanner](../osv-scanner/).

## Related research

We used Cargo-audit for Rust in our [OCPP study](https://www.cs.montana.edu/izurieta/pubs/CSR_2026_Wadhams.pdf). Its dependency-advisory scope is important when interpreting the Rust findings alongside source analyzers. I make that distinction explicit in [Comparing SAST tools](../../research/comparing-tools/).
