# Cppcheck (Open Source): evidence record

Access/review date: 2026-09-22. Existing scope: Open-source Cppcheck 2.22 and its manual; Premium is compared separately below.

File: `src/content/docs/tools/cppcheck.md`. Baseline SHA-256: `4cc3a7b6e3414d50510998d6e00dd2ab631b9132ddff605206f98da4506c61e8`. Reviewed SHA-256: `075a0c42d7317b13d77c91df51c173ea4edbd8d9b3d78fec70a52f155b3517c3`. Original text is preserved in baseline.json.

Status: Assessed against primary documentation; see qualifications below.

## E1: evidence assessment

The release manual supports direct source checks and compilation database import, configuration, GUI/CLI and XML reporting. The homepage supports the listed memory/logic checks and partial open-source MISRA coverage. GPL-3.0 permits use without a scanner subscription. Premium Business excludes CI, VMs and containers; Enterprise permits them and uses a lines-of-code limit. Qualification packages do not establish project compliance. The original moving manual was 2.23 development documentation, so its citation was replaced with the 2.22.0 release manual.

Source sections: 2.22.0 manual: project import, preprocessor/platform settings, library configuration, reporting; 2.22.0 COPYING; homepage: checks and standards matrix; Premium: license models

- [S1](https://cppcheck.sourceforge.io/)
- [S2](https://github.com/cppcheck-opensource/cppcheck/blob/2.22.0/man/manual.md)
- [S3](https://github.com/cppcheck-opensource/cppcheck/blob/2.22.0/COPYING)
- [S4](https://www.cppcheck.com/)
- [S5](https://raw.githubusercontent.com/cppcheck-opensource/cppcheck/2.22.0/man/manual.md)
- [S6](https://raw.githubusercontent.com/cppcheck-opensource/cppcheck/2.22.0/COPYING)

Correction: Pinned the manual and license citations to release 2.22.0, preserving the existing 2.22 scope.

## Claims and dispositions

Counts: {"supported":25,"supported with qualification":11,"contradicted":0,"unresolved":0}. Compound paragraphs retain their qualifications; list-valued fields are assessed member by member. Quoted relative links point to the corresponding repository Markdown pages.

| Location | Claim as reviewed | Verdict | Evidence / limitation |
| --- | --- | --- | --- |
| title | Cppcheck (Open Source) | supported | See evidence assessment E1. |
| description | Find undefined behavior, memory errors, and other defects in C and C++ source code. | supported | See evidence assessment E1. |
| tool.modes[0] | Static | supported | See evidence assessment E1. |
| tool.inputTypes[0] | Source code | supported | See evidence assessment E1. |
| tool.techniques[0] | Bug finding | supported | See evidence assessment E1. |
| tool.techniques[1] | Data flow analysis | supported | See evidence assessment E1. |
| tool.languages[0] | C | supported | See evidence assessment E1. |
| tool.languages[1] | C++ | supported | See evidence assessment E1. |
| tool.languageNote | C and C++ source analysis. Configure the target platform, preprocessor definitions, and library models for the build you actually ship. | supported | See evidence assessment E1. |
| tool.targets[0] | Source code | supported | See evidence assessment E1. |
| tool.licenseCategory | Open source | supported | See evidence assessment E1. |
| tool.license | GPL-3.0 | supported | See evidence assessment E1. |
| tool.cost[0] | Free | supported | See evidence assessment E1. |
| tool.costNote | The open-source analyzer is free, including for commercial code analysis. Cppcheck Premium is a separate paid offering with additional analysis and reporting; its features are not included in this entry's filter tags. | supported | See evidence assessment E1. |
| tool.editionGroup | cppcheck | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.website | https://cppcheck.sourceforge.io/ | supported | See evidence assessment E1. |
| tool.verified | 2026-09-22 | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.scope | Open-source Cppcheck 2.22 and its manual; Premium is compared separately below. | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.findings[0] | Memory safety | supported | See evidence assessment E1. |
| tool.findings[1] | Logic errors | supported | See evidence assessment E1. |
| tool.findings[2] | Coding-standard violations | supported | See evidence assessment E1. |
| tool.findingNote | Selected defect checks and partial open-source coding-standard checks. Premium coverage is not inherited by these tags. | supported | See evidence assessment E1. |
| tool.environment | Windows, Linux, macOS, and other buildable hosts; package availability varies. | supported | See evidence assessment E1. |
| tool.setup | Source can be checked directly; a compilation database or project import improves build context. Supply includes, macros, target platform, and library models. | supported | See evidence assessment E1. |
| tool.sources[0] | Cppcheck overview and open-source feature matrix: https://cppcheck.sourceforge.io/ | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.sources[1] | Cppcheck 2.22.0 manual and configuration: https://github.com/cppcheck-opensource/cppcheck/blob/2.22.0/man/manual.md | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.sources[2] | Cppcheck 2.22.0 license: https://github.com/cppcheck-opensource/cppcheck/blob/2.22.0/COPYING | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.sources[3] | Premium capabilities and license options: https://www.cppcheck.com/ | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| What it does, line 36 | Cppcheck examines C/C++ code for defects such as null pointer use, out-of-bounds access, uninitialized variables, and invalid memory management. Its flow-sensitive analysis tracks information about values through code. A finding can identify a correctness problem with security consequences; it does not necessarily establish an exploitable vulnerability. | supported | See evidence assessment E1. |
| Inputs and workflow, line 40 | You can analyze files directly or import a project configuration, including a compilation database. Build information helps supply the right includes and definitions. Library configuration files describe behavior that the analyzer cannot infer from a declaration alone. | supported | See evidence assessment E1. |
| Inputs and workflow, line 42 | The command-line tool fits local checks and continuous integration. The graphical interface provides another way to configure analysis and browse diagnostics. Findings identify the check and source location; the manual documents text and XML reporting. | supported | See evidence assessment E1. |
| When it is useful, line 46 | Consider it for native or embedded C/C++ projects, including code with platform-specific definitions. It can complement [Clang Static Analyzer](../../../src/content/docs/tools/clang-static-analyzer.md) because the tools use different analyses and checks. | supported with qualification | Author recommendation or conditional inference, not a measured effectiveness claim. Factual premises reviewed against E1. |
| Coverage limits, line 50 | - A different platform or set of preprocessor definitions can expose different code paths. Record which configuration was checked.<br>- The analyzer deliberately makes tradeoffs that can miss defects. An empty report is not a proof of correctness.<br>- Open-source MISRA support is partial. Premium offers additional standards coverage and compliance reporting; a tool report alone does not establish product compliance. | supported | See evidence assessment E1. |
| A useful first evaluation, line 56 | Follow the official manual to import a representative build configuration. Review configuration diagnostics before judging defect findings, then examine a small set of results with the check descriptions. Keep the analyzer version, enabled checks, exclusions, and library configuration with the report. | supported with qualification | Author recommendation or conditional inference, not a measured effectiveness claim. Factual premises reviewed against E1. |
| Related research, line 60 | **Used in a study:** The [OCPP paper](https://www.cs.montana.edu/izurieta/pubs/CSR_2026_Wadhams.pdf) used Cppcheck for its C and C++ implementations. The reported counts describe those projects and study configurations; they are not validated accuracy measurements or a comparison of Open Source and Premium. | supported with qualification | Historical attribution only; see the research reconciliation record. No current-edition performance inference. |
| Related research, line 62 | See [comparing SAST tools](../../../src/content/docs/research/comparing-tools.md) for how to compare scope and useful findings before combining reports. | supported with qualification | Historical attribution only; see the research reconciliation record. No current-edition performance inference. |
