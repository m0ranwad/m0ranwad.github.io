# 📸 Adding Photos to Thymeless Treats Website

> **Quick Summary**: Drop photos in the right folder, edit one text file, done.

---

## The Simple Process (3 Steps)

### Step 1: Add Your Photo

1. Open the `astro-prototype/public/assets/img/` folder
2. Put your photo in the appropriate subfolder:
   - `valentines/` — Valentine's Day products
   - `christmas/` — Christmas products  
   - `easter/` — Easter products
   - `thanksgiving/` — Thanksgiving products
   - `halloween/` — Halloween products
   - `mothersday/` — Mother's Day products
   - `cookies/` — Year-round cookie products
   - `cakes/` — Cake products
   - `gifts/` — Gift boxes and party favors
   - `gallery/` — General gallery photos (coming soon)

**Photo Tips:**
- Use JPG format for photos (not PNG, unless it has transparency)
- Name files descriptively: `lemon-raspberry-cookie.jpg` not `IMG_1234.jpg`
- Photos should be at least 800px wide for best quality
- Don't worry about file size — the site compresses automatically!

### Step 2: Add to the Menu

1. Open the menu data file: `astro-prototype/src/data/menus/[season].ts`
2. Add a new item to the `items` array:

```typescript
{
  name: 'Your Product Name',
  image: '/assets/img/valentines/your-photo-name.jpg',
  description: 'A delicious description of your product.',
  price: '$X.XX per dozen',
},
```

### Step 3: Test & Deploy

```powershell
cd astro-prototype
npm run dev
```

Open http://localhost:4321 to preview. When happy, commit and push!

---

## Example: Adding a New Valentine's Cookie

**Scenario**: You baked a new "Red Velvet Heart" cookie and want to add it to the Valentine's menu.

### 1. Add the photo
Save your photo as: `astro-prototype/public/assets/img/valentines/red-velvet-heart.jpg`

### 2. Edit the menu file
Open `astro-prototype/src/data/menus/valentines.ts` and add to the `items` array:

```typescript
items: [
  // ... existing items ...
  {
    name: 'Red Velvet Heart',
    image: '/assets/img/valentines/red-velvet-heart.jpg',
    description: 'Rich red velvet cookie with cream cheese frosting, shaped like a heart.',
    price: '$4.00 per cookie / $42 per dozen',
  },
],
```

### 3. Test
```powershell
npm run dev
```

---

## FAQ

### Do I need to run any special commands for images?
**No!** Just add the photo to the folder. Astro automatically optimizes images when the site builds.

### What size should my photos be?
- Minimum: 800px wide
- Recommended: 1200-2000px wide  
- Maximum: No limit (they'll be resized automatically)

### What format should I use?
- **JPG** for photos (most common)
- **PNG** only if you need transparency
- **WebP** is generated automatically — you don't need to create it

### Can I delete old photos?
Yes! Just remove the file from `public/assets/img/` and remove the reference from the menu data file.

### The image isn't showing up?
1. Check the file path matches exactly (case-sensitive!)
2. Make sure the file is in `public/assets/img/` not somewhere else
3. Restart the dev server: `npm run dev`

---

## Folder Structure Reference

```
astro-prototype/
├── public/
│   └── assets/
│       └── img/           ← PUT PHOTOS HERE
│           ├── valentines/
│           ├── christmas/
│           ├── easter/
│           ├── thanksgiving/
│           ├── halloween/
│           ├── mothersday/
│           ├── cookies/
│           ├── cakes/
│           └── gifts/
└── src/
    └── data/
        └── menus/         ← EDIT MENU FILES HERE
            ├── valentines.ts
            ├── christmas.ts
            └── ... etc
```

---

## Need Help?

If you get stuck, the key files are:
- **Photos go in**: `public/assets/img/[category]/`
- **Menu data in**: `src/data/menus/[season].ts`

The website automatically handles compression, WebP generation, and responsive sizes. You just add the original photo!
