/**
 * Shared TypeScript interfaces for menu items, gallery, and site content
 */

// ============================================
// MENU TYPES
// ============================================

export interface MenuItem {
  name: string;
  image: string;
  description: string;
  price: string;
  soldOut?: boolean;
  link?: string;
}

export interface Menu {
  slug: string;
  title: string;
  subtitle: string;
  headerImage?: string;
  orderFormUrl?: string;
  featured?: boolean;
  season?: 'spring' | 'summer' | 'fall' | 'winter' | 'year-round';
  items: MenuItem[];
}

// ============================================
// GALLERY TYPES
// ============================================

export type GalleryCategory = 'all' | 'cookies' | 'cakes' | 'holiday' | 'events';

export interface GalleryImage {
  src: string;
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

export interface ContactMethod {
  icon: string;
  title: string;
  description: string;
  linkText: string;
  linkUrl: string;
  external?: boolean;
}
