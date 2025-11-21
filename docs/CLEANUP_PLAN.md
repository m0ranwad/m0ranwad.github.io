# 🧹 File Structure Cleanup & Organization Plan

## Current Issues Identified

### 1. **Duplicate/Old Files** (To Remove)
- `christmas copy.html` - Old Christmas menu version
- `easter copy.html` - Old Easter menu version  
- `mothersday copy.html` - Old Mother's Day menu version
- `valentinesOLD.html` - Old Valentine's menu version
- `thanksgiving2.html` - Empty test file
- `thanksgiving3.html` - Empty test file

### 2. **Sample/Demo Files** (Theme Files - To Remove)
- `_posts/2020-02-26-flake-it-till-you-make-it.md` - Sample blog post
- `_posts/2020-02-28-sample-markdown.md` - Sample blog post
- `screenshot.png` - Theme screenshot
- `beautiful-jekyll-theme.gemspec` - Theme gem spec (not needed for GitHub Pages)

### 3. **Unused Theme Files** (Optional - Consider Removing)
- `CHANGELOG.md` - Beautiful Jekyll theme changelog
- `staticman.yml` - Static comments config (not using)

### 4. **Image Files to Clean**
- `assets/img/lghub_installer.exe` - **DANGEROUS** - exe file in images folder
- `assets/img/*.HEIC` - Apple image format (should convert to JPG)
- `assets/img/404-southpark.jpg` - Unused 404 image
- `assets/img/avatar-icon.png` - Default theme avatar
- `assets/img/bgimage.png` - Unused background
- `assets/img/light_profile.jpg` - Unused profile image
- `assets/img/path.jpg` - Sample blog image
- `assets/img/THING.png` - Unclear purpose
- `assets/img/thumb.png` - Sample thumbnail (if exists)
- Unused logo variations: `logo2.jpg`, `logo4.png`, `logo5.webp`

### 5. **_site Directory**
- **Keep in .gitignore** (Jekyll build output - regenerated each time)
- Should never be committed to Git

### 6. **Documentation Files Organization**
Current docs are in root - should organize:
- `REDESIGN_PLAN.md`
- `TESTING_GUIDE.md`
- `START_HERE.md`
- `READY_TO_TEST.md`
- `BEFORE_AFTER_COMPARISON.md`

**Proposed:** Create `docs/` folder for these

### 7. **Menu Navigation File**
- `menu.html` - Standalone menu page (redundant with index.html categories)

---

## Proposed New Structure

```
c:\git\m0ranwad.github.io\
├── .github/
│   └── copilot-instructions.md
├── _data/
├── _includes/
├── _layouts/
│   ├── base.html
│   ├── default.html
│   ├── home.html
│   ├── menu.html
│   ├── menu-redesign.html
│   ├── page.html
│   ├── post.html
│   ├── carousel.html
│   ├── masonry.html
│   └── lightbox.html
├── _posts/ (CLEAN - remove samples or create real posts)
├── assets/
│   ├── css/
│   │   ├── beautifuljekyll.css
│   │   ├── beautifuljekyll-minimal.css
│   │   ├── bootstrap-social.css
│   │   ├── pygment_highlights.css
│   │   ├── staticman.css
│   │   └── redesign-joanna-gaines.css
│   ├── img/
│   │   ├── (cleaned images only)
│   │   ├── easter/
│   │   ├── headers/
│   │   ├── mothersday/
│   │   ├── siteConstruction/
│   │   └── valentines/
│   └── js/
├── cookies/
│   └── sugar.md
├── docs/ (NEW - for documentation)
│   ├── REDESIGN_PLAN.md
│   ├── TESTING_GUIDE.md
│   ├── START_HERE.md
│   ├── READY_TO_TEST.md
│   └── BEFORE_AFTER_COMPARISON.md
├── 404.html
├── aboutme.md
├── cake1.md
├── cake2.md
├── cake3.md
├── cakes.md
├── catering.md
├── christmas.md
├── CNAME
├── contact.md
├── cookies.md
├── easter.md
├── feed.xml
├── Gemfile
├── gifts.md
├── halloween.md
├── holidays.md
├── index.html (current)
├── index-redesign.html (redesigned version)
├── LICENSE
├── mothersday.md
├── order.md
├── README.md
├── tags.html
├── thanksgiving.html
├── valentines.md
├── _config.yml
├── .gitignore
└── favicon.ico
```

---

## Cleanup Actions

### Phase 1: Remove Dangerous/Junk Files
1. **CRITICAL**: Delete `assets/img/lghub_installer.exe` (security risk)
2. Delete sample blog posts
3. Delete "copy" and "OLD" HTML files
4. Delete test thanksgiving files
5. Delete unused theme files

### Phase 2: Clean Image Directory
1. Delete unused sample images
2. Delete HEIC files (or convert to JPG)
3. Delete unused logo variations
4. Keep only actively used images

### Phase 3: Organize Documentation
1. Create `docs/` directory
2. Move redesign documentation files
3. Update references in files

### Phase 4: Update .gitignore
1. Ensure _site is ignored
2. Add common patterns
3. Ignore OS-specific files

### Phase 5: Verify Navigation
1. Check all menu links work
2. Remove redundant menu.html
3. Test all pages build correctly

---

## Files to DELETE (Safe to Remove)

### Immediate Deletion (No Impact):
- `christmas copy.html`
- `easter copy.html`
- `mothersday copy.html`
- `valentinesOLD.html`
- `thanksgiving2.html`
- `thanksgiving3.html`
- `menu.html` (redundant)
- `screenshot.png`
- `beautiful-jekyll-theme.gemspec`
- `_posts/2020-02-26-flake-it-till-you-make-it.md`
- `_posts/2020-02-28-sample-markdown.md`

### Images to DELETE:
- `assets/img/lghub_installer.exe` ⚠️ **CRITICAL**
- `assets/img/404-southpark.jpg`
- `assets/img/avatar-icon.png`
- `assets/img/bgimage.png`
- `assets/img/light_profile.jpg`
- `assets/img/path.jpg`
- `assets/img/THING.png`
- `assets/img/logo2.jpg`
- `assets/img/logo4.png`
- `assets/img/logo5.webp`
- `assets/img/*.HEIC` (convert or delete)

### Optional Deletion (Theme Files):
- `CHANGELOG.md` (Beautiful Jekyll changelog - not yours)
- `staticman.yml` (not using static comments)

---

## Safety Measures

Before deletion:
1. ✅ Confirmed on `redesign-joanna-gaines` branch (safe testing)
2. ✅ Original files safe on `theme/beautiful-jekyll` branch
3. ✅ Will commit changes incrementally
4. ✅ Can rollback any mistakes with Git

---

## Execution Order

1. **Create docs folder and move files**
2. **Delete dangerous .exe file first**
3. **Delete old HTML copies**
4. **Delete sample blog posts**
5. **Clean image directory**
6. **Update .gitignore**
7. **Test Jekyll build**
8. **Commit changes**

---

Ready to execute cleanup? This will make your repository much cleaner and more maintainable!
