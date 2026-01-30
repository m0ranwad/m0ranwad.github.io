import type { Menu } from '../types';

// Import optimized images
import giftsTeacherBox from '../../assets/img/giftsTeacherBox.jpg';
import giftsPartyFavor from '../../assets/img/giftsPartyFavor.JPG.jpg';

export const giftsMenu: Menu = {
  slug: 'gifts',
  title: 'Gifts & Party Favors',
  subtitle: 'Thoughtful treats for showing appreciation',
  headerImage: giftsTeacherBox,
  season: 'year-round',
  items: [
    {
      name: 'Teacher Appreciation Boxes',
      image: giftsTeacherBox,
      description: 'Show your appreciation with a sweet holiday thank-you gift featuring three beautifully decorated buttercream sugar cookies. Each box is neatly packaged, making it the perfect companion to a gift card or heartfelt note. A wonderful way to bring a smile to teachers, caregivers, or anyone who deserves special recognition!',
      price: '$7.50',
    },
    {
      name: 'Party Favor Packs',
      image: giftsPartyFavor,
      description: 'Make any celebration extra special with two dozen individually wrapped cookies—choose chocolate chip or sugar cookies. Perfect for birthdays, classroom parties, office celebrations, or any gathering where you want to share a touch of sweetness with everyone!',
      price: '$36',
    },
  ],
};
