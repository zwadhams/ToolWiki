---
title: heaptrack
description: Trace heap allocations in a Linux process to investigate allocation hot spots and memory that was not freed during the recording.
tool:
  cardRequirement: Run a Linux program under the recorder and provide useful symbols for its allocation stacks.
  decision:
    useWhen: Investigate which call paths allocate memory, create short-lived allocations, or retain allocations in a repeatable Linux workload.
    result: An allocation recording with stack traces, allocation counts, peak-memory attribution, and unfreed allocations for investigation.
    limit: The recording covers the exercised process and allocator hooks. Unfreed allocations may be intentional, and a memory profile does not establish memory-access safety.
  analysisWorkflows:
    - id: linux-native-allocations
      label: Profile allocations in a Linux native program
      subject: component
      inputs: [Binaries]
      binaryFormats: [Native executable]
      languageScope: independent
      languages: []
      findings: [Allocation hot spots, Resource leaks]
      hostPlatforms: [Linux]
      targetPlatforms: [Linux]
      requires: [instrument, testInstance]
      caveat: Launch a supported Linux executable under heaptrack with a representative workload. Symbols improve attribution; custom allocators and static linking need separate review. Allocations still live at exit are leads to investigate, not proof of unintended leaks.
      sources:
        - https://github.com/KDE/heaptrack/blob/master/README.md
        - https://apps.kde.org/heaptrack/
  aliases: [Heaptrack]
  searchTerms: [heap profiling, allocation profiling, memory footprint, temporary allocations, allocation flame graph, memory leak]
  modes: [Dynamic]
  inputTypes: [Binaries, Running applications]
  techniques: [Allocation profiling]
  languages: [C, C++]
  languageNote: C and C++ are examples, not an exclusive language list. Applicability depends on the Linux executable and its allocation mechanism; language tags do not establish support for every runtime or allocator.
  targets: [Linux native programs]
  findings: [Allocation hot spots, Resource leaks]
  findingNote: Stack-attributed allocations, temporary allocations, and allocations not freed during the recording help identify memory costs and possible leaks. The intended lifetime and workload determine their meaning.
  environment: Linux recorder with native dependencies. Install the distribution package or follow KDE's source-build instructions. Debug information improves stack interpretation; the GUI has additional Qt/KDE dependencies.
  setup: Install heaptrack, choose a repeatable workload, launch the executable under the recorder, then analyze its output. Attaching to another process is a separate workflow requiring debugger/attach permissions.
  licenseCategory: Open source
  license: KDE lists the application as GPL-2.0-or-later; tracking and command-line printing sources carry LGPL-2.1-or-later notices. Bundled components have separate terms.
  cost: [Free]
  costNote: Free local software. Recording and report analysis consume disk, CPU, and memory; no paid analysis service is required.
  website: https://apps.kde.org/heaptrack/
  verified: '2026-11-12'
  scope: Linux launch-and-record workflow and subsequent analysis, reviewed against KDE documentation. The example is illustrative and was not executed on this Windows host; remote recording, custom allocators, and process attachment are outside this first workflow.
  sources:
    - label: Recording, analysis, symbols, and build instructions
      url: https://github.com/KDE/heaptrack/blob/master/README.md
    - label: KDE application scope, installation, and license
      url: https://apps.kde.org/heaptrack/
    - label: Recorder allocation hooks and license notice
      url: https://github.com/KDE/heaptrack/blob/master/src/track/heaptrack_preload.cpp
    - label: Command-line analysis and license notice
      url: https://github.com/KDE/heaptrack/blob/master/src/analyze/print/heaptrack_print.cpp
    - label: Bundled component license declarations
      url: https://github.com/KDE/heaptrack/blob/master/.reuse/dep5
---

## First try

**Illustrative example; not executed in this review.** On a Linux host with
heaptrack and a C compiler installed, save this as `allocation.c`:

```c
#include <stdlib.h>

int main(void) {
    void *buffer = malloc(1024);
    if (!buffer) return 1;
    return 0;
}
```

Build this disposable program with debug information and record it:

```sh
cc -g -O0 allocation.c -o allocation
heaptrack ./allocation
```

The recorder prints the output file's name. Use that exact path when opening
the recording:

```sh
heaptrack --analyze "PATH_PRINTED_BY_HEAPTRACK"
```

Look for the allocation attributed to `main`. The example leaves that allocation
unfreed before exit. Add `free(buffer);` before the final return, rebuild, and
record again. The expected change is in that allocation's lifetime; unrelated
runtime allocations may still appear. This is an expectation, not captured output.

## Interpret the profile

Distinguish bytes retained at a point in time from cumulative allocation traffic.
A function can allocate many short-lived objects without retaining much memory.
An allocation still live at process exit can be a deliberate cache or
process-lifetime object. Confirm ownership and intended lifetime before calling
it a defect.

Compare recordings only after controlling the workload, executable, symbols,
allocator configuration, and recording scope. The profile does not cover an
unexecuted path, and an unsupported allocation mechanism can limit visibility.

Use [AddressSanitizer](../address-sanitizer/) or
[Valgrind Memcheck](../valgrind-memcheck/) when the question concerns invalid
memory access. Use [py-spy](../py-spy/) for sampled Python execution hot paths;
allocation counts and CPU samples measure different things.
