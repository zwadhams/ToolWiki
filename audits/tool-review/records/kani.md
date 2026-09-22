# Kani: evidence record

Access/review date: 2026-09-22. Existing scope: Current Kani documentation and supported Rust feature set. A bounded proof claim must state its assumptions and completeness conditions.

File: `src/content/docs/tools/kani.md`. Baseline SHA-256: `92e411b3fcdc447a1598d606e1fe2719af23dd85200b6e30647427bbc910e0ad`. Reviewed SHA-256: `11049fae42d8edc82c707b8d75be8ca252d9bee7714c6be46f4da0e08126f580`. Original text is preserved in baseline.json.

Status: Assessed against primary documentation; see qualifications below.

## E1: evidence assessment

The easy-install matrix names Linux x86_64 and Intel/Apple Silicon macOS. Harnesses use cfg(kani), kani::proof and kani::any; assumptions constrain the represented domain. Bounds, unsupported features and external modeling limit proofs. The u8 saturating-add counterexample is 255 by source semantics, not a reproduced run. MIT OR Apache-2.0 and separate dependencies are documented.

Source sections: Kani introduction; Install guide; First steps: proof harnesses, any and assume; Limitations; repository licenses

- [S1](https://model-checking.github.io/kani/)
- [S2](https://model-checking.github.io/kani/install-guide.html)
- [S3](https://model-checking.github.io/kani/tutorial-first-steps.html)
- [S4](https://model-checking.github.io/kani/limitations.html)
- [S5](https://github.com/model-checking/kani)

Correction: No content correction recorded.

## Claims and dispositions

Counts: {"supported":24,"supported with qualification":12,"contradicted":0,"unresolved":0}. Compound paragraphs retain their qualifications; list-valued fields are assessed member by member. Quoted relative links point to the corresponding repository Markdown pages.

| Location | Claim as reviewed | Verdict | Evidence / limitation |
| --- | --- | --- | --- |
| title | Kani | supported | See evidence assessment E1. |
| description | Check Rust safety properties and assertions with model checking and explicit proof harnesses. | supported | See evidence assessment E1. |
| tool.modes[0] | Static | supported | See evidence assessment E1. |
| tool.inputTypes[0] | Source code | supported | See evidence assessment E1. |
| tool.techniques[0] | Bounded model checking | supported | See evidence assessment E1. |
| tool.techniques[1] | Formal verification | supported | See evidence assessment E1. |
| tool.languages[0] | Rust | supported | See evidence assessment E1. |
| tool.languageNote | Rust source supported by the selected Kani toolchain. Unsupported language features and external calls need attention; this is separate from Clippy's lint rules. | supported | See evidence assessment E1. |
| tool.targets[0] | Rust libraries | supported | See evidence assessment E1. |
| tool.targets[1] | Unsafe Rust | supported | See evidence assessment E1. |
| tool.findings[0] | Memory safety | supported | See evidence assessment E1. |
| tool.findings[1] | Specification violations | supported | See evidence assessment E1. |
| tool.findingNote | Checks selected undefined behavior, panics, arithmetic conditions, and user assertions under the harness assumptions. Guarantees depend on bounds, supported features, and modeled dependencies. | supported | See evidence assessment E1. |
| tool.environment | Easy-install targets include Linux x86_64 and Intel/Apple Silicon macOS. Other hosts require a supported alternative or source build; native Windows is not an easy-install target. | supported | See evidence assessment E1. |
| tool.setup | Install Kani's toolchain, write proof harnesses with nondeterministic inputs, and configure assumptions and loop bounds where needed. The application need not run as an ordinary test. | supported | See evidence assessment E1. |
| tool.licenseCategory | Open source | supported | See evidence assessment E1. |
| tool.license | MIT OR Apache-2.0 for Kani; bundled dependencies retain their own terms | supported | See evidence assessment E1. |
| tool.cost[0] | Free | supported | See evidence assessment E1. |
| tool.costNote | Free open-source verifier. No paid edition is needed; solver time and CI compute are separate resource costs. | supported | See evidence assessment E1. |
| tool.website | https://model-checking.github.io/kani/ | supported | See evidence assessment E1. |
| tool.verified | 2026-09-22 | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.scope | Current Kani documentation and supported Rust feature set. A bounded proof claim must state its assumptions and completeness conditions. | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.sources[0] | Capabilities and project scope: https://model-checking.github.io/kani/ | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.sources[1] | Installation and host targets: https://model-checking.github.io/kani/install-guide.html | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.sources[2] | Harnesses, assumptions, and result interpretation: https://model-checking.github.io/kani/tutorial-first-steps.html | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.sources[3] | Feature and modeling limitations: https://model-checking.github.io/kani/limitations.html | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.sources[4] | Project licenses: https://github.com/model-checking/kani | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| Where it fits, line 37 | Kani lets you express a claim about a Rust function and ask whether the modeled inputs satisfy it. [Clippy](../../../src/content/docs/tools/clippy.md) instead provides a catalog of lint checks. Both can be useful on the same crate. | supported | See evidence assessment E1. |
| Worked example: challenge a property, line 41 | **Illustrative example, not run here.** With Kani installed and set up, create a library crate and place this harness in `src/lib.rs`: | supported with qualification | Author recommendation or conditional inference, not a measured effectiveness claim. Factual premises reviewed against E1. |
| Worked example: challenge a property, line 43 | ```rust<br>#[cfg(kani)]<br>#[kani::proof]<br>fn increment_always_increases() {<br>    let value: u8 = kani::any();<br>    let next = value.saturating_add(1);<br>    assert!(next &gt; value);<br>}<br>``` | supported with qualification | Documentation/static reasoning only; this example has not been executed. See E1. |
| Worked example: challenge a property, line 53 | Run from the crate root: | supported with qualification | Author recommendation or conditional inference, not a measured effectiveness claim. Factual premises reviewed against E1. |
| Worked example: challenge a property, line 55 | ```sh<br>cargo kani<br>``` | supported with qualification | Documentation/static reasoning only; this example has not been executed. See E1. |
| Worked example: challenge a property, line 59 | The assertion is false for `value == 255`: saturation leaves the value unchanged. Inspect the failed property and counterexample. Changing the property to `next &gt;= value` expresses a different, valid claim for this example. | supported with qualification | Author recommendation or conditional inference, not a measured effectiveness claim. Factual premises reviewed against E1. |
| Avoid proving the wrong problem, line 63 | An assumption can exclude the failing value. That only helps if the real caller actually satisfies the assumption. Record the input domain and explain its connection to the application's contract. | supported | See evidence assessment E1. |
| Avoid proving the wrong problem, line 65 | Loops, external behavior, and unsupported Rust features require additional modeling. A timeout or unresolved analysis is not a successful proof. | supported | See evidence assessment E1. |
| Avoid proving the wrong problem, line 67 | See [verification and generated tests](../../../src/content/docs/concepts/verification-and-generated-tests.md) for the distinction from property-based testing. | supported | See evidence assessment E1. |
