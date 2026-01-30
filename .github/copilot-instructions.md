# Thymeless Treats Bakery — AI Development Guide# Thymeless Treats Bakery — AI Development Guide (Jekyll Legacy)



> **Last Updated**: January 30, 2026  > **Last Updated**: January 30, 2026  

> **Framework**: Astro (migrating from Jekyll)  > **Status**: ⚠️ **LEGACY DOCUMENT** — Site is migrating to Astro  

> **Purpose**: Comprehensive guide for AI-assisted development  > **Purpose**: Historical reference for Jekyll-based site  

> **Audience**: GitHub Copilot, Claude, and future AI assistants> **Audience**: GitHub Copilot, Claude, and future AI assistants working on this codebase



------



## 🎯 Project Vision## 🚨 Important: Migration in Progress



### The Business**The site is being migrated from Jekyll to Astro.** For active development, see:

Thymeless Treats is a **seasonal cottage bakery** in North Ridgeville, Ohio. The website exists to:- **📄 `.github/copilot-instructions-astro.md`** — Primary development guide

- **📄 `astro-prototype/MIGRATION_PLAN.md`** — Detailed migration tasks

1. **Showcase beautiful work** — Let stunning product photos tell the story- **📄 `.github/MODERNIZATION-WORKLOG.md`** — Progress tracker

2. **Feature seasonal menus** — Valentine's, Easter, Thanksgiving, Christmas

3. **Accept custom inquiries** — Birthday cakes, event cookies year-roundThis document is retained for:

4. **Build trust** — Professional presentation, personal touch- Historical context about design decisions

- Reference during migration (content, color palette, voice & tone)

### Design Philosophy: "Joanna Gaines Vibes"- Fallback if Astro migration needs to be reverted



> **"Let the photos do the talking."**---



The aesthetic should feel like a warm, modern farmhouse kitchen — **elegant but approachable**, **professional but personal**.## Project Overview



| Principle | Implementation |This **was** a Jekyll-based bakery e-commerce website built on the Beautiful Jekyll theme (v6.0.1), hosted on GitHub Pages. The site showcases seasonal menus, products, and inquiry forms for Thymeless Treats Bakery.

|-----------|---------------|

| **Image-forward** | Large hero photos, minimal text overlay |**Repository**: m0ranwad/m0ranwad.github.io  

| **Clean breathing room** | Generous whitespace, intentional padding |**Active Branch**: `feature/astro-prototype` (Astro migration)  

| **Mobile-first** | 95% of customers browse on phones |**Legacy Branch**: `redesign-joanna-gaines` (Jekyll, modern farmhouse redesign)  

| **Instagram aesthetic** | Site should feel like a curated feed |**Production Branch**: `theme/beautiful-jekyll` (current live site)  

| **Sage green brand** | #8FA378 as signature color throughout |**Live URL**: thymelesstreatsbakery.com



### Privacy Considerations---

- ❌ No specific addresses

- ❌ No full names unless provided##  Project Vision & Philosophy

- ✅ "Local delivery available"

- ✅ "Handcrafted," "baked fresh to order"### The Business Reality

Thymeless Treats is a **seasonal cottage bakery** that operates sporadically throughout the year. The website's primary job is to:

---

1. **Showcase beautiful work**  Let the photos tell the story (Instagram-era visual marketing)

## 🛠️ Tech Stack2. **Feature one seasonal menu at a time**  Valentine's Day, Easter, Thanksgiving, Christmas, etc.

3. **Accept custom inquiries**  Birthday cakes, event cookies year-round

| Component | Technology | Notes |4. **Build trust through visually stunning presentation**

|-----------|------------|-------|

| **Framework** | Astro 5.x | Static site generator, component-based |### Design Philosophy: "Joanna Gaines Vibes"

| **Styling** | Scoped CSS | Per-component + global design tokens |The aesthetic should feel like a warm, modern farmhouse kitchen  **elegant but approachable**, **professional but personal**. Think:

| **Deployment** | GitHub Pages | Via GitHub Actions |- Clean white space with intentional breathing room

| **Forms** | Google Forms | Embedded iframes |- Sage green (#8FA378) as the signature brand color

| **Images** | Astro Image | Auto WebP, responsive sizes |- Beautiful photography as the hero, not the design

| **Domain** | thymelesstreatsbakery.com | Custom domain via CNAME |- Mobile-first, thumb-friendly navigation

- Minimal text  let images do the storytelling

### Repository Info

- **Repository**: m0ranwad/m0ranwad.github.io  ### Privacy Considerations

- **Active Branch**: `feature/astro-prototype`The bakery owner values privacy. When writing content:

- **Working Directory**: `astro-prototype/`-  Don't include specific addresses or location details

- **Legacy Jekyll**: Root directory (being replaced)-  Don't include full names unless explicitly provided

-  Keep the personal touch ("handcrafted," "baked fresh to order")

----  Reference general service area if needed ("local delivery available")



## 📁 Project Structure---



```##  Current State (January 2026)

astro-prototype/

├── src/### Tech Stack

│   ├── layouts/| Component | Current | Notes |

│   │   └── BaseLayout.astro      # Nav, footer, global styles|-----------|---------|-------|

│   │| Framework | Jekyll 3.9.3 | Static site generator, GitHub Pages compatible |

│   ├── components/| Theme | Beautiful Jekyll 6.0.1 | Bootstrap 4.4.1 base |

│   │   ├── FeaturedSection.astro| CSS | `optimized-2025.css` (~1900 lines) | Single custom stylesheet |

│   │   ├── CategoryCards.astro| Hosting | GitHub Pages | Auto-deploys from `theme/beautiful-jekyll` branch |

│   │   ├── HomeCTA.astro| Forms | Google Forms (embedded iframes) | No backend, manual order processing |

│   │   └── MenuGrid.astro| Analytics | Google Analytics 4 (G-9SVD45RN18) | Basic tracking |

│   │| Domain | thymelesstreatsbakery.com | Custom domain via CNAME |

│   ├── pages/

│   │   ├── index.astro           # Homepage### Branch Strategy

│   │   ├── valentines.astro      # Current featured season```

│   │   └── ...                   # More pages as migratedtheme/beautiful-jekyll   Production (live site)

│   │     redesign-joanna-gaines   Current development branch

│   ├── data/```

│   │   └── menus/                # Menu data as TypeScript

│   │       └── valentines.ts### Design System

│   │**Color Palette**:

│   └── styles/- Sage green: #8FA378 (primary brand color)

│       └── global.css            # Design tokens only- Warm cream: #FBF8F3 (backgrounds)

│- Charcoal: #2C2C2C (headings)

├── public/- Warm gray: #6B6B6B (body text)

│   └── assets/                   # Junction to ../assets/img- Light sage: #E8EFE3 (cards, subtle backgrounds)

│

├── astro.config.mjs**Typography**:

├── package.json- Headings: Cormorant Garamond (elegant serif)

├── MIGRATION_PLAN.md             # Detailed migration tasks- Body: Inter (clean sans-serif)

└── COMPARISON.md                 # Jekyll vs Astro analysis- Accents: Caveat (handwritten feel)

```

---

---

##  Architecture

## 🎨 Design System

### File Structure

### Color Palette```

m0ranwad.github.io/

```css _config.yml              # Site settings, navbar, colors

:root { index.html               # Homepage (featured menu + category cards)

  /* Brand Colors */ gallery.md               # Photo gallery with filters + lightbox

  --sage: #8FA378; inquiry.md               # Order form hub (4 inquiry types)

  --sage-dark: #607A4D; contact.md               # Contact info + FAQ

  --sage-light: #E8EFE3; holidays.md              # Seasonal menu hub

   valentines.md            # Current featured menu

  /* Neutrals */ christmas.md, easter.md  # Holiday menus (YAML data)

  --cream: #FBF8F3; cookies.md, cakes.md     # Year-round menus

  --white: #FFFFFF; aboutme.md               # About page

  --charcoal: #2C2C2C; _layouts/

  --warm-gray: #6B6B63;    base.html            # HTML skeleton

      page.html            # Standard content pages

  /* Accents */    home.html            # Homepage wrapper

  --terracotta: #D4806F;    menu.html            # Menu item card renderer 

  --gold: #D4A574; _includes/               # Partials (nav, footer, etc.)

} assets/

```    css/optimized-2025.css  # Main custom styles 

    img/                    # All product photos

### Typography .github/

     copilot-instructions.md  # This file

| Element | Font | Weight | Size |     MODERNIZATION-WORKLOG.md # Task tracker

|---------|------|--------|------|```

| Headings | Cormorant Garamond | 600-700 | clamp() responsive |

| Body | Inter | 400-500 | 16-17px |### Content-Driven Menu System

| Accents | Caveat | 400-700 | 1.25em |The site uses a **data-driven menu pattern** where product pages are markdown files with YAML front matter defining menu items.



### Spacing Scale**Example** (`valentines.md`):

```yaml

```css---

--space-xs: 0.5rem;   /* 8px */layout: menu

--space-sm: 0.75rem;  /* 12px */title: Valentine's Menu

--space-md: 1rem;     /* 16px */subtitle: Sweet treats to celebrate love

--space-lg: 1.5rem;   /* 24px */permalink: /valentines/

--space-xl: 2rem;     /* 32px */menu_items:

--space-2xl: 3rem;    /* 48px */  - name: Lemon Raspberry

--space-3xl: 4rem;    /* 64px */    image: /assets/img/valentines/lemonRaspberry.png

```    description: A light lemony cookie covered with swirls of raspberry and vanilla buttercream.

    price: $3.50 per cookie / $38 per dozen

### Component Patterns  - name: Taster's Box

    image: /assets/img/valentines/tastersBox.jpg

**Cards**: Rounded corners (16px), soft shadows, hover lift      description: A great way to try a little bit of everything.

**Buttons**: Min 44px touch target, sage gradient for primary      price: $12 per box

**Images**: Lazy loading, aspect-ratio containers, object-fit cover    sold_out: true  # Optional: grays out item

---

---```



## 📝 Content PatternsThe `menu.html` layout processes this data to render product cards. The `sold_out` flag triggers CSS styling.



### Menu Data Structure### CSS Architecture

All custom styles live in `assets/css/optimized-2025.css`. Key sections:

```typescript- **Base variables** (colors, fonts)

// src/data/menus/valentines.ts- **Navigation** (navbar, mobile menu)

export const valentinesMenu = {- **Homepage** (.featured-section, .homepage-cta, .homepage-category-cards)

  title: "Valentine's Menu",- **Contact page** (.contact-container, .contact-card, .faq-section)

  subtitle: "Sweet treats to celebrate love",- **About page** (.about-container, .about-cards-grid)

  heroImage: "/assets/img/valentines/menu1.jpg",- **Inquiry page** (.inquiry-type-selector, .inquiry-card, .form-field)

  items: [- **Menu items** (.menu-item-card, .sold-out)

    {- **Generic components** (.page-intro-box, .content-card, .cta-section)

      name: "Lemon Raspberry",

      image: "/assets/img/valentines/lemonRaspberry.png",---

      description: "Light lemony cookie with raspberry and vanilla buttercream.",

      price: "$3.50 each / $38 dozen",##  Mobile-First Priority

      soldOut: false,

    },**95% of bakery customers browse on mobile.** Design decisions should be tested on phone first.

  ],

};### Guidelines

```- Touch targets: Minimum 44x44px for buttons

- Thumb zone: Important actions in bottom 2/3 of screen

### Component Props Pattern- No hover-dependent UI: Everything works with tap

- Fast image loading: Consider lazy loading

```astro- Clear CTAs: "Order Now" button always visible

---

// MenuGrid.astro---

interface Props {

  items: MenuItem[];##  Common Development Tasks

  columns?: 2 | 3 | 4;

}### Update Featured Season

const { items, columns = 3 } = Astro.props;Edit `index.html`, find the `.featured-section` and update:

---```html

<a href="{{ '/valentines/' | relative_url }}" class="featured-menu-link">

<div class="menu-grid" style={`--columns: ${columns}`}>  <img src="/assets/img/valentines/menu1.jpg" alt="Valentine's Day Menu">

  {items.map(item => <MenuItem {...item} />)}</a>

</div>```

```

### Add New Seasonal Menu

---1. Create `seasonname.md` in root with `layout: menu`

2. Add YAML front matter with `menu_items` array

## 🚫 Anti-Patterns to Avoid3. Add photos to `/assets/img/seasonname/`

4. Link from `holidays.md`

### From the Original Jekyll Site

### Mark Items Sold Out

| Issue | Example | Better Approach |Add `sold_out: true` to any menu item in YAML front matter.

|-------|---------|-----------------|

| **Inline styles** | `style="font-size: 3.5rem;"` | Use component CSS |### Add CSS Styles

| **Repeated code** | Same card in 8 files | Create `<Card>` component |All custom styles go in `assets/css/optimized-2025.css`. Use semantic class names and follow existing patterns.

| **Hardcoded data** | Array in `<script>` tag | Move to `src/data/` |

| **Mixed concerns** | 368-line form page | Split into components |### Run Locally

| **Inconsistent spacing** | Random px values | Use spacing variables |```powershell

cd c:\git\m0ranwad.github.io

### Code Quality Standardsbundle install          # First time only

bundle exec jekyll serve

```astro# Open http://localhost:4000

<!-- ❌ BAD: Inline styles -->```

<div style="background: white; padding: 2rem; border-radius: 12px;">

  <h3 style="font-family: 'Cormorant Garamond';">Title</h3>### Deploy

</div>```powershell

git add .

<!-- ✅ GOOD: Scoped styles -->git commit -m "Descriptive message"

<div class="card">git push origin redesign-joanna-gaines

  <h3>Title</h3>

</div># When ready for production:

git checkout theme/beautiful-jekyll

<style>git merge redesign-joanna-gaines

  .card {git push origin theme/beautiful-jekyll

    background: var(--white);```

    padding: var(--space-xl);

    border-radius: 12px;---

  }

  h3 {##  Technical Reference

    font-family: var(--font-heading);

  }### Key Files

</style>| Task | File(s) |

```|------|---------|

| Site settings, nav links | `_config.yml` |

---| Homepage layout | `index.html` |

| Menu item rendering | `_layouts/menu.html` |

## 🔄 Common Tasks| Global styles | `assets/css/optimized-2025.css` |

| Navigation | `_includes/nav.html` |

### Run Development Server| Photo gallery | `gallery.md` |



```powershell### Styling Conventions

cd c:\git\m0ranwad.github.io\astro-prototype- Use CSS classes, NOT inline styles

npm run dev- Use CSS variables: `var(--sage)`, `var(--charcoal)`, etc.

# Open http://localhost:4321- Add responsive breakpoints at 768px

```- Follow BEM-like naming: `.contact-card`, `.about-intro`



### Build for Production### Image Guidelines

- Format: JPG for photos, PNG for graphics

```powershell- Size: Max 1200px wide for full-width, 600px for cards

npm run build    # Creates dist/ folder- Naming: Lowercase, no spaces (`valentines-heart-cookies.jpg`)

npm run preview  # Test production build locally- Location: `/assets/img/[category]/`

```

---

### Update Featured Season

##  Content Voice & Tone

Edit `src/pages/index.astro`:

```astro- **Warm**: "Let's create something sweet together"

<FeaturedSection- **Personal**: "Handcrafted treats" not "Products"

  title="Featured This Season"- **Action-oriented**: "Order Now" not "Submit Inquiry"

  menuLink="/valentines/"- **Confident**: "Beautiful custom cakes" not "We try to make nice cakes"

  menuImage="/assets/img/valentines/menu1.jpg"

  ctaText="Order Valentine's Treats"---

/>

```##  Modernization Progress



### Mark Items Sold OutSee `.github/MODERNIZATION-WORKLOG.md` for current task status.



```typescript**Current Progress** (January 29, 2026):

// In menu data file- ✅ Task 1.1: File Cleanup (27 files deleted)

{- ✅ Task 1.2: Valentine's Day Featured Menu

  name: "Grinch Cookies",- ✅ Task 1.3: CSS Consolidation Sprint (552 lines extracted)

  soldOut: true,  // Adds badge, grays out card- ✅ Task 1.4: Image Optimization Audit (lazy loading added)

}- ✅ Task 1.5: Mobile Touch Target Fixes (gallery styles migrated)

```- ⚪ Task 1.6-1.8: Remaining Phase 1 tasks

- ⚪ Phase 2: Framework Evaluation

### Add New Page- ⚪ Phase 3: Enhanced Features



1. Create `src/pages/newpage.astro`---

2. Import `BaseLayout` and wrap content

3. Add nav link in `BaseLayout.astro`*This document should be updated whenever significant changes are made to the codebase.*


---

## 🧪 Quality Checklist

Before committing:

- [ ] No inline styles
- [ ] Images have alt text
- [ ] Touch targets ≥ 44px
- [ ] Mobile renders correctly (375px)
- [ ] All links work
- [ ] Components are reusable

---

## 📚 Related Documents

| Document | Purpose |
|----------|---------|
| `.github/MODERNIZATION-WORKLOG.md` | Task tracker, progress log |
| `astro-prototype/MIGRATION_PLAN.md` | Detailed migration phases |
| `astro-prototype/COMPARISON.md` | Jekyll vs Astro analysis |

---

## 🎯 Current Status

**Phase 2B: Astro Migration** (January 30, 2026)

Migrating from Jekyll to Astro with improvements:
- Component-based architecture
- TypeScript data layer
- Simplified page structure
- Consistent design system

See `MIGRATION_PLAN.md` for task details.

---

*Update this document as patterns evolve.*
