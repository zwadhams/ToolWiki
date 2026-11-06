---
title: TypeScript compiler (tsc)
description: Check a configured TypeScript project for type errors without emitting JavaScript.
tool:
  aliases: [tsc, TypeScript]
  searchTerms: [TypeScript type checker, compiler diagnostics, noEmit, checkJs]
  decision:
    useWhen: Check types across a configured TypeScript project, alongside any lint rules and runtime tests.
    result: Compiler diagnostics with a file, location, diagnostic code, and explanation of a type inconsistency.
    limit: Included files, compiler options, declarations, any, and suppressions affect the result. Types do not validate arbitrary runtime data.
  analysisWorkflows:
    - id: typescript-no-emit
      label: TypeScript project type checking
      subject: component
      inputs: [Source code]
      languageScope: source
      languages: [TypeScript]
      findings: [Type errors]
      hostPlatforms: [Windows]
      caveat: TypeScript 6.0.3 with Node.js 24 on Windows, using an explicit tsconfig and noEmit. Check project inclusion, declarations, and compiler options. JavaScript checkJs and framework-file tooling are not part of this matching workflow.
      sources:
        - https://www.typescriptlang.org/docs/handbook/compiler-options
        - https://www.typescriptlang.org/tsconfig/noEmit.html
        - https://raw.githubusercontent.com/microsoft/TypeScript/v6.0.3/package.json
  modes: [Static]
  inputTypes: [Source code]
  techniques: [Type checking]
  languages: [TypeScript, JavaScript]
  languageNote: The first workflow checks plain TypeScript. JavaScript checking requires allowJs and checkJs or per-file opt-in; framework-specific files need separate tooling.
  targets: [TypeScript projects, JavaScript with checking enabled]
  findings: [Type errors]
  findingNote: Compiler diagnostics from the selected project and checking options. A clean result does not establish runtime correctness.
  environment: TypeScript 6.0.3 installed in a Node.js environment. The included fixture was checked on Windows with Node.js 24.22.1.
  setup: Install the pinned compiler, provide tsconfig.json and required declarations, and use tsc --project with noEmit. The target is not executed.
  licenseCategory: Open source
  license: Apache-2.0
  cost: [Free]
  costNote: Free open-source compiler; editor and build-service products are separate.
  website: https://www.typescriptlang.org/
  verified: '2026-11-06'
  scope: Project type checking with tsc 6.0.3. JavaScript checking is qualified separately; transpiler, bundler, and framework-specific behavior is outside the first workflow.
  sources:
    - label: Compiler diagnostics and type limitations
      url: https://www.typescriptlang.org/docs/handbook/2/basic-types.html
    - label: Project invocation and compiler options
      url: https://www.typescriptlang.org/docs/handbook/compiler-options
    - label: Disable emitted output
      url: https://www.typescriptlang.org/tsconfig/noEmit.html
    - label: JavaScript checking
      url: https://www.typescriptlang.org/tsconfig/checkJs.html
    - label: Version, Node.js prerequisite, and license
      url: https://raw.githubusercontent.com/microsoft/TypeScript/v6.0.3/package.json
    - label: Compiler versus TypeScript lint rules
      url: https://typescript-eslint.io/troubleshooting/faqs/eslint/
---

## First try

**Executed on Windows with TypeScript 6.0.3 and Node.js 24.22.1.** The faulty fixture produced `TS2345`; the corrected fixture completed without diagnostics. Neither emitted JavaScript or ran the target.

Use the repository's [`examples/typescript-check`](https://github.com/zwadhams/ToolWiki/tree/main/examples/typescript-check) directory. Its shared configuration enables `strict` and `noEmit`; separate project files select the faulty and corrected source. Install the pinned compiler from that directory:

```sh
npm install
npm run check:bad
```

The faulty file passes a number to a string parameter:

```ts
function greet(name: string): string {
  return name.toUpperCase();
}

greet(42);
```

The expected diagnostic is `TS2345` at the call: a number cannot be assigned to the string parameter. The fixed version calls `greet("Ada")`. Check it with the same options:

```sh
npm run check:good
```

The scripts use `tsc --project tsconfig.bad.json` or `tsconfig.good.json`. Preserve that project invocation: passing source filenames directly is a different invocation and does not apply the project's configuration in the same way. Use `tsc --showConfig --project tsconfig.good.json` to inspect the effective options.

## JavaScript needs explicit checking

For JavaScript, include the intended `.js` files and enable both `allowJs` and `checkJs`, or use the documented per-file opt-in. JSDoc and declaration files affect the available type information. This qualification is separate from the TypeScript matching workflow; a JavaScript language tag alone does not establish that checking is enabled.

## Use it with ESLint

[ESLint](../eslint/) applies selected coding rules. Its TypeScript integration can use type information, but it does not replace the compiler's type-checking pass. Run each for its own diagnostics and retain separate reports. Use runtime tests and input validation for behavior and data that static types cannot establish.

When adapting the fixture, choose the actual project files, module settings, library declarations, and strictness. Check exclusions and suppressions before interpreting a clean result. Keep versions and the configuration with the [run record](../../guides/run-record/).
