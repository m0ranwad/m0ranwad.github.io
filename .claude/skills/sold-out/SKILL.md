---
name: sold-out
description: Mark one or more menu items, or a whole seasonal menu, as sold out. Use when the owner says something sold out, is gone, or they've stopped taking orders because they're full.
---

# Mark items or a menu sold out

A person can follow these steps by hand too. Everything happens in **one file**, the menu's `src/data/menus/<menu>.ts` (for example `christmas.ts`, `cookies.ts`).

## Some items

Add `soldOut: true` to each item, matching the item by its `name`:

```ts
{
  name: 'Grinch Cookies',
  image: '/assets/img/grinch.jpg',
  description: '…',
  price: '$16 per pound',
  soldOut: true,
},
```

The item keeps its photo and price, gets a "Sold Out" label, and loses its "Add to Inquiry" button. If a name you were given doesn't match an item exactly, ask rather than guess.

## The whole seasonal menu

Change one line, and leave the items alone:

```ts
status: 'sold-out',
```

Every item shows as sold out, the home and menus pages label the menu "Sold Out", and ordering stops. The menu stays featured on the home page until the season is closed (`.claude/skills/close-season/`).

For a year-round menu (cookies, cakes, gifts) there is no status: mark the items instead.

## Check, ship, report

1. `npm run check`, and fix anything it names.
2. Look at `/<menu>/` with `npm run dev`, or run `npm run shots` and look at `shots/<branch>/<menu>-390.png`.
3. Branch (`content/<menu>-sold-out`), commit, open a pull request, and merge once CI passes. The owner asking is the approval: this merges even while orders are open. Watch the deploy and look at the live page.
4. End with the diff:

```sh
git diff main -- src/data/menus/
```
