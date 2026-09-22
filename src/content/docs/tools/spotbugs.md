---
title: "SpotBugs"
description: "Find Java bug patterns in compiled class files, with optional security checks from Find Security Bugs."
tool:
  modes: ["Static"]
  inputTypes: ["Binaries"]
  techniques: ["Bug finding","Pattern matching"]
  languages: ["Java"]
  languageNote: "The input is JVM class files or JARs, not native machine code. This entry tags Java; additional JVM-language support depends on bytecode patterns and plugins."
  targets: ["JVM bytecode","Java applications"]
  findings: ["Logic errors","Concurrency issues","Injection risks"]
  findingNote: "Core SpotBugs provides Java bug detectors. The injection-risk tag requires the separately installed Find Security Bugs plugin; it is not a claim about the default core rules."
  environment: "Runs on a compatible JVM on Windows, Linux, or macOS. Check both the runtime requirement and analyzed class-file version against the selected SpotBugs release."
  setup: "Compile the project to class files or JARs and provide dependency classes when needed. Source and debug information improve navigation; install Find Security Bugs separately for its detectors."
  licenseCategory: "Open source"
  license: "LGPL-2.1 for SpotBugs; Find Security Bugs uses LGPL-3.0"
  cost: ["Free"]
  costNote: "SpotBugs and the optional Find Security Bugs plugin are free open-source components. Security checks require adding the plugin, not purchasing an edition."
  website: "https://spotbugs.github.io/"
  verified: "2026-09-22"
  scope: "SpotBugs 4.10.4 documentation, with Find Security Bugs explicitly treated as an optional plugin. JVM bytecode support is not native-binary support."
  sources:
    - label: "SpotBugs introduction and runtime requirements"
      url: https://spotbugs.readthedocs.io/en/stable/introduction.html
    - label: "Command-line inputs and options"
      url: https://spotbugs.readthedocs.io/en/stable/running.html
    - label: "Core project and licensing"
      url: https://github.com/spotbugs/spotbugs
    - label: "Find Security Bugs plugin scope and license"
      url: https://github.com/find-sec-bugs/find-sec-bugs
---

## What it examines

SpotBugs reads compiled Java artifacts and looks for known defect patterns. A JAR is a container for bytecode and resources; selecting Binaries in the catalog does not mean SpotBugs accepts an arbitrary ELF or Windows executable.

Use it for Java defect checks without running the application. [JBMC](../jbmc/) offers a different workflow: checking modeled behavior against safety properties and assertions.

## Worked example: inspect compiled code

**Illustrative example, not run here.** With a JDK and SpotBugs installed, save `NullLength.java`:

```java
public class NullLength {
    public static int length() {
        String value = null;
        return value.length();
    }
}
```

Compile and inspect the class:

```sh
javac NullLength.java
spotbugs -textui NullLength.class
```

Look for a null-dereference finding. The application does not need to execute for this check. Larger projects need their compiled dependencies available so missing classes do not obscure analysis.

## Optional security plugin

Find Security Bugs extends SpotBugs with security detectors and framework knowledge. Record the plugin version and enabled checks when comparing it with a SAST tool. A core-only run and a plugin-enabled run are different configurations.

## Limits and comparisons

Review findings in context and record exclusions. Missing dependencies, unsupported bytecode, or an unmatched pattern can leave defects undiscovered.

See [Java source and bytecode analysis](../../guides/java-analysis/) for a comparison with CodeQL and JBMC.

## Related research

**Used in a study:** The [OCPP paper](https://www.cs.montana.edu/izurieta/pubs/CSR_2026_Wadhams.pdf) used SpotBugs for the Java implementation. Its discussion contrasts targeted bug-pattern findings with the broader quality findings reported by SonarQube. It does not establish that one tool is more accurate.

Read [comparing SAST tools](../../research/comparing-tools/). The paper's mention of SpotBugs does not establish use of the optional Find Security Bugs plugin; keep plugin-enabled coverage separate.
