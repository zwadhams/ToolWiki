---
title: SAST adoption
description: Usability problems and human factors that affect the adoption and continued use of SAST tools.
---

In [Barriers to Using SAST Tools](https://arxiv.org/abs/2609.01669), we examined the problems developers encounter when adopting and using static application security testing. We focused on usability and the technical and human factors that affect continued use.

## Methods

We reviewed 89 papers selected from ACM and IEEE conference literature covering 2019-2023. We identified recurring problems and recorded how frequently each was mentioned.

## Findings

We identified barriers including false positives, poor output, time-consuming setup, manual effort to fix issues, and workflow disruption. More than two-thirds of the reviewed papers mentioned false positives. This measures the prevalence of a reported concern in the literature, not tool accuracy.

We argue that both development teams and tool creators have a role in improving adoption. Developers invest effort in configuration and interpretation; tool creators can improve output, setup, remediation guidance, and integration.

## Limitations

We examined the range and frequency of reported problems. We did not measure their severity in every development environment. Our databases, search terms, selection criteria, and time window limit the literature represented.

## Evaluating usability

When evaluating a tool, I would consider the following questions:

| Usability concern | Question for an initial evaluation |
| --- | --- |
| False positives | How much investigation is required, and how are reviewed decisions retained? |
| Output quality | Does the report explain the issue, affected code, and information needed for remediation? |
| Setup | What configuration and maintenance does the tool require? |
| Manual effort | What guidance is available for understanding and resolving findings? |
| Workflow disruption | When does analysis run, where are results presented, and who addresses them? |

Evaluate these aspects over several analysis runs. Initial setup alone does not account for the ongoing work of maintaining rules and reviewing findings.

I include **Input type**, **Build / harness requirements**, and **Finding scope** in the tool profiles to help prepare an evaluation. Experience in the intended development environment is still needed to assess usability.

## Paper

Zachary Wadhams, Clemente Izurieta, and Ann Marie Reinhold. **Barriers to Using Static Application Security Testing (SAST) Tools: A Literature Review.** ASEW, 2024, pp. 161-166. [Read the paper](https://arxiv.org/abs/2609.01669), especially Sections 3-5. The conference paper is from 2024; its arXiv posting is from 2026.

My [master's thesis](https://www.cs.montana.edu/izurieta/thesis/Wadhams.pdf) connects the review to the [CI/CD integration use case](../sast-workflow/). See also [comparing SAST tools](../comparing-tools/).
