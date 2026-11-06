---
title: Valgrind Memcheck
description: Detect invalid memory access, uninitialized-value use, and leaks while a native program runs.
tool:
  analysisWorkflows:
    - id: runtime
      label: Exercise a native executable
      subject: component
      inputs:
        - Binaries
      languageScope: independent
      languages: []
      findings:
        - Memory safety
      caveat: Observes memory operations in executed paths. Includes invalid accesses, uninitialized
        values, and leak checks; unexecuted behavior is not covered.
      sources:
        - https://valgrind.org/info/platforms.html
        - https://valgrind.org/docs/manual/mc-manual.html
        - https://valgrind.org/info/
      binaryFormats:
        - Native executable
      requires:
        - testInstance
      targetPlatforms:
        - Linux
        - FreeBSD
      excludedTargets:
        - Windows
        - Browser
        - RTOS
        - Bare metal
  modes: [Dynamic]
  inputTypes: [Binaries]
  techniques: [Runtime memory checking]
  languages: [C, C++]
  languageNote: C and C++ are the focus of this entry, not an exclusive language list. Support depends on the executable, operating system, and architecture.
  targets: [Native programs]
  licenseCategory: Open source
  cost: [Free]
  costNote: Free Memcheck tool in Valgrind. No paid upgrade is needed for the memory checks described here.
  license: GPL-2.0; see the project for component-specific terms.
  website: https://valgrind.org/
  verified: '2026-09-22'
  scope: Memcheck only; Valgrind includes other tools for different analysis tasks.
  findings: ["Memory safety"]
  findingNote: "Observes memory operations in executed paths. Includes invalid accesses, uninitialized values, and leak checks; unexecuted behavior is not covered."
  environment: "Supported OS/CPU pairs include Linux and FreeBSD. Darwin support has version limits; native Windows is not a maintained target."
  setup: "An executable program and inputs that exercise it. Rebuilding is usually unnecessary; debug information improves reports."
  sources:
    - label: Supported host platforms
      url: https://valgrind.org/info/platforms.html
    - label: Memcheck manual
      url: https://valgrind.org/docs/manual/mc-manual.html
    - label: About Valgrind and licensing
      url: https://valgrind.org/info/
    - label: First Memcheck run and report structure
      url: https://valgrind.org/docs/manual/quick-start.html
---

## What it does

Memcheck observes a program's memory operations during execution. It reports problems such as invalid reads and writes, incorrect deallocation, use of uninitialized values, and memory leaks.

## When it is useful

Use it to investigate memory behavior while running representative native-code tests. Debug information helps relate reports to the source.

## What to keep in mind

It analyzes the execution you exercise. An untested path can still contain a defect. Instrumentation also slows execution, and platform support must be checked before planning a workflow.

Memcheck is dynamic analysis, but it is not a web DAST scanner.

<span id="getting-started"></span>

## First try

**Illustrative example; not executed here.** This path targets
[Valgrind 3.28.0](https://valgrind.org/downloads/) on amd64 Linux with a C compiler
such as GCC. Install it through your distribution or the release instructions.
Native Windows is outside this path. Save `memory.c`:

```c
#include <stdlib.h>

int main(void) {
    int *values = malloc(4 * sizeof(*values));
    if (values == NULL) return 1;
    values[4] = 7;
    free(values);
    return 0;
}
```

Build with debug information, then run under Memcheck:

```sh
cc -g -O0 memory.c -o memory
valgrind --tool=memcheck --leak-check=full ./memory
```

Expect an invalid-write report at `values[4]`: the allocation has indices 0
through 3. Inspect the stack and allocation context, not just the final error
count. Change the write to `values[3]`, rebuild, and rerun with the same options.
The invalid write should disappear; a failed allocation is a separate execution
outcome, not a successful check of that write.

The [official quick start](https://valgrind.org/docs/manual/quick-start.html)
explains debug builds and report structure. For your application, retain its
normal input arguments, the binary identity, and any suppressions in a
[run record](../../guides/run-record/). Memcheck checks the paths actually run;
use representative tests and review errors before adding narrow suppressions.
