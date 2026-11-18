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

The build itself fails when menu or gallery data names a photo that doesn't exist, letter case included. The deploy runs the whole check, so a mistyped photo path or broken internal link cannot go live.

## Rules

- **`main` is production.** Every push to `main` deploys. Work on a branch from `main`, one change per pull request.
- **GitHub settings are the maintainer's.** Prepare changes to the Pages source, default branch, environments or branches, then stop and ask.
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

Removed by epic #1 Phase 3. Until then, don't let them mislead you:

- **`assets/` at the root is a duplicate of `public/assets/`.** The build never reads it, so every search returns each asset twice. On some clones `public/assets` is a symlink to it. Add and edit files under `public/assets/`. If the root copy also shows up in `git status`, commit it too so the two stay identical.
- **`assets/css/` and `assets/js/` are the old Jekyll theme.** Nothing in `src/` uses them, so editing them changes nothing you mean to change. Styles live in each component's `<style>` block and in `BaseLayout.astro`.
- **Unused code.** `HomeCTA.astro` is imported nowhere. `Menu.orderFormUrl` is deprecated, and `formConfig.settings` is never read because `order.astro` hard-codes the same values.
- **Theme files.** `LICENSE`, `.gitattributes` and much of `.gitignore` still come from the Jekyll theme.
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
