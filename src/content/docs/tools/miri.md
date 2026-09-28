---
title: "Miri"
description: "Run Rust code in an interpreter to detect undefined behavior in exercised tests."
tool:
  analysisWorkflows:
    - id: tests
      label: Checks over callable code
      subject: component
      inputs:
        - Callable code
      languageScope: source
      languages:
        - Rust
      findings:
        - Memory safety
        - Concurrency issues
      caveat: Checks particular executions against Miri's model of Rust behavior. Experimental aliasing
        checks and unsupported operations need careful interpretation.
      sources:
        - https://raw.githubusercontent.com/rust-lang/miri/master/README.md
        - https://doc.rust-lang.org/reference/behavior-considered-undefined.html
        - https://raw.githubusercontent.com/rust-lang/miri/master/LICENSE-MIT
      requires:
        - harness
        - testInstance
  aliases: ["cargo miri"]
  searchTerms: ["Rust undefined behavior","unsafe Rust","Rust memory safety","Rust data races"]
  modes: ["Dynamic"]
  inputTypes: ["Callable code"]
  techniques: ["Runtime memory checking","Runtime race detection"]
  languages: ["Rust"]
  languageNote: "Rust Cargo projects interpreted through compiler MIR. Foreign functions and system APIs have support limits."
  targets: ["Rust tests","Unsafe Rust libraries"]
  findings: ["Memory safety","Concurrency issues"]
  findingNote: "Checks particular executions against Miri's model of Rust behavior. Experimental aliasing checks and unsupported operations need careful interpretation."
  environment: "A Rust nightly toolchain with the Miri component and its setup dependencies."
  setup: "Provide a Cargo project and tests; pin the nightly toolchain and select a supported interpretation target."
  license: "MIT OR Apache-2.0"
  costNote: "Free open-source Rust tooling."
  website: "https://github.com/rust-lang/miri"
  scope: "Miri interpretation of Cargo programs and tests; it does not inspect arbitrary compiled native binaries."
  licenseCategory: "Open source"
  cost: ["Free"]
  verified: "2026-09-26"
  sources:
    - label: "Usage, supported operations, and limitations"
      url: https://raw.githubusercontent.com/rust-lang/miri/master/README.md
    - label: "Rust undefined behavior reference"
      url: https://doc.rust-lang.org/reference/behavior-considered-undefined.html
    - label: "MIT license option"
      url: https://raw.githubusercontent.com/rust-lang/miri/master/LICENSE-MIT
---

## Where it fits

Miri adds execution-based checking beside [Clippy](../clippy/) and [Kani](../kani/). Its scope depends on the tests you supply.

## Start with an existing test

Follow the nightly installation and Cargo test workflow. Distinguish an unsupported-operation message from a program defect.

## Keep the evidence

Save the test, toolchain, target, and relevant settings with a finding. Rust's undefined-behavior rules cover obligations that unsafe code must uphold. A clean Miri run does not prove a library sound for every caller or execution.
