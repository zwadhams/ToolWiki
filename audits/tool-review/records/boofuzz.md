# boofuzz: evidence record

Access/review date: 2026-09-22. Existing scope: Stable 0.4.2 documentation for protocol definitions, sessions, and target connections. This entry does not imply built-in code-coverage feedback.

File: `src/content/docs/tools/boofuzz.md`. Baseline SHA-256: `f96487dbcda95675b00d809fc6e6881d8a06cf64307bea82905acdb69a0259f4`. Reviewed SHA-256: `f96487dbcda95675b00d809fc6e6881d8a06cf64307bea82905acdb69a0259f4`. Original text is preserved in baseline.json.

Status: Assessed against primary documentation; see qualifications below.

## E1: evidence assessment

The quickstart supports the Request/Static/String/Target/TCPSocketConnection construction and graph-based sessions. Connections include TCP/UDP/serial; monitors and callbacks are additional work. The sample assumes a local service and does not claim complete failure detection or coverage feedback. GPL-2.0 and Python installation support the listed licensing and host qualifications.

Source sections: 0.4.2 Quickstart: Session, Request, primitives, connections and logging; Installation; repository GPL-2.0 license

- [S1](https://github.com/jtpereyda/boofuzz)
- [S2](https://boofuzz.readthedocs.io/en/stable/user/install.html)
- [S3](https://boofuzz.readthedocs.io/en/stable/user/quickstart.html)

Correction: No content correction recorded.

## Claims and dispositions

Counts: {"supported":24,"supported with qualification":8,"contradicted":0,"unresolved":0}. Compound paragraphs retain their qualifications; list-valued fields are assessed member by member. Quoted relative links point to the corresponding repository Markdown pages.

| Location | Claim as reviewed | Verdict | Evidence / limitation |
| --- | --- | --- | --- |
| title | boofuzz | supported | See evidence assessment E1. |
| description | Generate malformed protocol messages and exercise a running service through a configurable test session. | supported | See evidence assessment E1. |
| tool.modes[0] | Dynamic | supported | See evidence assessment E1. |
| tool.inputTypes[0] | Running applications | supported | See evidence assessment E1. |
| tool.techniques[0] | Protocol fuzzing | supported | See evidence assessment E1. |
| tool.techniques[1] | Mutation-based fuzzing | supported | See evidence assessment E1. |
| tool.languages[0] | Language independent | supported | See evidence assessment E1. |
| tool.languageNote | Targets services through their protocol interfaces. Python is used to describe the harness, not the language the service must be written in. | supported | See evidence assessment E1. |
| tool.targets[0] | Network services | supported | See evidence assessment E1. |
| tool.targets[1] | Protocol implementations | supported | See evidence assessment E1. |
| tool.targets[2] | Embedded systems | supported | See evidence assessment E1. |
| tool.findings[0] | Crashes and hangs | supported | See evidence assessment E1. |
| tool.findings[1] | Specification violations | supported | See evidence assessment E1. |
| tool.findingNote | Failure detection depends on monitors, response checks, and callbacks you configure. Sending malformed messages alone does not identify every crash, memory error, or protocol violation. | supported | See evidence assessment E1. |
| tool.environment | Python on a compatible host; Windows and Unix installation routes are documented. Process monitors, raw sockets, and serial connections impose additional platform requirements. | supported | See evidence assessment E1. |
| tool.setup | Describe message fields and request order, configure a target connection, and arrange monitoring and target reset. Application source is not required for network testing. | supported | See evidence assessment E1. |
| tool.licenseCategory | Open source | supported | See evidence assessment E1. |
| tool.license | GPL-2.0 | supported | See evidence assessment E1. |
| tool.cost[0] | Free | supported | See evidence assessment E1. |
| tool.costNote | Free protocol-fuzzing framework. Target devices, monitoring infrastructure, and test environments are separate resources. | supported | See evidence assessment E1. |
| tool.website | https://boofuzz.readthedocs.io/ | supported | See evidence assessment E1. |
| tool.verified | 2026-09-22 | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.scope | Stable 0.4.2 documentation for protocol definitions, sessions, and target connections. This entry does not imply built-in code-coverage feedback. | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.sources[0] | Features and license: https://github.com/jtpereyda/boofuzz | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.sources[1] | Installation: https://boofuzz.readthedocs.io/en/stable/user/install.html | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.sources[2] | Messages, sessions, and logging: https://boofuzz.readthedocs.io/en/stable/user/quickstart.html | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| What it does, line 33 | boofuzz separates the protocol description from the target connection and failure monitoring. A request graph can establish a session before mutating a later message. Supported connections include TCP, UDP, and serial interfaces. | supported | See evidence assessment E1. |
| Example, line 37 | **Illustrative harness, not run here.** Install boofuzz in a Python environment. Assume a disposable local test service on port 8021 accepts lines of the form `PING value`: | supported with qualification | Author recommendation or conditional inference, not a measured effectiveness claim. Factual premises reviewed against E1. |
| Example, line 39 | ```python<br>from boofuzz import Request, Session, Static, String, Target, TCPSocketConnection<br><br>message = Request("ping", children=(<br>    Static("command", b"PING "),<br>    String("value", "hello"),<br>    Static("end", b"\r\n"),<br>))<br>session = Session(target=Target(<br>    connection=TCPSocketConnection("127.0.0.1", 8021)<br>))<br>session.connect(message)<br>session.fuzz()<br>``` | supported with qualification | Documentation/static reasoning only; this example has not been executed. See E1. |
| Example, line 54 | This mutates the value and records tests. Add a suitable process monitor, response callback, and restart method before treating it as a complete defect-detection setup. | supported with qualification | Author recommendation or conditional inference, not a measured effectiveness claim. Factual premises reviewed against E1. |
| Limits, line 58 | A lost connection may be expected rejection or a real failure; inspect the service and reproduce the input. Protocol state, checksums, authentication, and target recovery can require custom harness work. | supported | See evidence assessment E1. |
| Limits, line 60 | Compare [Schemathesis](../../../src/content/docs/tools/schemathesis.md) or [RESTler](../../../src/content/docs/tools/restler.md) when an HTTP API definition can drive test generation. Compare [AFL++](../../../src/content/docs/tools/afl-plus-plus.md) when an instrumentable binary and execution-feedback workflow fit better. | supported | See evidence assessment E1. |
