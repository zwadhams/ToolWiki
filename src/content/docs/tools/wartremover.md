---
title: WartRemover
description: Apply selected Scala compiler checks to constructs that can weaken type safety or hide mistakes.
tool:
  modes: [Static]
  inputTypes: [Source code]
  techniques: [Linting, Bug finding]
  languages: [Scala]
  languageNote: Uses Scala compiler integration. Choose plugin artifacts compatible with the project's Scala version; this is not arbitrary JVM bytecode analysis.
  targets: [Scala applications, Libraries]
  findings: [Coding conventions, Logic errors]
  findingNote: Reports enabled warts, such as partial Option access or disallowed null usage. Rules enforce selected restrictions and do not prove overall program safety.
  environment: A compatible Scala compiler and JVM build environment, commonly sbt. Plugin compatibility is tied to the compiler version.
  setup: Install the compiler/build plugin and explicitly select rules as warnings or errors. The documented default enables neither set of rules.
  licenseCategory: Open source
  license: Apache-2.0
  cost: [Free]
  costNote: Free compiler plugin and supplied checks. No paid analysis tier is required.
  website: https://www.wartremover.org/
  verified: '2026-09-22'
  scope: Documented sbt integration and selected built-in warts. Version 3.6.2 is the installation example used here, subject to Scala compiler compatibility.
  sources:
    - label: Installation, defaults, and compiler integration
      url: https://www.wartremover.org/doc/install-setup.html
    - label: Built-in warts
      url: https://www.wartremover.org/doc/warts.html
    - label: License
      url: https://www.wartremover.org/dev/license.html
    - label: OCPP study
      url: https://www.cs.montana.edu/izurieta/pubs/CSR_2026_Wadhams.pdf
---

## What it does

WartRemover checks Scala code during compilation. Each wart describes a construct to flag, such as calling `get` on an `Option`, where an empty value would throw. You decide which restrictions suit the project.

## Example

**Illustrative configuration, not run here.** In a compatible sbt project, add to `project/plugins.sbt`:

```scala
addSbtPlugin("org.wartremover" % "sbt-wartremover" % "3.6.2")
```

Enable one warning in `build.sbt`:

```scala
wartremoverWarnings += Wart.OptionPartial
```

Then run `sbt compile` on code containing an `Option.get` call. The intended warning identifies that partial operation. Refactoring to explicitly handle empty and nonempty cases addresses the rule's concern.

## Limits

Installing the plugin alone does not establish that any warts ran: the documented warning and error rule lists are empty by default. Record the selected warts and suppressions with the results.

A warning can enforce a team convention even when the particular call is safe under an assumption. Review the context instead of treating every wart as a vulnerability.

## Related research

We used WartRemover for the Scala implementation in our [OCPP study](https://www.cs.montana.edu/izurieta/pubs/CSR_2026_Wadhams.pdf). I retain the distinction between a reported tool name and its enabled checks when interpreting those findings. See [Comparing SAST tools](../../research/comparing-tools/).
