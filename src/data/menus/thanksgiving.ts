import type { SeasonalMenu } from '../types';

export const thanksgivingMenu: SeasonalMenu = {
  slug: 'thanksgiving',
  kind: 'seasonal',
  // What the site says about this menu. One of 'coming-soon', 'open',
  // 'sold-out' or 'past'; see SeasonStatus in ../types.ts.
  status: 'past',
  title: 'Thanksgiving Menu',
  subtitle: 'Fresh baked treats for your holiday feast',
  description: 'Thanksgiving cookies and fall treats from Thymeless Treats Bakery. Order beautiful autumn-themed sugar cookies for your Thanksgiving gathering.',
  intro: 'Give thanks with beautifully crafted fall-themed treats.',
  headerImage: '/assets/img/bread.jpg',
  items: [
    {
      name: 'Large Bread Loaf',
      image: '/assets/img/bread.jpg',
      description: 'Cranberry orange bread loaf, perfect for holiday gatherings.',
      price: '$16',
    },
    {
      name: 'Mini Bread Loaf',
      image: '/assets/img/bread.jpg',
      description: 'Mini cranberry orange bread loaves. Minimum order of 6.',
      price: '$3 each',
    },
    {
      name: 'Muffins',
      image: '/assets/img/headers/home/cranMuffins.jpg',
      description: 'Cranberry orange muffins, available in a minimum order of 6.',
      price: '$2.50 each',
    },
  ],
};
