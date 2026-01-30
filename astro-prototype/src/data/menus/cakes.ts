import type { Menu } from '../types';

// Import optimized images
import birthdayCake from '../../assets/img/birthdayCake.jpg';
import cakePage from '../../assets/img/cakePage.JPG.jpg';

export const cakesMenu: Menu = {
  slug: 'cakes',
  title: 'Custom Cakes',
  subtitle: 'Beautiful cakes designed just for you',
  headerImage: birthdayCake,
  season: 'year-round',
  items: [
    {
      name: 'Birthday Cake',
      image: birthdayCake,
      description: 'Triple-layered cake with rich buttercream frosting, made with all dye-free ingredients.',
      price: '$80',
    },
    {
      name: 'Cupcakes',
      image: cakePage,
      description: 'Moist cupcakes topped with creamy dye-free buttercream, perfect for any occasion.',
      price: '$4 each',
    },
  ],
};
