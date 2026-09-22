# RTAMT: evidence record

Access/review date: 2026-09-22. Existing scope: Offline and online STL monitoring. Online future-time operators are bounded; timing, parser, and backend compatibility depend on the chosen release.

File: `src/content/docs/tools/rtamt.md`. Baseline SHA-256: `c6ae1b533d0bb5cffa0b49be3a9baec0679ccdb52f543f43a4e7ff4ca0eb7288`. Reviewed SHA-256: `ae38af310aa36ef7091f69ad5213db37ae6a2e5e277761d508214aa66859ebe7`. Original text is preserved in baseline.json.

Status: Assessed against primary documentation; see qualifications below.

## E1: evidence assessment

RTAMT supports offline/online dense/discrete STL monitors, with bounded-future online operators. The pure-Python route avoids optional C++/Boost build prerequisites. The example API and robustness calculation are consistent with the documented semantics, but the repository does not retain a run record for the previously reported Python 3.12.14 / RTAMT 0.4.10 execution. This audit did not rerun it.

Source sections: README: About, Installation, Specification Language and dense/discrete monitoring examples; examples directory; BSD-3-Clause LICENSE

- [S1](https://github.com/nickovic/rtamt)
- [S2](https://github.com/nickovic/rtamt/tree/master/examples)
- [S3](https://github.com/nickovic/rtamt/blob/master/LICENSE)

Correction: Qualified the previous local-run account and exact outputs as not independently reverified during this documentation audit.

## Claims and dispositions

Counts: {"supported":24,"supported with qualification":6,"contradicted":0,"unresolved":2}. Compound paragraphs retain their qualifications; list-valued fields are assessed member by member. Quoted relative links point to the corresponding repository Markdown pages.

| Location | Claim as reviewed | Verdict | Evidence / limitation |
| --- | --- | --- | --- |
| title | RTAMT | supported | See evidence assessment E1. |
| description | Evaluate signal traces against temporal requirements using online or offline monitors. | supported | See evidence assessment E1. |
| tool.modes[0] | Dynamic | supported | See evidence assessment E1. |
| tool.inputTypes[0] | Execution traces | supported | See evidence assessment E1. |
| tool.techniques[0] | Temporal logic monitoring | supported | See evidence assessment E1. |
| tool.techniques[1] | Runtime verification | supported | See evidence assessment E1. |
| tool.languages[0] | Language independent | supported | See evidence assessment E1. |
| tool.languageNote | Inputs are named signals and temporal specifications. Python is the monitor API; the observed system can be implemented in another language. | supported | See evidence assessment E1. |
| tool.targets[0] | Time-series signals | supported | See evidence assessment E1. |
| tool.targets[1] | Runtime traces | supported | See evidence assessment E1. |
| tool.targets[2] | Simulation traces | supported | See evidence assessment E1. |
| tool.findings[0] | Temporal requirement violations | supported | See evidence assessment E1. |
| tool.findingNote | Evaluates the supplied trace against the specified formula. It does not generate scenarios or search for counterexamples by itself, and a satisfying trace is not a model-checking proof. | supported | See evidence assessment E1. |
| tool.environment | A compatible Python environment for the selected RTAMT and parser versions. Pure-Python monitors avoid the optional compiled backend, which adds CMake, compiler, and Boost.Python requirements. | supported | See evidence assessment E1. |
| tool.setup | Define typed signal names, an STL specification, timestamps or sampling assumptions, and the observed values. Match dense-time or discrete-time semantics to the data. | supported | See evidence assessment E1. |
| tool.licenseCategory | Open source | supported | See evidence assessment E1. |
| tool.license | BSD-3-Clause | supported | See evidence assessment E1. |
| tool.cost[0] | Free | supported | See evidence assessment E1. |
| tool.costNote | Free monitoring library, including the documented Python APIs. Simulator and trace-collection costs are separate. | supported | See evidence assessment E1. |
| tool.website | https://github.com/nickovic/rtamt | supported | See evidence assessment E1. |
| tool.verified | 2026-09-21 | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.scope | Offline and online STL monitoring. Online future-time operators are bounded; timing, parser, and backend compatibility depend on the chosen release. | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.sources[0] | Monitoring semantics, installation, and APIs: https://github.com/nickovic/rtamt | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.sources[1] | Project examples: https://github.com/nickovic/rtamt/tree/master/examples | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.sources[2] | License: https://github.com/nickovic/rtamt/blob/master/LICENSE | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| Where it fits, line 33 | Use RTAMT when you already have signals to evaluate, or can stream observations from a running system. Pairing a monitor with a simulator and a search algorithm can support falsification; the monitor alone does not perform that search. | supported | See evidence assessment E1. |
| Worked example: a temperature requirement, line 37 | **Previously reported local check on 2026-09-21:** Windows, Python 3.12.14, RTAMT 0.4.10, using the pure-Python backend. The 2026-09-22 documentation audit did not rerun this example or locate a saved execution record in the repository. The code and reported results below preserve the earlier account; they are not independently verified execution evidence from this audit. | unresolved | Historical execution provenance is unresolved: no saved run record was found in the repository and no rerun was performed. The Wiki now states this explicitly. |
| Worked example: a temperature requirement, line 39 | ```python<br>import rtamt<br><br>spec = rtamt.StlDenseTimeSpecification()<br>spec.declare_var("temperature", "float")<br>spec.spec = "always[0:2](temperature &lt;= 80)"<br>spec.parse()<br><br>trace = [[0, 70], [1, 75], [2, 85], [3, 85]]<br>robustness = spec.evaluate(["temperature", trace])<br>print(robustness[0])<br>``` | supported with qualification | Documentation/static reasoning only; this example has not been executed. See E1. |
| Worked example: a temperature requirement, line 52 | The earlier account reported `[0, -5.0]`. At time zero, the requested two-unit interval includes a temperature of 85, consistent with negative robustness. Replacing both 85 values with 79 was reported to produce `[0, 1.0]`, a positive margin for this trace. These values are consistent with the stated robustness calculation, but reproducing the exact output still requires the specified environment. They do not establish the monitor's behavior on every formula or signal. | unresolved | Historical execution provenance is unresolved: no saved run record was found in the repository and no rerun was performed. The Wiki now states this explicitly. |
| Interpret timing carefully, line 56 | Choose signal semantics, units, sampling, and the available observation horizon deliberately. An online monitor may need later observations to decide a requirement about the future. | supported | See evidence assessment E1. |
| Interpret timing carefully, line 58 | The sign and magnitude of robustness describe the formula's evaluation on this trace. Boundary cases at zero need the exact predicate semantics. A missing violation in the observed data does not rule out one in another execution. | supported | See evidence assessment E1. |
| Interpret timing carefully, line 60 | See [temporal monitoring and falsification](../../../src/content/docs/guides/temporal-monitoring-and-falsification.md) for the complete workflow. | supported | See evidence assessment E1. |
