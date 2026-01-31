import type { GalleryImage, GalleryFilter } from './types';

/**
 * Gallery filter categories
 */
export const galleryFilters: GalleryFilter[] = [
  { id: 'all', label: 'All' },
  { id: 'cookies', label: 'Cookies' },
  { id: 'cakes', label: 'Cakes & Cupcakes' },
  { id: 'holiday', label: 'Holiday Treats' },
  { id: 'events', label: 'Special Events' },
];

/**
 * Gallery images with categories
 * Organized for visual variety when displayed
 */
export const galleryImages: GalleryImage[] = [
  { src: '/assets/img/homepageCookie.jpg', category: 'cookies', alt: 'Decorated buttercream cookies' },
  { src: '/assets/img/headers/home/christmasCookies.jpg', category: 'holiday', alt: 'Christmas decorated cookies' },
  { src: '/assets/img/birthdayCake.jpg', category: 'cakes', alt: 'Triple-layer birthday cake with buttercream' },
  { src: '/assets/img/easter/IMG_6388.jpg', category: 'holiday', alt: 'Easter decorated cookies' },
  { src: '/assets/img/weddingCookies.jpg', category: 'events', alt: 'Elegant wedding cookie favors' },
  { src: '/assets/img/sugarCookies.jpg', category: 'cookies', alt: 'Decorated sugar cookies' },
  { src: '/assets/img/cakePage.JPG', category: 'cakes', alt: 'Assorted buttercream cupcakes' },
  { src: '/assets/img/headers/home/gingerbread.jpg', category: 'holiday', alt: 'Gingerbread cookies' },
  { src: '/assets/img/box.jpg', category: 'cookies', alt: 'Packaged cookie gift box' },
  { src: '/assets/img/bridalShower.jpg', category: 'events', alt: 'Bridal shower cookies' },
  { src: '/assets/img/easter/IMG_6394.jpg', category: 'holiday', alt: 'Easter basket treats' },
  { src: '/assets/img/chocolateChip.JPG', category: 'cookies', alt: 'Chewy chocolate chip cookies' },
  { src: '/assets/img/headers/home/grinch.jpg', category: 'holiday', alt: 'Grinch-themed cookies' },
  { src: '/assets/img/homepageCake.jpg', category: 'cakes', alt: 'Custom decorated cake' },
  { src: '/assets/img/babyShower.jpg', category: 'events', alt: 'Baby shower themed cookies' },
  { src: '/assets/img/noBake.jpg', category: 'cookies', alt: 'No-bake chocolate cookies' },
  { src: '/assets/img/headers/home/Valentines.jpg', category: 'holiday', alt: "Valentine's Day cookies" },
  { src: '/assets/img/weddingCake.jpg', category: 'cakes', alt: 'Elegant wedding cake' },
  { src: '/assets/img/easter/IMG_6434.jpg', category: 'holiday', alt: 'Spring celebration cookies' },
  { src: '/assets/img/thumbprint.jpg', category: 'cookies', alt: 'Raspberry thumbprint cookies' },
  { src: '/assets/img/buckeyes.jpg', category: 'holiday', alt: 'Chocolate peanut butter buckeyes' },
  { src: '/assets/img/weddingCookies2.jpg', category: 'events', alt: 'Wedding favor cookies' },
  { src: '/assets/img/headers/home/cupcakes1.jpg', category: 'cakes', alt: 'Buttercream decorated cupcakes' },
  { src: '/assets/img/glazed-sugar.jpg', category: 'holiday', alt: 'Glazed sugar cookies' },
  { src: '/assets/img/headers/home/thumbprint.jpg', category: 'cookies', alt: 'Thumbprint cookies closeup' },
  { src: '/assets/img/headers/home/halloweenCupcakes.jpg', category: 'holiday', alt: 'Halloween themed cupcakes' },
  { src: '/assets/img/giftsTeacherBox.jpg', category: 'events', alt: 'Teacher appreciation gift box' },
  { src: '/assets/img/grinch.jpg', category: 'holiday', alt: 'Grinch heart cookies' },
  { src: '/assets/img/gingerbread.jpg', category: 'cookies', alt: 'Chewy gingersnap cookies' },
  { src: '/assets/img/easter/IMG_6471.jpg', category: 'holiday', alt: 'Chocolate egg nest cookies' },
  { src: '/assets/img/Valentines.jpg', category: 'holiday', alt: "Valentine's Day treats" },
  { src: '/assets/img/oatmeal-shortbread.jpg', category: 'cookies', alt: 'Oatmeal shortbread cookies' },
  { src: '/assets/img/snowball.jpg', category: 'holiday', alt: 'Snowball Christmas cookies' },
  { src: '/assets/img/teacher-box.jpg', category: 'events', alt: 'Gift boxes for teachers' },
  { src: '/assets/img/cashews.jpg', category: 'cookies', alt: 'Chocolate covered cashews' },
  { src: '/assets/img/halloweenPage.jpg', category: 'holiday', alt: 'Halloween Boo Box' },
  { src: '/assets/img/bread.jpg', category: 'holiday', alt: 'Fresh baked cranberry orange bread' },
  { src: '/assets/img/headers/home/cranMuffins.jpg', category: 'holiday', alt: 'Cranberry orange muffins' },
  { src: '/assets/img/mothersday/1.jpg', category: 'holiday', alt: "Mother's Day floral cupcakes" },
];

/**
 * Get images by category
 */
export function getImagesByCategory(category: GalleryImage['category'] | 'all'): GalleryImage[] {
  if (category === 'all') {
    return galleryImages;
  }
  return galleryImages.filter(img => img.category === category);
}
