---
name: close-season
description: Close a seasonal menu after its season is over, so it shows what was made without prices or ordering and the home page moves on. Use when a season has ended, or before opening the next one.
---

# Close a season

A person can follow these steps by hand too. Everything happens in **one file**, `src/data/menus/<season>.ts`.

## Edit

```ts
status: 'past',
```

That is the whole change. You can leave `orderBy`, `opens` and any `soldOut` flags in place: a past menu ignores them. (They are cleared when the season opens again; see `.claude/skills/open-season/`.)

What changes on the site:

- The menu page shows the items and photos without prices, "Add to Inquiry" or sold-out labels, and says "Here's what we made for <season>".
- The menu is no longer featured. The home page features whichever season is open, then coming soon, then sold out. With none, it shows "Between Seasons".

Close a season when it's over, not when it sells out: a sold-out menu stays featured with a "Sold Out" label, which tells customers it's gone rather than missing. Opening the next season also closes the previous one in the same pull request.

## Check, ship, report

1. `npm run check`, and fix anything it names.
2. Look at `/` and `/<season>/` with `npm run dev`, or run `npm run shots` and look at `shots/<branch>/home-390.png`.
3. Branch (`content/close-<season>`), commit, open a pull request, and merge once CI passes. Watch the deploy and look at the live home page.
4. End with the diff:

```sh
git diff main -- src/data/menus/
```
