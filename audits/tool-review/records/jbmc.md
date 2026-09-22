# JBMC: evidence record

Access/review date: 2026-09-22. Existing scope: JBMC within the CBMC project. The official introductory example uses an older version; confirm current options and class-file compatibility with the selected release.

File: `src/content/docs/tools/jbmc.md`. Baseline SHA-256: `90012662b08466250f677e5bf92a153e144103a3327c0d13cefaa79fd31619c9`. Reviewed SHA-256: `102e9615d8818d8536ce65bf284aed21d457d743de0460d4280642a01c9310ea`. Original text is preserved in baseline.json.

Status: Assessed against primary documentation; see qualifications below.

## E1: evidence assessment

The introductory example supports compiled classes, entry-class lookup, --unwind, core-models.jar and a Unix classpath separator. It explicitly uses an older JBMC version, which the Wiki discloses rather than claiming current bytecode compatibility. Array index 2 on a length-2 array violates bounds by inspection; the exact diagnostic remains unexecuted. BSD-4-Clause and model/solver limitations are accurate.

Source sections: JBMC homepage: Java bytecode quickstart; repository JBMC README; shared CBMC LICENSE

- [S1](https://www.cprover.org/jbmc/)
- [S2](https://github.com/diffblue/cbmc/blob/develop/jbmc/README.md)
- [S3](https://github.com/diffblue/cbmc/blob/develop/LICENSE)

Correction: No content correction recorded.

## Claims and dispositions

Counts: {"supported":23,"supported with qualification":12,"contradicted":0,"unresolved":0}. Compound paragraphs retain their qualifications; list-valued fields are assessed member by member. Quoted relative links point to the corresponding repository Markdown pages.

| Location | Claim as reviewed | Verdict | Evidence / limitation |
| --- | --- | --- | --- |
| title | JBMC | supported | See evidence assessment E1. |
| description | Check Java bytecode for runtime exceptions and assertion violations using bounded model checking. | supported | See evidence assessment E1. |
| tool.modes[0] | Static | supported | See evidence assessment E1. |
| tool.inputTypes[0] | Binaries | supported | See evidence assessment E1. |
| tool.techniques[0] | Bounded model checking | supported | See evidence assessment E1. |
| tool.techniques[1] | Formal verification | supported | See evidence assessment E1. |
| tool.languages[0] | Java | supported | See evidence assessment E1. |
| tool.languageNote | Compiled Java class files and their classpath. This entry does not promise equivalent support for every language that can emit JVM bytecode. | supported | See evidence assessment E1. |
| tool.targets[0] | JVM bytecode | supported | See evidence assessment E1. |
| tool.targets[1] | Java applications | supported | See evidence assessment E1. |
| tool.findings[0] | Logic errors | supported | See evidence assessment E1. |
| tool.findings[1] | Specification violations | supported | See evidence assessment E1. |
| tool.findingNote | Checks selected exception conditions and assertions in the modeled program. Library models, environment assumptions, and unwinding bounds define the scope of the result. | supported | See evidence assessment E1. |
| tool.environment | A compatible JBMC release or source-build host, plus a JDK to compile examples. JBMC inherits CBMC build prerequisites; verify release-package availability for the host. | supported | See evidence assessment E1. |
| tool.setup | Supply compiled classes, an entry point, dependencies, and JBMC runtime-library models. Configure bounds and assumptions; running the Java application is not required. | supported | See evidence assessment E1. |
| tool.licenseCategory | Open source | supported | See evidence assessment E1. |
| tool.license | BSD-4-Clause; optional and bundled solver components have their own terms | supported | See evidence assessment E1. |
| tool.cost[0] | Free | supported | See evidence assessment E1. |
| tool.costNote | Free open-source verifier. No paid JBMC edition is required for this workflow. | supported | See evidence assessment E1. |
| tool.website | https://www.cprover.org/jbmc/ | supported | See evidence assessment E1. |
| tool.verified | 2026-09-22 | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.scope | JBMC within the CBMC project. The official introductory example uses an older version; confirm current options and class-file compatibility with the selected release. | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.sources[0] | Purpose and Java class-file quickstart: https://www.cprover.org/jbmc/ | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.sources[1] | Current JBMC build and release instructions: https://github.com/diffblue/cbmc/blob/develop/jbmc/README.md | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.sources[2] | License: https://github.com/diffblue/cbmc/blob/develop/LICENSE | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| What it examines, line 33 | JBMC consumes compiled classes and models their behavior. It does not infer a complete application contract from the source. [SpotBugs](../../../src/content/docs/tools/spotbugs.md) also reads bytecode, but applies defect detectors rather than this bounded-verification workflow. | supported | See evidence assessment E1. |
| Worked example: an array bounds violation, line 37 | **Illustrative example, not run here.** Save `BoundsCheck.java`: | supported with qualification | Author recommendation or conditional inference, not a measured effectiveness claim. Factual premises reviewed against E1. |
| Worked example: an array bounds violation, line 39 | ```java<br>public class BoundsCheck {<br>    public static void main(String[] args) {<br>        int[] values = new int[2];<br>        values[2] = 7;<br>    }<br>}<br>``` | supported with qualification | Documentation/static reasoning only; this example has not been executed. See E1. |
| Worked example: an array bounds violation, line 48 | Compile with a JDK whose class-file version your JBMC release supports: | supported with qualification | Author recommendation or conditional inference, not a measured effectiveness claim. Factual premises reviewed against E1. |
| Worked example: an array bounds violation, line 50 | ```sh<br>javac BoundsCheck.java<br>``` | supported with qualification | Documentation/static reasoning only; this example has not been executed. See E1. |
| Worked example: an array bounds violation, line 54 | On a Unix-style host, replace `JBMC_MODELS` with the path to the matching `core-models.jar`, then run: | supported with qualification | Author recommendation or conditional inference, not a measured effectiveness claim. Factual premises reviewed against E1. |
| Worked example: an array bounds violation, line 56 | ```sh<br>jbmc BoundsCheck --unwind 5 --classpath "JBMC_MODELS:."<br>``` | supported with qualification | Documentation/static reasoning only; this example has not been executed. See E1. |
| Worked example: an array bounds violation, line 60 | Use the host's classpath separator when adapting the command. Look for a failed array-access or exception property. Interpret the property report rather than relying only on the overall exit status. | supported with qualification | Author recommendation or conditional inference, not a measured effectiveness claim. Factual premises reviewed against E1. |
| Bounds and environment, line 64 | A check limited to a number of loop iterations does not automatically cover longer behavior. The classpath and runtime-library models also determine which behavior is represented. | supported | See evidence assessment E1. |
| Bounds and environment, line 66 | Compare results only after matching the entry point, properties, and assumptions. See [Java source and bytecode analysis](../../../src/content/docs/guides/java-analysis.md). | supported | See evidence assessment E1. |
