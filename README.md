# Software Analysis Wiki

A personal reference for static and dynamic analysis tools, built with Astro and
Starlight. Browse by findings, input type, language, technique, license, and cost. Each tool
has a Markdown page with sources, scope limitations, and a verification date.

## Preview the wiki

On this Windows computer, double-click **Preview.cmd** after dependencies are
installed. It opens the live preview at
[Software Analysis Wiki preview](http://127.0.0.1:4321/ToolWiki/). Saving a content or style file
updates the page automatically. The launcher reuses a running preview and does
not publish or commit changes. Use **Stop preview.cmd** when finished.

The catalog search and filters work in the live preview. Starlight's full-site
search index is generated during a production build; use the production preview
below to check that search experience.

## Set up another computer

Install Node.js 24 LTS and pnpm 11.19.0, then install the locked dependencies:

```sh
pnpm install --frozen-lockfile
pnpm dev
```

Open the local URL with `/ToolWiki/` at the end. To use the background preview
launcher from a terminal, run:

```sh
node scripts/preview.mjs
```

## Edit content and styling

- Tool entries: `src/content/docs/tools/`, one Markdown file per tool.
- Concept guides: `src/content/docs/concepts/`.
- Colors, spacing, and catalog appearance: `src/styles/custom.css`.
- Shared comparisons of free and paid editions: `src/data/editions.ts`.
- Navigation and GitHub Pages address: `astro.config.mjs`.

Read the [editing guide](src/content/docs/guides/editing.md) before adding entries.
New tools populate the catalog and sidebar automatically. Keep language tags
scoped to verified support; a language match does not promise every framework or
version is supported. Starter entries are documentation reviews, not benchmarks.

The Input type filter separates source code, binaries, dependency metadata, container images,
running applications, callable code, executable models, and execution traces. Tools can accept
multiple input types. Combine a language with Source code when looking for a
source analyzer; dependency ecosystem support does not imply source analysis.
Software context such as firmware or HTTP APIs stays in the tool notes and is
searchable in the catalog, rather than appearing as a separate filter.

Use What can it find? for finding categories. Select Compare on two or three
catalog cards, or open Compare tools to choose directly. Selection survives
catalog filtering and category links; comparison URLs can be bookmarked or
shared. The table uses the same Markdown metadata as the tool profiles.

Cost is separate from open-source licensing. `Free with limits` covers continuing
free access with usage or eligibility conditions. Trials do not count as free
editions. Where capabilities differ, editions have their own catalog entries so
cost and language filters cannot combine features from different editions.

The workflow guides compare Java source/bytecode analysis, memory-error detection,
and temporal monitoring versus falsification. New worked examples are explicitly
labeled when they have not been executed. `Source available` distinguishes licenses
with use restrictions from open-source licenses; Coverity Scan and commercial
Coverity have separate catalog entries.

## Verify changes

Run the metadata and type checks, filter tests, production build, and generated
link checks:

```sh
pnpm verify
```

To inspect the production output, including full-site search:

```sh
pnpm preview
```

Open [production preview](http://127.0.0.1:4322/ToolWiki/). This view does not update
until you rebuild; use **Preview.cmd** for style iteration.

## Publish on GitHub Pages

The repository is configured for `https://zwadhams.github.io/ToolWiki/`.
Publication requires repository administration access and a commit on `main`.

1. Review, commit, and push the project files to `main` yourself.
2. In the repository, open **Settings > Pages** and set **Source** to
   **GitHub Actions**.
3. Open **Actions > Publish Tool Wiki > Run workflow** if the initial push ran
   before Pages was enabled.
4. Wait for the build and deployment jobs to succeed, then visit the published
   URL shown by the deployment.

Later pushes to `main` build and publish automatically. Pull requests run the
same validation without deploying. The workflow does not create commits.
Local validation does not prove that the GitHub deployment has run successfully.

See [Astro's GitHub Pages guide](https://docs.astro.build/en/guides/deploy/github/)
for hosting background.

After publishing, add a **Software Analysis Wiki** navigation link on the personal website
pointing to the wiki's published URL. This repository does not modify that site.

## Preview troubleshooting

- If dependencies are missing, run `pnpm install --frozen-lockfile` first.
- If port 4321 is occupied by another application, close that application's
  server or choose another port with `pnpm dev --port 4323`; the double-click
  launcher expects port 4321.
- If a content edit produces an error, check the terminal or run
  `node node_modules/astro/bin/astro.mjs dev logs`. Required tool fields are
  validated during builds.
