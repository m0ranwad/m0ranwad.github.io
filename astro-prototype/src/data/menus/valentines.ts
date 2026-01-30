import type { Menu } from '../types';

// Import optimized images
import lemonRaspberry from '../../assets/img/valentines/lemonRaspberry.jpg';
import antiValentine from '../../assets/img/valentines/antiValentine.jpg';
import chocolateCoveredRaspberry from '../../assets/img/valentines/chocolateCoveredRaspberry.jpg';
import cookiesCreamDreams from '../../assets/img/valentines/cookiesCreamDreams.jpg';
import tastersBox from '../../assets/img/valentines/tastersBox.jpg';
import lemonRaspberryMinis from '../../assets/img/valentines/lemonRaspberry_minis.jpg';
import antiValentineMini from '../../assets/img/valentines/antiValentine_mini1.jpg';
import menu1 from '../../assets/img/valentines/menu1.jpg';

export const valentinesMenu: Menu = {
  slug: 'valentines',
  title: "Valentine's Menu",
  subtitle: 'Sweet treats to celebrate love',
  headerImage: menu1,
  featured: true,
  season: 'winter',
  orderFormUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSf_VXJVtlP_7VwEm6qwcfbmFA719NcxRj-Rs8WCRxmUYEDqDg/viewform',
  items: [
    {
      name: 'Lemon Raspberry',
      image: lemonRaspberry,
      description: 'A light lemony cookie covered with swirls of raspberry and vanilla buttercream. Pearls are optional.',
      price: '$3.50 per cookie / $38 per dozen',
    },
    {
      name: 'Anti-Valentine',
      image: antiValentine,
      description: 'Black cocoa cookies covered with swirls of black chocolate and vanilla buttercream. Included in Taster\'s Box.',
      price: '$3.50 per cookie / $38 per dozen',
    },
    {
      name: 'Chocolate Covered Raspberry',
      image: chocolateCoveredRaspberry,
      description: 'Black cocoa cookie covered with swirls of raspberry and vanilla buttercream. Pearls are optional.',
      price: '$3.50 per cookie / $38 per dozen',
    },
    {
      name: 'Cookies & Cream Dreams',
      image: cookiesCreamDreams,
      description: 'Black cocoa cookie covered with swirls of vanilla buttercream. Optional crystal sprinkles.',
      price: '$3.50 per cookie / $38 per dozen',
    },
    {
      name: "Taster's Box",
      image: tastersBox,
      description: "A great way to try a little bit of everything. Contains 6 cookies, including our top flavors like Lemon Raspberry and Chocolate Covered Raspberry. Perfect for enjoying with the kids, a girls' night in, or as a thank-you gift.",
      price: '$12 per box',
    },
    {
      name: 'Lemon Raspberry (Petite)',
      image: lemonRaspberryMinis,
      description: "A light lemony cookie covered with swirls of raspberry and vanilla buttercream. Included as part of our Taster's Box.",
      price: '$15 per dozen (Sharing is Caring)',
    },
    {
      name: 'Anti-Valentine (Petite)',
      image: antiValentineMini,
      description: "Black cocoa cookies covered with swirls of black chocolate and vanilla buttercream. Included as part of our Taster's Box.",
      price: '$15 per dozen (Sharing is Caring)',
    },
  ],
};
