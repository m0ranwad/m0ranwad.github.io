# Thymeless Treats Bakery — AI Development Guide

> **Last Updated**: January 30, 2026  
> **Framework**: Astro (migrating from Jekyll)  
> **Purpose**: Comprehensive guide for AI-assisted development  
> **Audience**: GitHub Copilot, Claude, and future AI assistants

---

## 🎯 Project Vision

### The Business
Thymeless Treats is a **seasonal cottage bakery** in North Ridgeville, Ohio. The website exists to:

1. **Showcase beautiful work** — Let stunning product photos tell the story
2. **Feature seasonal menus** — Valentine's, Easter, Thanksgiving, Christmas
3. **Accept custom inquiries** — Birthday cakes, event cookies year-round
4. **Build trust** — Professional presentation, personal touch

### Design Philosophy: "Joanna Gaines Vibes"

> **"Let the photos do the talking."**

The aesthetic should feel like a warm, modern farmhouse kitchen — **elegant but approachable**, **professional but personal**.

| Principle | Implementation |
|-----------|---------------|
| **Image-forward** | Large hero photos, minimal text overlay |
| **Clean breathing room** | Generous whitespace, intentional padding |
| **Mobile-first** | 95% of customers browse on phones |
| **Instagram aesthetic** | Site should feel like a curated feed |
| **Sage green brand** | #8FA378 as signature color throughout |

### Privacy Considerations
- ❌ No specific addresses
- ❌ No full names unless provided
- ✅ "Local delivery available"
- ✅ "Handcrafted," "baked fresh to order"

---

## 🛠️ Tech Stack (New)

| Component | Technology | Notes |
|-----------|------------|-------|
| **Framework** | Astro 5.x | Static site generator, component-based |
| **Styling** | Scoped CSS | Per-component + global design tokens |
| **Deployment** | GitHub Pages | Via GitHub Actions |
| **Forms** | Google Forms | Embedded iframes (Phase 1) |
| **Images** | Astro Image | Auto WebP, responsive sizes (Phase 2) |
| **Domain** | thymelesstreatsbakery.com | Custom domain via CNAME |

---

## 📁 Project Structure

```
thymeless-treats/
├── src/
│   ├── layouts/
│   │   └── BaseLayout.astro      # Nav, footer, global styles
│   │
│   ├── components/
│   │   ├── navigation/
│   │   │   ├── Navbar.astro
│   │   │   └── MobileMenu.astro
│   │   ├── menu/
│   │   │   ├── MenuGrid.astro    # Product card grid
│   │   │   ├── MenuItem.astro    # Individual product card
│   │   │   └── SoldOutBadge.astro
│   │   ├── gallery/
│   │   │   ├── GalleryGrid.astro
│   │   │   ├── GalleryItem.astro
│   │   │   └── Lightbox.astro
│   │   ├── forms/
│   │   │   └── GoogleFormEmbed.astro
│   │   └── ui/
│   │       ├── Button.astro
│   │       ├── Card.astro
│   │       ├── PageHeader.astro
│   │       └── CTASection.astro
│   │
│   ├── pages/
│   │   ├── index.astro           # Homepage
│   │   ├── holidays/
│   │   │   ├── index.astro       # Seasonal hub
│   │   │   ├── valentines.astro
│   │   │   ├── christmas.astro
│   │   │   ├── easter.astro
│   │   │   ├── thanksgiving.astro
│   │   │   ├── mothersday.astro
│   │   │   └── halloween.astro
│   │   ├── menu/
│   │   │   ├── index.astro       # Menu hub
│   │   │   ├── cookies.astro
│   │   │   ├── cakes.astro
│   │   │   └── gifts.astro
│   │   ├── gallery.astro
│   │   ├── contact.astro
│   │   ├── about.astro
│   │   ├── order.astro
│   │   └── 404.astro
│   │
│   ├── data/
│   │   └── menus/                # Menu data as JSON/TS
│   │       ├── valentines.ts
│   │       ├── christmas.ts
│   │       └── ...
│   │
│   └── styles/
│       └── global.css            # Design tokens only
│
├── public/
│   ├── images/                   # Organized by category
│   │   ├── valentines/
│   │   ├── christmas/
│   │   ├── gallery/
│   │   └── ...
│   ├── favicon.ico
│   └── CNAME
│
├── astro.config.mjs
└── package.json
```

---

## 🎨 Design System

### Color Palette (CSS Variables)

```css
:root {
  /* Brand Colors */
  --sage: #8FA378;
  --sage-dark: #607A4D;
  --sage-light: #E8EFE3;
  
  /* Neutrals */
  --cream: #FBF8F3;
  --white: #FFFFFF;
  --charcoal: #2C2C2C;
  --warm-gray: #6B6B63;
  
  /* Accents */
  --terracotta: #D4806F;
  --gold: #D4A574;
}
```

### Typography

| Element | Font | Weight | Size |
|---------|------|--------|------|
| Headings | Cormorant Garamond | 600-700 | clamp() responsive |
| Body | Inter | 400-500 | 16-17px |
| Accents | Caveat | 400-700 | 1.25em |

### Spacing Scale

```css
--space-xs: 0.5rem;   /* 8px */
--space-sm: 0.75rem;  /* 12px */
--space-md: 1rem;     /* 16px */
--space-lg: 1.5rem;   /* 24px */
--space-xl: 2rem;     /* 32px */
--space-2xl: 3rem;    /* 48px */
--space-3xl: 4rem;    /* 64px */
```

### Component Patterns

**Cards**: Rounded corners (16px), soft shadows, hover lift
**Buttons**: Min 44px touch target, sage gradient for primary
**Images**: Lazy loading, aspect-ratio containers, object-fit cover

---

## 📝 Content Patterns

### Menu Data Structure

```typescript
// src/data/menus/valentines.ts
export const valentinesMenu = {
  title: "Valentine's Menu",
  subtitle: "Sweet treats to celebrate love",
  heroImage: "/images/valentines/menu1.jpg",
  items: [
    {
      name: "Lemon Raspberry",
      image: "/images/valentines/lemonRaspberry.png",
      description: "Light lemony cookie with raspberry and vanilla buttercream.",
      price: "$3.50 each / $38 dozen",
      soldOut: false,
    },
    // ...
  ],
};
```

### Gallery Data Structure

```typescript
// src/data/gallery.ts
export const galleryImages = [
  {
    src: "/images/gallery/cookies-decorated.jpg",
    alt: "Decorated sugar cookies with buttercream",
    category: "cookies",
  },
  // ...
];

export const galleryCategories = ["all", "cookies", "cakes", "holiday", "events"];
```

---

## 🚫 Anti-Patterns to Avoid

### From the Original Codebase

| Issue | Example | Better Approach |
|-------|---------|-----------------|
| **Inline styles** | `style="font-size: 3.5rem; margin-bottom: 1rem;"` | Use component CSS or utility classes |
| **Repeated code** | Same card markup in 5 places | Create `<Card>` component |
| **Hardcoded data in HTML** | Gallery images array in `<script>` | Move to `src/data/gallery.ts` |
| **Mixed concerns** | Forms with 368 lines of markup | Split into components |
| **Inconsistent spacing** | Random px values | Use spacing scale variables |
| **Non-semantic HTML** | `<div>` for buttons | Use `<button>` with proper ARIA |
| **Duplicate images** | Same photo in multiple folders | Single source, reference by path |

### Code Quality Standards

```astro
<!-- ❌ BAD: Inline styles, no reusability -->
<div style="background: white; padding: 2rem; border-radius: 12px; box-shadow: 0 4px 16px rgba(0,0,0,0.08);">
  <h3 style="font-family: 'Cormorant Garamond';">Title</h3>
</div>

<!-- ✅ GOOD: Component with scoped styles -->
<Card>
  <h3>Title</h3>
</Card>

<style>
  /* Scoped to this component */
</style>
```

---

## 🔄 Common Tasks

### Update Featured Season

Edit `src/pages/index.astro`:
```astro
<FeaturedSection
  title="Featured This Season"
  menuLink="/holidays/valentines/"
  menuImage="/images/valentines/menu1.jpg"
  ctaText="Order Valentine's Menu"
/>
```

### Add New Seasonal Menu

1. Create `src/data/menus/newseason.ts` with menu items
2. Create `src/pages/holidays/newseason.astro`
3. Add images to `public/images/newseason/`
4. Link from holidays hub

### Mark Items Sold Out

```typescript
// In menu data file
{
  name: "Grinch Cookies",
  // ...
  soldOut: true,  // Adds badge, grays out, removes order button
}
```

### Run Development Server

```powershell
cd astro-prototype
npm run dev
# Open http://localhost:4321
```

### Build & Deploy

```powershell
npm run build        # Creates dist/ folder
# Push to GitHub, Actions handles deployment
```

---

## 🧪 Quality Checklist

Before committing any page:

- [ ] No inline styles (use component CSS)
- [ ] Images have descriptive alt text
- [ ] Touch targets are 44x44px minimum
- [ ] Page renders correctly on mobile (check 375px width)
- [ ] Lighthouse accessibility score > 90
- [ ] All links work
- [ ] Component is reusable where possible

---

## 📚 Related Documents

| Document | Purpose |
|----------|---------|
| `MODERNIZATION-WORKLOG.md` | Task tracker, progress log |
| `astro-prototype/MIGRATION_PLAN.md` | Detailed migration tasks |
| `astro-prototype/COMPARISON.md` | Jekyll vs Astro analysis |

---

## 🎯 Current Sprint

**Phase 2B: Astro Migration** (January 30, 2026)
- Migrating from Jekyll to Astro
- See `MIGRATION_PLAN.md` for detailed tasks
- Goal: Complete migration with improvements, not just 1:1 conversion

---

*This document should be updated as the migration progresses and patterns evolve.*
