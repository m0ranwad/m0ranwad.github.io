import type { Menu } from '../types';

export const halloweenMenu: Menu = {
  slug: 'halloween',
  title: 'Halloween Menu',
  subtitle: 'Spooky-cute treats for Halloween fun',
  headerImage: '/assets/img/headers/home/halloweenCupcakes.jpg',
  season: 'fall',
  items: [
    {
      name: 'Spooktacular Boo Box',
      image: '/assets/img/halloweenPage.jpg',
      description: 'Spooky black cocoa buttercream and vibrant orange Halloween Oreos are the stars of this spooktacular Boo Box.',
      price: '$14 each',
    },
    {
      name: 'Halloween Cupcakes',
      image: '/assets/img/headers/home/halloweenCupcakes.jpg',
      description: 'Fun and festive Halloween cupcakes with themed buttercream decorations. Perfect for parties, trick-or-treat nights, or a spooky sweet treat!',
      price: '$30 per dozen',
    },
  ],
};
