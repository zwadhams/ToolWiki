---
title: Static vs. dynamic analysis
description: Understand whether a tool reasons about code or observes software executing.
---

**Static analysis inspects a program without exercising its runtime behavior. Dynamic analysis examines actual or emulated executions, either live or through recorded traces.** These labels describe how analysis happens, not whether a tool only finds security issues.

## Two views of the same problem

Imagine a function that reads a file and copies its contents into a buffer.

- A static analyzer can inspect the possible paths and reason about a copy that might exceed the buffer.
- A dynamic checker can observe an invalid memory access when a test input actually triggers that copy.

The first gives evidence from a model of the code. The second gives evidence from an observed execution. Neither guarantees that every defect has been found.

| Question | Static analysis | Dynamic analysis |
| --- | --- | --- |
| What does it need? | Source, bytecode, or another code representation, depending on the tool. | Executable software and a way to exercise or observe it, or recorded execution data. |
| Does the target execute during analysis? | No. A build or extraction step may still be required. | Live tools exercise the target; trace monitors can analyze data from an earlier execution. |
| What limits coverage? | Models, rules, language support, and analysis scope. | Inputs, reached paths, environment, and instrumentation. |
| Example in this wiki | [Clang Static Analyzer](../../tools/clang-static-analyzer/) | [Valgrind Memcheck](../../tools/valgrind-memcheck/) |

## Where security testing fits

SAST and DAST focus on application security. Static and dynamic analysis also serve other goals, including finding correctness bugs and understanding runtime behavior.

[Static analysis approaches](../static-approaches/) explains source analysis, compiled-binary inspection, and dependency vulnerability matching. Use the catalog's Input type filter to distinguish them; the input's format alone does not determine whether the analysis is static or dynamic.

[SAST vs. DAST](../sast-vs-dast/) explains the security-specific terms. [Ways to do DAST](../dast-approaches/) separates web scanning choices from related dynamic techniques.

[Model and temporal falsification](../model-falsification/) covers simulation searches for violations of behavioral requirements, including requirements about timing. These tools belong under dynamic analysis because they execute models and inspect traces.

[RTAMT](../../tools/rtamt/) and capa's [sandbox-report workflow](../../tools/capa/) can analyze recorded execution data without running the original program again. FLOSS's [decoder emulation](../../tools/floss/) is also distinguished from a full-program sandbox run in this catalog.

## Sources

- [OWASP source code analysis overview](https://owasp.org/www-community/Source_Code_Analysis_Tools)
- [Clang Static Analyzer documentation](https://clang.llvm.org/docs/ClangStaticAnalyzer.html)
- [Valgrind Memcheck manual](https://valgrind.org/docs/manual/mc-manual.html)
