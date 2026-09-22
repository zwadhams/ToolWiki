---
title: "Coverity (commercial)"
description: "Analyze source code for quality and security defects with commercial Coverity analysis and review workflows."
tool:
  modes: ["Static"]
  inputTypes: ["Source code"]
  techniques: ["SAST","Data flow analysis","Bug finding"]
  languages: ["C","C++","C#","Java","JavaScript","TypeScript","Python","Go","Ruby","PHP","Kotlin","Scala","Swift","Objective-C","Fortran","Dart","Apex","JSP","VB.NET","CUDA"]
  languageNote: "Selected languages from the vendor's commercial support page. Checker, compiler, and framework coverage varies by language and release. This list must not be applied to the free Scan service."
  targets: ["Source code","Embedded software"]
  findings: ["Injection risks","Memory safety","Logic errors","Concurrency issues"]
  findingNote: "Selected defect classes across supported languages. Findings depend on enabled checkers, captured code, and models; not every class applies to every language."
  environment: "Commercial capture, analysis, and review tooling with self-managed deployment options. Verify the release-specific OS/compiler matrix; the public overview does not establish every supported host combination."
  setup: "Configure the licensed product and capture or prepare the source project using the appropriate language workflow. Compiled-language analysis needs accurate compiler options and dependencies; no runtime test harness is required."
  licenseCategory: "Proprietary"
  license: "Commercial Black Duck license; deployment and entitlement terms depend on the agreement"
  cost: ["Paid"]
  costNote: "Commercial pricing is by quote. The separately listed Coverity Scan service offers eligible open-source projects free access under its own language scope and submission limits; it is not unrestricted free commercial Coverity."
  editionGroup: "coverity"
  website: "https://www.blackduck.com/static-analysis-tools-sast/coverity.html"
  verified: "2026-09-22"
  scope: "Commercial Coverity source analysis using public vendor documentation. Private release documentation, exact host support, purchased entitlements, and pricing were not independently verified."
  sources:
    - label: "Commercial capabilities, deployment, and quote model"
      url: https://www.blackduck.com/static-analysis-tools-sast/coverity.html
    - label: "Commercial language and framework coverage"
      url: https://www.blackduck.com/static-analysis-tools-sast/languages-and-frameworks.html
    - label: "Free Scan eligibility and submission limits"
      url: https://scan.coverity.com/faq
---

## When to use it

Evaluate Coverity when you need source analysis across a mixed-language codebase and a managed review process. Establish the actual languages, compiler versions, and defect classes you want to compare before using an overall issue count as a metric.

## Worked example: review a C memory defect

**Illustrative evaluation, not run here.** In a small C project, add this function to a file included in its build:

```c
#include <stdlib.h>
void release_twice(void) {
    int *item = malloc(sizeof(*item));
    if (!item) return;
    free(item);
    free(item);
}
```

With an authorized Coverity installation:

1. Configure the C compiler and project using the installed release's instructions.
2. Capture the build and confirm the file was included.
3. Run analysis with the relevant memory checkers enabled.
4. Review any duplicate-release finding and its event path.
5. Remove the second release and compare the results.

This is an evaluation recipe, not a transcript from a licensed run. Commands and server setup depend on the installed product version.

## Commercial versus Scan

[Coverity Scan](../coverity-scan/) has separate eligibility, listed languages, and submission limits. Use that entry when filtering for a free option.

A clean commercial scan still needs evidence that the intended code and configuration were analyzed. For C/C++ verification claims, also compare [Polyspace Code Prover](../polyspace-code-prover/) and [Frama-C](../frama-c/).
