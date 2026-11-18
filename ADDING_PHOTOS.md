# Adding photos

> **In short:** put the photo in `src/assets/img/`, then add one entry to a menu file.

## 1. Prepare the photo

The site resizes every photo itself. It makes small AVIF and WebP versions for each place the photo appears, and a 2000-pixel version for the full-screen view. You can add photos straight from a phone or camera.

- **JPG** is best. PNG and WebP also work. A transparent PNG background turns white in the full-screen view.
- Use the **largest copy you have**, at least 2000 pixels on the long side if possible. Smaller photos work, but look soft on large screens.
- Keep files under about **10 MB**. The site serves only the small versions, but large originals slow down every build and are kept in the repository forever.
- Give it a clear name in lowercase with dashes: `red-velvet-heart.jpg`, not `IMG_1234.jpg`.
- **Remove the location.** The original file is public in this repository, and phone photos often record where they were taken. On an iPhone, use Share > Options and turn off Location before saving; in Google Photos, remove the location in the photo's details and download it again. `npm run check` stops a photo that still has a location or an author name in it.

## 2. Put it in the photo folder

All photos the site uses live in `src/assets/img/`. A few seasons have their own subfolder (`easter/`, `valentines/`, `mothersday/`). If yours does not, you can create one, such as `christmas/`, or put the photo straight in `img/`.

Only add photos the site uses. Photos kept for later go in `src/assets/brand/` or outside the repository; anything in `src/assets/img/` may be published.

## 3. Add it to a menu

Open the menu file in `src/data/menus/` (for example `christmas.ts`) and add an entry to the `items` list. The image path starts at `/assets/img/` and leaves out `src`:

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

Open http://localhost:4321 and find the page. The first time a new photo is shown, it can take a few seconds while the small versions are made. When it looks right, commit the change and open a pull request into `main`. Merging it publishes the site.

If a path in a menu or gallery file is wrong, the site will not build. The error names the file, the item and the path, and says so if only the capital letters are wrong. A broken photo path therefore never reaches the live site.

## If the photo does not show

1. Check the path letter for letter. Capitals matter: `Cake.JPG` and `cake.jpg` are different files.
2. Check the file is under `src/assets/img/`, not `public/` or somewhere else.
3. Stop the dev server and run `npm run dev` again.

## Removing a photo

Delete its entry from the menu or gallery file first, then delete the file from `src/assets/img/`.
