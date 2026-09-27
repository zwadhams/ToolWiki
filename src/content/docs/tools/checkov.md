---
title: "Checkov"
description: "Review infrastructure configuration against security and policy checks."
tool:
  aliases: []
  searchTerms: ["IaC","infrastructure as code","Terraform security","Kubernetes security","cloud configuration"]
  modes: ["Static"]
  inputTypes: ["Configuration files"]
  techniques: ["Configuration analysis"]
  languages: ["Terraform","Kubernetes/Helm","CloudFormation","Docker"]
  languageNote: "Selected documented infrastructure formats. Additional runners exist; coverage varies by runner and policy."
  targets: ["Infrastructure as code","Cloud infrastructure","Container configuration"]
  findings: ["Security misconfiguration"]
  findingNote: "Reports selected configuration policies. Variables, external modules, skipped checks, and runner selection affect coverage."
  environment: "Compatible Python installation or the documented container installation."
  setup: "Select infrastructure files and runners; supply required variables or modules and review enabled policies."
  license: "Apache-2.0"
  costNote: "Free open-source CLI policy checks in this scope. Prisma Cloud services and features requiring an API key have separate terms."
  website: "https://www.checkov.io/"
  scope: "Local infrastructure-as-code policy checks. Platform services, image scanning, and separate SCA workflows are outside this entry."
  licenseCategory: "Open source"
  cost: ["Free"]
  verified: "2026-09-26"
  sources:
    - label: "Quick start"
      url: https://www.checkov.io/1.Welcome/Quick%20Start.html
    - label: "CLI options and runner scope"
      url: https://www.checkov.io/2.Basics/CLI%20Command%20Reference.html
    - label: "License"
      url: https://raw.githubusercontent.com/bridgecrewio/checkov/main/LICENSE
---

## Where it fits

Checkov adds policy checks for infrastructure definitions to a repository review. Use its configuration findings alongside application and dependency checks.

## Select the runner deliberately

Start with one infrastructure directory and an explicit framework selection. Confirm that external modules and variable values are available before treating the scan as representative of the intended deployment.

## Interpret policy results

Review the check identifier, affected resource, and relevant policy. Keep baseline exceptions and skipped rules visible in review. A passing result reflects the selected policies and available configuration; it is not a live audit of the deployed environment.
