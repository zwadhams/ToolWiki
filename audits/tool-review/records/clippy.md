# Clippy: evidence record

Access/review date: 2026-09-22. Existing scope: Rust Clippy's documented lint groups and Cargo workflow; not a runtime checker or a proof of application correctness.

File: `src/content/docs/tools/clippy.md`. Baseline SHA-256: `788d6c601fed7c2eeb4cc47b2f8b9715882bff51cb0e8b7005345394cca3b208`. Reviewed SHA-256: `0edc0f92fb78ed60fc06584c846da0e695eb64e83acfe6a8c8544ff56697df69`. Original text is preserved in baseline.json.

Status: Assessed against primary documentation; see qualifications below.

## E1: evidence assessment

The documented default groups are correctness, suspicious, style, complexity and performance. Pedantic, restriction and nursery are not defaults; enabling every restriction lint is discouraged. Cargo/toolchain configuration affects selected code and warnings. Clippy is a free MIT/Apache-2.0 Rust component, not a runtime checker. Build-time code execution is possible in compiler-driven Cargo workflows; suggestions and lint success are not correctness proofs.

Source sections: Clippy book: lint categories; Usage: configuration, Cargo and CI; Installation; repository License

- [S1](https://doc.rust-lang.org/clippy/)
- [S2](https://doc.rust-lang.org/clippy/usage.html)
- [S3](https://doc.rust-lang.org/clippy/installation.html)
- [S4](https://github.com/rust-lang/rust-clippy)

Correction: No content correction recorded.

## Claims and dispositions

Counts: {"supported":25,"supported with qualification":8,"contradicted":0,"unresolved":0}. Compound paragraphs retain their qualifications; list-valued fields are assessed member by member. Quoted relative links point to the corresponding repository Markdown pages.

| Location | Claim as reviewed | Verdict | Evidence / limitation |
| --- | --- | --- | --- |
| title | Clippy | supported | See evidence assessment E1. |
| description | Use Rust compiler-integrated lints to catch common mistakes and improve Rust code. | supported | See evidence assessment E1. |
| tool.modes[0] | Static | supported | See evidence assessment E1. |
| tool.inputTypes[0] | Source code | supported | See evidence assessment E1. |
| tool.techniques[0] | Linting | supported | See evidence assessment E1. |
| tool.techniques[1] | Bug finding | supported | See evidence assessment E1. |
| tool.languages[0] | Rust | supported | See evidence assessment E1. |
| tool.languageNote | Rust source analyzed through the compiler toolchain. Cargo features, build targets, and the toolchain version determine the code and lints available in a run. | supported | See evidence assessment E1. |
| tool.targets[0] | Source code | supported | See evidence assessment E1. |
| tool.licenseCategory | Open source | supported | See evidence assessment E1. |
| tool.license | MIT OR Apache-2.0 | supported | See evidence assessment E1. |
| tool.cost[0] | Free | supported | See evidence assessment E1. |
| tool.costNote | Free open-source Rust toolchain component. No paid Clippy edition or hosted account is required; build infrastructure is separate. | supported | See evidence assessment E1. |
| tool.website | https://doc.rust-lang.org/clippy/ | supported | See evidence assessment E1. |
| tool.verified | 2026-09-22 | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.scope | Rust Clippy's documented lint groups and Cargo workflow; not a runtime checker or a proof of application correctness. | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.findings[0] | Logic errors | supported | See evidence assessment E1. |
| tool.findings[1] | Coding conventions | supported | See evidence assessment E1. |
| tool.findingNote | Selected compiler-integrated lint patterns. The defaults and optional lint groups differ; this is not exhaustive verification. | supported | See evidence assessment E1. |
| tool.environment | A host with a supported Rust toolchain and Clippy component; target support follows the selected toolchain. | supported | See evidence assessment E1. |
| tool.setup | A Rust/Cargo project with dependencies and chosen features. Compiler checks may run build scripts and procedural macros; no runtime test harness. | supported | See evidence assessment E1. |
| tool.sources[0] | Clippy lint groups and defaults: https://doc.rust-lang.org/clippy/ | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.sources[1] | Clippy usage and workspace behavior: https://doc.rust-lang.org/clippy/usage.html | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.sources[2] | Clippy installation: https://doc.rust-lang.org/clippy/installation.html | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.sources[3] | Project configuration and license: https://github.com/rust-lang/rust-clippy | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| What it does, line 35 | Clippy adds lint diagnostics to Rust's compiler-based workflow. It identifies correctness mistakes, suspicious code, unnecessary complexity, and opportunities for more idiomatic or efficient code. | supported | See evidence assessment E1. |
| What it does, line 37 | Its checks complement Rust's compiler errors. Passing the compiler and Clippy does not prove that application logic, unsafe code, or external interfaces behave correctly. | supported | See evidence assessment E1. |
| Which lints run?, line 41 | \| Group \| How to interpret it \|<br>\| --- \| --- \|<br>\| Default groups \| Include correctness, suspicious code, style, complexity, and performance patterns. \|<br>\| Pedantic \| Stricter checks that can be useful but may need exceptions. \|<br>\| Restriction \| Individual restrictions on otherwise valid code; choose rules deliberately. \|<br>\| Nursery \| New lints still being developed. \| | supported | See evidence assessment E1. |
| Which lints run?, line 48 | The project explicitly advises against enabling the whole restriction group: rules can be inappropriate for your project or conflict with one another. Choose checks based on your requirements. | supported | See evidence assessment E1. |
| Inputs and workflow, line 52 | Use Clippy with a compatible Rust toolchain and the project's Cargo workspace. The usual entry point is `cargo clippy`; workspace and package selection control the scope. Compiler-driven setup may execute build scripts or procedural macros even though the target application's runtime behavior is not being tested. | supported | See evidence assessment E1. |
| Inputs and workflow, line 54 | Different feature combinations or compilation targets may include different code. Keep those choices and the minimum supported Rust version with your lint configuration. | supported | See evidence assessment E1. |
| A useful first evaluation, line 58 | Start with the default lints on a representative package. Review diagnostic explanations before enabling stricter groups, then decide which warnings should fail CI. Promoting all warnings to errors also includes ordinary compiler warnings, so toolchain upgrades can affect that policy. | supported with qualification | Author recommendation or conditional inference, not a measured effectiveness claim. Factual premises reviewed against E1. |
| A useful first evaluation, line 60 | Some suggestions can be applied automatically. Review the resulting changes and run the project's tests rather than treating a suggested rewrite as proof that behavior is preserved. | supported with qualification | Author recommendation or conditional inference, not a measured effectiveness claim. Factual premises reviewed against E1. |
