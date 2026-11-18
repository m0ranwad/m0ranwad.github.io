# CLAUDE.md

Static Astro site for a seasonal cottage bakery. Read [README.md](README.md) for what the site is and how it deploys. This file covers what an agent needs on top of that.

## Commands

```sh
npm ci                                   # install (Node version is in .nvmrc)
npm run dev                              # http://localhost:4321
npm run check                            # types, build, photo paths, internal links
npm run shots                            # every page at 390px and 1280px -> shots/<branch>/
npm run shots:compare -- main <branch>   # list what changed between two sets of shots
```

**Before calling a change done,** run `npm run check`; it also runs on every pull request. If the change could affect any page, run `npm run shots` on `main` and on your branch, then compare. Every difference must be intended and listed in the pull request. Screenshots need Chrome, Edge, or `npx playwright install chromium`.

**Changing dependencies:** write the lockfile with the npm that ships with the Node in `.nvmrc`. On older Node, run `npx npm@<that version> install --package-lock-only` afterwards. An older npm on Windows leaves out nested entries that CI's `npm ci` requires.

**After a large chunk of work** (a phase, a pull request, anything you'd ask to merge), end your reply with a review prompt for Codex, and check its findings yourself before acting on them. See [`.claude/skills/codex-review/`](.claude/skills/codex-review/SKILL.md).

The build itself fails when menu or gallery data names a photo that doesn't exist, letter case included. The deploy runs the whole check, so a mistyped photo path or broken internal link cannot go live.

## Carry work through

Do the routine steps of a task without being asked, then report what you did. Don't end with a to-do list for the maintainer.

- **Without asking:** branch, commit, push, open the pull request, and fix failing checks. Once the review is handled (large changes get the Codex review, small ones need none) and checks pass, merge. Then watch the deploy, check the live pages, tick the epic's boxes, delete the merged branch locally and on GitHub, and update local `main`. Record exceptions and decisions where the next session will look: the pull request, the epic or this file. Stop leftover dev or preview servers that get in the way.
- **Ask only for:** GitHub settings; merging while a season is taking orders; content, photos, prices or anything else customers read; privacy; deleting things other than merged branches that you didn't create; and product decisions with no sensible default. Recommend an option when you ask.

## Rules

- **`main` is production.** Every push to `main` deploys. Work on a branch from `main`, one change per pull request.
- **GitHub settings are the maintainer's.** Prepare changes to the Pages source, default branch, environments or branch protection, then stop and ask.
- **Hold risky changes while a season is taking orders.** If a seasonal menu has `featured: true` and items without `soldOut`, orders are open.
- **Privacy.** This repo and its issues are public. Never add a street address, the owner's surname, or any customer's name or details. The owner's first name and town are already public on the site. The Web3Forms access key in `src/config/forms.ts` is public by design; add no other secrets.
- **Don't run `npm run optimize-images`.** It overwrites the original photos in place.
- **Leave CSS alone** unless the task is about styling. Epic #2 replaces the visual layer, so consolidating CSS now is work done twice.

## Map

| Path | What it is |
|---|---|
| `src/data/menus/*.ts` | One file per menu. The source of truth for items, prices and sold-out flags. |
| `src/data/menus/index.ts` | Menu lists (`seasonalMenus`, `yearRoundMenus`) and `getFeaturedMenu()`. |
| `src/data/types.ts` | `Menu`, `MenuItem`, `GalleryImage` and other types. |
| `src/data/{gallery,navigation,content}.ts` | Gallery photos; nav and social links, site name; contact, FAQ and About text. |
| `src/pages/<menu>.astro` | Nine thin wrappers around `MenuLayout`. Some override page copy. |
| `src/pages/holidays.astro` | The "Menus" page (`/holidays/`). Hard-codes a "Now Available!" badge on the featured menu. |
| `src/pages/index.astro` | Home page. Features `getFeaturedMenu()` with a "Sold Out" overlay when every item is sold out. |
| `src/pages/order.astro` | Inquiry list and Web3Forms form. `thank-you.astro` clears the list after sending. |
| `src/scripts/inquiry-store.ts` | The inquiry list in `localStorage` (key `thymeless-inquiry-cart`). |
| `src/layouts/BaseLayout.astro` | Page shell, global styles, colour and font tokens on `:root`. |
| `src/components/` | `MenuGrid` (item cards, "Add to Inquiry", menu lightbox), `FeaturedSection`, `OrderDeadline`, `StickyMobileCTA`, `InquiryBadge`, `ui/`, `navigation/`. |
| `public/assets/img/` | Every photo the site serves, referenced as `/assets/img/...`. |
| `scripts/` | `check-images.mjs` (build-time photo check), `check-links.mjs`, `shots.mjs`. |

## Known leftovers

- **`LICENSE`** is still the old Jekyll theme's MIT licence, naming the theme's author. Replacing it is the owner's decision; don't edit it.
- **Unused photos kept on purpose.** `logo.png`, `logo.jpg`, `thymeless.jpg` and `404.jpg` are kept for the redesign (#2). Don't delete them as unused.
- **Image sizes.** Photos are served at full size with no resizing (Phase 6). Keep new ones under about 500 KB; see [ADDING_PHOTOS.md](ADDING_PHOTOS.md).

## Seasonal updates

Season state is split across several places today (epic #1 Phase 5 makes it one field). Check every step, or pages will contradict each other.

1. **Open a season.** In `src/data/menus/<season>.ts`, set `featured: true` and `orderDeadline: 'YYYY-MM-DD'`, update `subtitle`, and clear old `soldOut` flags. Remove `featured` and `orderDeadline` from the previous season's file; `getFeaturedMenu()` returns the first match, so only one menu may be featured.
2. **Check page copy.** Look at `src/pages/<season>.astro` for `introText`, `ctaTitle` and `ctaText` overrides left over from the last time it sold out. `easter.astro` is the sold-out example.
3. **Mark sold out.** Set `soldOut: true` on each item. When all items are sold out, also update the page copy (step 2) and `subtitle`. The "Now Available!" badge in `holidays.astro` stays until the menu is no longer featured.
4. **Close a season.** Remove `featured` and `orderDeadline`. Past menus keep their "Add to Inquiry" buttons and prices unless each item is marked `soldOut`.
5. **Redeploy in January.** The footer year is computed at build time. The order countdown is not stale: the browser recounts it on load and hourly, and hides it after `orderDeadline`.

Runbooks for these tasks will live in `.claude/skills/` (epic #1 Phase 8).

## Planned work

- [#1](https://github.com/m0ranwad/m0ranwad.github.io/issues/1): tech debt and agent readiness, in eight phases, one pull request each.
- [#2](https://github.com/m0ranwad/m0ranwad.github.io/issues/2): farm-stand redesign. It adds design guardrails to this file when it starts.

Read the epic before starting a phase, and tick its boxes in the issue when the pull request merges.
