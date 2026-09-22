# Shared edition comparison review

File: src/data/editions.ts. Baseline SHA-256: b7fb55d6a1d6dd01a8af0564ff4364afc75bf42d23eb7a83f574b3b284d3aaef. Reviewed SHA-256: 0bdc090af6725e7dd956fd74b230608a2c70084a96fa37afb86cd4a9effd8884.

Nine groups, 145 field-level records. No exact commercial quote or customer entitlement is independently verified.

## coverity

Evidence: [coverity](records/coverity.md), E1: Coverity product overview; Languages and Frameworks: version 2025.6.0 and later; Scan homepage language list; Scan FAQ: defects, eligibility, registration and submission frequency; Scan policy: Registered Project Use. Accessed 2026-09-22.

| Field | Claim | Verdict |
| --- | --- | --- |
| intro | Commercial Coverity and the free Scan service have separate eligibility and advertised language coverage. Their catalog entries keep those differences filterable. | supported with qualification: applies only to the named edition/use and the cited documentation |
| editions[0].name | Coverity Scan | supported with qualification: applies only to the named edition/use and the cited documentation |
| editions[0].cost | Free with limits | supported with qualification: applies only to the named edition/use and the cited documentation |
| editions[0].difference | Hosted analysis for approved registered open-source projects. Languages follow the Scan service list; submission quotas vary by project size. | supported with qualification: applies only to the named edition/use and the cited documentation |
| editions[0].url | https://scan.coverity.com/faq | supported with qualification: applies only to the named edition/use and the cited documentation |
| editions[0].slug | tools/coverity-scan | supported with qualification: applies only to the named edition/use and the cited documentation |
| editions[1].name | Commercial Coverity | supported with qualification: applies only to the named edition/use and the cited documentation |
| editions[1].cost | Paid; request quote | supported with qualification: applies only to the named edition/use and the cited documentation |
| editions[1].difference | Commercial source-analysis and review workflows, broader advertised language coverage, and deployment options according to the purchased agreement. | supported with qualification: applies only to the named edition/use and the cited documentation |
| editions[1].url | https://www.blackduck.com/static-analysis-tools-sast/coverity.html | supported with qualification: applies only to the named edition/use and the cited documentation |
| editions[1].slug | tools/coverity | supported with qualification: applies only to the named edition/use and the cited documentation |
| note | A publicly visible repository is not by itself proof of Scan eligibility. The service requires registration and acceptance of its terms. | supported with qualification: applies only to the named edition/use and the cited documentation |

## polyspace

Evidence: [polyspace-code-prover](records/polyspace-code-prover.md), E1: Code Prover overview: runtime verification and product comparison; Product Requirements; Getting started; Run-time error review. Accessed 2026-09-22.

| Field | Claim | Verdict |
| --- | --- | --- |
| intro | These are related products with distinct jobs. The catalog entry covers Code Prover; a trial does not count as a permanent free edition. | supported with qualification: applies only to the named edition/use and the cited documentation |
| editions[0].name | Polyspace Bug Finder | supported with qualification: applies only to the named edition/use and the cited documentation |
| editions[0].cost | Paid; confirm entitlements | supported with qualification: applies only to the named edition/use and the cited documentation |
| editions[0].difference | Defect, coding-rule, and code-quality analysis. Listed as a required product for Code Prover. | supported with qualification: applies only to the named edition/use and the cited documentation |
| editions[0].url | https://www.mathworks.com/products/polyspace-bug-finder.html | supported with qualification: applies only to the named edition/use and the cited documentation |
| editions[1].name | Polyspace Code Prover | supported with qualification: applies only to the named edition/use and the cited documentation |
| editions[1].cost | Paid; trial available | supported with qualification: applies only to the named edition/use and the cited documentation |
| editions[1].difference | Desktop verification of selected C/C++ runtime checks, with proof and unproven-result review. | supported with qualification: applies only to the named edition/use and the cited documentation |
| editions[1].url | https://www.mathworks.com/products/polyspace-code-prover.html | supported with qualification: applies only to the named edition/use and the cited documentation |
| editions[1].slug | tools/polyspace-code-prover | supported with qualification: applies only to the named edition/use and the cited documentation |
| editions[2].name | Polyspace Code Prover Server | supported with qualification: applies only to the named edition/use and the cited documentation |
| editions[2].cost | Paid; confirm entitlements | supported with qualification: applies only to the named edition/use and the cited documentation |
| editions[2].difference | Automated analysis for CI/server workflows. Check required products and result-sharing licenses separately. | supported with qualification: applies only to the named edition/use and the cited documentation |
| editions[2].url | https://www.mathworks.com/products/polyspace-code-prover.html | supported with qualification: applies only to the named edition/use and the cited documentation |
| source.label | Required products and platforms | supported with qualification: applies only to the named edition/use and the cited documentation |
| source.url | https://www.mathworks.com/support/requirements/polyspace-code-prover.html | supported with qualification: applies only to the named edition/use and the cited documentation |

## cppcheck

Evidence: [cppcheck](records/cppcheck.md), E1: 2.22.0 manual: project import, preprocessor/platform settings, library configuration, reporting; 2.22.0 COPYING; homepage: checks and standards matrix; Premium: license models. Accessed 2026-09-22.

| Field | Claim | Verdict |
| --- | --- | --- |
| intro | The catalog entry covers the free open-source analyzer. Premium adds capabilities and commercial license options; it is not included in the Free filter result. | supported with qualification: applies only to the named edition/use and the cited documentation |
| editions[0].name | Cppcheck Open Source | supported with qualification: applies only to the named edition/use and the cited documentation |
| editions[0].cost | Free | supported with qualification: applies only to the named edition/use and the cited documentation |
| editions[0].difference | C/C++ defect analysis and documented open-source addons. MISRA coverage is partial; rule texts may need to be supplied separately. | supported with qualification: applies only to the named edition/use and the cited documentation |
| editions[0].url | https://cppcheck.sourceforge.io/ | supported with qualification: applies only to the named edition/use and the cited documentation |
| editions[0].slug | tools/cppcheck | supported with qualification: applies only to the named edition/use and the cited documentation |
| editions[1].name | Premium Business | supported with qualification: applies only to the named edition/use and the cited documentation |
| editions[1].cost | Paid; request quote | supported with qualification: applies only to the named edition/use and the cited documentation |
| editions[1].difference | Additional bug-hunting, coding-standard checks, and reporting. Licensed to an individual computer; the published terms exclude CI, VMs, and containers. | supported with qualification: applies only to the named edition/use and the cited documentation |
| editions[1].url | https://www.cppcheck.com/ | supported with qualification: applies only to the named edition/use and the cited documentation |
| editions[2].name | Premium Enterprise | supported with qualification: applies only to the named edition/use and the cited documentation |
| editions[2].cost | Paid; request quote | supported with qualification: applies only to the named edition/use and the cited documentation |
| editions[2].difference | License sized by lines of code, with CI, VM, and container use and integration support. | supported with qualification: applies only to the named edition/use and the cited documentation |
| editions[2].url | https://www.cppcheck.com/ | supported with qualification: applies only to the named edition/use and the cited documentation |
| editions[3].name | Safety Certified | supported with qualification: applies only to the named edition/use and the cited documentation |
| editions[3].cost | Paid; request quote | supported with qualification: applies only to the named edition/use and the cited documentation |
| editions[3].difference | Adds the vendor's qualification package, certificate, and functional safety manual. Confirm applicability to the intended project and standard. | supported with qualification: applies only to the named edition/use and the cited documentation |
| editions[3].url | https://www.cppcheck.com/ | supported with qualification: applies only to the named edition/use and the cited documentation |

## pvs-studio

Evidence: [pvs-studio](records/pvs-studio.md), E1: Product: languages/platforms, integrations, analysis methods; Documentation index; License comparison; Open-source license: terms and usage rules; Students; Pricing request. Accessed 2026-09-22.

| Field | Claim | Verdict |
| --- | --- | --- |
| intro | PVS-Studio remains proprietary when supplied free under an eligibility program. These are selected licensing routes, not a claim that every route includes every enterprise integration. | supported with qualification: applies only to the named edition/use and the cited documentation |
| editions[0].name | Eligible personal open-source project | supported with qualification: applies only to the named edition/use and the cited documentation |
| editions[0].cost | Free with limits | supported with qualification: applies only to the named edition/use and the cited documentation |
| editions[0].difference | One project per license, issued for a year with possible annual renewal. Excludes commercial or organization-developed projects, mirrors, and forks. Requires README attribution and attribution in fixes found by the tool. | supported with qualification: applies only to the named edition/use and the cited documentation |
| editions[0].url | https://pvs-studio.com/en/order/open-source-license/ | supported with qualification: applies only to the named edition/use and the cited documentation |
| editions[1].name | Students and teachers | supported with qualification: applies only to the named edition/use and the cited documentation |
| editions[1].cost | Temporary educational license | supported with qualification: applies only to the named edition/use and the cited documentation |
| editions[1].difference | Educational and research use for eligible IT students and teachers, requested using an institutional email. Confirm duration and permitted use; this is not general commercial access. | supported with qualification: applies only to the named edition/use and the cited documentation |
| editions[1].url | https://pvs-studio.com/en/order/for-students/ | supported with qualification: applies only to the named edition/use and the cited documentation |
| editions[2].name | Team | supported with qualification: applies only to the named edition/use and the cited documentation |
| editions[2].cost | Paid; request quote | supported with qualification: applies only to the named edition/use and the cited documentation |
| editions[2].difference | For fewer than 10 developers; choose one supported operating system. Includes local and CI analysis, with incremental analysis limited to IDEs. | supported with qualification: applies only to the named edition/use and the cited documentation |
| editions[2].url | https://pvs-studio.com/en/order/license/ | supported with qualification: applies only to the named edition/use and the cited documentation |
| editions[3].name | Enterprise | supported with qualification: applies only to the named edition/use and the cited documentation |
| editions[3].cost | Paid; request quote | supported with qualification: applies only to the named edition/use and the cited documentation |
| editions[3].difference | Broader platform and team coverage, CI incremental analysis, pull/merge-request analysis, and additional integrations and support. Exact terms depend on the purchased license. | supported with qualification: applies only to the named edition/use and the cited documentation |
| editions[3].url | https://pvs-studio.com/en/order/license/ | supported with qualification: applies only to the named edition/use and the cited documentation |
| note | The Free with limits tag is supported by the renewable open-source program. The ordinary evaluation trial is separate and is not counted as a free edition. | supported with qualification: applies only to the named edition/use and the cited documentation |

## phpstan

Evidence: [phpstan](records/phpstan.md), E1: Getting Started; Rule Levels; Baseline; Introducing PHPStan Pro: browser UI, continuous analysis and migration; 2.1.x LICENSE; subscriptions. Accessed 2026-09-22.

| Field | Claim | Verdict |
| --- | --- | --- |
| intro | The core PHP analyzer is free. Pro is an optional workflow add-on; the language and core rule levels in this entry do not require it. | supported with qualification: applies only to the named edition/use and the cited documentation |
| editions[0].name | PHPStan | supported with qualification: applies only to the named edition/use and the cited documentation |
| editions[0].cost | Free | supported with qualification: applies only to the named edition/use and the cited documentation |
| editions[0].difference | Open-source command-line analysis, configurable rule levels, and baseline support. | supported with qualification: applies only to the named edition/use and the cited documentation |
| editions[0].url | https://phpstan.org/ | supported with qualification: applies only to the named edition/use and the cited documentation |
| editions[0].slug | tools/phpstan | supported with qualification: applies only to the named edition/use and the cited documentation |
| editions[1].name | PHPStan Pro | supported with qualification: applies only to the named edition/use and the cited documentation |
| editions[1].cost | Paid subscription | supported with qualification: applies only to the named edition/use and the cited documentation |
| editions[1].difference | Local browser UI for findings, continuous analysis as files change, and migration wizards. A trial is available, but Pro is not a permanent free tier. | supported with qualification: applies only to the named edition/use and the cited documentation |
| editions[1].url | https://phpstan.org/blog/introducing-phpstan-pro | supported with qualification: applies only to the named edition/use and the cited documentation |
| note | Subscription management requires an account; current prices were not verified. The linked introduction contains historical launch pricing. | unresolved: current price not verified behind account access; historical pricing not reused |
| source.label | PHPStan Pro subscriptions | supported with qualification: applies only to the named edition/use and the cited documentation |
| source.url | https://account.phpstan.com/ | supported with qualification: applies only to the named edition/use and the cited documentation |

## codeql

Evidence: [codeql](records/codeql.md), E1: Supported languages and frameworks: Languages and compilers; About CodeQL; CLI setup; query-help language indexes; CLI License: Use Rights and Restrictions. Accessed 2026-09-22.

| Field | Claim | Verdict |
| --- | --- | --- |
| intro | CodeQL has different usage entitlements, rather than separate free and paid scanner engines. | supported with qualification: applies only to the named edition/use and the cited documentation |
| editions[0].name | Public repositories | supported with qualification: applies only to the named edition/use and the cited documentation |
| editions[0].cost | Free under terms | supported with qualification: applies only to the named edition/use and the cited documentation |
| editions[0].difference | CodeQL analysis for public repositories. Open-source and automation conditions are defined in the CLI terms. | supported with qualification: applies only to the named edition/use and the cited documentation |
| editions[0].url | https://docs.github.com/en/code-security/concepts/code-scanning/codeql/codeql-cli | supported with qualification: applies only to the named edition/use and the cited documentation |
| editions[1].name | Academic research and other eligible uses | supported with qualification: applies only to the named edition/use and the cited documentation |
| editions[1].cost | Free under terms | supported with qualification: applies only to the named edition/use and the cited documentation |
| editions[1].difference | The CLI terms cover academic research and specified open-source uses. Eligibility is not blanket permission for private commercial scanning. | supported with qualification: applies only to the named edition/use and the cited documentation |
| editions[1].url | https://github.com/github/codeql-cli-binaries/blob/main/LICENSE.md | supported with qualification: applies only to the named edition/use and the cited documentation |
| editions[2].name | Private organization repositories | supported with qualification: applies only to the named edition/use and the cited documentation |
| editions[2].cost | Paid | supported with qualification: applies only to the named edition/use and the cited documentation |
| editions[2].difference | Standard private-repository scanning requires GitHub Code Security on an eligible GitHub plan. The main distinction is permitted use, not a reduced free language list. | supported with qualification: applies only to the named edition/use and the cited documentation |
| editions[2].url | https://docs.github.com/en/code-security/concepts/code-scanning/codeql/codeql-cli | supported with qualification: applies only to the named edition/use and the cited documentation |

## sonarqube

Evidence: [sonarqube](records/sonarqube.md), E1: Language overview: edition matrix and language-specific links; Scanner general requirements; Server overview; Plans and pricing; Open Source Editions FAQ. Accessed 2026-09-22.

| Field | Claim | Verdict |
| --- | --- | --- |
| intro | Community Build is a free self-managed product. Commercial Server editions have broader capabilities; check language support for the specific edition. | supported with qualification: applies only to the named edition/use and the cited documentation |
| editions[0].name | Community Build | supported with qualification: applies only to the named edition/use and the cited documentation |
| editions[0].cost | Free | supported with qualification: applies only to the named edition/use and the cited documentation |
| editions[0].difference | Self-managed code quality and security checks for its supported languages. The support matrix does not include C, C++, Objective-C, or Swift in Community Build. | supported with qualification: applies only to the named edition/use and the cited documentation |
| editions[0].url | https://docs.sonarsource.com/sonarqube-community-build/analyzing-source-code/languages/overview | supported with qualification: applies only to the named edition/use and the cited documentation |
| editions[0].slug | tools/sonarqube-community | supported with qualification: applies only to the named edition/use and the cited documentation |
| editions[1].name | Server Developer | supported with qualification: applies only to the named edition/use and the cited documentation |
| editions[1].cost | Paid | supported with qualification: applies only to the named edition/use and the cited documentation |
| editions[1].difference | Adds broader language coverage, including C/C++ and Swift, plus commercial analysis capabilities. Subscription is priced per instance and year by lines of code. | supported with qualification: applies only to the named edition/use and the cited documentation |
| editions[1].url | https://www.sonarsource.com/plans-and-pricing/sonarqube/ | supported with qualification: applies only to the named edition/use and the cited documentation |
| editions[1].slug | tools/sonarqube | supported with qualification: applies only to the named edition/use and the cited documentation |
| editions[2].name | Server Enterprise | supported with qualification: applies only to the named edition/use and the cited documentation |
| editions[2].cost | Paid | supported with qualification: applies only to the named edition/use and the cited documentation |
| editions[2].difference | Adds more enterprise languages and project-level oversight, with additional reporting and support options. | supported with qualification: applies only to the named edition/use and the cited documentation |
| editions[2].url | https://www.sonarsource.com/plans-and-pricing/sonarqube/ | supported with qualification: applies only to the named edition/use and the cited documentation |
| editions[3].name | Server Data Center | supported with qualification: applies only to the named edition/use and the cited documentation |
| editions[3].cost | Paid | supported with qualification: applies only to the named edition/use and the cited documentation |
| editions[3].difference | Adds redundancy, resilience, and horizontal scaling for larger deployments. | supported with qualification: applies only to the named edition/use and the cited documentation |
| editions[3].url | https://www.sonarsource.com/plans-and-pricing/sonarqube/ | supported with qualification: applies only to the named edition/use and the cited documentation |
| note | Other free offerings: SonarQube for IDE, and SonarQube Cloud for open-source projects. Cloud also has a Free plan for private projects up to 50,000 lines of code; it is a separate hosted product. | supported with qualification: applies only to the named edition/use and the cited documentation |
| source.label | Sonar free offerings and eligibility | supported with qualification: applies only to the named edition/use and the cited documentation |
| source.url | https://www.sonarsource.com/open-source-editions/ | supported with qualification: applies only to the named edition/use and the cited documentation |

## semgrep

Evidence: [semgrep-ce](records/semgrep-ce.md), E1: CE language matrix: Semgrep Code and CE; product language matrix; Prerequisites; Pricing: Compare Plans and FAQ; CE philosophy: Single-file analysis; repository License. Accessed 2026-09-22.

| Field | Claim | Verdict |
| --- | --- | --- |
| intro | The local Community Edition engine and the hosted Free Edition are different offerings. Advanced analysis is also available on the hosted free plan within its limits. | supported with qualification: applies only to the named edition/use and the cited documentation |
| editions[0].name | Semgrep CE | supported with qualification: applies only to the named edition/use and the cited documentation |
| editions[0].cost | Free | supported with qualification: applies only to the named edition/use and the cited documentation |
| editions[0].difference | Open-source local engine and custom rules, with data flow analysis limited to a single function. Platform contributor limits do not describe the standalone CE engine. | supported with qualification: applies only to the named edition/use and the cited documentation |
| editions[0].url | https://docs.semgrep.dev/semgrep-ce-languages | supported with qualification: applies only to the named edition/use and the cited documentation |
| editions[0].slug | tools/semgrep-ce | supported with qualification: applies only to the named edition/use and the cited documentation |
| editions[1].name | Semgrep Code - Free Edition | supported with qualification: applies only to the named edition/use and the cited documentation |
| editions[1].cost | Free with limits | supported with qualification: applies only to the named edition/use and the cited documentation |
| editions[1].difference | Pro rules and cross-file analysis; maximum 10 contributors and 10 private repositories. Public projects have separate limits. An account is required. | supported with qualification: applies only to the named edition/use and the cited documentation |
| editions[1].url | https://semgrep.dev/pricing/ | supported with qualification: applies only to the named edition/use and the cited documentation |
| editions[1].slug | tools/semgrep-code | supported with qualification: applies only to the named edition/use and the cited documentation |
| editions[2].name | Semgrep Code - Teams | supported with qualification: applies only to the named edition/use and the cited documentation |
| editions[2].cost | Paid | supported with qualification: applies only to the named edition/use and the cited documentation |
| editions[2].difference | Per-contributor subscription for larger teams, with SSO and support. The Code, Supply Chain, and Secrets products are priced separately. | supported with qualification: applies only to the named edition/use and the cited documentation |
| editions[2].url | https://semgrep.dev/pricing/ | supported with qualification: applies only to the named edition/use and the cited documentation |
| editions[3].name | Enterprise | supported with qualification: applies only to the named edition/use and the cited documentation |
| editions[3].cost | Paid; contact sales | supported with qualification: applies only to the named edition/use and the cited documentation |
| editions[3].difference | Adds enterprise deployment options, on-premises source control support, and tailored support. | supported with qualification: applies only to the named edition/use and the cited documentation |
| editions[3].url | https://semgrep.dev/pricing/ | supported with qualification: applies only to the named edition/use and the cited documentation |
| note | The vendor counts contributors using recent repository activity, not just purchased seats. Check current contributor definitions, repository limits, and included AI credits before choosing a plan. | supported with qualification: applies only to the named edition/use and the cited documentation |
| source.label | Semgrep usage and billing | supported with qualification: applies only to the named edition/use and the cited documentation |
| source.url | https://docs.semgrep.dev/usage-and-billing/overview | supported with qualification: applies only to the named edition/use and the cited documentation |

## burp

Evidence: [burp-suite-professional](records/burp-suite-professional.md), E1: Community download: edition comparison; System requirements: OS and embedded browser; Burp Scanner: crawling and auditing; Professional overview. Accessed 2026-09-22.

| Field | Claim | Verdict |
| --- | --- | --- |
| intro | Community Edition is permanently free. A Professional trial is time-limited and does not make Professional a free edition. | supported with qualification: applies only to the named edition/use and the cited documentation |
| editions[0].name | Community Edition | supported with qualification: applies only to the named edition/use and the cited documentation |
| editions[0].cost | Free | supported with qualification: applies only to the named edition/use and the cited documentation |
| editions[0].difference | Manual proxy and history, Repeater, Decoder, Sequencer, and Comparer. No automated Burp Scanner; Intruder is limited. | supported with qualification: applies only to the named edition/use and the cited documentation |
| editions[0].url | https://portswigger.net/burp/communitydownload | supported with qualification: applies only to the named edition/use and the cited documentation |
| editions[0].slug | tools/burp-suite-community | supported with qualification: applies only to the named edition/use and the cited documentation |
| editions[1].name | Professional | supported with qualification: applies only to the named edition/use and the cited documentation |
| editions[1].cost | Paid | supported with qualification: applies only to the named edition/use and the cited documentation |
| editions[1].difference | Adds automated vulnerability scanning, crawling, project saving, the full Intruder, Collaborator, and Pro extensions. | supported with qualification: applies only to the named edition/use and the cited documentation |
| editions[1].url | https://portswigger.net/burp/communitydownload | supported with qualification: applies only to the named edition/use and the cited documentation |
| editions[1].slug | tools/burp-suite-professional | supported with qualification: applies only to the named edition/use and the cited documentation |
