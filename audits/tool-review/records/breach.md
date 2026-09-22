# Breach: evidence record

Access/review date: 2026-09-22. Existing scope: Breach repository documentation for STL monitoring and simulation-based falsification.

File: `src/content/docs/tools/breach.md`. Baseline SHA-256: `2cebe5b6501990a5151bd3b4a329cb07233e15373c229f3387d7cfa6b86dffdc`. Reviewed SHA-256: `26f4696fad3ebf09dc6434d1c8a8801debae439e807c2dd424a791b4e49f63e9`. Original text is preserved in baseline.json.

Status: Assessed against primary documentation; see qualifications below.

## E1: evidence assessment

The MATLAB toolbox supports recorded traces, STL monitoring, Simulink and other simulator interfaces, signal generation and optimization-based falsification. Inputs, horizon, ranges and budget define the experiment. Core BSD-3-Clause is separate from bundled GPL/LGPL components and MATLAB/Simulink entitlements. A finite search without a counterexample is not a universal proof.

Source sections: README: Setup, importing time series, STL monitoring, Simulink and Falsification; LICENSE and other licenses; MathWorks licensing

- [S1](https://github.com/decyphir/breach/blob/master/README.md)
- [S2](https://github.com/decyphir/breach/blob/master/LICENSE)
- [S3](https://www.mathworks.com/pricing-licensing.html)

Correction: No content correction recorded.

## Claims and dispositions

Counts: {"supported":25,"supported with qualification":7,"contradicted":0,"unresolved":0}. Compound paragraphs retain their qualifications; list-valued fields are assessed member by member. Quoted relative links point to the corresponding repository Markdown pages.

| Location | Claim as reviewed | Verdict | Evidence / limitation |
| --- | --- | --- | --- |
| title | Breach | supported | See evidence assessment E1. |
| description | Search simulations for violations of Signal Temporal Logic requirements and monitor recorded traces. | supported | See evidence assessment E1. |
| tool.modes[0] | Dynamic | supported | See evidence assessment E1. |
| tool.inputTypes[0] | Executable models | supported | See evidence assessment E1. |
| tool.inputTypes[1] | Execution traces | supported | See evidence assessment E1. |
| tool.techniques[0] | Model falsification | supported | See evidence assessment E1. |
| tool.techniques[1] | Temporal logic monitoring | supported | See evidence assessment E1. |
| tool.languages[0] | MATLAB | supported | See evidence assessment E1. |
| tool.languages[1] | Simulink | supported | See evidence assessment E1. |
| tool.languageNote | These tags describe the modeling and harness ecosystem. Breach evaluates time-series behavior; other simulators need an interface that supplies traces. | supported | See evidence assessment E1. |
| tool.targets[0] | Simulated systems | supported | See evidence assessment E1. |
| tool.targets[1] | Hybrid systems | supported | See evidence assessment E1. |
| tool.targets[2] | Time-series traces | supported | See evidence assessment E1. |
| tool.licenseCategory | Open source | supported | See evidence assessment E1. |
| tool.license | BSD-3-Clause core; bundled components have additional licenses | supported | See evidence assessment E1. |
| tool.cost[0] | Free | supported | See evidence assessment E1. |
| tool.costNote | The Breach toolbox is free. Running it requires separately licensed MATLAB, plus Simulink for Simulink models. Model dependencies may require other licensed products; these costs are not included in the Free label. | supported | See evidence assessment E1. |
| tool.website | https://github.com/decyphir/breach | supported | See evidence assessment E1. |
| tool.verified | 2026-09-22 | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.scope | Breach repository documentation for STL monitoring and simulation-based falsification. | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.findings[0] | Temporal requirement violations | supported | See evidence assessment E1. |
| tool.findingNote | You supply STL requirements and signals. Monitoring checks supplied traces; falsification adds a search over simulator inputs. | supported | See evidence assessment E1. |
| tool.environment | MATLAB on a compatible host; Simulink and compiler requirements depend on the model and Breach release. | supported | See evidence assessment E1. |
| tool.setup | A simulator interface, signal definitions, temporal requirements, and input bounds are needed for falsification. Trace-only monitoring can use recorded data. | supported | See evidence assessment E1. |
| tool.sources[0] | Breach documentation and examples: https://github.com/decyphir/breach/blob/master/README.md | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.sources[1] | Breach core and bundled component licenses: https://github.com/decyphir/breach/blob/master/LICENSE | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.sources[2] | MathWorks pricing and licensing: https://www.mathworks.com/pricing-licensing.html | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| What it does, line 33 | Breach can check recorded signals against Signal Temporal Logic (STL) requirements or repeatedly simulate a model to search for a violation. It provides Simulink integration, parameter exploration, input signal generation, and an interface for other simulators. | supported | See evidence assessment E1. |
| When it is useful, line 37 | Use it when a requirement concerns behavior over time: for example, whether a controller keeps a signal below a limit throughout a run. | supported with qualification | Author recommendation or conditional inference, not a measured effectiveness claim. Factual premises reviewed against E1. |
| What you provide, line 41 | - A simulator interface or recorded traces with named signals.<br>- An STL requirement and a simulation horizon.<br>- For falsification, allowed input or parameter ranges and a search budget. | supported | See evidence assessment E1. |
| What to keep in mind, line 47 | A monitor checks supplied traces; a falsification search generates candidates to find a violating trace. An unsuccessful search does not prove the requirement holds for all inputs. See [model and temporal falsification](../../../src/content/docs/concepts/model-falsification.md). | supported | See evidence assessment E1. |
| Getting started, line 51 | Follow the official README's setup and built-in demos, then work through its falsification example. Check the licenses of bundled components as well as the core license if redistributing the toolbox. | supported with qualification | Author recommendation or conditional inference, not a measured effectiveness claim. Factual premises reviewed against E1. |
