# Phase 2B: Jekyll to Astro Migration Plan

> **Created**: January 30, 2026  
> **Updated**: January 30, 2026 (Added improvement opportunities)  
> **Purpose**: Complete migration with improvements, not just 1:1 conversion  
> **Estimated Total Time**: 6-8 hours with AI assistance  
> **Branch**: `feature/astro-prototype`

---

## 🎯 Migration Philosophy

> **"Don't just convert—improve."**

The original site was built by a junior developer. This migration is an opportunity to:
1. Fix architectural issues (inline styles, repeated code)
2. Improve UX patterns (navigation, forms, CTAs)
3. Consolidate redundant pages
4. Create a maintainable component library
5. Optimize for the 95% mobile audience

---

## 🔍 Issues Identified in Original Codebase

### Code Quality Issues

| Issue | Impact | Solution |
|-------|--------|----------|
| **Massive inline styles** | `order.md` has 150+ inline style attributes | Extract to components |
| **368-line inquiry.md** | Unmaintainable, forms never worked | Simplify to single form |
| **Gallery JS in markdown** | 130 lines of JS in `gallery.md` | Move to proper component |
| **Duplicate card patterns** | Same card HTML in 8+ places | Create `<Card>` component |
| **Inconsistent spacing** | Random px values everywhere | Use spacing scale |
| **Non-functional forms** | Formspree placeholders never set up | Use Google Forms consistently |

### UX Issues

| Issue | Impact | Solution |
|-------|--------|----------|
| **Too many order paths** | `/order/`, `/inquiry/`, menu "Order This Item" | Single clear order flow |
| **Confusing menu structure** | `/menu/` vs `/holidays/` vs individual menus | Cleaner hierarchy |
| **4 different form types** | Seasonal, custom cookies, custom cake, gifts | Simplify: 1 universal form |
| **Redundant pages** | `cake1.md`, `cake2.md`, `cake3.md` (legacy?) | Remove if unused |
| **Order page duplicates inquiry** | Two pages doing same thing | Consolidate to one |

### Information Architecture Issues

| Current | Problem | Proposed |
|---------|---------|----------|
| `/menu/` → `/holidays/` | Confusing hierarchy | `/menu/` as hub, holidays as section |
| `/order/` + `/inquiry/` | Duplicate functionality | Single `/order/` page |
| `/cookies/sugar/` | Unnecessary nesting | Flatten or remove |
| `/catering/` | No prices, unclear purpose | Add to main menu or remove |

---

## 🏗️ Revised Architecture

### Simplified Page Structure (17 pages, down from 22+)

```
src/pages/
├── index.astro              # Homepage
├── menu/
│   ├── index.astro          # All menus hub (replaces /menu/ AND /holidays/)
│   ├── valentines.astro     # Current season featured
│   ├── christmas.astro
│   ├── easter.astro
│   ├── thanksgiving.astro
│   ├── mothersday.astro
│   ├── halloween.astro
│   ├── cookies.astro        # Year-round
│   ├── cakes.astro          # Year-round
│   └── gifts.astro          # Year-round (includes catering items)
├── gallery.astro
├── order.astro              # Single order page (replaces /inquiry/)
├── contact.astro
├── about.astro
└── 404.astro
```

### Component Library

```
src/components/
├── layout/
│   ├── BaseLayout.astro     # ✅ Done
│   ├── Navbar.astro         # Extract from BaseLayout
│   └── Footer.astro         # Extract from BaseLayout
│
├── ui/
│   ├── Button.astro         # Primary, secondary, outline variants
│   ├── Card.astro           # Generic card with slots
│   ├── PageHeader.astro     # Title, subtitle, optional hero
│   └── CTASection.astro     # Reusable call-to-action block
│
├── menu/
│   ├── MenuGrid.astro       # ✅ Done (needs link support)
│   ├── MenuItem.astro       # Extract from MenuGrid
│   ├── CategoryCard.astro   # For menu hub links
│   └── SeasonBadge.astro    # "Now Available" / "Coming Soon"
│
├── gallery/
│   ├── GalleryGrid.astro    # Filter + grid
│   ├── GalleryItem.astro    # Single image with overlay
│   └── Lightbox.astro       # Modal viewer
│
├── home/
│   ├── FeaturedSection.astro # ✅ Done
│   ├── CategoryCards.astro   # ✅ Done
│   └── HomeCTA.astro         # ✅ Done
│
└── forms/
    └── GoogleFormEmbed.astro # Reusable form wrapper
```

### Data Files

```
src/data/
├── menus/
│   ├── valentines.ts        # Menu items with types
│   ├── christmas.ts
│   ├── cookies.ts
│   └── ...
├── gallery.ts               # Gallery images + categories
└── navigation.ts            # Nav links, social links
```

---

## 📋 Revised Migration Tasks

### Phase 2B.1: Foundation & Components (1 hour) ✅ COMPLETE

**Goal**: Build the component library before migrating pages.

- [x] Create `Button.astro` with variants (primary, secondary, outline)
- [x] Create `Card.astro` with slots (icon, title, description, action)
- [x] Create `PageHeader.astro` (title, subtitle, optional hero image)
- [x] Create `CTASection.astro` (background, title, buttons)
- [x] Create `GoogleFormEmbed.astro` (iframe wrapper with loading state)
- [x] Add `link` support to `MenuGrid.astro`
- [x] Extract `Navbar.astro` and `Footer.astro` from BaseLayout

### Phase 2B.2: Data Layer (30 min) ✅ COMPLETE

**Goal**: Move content out of pages into typed data files.

- [x] Create TypeScript interfaces for MenuItem, GalleryImage
- [x] Convert Valentine's menu to `src/data/menus/valentines.ts`
- [x] Convert Christmas menu to `src/data/menus/christmas.ts`
- [x] Convert all seasonal menus to data files
- [x] Convert year-round menus (cookies, cakes, gifts)
- [x] Create `src/data/gallery.ts` from gallery.md JS array
- [x] Create `src/data/navigation.ts` for nav/social links

### Phase 2B.3: Core Pages (1 hour) ✅ COMPLETE

**Goal**: Migrate core pages using components and data files.

- [x] Update `index.astro` to use data layer
- [x] Create `about.astro` using aboutContent from data
- [x] Create `contact.astro` with contactMethods, faqItems
- [x] Create `holidays.astro` as menu hub (seasonal/year-round sections)
- [x] Create `gallery.astro` with filtering and lightbox

### Phase 2B.4: Menu Pages (45 min) ✅ COMPLETE

**Goal**: All menu pages using shared MenuLayout.

- [x] Create `MenuLayout.astro` for consistent structure
- [x] Refactor `valentines.astro` to use MenuLayout
- [x] Create `christmas.astro`
- [x] Create `easter.astro`
- [x] Create `thanksgiving.astro`
- [x] Create `mothersday.astro`
- [x] Create `halloween.astro`
- [x] Create `cookies.astro`
- [x] Create `cakes.astro`
- [x] Create `gifts.astro`

### Phase 2B.5: Order Flow (30 min) ✅ COMPLETE

**Goal**: Clean order experience with Google Form.

- [x] Create `order.astro` - Combined order page with embedded Google Form
- [x] Add order options cards linking to menus
- [x] Add "What Happens Next?" process steps
- [x] Dynamic featured menu banner

### Phase 2B.6: Gallery Enhancement (30 min) ✅ COMPLETE

**Goal**: Polish the gallery experience.

- [x] Image captions on hover overlay
- [x] Image counter in lightbox (1 / 41)
- [x] Loading spinner during image load
- [x] Touch/swipe support for mobile
- [x] Infinite looping navigation
- [x] Image preloading (adjacent)
- [x] Focus trap for accessibility
- [x] Semantic buttons instead of divs
- [x] Dynamic filter count display

### Phase 2B.7: Forms Integration (30 min) ✅ COMPLETE

**Goal**: Working order forms using Google Forms.

- [x] Order page with embedded Google Form (Task 2B.5)
- [x] GoogleFormEmbed component with loading state

### Phase 2B.8: Deployment Setup (30 min) ✅ COMPLETE

**Goal**: GitHub Actions workflow for deployment.

- [x] Create `.github/workflows/astro.yml`
- [x] Configure `astro.config.mjs` with site URL
- [x] Add `@astrojs/sitemap` integration
- [x] Add `CNAME` to public folder
- [x] Add `robots.txt`
- [x] Test build with all deployment files

### Phase 2B.9: Final Polish & Cutover (30 min)

- [ ] Move Astro files from `astro-prototype/` to root
- [ ] Archive Jekyll files to `_jekyll-archive/` (or delete)
- [ ] Update `README.md`
- [ ] Final testing on all pages

---

## 🎯 Key Improvements

### 1. Simplified Order Flow

**Before**: 3 confusing paths
- `/order/` - Hub with 3 options and inline styles
- `/inquiry/` - 4 non-functional forms (368 lines)
- Menu pages - "Order This Item" buttons

**After**: 1 clear path
- `/order/` - Simple page: "View our menus and contact us to order!"
- Each menu page links to Google Form OR contact
- Remove dead `/inquiry/` complexity

### 2. Unified Menu Hub

**Before**: Confusing navigation
- `/menu/` - Category cards (seasonal, cookies, cakes, gifts)
- `/holidays/` - Different category cards (thanksgiving, christmas, etc.)
- Overlap and confusion

**After**: Single hub
- `/menu/` - All menus in one place, clearly organized
- Sections: "Current Season", "Year-Round Favorites"
- No separate `/holidays/` page needed

### 3. Component-Based Architecture

**Before**: Copy-paste HTML
```html
<!-- Same card pattern repeated 15+ times -->
<div style="background: white; padding: 2rem; border-radius: 12px; box-shadow: ...">
```

**After**: Reusable components
```astro
<Card>
  <h3 slot="title">Title</h3>
  <p slot="description">Description</p>
  <Button slot="action">Action</Button>
</Card>
```

### 4. Data-Driven Content

**Before**: Content buried in HTML
```html
<script>
const galleryImages = [
  { src: '/assets/img/...', category: 'cookies', title: 'Decorated Cookies' },
  // 40 more items inline
];
</script>
```

**After**: Typed data files
```typescript
// src/data/gallery.ts
export const galleryImages: GalleryImage[] = [
  { src: '/images/gallery/cookies.jpg', category: 'cookies', alt: '...' },
];
```

### 5. Mobile-First Polish

- Sticky "Order Now" bar on menu pages
- Larger touch targets (already improved in Phase 1)
- Thumb-zone navigation
- Fast image loading with lazy load + blur placeholder

---

## ⏱️ Time Estimates (Revised)

| Phase | Tasks | Time |
|-------|-------|------|
| 2B.1 | Foundation & Components | 1 hour |
| 2B.2 | Data Layer | 30 min |
| 2B.3 | Menu Pages (10) | 1 hour |
| 2B.4 | Gallery | 45 min |
| 2B.5 | Core Pages (4) | 45 min |
| 2B.6 | Homepage Refinement | 30 min |
| 2B.7 | Deployment Setup | 30 min |
| 2B.8 | Cleanup & Migration | 30 min |
| **Total** | | **~6 hours** |

---

## ✅ Definition of Done

### Per-Page Checklist:
- [ ] No inline styles
- [ ] Uses shared components
- [ ] Data from TypeScript files
- [ ] Mobile-responsive (test 375px)
- [ ] Accessible (alt text, ARIA labels)
- [ ] Links work
- [ ] Matches or improves Jekyll version

### Migration Complete When:
- [ ] All pages migrated and improved
- [ ] GitHub Actions deployment working
- [ ] Custom domain pointing to Astro
- [ ] Jekyll files archived
- [ ] Documentation updated
- [ ] Lighthouse scores > 90

---

## 🚀 Ready to Begin?

Say **"Start Phase 2B.1"** to build the component foundation.

---

*This plan prioritizes improvements over 1:1 conversion.*

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
