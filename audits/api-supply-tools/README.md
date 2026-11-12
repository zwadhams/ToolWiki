# API and supply-chain tool additions

Documentation reviewed and examples executed November 12, 2026.

## Added coverage

| Entry | Scoped contribution | Builder treatment |
| --- | --- | --- |
| Spectral | JSON/YAML document rules, with OpenAPI and AsyncAPI context. | Configuration-input workflow; no application-source claim. |
| Pact JS | Consumer-generated HTTP contracts and provider verification. | Intentionally excluded: the current builder cannot describe required pact artifacts. |
| Syft | Declared or installed software-component inventories and SBOM output. | Separate npm declaration and container-image workflows; findings are inventory, not vulnerabilities. |

The guides are `guides/api-contracts` and `guides/sbom-inventory`. Tool and guide
frontmatter link to the relevant run records. The review digests in
[review-records.json](review-records.json) identify the reviewed source files.

## API execution

The [API run record](evidence/api-contracts/run.json) captures all commands,
versions, statuses, and checked fixture hashes. The example was reinstalled from
its package lock with `npm ci --ignore-scripts --no-audit --no-fund`, then run
through `node verify.mjs`.

| Check | Observed result |
| --- | --- |
| Spectral 6.17.1 faulty document | Exit 1; one `operation-id-required` diagnostic at `paths./parcels/1.get`. |
| Spectral corrected document | Exit 0; empty diagnostic array in the dedicated JSON output file. |
| Pact JS 17.1.4 consumer | Exit 0; the actual consumer function called the mock provider and generated a pact. |
| Pact faulty provider | Exit 1; `$.status` returned integer 7 where a string was required. |
| Pact corrected provider | Exit 0; one HTTP interaction verified. |

Pact Core resolved to 20.2.0 in the package lock. Its available Windows native
package is x64, so the execution used official Node.js 24.22.1 x64 on the Windows
ARM64 host through emulation. This is not a native Windows ARM64 Pact result.
The provider version was explicit, result publication was disabled, and pact
files were exchanged locally. No broker or external API was used.

An initial Spectral console-JSON assumption was corrected: a clean run includes
an informational console message. The final fixture parses a dedicated JSON
output file. An initial provider configuration failed before verification;
the final runner checks the exact body mismatch so a setup error cannot satisfy
the expected-failure assertion.

## SBOM execution

The [SBOM run record](evidence/sbom-inventory/run.json) identifies Syft 1.57.1's
native Windows ARM64 build and the exact npm lockfiles. Both scans exited 0.
Only `javascript-lock-cataloger` was enabled, using an explicit default-cataloger
override for this isolated fixture.

The baseline inventory contains `is-number@7.0.0` and the root project. The
changed inventory additionally contains `is-odd@3.0.1` and its transitive
`is-number@6.0.0`. These are declared packages; none was installed or executed
for the scan. No vulnerability database or vulnerability scanner was used, and
neither inventory is described as defective.

## Provenance and limits

[runtime-probe.json](evidence/runtime-probe.json) records the native host Node
architecture and downloaded binary identities. The Syft ZIP matched the official
GitHub release asset SHA-256. The Node x64 ZIP matched the official release's
`SHASUMS256.txt`. These were checksum comparisons, not an independent signature
verification. Downloaded binaries remain in ignored local `work/` and are not
part of the repository deliverable.

[artifacts.json](evidence/artifacts.json) lists original and retained artifact
hashes. Workspace prefixes in retained output are replaced with `<REPO>` to
avoid publishing local filesystem details. Any non-ASCII output is escaped as
`\uXXXX`; each artifact states whether normalization occurred. Input hashes are
unchanged and are checked against the example files by the focused test.

The examples cover one document rule, one HTTP contract interaction, and two npm
inventories. They do not certify the broader rulesets, other Pact SDKs or
transports, all Syft ecosystems, or platform portability. Separate npm package
deprecation notices and a Pact runtime deprecation warning were observed; neither
changed the recorded verification results.

## Validation

`node --test tests/api-supply-tools.test.mjs` passes four checks covering catalog
scope, builder matching, the deliberate Pact exclusion, and retained input
hashes. The API verifier's five stages and the SBOM verifier also pass. Whole-site
build, navigation integration, and commit handling belong to the coordinating
workstream.
