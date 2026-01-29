---
layout: page
title: Place Your Order
subtitle: Let's create something sweet together!
permalink: /inquiry/
---

<div class="inquiry-intro">
  <p>
    Thanks for your interest! Select what you'd like to order below, and I'll get back to you with availability and next steps.
  </p>
</div>

<!-- Inquiry Type Selector -->
<div class="inquiry-type-selector" id="inquirySelector">
  <div class="inquiry-card" data-type="seasonal">
    <div class="icon">🎄</div>
    <h3>Seasonal Menu Item</h3>
    <p>Order from our current seasonal offerings</p>
  </div>
  
  <div class="inquiry-card" data-type="custom-cookies">
    <div class="icon">🍪</div>
    <h3>Custom Cookies</h3>
    <p>Personalized decorated cookies for your event</p>
  </div>
  
  <div class="inquiry-card" data-type="custom-cake">
    <div class="icon">🎂</div>
    <h3>Custom Cake</h3>
    <p>Birthday, wedding, or celebration cake</p>
  </div>
  
  <div class="inquiry-card" data-type="gifts">
    <div class="icon">🎁</div>
    <h3>Gifts & Favors</h3>
    <p>Teacher boxes or party favor packs</p>
  </div>
</div>

<!-- Seasonal Menu Form -->
<div class="inquiry-form-container" id="form-seasonal">
  <h2 style="font-family: 'Cormorant Garamond', Georgia, serif; text-align: center; margin-bottom: 2rem;">Seasonal Menu Inquiry</h2>
  
  <form action="https://formspree.io/f/YOUR_FORMSPREE_ID" method="POST">
    <input type="hidden" name="inquiry_type" value="Seasonal Menu">
    
    <div class="form-field">
      <label for="seasonal-name">Your Name *</label>
      <input type="text" id="seasonal-name" name="name" required>
    </div>
    
    <div class="form-field">
      <label for="seasonal-email">Email *</label>
      <input type="email" id="seasonal-email" name="email" required>
    </div>
    
    <div class="form-field">
      <label for="seasonal-phone">Phone Number</label>
      <input type="tel" id="seasonal-phone" name="phone">
    </div>
    
    <div class="form-field">
      <label for="seasonal-menu">Which Menu? *</label>
      <select id="seasonal-menu" name="menu" required>
        <option value="">Select a menu...</option>
        <option value="Thanksgiving">Thanksgiving</option>
        <option value="Christmas">Christmas</option>
        <option value="Valentine's Day">Valentine's Day</option>
        <option value="Easter">Easter</option>
        <option value="Mother's Day">Mother's Day</option>
        <option value="Halloween">Halloween</option>
      </select>
    </div>
    
    <div class="form-field">
      <label for="seasonal-items">What would you like to order? *</label>
      <textarea id="seasonal-items" name="items" placeholder="Example: 2 dozen sugar cookies, 1 teacher box..." required></textarea>
    </div>
    
    <div class="form-field">
      <label for="seasonal-date">When do you need it? *</label>
      <input type="date" id="seasonal-date" name="date" required>
    </div>
    
    <div class="form-field">
      <label for="seasonal-notes">Additional Notes or Questions</label>
      <textarea id="seasonal-notes" name="notes" placeholder="Dietary restrictions, design preferences, pickup/delivery questions..."></textarea>
    </div>
    
    <div class="info-box">
      <p><strong>💡 What happens next?</strong> I'll review your inquiry and get back to you within 24 hours with availability, pricing details, and next steps!</p>
    </div>
    
    <div class="form-actions">
      <button type="button" class="btn-back" onclick="resetForm()">← Back</button>
      <button type="submit" class="btn-submit">Submit Inquiry</button>
    </div>
  </form>
</div>

<!-- Custom Cookies Form -->
<div class="inquiry-form-container" id="form-custom-cookies">
  <h2 style="font-family: 'Cormorant Garamond', Georgia, serif; text-align: center; margin-bottom: 2rem;">Custom Cookie Inquiry</h2>
  
  <form action="https://formspree.io/f/YOUR_FORMSPREE_ID" method="POST">
    <input type="hidden" name="inquiry_type" value="Custom Cookies">
    
    <div class="form-field">
      <label for="cookie-name">Your Name *</label>
      <input type="text" id="cookie-name" name="name" required>
    </div>
    
    <div class="form-field">
      <label for="cookie-email">Email *</label>
      <input type="email" id="cookie-email" name="email" required>
    </div>
    
    <div class="form-field">
      <label for="cookie-phone">Phone Number</label>
      <input type="tel" id="cookie-phone" name="phone">
    </div>
    
    <div class="form-field">
      <label for="cookie-occasion">What's the occasion? *</label>
      <input type="text" id="cookie-occasion" name="occasion" placeholder="Birthday, baby shower, wedding, corporate event..." required>
    </div>
    
    <div class="form-field">
      <label for="cookie-quantity">How many dozen? *</label>
      <input type="number" id="cookie-quantity" name="quantity" min="1" placeholder="Minimum 1 dozen" required>
    </div>
    
    <div class="form-field">
      <label>Cookie Flavors *</label>
      <div class="checkbox-group">
        <div class="checkbox-item">
          <input type="checkbox" id="flavor-vanilla" name="flavors[]" value="Vanilla Sugar">
          <label for="flavor-vanilla">Vanilla Sugar</label>
        </div>
        <div class="checkbox-item">
          <input type="checkbox" id="flavor-chocolate" name="flavors[]" value="Chocolate">
          <label for="flavor-chocolate">Chocolate</label>
        </div>
        <div class="checkbox-item">
          <input type="checkbox" id="flavor-lemon" name="flavors[]" value="Lemon">
          <label for="flavor-lemon">Lemon</label>
        </div>
        <div class="checkbox-item">
          <input type="checkbox" id="flavor-surprise" name="flavors[]" value="Surprise Me">
          <label for="flavor-surprise">Surprise Me!</label>
        </div>
      </div>
    </div>
    
    <div class="form-field">
      <label for="cookie-design">Design Ideas *</label>
      <textarea id="cookie-design" name="design" placeholder="Describe your theme, colors, or share inspiration (Pinterest links welcome!)" required></textarea>
    </div>
    
    <div class="form-field">
      <label for="cookie-date">When do you need them? *</label>
      <input type="date" id="cookie-date" name="date" required>
    </div>
    
    <div class="form-field">
      <label for="cookie-budget">Budget Range (Optional)</label>
      <select id="cookie-budget" name="budget">
        <option value="">Prefer not to say</option>
        <option value="$50-100">$50 - $100</option>
        <option value="$100-200">$100 - $200</option>
        <option value="$200-300">$200 - $300</option>
        <option value="$300+">$300+</option>
      </select>
    </div>
    
    <div class="info-box">
      <p><strong>💡 Custom cookie pricing:</strong> Starting at $24/dozen. Final price depends on design complexity. I'll send you a custom quote within 24 hours!</p>
    </div>
    
    <div class="form-actions">
      <button type="button" class="btn-back" onclick="resetForm()">← Back</button>
      <button type="submit" class="btn-submit">Submit Inquiry</button>
    </div>
  </form>
</div>

<!-- Custom Cake Form -->
<div class="inquiry-form-container" id="form-custom-cake">
  <h2 style="font-family: 'Cormorant Garamond', Georgia, serif; text-align: center; margin-bottom: 2rem;">Custom Cake Inquiry</h2>
  
  <form action="https://formspree.io/f/YOUR_FORMSPREE_ID" method="POST">
    <input type="hidden" name="inquiry_type" value="Custom Cake">
    
    <div class="form-field">
      <label for="cake-name">Your Name *</label>
      <input type="text" id="cake-name" name="name" required>
    </div>
    
    <div class="form-field">
      <label for="cake-email">Email *</label>
      <input type="email" id="cake-email" name="email" required>
    </div>
    
    <div class="form-field">
      <label for="cake-phone">Phone Number</label>
      <input type="tel" id="cake-phone" name="phone">
    </div>
    
    <div class="form-field">
      <label for="cake-occasion">What's the occasion? *</label>
      <input type="text" id="cake-occasion" name="occasion" placeholder="Birthday, wedding, anniversary..." required>
    </div>
    
    <div class="form-field">
      <label for="cake-servings">How many servings? *</label>
      <select id="cake-servings" name="servings" required>
        <option value="">Select serving size...</option>
        <option value="12-15 (6-inch)">12-15 servings (6-inch round)</option>
        <option value="20-25 (8-inch)">20-25 servings (8-inch round)</option>
        <option value="30-35 (9-inch)">30-35 servings (9-inch round)</option>
        <option value="40-50 (10-inch)">40-50 servings (10-inch round)</option>
        <option value="Sheet Cake">Sheet Cake (custom size)</option>
        <option value="Not Sure">Not Sure - Need Help!</option>
      </select>
    </div>
    
    <div class="form-field">
      <label for="cake-flavor">Cake Flavor *</label>
      <select id="cake-flavor" name="flavor" required>
        <option value="">Select flavor...</option>
        <option value="Vanilla">Classic Vanilla</option>
        <option value="Chocolate">Chocolate</option>
        <option value="Marble">Marble</option>
        <option value="Lemon">Lemon</option>
        <option value="Carrot">Carrot Cake</option>
        <option value="Red Velvet">Red Velvet</option>
        <option value="Other">Other (specify in notes)</option>
      </select>
    </div>
    
    <div class="form-field">
      <label for="cake-filling">Filling/Frosting Preferences</label>
      <input type="text" id="cake-filling" name="filling" placeholder="Buttercream, cream cheese, raspberry filling...">
    </div>
    
    <div class="form-field">
      <label for="cake-design">Design Vision *</label>
      <textarea id="cake-design" name="design" placeholder="Colors, theme, decorations, inspiration images..." required></textarea>
    </div>
    
    <div class="form-field">
      <label for="cake-date">When do you need it? *</label>
      <input type="date" id="cake-date" name="date" required>
    </div>
    
    <div class="info-box">
      <p><strong>🎂 Cake pricing:</strong> Starting at $80 for a 6-inch triple-layer cake. All buttercream is dye-free. I'll send you a detailed quote based on your needs!</p>
    </div>
    
    <div class="form-actions">
      <button type="button" class="btn-back" onclick="resetForm()">← Back</button>
      <button type="submit" class="btn-submit">Submit Inquiry</button>
    </div>
  </form>
</div>

<!-- Gifts Form -->
<div class="inquiry-form-container" id="form-gifts">
  <h2 style="font-family: 'Cormorant Garamond', Georgia, serif; text-align: center; margin-bottom: 2rem;">Gifts & Party Favors Inquiry</h2>
  
  <form action="https://formspree.io/f/YOUR_FORMSPREE_ID" method="POST">
    <input type="hidden" name="inquiry_type" value="Gifts & Favors">
    
    <div class="form-field">
      <label for="gift-name">Your Name *</label>
      <input type="text" id="gift-name" name="name" required>
    </div>
    
    <div class="form-field">
      <label for="gift-email">Email *</label>
      <input type="email" id="gift-email" name="email" required>
    </div>
    
    <div class="form-field">
      <label for="gift-phone">Phone Number</label>
      <input type="tel" id="gift-phone" name="phone">
    </div>
    
    <div class="form-field">
      <label for="gift-type">What are you looking for? *</label>
      <select id="gift-type" name="gift_type" required>
        <option value="">Select type...</option>
        <option value="Teacher Boxes">Teacher Appreciation Boxes</option>
        <option value="Party Favors">Party Favor Packs</option>
        <option value="Corporate Gifts">Corporate/Client Gifts</option>
        <option value="Other">Other Gift Idea</option>
      </select>
    </div>
    
    <div class="form-field">
      <label for="gift-quantity">How many? *</label>
      <input type="number" id="gift-quantity" name="quantity" min="1" placeholder="Number of boxes/packs" required>
    </div>
    
    <div class="form-field">
      <label for="gift-details">Tell me more about your needs *</label>
      <textarea id="gift-details" name="details" placeholder="Occasion, customization ideas, budget..." required></textarea>
    </div>
    
    <div class="form-field">
      <label for="gift-date">When do you need them? *</label>
      <input type="date" id="gift-date" name="date" required>
    </div>
    
    <div class="info-box">
      <p><strong>🎁 Gift pricing:</strong> Teacher boxes start at $7. Party favors vary by design. I'll create a custom package just for you!</p>
    </div>
    
    <div class="form-actions">
      <button type="button" class="btn-back" onclick="resetForm()">← Back</button>
      <button type="submit" class="btn-submit">Submit Inquiry</button>
    </div>
  </form>
</div>

<script>
// Handle inquiry type selection
document.querySelectorAll('.inquiry-card').forEach(card => {
  card.addEventListener('click', () => {
    const type = card.dataset.type;
    
    // Hide selector
    document.getElementById('inquirySelector').style.display = 'none';
    
    // Show selected form
    document.getElementById(`form-${type}`).classList.add('active');
    
    // Scroll to form
    setTimeout(() => {
      document.getElementById(`form-${type}`).scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  });
});

// Reset to type selector
function resetForm() {
  // Hide all forms
  document.querySelectorAll('.inquiry-form-container').forEach(form => {
    form.classList.remove('active');
  });
  
  // Show selector
  document.getElementById('inquirySelector').style.display = 'grid';
  
  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Form submission handling (optional - for success message)
document.querySelectorAll('form').forEach(form => {
  form.addEventListener('submit', (e) => {
    // Let Formspree handle the submission
    // You could add a loading state here
  });
});
</script>
