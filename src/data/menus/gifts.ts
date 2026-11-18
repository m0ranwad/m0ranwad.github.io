import type { YearRoundMenu } from '../types';

export const giftsMenu: YearRoundMenu = {
  slug: 'gifts',
  kind: 'year-round',
  title: 'Gifts & Party Favors',
  subtitle: 'Thoughtful treats for showing appreciation',
  description: 'Cookie gift boxes and treat bundles from Thymeless Treats Bakery. Perfect for corporate gifts, thank you gifts, and special occasions.',
  intro: 'Beautifully packaged treats that make the perfect gift. Available year-round!',
  cta: {
    title: 'Corporate & Bulk Orders',
    text: 'Planning a corporate event or need bulk orders? Contact us for special pricing and custom packaging options.',
  },
  headerImage: '/assets/img/giftsTeacherBox.jpg',
  items: [
    {
      name: 'Teacher Appreciation Boxes',
      image: '/assets/img/giftsTeacherBox.jpg',
      description: 'Show your appreciation with a sweet holiday thank-you gift featuring three beautifully decorated buttercream sugar cookies. Each box is neatly packaged, making it the perfect companion to a gift card or heartfelt note. A wonderful way to bring a smile to teachers, caregivers, or anyone who deserves special recognition!',
      price: '$7.50',
    },
    {
      name: 'Party Favor Packs',
      image: '/assets/img/giftsPartyFavor.JPG',
      description: 'Make any celebration extra special with two dozen individually wrapped cookies—choose chocolate chip or sugar cookies. Perfect for birthdays, classroom parties, office celebrations, or any gathering where you want to share a touch of sweetness with everyone!',
      price: '$36',
    },
  ],
};
