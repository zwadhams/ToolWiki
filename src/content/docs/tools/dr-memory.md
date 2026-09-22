---
title: Dr. Memory
description: Detect memory errors while a compatible native executable runs under dynamic instrumentation.
tool:
  modes: [Dynamic]
  inputTypes: [Binaries]
  techniques: [Dynamic instrumentation, Runtime memory checking]
  languages: [C, C++, Language independent]
  languageNote: C/C++ programs are common targets. Actual support depends on the executable, operating system, and architecture, not a source-language parser.
  targets: [Native programs, Native binaries]
  findings: [Memory safety, Resource leaks]
  findingNote: Checks exercised memory operations for issues including unaddressable access, uninitialized reads, and allocation errors. Supported leak checks include Windows-specific resources; unexecuted paths remain unchecked.
  environment: Installation guides cover Windows, Linux, macOS, and Android. Verify the OS/architecture combination and limitations for the selected release.
  setup: Run a compatible executable under Dr. Memory with a workload that reaches the behavior of interest. Debug information improves attribution; sanitizer-specific recompilation is not required.
  licenseCategory: Open source
  license: LGPL-2.1-only for the primary tool; specified modules and bundled components have separate licenses
  cost: [Free]
  costNote: Free memory-checking tool. No paid edition is required for the documented workflow.
  website: https://drmemory.org/
  verified: '2026-09-22'
  scope: Runtime memory checking with Dr. Memory. Separate Dr. Fuzz and tracing utilities are outside this entry's capability tags.
  sources:
    - label: Memory checks and supported environments
      url: https://drmemory.org/
    - label: Platform installation guides
      url: https://drmemory.org/page_install.html
    - label: Running the tool and reading results
      url: https://drmemory.org/page_running.html
    - label: Primary and component licenses
      url: https://drmemory.org/page_license.html
---

## What it does

Dr. Memory uses dynamic instrumentation to observe a native program's memory operations. It can report access to freed or unallocated memory, uninitialized reads, allocation mistakes, and selected leaks.

It executes the program. The Binaries input tag therefore describes a runtime workflow, unlike the offline inspection performed by [Ghidra](../ghidra/) or [cwe-checker](../cwe-checker/).

## Example

**Illustrative Windows workflow, not run here.** Install a release compatible with your executable, put its launcher on PATH, and run a local test program:

```powershell
drmemory.exe -batch -- 'C:/path/to/test-program.exe'
```

Replace the path with your executable and add its normal test arguments after it. The `-batch` option avoids automatically opening the report in a text editor. Inspect the reported results location and `results.txt`.

Reproduce a finding with the same workload. Symbols and a diagnostic-friendly build make it easier to connect a reported access to source code.

## Limits

The workload determines which paths are checked. Instrumentation changes runtime cost, and unsupported program features can complicate execution. Review stacks and suppressions before attributing a report to application code.

See [Choosing memory-error checks](../../guides/memory-error-detection/) for comparison with [Memcheck](../valgrind-memcheck/) and [AddressSanitizer](../address-sanitizer/).
