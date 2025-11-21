# 🎨 Thymeless Treats Redesign - Testing Guide

## ✅ Current Status
You are now on the **`redesign-joanna-gaines`** branch. Your live website is **100% safe** on the `theme/beautiful-jekyll` branch.

## 🚀 Quick Start - Test the Redesign Now!

### Step 1: Start Local Server
```powershell
cd c:\git\m0ranwad.github.io
bundle exec jekyll serve
```

**Wait for this message:**
```
Server address: http://127.0.0.1:4000/
Server running... press ctrl-c to stop.
```

### Step 2: View in Browser
Open your browser and go to: **http://localhost:4000**

### Step 3: Stop Server (when done testing)
Press `Ctrl+C` in the PowerShell window

---

## 📋 What's Been Changed

### ✨ New Files Created:
1. **`assets/css/redesign-joanna-gaines.css`** - All new Joanna Gaines styling
2. **`index-redesign.html`** - New hero-based homepage
3. **`_layouts/menu-redesign.html`** - Enhanced menu layout
4. **`REDESIGN_PLAN.md`** - Full redesign documentation
5. **`TESTING_GUIDE.md`** - This file!

### 🎨 Modified Files:
1. **`_config.yml`** - Updated color scheme to warm/sage palette

### 🔒 Original Files (Untouched):
- Your current `index.html` - still works
- Your current layouts - still work
- All your product pages - still work

---

## 🧪 Testing Checklist

### Phase 1: View the New Design
- [ ] Homepage loads with new hero section
- [ ] Colors are warm cream/sage (not dark green)
- [ ] Category cards have descriptions
- [ ] "Order This Season's Favorites" button works
- [ ] Navigation bar is white with dark text

### Phase 2: Test Menu Pages (Current Style)
- [ ] Visit `/christmas/` - should use CURRENT styling
- [ ] Visit `/cookies/` - should use CURRENT styling
- [ ] Check "sold out" badges still show

### Phase 3: Mobile Testing
- [ ] Resize browser window to phone size
- [ ] Cards stack vertically on mobile
- [ ] Hero section text remains readable
- [ ] Buttons are tappable

### Phase 4: Cross-Browser
- [ ] Test in Chrome
- [ ] Test in Edge
- [ ] Test in Firefox (if available)

---

## 🔄 Switching Between Designs

### To See NEW Homepage:
1. Rename `index.html` to `index-old.html`
2. Rename `index-redesign.html` to `index.html`
3. Refresh browser (Ctrl+R)

```powershell
cd c:\git\m0ranwad.github.io
mv index.html index-old.html
mv index-redesign.html index.html
```

### To See OLD Homepage:
```powershell
cd c:\git\m0ranwad.github.io
mv index.html index-redesign.html
mv index-old.html index.html
```

### To Apply NEW Styling to Menu Pages:
Edit any menu page (e.g., `christmas.md`) and change:
```yaml
layout: menu  # OLD layout
```
to:
```yaml
layout: menu-redesign  # NEW layout
```

---

## 🎨 Design Comparison

### Current Design:
- Dark sage green header (#4A5A4F)
- Pure white backgrounds
- Bright blue links
- Dense card layouts
- Small spacing

### New Design (Joanna Gaines):
- Soft cream backgrounds (#FAF9F6)
- Sage green accents (#9CAF88)
- Terracotta call-to-action buttons (#C9826B)
- Spacious card layouts
- Handwritten "Dancing Script" accents
- Larger, more breathable spacing
- Farmhouse-modern aesthetic

---

## 🐛 Troubleshooting

### Issue: "Jekyll not found"
**Solution:**
```powershell
bundle install
bundle exec jekyll serve
```

### Issue: Changes not showing
**Solutions:**
1. Hard refresh browser: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
2. Stop server (`Ctrl+C`) and restart
3. Clear browser cache

### Issue: CSS not loading
**Solution:** Check that `_config.yml` has:
```yaml
site-css:
  - "/assets/css/redesign-joanna-gaines.css"
```

### Issue: Port 4000 already in use
**Solution:**
```powershell
# Use a different port
bundle exec jekyll serve --port 4001
# Then visit: http://localhost:4001
```

---

## 🔀 Git Workflow Explained

### Current Situation:
```
main branch: theme/beautiful-jekyll  ← YOUR LIVE SITE (safe!)
test branch: redesign-joanna-gaines  ← YOU ARE HERE (testing)
```

### If You Like the Redesign:
```powershell
# 1. Save your work
git add .
git commit -m "Joanna Gaines redesign complete"

# 2. Switch to live branch
git checkout theme/beautiful-jekyll

# 3. Merge redesign into live
git merge redesign-joanna-gaines

# 4. Push to make it live
git push origin theme/beautiful-jekyll
```

### If You Don't Like It:
```powershell
# Just switch back to your original
git checkout theme/beautiful-jekyll

# Optionally delete redesign branch
git branch -D redesign-joanna-gaines
```

---

## 📸 Customization Tips

### Change Hero Image:
Edit `index-redesign.html` line 11:
```html
background-image: linear-gradient(...), url('/assets/img/YOUR-IMAGE.jpg');
```

### Change Hero Text:
Edit `index-redesign.html` lines 13-19

### Change Color Palette:
Edit `assets/css/redesign-joanna-gaines.css` lines 8-16 (`:root` variables)

### Add Your Own Fonts:
Edit line 25 of `redesign-joanna-gaines.css` to import different Google Fonts

---

## 🎯 Next Steps - Gradual Rollout

### Option 1: All-at-Once
1. Replace `index.html` with redesigned version
2. Update all menu pages to use `layout: menu-redesign`
3. Test everything
4. Merge and deploy

### Option 2: Page-by-Page (RECOMMENDED)
1. Start with just the homepage (`index.html`)
2. Test for a few days
3. Then update Christmas menu
4. Then cookies menu
5. Gradually roll out

### Option 3: Hybrid Approach
1. Keep current menu styling
2. Only use new homepage hero
3. Keep rest of site as-is
4. Update menus later

---

## 💡 Making It Even Better

### Before Final Launch:
- [ ] Get 2-3 high-quality photos for hero section
- [ ] Write personal "About" story for homepage
- [ ] Take lifestyle photos (cookies on table, baking process)
- [ ] Get testimonials from customers
- [ ] Professional logo (if desired)
- [ ] Add seasonal banner rotation

### Photo Tips (Joanna Gaines Style):
- Natural lighting (near windows)
- Warm wood surfaces
- Clean, uncluttered backgrounds
- Focus on textures and details
- Include elements like coffee, flowers, linens
- Shoot in morning or late afternoon (golden hour)

---

## ❓ Questions to Ask Yourself

1. **Colors**: Do the warm cream/sage colors feel right for your brand?
2. **Spacing**: Does the site feel too spacious or just right?
3. **Typography**: Do you like the handwritten accents?
4. **Navigation**: Is it easy to find products?
5. **Mobile**: Does it work well on your phone?
6. **Professional**: Does it match your wife's vision?

---

## 📞 Need Help?

If something breaks or you get stuck:
1. Stop the server (Ctrl+C)
2. Switch back to original: `git checkout theme/beautiful-jekyll`
3. Your live site continues working normally
4. No harm done!

Remember: **You can always go back**. That's the beauty of using Git branches!

---

## 🎉 You're Ready!

Run this command to start testing:
```powershell
cd c:\git\m0ranwad.github.io
bundle exec jekyll serve
```

Then visit: **http://localhost:4000**

**Have fun exploring the redesign!** 🎨✨
