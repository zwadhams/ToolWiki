---
title: Valgrind Memcheck
description: Detect invalid memory access, uninitialized-value use, and leaks while a native program runs.
tool:
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
  verified: '2026-09-21'
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
---

## What it does

Memcheck observes a program's memory operations during execution. It reports problems such as invalid reads and writes, incorrect deallocation, use of uninitialized values, and memory leaks.

## When it is useful

Use it to investigate memory behavior while running representative native-code tests. Debug information helps relate reports to the source.

## What to keep in mind

It analyzes the execution you exercise. An untested path can still contain a defect. Instrumentation also slows execution, and platform support must be checked before planning a workflow.

Memcheck is dynamic analysis, but it is not a web DAST scanner.

## Getting started

Begin with the Memcheck manual and a reproducible test case. Review error contexts before suppressing reports, and keep suppressions narrow enough to preserve useful findings.
