---
title: "Coverity Scan"
description: "Use the hosted Coverity Scan service to review defects in eligible registered open-source projects."
tool:
  modes: ["Static"]
  inputTypes: ["Source code"]
  techniques: ["SAST","Data flow analysis","Bug finding"]
  languages: ["C","C++","C#","Java","JavaScript","Ruby","Python"]
  languageNote: "Languages advertised on the Scan homepage. The broader commercial Coverity language list does not establish support in this free service."
  targets: ["Registered open-source projects"]
  findings: ["Memory safety","Logic errors","Concurrency issues"]
  findingNote: "Selected defect classes described by the Scan FAQ. Language, capture, and service configuration affect which checks apply."
  environment: "Hosted analysis/review service with a compatible local build-capture environment. Use the tool package and platform instructions supplied for the registered project."
  setup: "Register an eligible project, obtain its analysis/capture tooling, prepare the build as instructed, and submit it for analysis. This is a hosted upload workflow, not an unrestricted local-only license."
  licenseCategory: "Proprietary"
  license: "Coverity Scan User Agreement and service terms; scanning open-source projects does not make the analyzer open source"
  cost: ["Free with limits"]
  costNote: "Free for approved registered open-source projects. Submission quotas vary with project size. Corporate-maintained projects can require discretionary approval; private commercial code is not covered by general free access."
  editionGroup: "coverity"
  website: "https://scan.coverity.com/"
  verified: "2026-09-21"
  scope: "Coverity Scan service only. Free access, languages, quotas, and data handling follow the Scan terms rather than commercial Coverity entitlements."
  sources:
    - label: "Scan service and advertised languages"
      url: https://scan.coverity.com/
    - label: "Eligibility, setup, findings, and quotas"
      url: https://scan.coverity.com/faq
    - label: "Scan agreement and service policy"
      url: https://scan.coverity.com/policy
    - label: "Commercial alternative"
      url: https://www.blackduck.com/static-analysis-tools-sast/coverity.html
---

## What the free option includes

Scan provides a hosted workflow for approved open-source projects. Account and project registration are part of setup. Its local capture tool prepares analysis input; this does not grant an unrestricted license for scanning any private project.

## Worked example: compare two revisions

**Illustrative workflow, not run here.** Use an eligible project that you maintain:

1. Follow its registered-project capture and submission instructions.
2. Analyze a small revision containing a known defect and record the revision and capture configuration.
3. Review the resulting source location and evidence with an authorized project account.
4. Fix the defect, submit the next revision within the service quota, and compare the findings.

The [commercial Coverity example](../coverity/#worked-example-review-a-c-memory-defect) supplies a small C defect suitable for a controlled evaluation. No project has been registered or uploaded as part of preparing this wiki entry.

## Interpret the result

A difference between revisions can reflect code, configuration, or analyzer changes. Record these separately. A successful submission is not evidence that every intended file was captured.

For broader language requirements or private commercial analysis, consult [commercial Coverity](../coverity/). Keep that product's capabilities separate when comparing free alternatives.
