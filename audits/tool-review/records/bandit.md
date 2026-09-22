# Bandit: evidence record

Access/review date: 2026-09-22. Existing scope: Bandit project; documentation overview, not a version-specific evaluation.

File: `src/content/docs/tools/bandit.md`. Baseline SHA-256: `a2888c04c7f4cda8a3306e4e00568d9038a62091240a3fb04f313f1b9f51d2d4`. Reviewed SHA-256: `0a79b01277f0161b991962a7de88328c3e6f9183c6168d880aadcf20d8f375c1`. Original text is preserved in baseline.json.

Status: Assessed against primary documentation; see qualifications below.

## E1: evidence assessment

Bandit parses Python syntax trees and applies security plugins without executing the application. The installation and configuration guides support source input, plugin/exclusion selection and severity filtering. The documented plugin families include injection, unsafe calls and insecure settings. Apache-2.0 and free local use are supported. Findings are appropriately qualified as patterns requiring context rather than confirmed exploits.

Source sections: Documentation overview and License; Getting started; project README; linked plugin reference

- [S1](https://bandit.readthedocs.io/en/latest/start.html)
- [S2](https://bandit.readthedocs.io/en/latest/)
- [S3](https://github.com/PyCQA/bandit)

Correction: No content correction recorded.

## Claims and dispositions

Counts: {"supported":22,"supported with qualification":9,"contradicted":0,"unresolved":0}. Compound paragraphs retain their qualifications; list-valued fields are assessed member by member. Quoted relative links point to the corresponding repository Markdown pages.

| Location | Claim as reviewed | Verdict | Evidence / limitation |
| --- | --- | --- | --- |
| title | Bandit | supported | See evidence assessment E1. |
| description | Find common security issues in Python source code using checks against its syntax tree. | supported | See evidence assessment E1. |
| tool.modes[0] | Static | supported | See evidence assessment E1. |
| tool.inputTypes[0] | Source code | supported | See evidence assessment E1. |
| tool.techniques[0] | SAST | supported | See evidence assessment E1. |
| tool.techniques[1] | Pattern matching | supported | See evidence assessment E1. |
| tool.languages[0] | Python | supported | See evidence assessment E1. |
| tool.languageNote | Analyzes Python source. Check the installed release for supported Python syntax. | supported | See evidence assessment E1. |
| tool.targets[0] | Source code | supported | See evidence assessment E1. |
| tool.licenseCategory | Open source | supported | See evidence assessment E1. |
| tool.cost[0] | Free | supported | See evidence assessment E1. |
| tool.costNote | Free local Python security checker; no paid edition is covered by this entry. | supported | See evidence assessment E1. |
| tool.license | Apache-2.0 | supported | See evidence assessment E1. |
| tool.website | https://bandit.readthedocs.io/en/latest/ | supported | See evidence assessment E1. |
| tool.verified | 2026-09-22 | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.scope | Bandit project; documentation overview, not a version-specific evaluation. | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.findings[0] | Injection risks | supported | See evidence assessment E1. |
| tool.findings[1] | Unsafe API use | supported | See evidence assessment E1. |
| tool.findings[2] | Security misconfiguration | supported | See evidence assessment E1. |
| tool.findingNote | Selected security-pattern plugins; a flagged call requires context and is not a demonstrated exploit. | supported | See evidence assessment E1. |
| tool.environment | A supported Python environment; package and dependency compatibility determine the host requirements. | supported | See evidence assessment E1. |
| tool.setup | No application build or runtime harness. Supply Python source and configure plugins, exclusions, and severity thresholds. | supported | See evidence assessment E1. |
| tool.sources[0] | Getting started and runtime requirements: https://bandit.readthedocs.io/en/latest/start.html | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.sources[1] | Bandit documentation and license: https://bandit.readthedocs.io/en/latest/ | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.sources[2] | Bandit source and usage: https://github.com/PyCQA/bandit | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| What it does, line 33 | Bandit parses Python files and runs security checks against their abstract syntax trees. Its plugins look for patterns associated with unsafe behavior and produce findings for review. | supported | See evidence assessment E1. |
| When it is useful, line 37 | Use it as a focused check in a Python development workflow. Its narrow language scope makes it a useful entry point for learning how rule-based security analysis works. | supported with qualification | Author recommendation or conditional inference, not a measured effectiveness claim. Factual premises reviewed against E1. |
| What to keep in mind, line 41 | A flagged pattern needs context: an API call may be intentional, or its input may already be constrained. Bandit is not a proof that a project is secure, and its checks do not replace runtime testing or a review of application logic. | supported | See evidence assessment E1. |
| Getting started, line 45 | The official documentation links installation, configuration, plugin, and CI/CD guides. Begin with the default checks on a small Python project, then review findings before adding exclusions. | supported with qualification | Author recommendation or conditional inference, not a measured effectiveness claim. Factual premises reviewed against E1. |
| Related research, line 49 | **Used in a study:** The [OCPP paper](https://www.cs.montana.edu/izurieta/pubs/CSR_2026_Wadhams.pdf) used Bandit for its Python implementation. Its results illustrate how a focused analyzer can produce a different report from a multi-language platform. They do not establish that every reported pattern is a confirmed vulnerability. | supported with qualification | Historical attribution only; see the research reconciliation record. No current-edition performance inference. |
| Related research, line 51 | See [comparing SAST tools](../../../src/content/docs/research/comparing-tools.md) for interpreting counts and [SAST adoption](../../../src/content/docs/research/sast-adoption.md) for planning the effort needed to review them. | supported with qualification | Historical attribution only; see the research reconciliation record. No current-edition performance inference. |
