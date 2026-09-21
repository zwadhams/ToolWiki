---
title: Software quality models
description: Applying HSQA to evaluate quality and security characteristics in electric vehicle charging software.
---

In [Wicked Problem, Parsimonious Solution](https://www.cs.montana.edu/izurieta/pubs/Sheppard_CSR_2025.pdf), we proposed applying hierarchical software quality assurance (HSQA) to electric vehicle supply equipment (EVSE) software. Our approach connects analysis results with broader characteristics used to assess software quality and security.

## Approach

HSQA aggregates tool outputs through levels of a quality model. We discuss PIQUE, the Platform for Investigative software Quality Understanding and Evaluation, as an implementation approach.

We drew the proposed EVSE characteristics from software quality standards, charging-infrastructure cybersecurity practices, and standards from related infrastructure domains. We proposed combining assessments of software components that operate together.

## Coverage

An HSQA model depends on the characteristics its analysis tools can measure. We identified limited EVSE-specific tooling as a threat to validity and discussed SonarQube and CVE Binary Tool as inputs to the work described in the paper.

Our paper advocates an application of HSQA. We do not validate a universal security score or establish that static analysis measures every relevant characteristic.

## Model design

When reviewing a proposed model, I would ask:

- **Characteristics and sub-characteristics.** Which aspects of quality and security are relevant to the software and its operating context?
- **Measures.** Which tool outputs represent each characteristic, and what assumptions support those mappings?
- **Coverage.** Which components or characteristics cannot be assessed with the available tools?
- **Aggregation.** How are outputs normalized and combined, and how are overlapping findings handled?
- **Interpretation.** What conclusions are supported by the measurements and the model's assumptions?

Keep the original reports and analysis configuration available when interpreting an aggregate result. Missing measurements should remain distinguishable from favorable observations. I offer these as model-review considerations; this wiki does not implement a scoring formula.

## Related tools

[SonarQube](../../tools/sonarqube/) provides code-analysis findings. [CVE Binary Tool](../../tools/cve-bin-tool/) identifies components and associates them with known vulnerability information. These outputs represent different types of evidence; see [static analysis approaches](../../concepts/static-approaches/).

We discuss PIQUE in the paper. I have not yet added a separately verified catalog entry for it.

## Paper

Emma Sheppard, Zachary Wadhams, Dalton Arford, Clemente Izurieta, and Ann Marie Reinhold. **Wicked Problem, Parsimonious Solution: Securing Electric Vehicle Charging Station Software.** IEEE CSR, 2025, pp. 679-686. [Read the author copy](https://www.cs.montana.edu/izurieta/pubs/Sheppard_CSR_2025.pdf), especially Sections III-V.

Related notes: [comparing SAST tools](../comparing-tools/) and [malware sophistication](../binary-analysis/).
