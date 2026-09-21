---
title: Static analysis approaches
description: Distinguish source analysis, binary analysis, and known-vulnerability matching before comparing tools.
---

**Start with what you have: source code, a compiled binary, or a dependency inventory.** Tools can inspect each without exercising the target application's runtime behavior, but they answer different questions.

## Source code versus binaries

| Input type | What the tool examines | Examples in this wiki |
| --- | --- | --- |
| Source code | Code structure, types, values, or possible paths, often with build and dependency context. | [Cppcheck](../../tools/cppcheck/), [PHPStan](../../tools/phpstan/), [Clippy](../../tools/clippy/) |
| Binaries | Compiled artifacts. A tool might recover code for weakness analysis or identify embedded components. | [cwe-checker](../../tools/cwe-checker/), [CVE Binary Tool](../../tools/cve-bin-tool/) |
| Dependency metadata | Package manifests, lockfiles, or software bills of materials (SBOMs). | [CVE Binary Tool](../../tools/cve-bin-tool/) |

Use the catalog's **Input type** filter to browse [source analyzers](../../static/?input=Source%20code), [binary tools](../../static/?input=Binaries), or [dependency tools](../../static/?input=Dependency%20metadata). A tool with multiple input types has more than one documented workflow.

Input type and analysis mode are independent. [Memcheck](../../tools/valgrind-memcheck/) also takes a compiled program, but observes it executing and therefore belongs under dynamic analysis. A source analyzer can run build steps to prepare its input without dynamically testing the application.

## What kind of answer do you need?

| Technique | Main question | Example |
| --- | --- | --- |
| Linting | Does this code contain a suspicious construct or violate a selected coding rule? | [ESLint](../../tools/eslint/), [Ruff](../../tools/ruff/), [Staticcheck](../../tools/staticcheck/), [PMD](../../tools/pmd/) |
| Type checking | Are values, calls, and operations consistent with the available type information? | [PHPStan](../../tools/phpstan/) |
| Bug finding and security analysis | Can the analyzer identify a defect or potential weakness from code behavior? | [Cppcheck](../../tools/cppcheck/), [PVS-Studio](../../tools/pvs-studio/), [CodeQL](../../tools/codeql/) |
| Binary weakness analysis | Does the recovered code show a potentially vulnerable pattern? | [cwe-checker](../../tools/cwe-checker/) |
| Software composition analysis (SCA) | Do identified components match known vulnerability records? | [CVE Binary Tool](../../tools/cve-bin-tool/) |
| Formal verification | Can a stated property be established under the model and assumptions? | [CBMC](../../tools/cbmc/), [Frama-C](../../tools/frama-c/), [Dafny](../../tools/dafny/) |

These categories overlap. For example, a linter can find real bugs, and an SCA tool can inspect binaries. The label describes the workflow, not a ranking of effectiveness.

Use **What can it find?** to filter by the kind of problem, such as memory safety or known vulnerable dependencies. Read Finding scope before comparing coverage: some categories depend on optional rules, annotations, or instrumentation. [Verification and generated tests](../verification-and-generated-tests/) explains what different results establish.

## CWE is different from CVE

A **CWE** describes a weakness class, such as an out-of-bounds write. A **CVE** identifies a specific publicly disclosed vulnerability. See the [CWE overview](https://cwe.mitre.org/about/index.html) and [CVE Program overview](https://www.cve.org/About/Overview).

The similar names of cwe-checker and CVE Binary Tool conceal different jobs. One looks for weakness patterns in recovered code; the other identifies components and matches vulnerability records. A weakness warning does not need an existing CVE, and a component-to-CVE match does not prove exploitability in your application.

## Read language filters with the input type

For a source analyzer, a language tag describes code it can inspect. For a dependency scanner, the same tag can mean it reads that ecosystem's package metadata. A binary tool's coverage instead depends on architecture, format, and how well it can interpret the artifact.

Combine **Source code + Rust** to find Rust source analysis. Selecting **Rust** alone can also show tools that inspect Rust dependency inventories. Read the language note on each tool for the distinction.

Similarly, do not assume all features in a product share a language list. PMD's bundled CPD utility detects duplication across more languages than PMD's supplied defect rules cover.
