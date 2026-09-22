---
title: "Kani"
description: "Check Rust safety properties and assertions with model checking and explicit proof harnesses."
tool:
  modes: ["Static"]
  inputTypes: ["Source code"]
  techniques: ["Bounded model checking","Formal verification"]
  languages: ["Rust"]
  languageNote: "Rust source supported by the selected Kani toolchain. Unsupported language features and external calls need attention; this is separate from Clippy's lint rules."
  targets: ["Rust libraries","Unsafe Rust"]
  findings: ["Memory safety","Specification violations"]
  findingNote: "Checks selected undefined behavior, panics, arithmetic conditions, and user assertions under the harness assumptions. Guarantees depend on bounds, supported features, and modeled dependencies."
  environment: "Easy-install targets include Linux x86_64 and Intel/Apple Silicon macOS. Other hosts require a supported alternative or source build; native Windows is not an easy-install target."
  setup: "Install Kani's toolchain, write proof harnesses with nondeterministic inputs, and configure assumptions and loop bounds where needed. The application need not run as an ordinary test."
  licenseCategory: "Open source"
  license: "MIT OR Apache-2.0 for Kani; bundled dependencies retain their own terms"
  cost: ["Free"]
  costNote: "Free open-source verifier. No paid edition is needed; solver time and CI compute are separate resource costs."
  website: "https://model-checking.github.io/kani/"
  verified: "2026-09-22"
  scope: "Current Kani documentation and supported Rust feature set. A bounded proof claim must state its assumptions and completeness conditions."
  sources:
    - label: "Capabilities and project scope"
      url: https://model-checking.github.io/kani/
    - label: "Installation and host targets"
      url: https://model-checking.github.io/kani/install-guide.html
    - label: "Harnesses, assumptions, and result interpretation"
      url: https://model-checking.github.io/kani/tutorial-first-steps.html
    - label: "Feature and modeling limitations"
      url: https://model-checking.github.io/kani/limitations.html
    - label: "Project licenses"
      url: https://github.com/model-checking/kani
---

## Where it fits

Kani lets you express a claim about a Rust function and ask whether the modeled inputs satisfy it. [Clippy](../clippy/) instead provides a catalog of lint checks. Both can be useful on the same crate.

## Worked example: challenge a property

**Illustrative example, not run here.** With Kani installed and set up, create a library crate and place this harness in `src/lib.rs`:

```rust
#[cfg(kani)]
#[kani::proof]
fn increment_always_increases() {
    let value: u8 = kani::any();
    let next = value.saturating_add(1);
    assert!(next > value);
}
```

Run from the crate root:

```sh
cargo kani
```

The assertion is false for `value == 255`: saturation leaves the value unchanged. Inspect the failed property and counterexample. Changing the property to `next >= value` expresses a different, valid claim for this example.

## Avoid proving the wrong problem

An assumption can exclude the failing value. That only helps if the real caller actually satisfies the assumption. Record the input domain and explain its connection to the application's contract.

Loops, external behavior, and unsupported Rust features require additional modeling. A timeout or unresolved analysis is not a successful proof.

See [verification and generated tests](../../concepts/verification-and-generated-tests/) for the distinction from property-based testing.
