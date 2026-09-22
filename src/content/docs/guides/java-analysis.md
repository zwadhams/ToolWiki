---
title: "Java source and bytecode analysis"
description: "Choose between source analysis, bytecode bug detection, and bounded checking for a Java project."
---

Start with the artifact you can provide and the claim you want to investigate. A tool can inspect a compiled class without running the application, so bytecode input does not make an analysis dynamic.

## Compare the workflows

| Tool | Input and preparation | Main use | How to read the result |
| --- | --- | --- | --- |
| [CodeQL](../../tools/codeql/) | Source project and an extracted analysis database; preparation depends on language and build mode. | Query code behavior and data flow for security problems. | A query result is evidence to review; capture and query scope matter. |
| [SpotBugs](../../tools/spotbugs/) | Java class files or JARs, with dependency classes as needed. | Detect known Java bug patterns; add Find Security Bugs for its security checks. | Record whether plugins were enabled and whether classes were missing. |
| [JBMC](../../tools/jbmc/) | Java bytecode, entry point, library models, and exploration settings. | Check exceptions and user assertions within a modeled scope. | Distinguish a counterexample, bounded success, and an incomplete analysis. |

[Open the three-tool comparison](../../compare/?tools=tools%2Fcodeql%2Ctools%2Fspotbugs%2Ctools%2Fjbmc) for costs, setup, and source references.

## A small evaluation

Choose one Java revision with a reproducible build. Include a small null-access or array-access defect and its corrected version.

1. Record the JDK, dependency versions, and generated class-file version.
2. Prepare each tool's actual inputs. A shared source revision alone does not guarantee all three tools see equivalent code.
3. Record enabled rules or properties, missing classes, and analysis failures.
4. Inspect the evidence for the defect and compare the corrected revision.
5. Keep a small-case result separate from any claim about whole-project coverage.

The worked examples on the SpotBugs and JBMC pages are illustrative and have not been analyzed locally.

## Add execution tests

[Jazzer](../../tools/jazzer/) adds a dynamic workflow for JVM code. Compile a callable fuzz test, let the fuzzer vary its inputs, and use assertions or enabled detectors to identify failures. Its JUnit integration defaults to regression testing; enable fuzzing mode when you intend to generate new inputs.

SpotBugs inspecting class files and Jazzer executing instrumented classes both use compiled artifacts. Their conclusions differ: one reports code patterns, while the other reports failures from exercised behavior. A fuzzing run without a failure is not a proof that other inputs are safe.

## Avoid misleading comparisons

A scanner can report a pattern that a verifier never checks because its entry point cannot reach the code. A verifier can fail an assertion that no supplied scanner rule attempts to enforce. Matching the intended question is more useful than ranking raw issue counts.

Likewise, JVM bytecode is not a native executable. The Binaries filter groups compiled inputs, while each tool's notes identify the format and version requirements. The [SpotBugs documentation](https://spotbugs.readthedocs.io/en/stable/introduction.html) and [JBMC quickstart](https://www.cprover.org/jbmc/) describe their class-file workflows.
