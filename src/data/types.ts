/**
 * Shared TypeScript interfaces for menu items, gallery, and site content
 * 
 * NOTE: Images use simple string paths like '/assets/img/photo.jpg'
 * Just drop photos in src/assets/img/ and reference them by path; the build
 * resizes them (src/lib/photos.ts).
 * See ADDING_PHOTOS.md for the full guide.
 */

// ============================================
// MENU TYPES
// ============================================

export interface MenuItem {
  name: string;
  image: string;  // Path like '/assets/img/valentines/cookie.jpg'
  description: string;
  price: string;
  soldOut?: boolean;
  link?: string;
}

/**
 * Where a seasonal menu is in its season. This one field decides what every
 * page says about the menu; see src/data/season.ts.
 * - 'coming-soon': items and prices shown, no ordering yet; featured on the home page
 * - 'open':        taking orders; featured on the home page. Only one menu may be open.
 * - 'sold-out':    every item shown as sold out; featured until it is set to 'past'
 * - 'past':        shows what was made, without prices or ordering
 */
export type SeasonStatus = 'coming-soon' | 'open' | 'sold-out' | 'past';

interface MenuBase {
  slug: string;          // URL: /<slug>/
  title: string;
  subtitle: string;
  description: string;   // Search-result description for the page
  intro?: string;        // Paragraph under the title while orders are open
  cta?: { title: string; text: string };  // Box at the bottom while orders are open
  headerImage?: string;  // Path like '/assets/img/easter/IMG_6388.jpg'
  items: MenuItem[];
}

export interface SeasonalMenu extends MenuBase {
  kind: 'seasonal';
  status: SeasonStatus;
  opens?: string;    // 'YYYY-MM-DD', shown while coming soon: "orders open in N days"
  orderBy?: string;  // 'YYYY-MM-DD', last day to order; after it the menu shows as closed
}

export interface YearRoundMenu extends MenuBase {
  kind: 'year-round';
}

export type Menu = SeasonalMenu | YearRoundMenu;

// ============================================
// GALLERY TYPES
// ============================================

export type GalleryCategory = 'all' | 'cookies' | 'cakes' | 'holiday' | 'events';

export interface GalleryImage {
  src: string;  // Path like '/assets/img/gallery/photo.jpg'
  alt: string;
  category: Exclude<GalleryCategory, 'all'>;
}

export interface GalleryFilter {
  id: GalleryCategory;
  label: string;
}

// ============================================
// NAVIGATION TYPES
// ============================================

export interface NavLink {
  label: string;
  href: string;
}

export interface SocialLink {
  platform: 'instagram' | 'facebook' | 'email';
  url: string;
  label: string;
}

// ============================================
// CONTACT/FAQ TYPES
// ============================================

export interface FAQItem {
  question: string;
  answer: string;
}
