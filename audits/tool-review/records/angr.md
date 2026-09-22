# angr: evidence record

Access/review date: 2026-09-22. Existing scope: Offline binary loading and symbolic execution. Concrete-execution integrations and separate analysis packages are outside this entry's mode tags.

File: `src/content/docs/tools/angr.md`. Baseline SHA-256: `b688e97bbc41f0730e341905b0a0576e9313b17d3d4cf4bc0583b86336049bba`. Reviewed SHA-256: `4db2e54f9baad2acece419751d791ff721500baf66ce14e173e798787ff73288`. Original text is preserved in baseline.json.

Status: Assessed against primary documentation; see qualifications below.

## E1: evidence assessment

The loader and symbolic exploration documentation support the binary-only scope, configured states and goals, and architecture-dependent loading. Installation documents native C++ and Rust build dependencies. The BSD license supports free open-source use. The stream and exploration APIs support the illustrative code structure. Library summaries and search limitations prevent interpreting an unsuccessful search as a proof. The K witness follows from the displayed C condition; it was not observed in a run.

Source sections: Loading a Binary: Backends and Symbolic Function Summaries; Symbolic Execution example; Installing angr; Gotchas: SimProcedures and symbolic memory; File System: SimFileStream; Simulation Managers: Simple Exploration; LICENSE

- [S1](https://docs.angr.io/en/latest/core-concepts/loading.html)
- [S2](https://docs.angr.io/en/latest/core-concepts/symbolic.html)
- [S3](https://docs.angr.io/en/latest/getting-started/installing.html)
- [S4](https://docs.angr.io/en/latest/advanced-topics/gotchas.html)
- [S5](https://docs.angr.io/en/latest/advanced-topics/file_system.html)
- [S6](https://docs.angr.io/en/latest/core-concepts/pathgroups.html)
- [S7](https://github.com/angr/angr/blob/master/LICENSE)
- [S8](https://docs.angr.io/en/latest/advanced-topics/file_system.html)
- [S9](https://docs.angr.io/en/latest/core-concepts/pathgroups.html)

Correction: Added direct sources for symbolic stdin and exploration predicates.

## Claims and dispositions

Counts: {"supported":21,"supported with qualification":15,"contradicted":0,"unresolved":0}. Compound paragraphs retain their qualifications; list-valued fields are assessed member by member. Quoted relative links point to the corresponding repository Markdown pages.

| Location | Claim as reviewed | Verdict | Evidence / limitation |
| --- | --- | --- | --- |
| title | angr | supported | See evidence assessment E1. |
| description | Explore compiled programs with a programmable binary-analysis and symbolic-execution framework. | supported | See evidence assessment E1. |
| tool.modes[0] | Static | supported | See evidence assessment E1. |
| tool.inputTypes[0] | Binaries | supported | See evidence assessment E1. |
| tool.techniques[0] | Binary analysis | supported | See evidence assessment E1. |
| tool.techniques[1] | Symbolic execution | supported | See evidence assessment E1. |
| tool.languages[0] | Language independent | supported | See evidence assessment E1. |
| tool.languageNote | Targets are supported executable formats and architectures. Python is the scripting interface, not a claim that this entry analyzes Python source. | supported | See evidence assessment E1. |
| tool.targets[0] | Native binaries | supported | See evidence assessment E1. |
| tool.targets[1] | Firmware | supported | See evidence assessment E1. |
| tool.findings[0] | Specification violations | supported | See evidence assessment E1. |
| tool.findingNote | You must encode the behavior or failure condition to investigate. Finding a reachable state is not automatically a vulnerability; angr is a framework, not a fixed vulnerability-rule scanner. | supported | See evidence assessment E1. |
| tool.environment | Python with compatible native dependencies, or the project container. Check wheel availability for the host; a source build can require C/C++ and Rust toolchains. | supported | See evidence assessment E1. |
| tool.setup | Load a supported binary and configure an entry state, symbolic inputs, environment models, and search goals. Bare-metal targets need additional loader and memory configuration. | supported | See evidence assessment E1. |
| tool.licenseCategory | Open source | supported | See evidence assessment E1. |
| tool.license | BSD-2-Clause for angr; dependencies have separate licenses | supported | See evidence assessment E1. |
| tool.cost[0] | Free | supported | See evidence assessment E1. |
| tool.costNote | Free framework and Python API. No paid tier is required for the documented symbolic-execution workflow. | supported | See evidence assessment E1. |
| tool.website | https://angr.io/ | supported | See evidence assessment E1. |
| tool.verified | 2026-09-22 | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.scope | Offline binary loading and symbolic execution. Concrete-execution integrations and separate analysis packages are outside this entry's mode tags. | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.sources[0] | Binary loading and supported loader concepts: https://docs.angr.io/en/latest/core-concepts/loading.html | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.sources[1] | Symbolic execution and path exploration: https://docs.angr.io/en/latest/core-concepts/symbolic.html | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.sources[2] | Installation and native dependencies: https://docs.angr.io/en/latest/getting-started/installing.html | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.sources[3] | Modeling and analysis pitfalls: https://docs.angr.io/en/latest/advanced-topics/gotchas.html | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.sources[4] | Symbolic streams and stdin: https://docs.angr.io/en/latest/advanced-topics/file_system.html | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.sources[5] | Simulation managers and exploration predicates: https://docs.angr.io/en/latest/core-concepts/pathgroups.html | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.sources[6] | License: https://github.com/angr/angr/blob/master/LICENSE | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| When to use it, line 41 | Choose angr when the question is about behavior inside a compiled artifact and you can write the analysis needed to answer it. For a predefined set of binary weakness checks, compare [cwe-checker](../../../src/content/docs/tools/cwe-checker.md). | supported with qualification | Author recommendation or conditional inference, not a measured effectiveness claim. Factual premises reviewed against E1. |
| Worked example: find an input for a branch, line 45 | **Illustrative example, not run here.** On a compatible native build host, save `branch_check.c`: | supported with qualification | Author recommendation or conditional inference, not a measured effectiveness claim. Factual premises reviewed against E1. |
| Worked example: find an input for a branch, line 47 | ```c<br>#include &lt;stdio.h&gt;<br>int main(void) {<br>    puts(getchar() == 'K' ? "accepted" : "rejected");<br>    return 0;<br>}<br>``` | supported with qualification | Documentation/static reasoning only; this example has not been executed. See E1. |
| Worked example: find an input for a branch, line 55 | Compile it with `cc -O0 branch_check.c -o branch_check`. In a Python environment with angr installed, run: | supported with qualification | Author recommendation or conditional inference, not a measured effectiveness claim. Factual premises reviewed against E1. |
| Worked example: find an input for a branch, line 57 | ```python<br>import angr<br>import claripy<br><br>project = angr.Project("./branch_check", auto_load_libs=False)<br>symbol = claripy.BVS("input_byte", 8)<br>stream = angr.SimFileStream(name="stdin", content=symbol, has_end=True)<br>state = project.factory.full_init_state(args=["./branch_check"], stdin=stream)<br>paths = project.factory.simulation_manager(state)<br>paths.explore(find=lambda candidate: b"accepted" in candidate.posix.dumps(1))<br><br>if paths.found:<br>    print(paths.found[0].posix.dumps(0))<br>else:<br>    print("No matching state found in this exploration")<br>``` | supported with qualification | Documentation/static reasoning only; this example has not been executed. See E1. |
| Worked example: find an input for a branch, line 74 | The intended witness is the byte `K`. This is a reachability exercise; the branch is not itself a security defect. | supported with qualification | Author recommendation or conditional inference, not a measured effectiveness claim. Factual premises reviewed against E1. |
| Limits, line 78 | Models of library calls, startup state, memory, and system behavior affect the result. Many branches can make exploration expensive. Finding no state does not establish impossibility unless the exploration and model justify that conclusion. | supported | See evidence assessment E1. |
| Limits, line 80 | Reproduce a witness against the original program before drawing conclusions about concrete behavior. | supported | See evidence assessment E1. |
