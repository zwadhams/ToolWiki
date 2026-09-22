# SpotBugs: evidence record

Access/review date: 2026-09-22. Existing scope: SpotBugs 4.10.4 documentation, with Find Security Bugs explicitly treated as an optional plugin. JVM bytecode support is not native-binary support.

File: `src/content/docs/tools/spotbugs.md`. Baseline SHA-256: `1e345a894e846adfed5f13c6b39a13add08102527e01c865049150c8ef2e168c`. Reviewed SHA-256: `a62358ddb3e517a0248b3608eaeabcf01a69ecc987bd759fa141ee9f469b963d`. Original text is preserved in baseline.json.

Status: Assessed against primary documentation; see qualifications below.

## E1: evidence assessment

The documentation explicitly identifies version 4.10.4 and Java runtime requirements. It supports class/JAR input, static bug-pattern checks, textui invocation and dependency classpaths. SpotBugs is LGPL-2.1; Find Security Bugs is a separate LGPL-3.0 plugin with injection detectors. The page correctly limits Java/JVM input and qualifies the injection tag by the optional plugin. The null-dereference example is a proposed check, not an observed output.

Source sections: 4.10.4 Introduction: Requirements; Running: Executing SpotBugs, textui, analysis input and auxiliary classpath; project license; Find Security Bugs README/license

- [S1](https://spotbugs.readthedocs.io/en/stable/introduction.html)
- [S2](https://spotbugs.readthedocs.io/en/stable/running.html)
- [S3](https://github.com/spotbugs/spotbugs)
- [S4](https://github.com/find-sec-bugs/find-sec-bugs)

Correction: No content correction recorded.

## Claims and dispositions

Counts: {"supported":26,"supported with qualification":13,"contradicted":0,"unresolved":0}. Compound paragraphs retain their qualifications; list-valued fields are assessed member by member. Quoted relative links point to the corresponding repository Markdown pages.

| Location | Claim as reviewed | Verdict | Evidence / limitation |
| --- | --- | --- | --- |
| title | SpotBugs | supported | See evidence assessment E1. |
| description | Find Java bug patterns in compiled class files, with optional security checks from Find Security Bugs. | supported | See evidence assessment E1. |
| tool.modes[0] | Static | supported | See evidence assessment E1. |
| tool.inputTypes[0] | Binaries | supported | See evidence assessment E1. |
| tool.techniques[0] | Bug finding | supported | See evidence assessment E1. |
| tool.techniques[1] | Pattern matching | supported | See evidence assessment E1. |
| tool.languages[0] | Java | supported | See evidence assessment E1. |
| tool.languageNote | The input is JVM class files or JARs, not native machine code. This entry tags Java; additional JVM-language support depends on bytecode patterns and plugins. | supported | See evidence assessment E1. |
| tool.targets[0] | JVM bytecode | supported | See evidence assessment E1. |
| tool.targets[1] | Java applications | supported | See evidence assessment E1. |
| tool.findings[0] | Logic errors | supported | See evidence assessment E1. |
| tool.findings[1] | Concurrency issues | supported | See evidence assessment E1. |
| tool.findings[2] | Injection risks | supported | See evidence assessment E1. |
| tool.findingNote | Core SpotBugs provides Java bug detectors. The injection-risk tag requires the separately installed Find Security Bugs plugin; it is not a claim about the default core rules. | supported | See evidence assessment E1. |
| tool.environment | Runs on a compatible JVM on Windows, Linux, or macOS. Check both the runtime requirement and analyzed class-file version against the selected SpotBugs release. | supported | See evidence assessment E1. |
| tool.setup | Compile the project to class files or JARs and provide dependency classes when needed. Source and debug information improve navigation; install Find Security Bugs separately for its detectors. | supported | See evidence assessment E1. |
| tool.licenseCategory | Open source | supported | See evidence assessment E1. |
| tool.license | LGPL-2.1 for SpotBugs; Find Security Bugs uses LGPL-3.0 | supported | See evidence assessment E1. |
| tool.cost[0] | Free | supported | See evidence assessment E1. |
| tool.costNote | SpotBugs and the optional Find Security Bugs plugin are free open-source components. Security checks require adding the plugin, not purchasing an edition. | supported | See evidence assessment E1. |
| tool.website | https://spotbugs.github.io/ | supported | See evidence assessment E1. |
| tool.verified | 2026-09-22 | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.scope | SpotBugs 4.10.4 documentation, with Find Security Bugs explicitly treated as an optional plugin. JVM bytecode support is not native-binary support. | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.sources[0] | SpotBugs introduction and runtime requirements: https://spotbugs.readthedocs.io/en/stable/introduction.html | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.sources[1] | Command-line inputs and options: https://spotbugs.readthedocs.io/en/stable/running.html | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.sources[2] | Core project and licensing: https://github.com/spotbugs/spotbugs | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.sources[3] | Find Security Bugs plugin scope and license: https://github.com/find-sec-bugs/find-sec-bugs | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| What it examines, line 35 | SpotBugs reads compiled Java artifacts and looks for known defect patterns. A JAR is a container for bytecode and resources; selecting Binaries in the catalog does not mean SpotBugs accepts an arbitrary ELF or Windows executable. | supported | See evidence assessment E1. |
| What it examines, line 37 | Use it for Java defect checks without running the application. [JBMC](../../../src/content/docs/tools/jbmc.md) offers a different workflow: checking modeled behavior against safety properties and assertions. | supported | See evidence assessment E1. |
| Worked example: inspect compiled code, line 41 | **Illustrative example, not run here.** With a JDK and SpotBugs installed, save `NullLength.java`: | supported with qualification | Author recommendation or conditional inference, not a measured effectiveness claim. Factual premises reviewed against E1. |
| Worked example: inspect compiled code, line 43 | ```java<br>public class NullLength {<br>    public static int length() {<br>        String value = null;<br>        return value.length();<br>    }<br>}<br>``` | supported with qualification | Documentation/static reasoning only; this example has not been executed. See E1. |
| Worked example: inspect compiled code, line 52 | Compile and inspect the class: | supported with qualification | Author recommendation or conditional inference, not a measured effectiveness claim. Factual premises reviewed against E1. |
| Worked example: inspect compiled code, line 54 | ```sh<br>javac NullLength.java<br>spotbugs -textui NullLength.class<br>``` | supported with qualification | Documentation/static reasoning only; this example has not been executed. See E1. |
| Worked example: inspect compiled code, line 59 | Look for a null-dereference finding. The application does not need to execute for this check. Larger projects need their compiled dependencies available so missing classes do not obscure analysis. | supported with qualification | Author recommendation or conditional inference, not a measured effectiveness claim. Factual premises reviewed against E1. |
| Optional security plugin, line 63 | Find Security Bugs extends SpotBugs with security detectors and framework knowledge. Record the plugin version and enabled checks when comparing it with a SAST tool. A core-only run and a plugin-enabled run are different configurations. | supported | See evidence assessment E1. |
| Limits and comparisons, line 67 | Review findings in context and record exclusions. Missing dependencies, unsupported bytecode, or an unmatched pattern can leave defects undiscovered. | supported | See evidence assessment E1. |
| Limits and comparisons, line 69 | See [Java source and bytecode analysis](../../../src/content/docs/guides/java-analysis.md) for a comparison with CodeQL and JBMC. | supported | See evidence assessment E1. |
| Related research, line 73 | **Used in a study:** The [OCPP paper](https://www.cs.montana.edu/izurieta/pubs/CSR_2026_Wadhams.pdf) used SpotBugs for the Java implementation. Its discussion contrasts targeted bug-pattern findings with the broader quality findings reported by SonarQube. It does not establish that one tool is more accurate. | supported with qualification | Historical attribution only; see the research reconciliation record. No current-edition performance inference. |
| Related research, line 75 | Read [comparing SAST tools](../../../src/content/docs/research/comparing-tools.md). The paper's mention of SpotBugs does not establish use of the optional Find Security Bugs plugin; keep plugin-enabled coverage separate. | supported with qualification | Historical attribution only; see the research reconciliation record. No current-edition performance inference. |
