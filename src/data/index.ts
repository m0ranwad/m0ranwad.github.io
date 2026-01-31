/**
 * Central export for all site data
 * Import from here instead of individual files
 */

// Types
export * from './types';

// Menus
export * from './menus';

// Gallery
export { galleryImages, galleryFilters, getImagesByCategory } from './gallery';

// Navigation
export { mainNavLinks, footerNavLinks, socialLinks, siteInfo } from './navigation';

// Content (About, Contact, FAQ)
export { contactMethods, faqItems, aboutContent } from './content';
