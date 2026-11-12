---
title: Choose a task
description: Start with a software question, then find requirements, tools, runnable examples, and result interpretation.
---

Choose the question you need to answer. Each workflow explains what to provide,
which results to inspect, and what the results cannot establish. Start with
[Get the examples](../guides/get-examples/) for repository setup. Inspect your
existing configuration before adapting a recipe.

On a narrow screen, scroll the table sideways to see the comparison links.

| Task | What you need | Start here | Compare or extend |
| --- | --- | --- | --- |
| Check Python lint rules and types | Python source and the project's target version | [Ruff and mypy recipe](../guides/python-checks/) | [Linting and type checking](../comparisons/ruff-and-mypy/) |
| Investigate native memory errors | A runnable workload and either a rebuild or a supported binary | [Memory-error checks](../guides/memory-error-detection/) | [AddressSanitizer and Memcheck](../comparisons/address-sanitizer-and-valgrind-memcheck/) |
| Analyze Java source or classes | Source extraction or compiled classes, depending on the question | [Java workflows](../guides/java-analysis/) | [CodeQL and SpotBugs](../comparisons/codeql-and-spotbugs/) |
| Exercise an HTTP API | A disposable running endpoint and an OpenAPI document | [HTTP API testing](../guides/api-testing/) | [Schema, runtime, and contract checks](../guides/api-contracts/) |
| Check browser behavior and accessibility | A test page, browser, and stated interactions | [Browser and accessibility recipe](../guides/browser-testing/) | [Playwright](../tools/playwright/) and [axe-core](../tools/axe-core/) |
| Validate an API description or contract | An API description or consumer expectations and a local provider | [API descriptions and contracts](../guides/api-contracts/) | [Spectral](../tools/spectral/) and [Pact](../tools/pact/) |
| Inventory software components | A package declaration, directory, or image with known scope | [SBOM inventory recipe](../guides/sbom-inventory/) | [Syft](../tools/syft/) and [Grype](../tools/grype/) |
| Check a finite system model | A TLA+ specification, finite constants, and a property | [TLC model-checking recipe](../guides/model-checking/) | [TLC](../tools/tlc/) |
| Inspect what a test suite exercises | A passing test command and explicit source scope | [Coverage and mutation results](../guides/test-evidence/) | [coverage.py](../tools/coverage-py/), [StrykerJS](../tools/strykerjs/), and [PIT](../tools/pit/) |
| Check a requirement over time | A recorded signal trace or an executable model | [Monitoring and falsification](../guides/temporal-monitoring-and-falsification/) | [RTAMT and PSY-TaLiRo](../comparisons/rtamt-and-psy-taliro/) |

For a broader system, describe its components and connections in
[Find tools for your system](../analysis-suite/). Missing details remain questions;
a match is a candidate to evaluate, not a claim that a tool has run.

## Use the result

Read [Review findings](../guides/reviewing-findings/) before deciding whether a
diagnostic needs a correction, suppression, or further investigation. Use
[Handle checks in CI](../guides/ci-checks/) to preserve command exits and reports.
Each recipe labels its execution scope separately from documentation review.

## Read with an agent

This directory, its guides, and the [task comparisons](../comparisons/) are
ordinary HTML and [Markdown records](../knowledge/v1/documents/tasks.md).
Follow the links without interacting with browser controls. The
[data access guide](../guides/data-access/) explains filtering, revisions, and citations.
