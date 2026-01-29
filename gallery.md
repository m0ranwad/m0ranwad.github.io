---
layout: page
title: Gallery
subtitle: A peek into our sweet creations
permalink: /gallery/
---

<style>
.gallery-filter {
  text-align: center;
  margin: 2rem 0 3rem;
}

.gallery-filter button {
  background: white;
  border: 2px solid var(--sage);
  color: var(--sage);
  padding: 0.75rem 1.5rem;
  margin: 0.5rem;
  border-radius: 8px;
  font-family: 'Inter', sans-serif;
  font-size: 0.9375rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.gallery-filter button:hover,
.gallery-filter button.active {
  background: var(--sage);
  color: white;
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  margin: 0 auto;
  max-width: 1400px;
}

.gallery-item {
  position: relative;
  overflow: hidden;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  background: white;
  cursor: pointer;
}

.gallery-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.15);
}

.gallery-item img {
  width: 100%;
  height: 300px;
  object-fit: cover;
  display: block;
}

.gallery-item .overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.7), transparent);
  color: white;
  padding: 1.5rem 1rem 1rem;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.gallery-item:hover .overlay {
  opacity: 1;
}

.gallery-item .overlay .category {
  font-family: 'Inter', sans-serif;
  font-size: 0.875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* Lightbox */
.lightbox {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.95);
  z-index: 9999;
  justify-content: center;
  align-items: center;
}

.lightbox.active {
  display: flex;
}

.lightbox img {
  max-width: 90%;
  max-height: 90vh;
  object-fit: contain;
  border-radius: 8px;
}

.lightbox-close {
  position: absolute;
  top: 2rem;
  right: 2rem;
  color: white;
  font-size: 3rem;
  cursor: pointer;
  background: rgba(255,255,255,0.1);
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.3s ease;
}

.lightbox-close:hover {
  background: rgba(255,255,255,0.2);
}

.lightbox-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  color: white;
  font-size: 3rem;
  cursor: pointer;
  background: rgba(255,255,255,0.1);
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.3s ease;
  user-select: none;
}

.lightbox-nav:hover {
  background: rgba(255,255,255,0.2);
}

.lightbox-prev {
  left: 2rem;
}

.lightbox-next {
  right: 2rem;
}

@media (max-width: 768px) {
  .gallery-grid {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 1rem;
  }
  
  .gallery-item img {
    height: 200px;
  }
}
</style>

<div style="text-align: center; max-width: 800px; margin: 0 auto 3rem; padding: 0 1rem;">
  <p style="font-size: 1.125rem; line-height: 1.7; color: var(--warm-gray);">
    Every treat tells a story. Browse our collection of cookies, cakes, and sweet creations!
  </p>
</div>

<!-- Filter Buttons -->
<div class="gallery-filter">
  <button class="filter-btn active" data-filter="all">All</button>
  <button class="filter-btn" data-filter="cookies">Cookies</button>
  <button class="filter-btn" data-filter="cakes">Cakes & Cupcakes</button>
  <button class="filter-btn" data-filter="holiday">Holiday Treats</button>
  <button class="filter-btn" data-filter="events">Special Events</button>
</div>

<!-- Gallery Grid -->
<div class="gallery-grid" id="galleryGrid">
  <!-- Images will be loaded here by JavaScript -->
</div>

<!-- Lightbox -->
<div class="lightbox" id="lightbox">
  <span class="lightbox-close" id="lightboxClose">&times;</span>
  <span class="lightbox-nav lightbox-prev" id="lightboxPrev">‹</span>
  <img src="" alt="" id="lightboxImg">
  <span class="lightbox-nav lightbox-next" id="lightboxNext">›</span>
</div>

<!-- CTA Section -->
<div style="background: linear-gradient(135deg, #E8EFE3 0%, #FBF8F3 100%); padding: 3rem 2rem; border-radius: 12px; text-align: center; margin: 4rem 0;">
  <h2 style="font-family: 'Cormorant Garamond', Georgia, serif; font-size: 2rem; color: var(--charcoal); margin-bottom: 1rem;">
    Love What You See?
  </h2>
  <p style="font-size: 1.0625rem; line-height: 1.7; color: var(--warm-gray); margin-bottom: 2rem; max-width: 600px; margin-left: auto; margin-right: auto;">
    Let's create something beautiful for your next celebration!
  </p>
  <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
    <a href="{{ '/order/' | relative_url }}" class="btn-primary-custom">Start Your Order</a>
    <a href="{{ '/contact/' | relative_url }}" class="btn-secondary">Ask a Question</a>
  </div>
</div>

<script>
// Gallery images with categories - RANDOMIZED for better visual variety
const galleryImages = [
  { src: '/assets/img/homepageCookie.jpg', category: 'cookies', title: 'Decorated Cookies' },
  { src: '/assets/img/headers/home/christmasCookies.jpg', category: 'holiday', title: 'Christmas Cookies' },
  { src: '/assets/img/birthdayCake.jpg', category: 'cakes', title: 'Birthday Cake' },
  { src: '/assets/img/easter/IMG_6388.jpg', category: 'holiday', title: 'Easter Cookies' },
  { src: '/assets/img/weddingCookies.jpg', category: 'events', title: 'Wedding Cookies' },
  { src: '/assets/img/sugarCookies.jpg', category: 'cookies', title: 'Sugar Cookies' },
  { src: '/assets/img/thanksgivingMenu.jpg', category: 'holiday', title: 'Thanksgiving' },
  { src: '/assets/img/cakePage.JPG', category: 'cakes', title: 'Cupcakes' },
  { src: '/assets/img/headers/home/gingerbread.jpg', category: 'holiday', title: 'Gingerbread' },
  { src: '/assets/img/cookieBox.jpg', category: 'cookies', title: 'Cookie Box' },
  { src: '/assets/img/bridalShower.jpg', category: 'events', title: 'Bridal Shower' },
  { src: '/assets/img/easter/IMG_6394.jpg', category: 'holiday', title: 'Easter Treats' },
  { src: '/assets/img/chocolateChip.JPG', category: 'cookies', title: 'Chocolate Chip' },
  { src: '/assets/img/headers/home/grinch.jpg', category: 'holiday', title: 'Grinch Cookies' },
  { src: '/assets/img/homepageCake.jpg', category: 'cakes', title: 'Custom Cake' },
  { src: '/assets/img/babyShower.jpg', category: 'events', title: 'Baby Shower' },
  { src: '/assets/img/box.jpg', category: 'holiday', title: 'Cookie Gift Box' },
  { src: '/assets/img/noBake.jpg', category: 'cookies', title: 'No-Bake Cookies' },
  { src: '/assets/img/headers/home/Valentines.jpg', category: 'holiday', title: "Valentine's Cookies" },
  { src: '/assets/img/weddingCake.jpg', category: 'cakes', title: 'Wedding Cake' },
  { src: '/assets/img/easter/IMG_6434.jpg', category: 'holiday', title: 'Spring Celebration' },
  { src: '/assets/img/thumbprint.jpg', category: 'cookies', title: 'Thumbprint Cookies' },
  { src: '/assets/img/buckeyes.jpg', category: 'holiday', title: 'Buckeyes' },
  { src: '/assets/img/weddingCookies2.jpg', category: 'events', title: 'Wedding Favors' },
  { src: '/assets/img/headers/home/cupcakes1.jpg', category: 'cakes', title: 'Buttercream Cupcakes' },
  { src: '/assets/img/glazed-sugar.jpg', category: 'holiday', title: 'Glazed Sugar Cookies' },
  { src: '/assets/img/headers/home/thumbprint.jpg', category: 'cookies', title: 'Raspberry Thumbprint' },
  { src: '/assets/img/headers/home/halloweenCupcakes.jpg', category: 'holiday', title: 'Halloween Cupcakes' },
  { src: '/assets/img/giftsTeacherBox.jpg', category: 'events', title: 'Teacher Gifts' },
  { src: '/assets/img/grinch.jpg', category: 'holiday', title: 'Grinch Treats' },
  { src: '/assets/img/gingerbread.jpg', category: 'cookies', title: 'Gingersnaps' },
  { src: '/assets/img/easter/IMG_6471.jpg', category: 'holiday', title: 'Easter Basket' },
  { src: '/assets/img/Valentines.jpg', category: 'holiday', title: "Valentine's Day" },
  { src: '/assets/img/oatmeal-shortbread.jpg', category: 'cookies', title: 'Shortbread' },
  { src: '/assets/img/snowball.jpg', category: 'holiday', title: 'Snowball Cookies' },
  { src: '/assets/img/teacher-box.jpg', category: 'events', title: 'Gift Boxes' },
  { src: '/assets/img/cashews.jpg', category: 'cookies', title: 'Chocolate Cashews' },
  { src: '/assets/img/halloweenPage.jpg', category: 'holiday', title: 'Halloween Treats' },
  { src: '/assets/img/bread.jpg', category: 'holiday', title: 'Fresh Baked Bread' },
  { src: '/assets/img/headers/home/cranMuffins.jpg', category: 'holiday', title: 'Cranberry Muffins' },
  { src: '/assets/img/mothersday/1.jpg', category: 'holiday', title: "Mother's Day" }
];

// Current lightbox index
let currentLightboxIndex = 0;
let filteredImages = [...galleryImages];

// Render gallery
function renderGallery(filter = 'all') {
  const grid = document.getElementById('galleryGrid');
  grid.innerHTML = '';
  
  filteredImages = filter === 'all' 
    ? [...galleryImages]
    : galleryImages.filter(img => img.category === filter);
  
  filteredImages.forEach((img, index) => {
    const item = document.createElement('div');
    item.className = 'gallery-item';
    item.innerHTML = `
      <img src="${img.src}" alt="${img.title}" loading="lazy">
      <div class="overlay">
        <div class="category">${img.category}</div>
      </div>
    `;
    item.addEventListener('click', () => openLightbox(index));
    grid.appendChild(item);
  });
}

// Filter buttons
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    e.target.classList.add('active');
    renderGallery(e.target.dataset.filter);
  });
});

// Lightbox functions
function openLightbox(index) {
  currentLightboxIndex = index;
  const lightbox = document.getElementById('lightbox');
  const img = document.getElementById('lightboxImg');
  img.src = filteredImages[index].src;
  img.alt = filteredImages[index].title;
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  document.getElementById('lightbox').classList.remove('active');
  document.body.style.overflow = 'auto';
}

function navigateLightbox(direction) {
  currentLightboxIndex += direction;
  if (currentLightboxIndex < 0) currentLightboxIndex = filteredImages.length - 1;
  if (currentLightboxIndex >= filteredImages.length) currentLightboxIndex = 0;
  
  const img = document.getElementById('lightboxImg');
  img.src = filteredImages[currentLightboxIndex].src;
  img.alt = filteredImages[currentLightboxIndex].title;
}

// Event listeners
document.getElementById('lightboxClose').addEventListener('click', closeLightbox);
document.getElementById('lightboxPrev').addEventListener('click', () => navigateLightbox(-1));
document.getElementById('lightboxNext').addEventListener('click', () => navigateLightbox(1));
document.getElementById('lightbox').addEventListener('click', (e) => {
  if (e.target.id === 'lightbox') closeLightbox();
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
  const lightbox = document.getElementById('lightbox');
  if (!lightbox.classList.contains('active')) return;
  
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') navigateLightbox(-1);
  if (e.key === 'ArrowRight') navigateLightbox(1);
});

// Initialize gallery
renderGallery();
</script>
