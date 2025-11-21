# Thymeless Treats Bakery Website - AI Coding Instructions

## Project Overview
This is a Jekyll-based bakery e-commerce website built on the Beautiful Jekyll theme (v6.0.1), hosted on GitHub Pages. The site showcases seasonal menus, products, and order forms for Thymeless Treats Bakery.

**Repository**: m0ranwad/m0ranwad.github.io  
**Branch**: theme/beautiful-jekyll  
**Live URL**: thymelesstreatsbakery.com

## Architecture & Key Concepts

### Content-Driven Menu System
The site uses a **data-driven menu pattern** where product pages are markdown files with YAML front matter defining menu items. Pages do NOT contain HTML—all rendering logic lives in layouts.

**Example pattern** (`christmas.md`, `cookies.md`, etc.):
```yaml
---
layout: menu
title: Christmas Menu
permalink: /christmas/
menu_items:
  - name: Teacher Boxes
    image: /assets/img/teacherBox.jpg
    description: Two beautiful buttercream sugar cookies...
    price: $7 per box
    sold_out: true  # Optional: adds sold-out overlay
---
```

The `menu.html` layout (`_layouts/menu.html`) processes this data to render product cards with images, descriptions, and prices. The `sold_out` flag triggers CSS styling to grey out items and add an overlay.

### Multiple Gallery Layout Options
The site supports three photo gallery layouts for product showcases (see `cake1.md`, `cake2.md`, `cake3.md`):

1. **Carousel** (`layout: carousel`) - Slideshow with prev/next controls
2. **Masonry** (`layout: masonry`) - Pinterest-style grid layout  
3. **Lightbox** (`layout: lightbox`) - Click-to-expand modal viewer

All three use the `gallery_folder` front matter parameter to specify the image directory:
```yaml
gallery_folder: /assets/img/cakes/
```

Layouts automatically discover images via Jekyll's `site.static_files` and filter by the folder path.

### Homepage Structure
`index.html` uses a hybrid approach:
- **Featured menu**: Direct image link to seasonal promotion (currently Thanksgiving)
- **Category cards**: Grid of linked cards to main sections (Holidays, Cookies, Cakes, Gifts)
- Images rotate in the header via `cover-img` array in front matter

### Order Form Integration
Order pages like `thanksgiving.html` embed Google Forms via iframe:
```html
<iframe class="google-form-embed" 
        src="https://docs.google.com/forms/d/e/[FORM_ID]/viewform?embedded=true"
        width="100%" height="775">
</iframe>
```

Form embeds are typically placed in page content after menu items. The `_includes/form.html` partial contains the reusable iframe code.

## Development Workflow

### Local Development
```powershell
# Install dependencies
bundle install

# Serve locally (rebuilds on file changes)
bundle exec jekyll serve

# Build for production
bundle exec jekyll build
```

Site builds to `_site/` directory. GitHub Pages automatically builds on push to the `theme/beautiful-jekyll` branch.

### Configuration
- `_config.yml` - Site-wide settings (title, nav links, social media, colors, analytics)
- Key settings: `navbar-links`, `social-network-links`, `navbar-col`/`footer-col` for theming

### Adding a New Product Page
1. Create `product-name.md` in root with `layout: menu` front matter
2. Define `menu_items` array with name, image, description, price
3. Add navigation link in `_config.yml` under `navbar-links` (optional)
4. Place product images in `/assets/img/[category]/`

### Styling Conventions
- Custom styles in `assets/css/beautifuljekyll.css` 
- Menu-specific classes: `.menu-item-card`, `.menu-item-img`, `.menu-item-details`, `.menu-item-price`
- Sold-out styling: `.sold-out` class with grayscale filter and overlay
- Responsive design: Grid layouts adapt at `@media (max-width: 768px)` breakpoint

## Important Patterns

### Permalink Structure
Pages use explicit permalinks to control URLs:
```yaml
permalink: /christmas/  # Results in /christmas/index.html
```

Without permalinks, Jekyll uses filename (e.g., `aboutme.md` → `/aboutme/`).

### Image Paths
Always use absolute paths from site root: `/assets/img/image.jpg`  
Images are served from the `assets/img/` directory with subdirectories per category.

### Layout Inheritance
```
base.html (Bootstrap/CSS)
  └─ default.html (nav/footer structure)
      ├─ page.html (standard content pages)
      ├─ home.html (homepage only)
      ├─ menu.html (product menus)
      ├─ carousel.html (extends menu)
      ├─ masonry.html (extends menu)  
      └─ lightbox.html (extends menu)
```

Most layouts wrap content with `{{ content }}` and include common elements via `_includes/` partials.

### Content vs. Presentation
**DO**: Store product data in YAML front matter  
**DON'T**: Hard-code HTML product cards in markdown content

This allows layout changes to propagate across all product pages without editing individual files.

## Common Tasks

### Update Seasonal Menu Featured Item
Edit `index.html` line ~19:
```html
<a href="{{ '/thanksgiving/' | relative_url }}">
  <img src="/assets/img/thanksgivingMenu.jpg" alt="Thanksgiving Menu">
</a>
```

### Toggle Sold Out Status
Add `sold_out: true` to any menu item in the YAML front matter. The layout handles the rest.

### Change Site Colors
Edit `_config.yml` color variables:
```yaml
navbar-col: "#4A5A4F"      # Header background
navbar-text-col: "#FFFFFF" # Header text
footer-col: "#4A5A4F"      # Footer background
```

### Add Google Analytics
Set `gtag` in `_config.yml` (already configured as `G-9SVD45RN18`).

## Key Files Reference
- `_config.yml` - Global site configuration
- `index.html` - Homepage with featured menu and category cards
- `_layouts/menu.html` - Product menu renderer
- `assets/css/beautifuljekyll.css` - Custom styles (lines 1306-1605 for menu styling)
- `thanksgiving.html` - Example of menu + embedded order form pattern

## Notes
- Site uses Jekyll 3.9.3 with GitHub Pages remote theme
- No custom build scripts; relies on standard Jekyll tooling
- Google Forms handle order processing (no backend integration)
- Analytics via Google Tag Manager (gtag)
