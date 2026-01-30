# Astro vs Jekyll Comparison

> **Date**: January 30, 2026  
> **Purpose**: Phase 2 Framework Evaluation - Task 2.1

---

## Build Performance

| Metric | Jekyll | Astro | Improvement |
|--------|--------|-------|-------------|
| Build Time (full site) | 31.7s | 1.45s | **22x faster** |
| Bundle Size (HTML/CSS/JS) | 424 KB | 228 KB | **46% smaller** |
| Dev Server Start | ~5s | 354ms | **14x faster** |

## Developer Experience (DX)

### Astro Advantages
- ✅ **Component-based architecture** — Reusable `MenuGrid.astro`, `FeaturedSection.astro`, etc.
- ✅ **TypeScript support** — Built-in type checking for component props
- ✅ **Scoped CSS** — Styles automatically scoped to components (no class name conflicts)
- ✅ **Hot Module Replacement** — Instant updates in dev mode
- ✅ **Modern tooling** — Vite-powered, tree-shaking, automatic code splitting
- ✅ **Image optimization** — `@astrojs/image` can auto-generate WebP, resize images

### Jekyll Advantages
- ✅ **GitHub Pages native** — Zero-config deployment
- ✅ **Familiar** — Already using it, team knows it
- ✅ **Simpler content model** — Markdown + YAML front matter
- ✅ **No JavaScript required** — Truly static HTML output

## Migration Effort Estimate

| Task | Effort |
|------|--------|
| Migrate all pages (15+ pages) | 4-6 hours |
| Migrate CSS to components | 2-3 hours |
| Set up GitHub Actions deployment | 1 hour |
| Test all pages | 2 hours |
| **Total** | **~10-12 hours** |

## Architecture Comparison

### Jekyll (Current)
```
index.html (Jekyll template)
  └─ _layouts/home.html
      └─ _includes/*.html (partials)
          └─ CSS loaded globally
```

### Astro (Proposed)
```
src/pages/index.astro (component)
  └─ src/layouts/BaseLayout.astro
      └─ src/components/*.astro (scoped components)
          └─ CSS scoped per component
```

## Prototype Structure Created

```
astro-prototype/
├── src/
│   ├── layouts/
│   │   └── BaseLayout.astro       # Main layout (nav, footer, global CSS)
│   ├── components/
│   │   ├── FeaturedSection.astro  # Homepage featured menu
│   │   ├── CategoryCards.astro    # Homepage category grid
│   │   ├── HomeCTA.astro          # CTA section
│   │   └── MenuGrid.astro         # Reusable menu item grid
│   └── pages/
│       ├── index.astro            # Homepage
│       └── valentines.astro       # Valentine's menu
├── public/
│   └── assets -> ../assets/       # Symlink to Jekyll assets
├── astro.config.mjs
└── package.json
```

## Recommendation

### For This Project: **Stay with Jekyll** (for now)

**Reasoning:**
1. **ROI not justified** — 10-12 hours of migration work for a seasonal bakery site with ~15 pages
2. **GitHub Pages simplicity** — Current zero-config deployment is valuable
3. **Content workflow** — YAML front matter + Markdown is simpler for menu updates
4. **Low traffic** — Performance gains (22x faster build) don't matter for a low-traffic site
5. **Phase 1 optimizations working** — Site is already performant after CSS consolidation

### Consider Astro If:
- Adding dynamic features (cart, user accounts)
- Site grows significantly (50+ pages)
- Need image optimization pipeline
- Want to add React/Vue components
- Moving to a different hosting provider

### Preserve This Prototype
Keep the `feature/astro-prototype` branch as reference. It demonstrates:
- Component architecture pattern
- CSS scoping approach
- Migration path if needed later

---

## Files Created

| File | Purpose |
|------|---------|
| `BaseLayout.astro` | Main layout with nav, footer, global styles |
| `FeaturedSection.astro` | Reusable featured menu component |
| `CategoryCards.astro` | Grid of category cards |
| `HomeCTA.astro` | Call-to-action section |
| `MenuGrid.astro` | Menu item card grid (with sold-out support) |
| `index.astro` | Homepage |
| `valentines.astro` | Valentine's menu page |

---

*This evaluation completes Phase 2, Task 2.1 of the modernization worklog.*
