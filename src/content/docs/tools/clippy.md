---
title: Clippy
description: Use Rust compiler-integrated lints to catch common mistakes and improve Rust code.
tool:
  modes: [Static]
  inputTypes: [Source code]
  techniques: [Linting, Bug finding]
  languages: [Rust]
  languageNote: Rust source analyzed through the compiler toolchain. Cargo features, build targets, and the toolchain version determine the code and lints available in a run.
  targets: [Source code]
  licenseCategory: Open source
  license: MIT OR Apache-2.0
  cost: [Free]
  costNote: Free open-source Rust toolchain component. No paid Clippy edition or hosted account is required; build infrastructure is separate.
  website: https://doc.rust-lang.org/clippy/
  verified: '2026-09-21'
  scope: Rust Clippy's documented lint groups and Cargo workflow; not a runtime checker or a proof of application correctness.
  findings: ["Logic errors","Coding conventions"]
  findingNote: "Selected compiler-integrated lint patterns. The defaults and optional lint groups differ; this is not exhaustive verification."
  environment: "A host with a supported Rust toolchain and Clippy component; target support follows the selected toolchain."
  setup: "A Rust/Cargo project with dependencies and chosen features. Compiler checks may run build scripts and procedural macros; no runtime test harness."
  sources:
    - label: Clippy lint groups and defaults
      url: https://doc.rust-lang.org/clippy/
    - label: Clippy usage and workspace behavior
      url: https://doc.rust-lang.org/clippy/usage.html
    - label: Clippy installation
      url: https://doc.rust-lang.org/clippy/installation.html
    - label: Project configuration and license
      url: https://github.com/rust-lang/rust-clippy
---

## What it does

Clippy adds lint diagnostics to Rust's compiler-based workflow. It identifies correctness mistakes, suspicious code, unnecessary complexity, and opportunities for more idiomatic or efficient code.

Its checks complement Rust's compiler errors. Passing the compiler and Clippy does not prove that application logic, unsafe code, or external interfaces behave correctly.

## Which lints run?

| Group | How to interpret it |
| --- | --- |
| Default groups | Include correctness, suspicious code, style, complexity, and performance patterns. |
| Pedantic | Stricter checks that can be useful but may need exceptions. |
| Restriction | Individual restrictions on otherwise valid code; choose rules deliberately. |
| Nursery | New lints still being developed. |

The project explicitly advises against enabling the whole restriction group: rules can be inappropriate for your project or conflict with one another. Choose checks based on your requirements.

## Inputs and workflow

Use Clippy with a compatible Rust toolchain and the project's Cargo workspace. The usual entry point is `cargo clippy`; workspace and package selection control the scope. Compiler-driven setup may execute build scripts or procedural macros even though the target application's runtime behavior is not being tested.

Different feature combinations or compilation targets may include different code. Keep those choices and the minimum supported Rust version with your lint configuration.

## A useful first evaluation

Start with the default lints on a representative package. Review diagnostic explanations before enabling stricter groups, then decide which warnings should fail CI. Promoting all warnings to errors also includes ordinary compiler warnings, so toolchain upgrades can affect that policy.

Some suggestions can be applied automatically. Review the resulting changes and run the project's tests rather than treating a suggested rewrite as proof that behavior is preserved.
