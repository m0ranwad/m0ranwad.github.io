import type { NavLink, SocialLink } from './types';

/**
 * Main navigation links
 */
export const mainNavLinks: NavLink[] = [
  { label: 'Order', href: '/valentines/' },  // Points to featured menu
  { label: 'Menus', href: '/holidays/' },
  { label: 'Gallery', href: '/gallery/' },
  { label: 'Contact', href: '/contact/' },
];

/**
 * Footer navigation links
 */
export const footerNavLinks: NavLink[] = [
  { label: 'Contact', href: '/contact/' },
  { label: 'About', href: '/about/' },
  { label: 'Gallery', href: '/gallery/' },
];

/**
 * Social media links
 */
export const socialLinks: SocialLink[] = [
  {
    platform: 'instagram',
    url: 'https://www.instagram.com/thymelesstreatsbakery/',
    label: '@thymelesstreatsbakery',
  },
  {
    platform: 'facebook',
    url: 'https://www.facebook.com/thymelesstreatsbakery/',
    label: 'Thymeless Treats Bakery',
  },
  {
    platform: 'email',
    url: 'mailto:thymelesstreatsbakery@gmail.com',
    label: 'thymelesstreatsbakery@gmail.com',
  },
];

/**
 * Site metadata
 */
export const siteInfo = {
  name: 'Thymeless Treats Bakery',
  tagline: 'Where Every Bite is Timelessly Delicious!',
  description: 'Handcrafted seasonal baked goods from a cottage bakery in North Ridgeville, Ohio.',
  location: 'North Ridgeville, Ohio',
};
