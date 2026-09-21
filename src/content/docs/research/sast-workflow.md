---
title: SAST in CI/CD
description: Automating the transfer of SAST findings into developers' existing issue-tracking software.
---

In our [CI/CD paper](https://arxiv.org/abs/2609.00676), we presented a process for connecting SAST output with existing issue-tracking software. We wanted to make findings accessible within the development environment and support remediation.

## Process

A controller script collects SAST results, formats the relevant information, and sends it to the issue tracker. We worked with an organization that used Python to connect SonarQube with GitLab. Network restrictions had limited direct SonarQube access to two senior developers in a team of more than twenty.

Generated issues included code context, explanations, and weakness or vulnerability references. The process prevented duplicate issue creation. Nightly analysis was followed by a merge-request quality gate.

## Findings

Developers responded positively to the presentation and accessibility of findings. Reported challenges included a learning curve, effort to identify false positives, and conflicting views about quality-gate restrictions.

## Limitations

Our use case involved one organization and one SAST tool. The feedback does not establish effectiveness across other tools or development environments. Current integration details also depend on the selected product version and APIs.

## Integration

When adapting the process to another environment, I would consider:

1. **Analysis completion.** Check that analysis completed before collecting results, and retain execution errors for investigation.
2. **Issue selection and formatting.** Define the relevant finding categories and include code location, rule information, and context needed for remediation.
3. **Duplicate prevention.** Maintain the association between findings and tracker issues across repeated analysis runs.
4. **Review and resolution.** Distinguish transferring a finding from determining its validity or resolving it.
5. **Quality gates.** Establish conditions appropriate to the development environment and review their effect on developer workflow.

I provide these as implementation considerations; this wiki does not supply a tested connector. A passing quality gate means its configured conditions were met.

## Related tools

We used SonarQube. I list [Server](../../tools/sonarqube/) and [Community Build](../../tools/sonarqube-community/), but our study does not compare those current editions.

For other tools, examine report formats, finding identifiers, result states, and API access before adapting the process.

## Paper

Zachary Wadhams, Ann Marie Reinhold, and Clemente Izurieta. **Automating Static Code Analysis Through CI/CD Pipeline Integration.** SANER-C, 2024, pp. 119-125. [Read the paper](https://arxiv.org/abs/2609.00676), especially Sections IV-VII. The arXiv posting is from 2026.

Related notes: [SAST adoption](../sast-adoption/) and [SAST vs. DAST](../../concepts/sast-vs-dast/).
