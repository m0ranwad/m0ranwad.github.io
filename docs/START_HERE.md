# 🚀 QUICK START - Test Your Redesign NOW!

## Step 1: Start the Test Server
Open PowerShell and run:
```powershell
cd c:\git\m0ranwad.github.io
bundle exec jekyll serve
```

Wait for: `Server running... press ctrl-c to stop.`

## Step 2: Open Your Browser
Go to: **http://localhost:4000**

## Step 3: See the NEW Homepage
To activate the redesigned homepage:
```powershell
# In a NEW PowerShell window:
cd c:\git\m0ranwad.github.io
mv index.html index-old.html
mv index-redesign.html index.html
```

Refresh your browser (Ctrl+R or F5)

## ✨ What You'll See

### New Homepage Features:
- 🎨 Warm cream/sage color palette
- 🖼️ Hero section with welcome message
- 📝 "Made with Love, Baked to Perfection"
- 🎯 "Order This Season's Favorites" button
- 📖 Category descriptions
- 💝 "Our Story" section at bottom

### What's Different:
- Softer, warmer colors (cream instead of white)
- More breathing room between elements
- Handwritten "Dancing Script" accents
- Terracotta (warm orange) action buttons
- Personal, story-driven approach

## 🔄 Switch Back Anytime
To see your CURRENT homepage again:
```powershell
cd c:\git\m0ranwad.github.io
mv index.html index-redesign.html
mv index-old.html index.html
```

Refresh browser.

## 🎯 Test on Your Phone
1. Find your computer's IP address:
   ```powershell
   ipconfig
   ```
   Look for "IPv4 Address" (e.g., 192.168.1.100)

2. On your phone's browser, go to:
   `http://YOUR-IP-ADDRESS:4000`
   (e.g., http://192.168.1.100:4000)

## ⏹️ Stop the Server
In PowerShell, press: **Ctrl+C**

## ❓ Troubleshooting

### Not working?
```powershell
bundle install
bundle exec jekyll serve
```

### Changes not showing?
Hard refresh: **Ctrl+Shift+R**

### Wrong colors?
Check `_config.yml` has:
```yaml
site-css:
  - "/assets/css/redesign-joanna-gaines.css"
```

## 📚 Full Documentation
- **TESTING_GUIDE.md** - Complete testing instructions
- **BEFORE_AFTER_COMPARISON.md** - See all changes
- **REDESIGN_PLAN.md** - Full strategy

## 🎉 You're on a Safe Branch!

Your live website is **untouched** and **safe** on the `theme/beautiful-jekyll` branch.

You're testing on: `redesign-joanna-gaines` branch.

**Nothing will go live until you choose to merge it!**

## 💡 Next Steps

1. ✅ Test the homepage redesign
2. ✅ View on desktop and mobile
3. ✅ Check menu pages (still use current design)
4. ✅ Decide: Do you like the new warm aesthetic?

If **YES**: Read TESTING_GUIDE.md → "If You Like the Redesign"
If **NO**: Just switch back to main branch, no harm done!

---

**Ready? Run this now:**
```powershell
cd c:\git\m0ranwad.github.io
bundle exec jekyll serve
```

**Then visit: http://localhost:4000** 🎨✨
