type Edition = { name: string; cost: string; difference: string; url: string; slug?: string };
type Comparison = { intro: string; editions: Edition[]; note?: string; source?: { label: string; url: string } };

export const editionComparisons: Record<string, Comparison> = {
  cppcheck: {
    intro: 'The catalog entry covers the free open-source analyzer. Premium adds capabilities and commercial license options; it is not included in the Free filter result.',
    editions: [
      { name: 'Cppcheck Open Source', cost: 'Free', difference: 'C/C++ defect analysis and documented open-source addons. MISRA coverage is partial; rule texts may need to be supplied separately.', url: 'https://cppcheck.sourceforge.io/', slug: 'tools/cppcheck' },
      { name: 'Premium Business', cost: 'Paid; request quote', difference: 'Additional bug-hunting, coding-standard checks, and reporting. Licensed to an individual computer; the published terms exclude CI, VMs, and containers.', url: 'https://www.cppcheck.com/' },
      { name: 'Premium Enterprise', cost: 'Paid; request quote', difference: 'License sized by lines of code, with CI, VM, and container use and integration support.', url: 'https://www.cppcheck.com/' },
      { name: 'Safety Certified', cost: 'Paid; request quote', difference: 'Adds the vendor\'s qualification package, certificate, and functional safety manual. Confirm applicability to the intended project and standard.', url: 'https://www.cppcheck.com/' },
    ],
  },
  'pvs-studio': {
    intro: 'PVS-Studio remains proprietary when supplied free under an eligibility program. These are selected licensing routes, not a claim that every route includes every enterprise integration.',
    editions: [
      { name: 'Eligible personal open-source project', cost: 'Free with limits', difference: 'One project per license, issued for a year with possible annual renewal. Excludes commercial or organization-developed projects, mirrors, and forks. Requires README attribution and attribution in fixes found by the tool.', url: 'https://pvs-studio.com/en/order/open-source-license/' },
      { name: 'Students and teachers', cost: 'Temporary educational license', difference: 'Educational and research use for eligible IT students and teachers, requested using an institutional email. Confirm duration and permitted use; this is not general commercial access.', url: 'https://pvs-studio.com/en/order/for-students/' },
      { name: 'Team', cost: 'Paid; request quote', difference: 'For fewer than 10 developers; choose one supported operating system. Includes local and CI analysis, with incremental analysis limited to IDEs.', url: 'https://pvs-studio.com/en/order/license/' },
      { name: 'Enterprise', cost: 'Paid; request quote', difference: 'Broader platform and team coverage, CI incremental analysis, pull/merge-request analysis, and additional integrations and support. Exact terms depend on the purchased license.', url: 'https://pvs-studio.com/en/order/license/' },
    ],
    note: 'The Free with limits tag is supported by the renewable open-source program. The ordinary evaluation trial is separate and is not counted as a free edition.',
  },
  phpstan: {
    intro: 'The core PHP analyzer is free. Pro is an optional workflow add-on; the language and core rule levels in this entry do not require it.',
    editions: [
      { name: 'PHPStan', cost: 'Free', difference: 'Open-source command-line analysis, configurable rule levels, and baseline support.', url: 'https://phpstan.org/', slug: 'tools/phpstan' },
      { name: 'PHPStan Pro', cost: 'Paid subscription', difference: 'Local browser UI for findings, continuous analysis as files change, and migration wizards. A trial is available, but Pro is not a permanent free tier.', url: 'https://phpstan.org/blog/introducing-phpstan-pro' },
    ],
    note: 'See the current subscription page for prices; the linked introduction also contains historical launch pricing.',
    source: { label: 'PHPStan Pro subscriptions', url: 'https://account.phpstan.com/' },
  },
  codeql: {
    intro: 'CodeQL has different usage entitlements, rather than separate free and paid scanner engines.',
    editions: [
      { name: 'Public repositories', cost: 'Free under terms', difference: 'CodeQL analysis for public repositories. Open-source and automation conditions are defined in the CLI terms.', url: 'https://docs.github.com/en/code-security/concepts/code-scanning/codeql/codeql-cli' },
      { name: 'Academic research and other eligible uses', cost: 'Free under terms', difference: 'The CLI terms cover academic research and specified open-source uses. Eligibility is not blanket permission for private commercial scanning.', url: 'https://github.com/github/codeql-cli-binaries/blob/main/LICENSE.md' },
      { name: 'Private organization repositories', cost: 'Paid', difference: 'Standard private-repository scanning requires GitHub Code Security on an eligible GitHub plan. The main distinction is permitted use, not a reduced free language list.', url: 'https://docs.github.com/en/code-security/concepts/code-scanning/codeql/codeql-cli' },
    ],
  },
  sonarqube: {
    intro: 'Community Build is a free self-managed product. Commercial Server editions have broader capabilities; check language support for the specific edition.',
    editions: [
      { name: 'Community Build', cost: 'Free', difference: 'Self-managed code quality and security checks for its supported languages. The support matrix does not include C, C++, Objective-C, or Swift in Community Build.', url: 'https://docs.sonarsource.com/sonarqube-community-build/analyzing-source-code/languages/overview', slug: 'tools/sonarqube-community' },
      { name: 'Server Developer', cost: 'Paid', difference: 'Adds broader language coverage, including C/C++ and Swift, plus commercial analysis capabilities. Subscription is priced per instance and year by lines of code.', url: 'https://www.sonarsource.com/plans-and-pricing/sonarqube/', slug: 'tools/sonarqube' },
      { name: 'Server Enterprise', cost: 'Paid', difference: 'Adds more enterprise languages and project-level oversight, with additional reporting and support options.', url: 'https://www.sonarsource.com/plans-and-pricing/sonarqube/' },
      { name: 'Server Data Center', cost: 'Paid', difference: 'Adds redundancy, resilience, and horizontal scaling for larger deployments.', url: 'https://www.sonarsource.com/plans-and-pricing/sonarqube/' },
    ],
    note: 'Other free offerings: SonarQube for IDE, and SonarQube Cloud for open-source projects. Cloud also has a Free plan for private projects up to 50,000 lines of code; it is a separate hosted product.',
    source: { label: 'Sonar free offerings and eligibility', url: 'https://www.sonarsource.com/open-source-editions/' },
  },
  semgrep: {
    intro: 'The local Community Edition engine and the hosted Free Edition are different offerings. Advanced analysis is also available on the hosted free plan within its limits.',
    editions: [
      { name: 'Semgrep CE', cost: 'Free', difference: 'Open-source local engine, custom rules, and supported local analysis. Platform contributor limits do not describe the standalone CE engine.', url: 'https://github.com/semgrep/semgrep', slug: 'tools/semgrep-ce' },
      { name: 'Semgrep Code - Free Edition', cost: 'Free with limits', difference: 'Pro rules and cross-file analysis; maximum 10 contributors and 10 private repositories. Public projects have separate limits. An account is required.', url: 'https://semgrep.dev/pricing/', slug: 'tools/semgrep-code' },
      { name: 'Semgrep Code - Teams', cost: 'Paid', difference: 'Per-contributor subscription for larger teams, with SSO and support. The Code, Supply Chain, and Secrets products are priced separately.', url: 'https://semgrep.dev/pricing/' },
      { name: 'Enterprise', cost: 'Paid; contact sales', difference: 'Adds enterprise deployment options, on-premises source control support, and tailored support.', url: 'https://semgrep.dev/pricing/' },
    ],
    note: 'The vendor counts contributors using recent repository activity, not just purchased seats. Check current contributor definitions, repository limits, and included AI credits before choosing a plan.',
    source: { label: 'Semgrep usage and billing', url: 'https://docs.semgrep.dev/usage-and-billing/overview' },
  },
  burp: {
    intro: 'Community Edition is permanently free. A Professional trial is time-limited and does not make Professional a free edition.',
    editions: [
      { name: 'Community Edition', cost: 'Free', difference: 'Manual proxy and history, Repeater, Decoder, Sequencer, and Comparer. No automated Burp Scanner; Intruder is limited.', url: 'https://portswigger.net/burp/communitydownload', slug: 'tools/burp-suite-community' },
      { name: 'Professional', cost: 'Paid', difference: 'Adds automated vulnerability scanning, crawling, project saving, the full Intruder, Collaborator, and Pro extensions.', url: 'https://portswigger.net/burp/communitydownload', slug: 'tools/burp-suite-professional' },
    ],
  },
};
