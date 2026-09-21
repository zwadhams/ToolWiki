---
title: "Brakeman"
description: "Check Ruby on Rails source for security weaknesses using Rails-specific analysis."
tool:
  modes: ["Static"]
  inputTypes: ["Source code"]
  techniques: ["SAST","Data flow analysis"]
  languages: ["Ruby"]
  languageNote: "Rails applications, including their controllers, models, templates, and configuration. This is not a general-purpose scanner for every Ruby framework."
  targets: ["Ruby on Rails applications"]
  findings: ["Injection risks","Unsafe API use","Security misconfiguration"]
  findingNote: "Warnings depend on recognized Rails behavior and enabled checks. Confidence levels guide review; a warning does not establish that a deployed endpoint is exploitable."
  environment: "Ruby gem on a compatible Ruby host, with an official Docker route. Check the current gem's Ruby requirement and platform dependencies."
  setup: "Provide the Rails application source and choose the project directory. A running Rails server, test harness, or deployed URL is not required."
  licenseCategory: "Source available"
  license: "Brakeman Public Use License for the current distribution; older contributions retain MIT terms"
  cost: ["Free with limits","Paid"]
  costNote: "The license allows analyzing your own software without charge. Defined commercial uses such as providing a managed scanning service or incorporating the scanner into a commercial product require a separate license. These are use rights, not detection tiers."
  website: "https://brakemanscanner.org/"
  verified: "2026-09-21"
  scope: "Current Brakeman Rails scanner and Public Use License. The repository's older MIT file does not describe the entire current distribution."
  sources:
    - label: "Rails-specific purpose and findings"
      url: https://brakemanscanner.org/
    - label: "Installation"
      url: https://brakemanscanner.org/docs/install/
    - label: "Options and report configuration"
      url: https://brakemanscanner.org/docs/options/
    - label: "Current distribution licensing"
      url: https://github.com/presidentbeef/brakeman/blob/main/COPYING.md
    - label: "Public Use License and free-use boundaries"
      url: https://github.com/presidentbeef/brakeman/blob/main/LICENSE.md
---

## When to use it

Choose Brakeman when you have a Rails codebase and want checks that understand Rails conventions. General Ruby syntax support in another analyzer does not establish equivalent knowledge of Rails data flow.

## Worked example: review a Rails project

**Illustrative workflow, not run here.** Install the current compatible gem, then run from the root of a Rails project you can review:

```sh
gem install brakeman
brakeman -o brakeman-report.html
```

Open the report and inspect the warning's location, confidence, and evidence. For a concrete exercise, review a controller that incorporates request data into a SQL string. Compare it with the corresponding parameterized query and re-run the scanner. Exact warnings depend on Rails version and the surrounding code.

## Free use and commercial use

The license explicitly treats scanning the licensee's own software as a permitted free use. Its defined commercial uses include offering a scanning service and distributing the scanner in a commercial product. Read the linked terms for your workflow.

Source availability does not make this an unrestricted open-source license. The catalog therefore uses Source available and Free with limits.

## What a result means

A source warning is a review lead. It does not show that authentication, routing, or deployed configuration makes the path reachable. Conversely, an unrecognized pattern can escape a check.

Combine source review with [ZAP](../zap/) or another suitable runtime test when you need evidence about a running Rails application.

## Related research

**Used in a study:** The [OCPP paper](https://www.cs.montana.edu/izurieta/pubs/CSR_2026_Wadhams.pdf) lists Brakeman as its Ruby analyzer. That historical selection does not broaden Brakeman's documented Rails scope to arbitrary Ruby applications.

Read [comparing SAST tools](../../research/comparing-tools/) for the study's limitations. For a new evaluation, verify that the application's framework matches the tool before interpreting its report.
