# CLAUDE.md

Static Astro site for a seasonal cottage bakery. Read [README.md](README.md) for what the site is and how it deploys. This file covers what an agent needs on top of that.

## Commands

```sh
npm ci                                   # install (Node version is in .nvmrc)
npm run dev                              # http://localhost:4321
npm run check                            # photo metadata, types, build, photo paths, internal links, image sizes
npm run shots                            # every page at 390px and 1280px -> shots/<branch>/
npm run shots:compare -- main <branch>   # list what changed between two sets of shots
```

**Before calling a change done,** run `npm run check`; it also runs on every pull request. If the change could affect any page, run `npm run shots` on `main` and on your branch, then compare. Every difference must be intended and listed in the pull request. Screenshots need Chrome, Edge, or `npx playwright install chromium`.

**Changing dependencies:** write the lockfile with the npm that ships with the Node in `.nvmrc`. On older Node, run `npx npm@<that version> install --package-lock-only` afterwards. An older npm on Windows leaves out nested entries that CI's `npm ci` requires.

**After a large chunk of work** (a phase, a pull request, anything you'd ask to merge), end your reply with a review prompt for Codex, and check its findings yourself before acting on them. **One Codex review per change:** never ask Codex to re-review your fixes; verify them yourself and merge. See [`.claude/skills/codex-review/`](.claude/skills/codex-review/SKILL.md). Codex's own reviewer instructions are in [`AGENTS.md`](AGENTS.md); Codex maintains that file.

The build itself fails when menu or gallery data names a photo that doesn't exist, letter case included, or when the season data breaks its rules (two menus open, a malformed date). The deploy runs the whole check, so a mistyped photo path, a broken internal link or an image over 400 KB cannot go live.

## Carry work through

Do the routine steps of a task without being asked, then report what you did. Don't end with a to-do list for the maintainer.

- **Without asking:** branch, commit, push, open the pull request, and fix failing checks. Once the review is handled (large changes get the Codex review, small ones need none) and checks pass, merge. Then watch the deploy, check the live pages, tick the epic's boxes, delete the merged branch locally and on GitHub, and update local `main`. Record exceptions and decisions where the next session will look: the pull request, the epic or this file. Stop leftover dev or preview servers that get in the way.
- **Ask only for:** GitHub settings; merging while a season is taking orders; content, photos, prices or anything else customers read; privacy; deleting things other than merged branches that you didn't create; and product decisions with no sensible default. Recommend an option when you ask.

## Rules

- **`main` is production.** Every push to `main` deploys. Work on a branch from `main`, one change per pull request.
- **GitHub settings are the maintainer's.** Prepare changes to the Pages source, default branch, environments or branch protection, then stop and ask.
- **Hold risky changes while a season is taking orders.** Orders are open when a seasonal menu has `status: 'open'` and its `orderBy` date, if set, hasn't passed. The hold is for code changes. Seasonal data the owner asks for (opening, sold out, closing, new photos) merges any time: her request is the approval.
- **Privacy.** This repo and its issues are public. Never add a street address, the owner's surname, or any customer's name or details. The owner's first name and town are already public on the site. The Web3Forms access key in `src/config/forms.ts` is public by design; add no other secrets.
- **Leave CSS alone** unless the task is about styling. Epic #2 replaces the visual layer, so consolidating CSS now is work done twice.

## Map

| Path | What it is |
|---|---|
| `src/data/menus/*.ts` | One file per menu: items, prices, sold-out flags, page copy, and a seasonal menu's `status`. |
| `src/data/menus/index.ts` | Menu lists (`seasonalMenus`, `yearRoundMenus`, `allMenus`). |
| `src/data/season.ts` | `menuView()`: what every page says and offers for a menu's status. `leadMenu()`: the season to feature. `checkMenus()`: the build's season rules. |
| `src/data/types.ts` | `Menu`, `SeasonStatus`, `MenuItem`, `GalleryImage` and other types. |
| `src/data/{gallery,navigation,content}.ts` | Gallery photos; nav links, site name, tagline, social links and contact email (`socialLink()`; each defined once); FAQ and About text. |
| `src/pages/[menu].astro` | One route for every menu (`/christmas/`, `/cookies/`, ...), rendered by `MenuLayout`. |
| `src/pages/holidays.astro` | The "Menus" page (`/holidays/`). Its callout shows `leadMenu()` with a status badge. |
| `src/pages/index.astro` | Home page. `FeaturedSection` shows `leadMenu()`, or "Between Seasons" when there is none. |
| `src/pages/order.astro` | Inquiry list (rendered from a `<template>`) and Web3Forms form. `thank-you.astro` clears the list after sending. |
| `src/scripts/inquiry-store.ts` | The inquiry list in `localStorage` (key `thymeless-inquiry-cart`). |
| `src/layouts/BaseLayout.astro` | Page shell, global styles, colour and font tokens on `:root`. |
| `src/components/` | `MenuGrid` (item cards, "Add to Inquiry"), `FeaturedSection`, `OrderDeadline` (countdown), `StickyMobileCTA`, `InquiryBadge`, `ui/`, `navigation/`. In `ui/`: `Lightbox` (the photo viewer's markup and behaviour; any `[data-lightbox]` button opens it), `DateSwitch` (flips open wording to closed after `orderBy` in the browser), `Photo`. |
| `src/assets/img/` | Every photo the site shows, named in data and pages as `/assets/img/...`. Anything here may be published. |
| `src/lib/photos.ts`, `src/components/ui/Photo.astro` | The only way photos reach a page: resized AVIF and WebP via `<Photo>`, plus the lightbox, thumbnail, link-preview and background versions. |
| `public/` | Files served as-is: `CNAME`, `favicon.ico`, `robots.txt`. No photos. |
| `scripts/` | `check-photo-metadata.mjs` (no GPS or author data in committed photos), `check-images.mjs` and `check-seasons.mjs` (build-time data checks), `check-links.mjs` and `check-image-sizes.mjs` (run over `dist/`), `shots.mjs`. |
| `.claude/skills/` | Runbooks: `open-season`, `sold-out`, `close-season`, `add-photos`; also `codex-review`. |

## Known leftovers

- **`LICENSE`** is still the old Jekyll theme's MIT licence, naming the theme's author. Replacing it is the owner's decision; don't edit it.
- **Unused photos kept on purpose.** `src/assets/brand/` holds `logo.png`, `logo.jpg`, `thymeless.jpg` and `404.jpg` for the redesign (#2). They sit outside `src/assets/img/` so they aren't published. Don't delete them as unused.
- **Photos.** The build resizes every photo (Phase 6); originals of any size can go in `src/assets/img/`. See [ADDING_PHOTOS.md](ADDING_PHOTOS.md). A new place that shows a photo uses `<Photo>` or a helper in `src/lib/photos.ts`, never a `/assets/img/` URL: that path is not served.

## Seasonal updates

Each seasonal menu's state is one field, `status`, in `src/data/menus/<season>.ts`. Every page derives from it through `src/data/season.ts`, so pages can't contradict each other. Run `npm run check` after each change.

**Use the runbooks** in `.claude/skills/` for these tasks: `open-season`, `sold-out`, `close-season` and `add-photos`. Each names the one file to edit and ends with the diff. The summary:

1. **Announce (optional).** `status: 'coming-soon'`, plus `opens: 'YYYY-MM-DD'` for an "orders open in N days" countdown. Items and prices show, without "Add to Inquiry". The home and menus pages feature it.
2. **Open.** `status: 'open'`, plus `orderBy: 'YYYY-MM-DD'` (the last day to order) for a countdown. Update items and prices, and remove leftover `soldOut` flags. The build fails if two menus are open (open decision 2 in #1). After `orderBy` the pages switch to "orders closed" in the browser, without a redeploy.
3. **Sell out.** One item: `soldOut: true` on it. Everything: `status: 'sold-out'`. The menu stays featured with a "Sold Out" label.
4. **Close.** `status: 'past'`. The page shows what was made, without prices or ordering. With nothing open, coming soon or sold out, the home page shows "Between Seasons".
5. **Redeploy in January.** The footer year is computed at build time.

Page copy for each state (subtitle, intro, the box at the bottom) is in `menuView()`. A menu's own `intro` and `cta` are used while it is open.

## Planned work

- [#1](https://github.com/m0ranwad/m0ranwad.github.io/issues/1): tech debt and agent readiness, in eight phases, one pull request each.
- [#2](https://github.com/m0ranwad/m0ranwad.github.io/issues/2): farm-stand redesign. It adds design guardrails to this file when it starts.

**Where to resume:** progress lives in the epics' checkboxes, and decisions and exceptions in their comments. Read the epic, including its comments, before starting a phase, and tick its boxes when the pull request merges. Before starting, check whether a season is taking orders (see Rules): Phases 4–7 of #1 must not merge then.
