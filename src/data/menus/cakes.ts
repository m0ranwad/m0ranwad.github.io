import type { YearRoundMenu } from '../types';

export const cakesMenu: YearRoundMenu = {
  slug: 'cakes',
  kind: 'year-round',
  title: 'Custom Cakes',
  subtitle: 'Beautiful cakes designed just for you',
  description: 'Custom cakes from Thymeless Treats Bakery. Order beautiful birthday cakes, celebration cakes, and custom designs.',
  intro: 'Stunning custom cakes that taste as good as they look. Available year-round!',
  cta: {
    title: "Let's Create Your Perfect Cake",
    text: "Every cake is custom designed. Share your vision and we'll bring it to life!",
  },
  headerImage: '/assets/img/birthdayCake.jpg',
  items: [
    {
      name: 'Birthday Cake',
      image: '/assets/img/birthdayCake.jpg',
      description: 'Triple-layered cake with rich buttercream frosting, made with all dye-free ingredients.',
      price: '$80',
    },
    {
      name: 'Cupcakes',
      image: '/assets/img/cakePage.JPG',
      description: 'Moist cupcakes topped with creamy dye-free buttercream, perfect for any occasion.',
      price: '$4 each',
    },
  ],
};
