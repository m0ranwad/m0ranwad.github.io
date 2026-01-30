import type { Menu } from '../types';

// Import optimized images
import gingerbread from '../../assets/img/gingerbread.jpg';
import teacherBox from '../../assets/img/teacherBox.jpg';
import buckeyes from '../../assets/img/buckeyes.jpg';
import cashews from '../../assets/img/cashews.jpg';
import thumbprint from '../../assets/img/thumbprint.jpg';
import grinch from '../../assets/img/grinch.jpg';
import snowball from '../../assets/img/snowball.jpg';
import oatmealShortbread from '../../assets/img/oatmeal-shortbread.jpg';
import glazedSugar from '../../assets/img/glazed-sugar.jpg';
import box from '../../assets/img/box.jpg';

export const christmasMenu: Menu = {
  slug: 'christmas',
  title: 'Christmas Menu',
  subtitle: 'Festive treats for your holiday celebrations',
  headerImage: gingerbread,
  season: 'winter',
  items: [
    {
      name: 'Teacher Boxes',
      image: teacherBox,
      description: 'Two beautiful buttercream sugar cookies thoughtfully packaged and ready to be paired with a coffee gift card of choice (not included). No wrapping necessary for this gift!',
      price: '$7 per box',
    },
    {
      name: 'Buckeyes',
      image: buckeyes,
      description: 'Classic chocolate and peanut butter treats.',
      price: '$10 per dozen',
    },
    {
      name: 'Chocolate Covered Cashews',
      image: cashews,
      description: 'Hand-dipped sea salt cashew clusters composed of 2-3 whole cashews covered in chocolate. Available in 4oz bags or as part of our Christmas cookie trays.',
      price: '$5 per 4oz bag',
    },
    {
      name: 'Thumbprint Cookies',
      image: thumbprint,
      description: 'Buttery, sweet bite-sized cookies with a pop of raspberry. A Christmas cookie tray must-have that brings you back to a simpler time.',
      price: '$16 per pound',
      soldOut: true,
    },
    {
      name: 'Grinch Cookies',
      image: grinch,
      description: "Chewy green cookies infused with a refreshing peppermint flavor. Each cookie is topped with a little red grinch 'heart'. Approximately ~16 cookies per pound.",
      price: '$16 per pound',
      soldOut: true,
    },
    {
      name: 'Snowball Cookies',
      image: snowball,
      description: 'Classic Christmas cookies that melt in your mouth. These do not contain pecans and are made with nut-free ingredients.',
      price: '$16 per pound',
      soldOut: true,
    },
    {
      name: 'Oatmeal Shortbread',
      image: oatmealShortbread,
      description: 'Simple, yet delicious! Hearty oats give these melt-in-your-mouth cookies a slight bite. Offered as part of an assorted cookie tray, as well as by the pound.',
      price: '$16 per pound',
      soldOut: true,
    },
    {
      name: 'Chewy Gingersnaps',
      image: gingerbread,
      description: 'Rich with holiday spices like cinnamon, ginger, and cloves, these gingersnaps pack a punch. Perfectly soft and chewy with a rich molasses flavor.',
      price: '$16 per pound',
      soldOut: true,
    },
    {
      name: 'Glazed Sugar Cookies',
      image: glazedSugar,
      description: 'Classic glazed sugar cookies with designs that vary.',
      price: '$16 per pound',
      soldOut: true,
    },
    {
      name: 'Christmas Cookie Tray',
      image: box,
      description: 'A beautiful tray featuring 38 cookies, including 8 Thumbprints, 8 Gingersnaps, 8 Snowball Cookies, 2 ABC Sugar Cookies (Christmas Tree), 2 ABC Sugar Cookies (Snowflake), 2 ABC Sugar Cookies (Stocking), and 8 Shortbread Cookies.',
      price: '$40 per tray / Two for $75',
      soldOut: true,
    },
  ],
};
