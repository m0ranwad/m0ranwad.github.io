import type { SeasonalMenu } from '../types';

export const halloweenMenu: SeasonalMenu = {
  slug: 'halloween',
  kind: 'seasonal',
  // What the site says about this menu. One of 'coming-soon', 'open',
  // 'sold-out' or 'past'; see SeasonStatus in ../types.ts.
  status: 'past',
  title: 'Halloween Menu',
  subtitle: 'Spooky-cute treats for Halloween fun',
  description: 'Halloween cookies and spooky treats from Thymeless Treats Bakery. Order fun and festive sugar cookies for your Halloween party.',
  intro: 'Spooky-sweet treats that are frighteningly delicious!',
  headerImage: '/assets/img/headers/home/halloweenCupcakes.jpg',
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
