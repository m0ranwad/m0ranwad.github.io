# Image Optimization Plan

> **Created**: January 29, 2026  
> **Purpose**: Document image optimization needs and recommendations

---

## Current State

| Metric | Value |
|--------|-------|
| Total images | 75 |
| Total size | 77.94 MB |
| Images over 1MB | 25 |
| Images over 500KB | 34 |

---

## Critical Images (Needs Immediate Attention)

These images are causing significant page load delays:

### Over 5MB (URGENT)
| File | Size | Location | Recommendation |
|------|------|----------|----------------|
| valentinesHeader1.png | 9.66 MB | /valentines/ | Resize to 1200px max, convert to JPG, compress |
| antiValentine_mini2.png | 7.76 MB | /valentines/ | Resize to 600px max, convert to JPG, compress |
| lemonRaspberry.png | 5.72 MB | /valentines/ | Resize to 600px max, convert to JPG, compress |

### 2-5MB (HIGH PRIORITY)
| File | Size | Location | Recommendation |
|------|------|----------|----------------|
| cakePage.JPG | 3.49 MB | root | Resize to 1200px, compress |
| homepageCookie.jpg | 3.36 MB | root | Resize to 800px (used in card), compress |
| mothersday/2.JPG | 2.65 MB | /mothersday/ | Resize to 800px, compress |
| mothersday/1.JPG | 2.42 MB | /mothersday/ | Resize to 800px, compress |
| chocolateChip.JPG | 2.37 MB | root | Resize to 600px, compress |
| noBake.jpg | 2.26 MB | root | Resize to 600px, compress |
| easter/IMG_6388.jpg | 2.12 MB | /easter/ | Resize to 800px, compress |
| christmasCookies.jpg | 2.06 MB | /headers/home/ | Resize to 800px, compress |
| easter/IMG_6471.jpg | 1.88 MB | /easter/ | Resize to 800px, compress |

### 1-2MB (MEDIUM PRIORITY)
- IMG_6434.jpg (1.65 MB)
- giftsPartyFavor.JPG (1.52 MB)
- bridalShower.jpg (1.45 MB)
- cranMuffins.jpg (1.43 MB)
- teacherBox.jpg (1.33 MB)
- sugarCookies.jpg (1.33 MB)
- IMG_6394.jpg (1.32 MB)
- birthdayCake.jpg (1.31 MB)
- valentines_ComingSoon.jpg (1.26 MB)
- valentines_ComingSoon.png (1.25 MB)
- homepageCake.jpg (1.18 MB)
- cupcakes1.jpg (1.14 MB)
- logo.png (1.03 MB) ⚠️ Logo should be SVG or optimized PNG
- IMG_6440.jpg (1.00 MB)

---

## Optimization Recommendations

### 1. Resize Guidelines
| Usage | Max Width | Max Height |
|-------|-----------|------------|
| Hero/Header images | 1920px | 600px |
| Featured menu images | 1200px | auto |
| Category card images | 800px | auto |
| Menu item thumbnails | 600px | auto |
| Gallery thumbnails | 400px | auto |

### 2. Format Recommendations
- **Photos**: Use JPG at 80-85% quality
- **Graphics/logos**: Use PNG or SVG
- **Consider WebP**: Modern browsers support WebP with 25-35% smaller file size
- **Remove PNGs for photos**: PNG files like `lemonRaspberry.png` should be JPG

### 3. Compression Tools
**Online (Free)**:
- [Squoosh.app](https://squoosh.app) - Google's image compressor
- [TinyPNG](https://tinypng.com) - PNG and JPG compression
- [Compressor.io](https://compressor.io)

**CLI Tools**:
```bash
# ImageMagick (resize + compress)
magick input.jpg -resize 1200x -quality 85 output.jpg

# Using cwebp for WebP conversion
cwebp -q 85 input.jpg -o output.webp
```

### 4. Lazy Loading (Implemented ✅)
Added `loading="lazy"` to:
- `_layouts/menu.html` - All menu item images
- `index.html` - Category card images
- `holidays.md` - Holiday card images
- `menu.md` - Menu card images

### 5. Future Improvements
- [ ] Implement WebP with JPG fallback using `<picture>` element
- [ ] Add srcset for responsive images
- [ ] Consider CDN for image delivery
- [ ] Implement image placeholder/blur-up technique

---

## Target Metrics

After optimization, aim for:
- **Total image size**: < 20 MB (currently 78 MB)
- **Largest image**: < 500 KB
- **Average image**: < 200 KB
- **Homepage load**: < 3 seconds on 3G

---

## Action Items

### Immediate (Manual Process)
1. Download the 3 largest PNG files (9.66 MB, 7.76 MB, 5.72 MB)
2. Convert to JPG and resize to max 1200px
3. Compress to ~200-300KB each
4. Replace in repository

### Short-term
1. Batch resize all images over 1MB
2. Consider renaming JPG files to lowercase (IMG_*.JPG → img_*.jpg)
3. Convert logo.png to SVG or optimize to < 50KB

### Long-term
1. Set up automated image optimization in build pipeline
2. Implement WebP with fallbacks
3. Add responsive images (srcset)
