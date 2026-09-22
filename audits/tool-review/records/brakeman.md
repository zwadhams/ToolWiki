# Brakeman: evidence record

Access/review date: 2026-09-22. Existing scope: Current Brakeman Rails scanner and Public Use License. The repository's older MIT file does not describe the entire current distribution.

File: `src/content/docs/tools/brakeman.md`. Baseline SHA-256: `df1fd843a14b57bf3f16871060f93354b9e11116fbb04729949f6613725f6852`. Reviewed SHA-256: `7317ea37e68e32ed2fe8d10b15eaf6c29ebf9fefea53fb089e6f09d8b553e077`. Original text is preserved in baseline.json.

Status: Assessed against primary documentation; see qualifications below.

## E1: evidence assessment

The scanner is Rails-specific, with source-only data flow and security checks, gem/Docker installation and HTML output selected by filename. COPYING assigns the current distribution to the Public Use License, despite older MIT contributions. The terms explicitly permit analysis of the licensee's own software without charge and require separate permission for defined commercial services/products. Source available and conditional free use are accurate classifications. The SQL exercise is illustrative and configuration-dependent.

Source sections: Homepage: Rails scope and vulnerability types; Installation; Options: scanning and output; COPYING; Public Use License sections 2-3

- [S1](https://brakemanscanner.org/)
- [S2](https://brakemanscanner.org/docs/install/)
- [S3](https://brakemanscanner.org/docs/options/)
- [S4](https://github.com/presidentbeef/brakeman/blob/main/COPYING.md)
- [S5](https://github.com/presidentbeef/brakeman/blob/main/LICENSE.md)

Correction: No content correction recorded.

## Claims and dispositions

Counts: {"supported":25,"supported with qualification":13,"contradicted":0,"unresolved":0}. Compound paragraphs retain their qualifications; list-valued fields are assessed member by member. Quoted relative links point to the corresponding repository Markdown pages.

| Location | Claim as reviewed | Verdict | Evidence / limitation |
| --- | --- | --- | --- |
| title | Brakeman | supported | See evidence assessment E1. |
| description | Check Ruby on Rails source for security weaknesses using Rails-specific analysis. | supported | See evidence assessment E1. |
| tool.modes[0] | Static | supported | See evidence assessment E1. |
| tool.inputTypes[0] | Source code | supported | See evidence assessment E1. |
| tool.techniques[0] | SAST | supported | See evidence assessment E1. |
| tool.techniques[1] | Data flow analysis | supported | See evidence assessment E1. |
| tool.languages[0] | Ruby | supported | See evidence assessment E1. |
| tool.languageNote | Rails applications, including their controllers, models, templates, and configuration. This is not a general-purpose scanner for every Ruby framework. | supported | See evidence assessment E1. |
| tool.targets[0] | Ruby on Rails applications | supported | See evidence assessment E1. |
| tool.findings[0] | Injection risks | supported | See evidence assessment E1. |
| tool.findings[1] | Unsafe API use | supported | See evidence assessment E1. |
| tool.findings[2] | Security misconfiguration | supported | See evidence assessment E1. |
| tool.findingNote | Warnings depend on recognized Rails behavior and enabled checks. Confidence levels guide review; a warning does not establish that a deployed endpoint is exploitable. | supported | See evidence assessment E1. |
| tool.environment | Ruby gem on a compatible Ruby host, with an official Docker route. Check the current gem's Ruby requirement and platform dependencies. | supported | See evidence assessment E1. |
| tool.setup | Provide the Rails application source and choose the project directory. A running Rails server, test harness, or deployed URL is not required. | supported | See evidence assessment E1. |
| tool.licenseCategory | Source available | supported | See evidence assessment E1. |
| tool.license | Brakeman Public Use License for the current distribution; older contributions retain MIT terms | supported | See evidence assessment E1. |
| tool.cost[0] | Free with limits | supported | See evidence assessment E1. |
| tool.cost[1] | Paid | supported | See evidence assessment E1. |
| tool.costNote | The license allows analyzing your own software without charge. Defined commercial uses such as providing a managed scanning service or incorporating the scanner into a commercial product require a separate license. These are use rights, not detection tiers. | supported | See evidence assessment E1. |
| tool.website | https://brakemanscanner.org/ | supported | See evidence assessment E1. |
| tool.verified | 2026-09-22 | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.scope | Current Brakeman Rails scanner and Public Use License. The repository's older MIT file does not describe the entire current distribution. | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.sources[0] | Rails-specific purpose and findings: https://brakemanscanner.org/ | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.sources[1] | Installation: https://brakemanscanner.org/docs/install/ | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.sources[2] | Options and report configuration: https://brakemanscanner.org/docs/options/ | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.sources[3] | Current distribution licensing: https://github.com/presidentbeef/brakeman/blob/main/COPYING.md | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.sources[4] | Public Use License and free-use boundaries: https://github.com/presidentbeef/brakeman/blob/main/LICENSE.md | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| When to use it, line 37 | Choose Brakeman when you have a Rails codebase and want checks that understand Rails conventions. General Ruby syntax support in another analyzer does not establish equivalent knowledge of Rails data flow. | supported with qualification | Author recommendation or conditional inference, not a measured effectiveness claim. Factual premises reviewed against E1. |
| Worked example: review a Rails project, line 41 | **Illustrative workflow, not run here.** Install the current compatible gem, then run from the root of a Rails project you can review: | supported with qualification | Author recommendation or conditional inference, not a measured effectiveness claim. Factual premises reviewed against E1. |
| Worked example: review a Rails project, line 43 | ```sh<br>gem install brakeman<br>brakeman -o brakeman-report.html<br>``` | supported with qualification | Documentation/static reasoning only; this example has not been executed. See E1. |
| Worked example: review a Rails project, line 48 | Open the report and inspect the warning's location, confidence, and evidence. For a concrete exercise, review a controller that incorporates request data into a SQL string. Compare it with the corresponding parameterized query and re-run the scanner. Exact warnings depend on Rails version and the surrounding code. | supported with qualification | Author recommendation or conditional inference, not a measured effectiveness claim. Factual premises reviewed against E1. |
| Free use and commercial use, line 52 | The license explicitly treats scanning the licensee's own software as a permitted free use. Its defined commercial uses include offering a scanning service and distributing the scanner in a commercial product. Read the linked terms for your workflow. | supported | See evidence assessment E1. |
| Free use and commercial use, line 54 | Source availability does not make this an unrestricted open-source license. The catalog therefore uses Source available and Free with limits. | supported | See evidence assessment E1. |
| What a result means, line 58 | A source warning is a review lead. It does not show that authentication, routing, or deployed configuration makes the path reachable. Conversely, an unrecognized pattern can escape a check. | supported | See evidence assessment E1. |
| What a result means, line 60 | Combine source review with [ZAP](../../../src/content/docs/tools/zap.md) or another suitable runtime test when you need evidence about a running Rails application. | supported | See evidence assessment E1. |
| Related research, line 64 | **Used in a study:** The [OCPP paper](https://www.cs.montana.edu/izurieta/pubs/CSR_2026_Wadhams.pdf) lists Brakeman as its Ruby analyzer. That historical selection does not broaden Brakeman's documented Rails scope to arbitrary Ruby applications. | supported with qualification | Historical attribution only; see the research reconciliation record. No current-edition performance inference. |
| Related research, line 66 | Read [comparing SAST tools](../../../src/content/docs/research/comparing-tools.md) for the study's limitations. For a new evaluation, verify that the application's framework matches the tool before interpreting its report. | supported with qualification | Historical attribution only; see the research reconciliation record. No current-edition performance inference. |
