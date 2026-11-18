---
name: add-photos
description: Add the owner's photos to a menu item, a menu header, or the gallery, or replace or remove one. Use when given new photos for the site.
---

# Add photos

A person can follow these steps by hand too; [ADDING_PHOTOS.md](../../../ADDING_PHOTOS.md) is the same guide for people. A photo is **one file** in `src/assets/img/` plus **one line** in a data file.

## 1. Check the photo

- **Only the owner's own photos** of her baking: no stock photos and nothing found online.
- **Privacy.** This repository is public, and the original file is committed as-is. No customer names, faces or addresses unless the owner has approved that photo. (She has approved the existing ones with names piped on cakes and cookies.) `npm run check` fails if the file carries a GPS location or an author name in its metadata; the fix is in its message.
- **Size.** Use the largest copy available, ideally 2000 px or more on the long side, under about 10 MB. The build makes the small versions; don't resize or compress it yourself.

## 2. Put it in place

- Folder: `src/assets/img/<season>/` for a seasonal menu (create it if needed, such as `christmas/`), or `src/assets/img/` for anything else.
- Name: lowercase with dashes, saying what it shows: `grinch-cookies.jpg`, not `IMG_1234.jpg`. Keep the extension as it is (`.jpg`, `.png`).
- Don't put photos in `public/`; nothing there is resized.

## 3. Point to it

The path starts at `/assets/img/` and leaves out `src`:

| Where it appears | File | Field |
|---|---|---|
| A menu item | `src/data/menus/<menu>.ts` | the item's `image: '/assets/img/christmas/grinch-cookies.jpg'` |
| A menu's header photo | `src/data/menus/<menu>.ts` | `headerImage` |
| The gallery | `src/data/gallery.ts` | a new `{ src, category, alt }` entry; `category` is `'cookies'`, `'cakes'`, `'holiday'` or `'events'` |

`alt` describes what the photo shows, plainly ("Grinch cookies with red heart sprinkles"). List any `alt` text you wrote in your report.

To **replace** a photo, put the new file in and change the path; then delete the old file if nothing else uses it (`grep -rn "<old name>" src`). To **remove** one, delete its line first, then the file. A photo in `src/assets/img/` that nothing uses is published at full size; `npm run check` fails if it is over 400 KB. Photos kept for later go in `src/assets/brand/`.

## 4. Check, ship, report

1. `npm run check`. It names a mistyped path and suggests the right spelling, letter case included.
2. Look at the page with `npm run dev` (a new photo takes a few seconds the first time) or `npm run shots`.
3. Branch, commit, open a pull request, and merge once CI passes. Watch the deploy and look at the live page.
4. End with the diff:

```sh
git diff main --stat
git diff main -- src/data/
```
