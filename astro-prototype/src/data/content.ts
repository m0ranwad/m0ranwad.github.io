import type { FAQItem, ContactMethod } from './types';

/**
 * Contact methods displayed on the contact page
 */
export const contactMethods: ContactMethod[] = [
  {
    icon: '📸',
    title: 'Instagram',
    description: 'Follow along for behind-the-scenes baking, new creations, and seasonal menu updates',
    linkText: '@thymelesstreatsbakery',
    linkUrl: 'https://www.instagram.com/thymelesstreatsbakery/',
    external: true,
  },
  {
    icon: '👥',
    title: 'Facebook',
    description: 'Join the community for updates on pop-ups, new menu items, and special announcements',
    linkText: 'Visit Facebook Page',
    linkUrl: 'https://www.facebook.com/thymelesstreatsbakery/',
    external: true,
  },
  {
    icon: '✉️',
    title: 'Email',
    description: 'Send me a message about custom orders or any questions you have',
    linkText: 'Send Email',
    linkUrl: 'mailto:thymelesstreatsbakery@gmail.com',
    external: false,
  },
];

/**
 * FAQ items displayed on the contact page
 */
export const faqItems: FAQItem[] = [
  {
    question: 'How do I place an order?',
    answer: 'Check out the seasonal menus and click "Order Now," or reach out via Instagram or email for custom orders!',
  },
  {
    question: 'How much notice do you need?',
    answer: 'I recommend at least 2 weeks for custom orders, especially during the busy holiday season. Rush orders may be available - just ask!',
  },
  {
    question: 'Do you deliver?',
    answer: 'Yes! I offer local delivery in the North Ridgeville area. Delivery details and fees are confirmed when you place your order.',
  },
  {
    question: 'Can you make custom designs?',
    answer: "Absolutely! I love custom designs. Share your ideas, theme, or inspiration and I'll create something perfect for you!",
  },
];

/**
 * About page content
 */
export const aboutContent = {
  intro: "I'm Allie, a home baker in North Ridgeville creating buttercream cookies, custom cakes, and seasonal treats. This is my creative outlet where the familiar comfort of baking meets fresh inspiration.",
  
  cards: [
    {
      icon: '🍪',
      title: 'What I Bake',
      description: 'Signature buttercream cookies, custom cakes and cupcakes, seasonal holiday treats, chocolate-dipped specialties, and dessert breads.',
    },
    {
      icon: '💝',
      title: 'My Approach',
      description: 'Small-batch cottage bakery with dye-free options available. Every order is custom-made with quality ingredients and attention to detail.',
    },
  ],
  
  closing: 'Thanks for stopping by!',
};
