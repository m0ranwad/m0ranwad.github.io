# Phase 5: Inquiry Cart System — Implementation Plan

> **Branch**: `feature/inquiry-cart` (branches off `feature/astro-phase3`)  
> **Goal**: Allow customers to select items throughout the site and submit them as a unified inquiry.  
> **Estimated Total Time**: ~5 hours

---

## 📊 Form Solution Analysis

### Requirements
- ✅ Must be truly free (no hidden limits or "gotchas")
- ✅ Works with static site (GitHub Pages)
- ✅ Supports custom HTML forms (not a form builder UI)
- ✅ Can receive pre-filled field data
- ✅ Sends submissions to email
- ✅ No branding on free tier (or minimal)
- ✅ Spam protection

### Options Evaluated

| Service | Free Tier | Limits | Pre-fill Support | Verdict |
|---------|-----------|--------|------------------|---------|
| **Google Forms** | ✅ Unlimited | None | ✅ URL params | ⚠️ Poor UX, looks generic |
| **Web3Forms** | ✅ Forever free | 250/month | ✅ Hidden fields | ✅ **RECOMMENDED** |
| **FormSubmit.co** | ✅ Unlimited | Captcha required | ✅ Hidden fields | ✅ Good backup option |
| **FabForm** | ✅ Free tier | 50/month | ✅ Hidden fields | ❌ Too limited |
| **Netlify Forms** | ⚠️ 100/month | Credit-based | ✅ Hidden fields | ❌ Gets expensive |
| **Formspree** | ⚠️ 50/month | Then paid | ✅ Hidden fields | ❌ Too limited |
| **Getform/Forminit** | ❌ No free | Paid only | ✅ Hidden fields | ❌ No free tier |

### Recommendation: **Web3Forms**
- 250 submissions/month is plenty for a cottage bakery
- No account creation needed for submitters
- Custom "thank you" redirect page
- hCaptcha spam protection (free)
- Works with any HTML form design
- GDPR compliant, AWS-powered

**Backup**: FormSubmit.co (unlimited but requires reCAPTCHA)

---

## 🏗️ Architecture Design

### User Journey
```
┌─────────────────────────────────────────────────────────────────┐
│                    USER JOURNEY                                  │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  1. Browse Menu Page (/valentines/, /cakes/, /cookies/)         │
│     └─> Click "Add to Inquiry" on item                          │
│         └─> Item saved to localStorage                          │
│             └─> Toast notification: "Added! (View Inquiry)"     │
│                                                                  │
│  2. Navbar shows cart badge with count                          │
│     └─> Click badge → goes to /order/                           │
│                                                                  │
│  3. Order Page (/order/)                                        │
│     ├─> Shows selected items (editable)                         │
│     ├─> Customer fills in contact details                       │
│     ├─> Optional: Add notes per item (quantity, colors, etc.)   │
│     └─> Submit → Web3Forms → Email to owner                     │
│                                                                  │
│  4. Thank You Page                                              │
│     └─> Clears cart, confirms submission                        │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Data Structures
```typescript
// localStorage structure
interface InquiryItem {
  id: string;           // Unique: "valentines-lemon-raspberry"
  name: string;         // "Lemon Raspberry"
  price: string;        // "$3.50 per cookie / $38 per dozen"
  category: string;     // "Valentine's Menu"
  image: string;        // "/assets/img/valentines/lemonRaspberry.png"
  quantity?: string;    // Optional: "2 dozen"
  notes?: string;       // Optional: "Pink and red please"
  addedAt: string;      // ISO timestamp
}

// Form submission (to Web3Forms)
{
  access_key: "xxx",
  name: "Jane Doe",
  email: "jane@example.com",
  phone: "555-1234",
  event_date: "2026-02-14",
  event_type: "Valentine's Day",
  items: "Lemon Raspberry (2 dozen) - Pink and red please\nTaster's Box (1)",
  additional_notes: "Pickup preferred",
  _subject: "New Inquiry from Jane Doe - 2 items"
}
```

---

## 📋 Tasks

### Task 5.1: Set Up Web3Forms Account
**Estimated Time**: 15 minutes  
**Risk Level**: Low

- [ ] Go to https://app.web3forms.com/
- [ ] Create account with bakery email
- [ ] Get access key (store securely)
- [ ] Test with simple form submission
- [ ] Add access key to environment or config

**Note**: Access key is public (visible in HTML). This is fine for Web3Forms.

---

### Task 5.2: Create Inquiry Store (Client-Side)
**Estimated Time**: 45 minutes  
**Risk Level**: Low

- [ ] Create `src/scripts/inquiry-store.ts`
- [ ] Implement localStorage wrapper with type safety
- [ ] Functions: `addItem()`, `removeItem()`, `getItems()`, `clearCart()`, `getCount()`
- [ ] Generate unique IDs from menu slug + item name
- [ ] Handle edge cases (duplicates, storage limits)
- [ ] Add expiration (clear items older than 30 days)

**Example API**:
```typescript
export const inquiryStore = {
  addItem(item: InquiryItem): void,
  removeItem(id: string): void,
  updateItem(id: string, updates: Partial<InquiryItem>): void,
  getItems(): InquiryItem[],
  getCount(): number,
  clear(): void,
  hasItem(id: string): boolean,
}
```

---

### Task 5.3: Update Menu Grid with "Add to Inquiry"
**Estimated Time**: 1 hour  
**Risk Level**: Medium

- [ ] Modify `MenuGrid.astro` to include item metadata as data attributes
- [ ] Change "Order Now" button to "Add to Inquiry" (or keep both)
- [ ] Add client-side click handler
- [ ] Show toast notification on add
- [ ] Visual feedback: button changes to "✓ Added" temporarily
- [ ] Pass `menuSlug` prop for generating unique IDs

**Button states**:
1. Default: "Add to Inquiry" (sage button)
2. On click: "✓ Added" (green, 2 second timeout)
3. If already in cart: "In Your Inquiry" (outline style)

---

### Task 5.4: Create Inquiry Badge Component
**Estimated Time**: 30 minutes  
**Risk Level**: Low

- [ ] Create `src/components/InquiryBadge.astro`
- [ ] Shows count bubble on navbar (like shopping cart)
- [ ] Updates reactively when items added
- [ ] Links to `/order/`
- [ ] Hidden when count is 0
- [ ] Add to `BaseLayout.astro` navbar

**Design**: Small sage circle with white number, positioned on "Order" nav link.

---

### Task 5.5: Redesign Order Page with Inquiry Form
**Estimated Time**: 1.5 hours  
**Risk Level**: Medium

- [ ] Replace Google Form embed with custom form
- [ ] Show selected items from localStorage
- [ ] Allow editing: remove items, add quantity/notes
- [ ] Contact fields: Name, Email, Phone, Event Date, Event Type
- [ ] Additional notes textarea
- [ ] Submit to Web3Forms
- [ ] Handle empty cart state (show browse prompts)
- [ ] Loading state during submission

**Form sections**:
1. **Your Selections** (from cart)
   - Item cards with remove button
   - Optional quantity/notes per item
2. **Your Details**
   - Name (required)
   - Email (required)
   - Phone (optional)
   - Event date (optional)
   - Event type dropdown
3. **Additional Notes**
   - Textarea for special requests
4. **Submit Button**

---

### Task 5.6: Create Thank You Page & Polish
**Estimated Time**: 30 minutes  
**Risk Level**: Low

- [ ] Create `/thank-you/` page
- [ ] Clear cart on page load
- [ ] Show confirmation message
- [ ] Link back to menus
- [ ] Configure Web3Forms redirect
- [ ] Test full flow end-to-end
- [ ] Mobile testing

---

### Task 5.7: Toast Notification System (Optional Enhancement)
**Estimated Time**: 30 minutes  
**Risk Level**: Low

- [ ] Create `src/components/Toast.astro` (or use CSS-only approach)
- [ ] Position: bottom-center, above sticky CTA
- [ ] Auto-dismiss after 3 seconds
- [ ] "View Inquiry" link in toast
- [ ] Accessible: proper ARIA live region

**Note**: This is optional polish. Can use `alert()` or simple banner initially.

---

## 📝 Implementation Notes

### Why not Google Forms?
- Can't customize the look to match site design
- Limited pre-fill capabilities
- Looks unprofessional/generic
- User has to leave site context

### Why localStorage over URL params?
- URL params have length limits (~2000 chars)
- localStorage persists across sessions
- User can browse, leave, come back
- Cleaner URLs

### Privacy considerations
- No sensitive data in localStorage (just product names)
- Cart data is local to user's browser only
- Web3Forms handles email securely

### Fallback if Web3Forms changes
- FormSubmit.co is nearly identical API
- Just change form action URL
- Or revert to Google Forms embed

---

## 🚀 Getting Started

```bash
# Create the feature branch
git checkout feature/astro-phase3
git pull origin feature/astro-phase3
git checkout -b feature/inquiry-cart

# Start development
cd astro-prototype
npm run dev
```

Say "Start Task 5.1" to begin implementation.
