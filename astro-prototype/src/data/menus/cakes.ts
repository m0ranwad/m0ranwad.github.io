import type { Menu } from '../types';

export const cakesMenu: Menu = {
  slug: 'cakes',
  title: 'Custom Cakes',
  subtitle: 'Beautiful cakes designed just for you',
  headerImage: '/assets/img/birthdayCake.jpg',
  season: 'year-round',
  items: [
    {
      name: 'Birthday Cake',
      image: '/assets/img/birthdayCake.jpg',
      description: 'Triple-layered cake with rich buttercream frosting, made with all dye-free ingredients.',
      price: '$80',
    },
    {
      name: 'Cupcakes',
      image: '/assets/img/cakePage.jpg',
      description: 'Moist cupcakes topped with creamy dye-free buttercream, perfect for any occasion.',
      price: '$4 each',
    },
  ],
};
