---
title: TLC (TLA+ model checker)
description: Explore a finite TLA+ model to find invariant, deadlock, or temporal-property violations in a system design.
executionEvidence:
  status: recorded
  scope: TLC 2.19 from the v1.7.4 archive, Oracle Java 25.0.4.1 on Windows 11; faulty and corrected capacity-2 queue-occupancy models. Checks TypeOK and WithinCapacity, not liveness or application code.
  sources:
    - https://github.com/zwadhams/ToolWiki/blob/main/examples/tlc/evidence.md
tool:
  cardRequirement: Supply a TLA+ model, concrete constants, and the properties to check.
  decision:
    useWhen: Explore possible state transitions in a protocol or system design before implementing it.
    result: A counterexample trace for a violated property, or a completion report for the configured model instance.
    limit: A completed finite-model run covers that model and its stated properties. It does not prove all parameter sizes or establish that implementation code follows the model.
  analysisWorkflows:
    - id: finite-model
      label: Check invariants of a finite TLA+ model
      subject: component
      inputs: [Executable models]
      languageScope: model
      languages: [TLA+]
      findings: [Specification violations]
      hostPlatforms: [Windows, Linux, macOS]
      requires: []
      caveat: Supply an executable TLA+ specification, finite constant assignments, and invariants. This workflow describes exhaustive state-space checking, not random simulation. Java, memory limits, modeling assumptions, and the selected release still need review.
      sources:
        - https://lamport.azurewebsites.net/tla/tools.html
        - https://tla.msr-inria.inria.fr/tlatoolbox/doc/model/overview-page.html
        - https://tla.msr-inria.inria.fr/tlatoolbox/doc/model/tlc-options-page.html
        - https://github.com/tlaplus/tlaplus/releases/tag/v1.7.4
  aliases: [TLC, TLA+, TLA plus]
  searchTerms: [state space, invariant, model checking, protocol design, safety, liveness, counterexample, deadlock]
  modes: [Static]
  inputTypes: [Executable models]
  techniques: [Model checking, Formal verification]
  languages: [TLA+]
  languageNote: The input is an executable subset of the TLA+ specification language. TLC does not automatically derive a faithful model from C, Java, or another implementation language.
  targets: [State-machine models, Protocol designs, Concurrent-system designs]
  findings: [Specification violations, Temporal requirement violations]
  findingNote: Checks the selected invariants, deadlocks, and temporal properties under the configured model and assumptions. The worked example checks invariants only.
  environment: Java command-line tool usable on supported JVM hosts; the pinned example ran on Windows 11 with an x64 Oracle JDK 25.0.4.1. Toolbox packages are also provided for Windows, Linux, and macOS.
  setup: Write a TLA+ module and model configuration, instantiate constants, select properties, and provide a compatible JVM and enough resources to finish the search.
  licenseCategory: Open source
  license: MIT for the TLA+ tools; the selected Java runtime has its own terms.
  cost: [Free]
  costNote: No paid TLC edition is required. Large model searches can consume substantial memory, disk, and compute resources.
  website: https://lamport.azurewebsites.net/tla/tools.html
  verified: '2026-11-12'
  scope: TLC explicit-state model checking. The executed example pins the stable v1.7.4 archive, which reports TLC 2.19. The moving v1.8.0 prerelease, PlusCal translation, TLAPS proofs, and random simulation were not exercised.
  sources:
    - label: TLA+ tools and model-checking scope
      url: https://lamport.azurewebsites.net/tla/tools.html
    - label: Model behavior, constants, and properties
      url: https://tla.msr-inria.inria.fr/tlatoolbox/doc/model/overview-page.html
    - label: Model checking versus simulation and resource options
      url: https://tla.msr-inria.inria.fr/tlatoolbox/doc/model/tlc-options-page.html
    - label: Result status and state-space statistics
      url: https://tla.msr-inria.inria.fr/tlatoolbox/doc/model/results-page.html
    - label: Pinned release and archive checksum
      url: https://github.com/tlaplus/tlaplus/releases/tag/v1.7.4
    - label: Current CLI requirements and prerelease policy
      url: https://github.com/tlaplus/tlaplus/blob/master/README.md
    - label: Release license
      url: https://github.com/tlaplus/tlaplus/blob/v1.7.4/README.md#license
---

## First try

Follow the [queue-capacity model example](../../guides/model-checking/). It keeps
the invariant fixed and changes an enqueue guard from `queued <= Capacity` to
`queued < Capacity`.

**Executed on Windows 11 with TLC 2.19 and Java 25.0.4.1.** With capacity 2, the
faulty model reaches occupancies 0, 1, 2, and 3 and reports an invariant violation
with exit code 12. The corrected model completes with three distinct states and
exit code 0. The [run record](https://github.com/zwadhams/ToolWiki/blob/main/examples/tlc/evidence.md)
links the exact archive, input hashes, commands, and raw output.

## Read the model boundary

A model deliberately omits implementation detail. Decide whether those
abstractions preserve the behavior relevant to the property. A queue-occupancy
model cannot establish FIFO ordering when it contains no messages or ordering
state. A missing transition can make an invariant pass for an unrealistic model.

An invariant constrains every reachable state. A liveness property describes
progress over behavior and may need fairness assumptions. This example does
not check liveness. Keep the configured properties, constants, state constraints,
search mode, and completion status with the result.

## Use the result

Treat a counterexample as a sequence to investigate: the model may expose a
design error, or the specification may encode the design incorrectly. After a
correction, rerun the same properties and bounds. A resource failure, parser
error, or stopped search is an incomplete check.

This catalog classifies exhaustive model checking as static analysis of a
design. TLC's separate simulation mode samples behaviors. Neither execution
mode automatically proves that production code implements the model.

For contracts on implementation code, compare the scope of [Dafny](../dafny/)
and [CBMC](../cbmc/). For requirements over recorded signals, see
[RTAMT](../rtamt/).
