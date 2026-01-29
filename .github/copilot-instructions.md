# Thymeless Treats Bakery — AI Development Guide# Thymeless Treats Bakery Website - AI Coding Instructions



> **Last Updated**: January 2026  ## Project Overview

> **Purpose**: Comprehensive guide for AI-assisted development and modernization  This is a Jekyll-based bakery e-commerce website built on the Beautiful Jekyll theme (v6.0.1), hosted on GitHub Pages. The site showcases seasonal menus, products, and inquiry forms for Thymeless Treats Bakery.

> **Audience**: GitHub Copilot, Claude, and future AI assistants working on this codebase

**Repository**: m0ranwad/m0ranwad.github.io  

---**Current Branch**: redesign-joanna-gaines (modern farmhouse aesthetic redesign)

**Main Branch**: theme/beautiful-jekyll  

## 🎯 Project Vision & Philosophy**Live URL**: thymelesstreatsbakery.com



### The Business Reality## Current Redesign (November 2024)

Thymeless Treats is a **seasonal cottage bakery** that operates sporadically throughout the year. The website's primary job is to:The site is undergoing a **Joanna Gaines-inspired redesign** with:

- **Color Palette**: Sage green (#8FA378), warm cream (#FBF8F3), charcoal (#333), warm gray (#6B6B6B)

1. **Showcase beautiful work** — Let the photos tell the story (Instagram-era visual marketing)- **Typography**: Cormorant Garamond (headings), Inter (body), Caveat (handwritten accents)

2. **Feature one seasonal menu at a time** — Valentine's Day, Easter, Thanksgiving, Christmas, etc.- **Design Language**: Modern farmhouse with card-based layouts, gradient boxes, clean white space

3. **Accept custom inquiries** — Birthday cakes, event cookies year-round- **Key Pages Redesigned**: Homepage (`index.html`), About (`about.md`), Contact (`contact.md`), Gallery (`gallery.md`)

4. **Build trust through visually stunning presentation**- **CSS**: `optimized-2025.css` with sage green buttons, navbar styling, card borders



### Design Philosophy: "Joanna Gaines Vibes"## Architecture & Key Concepts

The aesthetic should feel like a warm, modern farmhouse kitchen — **elegant but approachable**, **professional but personal**. Think:

- Clean white space with intentional breathing room### Content-Driven Menu System

- Sage green (#8FA378) as the signature brand colorThe site uses a **data-driven menu pattern** where product pages are markdown files with YAML front matter defining menu items. Pages do NOT contain HTML—all rendering logic lives in layouts.

- Beautiful photography as the hero, not the design

- Mobile-first, thumb-friendly navigation**Example pattern** (`christmas.md`, `cookies.md`, etc.):

- Minimal text — let images do the storytelling```yaml

---

### Privacy Considerationslayout: menu

The bakery owner values privacy. When writing content:title: Christmas Menu

- ❌ Don't include specific addresses or location detailspermalink: /christmas/

- ❌ Don't include full names unless explicitly providedmenu_items:

- ✅ Keep the personal touch ("handcrafted," "baked fresh to order")  - name: Teacher Boxes

- ✅ Reference general service area if needed ("local delivery available")    image: /assets/img/teacherBox.jpg

    description: Two beautiful buttercream sugar cookies...

---    price: $7 per box

    sold_out: true  # Optional: adds sold-out overlay

## 📊 Current State Assessment (January 2026)---

```

### Tech Stack

| Component | Current | Notes |The `menu.html` layout (`_layouts/menu.html`) processes this data to render product cards with images, descriptions, and prices. The `sold_out` flag triggers CSS styling to grey out items and add an overlay.

|-----------|---------|-------|

| Framework | Jekyll 3.9.3 | Static site generator, GitHub Pages compatible |### Multiple Gallery Layout Options

| Theme | Beautiful Jekyll 6.0.1 | Bootstrap 4.4.1 base |The site supports three photo gallery layouts for product showcases (see `cake1.md`, `cake2.md`, `cake3.md`):

| CSS | Custom `optimized-2025.css` (921 lines) | Layered on top of theme CSS |

| Hosting | GitHub Pages | Auto-deploys from `theme/beautiful-jekyll` branch |1. **Carousel** (`layout: carousel`) - Slideshow with prev/next controls

| Forms | Google Forms (embedded iframes) | No backend, manual order processing |2. **Masonry** (`layout: masonry`) - Pinterest-style grid layout  

| Analytics | Google Analytics 4 (G-9SVD45RN18) | Basic tracking |3. **Lightbox** (`layout: lightbox`) - Click-to-expand modal viewer

| Domain | thymelesstreatsbakery.com | Custom domain via CNAME |

All three use the `gallery_folder` front matter parameter to specify the image directory:

### Branch Strategy```yaml

```gallery_folder: /assets/img/cakes/

theme/beautiful-jekyll  ← Production (live site)```

    └── redesign-joanna-gaines  ← Current development branch

        └── [future-feature-branches]  ← Create for major changesLayouts automatically discover images via Jekyll's `site.static_files` and filter by the folder path.

```

### Homepage Structure

### Key Strengths ✅`index.html` features modern card-based layout:

- Clean Joanna Gaines color palette already implemented- **Featured menu section**: Seasonal promotion (Thanksgiving) with proper sizing (max-height 600px), sage border, CTA button

- Good typography choices (Cormorant Garamond, Inter, Caveat)- **Category cards**: 4 cards with descriptions and "View [Category] →" links (Holidays, Cookies, Cakes & Cupcakes, Gifts)

- Data-driven menu system (YAML front matter → layout rendering)- **Homepage CTA**: Sage gradient section with "View Our Gallery" and "Place an Inquiry" buttons

- 40+ quality product photos available- Images rotate in the header via `cover-img` array in front matter

- Mobile-responsive grid layouts

### Gallery Page

### Technical Debt & Pain Points ⚠️`gallery.md` features:

1. **Jekyll/Bootstrap 4 is aging** — Limited component library, verbose HTML- **40+ images** randomized across all categories (not grouped)

2. **CSS is complex** — 900+ lines of custom CSS fighting theme defaults- **Filter buttons**: All, Cookies, Cakes & Cupcakes, Holiday Treats, Special Events

3. **Inline styles everywhere** — Many pages have `style=""` attributes in markdown- **Lightbox**: Click to expand with prev/next navigation

4. **Mixed patterns** — Some pages use layouts properly, others have hardcoded HTML- **Categories mixed**: Easter, Christmas, cookies, cakes, events intermixed for visual variety

5. **Google Forms UX** — iframe embeds feel dated, poor mobile experience

6. **Image optimization** — No WebP, no lazy loading strategy, HEIC files present### About Page

7. **No build pipeline** — Manual everything, no image optimization, no CSS minification`about.md` (previously `aboutme.md`) redesigned with:

- **Gradient intro box**: Sage-tinted background with Allie's introduction

---- **3 story cards**: My Journey 🎨, Signature Delights 🍪, Sweet Creations 🎂

- **Feature highlights**: Grid with Cottage Bakery, Custom Designs, Dye-Free in sage gradient box

## 🏗️ Architecture Overview- **Personal signature**: Caveat font closing with "With warmth and whisk in hand, Allie"

- **CTAs**: View Gallery + Place an Order buttons

### File Structure (What Matters)

```### Custom Order System

m0ranwad.github.io/**IMPORTANT**: This is a **custom order system** using inquiry forms. Customers browse products and submit custom order requests.

├── _config.yml              # Site settings, navbar links, colors

├── index.html               # Homepage (featured menu + category cards)**Order Pages**:

├── gallery.md               # Photo gallery with filters + lightbox- `inquiry.md` - Main order hub with 4 custom form options

├── inquiry.md               # Order form hub (4 inquiry types)- `order.md` - Alternative order page

├── contact.md               # Contact info + FAQ- Individual order forms for specific product types (holidays, cakes, cookies, events)

├── menu.md                  # Menu category landing page

├── holidays.md              # Seasonal menu hub**Google Forms Integration**:

├── thanksgiving.html        # Example seasonal menu + Google FormSome older pages like `thanksgiving.html` still embed Google Forms via iframe:

├── christmas.md             # Holiday menu (YAML data)```html

├── valentines.md            # Holiday menu (YAML data)<iframe class="google-form-embed" 

├── easter.md                # Holiday menu (YAML data)        src="https://docs.google.com/forms/d/e/[FORM_ID]/viewform?embedded=true"

├── cookies.md               # Year-round menu        width="100%" height="775">

├── cakes.md                 # Year-round menu</iframe>

├── aboutme.md               # About page (privacy-conscious)```

├── _layouts/

│   ├── base.html            # HTML skeleton, loads CSS/JS**Menu Item CTAs**:

│   ├── page.html            # Standard content pagesMenu items in `_layouts/menu.html` include "Order This Item" buttons (hidden for sold-out items) that link to `/inquiry/`.

│   ├── home.html            # Homepage wrapper

│   └── menu.html            # Menu item card renderer ⭐## Development Workflow

├── _includes/

│   ├── nav.html             # Navigation bar### Local Development

│   ├── footer.html          # Footer```powershell

│   └── header.html          # Page headers# Install dependencies

├── assets/bundle install

│   ├── css/

│   │   ├── optimized-2025.css   # Main custom styles ⭐# Serve locally (rebuilds on file changes)

│   │   └── beautifuljekyll.css  # Theme basebundle exec jekyll serve

│   └── img/                 # All product photos

│       ├── headers/home/    # Homepage header rotation# Build for production

│       ├── easter/          # Seasonal photosbundle exec jekyll build

│       ├── valentines/      # Seasonal photos```

│       └── mothersday/      # Seasonal photos

└── docs/                    # Legacy documentation (can be cleaned up)Site builds to `_site/` directory. GitHub Pages automatically builds on push to the `theme/beautiful-jekyll` branch.

```

### Configuration

### Data Flow: How Menus Work- `_config.yml` - Site-wide settings (title, nav links, social media, colors, analytics)

```- Key settings: `navbar-links`, `social-network-links`, `navbar-col`/`footer-col` for theming

1. markdown file with YAML front matter

   ↓### Adding a New Product Page

2. Jekyll processes during build1. Create `product-name.md` in root with `layout: menu` front matter

   ↓2. Define `menu_items` array with name, image, description, price

3. _layouts/menu.html iterates over menu_items3. Add navigation link in `_config.yml` under `navbar-links` (optional)

   ↓4. Place product images in `/assets/img/[category]/`

4. Renders product cards with images, descriptions, prices

   ↓### Styling Conventions

5. CSS (optimized-2025.css) styles everything- Custom styles in `assets/css/beautifuljekyll.css` 

```- Menu-specific classes: `.menu-item-card`, `.menu-item-img`, `.menu-item-details`, `.menu-item-price`

- Sold-out styling: `.sold-out` class with grayscale filter and overlay

**Example menu page** (`cookies.md`):- Responsive design: Grid layouts adapt at `@media (max-width: 768px)` breakpoint

```yaml

---## Important Patterns

layout: menu

title: Cookie Menu### Permalink Structure

permalink: /cookies/Pages use explicit permalinks to control URLs:

menu_items:```yaml

  - name: Sugar Cookiespermalink: /christmas/  # Results in /christmas/index.html

    image: /assets/img/sugarCookies.jpg```

    description: Soft and sweet sugar cookies with a hint of vanilla.

    price: $24 dzWithout permalinks, Jekyll uses filename (e.g., `aboutme.md` → `/aboutme/`).

    link: "/cookies/sugar"  # Optional: links to detail page

  - name: Chocolate Chip### Image Paths

    image: /assets/img/chocolateChip.JPGAlways use absolute paths from site root: `/assets/img/image.jpg`  

    description: Classic chocolate chip cookies.Images are served from the `assets/img/` directory with subdirectories per category.

    price: $12 dz

    sold_out: true  # Optional: grays out item### Layout Inheritance

---```

```base.html (Bootstrap/CSS)

  └─ default.html (nav/footer structure)

### Layout Rendering Logic (`_layouts/menu.html`)      ├─ page.html (standard content pages)

```liquid      ├─ home.html (homepage only)

{% for item in page.menu_items %}      ├─ menu.html (product menus)

  <div class="menu-item-card">      ├─ carousel.html (extends menu)

    <img src="{{ item.image }}" class="{% if item.sold_out %}sold-out{% endif %}">      ├─ masonry.html (extends menu)  

    {% if item.sold_out %}      └─ lightbox.html (extends menu)

      <div class="sold-out-overlay">Sold Out</div>```

    {% endif %}

    <h2>{{ item.name }}</h2>Most layouts wrap content with `{{ content }}` and include common elements via `_includes/` partials.

    <p>{{ item.description }}</p>

    <p class="menu-item-price">{{ item.price }}</p>### Content vs. Presentation

    {% unless item.sold_out %}**DO**: Store product data in YAML front matter  

      <a href="/inquiry/" class="btn-primary-custom">Order This Item</a>**DON'T**: Hard-code HTML product cards in markdown content

    {% endunless %}

  </div>This allows layout changes to propagate across all product pages without editing individual files.

{% endfor %}

```## Common Tasks



---### Update Seasonal Menu Featured Item

Edit `index.html` line ~19:

## 🎨 Design System Reference```html

<a href="{{ '/thanksgiving/' | relative_url }}">

### Color Palette  <img src="/assets/img/thanksgivingMenu.jpg" alt="Thanksgiving Menu">

```css</a>

:root {```

  --cream: #FBF8F3;          /* Background */

  --sage: #8FA378;           /* Primary brand color */### Toggle Sold Out Status

  --warm-gray: #6B6B63;      /* Body text */Add `sold_out: true` to any menu item in the YAML front matter. The layout handles the rest.

  --charcoal: #2C2C2C;       /* Headings */

  --terracotta: #D4806F;     /* Accent (sold out, warnings) */### Change Site Colors

  --light-sage: #E8EFE3;     /* Cards, subtle backgrounds */Edit `_config.yml` color variables:

  --accent-gold: #D4A574;    /* Special highlights */```yaml

}navbar-col: "#4A5A4F"      # Header background

```navbar-text-col: "#FFFFFF" # Header text

footer-col: "#4A5A4F"      # Footer background

### Typography```

| Role | Font | Weight | Use |

|------|------|--------|-----|### Add Google Analytics

| Headings | Cormorant Garamond | 600-700 | H1-H6, menu item names |Set `gtag` in `_config.yml` (already configured as `G-9SVD45RN18`).

| Body | Inter | 400-500 | Descriptions, UI text |

| Accents | Caveat | 400-700 | Signatures, special callouts |## Key Files Reference

- `_config.yml` - Global site configuration

### Component Patterns- `index.html` - Homepage with featured menu and category cards

```css- `_layouts/menu.html` - Product menu renderer

/* Primary Button */- `assets/css/beautifuljekyll.css` - Custom styles (lines 1306-1605 for menu styling)

.btn-primary-custom {- `thanksgiving.html` - Example of menu + embedded order form pattern

  background: linear-gradient(135deg, var(--sage) 0%, #7A8F6A 100%);

  color: white;## Redesign Implementation Notes (November 2024)

  padding: 1rem 2rem;

  border-radius: 8px;### Modern Design System

}- **Sage green (#8FA378)** as primary brand color throughout (buttons, borders, links, accents)

- **Card-based layouts** with white backgrounds, sage borders (2px or 4px), subtle shadows

/* Secondary Button */- **Gradient boxes** for CTAs and feature sections (sage to darker sage)

.btn-secondary {- **Typography hierarchy**: Cormorant Garamond for elegant headings, Inter for clean body text

  background: transparent;- **Handwritten accents**: Caveat font for personal signatures and special touches

  border: 2px solid var(--sage);

  color: var(--sage);### Key Design Patterns

}1. **Button styles**: `.btn-primary-custom` (sage gradient), `.btn-secondary` (outline)

2. **Card structure**: White background, rounded corners (12px), sage left border (4px) for content cards

/* Card */3. **Section spacing**: 3-4rem margins between major sections, 2rem padding inside cards

.category-card, .menu-item-card {4. **Responsive**: Grid layouts collapse to single column below 768px

  background: white;

  border-radius: 12px;### Important UX Principles

  box-shadow: 0 4px 16px rgba(0,0,0,0.08);- **Custom orders, not e-commerce**: Use natural language like "Order This", "Place Order", "Get Started", not "Add to Cart" or overly formal language like "Place an Inquiry"

  border: 2px solid rgba(143, 163, 120, 0.2);- **Clear CTAs**: Every menu item (except sold-out) has an "Order This Item" button linking to `/inquiry/`

}- **Visual variety**: Gallery images randomized to avoid grouping similar photos

```- **Accessibility**: Proper semantic HTML, descriptive alt text, sufficient color contrast



### Responsive Breakpoints### File Organization

- **Mobile**: < 768px (single column, full-width buttons)- **CSS**: `optimized-2025.css` (877+ lines, recently updated for redesign)

- **Tablet**: 768px - 1024px (2 columns)- **Layouts**: `_layouts/menu.html` (includes inquiry CTAs), `_layouts/page.html`, `_layouts/home.html`

- **Desktop**: > 1024px (3-4 columns, hover effects)- **Pages**: `index.html` (homepage), `about.md` (about page), `gallery.md` (photo gallery), `inquiry.md` (inquiry hub)

- **Old files**: `aboutme.md` retained as backup (new file is `about.md`)

---

## Notes

## 📱 Mobile-First Priority- Site uses Jekyll 3.9.3 with GitHub Pages remote theme

- No custom build scripts; relies on standard Jekyll tooling

**95% of bakery customers browse on mobile.** Every design decision should be tested on a phone first.- Google Forms handle inquiry submission (no backend integration or payment processing)

- Analytics via Google Tag Manager (gtag)

### Mobile UX Guidelines- **Branch**: Work happens on `redesign-joanna-gaines`, merges to `theme/beautiful-jekyll` for production

1. **Touch targets**: Minimum 44x44px for buttons
2. **Thumb zone**: Important actions in bottom 2/3 of screen
3. **No hover-dependent UI**: Everything works with tap
4. **Fast image loading**: Consider lazy loading, WebP format
5. **Minimal scrolling**: Featured menu visible immediately
6. **Clear CTAs**: "Order Now" button always visible

### Current Mobile Issues to Address
- Inline styles don't respect mobile breakpoints consistently
- Gallery filter buttons can be hard to tap
- Google Form iframes are clunky on mobile
- Navigation hamburger menu could be more prominent

---

## 🚀 Modernization Roadmap

### Phase 1: Quick Wins (Current Jekyll Stack)
**Goal**: Improve without changing tech stack

- [ ] **Image optimization**: Convert to WebP, implement lazy loading
- [ ] **CSS cleanup**: Move inline styles to stylesheet, reduce specificity battles
- [ ] **Mobile polish**: Fix touch targets, improve form UX
- [ ] **Content audit**: Remove stale seasonal pages, update photos
- [ ] **Accessibility**: Add alt text, improve color contrast, focus states

### Phase 2: Consider Modern Framework (New Branch)
**Goal**: Evaluate if Jekyll is still the right choice

**Options to explore**:
| Framework | Pros | Cons |
|-----------|------|------|
| **Astro** | Modern, fast, image optimization built-in | Learning curve |
| **Next.js** | React ecosystem, great DX | Overkill for static site |
| **11ty (Eleventy)** | Jekyll-like but modern | Still need to manage CSS |
| **SvelteKit** | Excellent performance, good DX | Smaller ecosystem |

**Recommendation**: Try **Astro** in a `feature/astro-prototype` branch. It handles image optimization automatically and has a similar content-first philosophy to Jekyll.

### Phase 3: Enhanced Features (If Replatforming)
- [ ] **Better forms**: Replace Google Forms with Formspree or custom solution
- [ ] **CMS integration**: Forestry.io or Decap CMS for owner self-service
- [ ] **PDF menu display**: Embed Canva PDFs elegantly
- [ ] **Instagram feed integration**: Pull recent posts automatically
- [ ] **Order status**: Simple order tracking (if volume warrants)

---

## 📋 Common Development Tasks

### Update the Featured Seasonal Menu
The homepage hero should always show the current/upcoming season.

1. Edit `index.html`, find the "Featured This Season" section (~line 18)
2. Update the image path and link to the new seasonal page
3. Update the button text

```html
<a href="{{ '/valentines/' | relative_url }}">
  <img src="/assets/img/valentinesMenu.jpg" alt="Valentine's Day Menu">
</a>
<a href="{{ '/valentines/' | relative_url }}" class="btn-primary-custom">
  Order Valentine's Menu
</a>
```

### Add a New Seasonal Menu
1. Create `seasonname.md` in root
2. Use the menu layout with YAML front matter:
```yaml
---
layout: menu
title: Valentine's Day Menu
subtitle: Sweet treats for your sweetheart
permalink: /valentines/
menu_items:
  - name: Heart Cookies
    image: /assets/img/valentines/hearts.jpg
    description: Decorated heart-shaped sugar cookies
    price: $24 dozen
---
```
3. Add photos to `/assets/img/valentines/`
4. Link from `holidays.md` category page

### Mark Items as Sold Out
Add `sold_out: true` to any menu item:
```yaml
menu_items:
  - name: Cookie Box
    image: /assets/img/box.jpg
    description: Assorted cookies
    price: $30
    sold_out: true  # ← This grays out the item
```

### Add Photos to Gallery
1. Add images to appropriate `/assets/img/` folder
2. Edit `gallery.md`, add to the `galleryImages` array:
```javascript
{ src: '/assets/img/newphoto.jpg', category: 'cookies', title: 'New Cookies' }
```
Categories: `cookies`, `cakes`, `holiday`, `events`

### Run Locally
```powershell
cd c:\git\m0ranwad.github.io
bundle install          # First time only
bundle exec jekyll serve
# Open http://localhost:4000
```

### Deploy Changes
```powershell
git add .
git commit -m "Descriptive message"
git push origin redesign-joanna-gaines

# When ready for production:
git checkout theme/beautiful-jekyll
git merge redesign-joanna-gaines
git push origin theme/beautiful-jekyll
```

---

## 🎯 The #1 Priority: PDF Menu + Interactive Gallery Pattern

**This is the core UX pattern for seasonal menus:**

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│    [Beautiful PDF Menu Image from Canva]                │
│    - Embedded or displayed prominently                  │
│    - Mobile-optimized viewing                           │
│    - Download option available                          │
│                                                         │
├─────────────────────────────────────────────────────────┤
│                                                         │
│    [Interactive Photo Grid Below]                       │
│    - Click to enlarge / lightbox                        │
│    - Shows actual product photos                        │
│    - Links to order or inquiry form                     │
│                                                         │
├─────────────────────────────────────────────────────────┤
│                                                         │
│    [Clear "Order Now" CTA]                              │
│    - Always visible                                     │
│    - Links to Google Form or inquiry page               │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

**Implementation considerations**:
- PDF can be displayed via `<embed>`, `<iframe>`, or converted to images
- Consider PDF.js for better mobile PDF viewing
- Interactive grid should use the existing menu layout system
- Keep the order CTA sticky on mobile

---

## 🔧 Technical Reference

### Key Files to Modify
| Task | File(s) |
|------|---------|
| Site title, nav links | `_config.yml` |
| Homepage layout | `index.html` |
| Menu item rendering | `_layouts/menu.html` |
| Global styles | `assets/css/optimized-2025.css` |
| Navigation | `_includes/nav.html` |
| Footer | `_includes/footer.html` |
| Add new menu | Create `menuname.md` in root |
| Photo gallery | `gallery.md` |

### CSS Architecture
```
assets/css/
├── beautifuljekyll.css      # Theme base (don't modify)
├── beautifuljekyll-minimal.css
├── bootstrap-social.css     # Social icons
├── optimized-2025.css       # ⭐ Main customizations
└── redesign-joanna-gaines.css  # (Legacy, can be removed)
```

All custom styles should go in `optimized-2025.css`. The file is organized by section with clear comments.

### Image Guidelines
- **Format**: JPG for photos, PNG for graphics with transparency
- **Size**: Max 1200px wide for full-width images, 600px for cards
- **Naming**: Lowercase, no spaces, descriptive (`valentines-heart-cookies.jpg`)
- **Organization**: Use subfolders by category/season

### Jekyll/Liquid Quick Reference
```liquid
{{ page.title }}                    # Current page title
{{ site.title }}                    # Site title from _config.yml
{{ '/path/' | relative_url }}       # Proper URL generation
{% for item in page.menu_items %}   # Loop over YAML array
{% if item.sold_out %}              # Conditional
{% include footer.html %}           # Include partial
```

---

## 📝 Content Guidelines

### Voice & Tone
- **Warm**: "Let's create something sweet together"
- **Personal**: "Handcrafted treats" not "Products"
- **Action-oriented**: "Order Now" not "Submit Inquiry"
- **Confident**: "Beautiful custom cakes" not "We try to make nice cakes"

### Photo Standards
- **Hero images**: Bright, well-lit, styled photos
- **Menu items**: Clean backgrounds, consistent lighting
- **Avoid**: Blurry photos, cluttered backgrounds, poor lighting
- **Aspect ratios**: 4:3 for cards, 16:9 for hero sections

### SEO Basics
- Every page needs a unique `title` and `subtitle` in front matter
- Images need descriptive `alt` text
- Use semantic HTML (h1 → h2 → h3 hierarchy)
- Meta descriptions via Jekyll SEO tag plugin

---

## 🚨 Known Issues & Workarounds

### HEIC Files in `/assets/img/easter/`
Some photos are duplicated as both HEIC and JPG. Only JPG files are web-compatible. The HEIC files can be deleted.

### Google Form Iframe Sizing
The embedded forms don't resize well on mobile. Current workaround is fixed height with scrolling. Consider replacing with Formspree or custom form.

### CSS Specificity Wars
Theme CSS sometimes overrides custom styles. Current workaround uses `!important` in some places. A cleaner solution would be to move off the theme entirely.

### Jekyll Build Speed
With many images, builds can be slow. Running `bundle exec jekyll serve --incremental` helps during development.

---

## 🧪 Testing Checklist

Before deploying any changes:

- [ ] **Mobile**: Test on actual phone, not just browser resize
- [ ] **Images**: All images load, no broken paths
- [ ] **Links**: All navigation and CTAs work
- [ ] **Forms**: Order forms submit successfully
- [ ] **Responsive**: Check 320px, 768px, 1024px, 1440px widths
- [ ] **Performance**: Page loads in < 3 seconds on 3G
- [ ] **Accessibility**: Tab through page, check color contrast

---

## 📚 Resources

- [Jekyll Documentation](https://jekyllrb.com/docs/)
- [Beautiful Jekyll Theme](https://beautifuljekyll.com/)
- [Liquid Template Language](https://shopify.github.io/liquid/)
- [Google Fonts - Cormorant Garamond](https://fonts.google.com/specimen/Cormorant+Garamond)
- [Astro (potential migration)](https://astro.build/)

---

## 💡 Future Ideas

1. **Instagram Integration**: Auto-pull recent posts to gallery
2. **Seasonal Countdown**: "Valentine's orders close in X days"
3. **Customer Testimonials**: Carousel of reviews
4. **Recipe Blog**: SEO content to drive traffic
5. **Gift Cards**: Simple digital gift card system
6. **SMS Notifications**: Order confirmation via text

---

*This document should be updated whenever significant changes are made to the codebase architecture, design system, or development workflow.*
