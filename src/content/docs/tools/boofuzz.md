---
title: boofuzz
description: Generate malformed protocol messages and exercise a running service through a configurable test session.
executionEvidence:
  status: recorded
  scope: "boofuzz 0.4.2 on Windows with Python 3.12.16 sent two selected PING values to a local protocol fixture. The faulty server missed the TRIGGER response and the harness exited 1; the corrected server satisfied both response checks and exited 0. Only this finite response contract was checked, without a process-crash or memory monitor."
  sources:
    - https://github.com/zwadhams/ToolWiki/blob/main/audits/remaining-work/executions/boofuzz/faulty.json
    - https://github.com/zwadhams/ToolWiki/blob/main/audits/remaining-work/executions/boofuzz/fixed.json
tool:
  analysisWorkflows:
    - id: custom-protocol
      label: Exercise a custom protocol description
      subject: connection
      inputs:
        - Running applications
      languageScope: independent
      languages: []
      findings:
        - Crashes and hangs
        - Specification violations
      caveat: Failure detection depends on monitors, response checks, and callbacks you configure. Sending
        malformed messages alone does not identify every crash, memory error, or protocol violation.
      sources:
        - https://github.com/jtpereyda/boofuzz
        - https://boofuzz.readthedocs.io/en/stable/user/install.html
        - https://boofuzz.readthedocs.io/en/stable/user/quickstart.html
      requires:
        - harness
        - testInstance
      interfaces:
        - Custom protocol
      transports:
        - TCP
        - UDP
        - Serial
  modes: [Dynamic]
  inputTypes: [Running applications]
  techniques: [Protocol fuzzing, Mutation-based fuzzing]
  languages: [Language independent]
  languageNote: Targets services through their protocol interfaces. Python is used to describe the harness, not the language the service must be written in.
  targets: [Network services, Protocol implementations, Embedded systems]
  findings: [Crashes and hangs, Specification violations]
  findingNote: Failure detection depends on monitors, response checks, and callbacks you configure. Sending malformed messages alone does not identify every crash, memory error, or protocol violation.
  environment: Python on a compatible host; Windows and Unix installation routes are documented. Process monitors, raw sockets, and serial connections impose additional platform requirements.
  setup: Describe message fields and request order, configure a target connection, and arrange monitoring and target reset. Application source is not required for network testing.
  licenseCategory: Open source
  license: GPL-2.0
  cost: [Free]
  costNote: Free protocol-fuzzing framework. Target devices, monitoring infrastructure, and test environments are separate resources.
  website: https://boofuzz.readthedocs.io/
  verified: '2026-09-22'
  scope: Stable 0.4.2 documentation for protocol definitions, sessions, and target connections. This entry does not imply built-in code-coverage feedback.
  sources:
    - label: Features and license
      url: https://github.com/jtpereyda/boofuzz
    - label: Installation
      url: https://boofuzz.readthedocs.io/en/stable/user/install.html
    - label: Messages, sessions, and logging
      url: https://boofuzz.readthedocs.io/en/stable/user/quickstart.html
---

## What it does

boofuzz separates the protocol description from the target connection and failure monitoring. A request graph can establish a session before mutating a later message. Supported connections include TCP, UDP, and serial interfaces.

## First try

Use the [supplied PING target and harness](https://github.com/zwadhams/ToolWiki/tree/main/examples/protocol-ping) for a complete local response check. It includes a loopback server, faulty and corrected modes, two selected mutations, response validation, readiness/reset handling, and stop instructions.

**Executed on 2026-11-06:** boofuzz 0.4.2 on Windows/Python 3.12.16. The faulty target omitted its reply to a valid `PING TRIGGER` request. The response callback reported that violation; the corrected target passed both selected cases. This was a finite protocol demonstration, not a process-crash test or a broad fuzzing campaign.

Each run retains requests, replies, configuration hashes, console output, and a boofuzz database. The [execution observations](https://github.com/zwadhams/ToolWiki/tree/main/audits/remaining-work/executions/boofuzz) preserve the results separately from expected behavior. Adapt the message model, monitor, and reset procedure to the real target before expanding the mutation set.

## Limits

A lost connection may be expected rejection or a real failure; inspect the service and reproduce the input. Protocol state, checksums, authentication, and target recovery can require custom harness work.

Compare [Schemathesis](../schemathesis/) or [RESTler](../restler/) when an HTTP API definition can drive test generation. Compare [AFL++](../afl-plus-plus/) when an instrumentable binary and execution-feedback workflow fit better.
