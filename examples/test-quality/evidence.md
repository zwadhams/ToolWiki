# Mutation example execution record

Executed November 6, 2026, on Windows with Node.js 24.22.1, pnpm 11.25.0,
StrykerJS core and Jest runner 9.0.1, and Jest 29.7.0. Both baseline suites
passed before mutation testing. Only `src/discount.js` was mutated, using one
worker and a temporary copy (`inPlace: false`).

| Suite | Baseline | Mutation outcome |
| --- | --- | --- |
| Weak | One test passed | Five Killed, one Survived. The survivor changed `>= 100` to `> 100`. |
| Strong | Two tests passed | Six Killed after adding an assertion that 100 qualifies. |

Both mutation commands returned zero because the tutorial sets the breaking
score threshold to zero. That process status does not mean no mutants survived.
No mutant was timed out, uncovered, ignored, pending, or invalid in these runs.

The [run record](evidence/run.json) contains the commands, versions, source and
configuration hashes, and counts. The sibling JSON reports retain individual
mutants and test attribution. Absolute local paths are normalized to `FIXTURE`;
diagnostic content is unchanged. The report also lists TypeScript visible in
the parent workspace; this JavaScript fixture did not enable a TypeScript checker.

The retained runs use Jest configurations that select only the intended test
file and exclude `.stryker-tmp`, preventing discovery of old temporary copies.
Both baselines and mutation runs were repeated after the fix: one suite each,
one weak test and two strong tests, with the same mutant outcomes.

The initial restricted attempt could not create the dependency link used by the
temporary test directory. It produced a report but left its process running;
that attempt was stopped. The retained reports come from subsequent completed
runs with normal local permissions, after replacing a deprecated file-selection
option with `ignorePatterns`.

The useful result is detection of the boundary behavior. Six killed mutations
do not establish complete test quality or justify a universal 100% target.
