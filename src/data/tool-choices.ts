// Authored relationships supported by the linked notes and workflow guides.
// These explain choices; they are not rankings or measured coverage claims.
export const toolChoices = [
  {
    tools: ['tools/ruff', 'tools/pylint'],
    title: 'Two Python linting workflows',
    summary: 'Both check Python code for mistakes and conventions. Pylint uses inference and optional plugins; Ruff provides built-in rule families. Check the rules and plugins your project needs before switching.',
    href: 'tools/ruff/#alternatives-and-complements',
    linkText: 'Choose a Python linting workflow',
  },
  {
    tools: ['tools/ruff', 'tools/mypy'],
    title: 'Linting and type checking work together',
    summary: 'Ruff checks lint rules, such as unused imports. mypy checks type consistency, such as passing text where a number is expected. Use both when you want both kinds of checks.',
    href: 'tools/mypy/#where-it-fits',
    linkText: 'See how mypy complements a linter',
  },
  {
    tools: ['tools/ruff', 'tools/pyright'],
    title: 'Linting and type checking work together',
    summary: 'Ruff checks lint rules. Pyright checks types and imports. Choose the checks you need; these tools can complement each other rather than replace one another.',
    href: 'tools/ruff/#alternatives-and-complements',
    linkText: 'Read about complementary Python checks',
  },
  {
    tools: ['tools/address-sanitizer', 'tools/valgrind-memcheck'],
    title: 'Can you rebuild the program?',
    summary: 'AddressSanitizer requires a build with instrumentation. Memcheck instruments an existing executable on supported hosts. Both need you to run the program with useful tests, and their supported platforms and checks differ.',
    href: 'guides/memory-error-detection/',
    linkText: 'Choose a memory-checking workflow',
  },
  {
    tools: ['tools/codeql', 'tools/spotbugs'],
    title: 'Java source database or compiled classes',
    summary: 'CodeQL runs queries against a database extracted from source. SpotBugs checks compiled Java class files for bug patterns. Their preparation and checks differ; a shared finding label does not mean equal coverage.',
    href: 'guides/java-analysis/',
    linkText: 'Compare Java workflows and result types',
  },
  {
    tools: ['tools/codeql', 'tools/jbmc'],
    title: 'Security queries or a stated property',
    summary: 'CodeQL looks for problems described by its queries. JBMC checks Java assertions and properties within configured bounds. Choose based on the question you need to answer and how much modeling you can provide.',
    href: 'guides/java-analysis/',
    linkText: 'Compare Java workflows and result types',
  },
  {
    tools: ['tools/rtamt', 'tools/psy-taliro'],
    title: 'Check a trace or search for a failure',
    summary: 'RTAMT evaluates signals you already have against a requirement. PSY-TaLiRo searches system executions for a violation. A monitor can be part of that search, but does not generate test scenarios by itself.',
    href: 'guides/temporal-monitoring-and-falsification/',
    linkText: 'Choose monitoring or falsification',
  },
];
