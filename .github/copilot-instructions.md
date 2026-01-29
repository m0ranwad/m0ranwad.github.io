# Thymeless Treats Bakery  AI Development Guide

> **Last Updated**: January 29, 2026  
> **Purpose**: Comprehensive guide for AI-assisted development and modernization  
> **Audience**: GitHub Copilot, Claude, and future AI assistants working on this codebase

---

## Project Overview

This is a Jekyll-based bakery e-commerce website built on the Beautiful Jekyll theme (v6.0.1), hosted on GitHub Pages. The site showcases seasonal menus, products, and inquiry forms for Thymeless Treats Bakery.

**Repository**: m0ranwad/m0ranwad.github.io  
**Current Branch**: redesign-joanna-gaines (modern farmhouse aesthetic redesign)  
**Main Branch**: theme/beautiful-jekyll  
**Live URL**: thymelesstreatsbakery.com

---

##  Project Vision & Philosophy

### The Business Reality
Thymeless Treats is a **seasonal cottage bakery** that operates sporadically throughout the year. The website's primary job is to:

1. **Showcase beautiful work**  Let the photos tell the story (Instagram-era visual marketing)
2. **Feature one seasonal menu at a time**  Valentine's Day, Easter, Thanksgiving, Christmas, etc.
3. **Accept custom inquiries**  Birthday cakes, event cookies year-round
4. **Build trust through visually stunning presentation**

### Design Philosophy: "Joanna Gaines Vibes"
The aesthetic should feel like a warm, modern farmhouse kitchen  **elegant but approachable**, **professional but personal**. Think:
- Clean white space with intentional breathing room
- Sage green (#8FA378) as the signature brand color
- Beautiful photography as the hero, not the design
- Mobile-first, thumb-friendly navigation
- Minimal text  let images do the storytelling

### Privacy Considerations
The bakery owner values privacy. When writing content:
-  Don't include specific addresses or location details
-  Don't include full names unless explicitly provided
-  Keep the personal touch ("handcrafted," "baked fresh to order")
-  Reference general service area if needed ("local delivery available")

---

##  Current State (January 2026)

### Tech Stack
| Component | Current | Notes |
|-----------|---------|-------|
| Framework | Jekyll 3.9.3 | Static site generator, GitHub Pages compatible |
| Theme | Beautiful Jekyll 6.0.1 | Bootstrap 4.4.1 base |
| CSS | `optimized-2025.css` (~1473 lines) | Single custom stylesheet |
| Hosting | GitHub Pages | Auto-deploys from `theme/beautiful-jekyll` branch |
| Forms | Google Forms (embedded iframes) | No backend, manual order processing |
| Analytics | Google Analytics 4 (G-9SVD45RN18) | Basic tracking |
| Domain | thymelesstreatsbakery.com | Custom domain via CNAME |

### Branch Strategy
```
theme/beautiful-jekyll   Production (live site)
     redesign-joanna-gaines   Current development branch
```

### Design System
**Color Palette**:
- Sage green: #8FA378 (primary brand color)
- Warm cream: #FBF8F3 (backgrounds)
- Charcoal: #2C2C2C (headings)
- Warm gray: #6B6B6B (body text)
- Light sage: #E8EFE3 (cards, subtle backgrounds)

**Typography**:
- Headings: Cormorant Garamond (elegant serif)
- Body: Inter (clean sans-serif)
- Accents: Caveat (handwritten feel)

---

##  Architecture

### File Structure
```
m0ranwad.github.io/
 _config.yml              # Site settings, navbar, colors
 index.html               # Homepage (featured menu + category cards)
 gallery.md               # Photo gallery with filters + lightbox
 inquiry.md               # Order form hub (4 inquiry types)
 contact.md               # Contact info + FAQ
 holidays.md              # Seasonal menu hub
 valentines.md            # Current featured menu
 christmas.md, easter.md  # Holiday menus (YAML data)
 cookies.md, cakes.md     # Year-round menus
 aboutme.md               # About page
 _layouts/
    base.html            # HTML skeleton
    page.html            # Standard content pages
    home.html            # Homepage wrapper
    menu.html            # Menu item card renderer 
 _includes/               # Partials (nav, footer, etc.)
 assets/
    css/optimized-2025.css  # Main custom styles 
    img/                    # All product photos
 .github/
     copilot-instructions.md  # This file
     MODERNIZATION-WORKLOG.md # Task tracker
```

### Content-Driven Menu System
The site uses a **data-driven menu pattern** where product pages are markdown files with YAML front matter defining menu items.

**Example** (`valentines.md`):
```yaml
---
layout: menu
title: Valentine's Menu
subtitle: Sweet treats to celebrate love
permalink: /valentines/
menu_items:
  - name: Lemon Raspberry
    image: /assets/img/valentines/lemonRaspberry.png
    description: A light lemony cookie covered with swirls of raspberry and vanilla buttercream.
    price: $3.50 per cookie / $38 per dozen
  - name: Taster's Box
    image: /assets/img/valentines/tastersBox.jpg
    description: A great way to try a little bit of everything.
    price: $12 per box
    sold_out: true  # Optional: grays out item
---
```

The `menu.html` layout processes this data to render product cards. The `sold_out` flag triggers CSS styling.

### CSS Architecture
All custom styles live in `assets/css/optimized-2025.css`. Key sections:
- **Base variables** (colors, fonts)
- **Navigation** (navbar, mobile menu)
- **Homepage** (.featured-section, .homepage-cta, .homepage-category-cards)
- **Contact page** (.contact-container, .contact-card, .faq-section)
- **About page** (.about-container, .about-cards-grid)
- **Inquiry page** (.inquiry-type-selector, .inquiry-card, .form-field)
- **Menu items** (.menu-item-card, .sold-out)
- **Generic components** (.page-intro-box, .content-card, .cta-section)

---

##  Mobile-First Priority

**95% of bakery customers browse on mobile.** Design decisions should be tested on phone first.

### Guidelines
- Touch targets: Minimum 44x44px for buttons
- Thumb zone: Important actions in bottom 2/3 of screen
- No hover-dependent UI: Everything works with tap
- Fast image loading: Consider lazy loading
- Clear CTAs: "Order Now" button always visible

---

##  Common Development Tasks

### Update Featured Season
Edit `index.html`, find the `.featured-section` and update:
```html
<a href="{{ '/valentines/' | relative_url }}" class="featured-menu-link">
  <img src="/assets/img/valentines/menu1.jpg" alt="Valentine's Day Menu">
</a>
```

### Add New Seasonal Menu
1. Create `seasonname.md` in root with `layout: menu`
2. Add YAML front matter with `menu_items` array
3. Add photos to `/assets/img/seasonname/`
4. Link from `holidays.md`

### Mark Items Sold Out
Add `sold_out: true` to any menu item in YAML front matter.

### Add CSS Styles
All custom styles go in `assets/css/optimized-2025.css`. Use semantic class names and follow existing patterns.

### Run Locally
```powershell
cd c:\git\m0ranwad.github.io
bundle install          # First time only
bundle exec jekyll serve
# Open http://localhost:4000
```

### Deploy
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

##  Technical Reference

### Key Files
| Task | File(s) |
|------|---------|
| Site settings, nav links | `_config.yml` |
| Homepage layout | `index.html` |
| Menu item rendering | `_layouts/menu.html` |
| Global styles | `assets/css/optimized-2025.css` |
| Navigation | `_includes/nav.html` |
| Photo gallery | `gallery.md` |

### Styling Conventions
- Use CSS classes, NOT inline styles
- Use CSS variables: `var(--sage)`, `var(--charcoal)`, etc.
- Add responsive breakpoints at 768px
- Follow BEM-like naming: `.contact-card`, `.about-intro`

### Image Guidelines
- Format: JPG for photos, PNG for graphics
- Size: Max 1200px wide for full-width, 600px for cards
- Naming: Lowercase, no spaces (`valentines-heart-cookies.jpg`)
- Location: `/assets/img/[category]/`

---

##  Content Voice & Tone

- **Warm**: "Let's create something sweet together"
- **Personal**: "Handcrafted treats" not "Products"
- **Action-oriented**: "Order Now" not "Submit Inquiry"
- **Confident**: "Beautiful custom cakes" not "We try to make nice cakes"

---

##  Modernization Progress

See `.github/MODERNIZATION-WORKLOG.md` for current task status.

**Current Progress** (January 29, 2026):
-  Task 1.1: File Cleanup (27 files deleted)
-  Task 1.2: Valentine's Day Featured Menu
-  Task 1.3: CSS Consolidation Sprint (552 lines extracted)
-  Task 1.4-1.8: Remaining Phase 1 tasks
-  Phase 2: Framework Evaluation
-  Phase 3: Enhanced Features

---

*This document should be updated whenever significant changes are made to the codebase.*
