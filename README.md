# Hermes Express GDD

The game design document for Hermes Express, written spec-first and published as a website.
The Markdown in `docs/` is the source of truth; the Unity project is a prototype that implements it.

## Layout

| Path | What it is |
|---|---|
| `docs/GDD.md` | One-page GDD: summary, pillars, core loop, feature index, flow, decisions, open questions, change log |
| `docs/features/<slug>/design.md` | One spec per feature: rules, numbers, edge cases, history |
| `docs/archive/` | The original Indonesian GDD, unedited (not published on the site) |
| `docs/.vitepress/` | Site config, theme, the core-loop flowchart component |
| `scripts/check_docs.py` | Read-only checker for links, statuses and the feature index |

## Writing conventions

- Status words stay lower case in Markdown: `idea`, `designed`, `in progress`, `implemented`, `changed — code pending`, `cut`. The site shows them as coloured badges (IDEA gray, DESIGNED blue, IN PROGRESS amber, IMPLEMENTED green, CHANGED — CODE PENDING orange, CUT red), and the checker reads the lower-case words.
- A feature's status lives in two places that must agree: its row in the GDD feature index and the `**Status:**` line at the top of its `design.md`.
- `[TUNE]` marks a starting value to confirm in playtests. The site highlights it.
- `D-0xx` refers to a row in the GDD decisions table; the site turns it into a link. Decisions are never deleted: a replaced one gets "→ superseded by D-n" and the site greys it out.
- Name every number with its subject, for example "Chance (scam) package failure chance, tier 1 / 2 / 3", not "failure chance".
- Formulas and generation logic go in fenced code blocks, written so a programmer can implement them directly.

## Commands

```bash
npm install          # once
npm run dev          # local site at http://localhost:5173
npm run check        # docs checker (python3)
npm run build        # static site in docs/.vitepress/dist
```

## Deploying

The build output in `docs/.vitepress/dist` is a static site. Any of these work:

- **Vercel or Netlify:** import the repository, build command `npm run build`, output directory `docs/.vitepress/dist`. Works with a private repository; the site URL is public unless you add password protection.
- **GitHub Pages:** free for public repositories, needs a paid plan for private ones. Set `GDD_BASE=/<repo-name>/` when building so links resolve under the sub-path.

The `check` workflow in `.github/workflows/` runs the checker and a build on every push and pull request.
