import type { Menu } from '../types';

export const thanksgivingMenu: Menu = {
  slug: 'thanksgiving',
  title: 'Thanksgiving Menu',
  subtitle: 'Fresh baked treats for your holiday feast',
  headerImage: '/assets/img/thanksgivingMenu.jpg',
  season: 'fall',
  orderFormUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSf_VXJVtlP_7VwEm6qwcfbmFA719NcxRj-Rs8WCRxmUYEDqDg/viewform',
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
      image: '/assets/img/headers/home/cranmuffins.jpg',
      description: 'Cranberry orange muffins, available in a minimum order of 6.',
      price: '$2.50 each',
    },
  ],
};
