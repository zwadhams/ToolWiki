# Track content reviews

This report compares current content with recorded review digests. It does not
decide whether changed claims are correct or update a profile's review date.
The original [tool review](../tool-review/README.md) remains unchanged.

Generate the current inventory from the repository root:

```sh
node scripts/review-status.mjs --output audits/review-status/current.json
node scripts/review-status.mjs --format markdown --output audits/review-status/current.md
```

The report includes every current documentation page and any other file linked
to a recorded review. It distinguishes unchanged historical content, later
scoped reviews, content changed since its latest review, unlinked content, and
removed files. A later review applies only to its stated scope.

After reviewing a change, append an entry to [reviews.json](reviews.json).
Record the actual review date, reviewer, scope, a repository-relative evidence
reference, and SHA-256 digests of the reviewed files. For example:

```json
{
  "id": "python-recipe-review",
  "date": "2026-11-06",
  "reviewer": "Reviewer name",
  "scope": "Checked setup and result interpretation in the Python recipe.",
  "reference": "audits/remaining-work/reviews/python-recipe.md",
  "files": [
    {
      "path": "src/content/docs/guides/python-checks.md",
      "sha256": "REPLACE_WITH_THE_64_CHARACTER_SHA256_OF_THE_REVIEWED_FILE"
    }
  ]
}
```

Use `Get-FileHash -Algorithm SHA256 PATH` in PowerShell to obtain a digest.
Do not copy the example entry into the ledger until its evidence file exists
and its scope reflects a completed review. Append a new entry when a file is
reviewed again; do not replace old hashes to hide later changes.

This is an informational check. Changed or unlinked content does not fail the
site build. Execution evidence belongs in a [run record](../../src/content/docs/guides/run-record.md),
separate from documentation review.
