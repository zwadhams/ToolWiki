# Jazzer: evidence record

Access/review date: 2026-09-22. Existing scope: JVM fuzzing and JUnit integration. Binary input means JVM classes reached by the harness, not an arbitrary executable accepted without preparation.

File: `src/content/docs/tools/jazzer.md`. Baseline SHA-256: `68635c0ac15963f5c7d0780f6b0cd1f993d5252fd59328f1963aa57effd20594`. Reviewed SHA-256: `68635c0ac15963f5c7d0780f6b0cd1f993d5252fd59328f1963aa57effd20594`. Original text is preserved in baseline.json.

Status: Assessed against primary documentation; see qualifications below.

## E1: evidence assessment

The README lists the exact host/architecture combinations and supports JVM Java/Kotlin targets. JUnit defaults to regression mode; JAZZER_FUZZ enables new input generation. FuzzTest accepts byte arrays and maxDuration. The BUG prefix triggers the displayed exception by inspection, without guaranteeing discovery within ten seconds. Security detectors are distinct from assertions and harness coverage.

Source sections: README: platforms, setup, fuzz tests, regression/fuzzing modes and security detectors; FuzzTest API: parameters and maxDuration; Apache-2.0 LICENSE

- [S1](https://github.com/CodeIntelligenceTesting/jazzer)
- [S2](https://codeintelligencetesting.github.io/jazzer-docs/jazzer-junit/com/code_intelligence/jazzer/junit/FuzzTest.html)
- [S3](https://github.com/CodeIntelligenceTesting/jazzer/blob/main/LICENSE)

Correction: No content correction recorded.

## Claims and dispositions

Counts: {"supported":25,"supported with qualification":10,"contradicted":0,"unresolved":0}. Compound paragraphs retain their qualifications; list-valued fields are assessed member by member. Quoted relative links point to the corresponding repository Markdown pages.

| Location | Claim as reviewed | Verdict | Evidence / limitation |
| --- | --- | --- | --- |
| title | Jazzer | supported | See evidence assessment E1. |
| description | Fuzz JVM code with execution coverage and save inputs that expose failures. | supported | See evidence assessment E1. |
| tool.modes[0] | Dynamic | supported | See evidence assessment E1. |
| tool.inputTypes[0] | Callable code | supported | See evidence assessment E1. |
| tool.inputTypes[1] | Binaries | supported | See evidence assessment E1. |
| tool.techniques[0] | Coverage-guided fuzzing | supported | See evidence assessment E1. |
| tool.languages[0] | Java | supported | See evidence assessment E1. |
| tool.languages[1] | Kotlin | supported | See evidence assessment E1. |
| tool.languageNote | Targets JVM code through a callable fuzz test and compiled classes. Java and Kotlin are documented ecosystems; arbitrary native executables are not the meaning of the Binaries tag here. | supported | See evidence assessment E1. |
| tool.targets[0] | JVM applications | supported | See evidence assessment E1. |
| tool.targets[1] | Libraries | supported | See evidence assessment E1. |
| tool.findings[0] | Crashes and hangs | supported | See evidence assessment E1. |
| tool.findings[1] | Specification violations | supported | See evidence assessment E1. |
| tool.findings[2] | Injection risks | supported | See evidence assessment E1. |
| tool.findingNote | Assertions and uncaught exceptions expose failures in exercised code. Selected security detectors add checks such as command injection; enabled detectors and harness reachability determine coverage. | supported | See evidence assessment E1. |
| tool.environment | Linux x86_64/arm64, macOS 12+ x86_64/arm64, and Windows x86_64, with a compatible JDK and test/build setup. | supported | See evidence assessment E1. |
| tool.setup | Compile the target and a fuzz harness with its dependencies. For JUnit integration, add jazzer-junit and enable fuzzing mode explicitly. | supported | See evidence assessment E1. |
| tool.licenseCategory | Open source | supported | See evidence assessment E1. |
| tool.license | Apache-2.0 | supported | See evidence assessment E1. |
| tool.cost[0] | Free | supported | See evidence assessment E1. |
| tool.costNote | Free open-source JVM fuzzer. This entry covers Jazzer itself, not commercial services offered around fuzzing. | supported | See evidence assessment E1. |
| tool.website | https://github.com/CodeIntelligenceTesting/jazzer | supported | See evidence assessment E1. |
| tool.verified | 2026-09-22 | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.scope | JVM fuzzing and JUnit integration. Binary input means JVM classes reached by the harness, not an arbitrary executable accepted without preparation. | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.sources[0] | Platforms, installation, modes, and bug detectors: https://github.com/CodeIntelligenceTesting/jazzer | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.sources[1] | FuzzTest configuration: https://codeintelligencetesting.github.io/jazzer-docs/jazzer-junit/com/code_intelligence/jazzer/junit/FuzzTest.html | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.sources[2] | License: https://github.com/CodeIntelligenceTesting/jazzer/blob/main/LICENSE | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| What it does, line 33 | Jazzer mutates inputs while observing JVM execution coverage. A harness makes the relevant function callable; assertions define behavior to check beyond ordinary exceptions. Interesting inputs can become regression tests. | supported | See evidence assessment E1. |
| Example, line 37 | **Illustrative example, not run here.** In a Maven project with a compatible JUnit setup and `jazzer-junit` dependency, add `MarkerFuzzTest.java` under the test source directory: | supported with qualification | Author recommendation or conditional inference, not a measured effectiveness claim. Factual premises reviewed against E1. |
| Example, line 39 | ```java<br>import com.code_intelligence.jazzer.junit.FuzzTest;<br><br>class MarkerFuzzTest {<br>    @FuzzTest(maxDuration = "10s")<br>    void detectsMarker(byte[] data) {<br>        if (data != null &amp;&amp; data.length &gt;= 3<br>                &amp;&amp; data[0] == 'B' &amp;&amp; data[1] == 'U' &amp;&amp; data[2] == 'G') {<br>            throw new IllegalStateException("Example failure");<br>        }<br>    }<br>}<br>``` | supported with qualification | Documentation/static reasoning only; this example has not been executed. See E1. |
| Example, line 53 | In PowerShell, enable input generation for the test run: | supported with qualification | Author recommendation or conditional inference, not a measured effectiveness claim. Factual premises reviewed against E1. |
| Example, line 55 | ```powershell<br>$env:JAZZER_FUZZ = '1'<br>mvn '-Dtest=MarkerFuzzTest' test<br>Remove-Item Env:JAZZER_FUZZ<br>``` | supported with qualification | Documentation/static reasoning only; this example has not been executed. See E1. |
| Example, line 61 | An input beginning with `BUG` is an intended witness. The short time budget does not guarantee discovery. This deliberately failing harness demonstrates the workflow; it is not a real vulnerability. | supported with qualification | Author recommendation or conditional inference, not a measured effectiveness claim. Factual premises reviewed against E1. |
| Limits, line 65 | JUnit regression mode is the default when fuzzing mode is not enabled. A passing regression run does not mean new inputs were generated. Harness reachability and the checks inside it constrain what fuzzing can discover. | supported | See evidence assessment E1. |
| Limits, line 67 | See [Java source and bytecode analysis](../../../src/content/docs/guides/java-analysis.md) for static alternatives and [libFuzzer](../../../src/content/docs/tools/libfuzzer.md) for a native-code workflow. | supported | See evidence assessment E1. |
