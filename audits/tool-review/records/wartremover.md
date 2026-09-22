# WartRemover: evidence record

Access/review date: 2026-09-22. Existing scope: Documented sbt integration and selected built-in warts. Version 3.6.2 is the installation example used here, subject to Scala compiler compatibility.

File: `src/content/docs/tools/wartremover.md`. Baseline SHA-256: `93772415f56ac15b8fd9f0fe9164b5d9fc05cecde9fa4f2bde126e87c82d432f`. Reviewed SHA-256: `93772415f56ac15b8fd9f0fe9164b5d9fc05cecde9fa4f2bde126e87c82d432f`. Original text is preserved in baseline.json.

Status: Assessed against primary documentation; see qualifications below.

## E1: evidence assessment

The installation page uses version 3.6.2 and disables warning/error lists by default in the sbt workflow. Selected Wart.OptionPartial checks Option.get during Scala compilation; compiler compatibility is explicitly required. The Apache-2.0 license supports free use. Other build integrations have different defaults, so this entry correctly scopes its claims to sbt rather than all integrations.

Source sections: Installation and Setup: sbt 3.6.2 example, defaults and rule selection; Built-in Warts: OptionPartial and Null; License

- [S1](https://www.wartremover.org/doc/install-setup.html)
- [S2](https://www.wartremover.org/doc/warts.html)
- [S3](https://www.wartremover.org/dev/license.html)
- [S4](https://www.cs.montana.edu/izurieta/pubs/CSR_2026_Wadhams.pdf)

Correction: No content correction recorded.

## Claims and dispositions

Counts: {"supported":23,"supported with qualification":12,"contradicted":0,"unresolved":0}. Compound paragraphs retain their qualifications; list-valued fields are assessed member by member. Quoted relative links point to the corresponding repository Markdown pages.

| Location | Claim as reviewed | Verdict | Evidence / limitation |
| --- | --- | --- | --- |
| title | WartRemover | supported | See evidence assessment E1. |
| description | Apply selected Scala compiler checks to constructs that can weaken type safety or hide mistakes. | supported | See evidence assessment E1. |
| tool.modes[0] | Static | supported | See evidence assessment E1. |
| tool.inputTypes[0] | Source code | supported | See evidence assessment E1. |
| tool.techniques[0] | Linting | supported | See evidence assessment E1. |
| tool.techniques[1] | Bug finding | supported | See evidence assessment E1. |
| tool.languages[0] | Scala | supported | See evidence assessment E1. |
| tool.languageNote | Uses Scala compiler integration. Choose plugin artifacts compatible with the project's Scala version; this is not arbitrary JVM bytecode analysis. | supported | See evidence assessment E1. |
| tool.targets[0] | Scala applications | supported | See evidence assessment E1. |
| tool.targets[1] | Libraries | supported | See evidence assessment E1. |
| tool.findings[0] | Coding conventions | supported | See evidence assessment E1. |
| tool.findings[1] | Logic errors | supported | See evidence assessment E1. |
| tool.findingNote | Reports enabled warts, such as partial Option access or disallowed null usage. Rules enforce selected restrictions and do not prove overall program safety. | supported | See evidence assessment E1. |
| tool.environment | A compatible Scala compiler and JVM build environment, commonly sbt. Plugin compatibility is tied to the compiler version. | supported | See evidence assessment E1. |
| tool.setup | Install the compiler/build plugin and explicitly select rules as warnings or errors. The documented default enables neither set of rules. | supported | See evidence assessment E1. |
| tool.licenseCategory | Open source | supported | See evidence assessment E1. |
| tool.license | Apache-2.0 | supported | See evidence assessment E1. |
| tool.cost[0] | Free | supported | See evidence assessment E1. |
| tool.costNote | Free compiler plugin and supplied checks. No paid analysis tier is required. | supported | See evidence assessment E1. |
| tool.website | https://www.wartremover.org/ | supported | See evidence assessment E1. |
| tool.verified | 2026-09-22 | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.scope | Documented sbt integration and selected built-in warts. Version 3.6.2 is the installation example used here, subject to Scala compiler compatibility. | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.sources[0] | Installation, defaults, and compiler integration: https://www.wartremover.org/doc/install-setup.html | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.sources[1] | Built-in warts: https://www.wartremover.org/doc/warts.html | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.sources[2] | License: https://www.wartremover.org/dev/license.html | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.sources[3] | OCPP study: https://www.cs.montana.edu/izurieta/pubs/CSR_2026_Wadhams.pdf | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| What it does, line 35 | WartRemover checks Scala code during compilation. Each wart describes a construct to flag, such as calling `get` on an `Option`, where an empty value would throw. You decide which restrictions suit the project. | supported | See evidence assessment E1. |
| Example, line 39 | **Illustrative configuration, not run here.** In a compatible sbt project, add to `project/plugins.sbt`: | supported with qualification | Author recommendation or conditional inference, not a measured effectiveness claim. Factual premises reviewed against E1. |
| Example, line 41 | ```scala<br>addSbtPlugin("org.wartremover" % "sbt-wartremover" % "3.6.2")<br>``` | supported with qualification | Documentation/static reasoning only; this example has not been executed. See E1. |
| Example, line 45 | Enable one warning in `build.sbt`: | supported with qualification | Author recommendation or conditional inference, not a measured effectiveness claim. Factual premises reviewed against E1. |
| Example, line 47 | ```scala<br>wartremoverWarnings += Wart.OptionPartial<br>``` | supported with qualification | Documentation/static reasoning only; this example has not been executed. See E1. |
| Example, line 51 | Then run `sbt compile` on code containing an `Option.get` call. The intended warning identifies that partial operation. Refactoring to explicitly handle empty and nonempty cases addresses the rule's concern. | supported with qualification | Author recommendation or conditional inference, not a measured effectiveness claim. Factual premises reviewed against E1. |
| Limits, line 55 | Installing the plugin alone does not establish that any warts ran: the documented warning and error rule lists are empty by default. Record the selected warts and suppressions with the results. | supported | See evidence assessment E1. |
| Limits, line 57 | A warning can enforce a team convention even when the particular call is safe under an assumption. Review the context instead of treating every wart as a vulnerability. | supported | See evidence assessment E1. |
| Related research, line 61 | We used WartRemover for the Scala implementation in our [OCPP study](https://www.cs.montana.edu/izurieta/pubs/CSR_2026_Wadhams.pdf). I retain the distinction between a reported tool name and its enabled checks when interpreting those findings. See [Comparing SAST tools](../../../src/content/docs/research/comparing-tools.md). | supported with qualification | Historical attribution only; see the research reconciliation record. No current-edition performance inference. |
