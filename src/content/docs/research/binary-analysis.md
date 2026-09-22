---
title: Malware sophistication
description: Software quality characteristics and measurement limitations in static malware analysis.
---

In [Characterizing and Codifying Malware Sophistication](https://www.cs.montana.edu/izurieta/pubs/iETC_Porcella_2026.pdf), we examined how software quality concepts can inform assessments of malware when only compiled artifacts are available.

## Approach

We define sophistication in terms of the specialized knowledge and effort involved in development. We hypothesize that malware quality provides a partial measure of sophistication. We do not yet know how to measure that knowledge and effort directly.

We adapt selected ISO/IEC 25010 characteristics: reliability, security, maintainability, and flexibility. We consider which properties could be investigated through static binary analysis.

## Limitations

Source-dependent metrics may be unavailable, and obfuscation can distort recovered structure. Apparent code complexity therefore requires interpretation. We discuss cwe-checker as a tool that can identify selected reliability-related weaknesses in binaries.

We propose a measurement approach. In the paper, we identify applying it to malware samples and validating the resulting assessments as future work.

## Interpreting findings

When interpreting a binary-analysis report, I would retain the following information:

| Analysis consideration | Information to retain |
| --- | --- |
| Artifact | Binary format, target architecture, and the component being examined. |
| Code recovery | Functions and APIs recovered or modeled, along with failures and unsupported features. |
| Measured property | The reported weakness or structural feature and the method used to identify it. |
| Quality interpretation | The characteristic the observation may inform and the assumptions supporting that connection. |
| Uncertainty | Effects of packing, obfuscation, missing code, and incomplete models. |

Review analysis coverage before interpreting the number of findings. A tool that could not recover relevant code provides limited evidence about that code's quality.

These considerations support interpretation of tool output. I do not present them as a validated sophistication metric.

## Related tools

[cwe-checker](../../tools/cwe-checker/) examines recovered code for weakness patterns. We discuss it in connection with possible reliability measurements. We did not conduct a comparative evaluation of binary analyzers.

We also discuss [Ghidra](../../tools/ghidra/), [capa](../../tools/capa/), and YARA in the context of binary analysis and obfuscation. Ghidra provides recovered code structure, while capa matches features to capability rules. I include [YARA-X](../../tools/yara-x/) as a related successor to YARA; our paper does not evaluate YARA-X. These outputs support different questions and should not be combined into a sophistication score without validation.

[CVE Binary Tool](../../tools/cve-bin-tool/) provides a related workflow based on component identification and advisory matching. I link it here to clarify the distinction between binary-analysis inputs and analysis purpose. We did not evaluate it in the malware paper.

Use the [Binaries filter](../../static/?input=Binaries) and each tool's scope to identify an appropriate workflow.

## Paper

Angelo Porcella, Zachary Wadhams, Clemente Izurieta, Jonathan Crussell, and Ann Marie Reinhold. **Characterizing and Codifying Malware Sophistication.** IEEE I-ETC, 2026. [Read the author copy](https://www.cs.montana.edu/izurieta/pubs/iETC_Porcella_2026.pdf), especially Sections III-V.

Related notes: [static analysis approaches](../../concepts/static-approaches/) and [software quality models](../software-quality/).
