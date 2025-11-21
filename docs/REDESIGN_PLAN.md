# Thymeless Treats Bakery - Joanna Gaines Inspired Redesign

## 🎯 Design Vision
Transform your bakery website into a warm, elegant, farmhouse-modern experience that appeals to women 30+ with:
- **Soft, neutral color palette** (cream, sage, warm grays, touches of terracotta)
- **Clean, spacious layouts** with plenty of breathing room
- **Handwritten/script fonts** paired with clean sans-serifs
- **Natural textures** and subtle patterns
- **Storytelling focus** - emphasize the personal, homemade touch
- **High-quality photography** showcased elegantly

## 🎨 Color Palette (Joanna Gaines Style)

### Current Colors:
- Navbar: `#4A5A4F` (dark sage green)
- Text: `#404040` (dark gray)
- Links: `#008AFF` (bright blue)

### New Colors:
```css
--cream: #FAF9F6;           /* Warm cream background */
--sage: #9CAF88;            /* Soft sage green (main accent) */
--warm-gray: #8B8B83;       /* Warm gray for text */
--charcoal: #3E3E3E;        /* Charcoal for headers */
--terracotta: #C9826B;      /* Warm terracotta for CTAs */
--white: #FFFFFF;           /* Pure white */
--light-sage: #D4E5D0;      /* Very light sage for backgrounds */
```

## 📋 Safe Testing Workflow

### Step 1: Create a Redesign Branch
```powershell
# Navigate to your project
cd c:\git\m0ranwad.github.io

# Check current branch
git branch

# Create a new redesign branch
git checkout -b redesign-joanna-gaines

# Verify you're on the new branch
git branch
```

### Step 2: Test Locally
```powershell
# Install dependencies (if needed)
bundle install

# Start local server
bundle exec jekyll serve

# Open browser to: http://localhost:4000
```

### Step 3: Make Changes Safely
- All changes happen on the `redesign-joanna-gaines` branch
- Your live site (on `theme/beautiful-jekyll` branch) remains unchanged
- Test everything locally before merging

### Step 4: When Ready to Deploy
```powershell
# If you like the redesign:
git add .
git commit -m "Joanna Gaines inspired redesign"
git push origin redesign-joanna-gaines

# Switch to main branch
git checkout theme/beautiful-jekyll

# Merge redesign
git merge redesign-joanna-gaines
git push origin theme/beautiful-jekyll

# If you DON'T like it:
git checkout theme/beautiful-jekyll
# Delete redesign branch (locally)
git branch -D redesign-joanna-gaines
```

## 🎨 Design Changes Overview

### 1. Typography
**Current:**
- Playfair Display (elegant serif)

**New:**
- **Headers**: "Playfair Display" (keep - it's perfect!)
- **Body**: "Lato" or "Open Sans" (clean, readable)
- **Accents**: "Dancing Script" or "Pacifico" (handwritten feel for special touches)

### 2. Homepage Redesign

**Hero Section:**
- Large, warm welcome message
- Single stunning hero image (not rotating carousel)
- Soft overlay with handwritten tagline
- Prominent "Shop Our Menu" button

**Featured Section:**
- "This Season's Favorites" instead of "Featured Menu"
- 2-3 large cards with warm borders
- Storytelling descriptions

**Category Grid:**
- Softer card shadows
- Cream/warm backgrounds
- Hover effects with sage green borders
- Natural wood texture overlays (subtle)

### 3. Menu Pages Redesign

**Product Cards:**
- Softer rounded corners (8px instead of 15px)
- Cream background instead of pure white
- Sage green accents on hover
- Better spacing (more breathing room)
- Handwritten "sold out" badges in terracotta

**Layout:**
- More whitespace
- 2-column layout on desktop (easier to scan)
- Larger, more prominent images

### 4. Order Forms
- Custom styled iframe borders
- Warm introduction text
- "Let's Create Something Special Together" heading

## 📁 Files to Modify

1. `_config.yml` - Update colors
2. `assets/css/beautifuljekyll.css` - New styles
3. `index.html` - Homepage restructure
4. `_layouts/menu.html` - Menu page improvements
5. Create: `assets/css/redesign.css` - New custom styles

## 🚀 Quick Start Commands

```powershell
# Clone your current state (backup)
cd c:\git
git clone c:\git\m0ranwad.github.io m0ranwad.github.io-backup

# Create redesign branch
cd c:\git\m0ranwad.github.io
git checkout -b redesign-joanna-gaines

# Test locally
bundle exec jekyll serve
# Visit: http://localhost:4000

# To stop server: Ctrl+C
```

## 📸 What You'll Need

### Photos to Consider:
1. A signature hero image (your wife baking or a beautiful spread)
2. Lifestyle shots (cookies on rustic wood, coffee scene)
3. Process photos (mixing bowls, ingredients)
4. Happy customer moments

### Image Style:
- Natural lighting
- Warm tones
- Clean, uncluttered backgrounds
- Focus on texture and detail

## ⚠️ Important Notes

1. **Never edit on `theme/beautiful-jekyll` directly** - always use a test branch
2. **Commit often** - save your progress frequently
3. **Test on mobile** - resize your browser window
4. **Keep backup** - your original is safe on the main branch
5. **Google Forms** - will work the same, just styled differently

## 🎯 Phase 1 Changes (Start Here)

I'll help you implement:
1. ✅ New color scheme
2. ✅ Typography updates  
3. ✅ Homepage hero section
4. ✅ Softened card designs
5. ✅ Better spacing/whitespace

Would you like me to start implementing these changes now?
