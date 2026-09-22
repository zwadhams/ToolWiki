---
title: boofuzz
description: Generate malformed protocol messages and exercise a running service through a configurable test session.
tool:
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

## Example

**Illustrative harness, not run here.** Install boofuzz in a Python environment. Assume a disposable local test service on port 8021 accepts lines of the form `PING value`:

```python
from boofuzz import Request, Session, Static, String, Target, TCPSocketConnection

message = Request("ping", children=(
    Static("command", b"PING "),
    String("value", "hello"),
    Static("end", b"\r\n"),
))
session = Session(target=Target(
    connection=TCPSocketConnection("127.0.0.1", 8021)
))
session.connect(message)
session.fuzz()
```

This mutates the value and records tests. Add a suitable process monitor, response callback, and restart method before treating it as a complete defect-detection setup.

## Limits

A lost connection may be expected rejection or a real failure; inspect the service and reproduce the input. Protocol state, checksums, authentication, and target recovery can require custom harness work.

Compare [Schemathesis](../schemathesis/) or [RESTler](../restler/) when an HTTP API definition can drive test generation. Compare [AFL++](../afl-plus-plus/) when an instrumentable binary and execution-feedback workflow fit better.
