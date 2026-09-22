---
title: "JBMC"
description: "Check Java bytecode for runtime exceptions and assertion violations using bounded model checking."
tool:
  modes: ["Static"]
  inputTypes: ["Binaries"]
  techniques: ["Bounded model checking","Formal verification"]
  languages: ["Java"]
  languageNote: "Compiled Java class files and their classpath. This entry does not promise equivalent support for every language that can emit JVM bytecode."
  targets: ["JVM bytecode","Java applications"]
  findings: ["Logic errors","Specification violations"]
  findingNote: "Checks selected exception conditions and assertions in the modeled program. Library models, environment assumptions, and unwinding bounds define the scope of the result."
  environment: "A compatible JBMC release or source-build host, plus a JDK to compile examples. JBMC inherits CBMC build prerequisites; verify release-package availability for the host."
  setup: "Supply compiled classes, an entry point, dependencies, and JBMC runtime-library models. Configure bounds and assumptions; running the Java application is not required."
  licenseCategory: "Open source"
  license: "BSD-4-Clause; optional and bundled solver components have their own terms"
  cost: ["Free"]
  costNote: "Free open-source verifier. No paid JBMC edition is required for this workflow."
  website: "https://www.cprover.org/jbmc/"
  verified: "2026-09-22"
  scope: "JBMC within the CBMC project. The official introductory example uses an older version; confirm current options and class-file compatibility with the selected release."
  sources:
    - label: "Purpose and Java class-file quickstart"
      url: https://www.cprover.org/jbmc/
    - label: "Current JBMC build and release instructions"
      url: https://github.com/diffblue/cbmc/blob/develop/jbmc/README.md
    - label: "License"
      url: https://github.com/diffblue/cbmc/blob/develop/LICENSE
---

## What it examines

JBMC consumes compiled classes and models their behavior. It does not infer a complete application contract from the source. [SpotBugs](../spotbugs/) also reads bytecode, but applies defect detectors rather than this bounded-verification workflow.

## Worked example: an array bounds violation

**Illustrative example, not run here.** Save `BoundsCheck.java`:

```java
public class BoundsCheck {
    public static void main(String[] args) {
        int[] values = new int[2];
        values[2] = 7;
    }
}
```

Compile with a JDK whose class-file version your JBMC release supports:

```sh
javac BoundsCheck.java
```

On a Unix-style host, replace `JBMC_MODELS` with the path to the matching `core-models.jar`, then run:

```sh
jbmc BoundsCheck --unwind 5 --classpath "JBMC_MODELS:."
```

Use the host's classpath separator when adapting the command. Look for a failed array-access or exception property. Interpret the property report rather than relying only on the overall exit status.

## Bounds and environment

A check limited to a number of loop iterations does not automatically cover longer behavior. The classpath and runtime-library models also determine which behavior is represented.

Compare results only after matching the entry point, properties, and assumptions. See [Java source and bytecode analysis](../../guides/java-analysis/).
