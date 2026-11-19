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
- **Last day to order** (`orderBy`, inclusive). Set it now even when the menu is coming soon; it shows once orders open. If you weren't given one, leave it out: there is simply no countdown. Mention that in your report.
- **Items and prices** are the owner's. Copy prices exactly; never invent or "fix" one. Her list is the whole menu: remove last year's items she didn't mention.
- **Descriptions.** For an item that's new or that she describes differently, use her words, tidied only for capitals and full stops. Owners often summarise an unchanged item in a few words: then keep last year's description, especially details customers rely on ("gift card not included", what's in a tray), and list it under "questions for the owner" in your report. If her wording conflicts with last year's, or a detail is ambiguous, ask.
- **Notes with no field**, such as "(new!)", stay out of item names. Mention them in your report.
- **Photos** for new items: add them with the `add-photos` skill (`.claude/skills/add-photos/`), then come back. A new item with no photo yet blocks publishing: ask for one.

## 2. Check no other season is open

Only one seasonal menu may be `'open'`; the build fails otherwise. Search for it:

```sh
grep -n "status: 'open'\|status: 'sold-out'" src/data/menus/*.ts
```

An earlier season still marked `'open'` or `'sold-out'` is closed (`status: 'past'`; see `.claude/skills/close-season/`) in the pull request that **opens** the new season, never earlier:

- Opening today: close it in this pull request.
- Announcing for later (`'coming-soon'`): leave it alone, so it keeps taking orders or showing "Sold Out" until the new season actually opens. Close it in the step 6 pull request instead. Meanwhile the home page and the menus page feature an **open** current season over the coming-soon one, so the announcement shows only on the new season's own page (coming-soon wording and the "orders open in N days" countdown). A **sold-out** current season gives way: the coming-soon season is featured.

## 3. Edit the menu file

In `src/data/menus/<season>.ts`:

```ts
status: 'open',          // or 'coming-soon' if orders open later
orderBy: '2026-12-12',   // last day to order; optional
opens: '2026-12-01',     // only with 'coming-soon'; optional
```

- Replace the `items` list with this year's items. Each item is `{ name, image, description, price }`; `image` is a path such as `'/assets/img/christmas/thumbprint.jpg'`. Keep last year's photo for an item that hasn't changed.
- Remove every `soldOut: true` left over from last year.
- Leave `subtitle`, `intro` and `description` alone unless you were given new wording.
- `headerImage` is the big photo on the home page, the menus page and the menu. If it shows an item that's no longer on the menu, ask the owner which photo to use instead, and suggest one of this year's items.

Don't edit any page or component. Every page reads the status from this file: the home page features the season, the menus page labels it, the countdown appears, and "Add to Inquiry" turns on. After `orderBy` the site shows "orders closed" by itself.

## 4. Check it

```sh
npm run check
```

It fails on a mistyped photo path (and suggests the right one), a second open menu, a malformed date, or private photo metadata. Fix what it names.

Then look at the result: `npm run dev` and open http://localhost:4321/, `/holidays/` and `/<season>/` at phone width, or run `npm run shots` and look at `shots/<branch>/home-390.png` and `<season>-390.png`. Check the prices are right and the countdown shows the date you meant. The new season is featured on the home page once it's open, or while coming soon if no other season is open or sold out.

## 5. Ship it

Branch (`content/<season>-<year>`), commit, open a pull request, and merge once `npm run check` passes in CI. CLAUDE.md's "Carry work through" covers the rest: watch the deploy and look at the live home page and menu.

The owner asking for the change is the approval: seasonal data changes merge without a second question, even while orders are open. The order hold in CLAUDE.md is for code changes.

## 6. If orders open later

The site can't switch itself from coming soon to open: the status is set by hand. Open a second pull request that changes `status: 'coming-soon'` to `status: 'open'`, and closes the previous season if step 2 left one open or sold out. Title it with the date (for example "Open Christmas orders on 2026-11-20"), and leave it unmerged. Merging it on that day is the whole opening.

This is the one step that needs a person on the day, so it is not a to-do list in the "Carry work through" sense: state the date and the pull request link plainly at the top of your report. If the owner would rather take orders from today, use `status: 'open'` now and skip this step.

## 7. Report

End with the diff, so the owner can check every word and price:

```sh
git diff main --stat
git diff main -- src/data/menus/
```

Say which dates you used, what you left out (for example no `orderBy`), and the pull request links. List your questions for the owner (descriptions kept from last year, the header photo, notes with no field) so she can answer them in one reply.
