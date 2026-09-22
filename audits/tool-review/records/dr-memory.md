# Dr. Memory: evidence record

Access/review date: 2026-09-22. Existing scope: Runtime memory checking with Dr. Memory. Separate Dr. Fuzz and tracing utilities are outside this entry's capability tags.

File: `src/content/docs/tools/dr-memory.md`. Baseline SHA-256: `8e0be0961da8d0a65fdf0601e3fe20ec1c64b3e5b9fca10b441fd51d81eb6b21`. Reviewed SHA-256: `8e0be0961da8d0a65fdf0601e3fe20ec1c64b3e5b9fca10b441fd51d81eb6b21`. Original text is preserved in baseline.json.

Status: Assessed against primary documentation; see qualifications below.

## E1: evidence assessment

The tool uses DynamoRIO on unmodified binaries and reports memory errors and selected Windows resource leaks. Documented host routes include Windows/Linux/macOS/Android with architecture restrictions. The -- separator and -batch option support the example. The primary license specifies LGPL version 2.1; component exceptions remain explicit. Debug symbols improve results but sanitizer instrumentation is not a prerequisite.

Source sections: Home: checks and DynamoRIO; Installation; Running: command line and batch; License: primary license and module exceptions

- [S1](https://drmemory.org/)
- [S2](https://drmemory.org/page_install.html)
- [S3](https://drmemory.org/page_running.html)
- [S4](https://drmemory.org/page_license.html)

Correction: No content correction recorded.

## Claims and dispositions

Counts: {"supported":26,"supported with qualification":10,"contradicted":0,"unresolved":0}. Compound paragraphs retain their qualifications; list-valued fields are assessed member by member. Quoted relative links point to the corresponding repository Markdown pages.

| Location | Claim as reviewed | Verdict | Evidence / limitation |
| --- | --- | --- | --- |
| title | Dr. Memory | supported | See evidence assessment E1. |
| description | Detect memory errors while a compatible native executable runs under dynamic instrumentation. | supported | See evidence assessment E1. |
| tool.modes[0] | Dynamic | supported | See evidence assessment E1. |
| tool.inputTypes[0] | Binaries | supported | See evidence assessment E1. |
| tool.techniques[0] | Dynamic instrumentation | supported | See evidence assessment E1. |
| tool.techniques[1] | Runtime memory checking | supported | See evidence assessment E1. |
| tool.languages[0] | C | supported | See evidence assessment E1. |
| tool.languages[1] | C++ | supported | See evidence assessment E1. |
| tool.languages[2] | Language independent | supported | See evidence assessment E1. |
| tool.languageNote | C/C++ programs are common targets. Actual support depends on the executable, operating system, and architecture, not a source-language parser. | supported | See evidence assessment E1. |
| tool.targets[0] | Native programs | supported | See evidence assessment E1. |
| tool.targets[1] | Native binaries | supported | See evidence assessment E1. |
| tool.findings[0] | Memory safety | supported | See evidence assessment E1. |
| tool.findings[1] | Resource leaks | supported | See evidence assessment E1. |
| tool.findingNote | Checks exercised memory operations for issues including unaddressable access, uninitialized reads, and allocation errors. Supported leak checks include Windows-specific resources; unexecuted paths remain unchecked. | supported | See evidence assessment E1. |
| tool.environment | Installation guides cover Windows, Linux, macOS, and Android. Verify the OS/architecture combination and limitations for the selected release. | supported | See evidence assessment E1. |
| tool.setup | Run a compatible executable under Dr. Memory with a workload that reaches the behavior of interest. Debug information improves attribution; sanitizer-specific recompilation is not required. | supported | See evidence assessment E1. |
| tool.licenseCategory | Open source | supported | See evidence assessment E1. |
| tool.license | LGPL-2.1-only for the primary tool; specified modules and bundled components have separate licenses | supported | See evidence assessment E1. |
| tool.cost[0] | Free | supported | See evidence assessment E1. |
| tool.costNote | Free memory-checking tool. No paid edition is required for the documented workflow. | supported | See evidence assessment E1. |
| tool.website | https://drmemory.org/ | supported | See evidence assessment E1. |
| tool.verified | 2026-09-22 | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.scope | Runtime memory checking with Dr. Memory. Separate Dr. Fuzz and tracing utilities are outside this entry's capability tags. | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.sources[0] | Memory checks and supported environments: https://drmemory.org/ | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.sources[1] | Platform installation guides: https://drmemory.org/page_install.html | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.sources[2] | Running the tool and reading results: https://drmemory.org/page_running.html | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.sources[3] | Primary and component licenses: https://drmemory.org/page_license.html | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| What it does, line 35 | Dr. Memory uses dynamic instrumentation to observe a native program's memory operations. It can report access to freed or unallocated memory, uninitialized reads, allocation mistakes, and selected leaks. | supported | See evidence assessment E1. |
| What it does, line 37 | It executes the program. The Binaries input tag therefore describes a runtime workflow, unlike the offline inspection performed by [Ghidra](../../../src/content/docs/tools/ghidra.md) or [cwe-checker](../../../src/content/docs/tools/cwe-checker.md). | supported | See evidence assessment E1. |
| Example, line 41 | **Illustrative Windows workflow, not run here.** Install a release compatible with your executable, put its launcher on PATH, and run a local test program: | supported with qualification | Author recommendation or conditional inference, not a measured effectiveness claim. Factual premises reviewed against E1. |
| Example, line 43 | ```powershell<br>drmemory.exe -batch -- 'C:/path/to/test-program.exe'<br>``` | supported with qualification | Documentation/static reasoning only; this example has not been executed. See E1. |
| Example, line 47 | Replace the path with your executable and add its normal test arguments after it. The `-batch` option avoids automatically opening the report in a text editor. Inspect the reported results location and `results.txt`. | supported with qualification | Author recommendation or conditional inference, not a measured effectiveness claim. Factual premises reviewed against E1. |
| Example, line 49 | Reproduce a finding with the same workload. Symbols and a diagnostic-friendly build make it easier to connect a reported access to source code. | supported with qualification | Author recommendation or conditional inference, not a measured effectiveness claim. Factual premises reviewed against E1. |
| Limits, line 53 | The workload determines which paths are checked. Instrumentation changes runtime cost, and unsupported program features can complicate execution. Review stacks and suppressions before attributing a report to application code. | supported | See evidence assessment E1. |
| Limits, line 55 | See [Choosing memory-error checks](../../../src/content/docs/guides/memory-error-detection.md) for comparison with [Memcheck](../../../src/content/docs/tools/valgrind-memcheck.md) and [AddressSanitizer](../../../src/content/docs/tools/address-sanitizer.md). | supported | See evidence assessment E1. |
