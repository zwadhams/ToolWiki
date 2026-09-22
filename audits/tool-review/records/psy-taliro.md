# PSY-TaLiRo: evidence record

Access/review date: 2026-09-22. Existing scope: PSY-TaLiRo 3.1.0 documentation; supported temporal syntax depends on the chosen monitor.

File: `src/content/docs/tools/psy-taliro.md`. Baseline SHA-256: `1b95105ee8fc3a45926292f87ed0b4c1a27baab13834a7319892ed096045a3c3`. Reviewed SHA-256: `ee6b23194a065223648c8773c919bf55a388cef2defb4508b677272ae2ba73ad`. Original text is preserved in baseline.json.

Status: Assessed against primary documentation; see qualifications below.

## E1: evidence assessment

The documentation identifies 3.1.0 and supports Python model/trace interfaces, monitor-based requirements and optimization. RTAMT is a documented monitor; backend-specific syntax and host constraints are appropriate. MATLAB is not required for the Python-only workflow. BSD-3-Clause and finite-budget limitations are supported.

Source sections: 3.1.0 documentation: Quickstart and Examples; repository: Models, Specifications and Optimizers; BSD-3-Clause LICENSE; original tool paper

- [S1](https://psy-taliro.readthedocs.io/latest/)
- [S2](https://github.com/cpslab-asu/psy-taliro)
- [S3](https://github.com/cpslab-asu/psy-taliro/blob/main/LICENSE)
- [S4](https://arxiv.org/abs/2106.02200)

Correction: No content correction recorded.

## Claims and dispositions

Counts: {"supported":24,"supported with qualification":8,"contradicted":0,"unresolved":0}. Compound paragraphs retain their qualifications; list-valued fields are assessed member by member. Quoted relative links point to the corresponding repository Markdown pages.

| Location | Claim as reviewed | Verdict | Evidence / limitation |
| --- | --- | --- | --- |
| title | PSY-TaLiRo | supported | See evidence assessment E1. |
| description | Use a Python harness to search for system behaviors that violate temporal requirements. | supported | See evidence assessment E1. |
| tool.modes[0] | Dynamic | supported | See evidence assessment E1. |
| tool.inputTypes[0] | Executable models | supported | See evidence assessment E1. |
| tool.inputTypes[1] | Execution traces | supported | See evidence assessment E1. |
| tool.techniques[0] | Model falsification | supported | See evidence assessment E1. |
| tool.techniques[1] | Temporal logic monitoring | supported | See evidence assessment E1. |
| tool.languages[0] | Python | supported | See evidence assessment E1. |
| tool.languageNote | Python is the test harness ecosystem, not a restriction on the target's implementation language. The model interface must run the target or simulator and return a timed trace. | supported | See evidence assessment E1. |
| tool.targets[0] | Simulated systems | supported | See evidence assessment E1. |
| tool.targets[1] | Hybrid systems | supported | See evidence assessment E1. |
| tool.licenseCategory | Open source | supported | See evidence assessment E1. |
| tool.license | BSD-3-Clause | supported | See evidence assessment E1. |
| tool.cost[0] | Free | supported | See evidence assessment E1. |
| tool.costNote | Free Python toolbox. MATLAB is not required for a Python-only workflow. An external simulator, optional integration, or compute service can have its own costs and license requirements. | supported | See evidence assessment E1. |
| tool.website | https://psy-taliro.readthedocs.io/latest/ | supported | See evidence assessment E1. |
| tool.verified | 2026-09-22 | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.scope | PSY-TaLiRo 3.1.0 documentation; supported temporal syntax depends on the chosen monitor. | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.findings[0] | Temporal requirement violations | supported | See evidence assessment E1. |
| tool.findingNote | You define temporal requirements and expose signals through a model/monitor interface. A finite search cannot prove universal satisfaction. | supported | See evidence assessment E1. |
| tool.environment | A supported Python environment; monitor backends and external simulators can restrict operating systems. | supported | See evidence assessment E1. |
| tool.setup | A callable model or simulator, monitoring backend, temporal formula, input ranges, and search budget. A MATLAB bridge is optional. | supported | See evidence assessment E1. |
| tool.sources[0] | PSY-TaLiRo documentation: https://psy-taliro.readthedocs.io/latest/ | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.sources[1] | Project repository and model interfaces: https://github.com/cpslab-asu/psy-taliro | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.sources[2] | PSY-TaLiRo license: https://github.com/cpslab-asu/psy-taliro/blob/main/LICENSE | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.sources[3] | Original tool paper: https://arxiv.org/abs/2106.02200 | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| What it does, line 35 | PSY-TaLiRo connects a model, a requirement evaluator, and an optimizer. The model turns inputs into a timed trace; the evaluator scores that trace; the search tries further inputs to find a requirement violation. | supported | See evidence assessment E1. |
| What it does, line 37 | It follows the S-TaLiRo approach in a separate Python toolbox. Its interfaces support different simulation and monitoring backends. | supported | See evidence assessment E1. |
| When it is useful, line 41 | Consider it for a Python-based experiment or a simulator you can call from Python. A model wrapper exposes the signals needed to assess the requirement. | supported with qualification | Author recommendation or conditional inference, not a measured effectiveness claim. Factual premises reviewed against E1. |
| Temporal requirements, line 45 | The documentation demonstrates STL monitoring with RTAMT. Formula syntax, time semantics, and supported operators depend on the selected monitor. Choose that backend before translating a requirement into a formula. | supported | See evidence assessment E1. |
| What to keep in mind, line 49 | Search quality depends on the input bounds, simulation, score, and budget. Preserve the input, trace, random seed, and configuration when a test fails. A completed search without a violation is not a proof of correctness. | supported | See evidence assessment E1. |
| Getting started, line 53 | Start with the documentation's Quickstart and Examples, then replace the example model with your simulator interface. Read [model and temporal falsification](../../../src/content/docs/concepts/model-falsification.md) for the underlying workflow. | supported with qualification | Author recommendation or conditional inference, not a measured effectiveness claim. Factual premises reviewed against E1. |
