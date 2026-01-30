import type { Menu } from '../types';

// Import optimized images
import thumbprint from '../../assets/img/thumbprint.jpg';
import noBake from '../../assets/img/noBake.jpg';
import sugarCookies from '../../assets/img/sugarCookies.jpg';
import gingerbread from '../../assets/img/gingerbread.jpg';
import chocolateChip from '../../assets/img/chocolateChip.JPG.jpg';
import oatmealShortbread from '../../assets/img/oatmeal-shortbread.jpg';

export const cookiesMenu: Menu = {
  slug: 'cookies',
  title: 'Cookie Menu',
  subtitle: 'Handcrafted cookies for every occasion',
  headerImage: thumbprint,
  season: 'year-round',
  items: [
    {
      name: 'No-Bake Cookies',
      image: noBake,
      description: 'Rich chocolate and oats, made without baking.',
      price: '$8/dozen',
    },
    {
      name: 'Sugar Cookies',
      image: sugarCookies,
      description: 'Soft and sweet sugar cookies with a hint of vanilla. Check out more designs!',
      price: '$24/dozen',
      link: '/cookies/sugar/',
    },
    {
      name: 'Chewy Gingersnaps',
      image: gingerbread,
      description: 'Spiced cookies with a chewy texture and ginger flavor.',
      price: '$18/lb',
    },
    {
      name: 'Chewy Chocolate Chip Cookies',
      image: chocolateChip,
      description: 'Classic chocolate chip cookies with a crisp edge and chewy center.',
      price: '$12/dozen',
    },
    {
      name: 'Shortbread Cookies',
      image: oatmealShortbread,
      description: 'Buttery and crumbly oatmeal cookies that melt in your mouth.',
      price: '$16/lb',
    },
    {
      name: 'Raspberry Thumbprint',
      image: thumbprint,
      description: 'Buttery cookies filled with sweet raspberry jam.',
      price: '$20/lb',
    },
  ],
};
