---
title: Record a tool choice
description: Preserve why a shortlisted tool fits a component, what it needs, and which questions still need answers.
---

Use this note to turn a shortlisted tool into an evaluation plan for one
component or connection. It does not change the system
builder's exported description or the three-tool comparison limit.

## Make the choice explicit

Copy this template into your project:

```text
Component or connection:
Question to answer:
Chosen tool, edition, and workflow:
Input and intended environment:
Why this workflow fits:
Alternatives or complementary tools considered:
Required access, setup, and dependencies:
Unresolved compatibility, cost, or data-handling questions:
Scope limits and accepted tradeoffs:
Evidence links and review date:
First evaluation and expected signal:
Decision: evaluate / adopt / defer / reject
Owner and revisit condition:
```

For example, a Python service may use Ruff for selected lint rules and mypy for
type consistency. The note should name both jobs, the checked package, and any
missing stubs. It should not turn the two tools' finding categories into a claim
of complete coverage.

Check unresolved prerequisites before adopting a workflow. A builder candidate
means its reviewed conditions fit the supplied description; it does not mean the
tool ran or that every library and version is compatible. Link the exact profile
notes that support the decision.

## Move from a choice to evidence

Run a small check with a known expected signal, then preserve a
[run record](../run-record/). Keep the selection rationale here and the actual
commands, reports, and results in that record. The
[Python linting and types recipe](../python-checks/) shows how complementary
tools can share inputs while keeping their findings separate.
