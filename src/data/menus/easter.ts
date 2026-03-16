import type { Menu } from '../types';

export const easterMenu: Menu = {
  slug: 'easter',
  title: 'Easter Menu',
  subtitle: 'All sold out — thank you!',
  headerImage: '/assets/img/easter/IMG_6388.jpg',
  featured: true,
  season: 'spring',
  // orderDeadline removed — orders are closed
  items: [
    {
      name: 'Assorted Easter Cookie Box',
      image: '/assets/img/easter/IMG_6434.jpg',
      description: 'An assortment of beautiful Easter cookies, including (6) Buttercream Easter Cookies and (6) Chocolate Chip Egg Nest Cookies.',
      price: '$32 per box',
      soldOut: true,
    },
    {
      name: 'Customized Easter Egg Cookie',
      image: '/assets/img/easter/IMG_6440.jpg',
      description: "Add a customized buttercream sugar cookie to everyone's Easter Baskets this year! Egg-shaped buttercream cookies come in assorted colors with the name of your choice.",
      price: '$5 per cookie',
      soldOut: true,
    },
    {
      name: 'Chocolate Chip Egg Nest Cookies',
      image: '/assets/img/easter/IMG_6471.jpg',
      description: 'Delicious chocolate chip cookies shaped like nests, perfect for the Easter season.',
      price: '$20 per dozen',
      soldOut: true,
    },
  ],
};
