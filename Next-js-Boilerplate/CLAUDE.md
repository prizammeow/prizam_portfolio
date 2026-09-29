@AGENTS.md

# CLAUDE.md

## Description

**Next.js Boilerplate** — a production-ready starter for Next.js 16+, Tailwind CSS 4, and TypeScript (by [ixartz](https://github.com/ixartz)), vendored inside this repo at `Next-js-Boilerplate/`.

Everything below assumes you are in the `Next-js-Boilerplate/` directory — that is where `package.json`, the tooling configs, and the app live. All commands run on **Node.js 24+ / npm**.

### Stack

| Concern | Choice |
|---|---|
| Framework | Next.js 16 (App Router), React 19, React Compiler (prod) |
| Language | TypeScript 7 (strict + `noUncheckedIndexedAccess`) |
| Styling | Tailwind CSS v4 (PostCSS, `src/styles/global.css`) |
| Auth | Clerk (`@clerk/nextjs`, keyless mode supported in dev) |
| Database | Drizzle ORM + PostgreSQL; **PGlite locally** (no Docker), Neon/any Postgres in prod |
| i18n | next-intl (`en`, `fr`), Crowdin syncs translations via GitHub Actions |
| Validation | Zod (`import type * as z from 'zod'`) |
| Logging | LogTape (`src/libs/Logger.ts`) |
| Monitoring | Sentry (disabled when `NEXT_PUBLIC_SENTRY_DISABLED`), PostHog |
| Security | Arcjet bot detection / rate limiting (`src/libs/Arcjet.ts`, `src/proxy.ts`) |
| Env | `@t3-oss/env-nextjs` — all vars validated in `src/libs/Env.ts` |
| Quality | oxlint + ultracite, `tsc --noEmit`, knip, commitlint, lefthook |
| Testing | Vitest (unit + browser UI), Playwright (integration + e2e), Storybook + Chromatic |

### Project structure

```text
Next-js-Boilerplate/
├── migrations/              # Drizzle SQL migrations (applied automatically in dev)
├── src/
│   ├── app/                 # App Router
│   │   ├── [locale]/        # i18n segment
│   │   │   ├── (auth)/      # sign-in/up (center) + dashboard (protected)
│   │   │   └── (marketing)/ # about, counter, portfolio
│   │   ├── api/counter/     # Example route handler (Drizzle upsert)
│   │   ├── global-error.tsx
│   │   ├── robots.ts / sitemap.ts
│   ├── components/          # React components
│   ├── libs/                # Env, DB, I18n, I18nRouting, Arcjet, Logger
│   ├── locales/             # en.json, fr.json (messages)
│   ├── models/Schema.ts     # Drizzle schema (single source for migrations)
│   ├── templates/           # BaseTemplate (+ .stories, .test)
│   ├── validations/         # Zod schemas
│   ├── types/ styles/ utils/
├── tests/
│   ├── e2e/                 # *.e2e.ts (Playwright)
│   └── integration/         # *.integ.ts (Playwright)
├── .storybook/
└── vitest.config.ts / playwright.config.ts / drizzle.config.ts / knip.config.ts
```

Key wiring to know before editing:

- **Middleware is `src/proxy.ts`** (not `middleware.ts`). It composes Arcjet → Clerk → next-intl routing. `isProtectedRoute` matches `/dashboard(.*)`; Clerk runs conditionally because keyless mode is incompatible with i18n.
- **DB connection is cached on `globalThis`** in `src/libs/DB.ts` to survive Next.js hot reloads.
- **`x-e2e-random-id` header** isolates counter rows in integration/e2e tests (defaults to `0`).
- **Playwright's `webServer`** boots `pglite-server` + `next dev` on port **3008** (not 3000) and runs migrations first, so `test:e2e` is self-contained.
- **Local DB** lives in `local.db/`. Delete that folder to get a fresh empty database.

### Environment

`.env` ships with working dev values (Clerk publishable key, PGlite `DATABASE_URL`). Put secrets in **`.env.local`** (git-ignored): `CLERK_SECRET_KEY`, `ARCJET_KEY`. Never read `process.env` directly — use `Env`; the one deliberate exception is `src/proxy.ts`, to keep the middleware bundle small.

## How to run tests

### Unit + component tests (Vitest)

```shell
npm run test                    # vitest run — both projects below
npx vitest run --project unit   # node-env unit tests: src/**/*.test.ts
npx vitest run --project ui     # browser tests: **/*.test.tsx + src/hooks/**/*.test.ts
npx vitest run src/utils/Helpers.test.ts   # one file
npx vitest run -t "prefixes path with locale"  # by test name
npm run test -- --coverage      # with coverage (src/**, stories excluded)
```

The `ui` project runs in real Chromium via `@vitest/browser-playwright`. First run needs browsers: `npx playwright install chromium`.

### Integration + E2E tests (Playwright)

```shell
npm run test:e2e                              # everything in tests/
npx playwright test tests/integration/Counter.integ.ts
npx playwright test --grep "increments the counter"
```

These boot the app automatically (PGlite + migrations + `next dev` on `:3008`). To reuse an already-running server instead, set `PORT` and `NEXT_PUBLIC_APP_URL`; Playwright reuses an existing server outside CI. Requires `CLERK_SECRET_KEY` for auth-protected flows.

### Storybook tests

```shell
npm run storybook          # dev server on :6006
npm run storybook:test     # interaction tests for *.stories.tsx (Chromium)
```

### Full quality gate (what CI runs)

```shell
npm run lint               # oxlint + ultracite, type-aware + type-check
npm run check:types        # tsc --noEmit
npm run check:deps         # knip (unused exports/deps as errors)
npm run check:i18n         # locale completeness vs en
npm run build-local        # production build against in-memory PGlite
npm run test
npm run test:e2e
```

CI (`.github/workflows/CI.yml`) runs these as separate jobs — `build`, `static`, `unit` (+ Codecov), `storybook`, `e2e` (+ Chromatic visual regression) — plus commitlint on every PR commit and Crowdin sync.

### Test conventions

- `*.test.ts` unit — **co-located** with the implementation. `*.integ.ts` / `*.e2e.ts` — in `tests/`.
- Top `describe` = subject; nested `describe` = scenario. `it` titles: third-person present, `verb + object + context`, sentence case, no period. Omit "should/works/handles/checks/validates".
- Avoid mocking; hit the real PGlite-backed API (see `tests/integration/Counter.integ.ts`).
- Commit before tests finish iterating? Lefthook's pre-commit already runs `ultracite fix` + `knip`; commit-msg runs commitlint.

---

## Custom commands

Slash-command skills for this repo. Each is self-contained: parse the invocation first, run the steps in order, and do not move past a **Gate** until it passes. Write any scratch output to a timestamped folder (`.tmp-YYYY-MM-DD-HHmmss/`) rather than the repo root.

---

```yaml
---
name: checkup
description: Run the full local quality gate for the boilerplate. Use when someone says "/checkup", "run the checks", "is this ready to commit", or before opening a PR. Runs lint, types, deps, i18n, and the test suites in dependency order.
---
```

# /checkup

Verifies the repo is clean before a commit or PR. Zero fixes applied — it only reports.

## Invocation dispatch (must happen first)

Parse the invocation before touching the project:

| Option | Values | Default |
|---|---|---|
| `--fix` | flag | report only |
| `--skip-e2e` | flag | e2e included |
| `--only <job>` | `lint` \| `types` \| `deps` \| `i18n` \| `unit` \| `e2e` \| `storybook` | all |

If `--only` is present, run just that job and skip the rest, regardless of other flags.

## Steps

1. **Static** — `npm run lint`, then `npm run check:types`, then `npm run check:deps`, then `npm run check:i18n`. Stop and report on the first failure.
2. **Unit** — `npm run test`. Treat a browser-launch failure in the `ui` project as a missing-browser problem (`npx playwright install chromium`), not a code failure.
3. **E2E** — `npm run test:e2e` (skipped with `--skip-e2e`). Expect the first run to download/build the PGlite server; the 60s `webServer` timeout is normal.
4. **Build** — `npm run build-local` unless the change is test-only.

**Gate:** every selected job exits 0. Report the list of jobs run, pass/fail each, and the failing assertion if any.

---

```yaml
---
name: feature
description: Scaffold a full feature in the boilerplate — route, component, Zod validation, i18n keys, and tests. Use when someone says "/feature counter clone", "add a page for X", or describes a new CRUD surface. Reads the existing counter feature as the reference pattern.
---
```

# /feature

One feature, all layers wired, matching the repo's existing conventions.

## Invocation dispatch (must happen first)

| Option | Values | Default |
|---|---|---|
| `<name>` | required, kebab-case | — |
| `--crud` | flag (adds API route + Drizzle model) | read-only page |
| `--locale` | `en` \| `fr` | both |
| `--auth` | flag (place under `(auth)/dashboard`) | marketing route |

Refuse to guess a name — if the invocation has none, stop and ask.

## Steps

1. **Pattern-read.** Read `src/app/api/counter/route.ts`, `src/models/Schema.ts`, `src/validations/CounterValidation.ts`, and `tests/integration/Counter.integ.ts`. Every new layer must mirror these.
2. **Schema first.** If `--crud`, add the table to `src/models/Schema.ts` and run `npm run db:generate` to emit the migration into `migrations/`. Never hand-edit generated SQL.
3. **Validation.** Add the Zod schema in `src/validations/<Name>Validation.ts`; reference it from the route via `safeParse`, returning `z.treeifyError(...)` with status `422`.
4. **Route + component.** Named exports only; single `props` param accessed as `props.foo`; no `useMemo`/`useCallback`; absolute `@/` imports.
5. **i18n.** Add a namespace ending in `Page` to `src/locales/en.json` (and `fr.json` if `--locale` is `fr` or both). Never hard-code user-visible strings. Run `npm run check:i18n`.
6. **Tests.** Co-locate `*.test.ts`; add `tests/integration/<Name>.integ.ts` for `--crud`, using the `x-e2e-random-id` header for row isolation.

**Gate:** `npm run lint && npm run check:types && npm run check:i18n && npm run test` all pass, and `npm run check:deps` reports no newly-unused exports.

---

```yaml
---
name: i18n-add
description: Add or update translation messages across locales. Use when someone says "/i18n-add", "add a locale", "translate the about page", or a user-visible string needs a key. Keeps en as the source of truth and verifies completeness.
---
```

# /i18n-add

English is the only locale a developer edits by hand — Crowdin generates the rest. Never delete keys other locales still reference.

## Steps

1. **Source of truth.** Add the key to `src/locales/en.json` under a namespace ending in `Page` (or the component namespace). Sentence case, context-specific (`card_title`, `meta_description`).
2. **Mirror.** Copy the same key path into every locale file in `src/locales/` with a real translation, not English filler. Only skip a locale if the user explicitly excludes it.
3. **Rich text.** If the string needs markup, use `t.rich(...)` and add the tag to the message (`<bold>...</bold>`), never concatenated fragments.
4. **Verify.** `npm run check:i18n` — it fails on missing or extra keys.

**Gate:** `npm run check:i18n` passes and `npm run check:types` still compiles (`src/types/I18n.ts` is typed off the message files).

---

```yaml
---
name: brag
description: Turn the boilerplate into a short, polished, shareable launch video using Hyperframes. Use when someone says "/brag", "let's brag about this", "make a launch video", or wants to share what they built. Reads the project code directly — no live URL or screenshots needed.
---
```

# /brag

You built it. Now let's brag about it. `/brag` turns this project into a 15–25 second video by reading the code, planning an angle, and handing a focused composition brief to Hyperframes.

## Invocation dispatch (must happen first)

Before inspecting the project, parse the complete invocation. If it contains `--voice`, set `voice.enabled = true` for that run only — never enable narration automatically.

| Option | Values | Default |
|---|---|---|
| `--tone` | `default` \| `polished` \| `yc-parody` \| `chaotic` \| `deadpan` \| `cinematic` \| `app-store`, or freeform | inferred |
| `--format` | `landscape` \| `vertical` \| `square` | `landscape` |
| `--duration` | seconds | auto (15–25s) |
| `--no-music` / `--no-sfx` | flag | on |
| `--title` | string | inferred from `AppConfig.name` |
| `--voice` | flag (Kokoro via Hyperframes) | narration off |

## Steps

1. **Inspect** — scan `src/`, `package.json`, `README.md`. For this repo, the honest hooks are: local Postgres with zero Docker (PGlite), Clerk keyless auth, the counter upsert route, and the Crowdin-managed i18n. **Gate:** answer the 9 planning questions.
2. **Plan** — write `<output-dir>/brag-plan.md` with the storyboard; scene durations sum to 15–25s.
3. **Compose** — load the Hyperframes domain skills (`hyperframes-core`, `-animation`, `-creative`, `-keyframes`, `-cli`) and build `<output-dir>/composition/`. **Gate:** `npx hyperframes check` passes with zero errors.
4. **Deliver** — render `<output-dir>/brag.mp4`, pick the best poster frame into `brag.jpg`, bake it as frame 0, and write `share-copy.txt`.

Output directory is `brag-output/`, or a timestamped `brag-output-YYYY-MM-DD-HHmmss/` when a previous run exists.

## Creative laws

- **Specific.** Must feel made for this exact project — show the real counter route or the PGlite zero-setup claim, not generic SaaS filler.
- **Readable.** Hold every line long enough to read it (~0.8s a label, ~0.3s a word). Fast-in, then hold.
- **Show the thing.** At least one scene displays actual UI or copy.
- **The hook is everything.** Plan the first 2 seconds first: `Hook (2-3s) → Reveal (2-4s) → 2-3 highlights (5-12s) → Punchline (2-4s)`.

---

## Token management and compaction

Context is a budget. These rules keep sessions productive as they grow.

- **Load on demand.** Prefer `@AGENTS.md` (imported above) plus a targeted grep/read over loading whole files. Read the specific layer you're editing, not all of `src/`.
- **Skip recaps.** Don't restate a result unless it was ambiguous or you need more input.
- **One tool call per question.** Batch independent reads in a single message; don't explore the same directory twice.
- **Gate before generating.** Re-read the failing test's actual output before proposing a fix — hypothesis-driven, 1–3 causes, most likely first.
- **Compaction.** When a session is long and context is heavy, drop tool output you've already acted on and keep: the current goal, the last failing assertion, and the convention you're mid-application on. If a step is finished and its details are unrecoverable from the code itself, write it to a file rather than holding it in context.
- **Small diffs.** Minimal changes keep review, and the token cost of reviewing, low.
