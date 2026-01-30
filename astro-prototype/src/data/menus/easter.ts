import type { Menu } from '../types';

export const easterMenu: Menu = {
  slug: 'easter',
  title: 'Easter Menu',
  subtitle: 'Spring celebrations made sweeter',
  headerImage: '/assets/img/easter/IMG_6388.jpg',
  season: 'spring',
  items: [
    {
      name: 'Assorted Easter Cookie Box',
      image: '/assets/img/easter/IMG_6434.jpg',
      description: 'An assortment of beautiful Easter cookies, including (6) Buttercream Easter Cookies and (6) Chocolate Chip Egg Nest Cookies.',
      price: '$32 per box',
    },
    {
      name: 'Customized Easter Egg Cookie',
      image: '/assets/img/easter/IMG_6440.jpg',
      description: "Add a customized buttercream sugar cookie to everyone's Easter Baskets this year! Egg-shaped buttercream cookies come in assorted colors with the name of your choice.",
      price: '$5 per cookie',
    },
    {
      name: 'Chocolate Chip Egg Nest Cookies',
      image: '/assets/img/easter/IMG_6471.jpg',
      description: 'Delicious chocolate chip cookies shaped like nests, perfect for the Easter season.',
      price: '$20 per dozen',
    },
  ],
};
