/**
 * Phase 0 of the redesign (#2): the words on the two design samples.
 *
 * Both samples say the same thing, so the owner compares only how they look.
 * This is draft copy in the proposed voice (first person, short sentences,
 * no exclamation marks) for her to react to; menu item names, descriptions
 * and prices still come from src/data/menus/ unchanged. The tagline is left
 * out on purpose: whether to keep it is one of her Phase 0 questions.
 *
 * Phase 1 deletes src/pages/directions/ and src/components/directions/.
 */

export const sampleNames = {
  a: 'the printed card',
  b: 'the kitchen table',
} as const;

export type Direction = keyof typeof sampleNames;

export const resting = {
  label: 'Between seasons',
  heading: 'The kitchen is resting until Valentine’s.',
  body: [
    'Christmas orders are finished for the year. Thank you to everyone who ordered.',
    'The Valentine’s menu comes next. I’ll put it here and on Instagram before orders open.',
  ],
  photo: '/assets/img/homepageCake.jpg',
  photoAlt: 'A layer cake with caramel drip and buttercream swirls on a white cake stand',
};

export const yearRound = {
  heading: 'Made to order all year',
  items: [
    {
      name: 'Cookies',
      href: '/cookies/',
      text: 'Decorated sugar cookies for birthdays, showers and weddings, and plain cookies by the dozen.',
      photo: '/assets/img/weddingCookies.jpg',
      alt: 'Teal and white buttercream rosette cookies on a white platter',
    },
    {
      name: 'Cakes',
      href: '/cakes/',
      text: 'Layer cakes and cupcakes, decorated for the occasion.',
      photo: '/assets/img/birthdayCake.jpg',
      alt: 'A cookies-and-cream layer cake on a white cake stand',
    },
    {
      name: 'Gifts and favors',
      href: '/gifts/',
      text: 'Small boxes of cookies for teachers, guests and thank-yous.',
      photo: '/assets/img/giftsTeacherBox.jpg',
      alt: 'Kraft gift boxes of decorated cookies tied with red and white string',
    },
  ],
};

export const custom = {
  heading: 'A cake or cookies for your own date',
  body: 'Tell me the date, how many people, and what you have in mind. I’ll reply by email with what I can make and the price. Two weeks’ notice is best.',
  link: 'Ask about a custom order',
};

export const follow = {
  heading: 'Follow along',
  body: 'I post new menus and recent orders on Instagram.',
};

export const footer = {
  line: 'A cottage bakery in North Ridgeville, Ohio. Pickup, and delivery nearby.',
};

/** The menu sample shows Christmas as if orders were open. */
export const menuSample = {
  intro:
    'Cookies by the pound, trays for the table and small boxes for gifts. Everything is baked to order in my kitchen.',
  after: 'I’ll reply to every inquiry by email to confirm the order and arrange pickup or delivery.',
  closed: 'Christmas orders are closed for this year.',
  add: 'Add to inquiry',
  remove: 'Remove from inquiry',
  soldOut: 'Sold out',
};
