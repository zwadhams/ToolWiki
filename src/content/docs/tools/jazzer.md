---
title: Jazzer
description: Fuzz JVM code with execution coverage and save inputs that expose failures.
tool:
  modes: [Dynamic]
  inputTypes: [Callable code, Binaries]
  techniques: [Coverage-guided fuzzing]
  languages: [Java, Kotlin]
  languageNote: Targets JVM code through a callable fuzz test and compiled classes. Java and Kotlin are documented ecosystems; arbitrary native executables are not the meaning of the Binaries tag here.
  targets: [JVM applications, Libraries]
  findings: [Crashes and hangs, Specification violations, Injection risks]
  findingNote: Assertions and uncaught exceptions expose failures in exercised code. Selected security detectors add checks such as command injection; enabled detectors and harness reachability determine coverage.
  environment: Linux x86_64/arm64, macOS 12+ x86_64/arm64, and Windows x86_64, with a compatible JDK and test/build setup.
  setup: Compile the target and a fuzz harness with its dependencies. For JUnit integration, add jazzer-junit and enable fuzzing mode explicitly.
  licenseCategory: Open source
  license: Apache-2.0
  cost: [Free]
  costNote: Free open-source JVM fuzzer. This entry covers Jazzer itself, not commercial services offered around fuzzing.
  website: https://github.com/CodeIntelligenceTesting/jazzer
  verified: '2026-09-22'
  scope: JVM fuzzing and JUnit integration. Binary input means JVM classes reached by the harness, not an arbitrary executable accepted without preparation.
  sources:
    - label: Platforms, installation, modes, and bug detectors
      url: https://github.com/CodeIntelligenceTesting/jazzer
    - label: FuzzTest configuration
      url: https://codeintelligencetesting.github.io/jazzer-docs/jazzer-junit/com/code_intelligence/jazzer/junit/FuzzTest.html
    - label: License
      url: https://github.com/CodeIntelligenceTesting/jazzer/blob/main/LICENSE
---

## What it does

Jazzer mutates inputs while observing JVM execution coverage. A harness makes the relevant function callable; assertions define behavior to check beyond ordinary exceptions. Interesting inputs can become regression tests.

## Example

**Illustrative example, not run here.** In a Maven project with a compatible JUnit setup and `jazzer-junit` dependency, add `MarkerFuzzTest.java` under the test source directory:

```java
import com.code_intelligence.jazzer.junit.FuzzTest;

class MarkerFuzzTest {
    @FuzzTest(maxDuration = "10s")
    void detectsMarker(byte[] data) {
        if (data != null && data.length >= 3
                && data[0] == 'B' && data[1] == 'U' && data[2] == 'G') {
            throw new IllegalStateException("Example failure");
        }
    }
}
```

In PowerShell, enable input generation for the test run:

```powershell
$env:JAZZER_FUZZ = '1'
mvn '-Dtest=MarkerFuzzTest' test
Remove-Item Env:JAZZER_FUZZ
```

An input beginning with `BUG` is an intended witness. The short time budget does not guarantee discovery. This deliberately failing harness demonstrates the workflow; it is not a real vulnerability.

## Limits

JUnit regression mode is the default when fuzzing mode is not enabled. A passing regression run does not mean new inputs were generated. Harness reachability and the checks inside it constrain what fuzzing can discover.

See [Java source and bytecode analysis](../../guides/java-analysis/) for static alternatives and [libFuzzer](../libfuzzer/) for a native-code workflow.
