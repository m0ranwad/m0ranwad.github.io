---
name: open-season
description: Announce or open a seasonal menu for orders (Valentine's, Easter, Mother's Day, Halloween, Thanksgiving, Christmas), with this year's items, prices, photos and order deadline. Use when the owner says orders open, a menu is coming, or gives a new season's items.
---

# Open a season

A person can follow these steps by hand too. Everything happens in **one file**, `src/data/menus/<season>.ts`, plus any new photos.

| Season | File |
|---|---|
| Valentine's | `src/data/menus/valentines.ts` |
| Easter | `src/data/menus/easter.ts` |
| Mother's Day | `src/data/menus/mothersday.ts` |
| Halloween | `src/data/menus/halloween.ts` |
| Thanksgiving | `src/data/menus/thanksgiving.ts` |
| Christmas | `src/data/menus/christmas.ts` |

## 1. Pin down what you were given

- **Dates.** Turn relative dates ("Friday", "the 12th") into `YYYY-MM-DD` from today's date, and say which date you used in your report.
- **When orders open.** If they open today, the status is `'open'`. If they open later, announce now with `'coming-soon'` and an `opens` date (step 3), and prepare the switch to `'open'` for that day (step 6).
- **Last day to order** (`orderBy`, inclusive). If you weren't given one, leave it out: there is simply no countdown. Mention that in your report.
- **Items, descriptions and prices** are the owner's words. Copy them exactly. Never invent or "fix" a price. If an item has no price, or you'd have to guess, ask before going further.
- **Photos** for new items: add them with the `add-photos` skill (`.claude/skills/add-photos/`), then come back.

## 2. Check no other season is open

Only one seasonal menu may be `'open'`; the build fails otherwise. Search for it:

```sh
grep -n "status: 'open'\|status: 'sold-out'" src/data/menus/*.ts
```

An earlier season still marked `'open'` or `'sold-out'` gets `status: 'past'` in the same pull request (that is closing it; see `.claude/skills/close-season/`).

## 3. Edit the menu file

In `src/data/menus/<season>.ts`:

```ts
status: 'open',          // or 'coming-soon' if orders open later
orderBy: '2026-12-12',   // last day to order; optional
opens: '2026-12-01',     // only with 'coming-soon'; optional
```

- Replace the `items` list with this year's items. Each item is `{ name, image, description, price }`; `image` is a path such as `'/assets/img/christmas/thumbprint.jpg'`. Keep last year's photo for an item that hasn't changed.
- Remove every `soldOut: true` left over from last year.
- Leave `subtitle`, `intro`, `description` and `headerImage` alone unless you were given new wording or a new header photo.

Don't edit any page or component. Every page reads the status from this file: the home page features the season, the menus page labels it, the countdown appears, and "Add to Inquiry" turns on. After `orderBy` the site shows "orders closed" by itself.

## 4. Check it

```sh
npm run check
```

It fails on a mistyped photo path (and suggests the right one), a second open menu, a malformed date, or private photo metadata. Fix what it names.

Then look at the result: `npm run dev` and open http://localhost:4321/, `/holidays/` and `/<season>/` at phone width, or run `npm run shots` and look at `shots/<branch>/home-390.png` and `<season>-390.png`. Check the season is featured, the prices are right, and the countdown shows the date you meant.

## 5. Ship it

Branch (`content/<season>-<year>`), commit, open a pull request, and merge once `npm run check` passes in CI. CLAUDE.md's "Carry work through" covers the rest: watch the deploy and look at the live home page and menu.

The owner asking for the change is the approval: seasonal data changes merge without a second question, even while orders are open. The order hold in CLAUDE.md is for code changes.

## 6. If orders open later

The site can't switch itself from coming soon to open: the status is set by hand. Open a second pull request that changes only `status: 'coming-soon'` to `status: 'open'`, leave it unmerged, and tell the maintainer the date to merge it. Merging it on that day is the whole opening.

## 7. Report

End with the diff, so the owner can check every word and price:

```sh
git diff main --stat
git diff main -- src/data/menus/
```

Say which dates you used, what you left out (for example no `orderBy`), and the pull request links.
