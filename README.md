# Thymeless Treats Bakery

The website for Thymeless Treats, a small cottage bakery in North Ridgeville, Ohio. It shows the seasonal and year-round menus and a photo gallery, and lets customers send an order inquiry.

Live at **[www.thymelesstreatsbakery.com](https://www.thymelesstreatsbakery.com)**.

The bakery takes orders a few times a year (Valentine's Day, Easter, Mother's Day, Halloween, Thanksgiving, Christmas). Between seasons the site mostly sits still.

## How it works

- **[Astro](https://astro.build/)** builds plain static HTML. There is no server, database or CMS.
- **Menus** are TypeScript data files in `src/data/menus/`. Each menu page renders one of them, and a seasonal menu's `status` decides what every page says about it.
- **Ordering** is an inquiry, not a checkout. Customers add items to a list kept in their browser, then send it from `/order/`. The form posts to [Web3Forms](https://web3forms.com/), which emails the owner. No payment is taken on the site.
- **Hosting** is GitHub Pages. The custom domain is set in the repository's Pages settings, and `public/CNAME` holds the same value.

## Run it locally

You need Node 24 or later, and npm. CI uses the version in `.nvmrc` (Node 26). If you add or update a dependency on an older Node, also run `npx npm@11.20.0 install --package-lock-only`. Otherwise the pull request check can fail at `npm ci`.

```sh
npm ci            # install exact dependency versions
npm run dev       # dev server at http://localhost:4321
npm run check     # photo privacy, type check, build, every photo path and internal link, and no image over 400 KB
npm run shots     # screenshot every page at phone and desktop width into shots/
```

`npm run check` also runs automatically on every pull request.

## How it deploys

Every push to `main` runs [`.github/workflows/astro.yml`](.github/workflows/astro.yml), which runs `npm run check` (that includes the build) and publishes the site to GitHub Pages. **Pushing to `main` is publishing to production.** Make changes on a branch and merge them by pull request.

Avoid risky changes while a season is taking orders. A broken order page then costs real orders.

## Common changes

| To do this | Edit this |
|---|---|
| Change a menu item, price or sold-out flag | `src/data/menus/<menu>.ts` |
| Announce, open, sell out or close a season | `status` in `src/data/menus/<menu>.ts` |
| Add or swap a photo | `src/assets/img/`; see [ADDING_PHOTOS.md](ADDING_PHOTOS.md) |
| Change the gallery | `src/data/gallery.ts` |
| Change contact links, FAQ or About text | `src/data/navigation.ts`, `src/data/content.ts` |

Each step of a season is one change to the menu's `status` field. Step-by-step runbooks, written so a person can follow them too, are in [`.claude/skills/`](.claude/skills/): [open a season](.claude/skills/open-season/SKILL.md), [mark items or a menu sold out](.claude/skills/sold-out/SKILL.md), [close a season](.claude/skills/close-season/SKILL.md) and [add photos](.claude/skills/add-photos/SKILL.md).

## Where things are

```
src/
  pages/       one file per route (/, /holidays/, /order/, ...); [menu].astro renders every menu
  layouts/     BaseLayout (page shell and colour tokens), MenuLayout
  components/  page sections; ui/ and navigation/ hold the shared pieces
  data/        menus, gallery, navigation and page text
  config/      Web3Forms settings
  scripts/     browser code for the inquiry list
  assets/img/  every photo; the build resizes them (see ADDING_PHOTOS.md)
  assets/brand/ logos kept for the redesign; not published
  lib/         photos.ts: turns a photo path into resized images
public/        files served as-is: CNAME, favicon, robots.txt
```

## Work in progress

- [#1 Tech debt and agent readiness](https://github.com/m0ranwad/m0ranwad.github.io/issues/1): cleanup, checks, a one-field season model, an image pipeline, and runbooks for recurring tasks. Progress is in the issue's checkboxes.
- [#2 Farm-stand redesign](https://github.com/m0ranwad/m0ranwad.github.io/issues/2): a new look, built on a branch and approved by the owner before launch.

If you work on this repo with an AI assistant, it should read [CLAUDE.md](CLAUDE.md) first.
