import type { Menu } from '../types';

export const cookiesMenu: Menu = {
  slug: 'cookies',
  title: 'Cookie Menu',
  subtitle: 'Handcrafted cookies for every occasion',
  headerImage: '/assets/img/thumbprint.jpg',
  season: 'year-round',
  items: [
    {
      name: 'No-Bake Cookies',
      image: '/assets/img/noBake.jpg',
      description: 'Rich chocolate and oats, made without baking.',
      price: '$8/dozen',
    },
    {
      name: 'Sugar Cookies',
      image: '/assets/img/sugarCookies.jpg',
      description: 'Soft and sweet sugar cookies with a hint of vanilla. Check out more designs!',
      price: '$24/dozen',
      link: '/cookies/sugar/',
    },
    {
      name: 'Chewy Gingersnaps',
      image: '/assets/img/gingerbread.jpg',
      description: 'Spiced cookies with a chewy texture and ginger flavor.',
      price: '$18/lb',
    },
    {
      name: 'Chewy Chocolate Chip Cookies',
      image: '/assets/img/chocolateChip.JPG',
      description: 'Classic chocolate chip cookies with a crisp edge and chewy center.',
      price: '$12/dozen',
    },
    {
      name: 'Shortbread Cookies',
      image: '/assets/img/oatmeal-shortbread.jpg',
      description: 'Buttery and crumbly oatmeal cookies that melt in your mouth.',
      price: '$16/lb',
    },
    {
      name: 'Raspberry Thumbprint',
      image: '/assets/img/thumbprint.jpg',
      description: 'Buttery cookies filled with sweet raspberry jam.',
      price: '$20/lb',
    },
  ],
};
