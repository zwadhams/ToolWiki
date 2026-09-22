# VerifAI: evidence record

Access/review date: 2026-09-22. Existing scope: Simulation-guided falsification in the current documentation. This entry does not claim exhaustive verification of arbitrary neural networks or real-world systems.

File: `src/content/docs/tools/verifai.md`. Baseline SHA-256: `80d550d8b9e2b840639977be88cef507176c6a5e36121eb90dfe9e1f6356f103`. Reviewed SHA-256: `84e6ca706ebb2d30493eb0204dd2341430b3fd8c3f99add69e73edaf34a92358`. Original text is preserved in baseline.json.

Status: Assessed against primary documentation; see qualifications below.

## E1: evidence assessment

The toolkit combines sample spaces, simulators, monitors and samplers for simulation-guided falsification. Python/Scenic are interface ecosystems, not source-analysis languages. Installation supports macOS/Linux and recommends WSL. The tutorial specifies the exact lane-keeping paths and two-process launch order, with negative quantitative scores identifying violations. Repository examples are separate from the PyPI package. Finite sampling and model validity constrain conclusions.

Source sections: Documentation overview and BSD license; Installation; Basic usage: spaces, monitors and client/server; Tutorial: lane keeping

- [S1](https://verifai.readthedocs.io/en/latest/)
- [S2](https://verifai.readthedocs.io/en/latest/installation.html)
- [S3](https://verifai.readthedocs.io/en/latest/basic_usage.html)
- [S4](https://verifai.readthedocs.io/en/latest/tutorial.html)

Correction: No content correction recorded.

## Claims and dispositions

Counts: {"supported":25,"supported with qualification":12,"contradicted":0,"unresolved":0}. Compound paragraphs retain their qualifications; list-valued fields are assessed member by member. Quoted relative links point to the corresponding repository Markdown pages.

| Location | Claim as reviewed | Verdict | Evidence / limitation |
| --- | --- | --- | --- |
| title | VerifAI | supported | See evidence assessment E1. |
| description | Search simulation scenarios for behavior that violates a specification, including temporal requirements. | supported | See evidence assessment E1. |
| tool.modes[0] | Dynamic | supported | See evidence assessment E1. |
| tool.inputTypes[0] | Executable models | supported | See evidence assessment E1. |
| tool.techniques[0] | Model falsification | supported | See evidence assessment E1. |
| tool.techniques[1] | Simulation-based testing | supported | See evidence assessment E1. |
| tool.languages[0] | Python | supported | See evidence assessment E1. |
| tool.languages[1] | Scenic | supported | See evidence assessment E1. |
| tool.languageNote | Python defines the analysis interface, and Scenic can define scenario distributions. Simulator integration determines what system can be exercised; these tags do not imply source-code SAST. | supported | See evidence assessment E1. |
| tool.targets[0] | Simulation models | supported | See evidence assessment E1. |
| tool.targets[1] | AI-enabled systems | supported | See evidence assessment E1. |
| tool.targets[2] | Controllers | supported | See evidence assessment E1. |
| tool.findings[0] | Temporal requirement violations | supported | See evidence assessment E1. |
| tool.findings[1] | Specification violations | supported | See evidence assessment E1. |
| tool.findingNote | The monitor or objective supplied by the user defines a failure. Search can return counterexamples, but exhausting a sample budget without one is not a proof. | supported | See evidence assessment E1. |
| tool.environment | Python on Linux or macOS; the installation guide recommends WSL on Windows. Simulator integrations and optional packages have additional requirements. | supported | See evidence assessment E1. |
| tool.setup | Provide a sample space, simulator interface, monitor/specification, sampler, and iteration or time budget. Some examples use separate falsifier and simulator processes. | supported | See evidence assessment E1. |
| tool.licenseCategory | Open source | supported | See evidence assessment E1. |
| tool.license | BSD-3-Clause for VerifAI; simulators and dependencies have separate licenses | supported | See evidence assessment E1. |
| tool.cost[0] | Free | supported | See evidence assessment E1. |
| tool.costNote | Free toolkit. Simulator licenses, scenario assets, and compute can add costs; they are not paid VerifAI detection tiers. | supported | See evidence assessment E1. |
| tool.website | https://verifai.readthedocs.io/en/latest/ | supported | See evidence assessment E1. |
| tool.verified | 2026-09-22 | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.scope | Simulation-guided falsification in the current documentation. This entry does not claim exhaustive verification of arbitrary neural networks or real-world systems. | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.sources[0] | Toolkit scope and license: https://verifai.readthedocs.io/en/latest/ | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.sources[1] | Installation and host guidance: https://verifai.readthedocs.io/en/latest/installation.html | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.sources[2] | Sample spaces, monitors, and falsifier configuration: https://verifai.readthedocs.io/en/latest/basic_usage.html | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.sources[3] | Worked simulator case studies: https://verifai.readthedocs.io/en/latest/tutorial.html | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| What the workflow does, line 35 | A sampler proposes a scenario, the simulator runs it, and a monitor evaluates the resulting behavior. Feedback can guide later scenarios toward violations. This supports questions such as whether a controller stays inside its lane under varying initial conditions. | supported | See evidence assessment E1. |
| Worked example: lane-keeping falsification, line 39 | **Documentation-based walkthrough, not run here.** Install the repository version and dependencies for the official lane-keeping example. The PyPI package does not include all example files. | supported with qualification | Author recommendation or conditional inference, not a measured effectiveness claim. Factual premises reviewed against E1. |
| Worked example: lane-keeping falsification, line 41 | In two terminals, enter `src/verifai/simulators/car_simulator` within the matching repository checkout. In the first terminal, start the falsifier: | supported with qualification | Author recommendation or conditional inference, not a measured effectiveness claim. Factual premises reviewed against E1. |
| Worked example: lane-keeping falsification, line 43 | ```sh<br>python examples/lanekeeping_LQR/lanekeeping_falsifier.py<br>``` | supported with qualification | Documentation/static reasoning only; this example has not been executed. See E1. |
| Worked example: lane-keeping falsification, line 47 | After the server reports readiness, start the simulator in the second terminal: | supported with qualification | Author recommendation or conditional inference, not a measured effectiveness claim. Factual premises reviewed against E1. |
| Worked example: lane-keeping falsification, line 49 | ```sh<br>python examples/lanekeeping_LQR/lanekeeping_simulation.py<br>``` | supported with qualification | Documentation/static reasoning only; this example has not been executed. See E1. |
| Worked example: lane-keeping falsification, line 53 | Inspect sampled scenarios, their requirement scores, and the falsified-sample table. In this quantitative example, a negative score indicates a violation. Re-run the saved scenario to check reproducibility before changing the controller. | supported with qualification | Author recommendation or conditional inference, not a measured effectiveness claim. Factual premises reviewed against E1. |
| What to preserve with a result, line 57 | Record the simulator revision, scenario ranges, requirement, sampling configuration, budget, and any random seed. A successful trace says something about that modeled execution, not every scenario or the physical system. | supported | See evidence assessment E1. |
| What to preserve with a result, line 59 | Compare [Breach](../../../src/content/docs/tools/breach.md) and [PSY-TaLiRo](../../../src/content/docs/tools/psy-taliro.md) for other falsification workflows. [RTAMT](../../../src/content/docs/tools/rtamt.md) focuses on monitoring supplied signals; see [temporal monitoring and falsification](../../../src/content/docs/guides/temporal-monitoring-and-falsification.md). | supported | See evidence assessment E1. |
