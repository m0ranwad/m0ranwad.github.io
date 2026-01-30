# Phase 2B: Jekyll to Astro Migration Plan

> **Created**: January 30, 2026  
> **Purpose**: Complete migration from Jekyll to Astro for best possible site  
> **Estimated Total Time**: 4-6 hours with AI assistance  
> **Branch**: `feature/astro-prototype`

---

## 🎯 Migration Goals

1. **Performance**: Leverage Astro's faster builds and smaller bundles
2. **Image Optimization**: Automatic WebP generation and responsive images
3. **Modern Architecture**: Component-based, type-safe, maintainable
4. **Same Content**: All existing pages and functionality preserved
5. **Same Deployment**: Continue using GitHub Pages

---

## 📊 Current Site Inventory

### Pages to Migrate (22 total)

| Page | Jekyll File | Type | Complexity | Notes |
|------|-------------|------|------------|-------|
| Homepage | `index.html` | Custom | ✅ Done | Already migrated |
| Valentine's | `valentines.md` | Menu | ✅ Done | Already migrated |
| Christmas | `christmas.md` | Menu | Low | 11 menu items, some sold_out |
| Thanksgiving | `thanksgiving.html` | Menu + Form | Medium | Has Google Form embed |
| Easter | `easter.md` | Menu | Low | 3 menu items |
| Mother's Day | `mothersday.md` | Menu | Low | 1 menu item |
| Halloween | `halloween.md` | Menu | Low | 1 menu item |
| Cookies | `cookies.md` | Menu | Low | 6 menu items, has link field |
| Sugar Cookies | `cookies/sugar.md` | Menu | Low | Nested route |
| Cakes | `cakes.md` | Menu | Low | 2 menu items |
| Gifts | `gifts.md` | Menu | Low | 2 menu items |
| Catering | `catering.md` | Menu | Low | 3 items, no prices |
| Holidays Hub | `holidays.md` | Category Grid | Medium | Links to seasonal pages |
| Menu Hub | `menu.md` | Category Grid | Medium | Links to all menus |
| Gallery | `gallery.md` | Interactive | High | Filter, lightbox, JS |
| Contact | `contact.md` | Info + FAQ | Medium | Cards layout |
| About | `aboutme.md` | Info | Low | Simple content |
| Inquiry | `inquiry.md` | Forms | High | 4 form types, JS |
| Order | `order.md` | Hub | Medium | Multiple options |
| 404 | `404.html` | Error | Low | Simple |
| Cake 1-3 | `cake[1-3].md` | Legacy? | Low | Check if used |

### Content Patterns Identified

1. **Menu Pages** (12 pages): YAML `menu_items` array → `MenuGrid` component
2. **Category Hubs** (3 pages): Grid of cards linking to other pages
3. **Info Pages** (2 pages): Static content with styled sections
4. **Interactive Pages** (2 pages): JavaScript-heavy (gallery, inquiry)
5. **Form Pages** (2 pages): Google Form embeds or custom forms

---

## 🏗️ Astro Architecture Plan

### Directory Structure

```
astro-prototype/
├── src/
│   ├── layouts/
│   │   └── BaseLayout.astro          # ✅ Done - Nav, footer, global CSS
│   │
│   ├── components/
│   │   ├── FeaturedSection.astro     # ✅ Done
│   │   ├── CategoryCards.astro       # ✅ Done
│   │   ├── HomeCTA.astro             # ✅ Done
│   │   ├── MenuGrid.astro            # ✅ Done - Needs link support
│   │   ├── ContactCard.astro         # NEW - Reusable contact card
│   │   ├── FAQSection.astro          # NEW - FAQ accordion
│   │   ├── GoogleFormEmbed.astro     # NEW - Form wrapper
│   │   ├── GalleryGrid.astro         # NEW - Photo gallery
│   │   ├── Lightbox.astro            # NEW - Image lightbox
│   │   ├── InquirySelector.astro     # NEW - Form type selector
│   │   └── PageHeader.astro          # NEW - Hero/header section
│   │
│   ├── pages/
│   │   ├── index.astro               # ✅ Done
│   │   ├── valentines.astro          # ✅ Done
│   │   ├── christmas.astro           # Menu page
│   │   ├── thanksgiving.astro        # Menu + form
│   │   ├── easter.astro              # Menu page
│   │   ├── mothersday.astro          # Menu page
│   │   ├── halloween.astro           # Menu page
│   │   ├── holidays.astro            # Category hub
│   │   ├── menu.astro                # Category hub
│   │   ├── cookies/
│   │   │   ├── index.astro           # Cookie menu
│   │   │   └── sugar.astro           # Sugar cookie submenu
│   │   ├── cakes.astro               # Cake menu
│   │   ├── gifts.astro               # Gifts menu
│   │   ├── catering.astro            # Catering menu
│   │   ├── gallery.astro             # Photo gallery
│   │   ├── contact.astro             # Contact info
│   │   ├── about.astro               # About page
│   │   ├── inquiry.astro             # Order forms
│   │   ├── order.astro               # Order hub
│   │   └── 404.astro                 # Error page
│   │
│   ├── data/
│   │   └── menus/                    # Extracted menu data (optional)
│   │       ├── christmas.json
│   │       ├── cookies.json
│   │       └── ...
│   │
│   └── styles/
│       └── global.css                # Extracted from BaseLayout (optional)
│
├── public/
│   ├── assets/                       # Junction to Jekyll assets (dev only)
│   ├── favicon.ico
│   └── CNAME                         # GitHub Pages custom domain
│
├── astro.config.mjs
└── package.json
```

### Component Hierarchy

```
BaseLayout
├── Skip Link (accessibility)
├── Header
│   └── Nav (brand, links, mobile toggle)
├── Main Content
│   └── <slot /> (page content)
└── Footer
    └── Social links, copyright

Menu Pages use:
├── PageHeader (title, subtitle, hero image)
├── MenuGrid (items with sold_out, link support)
└── CTASection (order now)

Gallery Page uses:
├── FilterButtons
├── GalleryGrid
│   └── GalleryItem (with overlay)
└── Lightbox (modal, nav)
```

---

## 📋 Migration Tasks

### Phase 2B.1: Enhance Existing Components (30 min)
- [ ] Add `link` support to `MenuGrid.astro` (for cookies → sugar link)
- [ ] Create `PageHeader.astro` for consistent page headers
- [ ] Create `CTASection.astro` (generic CTA block)
- [ ] Test responsive behavior

### Phase 2B.2: Migrate Simple Menu Pages (45 min)
- [ ] `christmas.astro` - Large menu, sold_out items
- [ ] `easter.astro` - 3 items
- [ ] `mothersday.astro` - 1 item
- [ ] `halloween.astro` - 1 item
- [ ] `cookies/index.astro` - 6 items with link
- [ ] `cookies/sugar.astro` - Nested route
- [ ] `cakes.astro` - 2 items
- [ ] `gifts.astro` - 2 items
- [ ] `catering.astro` - 3 items, no prices

### Phase 2B.3: Migrate Category Hub Pages (30 min)
- [ ] `holidays.astro` - Links to 6 seasonal menus
- [ ] `menu.astro` - Links to all menu categories

### Phase 2B.4: Migrate Info Pages (30 min)
- [ ] `contact.astro` - Cards + FAQ
- [ ] `about.astro` - About section
- [ ] `404.astro` - Error page

### Phase 2B.5: Migrate Complex Pages (60 min)
- [ ] `gallery.astro` - Filter, grid, lightbox (most complex)
- [ ] `inquiry.astro` - Form selector, 4 form types
- [ ] `order.astro` - Hub with options
- [ ] `thanksgiving.astro` - Menu + Google Form embed

### Phase 2B.6: Setup Deployment (30 min)
- [ ] Create GitHub Actions workflow for Astro
- [ ] Configure `astro.config.mjs` for static output
- [ ] Add CNAME file for custom domain
- [ ] Test deployment to GitHub Pages

### Phase 2B.7: Cleanup & Documentation (30 min)
- [ ] Remove Jekyll files from root (or move to `_jekyll-archive/`)
- [ ] Move Astro files to root
- [ ] Update README.md
- [ ] Update copilot-instructions.md
- [ ] Final testing

---

## 🔧 Technical Decisions

### 1. Image Handling Strategy

**Option A: Keep images as-is (faster migration)**
- Use existing `/assets/img/` structure
- Copy to `public/assets/img/`
- Add lazy loading via standard `loading="lazy"`
- ✅ **Recommended for initial migration**

**Option B: Use Astro Image (future enhancement)**
- Move images to `src/assets/`
- Use `import` and `<Image />` component
- Automatic WebP, responsive sizes
- 🔄 **Phase 3 enhancement**

### 2. Form Handling

**Google Forms** (Thanksgiving): Keep as iframe embed
**Custom Forms** (Inquiry): 
- Option A: Set up Formspree (recommended)
- Option B: Use Netlify Forms
- Option C: Keep as visual-only for now

### 3. Gallery JavaScript

**Approach**: Keep existing vanilla JS logic
- Filter functionality
- Lightbox modal
- Move to `<script>` in component or external file
- No framework needed for this complexity

### 4. Styling Approach

**Keep CSS in BaseLayout** for now
- Global styles in `<style is:global>`
- Component-scoped styles in individual components
- Future: Extract to `src/styles/global.css`

### 5. Data Management

**Inline data** (current approach):
```astro
const menuItems = [
  { name: "Cookie", price: "$3", ... }
];
```

**JSON files** (future option):
```astro
import christmas from '../data/menus/christmas.json';
```
- Better for large menus
- Easier content management
- Consider for Phase 3

---

## ⚡ Quick Wins First

### Fastest Path to Complete Migration:

1. **Batch similar pages** - All simple menu pages can use same pattern
2. **Copy-paste menu data** - YAML → JS array is mechanical
3. **Reuse components** - `MenuGrid` handles 90% of pages
4. **Gallery last** - Most complex, save for end
5. **Forms can wait** - Keep as visual placeholders initially

### Pages by Effort:

| Effort | Pages | Time |
|--------|-------|------|
| 5 min each | easter, mothersday, halloween, sugar, cakes, gifts, catering | 35 min |
| 10 min each | christmas, cookies, holidays, menu, about, 404 | 60 min |
| 20 min each | contact, order, thanksgiving | 60 min |
| 45 min each | gallery, inquiry | 90 min |
| **Total** | **22 pages** | **~4 hours** |

---

## ✅ Definition of Done

### Per-Page Checklist:
- [ ] Page renders correctly
- [ ] All links work
- [ ] Images load with lazy loading
- [ ] Mobile responsive
- [ ] Matches Jekyll version visually

### Migration Complete When:
- [ ] All 22 pages migrated
- [ ] GitHub Actions deployment working
- [ ] Custom domain (thymelesstreatsbakery.com) pointing to Astro
- [ ] Jekyll files archived or removed
- [ ] Documentation updated

---

## 🚀 Ready to Begin?

Say **"Start Phase 2B.1"** to begin enhancing components, or **"Start Phase 2B.2"** to jump into migrating menu pages.

---

*This plan will be updated as migration progresses.*
