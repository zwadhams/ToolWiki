---
title: "Valgrind Helgrind"
description: "Observe native threaded programs for data races and synchronization mistakes."
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
        - Concurrency issues
      caveat: Checks observed synchronization, data races, and inconsistent lock ordering. A lock-order
        warning indicates potential deadlock, not necessarily an observed one.
      sources:
        - https://valgrind.org/docs/manual/hg-manual.html
        - https://valgrind.org/info/platforms.html
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
  aliases: ["Helgrind"]
  searchTerms: ["data races","race conditions","pthreads","lock ordering","deadlocks"]
  modes: ["Dynamic"]
  inputTypes: ["Binaries"]
  techniques: ["Runtime race detection","Dynamic instrumentation"]
  languages: ["C","C++","Fortran"]
  languageNote: "Native programs using POSIX pthreads. Custom synchronization can require annotations; language tags describe the documented use cases."
  targets: ["Multithreaded native programs"]
  findings: ["Concurrency issues"]
  findingNote: "Checks observed synchronization, data races, and inconsistent lock ordering. A lock-order warning indicates potential deadlock, not necessarily an observed one."
  environment: "A supported Valgrind OS/CPU combination, including documented Linux and FreeBSD targets."
  setup: "Provide an executable and representative workload; debug information helps. Select the Helgrind tool explicitly."
  license: "GPL-2.0; see Valgrind component-specific terms."
  costNote: "Free tool distributed with Valgrind."
  website: "https://valgrind.org/docs/manual/hg-manual.html"
  scope: "Helgrind only. Memcheck and other Valgrind tools have separate purposes."
  licenseCategory: "Open source"
  cost: ["Free"]
  verified: "2026-09-26"
  sources:
    - label: "Helgrind manual"
      url: https://valgrind.org/docs/manual/hg-manual.html
    - label: "Supported platforms"
      url: https://valgrind.org/info/platforms.html
    - label: "Project and license"
      url: https://valgrind.org/info/
---

## Where it fits

Helgrind adds a concurrency-focused option beside [ThreadSanitizer](../thread-sanitizer/). It is a separate Valgrind tool from [Memcheck](../valgrind-memcheck/).

## Exercise the shared state

Run a reproducible threaded workload with Helgrind selected. Review the accesses and synchronization reported together, rather than treating the final stack frame as the entire explanation.

## Account for synchronization models

Helgrind works best with pthreads. Check its guidance before interpreting custom synchronization or adding annotations. Retain representative concurrency tests: one execution cannot cover all schedules.
