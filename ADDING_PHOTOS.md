# Adding photos

> **In short:** put the photo in `public/assets/img/`, then add one entry to a menu file.

## 1. Prepare the photo

The site does not shrink photos yet, so a large file makes the page slow to load on a phone. Before adding a photo:

- Save it as a **JPG** (use PNG only if it needs a transparent background).
- Resize it to about **1600 to 2000 pixels** on the long side.
- Aim for **under 500 KB**. Most phone and photo apps can do this in their export or share settings.
- Give it a clear name in lowercase with dashes: `red-velvet-heart.jpg`, not `IMG_1234.jpg`.

## 2. Put it in the photo folder

All photos the site uses live in `public/assets/img/`. A few seasons have their own subfolder (`easter/`, `valentines/`, `mothersday/`). If yours does not, you can create one, such as `christmas/`, or put the photo straight in `img/`.

## 3. Add it to a menu

Open the menu file in `src/data/menus/` (for example `christmas.ts`) and add an entry to the `items` list. The image path starts at `/assets/img/` and leaves out `public`:

```ts
{
  name: 'Red Velvet Heart',
  image: '/assets/img/valentines/red-velvet-heart.jpg',
  description: 'Red velvet cookie with cream cheese frosting.',
  price: '$4.00 per cookie / $42 per dozen',
},
```

For the gallery, add an entry to `src/data/gallery.ts` in the same way.

## 4. Check it, then publish

```sh
npm run dev
```

Open http://localhost:4321 and find the page. When it looks right, commit the change and open a pull request into `main`. Merging it publishes the site.

## If the photo does not show

1. Check the path letter for letter. Capitals matter on the live site: `Cake.JPG` and `cake.jpg` are different files.
2. Check the file is under `public/assets/img/`, not somewhere else.
3. Stop the dev server and run `npm run dev` again.

## Removing a photo

Delete its entry from the menu or gallery file first, then delete the file from `public/assets/img/`.
