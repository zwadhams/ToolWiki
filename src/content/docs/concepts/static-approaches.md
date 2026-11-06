---
title: Static analysis approaches
description: Distinguish source, binary, dependency, configuration, and secret-scanning workflows before comparing tools.
---

**Start with what you have: source code, a binary, a dependency inventory, or configuration files.** Tools can inspect each without exercising the target application's runtime behavior, but they answer different questions.

## Source code versus binaries

| Input type | What the tool examines | Examples in this wiki |
| --- | --- | --- |
| Source code | Code structure, types, values, or possible paths, often with build and dependency context. | [Cppcheck](../../tools/cppcheck/), [PHPStan](../../tools/phpstan/), [Clippy](../../tools/clippy/) |
| Binaries | Compiled artifacts. A tool might recover code for weakness analysis or identify embedded components. | [cwe-checker](../../tools/cwe-checker/), [CVE Binary Tool](../../tools/cve-bin-tool/) |
| Dependency metadata | Package manifests, lockfiles, or software bills of materials (SBOMs). | [cargo-audit](../../tools/cargo-audit/), [OSV-Scanner](../../tools/osv-scanner/), [CVE Binary Tool](../../tools/cve-bin-tool/) |
| Container images | Installed artifacts extracted from an image without running its application. | [OSV-Scanner](../../tools/osv-scanner/) |
| Configuration files | Infrastructure definitions, Dockerfiles, or other supported configuration formats. | [Checkov](../../tools/checkov/), [Trivy](../../tools/trivy/), [Hadolint](../../tools/hadolint/) |

Use the catalog's **Input type** filter to browse [source analyzers](../../static/?input=Source%20code), [binary tools](../../static/?input=Binaries), [dependency tools](../../static/?input=Dependency%20metadata), or [configuration checks](../../static/?input=Configuration%20files). A tool with multiple input types has more than one documented workflow.

Input type and analysis mode are independent. [Memcheck](../../tools/valgrind-memcheck/) also takes a compiled program, but observes it executing and therefore belongs under dynamic analysis. A source analyzer can run build steps to prepare its input without dynamically testing the application.

For JVM class files, see [Java source and bytecode analysis](../../guides/java-analysis/). For native memory errors, compare [source, instrumented-build, and executable workflows](../../guides/memory-error-detection/).

## What kind of answer do you need?

| Technique | Main question | Example |
| --- | --- | --- |
| Linting | Does this code contain a suspicious construct or violate a selected coding rule? | [ESLint](../../tools/eslint/), [Ruff](../../tools/ruff/), [Staticcheck](../../tools/staticcheck/), [PMD](../../tools/pmd/) |
| Type checking | Are values, calls, and operations consistent with the available type information? | [PHPStan](../../tools/phpstan/) |
| Bug finding and security analysis | Can the analyzer identify a defect or potential weakness from code behavior? | [Cppcheck](../../tools/cppcheck/), [PVS-Studio](../../tools/pvs-studio/), [CodeQL](../../tools/codeql/) |
| Binary weakness analysis | Does the recovered code show a potentially vulnerable pattern? | [cwe-checker](../../tools/cwe-checker/) |
| Software composition analysis (SCA) | Do identified components match known vulnerability records? | [CVE Binary Tool](../../tools/cve-bin-tool/) |
| Infrastructure policy checks | Do selected resource definitions satisfy the configured policies? | [Checkov](../../tools/checkov/), [Trivy](../../tools/trivy/) |
| Secret scanning | Do selected files contain candidate credentials or secret-like strings? | [detect-secrets](../../tools/detect-secrets/) |
| Formal verification | Can a stated property be established under the model and assumptions? | [CBMC](../../tools/cbmc/), [Frama-C](../../tools/frama-c/), [Dafny](../../tools/dafny/) |

These categories overlap. For example, a linter can find real bugs, and an SCA tool can inspect binaries. The label describes the workflow, not a ranking of effectiveness.

[Understand static analysis methods](../advanced-static-methods/) explains value approximations, symbolic paths, proof obligations, and data flow through one bounds-check example.

## Configuration and secret checks

For Terraform or Kubernetes definitions, start with [configuration checks](../../static/?input=Configuration%20files) and read the supported format and policy list. For a Dockerfile, [Hadolint](../../tools/hadolint/) examines Dockerfile instructions and embedded shell usage; an image vulnerability scan instead examines packages in the built image.

A policy report describes the supplied definitions under the selected checks. Passed, failed, and skipped checks are distinct; a passed scan does not establish that a deployed environment matches those definitions. [Checkov's quickstart](https://www.checkov.io/1.Welcome/Quick%20Start.html) shows this distinction in its resource-policy output.

[detect-secrets](../../tools/detect-secrets/) identifies candidate strings for review and tracks a baseline. A match is not automatically a valid credential, and a baseline is not remediation. Its current-file workflow also does not establish that Git history is clear. If an actual credential was exposed, follow the issuing service's revocation or rotation procedure; deleting a line does not invalidate it. See the [project's baseline and audit workflow](https://github.com/Yelp/detect-secrets).

These checks inspect different evidence from application-source semantics and package/advisory matching. Keep the input, selected method, and resulting claim separate when [reviewing findings](../../guides/reviewing-findings/).

## Binary analysis questions

The same executable can support several kinds of investigation:

| Question | Starting tool | How to interpret the output |
| --- | --- | --- |
| What files or regions are embedded here? | [Binwalk](../../tools/binwalk/) | Candidate formats and offsets guide further inspection. |
| What code structure can be recovered? | [Ghidra](../../tools/ghidra/) | Disassembly and decompilation need analyst interpretation. |
| What strings can be recovered? | [FLOSS](../../tools/floss/) | Strings are leads; decoder emulation is distinct from a full sandbox run. |
| Does this artifact match my patterns? | [YARA-X](../../tools/yara-x/) | A match establishes the rule's condition, not malicious intent. |
| What capabilities are suggested by the evidence? | [capa](../../tools/capa/) | Record whether the evidence came from the binary or an execution report. |
| Does recovered code contain a known weakness pattern? | [cwe-checker](../../tools/cwe-checker/) | Review code recovery and the applicable checker assumptions. |
| Do identified dependencies match advisories? | [CVE Binary Tool](../../tools/cve-bin-tool/), [cargo-audit](../../tools/cargo-audit/) | Component/version identification and advisory matching are separate steps. |

These tools complement one another. Start with the question you need to answer, and preserve locations and artifact versions when moving between them.

Use **What can it find?** to filter by the kind of problem, such as memory safety or known vulnerable dependencies. Read Checks and limits before comparing coverage: some categories depend on optional rules, annotations, or instrumentation. [Verification and generated tests](../verification-and-generated-tests/) explains what different results establish.

## CWE is different from CVE

A **CWE** describes a weakness class, such as an out-of-bounds write. A **CVE** identifies a specific publicly disclosed vulnerability. See the [CWE overview](https://cwe.mitre.org/about/index.html) and [CVE Program overview](https://www.cve.org/About/Overview).

cwe-checker looks for weakness patterns in recovered code; CVE Binary Tool identifies components and matches vulnerability records. A weakness warning does not need an existing CVE, and a component-to-CVE match does not prove exploitability in your application.

## Read language filters with the input type

For a source analyzer, a language tag describes code it can inspect. For a dependency scanner, the same tag can mean it reads that ecosystem's package metadata. A binary tool's coverage instead depends on architecture, format, and how well it can interpret the artifact.

Combine **Source code + Rust** to find Rust source analysis. Selecting **Rust** alone can also show tools that inspect Rust dependency inventories. Read the language note on each tool for the distinction.

Similarly, do not assume all features in a product share a language list. PMD's bundled CPD utility detects duplication across more languages than PMD's supplied defect rules cover.

## Research in context

[Comparing SAST tools](../../research/comparing-tools/) uses the OCPP study to explain why report counts depend on project and analysis scope. [Malware sophistication](../../research/binary-analysis/) explores how the available artifact constrains quality measurements.
