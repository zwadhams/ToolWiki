---
title: Frama-C (Eva and WP)
description: Analyze C runtime safety with Eva and verify specified C behavior with WP.
tool:
  modes: [Static]
  inputTypes: [Source code]
  techniques: [Abstract interpretation, Deductive verification, Formal verification]
  findings: [Memory safety, Specification violations]
  findingNote: Eva reports possible runtime errors in its supported classes; WP generates proof obligations from specifications. Unproved obligations are not automatically concrete bugs.
  environment: Linux and macOS installation routes; Windows through the documented WSL route. Plugin and solver requirements vary.
  setup: Supply C source and preprocessing context. Eva needs a model of the entry environment; WP usually needs ACSL contracts, loop annotations, and configured proof solvers. No runtime test harness is required for these static plugins.
  languages: [C]
  languageNote: C with ACSL specifications for the workflows covered here. C++ front ends and other plugins require separate compatibility review.
  targets: [Source code]
  licenseCategory: Open source
  license: LGPL distribution; inspect individual plugins and solver licenses
  cost: [Free]
  costNote: The open-source distribution includes the Eva and WP workflows. Commercial support, customization, and alternative licensing are separate options; optional solvers have their own terms.
  website: https://www.frama-c.com/
  verified: '2026-09-21'
  scope: Frama-C 33.0 documentation, focused on static Eva and WP analyses. E-ACSL runtime checking is outside this entry's filter scope.
  sources:
    - label: Frama-C analysis overview
      url: https://www.frama-c.com/
    - label: Eva value analysis
      url: https://www.frama-c.com/fc-plugins/eva.html
    - label: WP deductive verification
      url: https://www.frama-c.com/fc-plugins/wp.html
    - label: Installation and supported host routes
      url: https://www.frama-c.com/html/get-frama-c.html
    - label: Licensing and commercial services
      url: https://www.frama-c.com/html/contact.html
---

## Two analyses in one framework

| Plugin | Main job | What you interpret |
| --- | --- | --- |
| Eva | Approximate possible values and behavior using abstract interpretation. | Alarms about possible runtime errors and inferred properties. |
| WP | Turn annotated requirements into proof obligations. | Which obligations were proved, remain unknown, or need additional work. |

Eva can analyze selected classes of undefined behavior, including invalid memory access and arithmetic errors. WP supports functional specifications expressed as ACSL contracts and annotations.

## What a result means

An Eva alarm can reflect a real error or imprecision in the analysis. A failed or timed-out WP proof can reflect a false property, missing annotations, unsupported modeling, or a solver limitation. Investigate before labeling either as a confirmed bug.

Successful proofs apply to the modeled program and stated assumptions. Check the environment model, machine configuration, unsupported constructs, and trusted specifications when interpreting a result.

## Where to start

Start with a small C routine and a known environment. Use the Eva tutorial to examine value ranges and alarms, or the WP tutorial to state a function contract and inspect its obligations. Add complexity gradually and preserve annotations as part of the code review.

Frama-C also includes dynamic techniques such as E-ACSL. They have different execution requirements and should not be inferred from this entry's static tags.
