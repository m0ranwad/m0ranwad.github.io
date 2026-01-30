import type { Menu } from '../types';

export const christmasMenu: Menu = {
  slug: 'christmas',
  title: 'Christmas Menu',
  subtitle: 'Festive treats for your holiday celebrations',
  headerImage: '/assets/img/headers/home/gingerbread.jpg',
  season: 'winter',
  items: [
    {
      name: 'Teacher Boxes',
      image: '/assets/img/teacherBox.jpg',
      description: 'Two beautiful buttercream sugar cookies thoughtfully packaged and ready to be paired with a coffee gift card of choice (not included). No wrapping necessary for this gift!',
      price: '$7 per box',
    },
    {
      name: 'Buckeyes',
      image: '/assets/img/buckeyes.jpg',
      description: 'Classic chocolate and peanut butter treats.',
      price: '$10 per dozen',
    },
    {
      name: 'Chocolate Covered Cashews',
      image: '/assets/img/cashews.jpg',
      description: 'Hand-dipped sea salt cashew clusters composed of 2-3 whole cashews covered in chocolate. Available in 4oz bags or as part of our Christmas cookie trays.',
      price: '$5 per 4oz bag',
    },
    {
      name: 'Thumbprint Cookies',
      image: '/assets/img/thumbprint.jpg',
      description: 'Buttery, sweet bite-sized cookies with a pop of raspberry. A Christmas cookie tray must-have that brings you back to a simpler time.',
      price: '$16 per pound',
      soldOut: true,
    },
    {
      name: 'Grinch Cookies',
      image: '/assets/img/grinch.jpg',
      description: "Chewy green cookies infused with a refreshing peppermint flavor. Each cookie is topped with a little red grinch 'heart'. Approximately ~16 cookies per pound.",
      price: '$16 per pound',
      soldOut: true,
    },
    {
      name: 'Snowball Cookies',
      image: '/assets/img/snowball.jpg',
      description: 'Classic Christmas cookies that melt in your mouth. These do not contain pecans and are made with nut-free ingredients.',
      price: '$16 per pound',
      soldOut: true,
    },
    {
      name: 'Oatmeal Shortbread',
      image: '/assets/img/oatmeal-shortbread.jpg',
      description: 'Simple, yet delicious! Hearty oats give these melt-in-your-mouth cookies a slight bite. Offered as part of an assorted cookie tray, as well as by the pound.',
      price: '$16 per pound',
      soldOut: true,
    },
    {
      name: 'Chewy Gingersnaps',
      image: '/assets/img/gingerbread.jpg',
      description: 'Rich with holiday spices like cinnamon, ginger, and cloves, these gingersnaps pack a punch. Perfectly soft and chewy with a rich molasses flavor.',
      price: '$16 per pound',
      soldOut: true,
    },
    {
      name: 'Glazed Sugar Cookies',
      image: '/assets/img/glazed-sugar.jpg',
      description: 'Classic glazed sugar cookies with designs that vary.',
      price: '$16 per pound',
      soldOut: true,
    },
    {
      name: 'Christmas Cookie Tray',
      image: '/assets/img/box.jpg',
      description: 'A beautiful tray featuring 38 cookies, including 8 Thumbprints, 8 Gingersnaps, 8 Snowball Cookies, 2 ABC Sugar Cookies (Christmas Tree), 2 ABC Sugar Cookies (Snowflake), 2 ABC Sugar Cookies (Stocking), and 8 Shortbread Cookies.',
      price: '$40 per tray / Two for $75',
      soldOut: true,
    },
  ],
};
