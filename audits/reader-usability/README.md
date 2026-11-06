# Reader task walkthroughs

Three fresh-context subagents tested common reader tasks on November 6, 2026,
against commit `21d14974c0498960cc2929900a58c1f27b60cd70`. Each started at the
home page without a prescribed tool or the previous audit findings. They used
the visible wiki, its links, and fresh local environments.

The worked examples and result explanations supported useful first results.
The largest gaps were preparing a Windows memory-checking environment and
moving from the examples to a reader's own project or API.

## Results

| Task | Observed result | Remaining difficulty |
| --- | --- | --- |
| [Check a Python project](python.json) | The Ruff/mypy example reported the expected unused import and argument-type error, then both checks were clean after correction. Pylint also ran through its linked official instructions. | Pylint's first steps require external references. Applying the combined recipe to an arbitrary project remains mostly prose. |
| [Test an HTTP API](api.json) | The supplied service reproduced HTTP 500, then HTTP 201 after correction. Schemathesis found the server error and then completed all three operations in the selected scope without a finding. | The guide requires Python 3.12 but uses an unqualified `python` command. The tester used a documented-compatible Python 3.13 recovery. Adapting to another API required external references. |
| [Investigate a memory problem](memory.json) | The reader reached the Windows Dr. Memory route and the ASan example, identified setup requirements, and interpreted the representative error and correction. | No diagnostic ran. Dr. Memory and Clang were unavailable on PATH; exact readiness and compatibility remained unresolved. Local installation was not attempted. |

The Python and API runs used synthetic inputs in fresh local environments.
Their [retained evidence](evidence/) includes commands, versions, input hashes,
findings and corrected outcomes. Pylint's remaining convention messages on the
corrected fixture are expected: that fixture is corrected for the specified
Ruff/mypy checks, not every Pylint rule.

## Recommended next changes

1. **Show how to use the checks on your own project.** Add a short command example
   after each successful demo, identifying the target, configuration, report
   location and scope. Keep the demo wrappers deliberately small.
2. **Complete one Windows memory-checking route.** State a supported environment,
   link exact setup and compatibility guidance, show a readiness check, and run
   a known faulty/corrected example through it.
3. **Align the API Python requirement and commands.** Distinguish the recorded
   runtime from supported versions and show how to check/select the interpreter.
4. **Put Pylint's next action in its start section.** Add direct setup/run links
   and a minimal invocation; link to the existing combined lint/type recipe.
5. **Add a shared get-the-example step.** Include acquisition and working-directory
   instructions. This is a plausible improvement; fresh checkout acquisition
   was not tested in these walkthroughs.

The [coordinator review](coordinator-review.json) checks all eight reported
observations, groups related issues, and records acceptance criteria for these
five proposed changes.

## What to retain

- Home-page task shortcuts and clear tool summaries.
- Small local examples with explicit faulty and corrected modes.
- Separate explanations of findings, setup failure, and a clean selected check.
- Saved commands, versions, outputs and input identities.
- Honest execution labels and limits on what each result establishes.

## Method and limits

These are expert-agent walkthroughs, not a human usability study. They identify
specific obstacles and verify procedures; they do not measure novice completion
times, emotions, or general ease of use. No real project or external API was
scanned, and no full visual, mobile, or accessibility audit was performed.

Both executed routes used an existing repository checkout after following the
site's example link. Python installation and fresh repository acquisition were
not validated. The API result is explicitly a Python 3.13 recovery, not a
reproduction of the recorded Python 3.12 environment. The memory task has no
runtime evidence.

Initial preview startup failures, browser-tool limitations, and an overly
restrictive package-pinning rule were test setup issues. They are excluded from
product findings. The [protocol](protocol.json) records the correction.

Only this audit package was added. Product files and earlier audits are unchanged;
no fixes, commit, or push were performed in this test.
