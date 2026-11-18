import type { SeasonalMenu } from '../types';

export const mothersdayMenu: SeasonalMenu = {
  slug: 'mothersday',
  kind: 'seasonal',
  // What the site says about this menu. One of 'coming-soon', 'open',
  // 'sold-out' or 'past'; see SeasonStatus in ../types.ts.
  status: 'past',
  title: "Mother's Day Menu",
  subtitle: 'Honor Mom with elegant treats',
  description: "Mother's Day cookies and treats from Thymeless Treats Bakery. Order beautiful sugar cookies to celebrate Mom.",
  intro: 'Show Mom how sweet she is with these handcrafted treats.',
  headerImage: '/assets/img/mothersday/1.jpg',
  items: [
    {
      name: "Mother's Day Floral Cupcake Box",
      image: '/assets/img/mothersday/1.jpg',
      description: 'An assortment of beautiful floral cupcakes, including (6) Vanilla Buttercream Cupcakes.',
      price: '$22 per box',
    },
  ],
};
