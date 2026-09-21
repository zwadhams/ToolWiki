---
title: AFL++
description: Mutate inputs using execution feedback to find crashes, hangs, and failures exposed by a fuzzing target.
tool:
  modes: [Dynamic]
  inputTypes: [Binaries]
  techniques: [Coverage-guided fuzzing]
  findings: [Crashes and hangs, Memory safety, Specification violations]
  findingNote: Crash and hang detection is built in. Memory diagnostics depend on instrumentation such as sanitizers; specification failures require an assertion or another failure signal in the target.
  environment: Linux is a primary workflow. macOS is documented with mode restrictions; binary-only modes depend on architecture, OS, and emulator support. Use a compatible Linux environment from Windows.
  setup: Build an instrumented target when source is available, or configure a supported binary-only mode. Provide an input interface or harness, seed inputs, and a reproducible execution environment.
  languages: [C, C++, Language independent]
  languageNote: C/C++ source builds are documented workflows. Binary-only modes work at the executable level, so support depends on architecture and execution mode rather than a universal source-language list.
  targets: [Native programs, Libraries, Native binaries]
  licenseCategory: Open source
  license: AGPL-3.0-or-later for the current combined fuzzer; Apache-2.0 and other licenses for specified components
  cost: [Free]
  costNote: Free under the current open-source terms. The project also documents an optional commercial licensing route with a donation requirement; it changes licensing terms rather than unlocking a paid detection tier. Check the license of the exact release and components you use.
  website: https://aflplus.plus/
  verified: '2026-09-21'
  scope: Current stable repository documentation identifying version 5.03c. Earlier releases can have different licensing; the current license is not inferred from older Apache-only descriptions.
  sources:
    - label: AFL++ workflow, findings, and current licensing
      url: https://github.com/AFLplusplus/AFLplusplus
    - label: Installation and platform restrictions
      url: https://github.com/AFLplusplus/AFLplusplus/blob/stable/docs/INSTALL.md
    - label: Binary-only fuzzing modes
      url: https://github.com/AFLplusplus/AFLplusplus/blob/stable/docs/fuzzing_binary-only_targets.md
    - label: Licensing details and alternatives
      url: https://github.com/AFLplusplus/AFLplusplus/blob/stable/LICENSING.md
---

## What it does

AFL++ evolves a collection of input samples using feedback from repeated target executions. Inputs that expose new behavior help guide later mutations. It saves interesting failures so you can reproduce and investigate them.

The target may read input from a file or standard input, or use a custom harness for a library. A small deterministic target generally makes failures easier to reproduce.

## Source available versus binary only

With source, compile the target with compatible instrumentation. Without source, a supported mode can obtain feedback through mechanisms such as emulation or dynamic instrumentation. Those modes have distinct platform and architecture restrictions.

Both workflows execute a binary. This is dynamic testing, even though a source build or binary preparation step happens first.

## What counts as a failure?

Crashes and timeouts are useful starting points. A sanitizer can make otherwise silent memory errors visible; an assertion can expose a violated invariant. Without an appropriate failure detector, an incorrect output may look like an ordinary successful execution.

Deduplicate and replay failures before estimating their significance. More coverage or more saved crashes does not directly measure the number of distinct vulnerabilities.

See [verification and generated tests](../../concepts/verification-and-generated-tests/) for the comparison with property-based testing and temporal falsification.
