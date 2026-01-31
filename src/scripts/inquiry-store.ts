/**
 * Inquiry Store - localStorage wrapper for cart functionality
 * 
 * Stores menu items the customer wants to inquire about.
 * Persists across page navigation and browser sessions.
 */

export interface InquiryItem {
  id: string;           // Unique identifier (menu slug + item name)
  name: string;         // Display name
  price: string;        // Price string (e.g., "$3.50 each")
  image?: string;       // Optional image path
  menu: string;         // Which menu it's from (e.g., "Valentine's")
  quantity: number;     // How many they want
  addedAt: number;      // Timestamp for ordering
}

const STORAGE_KEY = 'thymeless-inquiry-cart';

/**
 * Get all items in the inquiry cart
 */
export function getItems(): InquiryItem[] {
  if (typeof window === 'undefined') return [];
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    console.error('Failed to read inquiry cart from localStorage');
    return [];
  }
}

/**
 * Save items to localStorage
 */
function saveItems(items: InquiryItem[]): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    // Dispatch event for UI updates
    window.dispatchEvent(new CustomEvent('inquiry-cart-updated', { 
      detail: { count: items.length } 
    }));
  } catch {
    console.error('Failed to save inquiry cart to localStorage');
  }
}

/**
 * Add an item to the inquiry cart
 * If item already exists, increments quantity
 */
export function addItem(item: Omit<InquiryItem, 'addedAt' | 'quantity'>, quantity = 1): void {
  const items = getItems();
  const existingIndex = items.findIndex(i => i.id === item.id);
  
  if (existingIndex >= 0) {
    // Update existing item quantity
    items[existingIndex].quantity += quantity;
  } else {
    // Add new item
    items.push({
      ...item,
      quantity,
      addedAt: Date.now()
    });
  }
  
  saveItems(items);
}

/**
 * Remove an item from the cart entirely
 */
export function removeItem(id: string): void {
  const items = getItems();
  const filtered = items.filter(i => i.id !== id);
  saveItems(filtered);
}

/**
 * Update quantity for an item
 * If quantity is 0 or less, removes the item
 */
export function updateQuantity(id: string, quantity: number): void {
  if (quantity <= 0) {
    removeItem(id);
    return;
  }
  
  const items = getItems();
  const item = items.find(i => i.id === id);
  if (item) {
    item.quantity = quantity;
    saveItems(items);
  }
}

/**
 * Get total count of items (sum of quantities)
 */
export function getCount(): number {
  return getItems().reduce((sum, item) => sum + item.quantity, 0);
}

/**
 * Get number of unique items in cart
 */
export function getUniqueCount(): number {
  return getItems().length;
}

/**
 * Check if a specific item is in the cart
 */
export function hasItem(id: string): boolean {
  return getItems().some(i => i.id === id);
}

/**
 * Get a specific item from the cart
 */
export function getItem(id: string): InquiryItem | undefined {
  return getItems().find(i => i.id === id);
}

/**
 * Clear all items from the cart
 */
export function clear(): void {
  saveItems([]);
}

/**
 * Generate a formatted summary of cart items for form submission
 */
export function getCartSummary(): string {
  const items = getItems();
  if (items.length === 0) return 'No items selected';
  
  return items
    .map(item => `• ${item.name} (${item.menu}) - Qty: ${item.quantity} - ${item.price}`)
    .join('\n');
}

/**
 * Create a unique ID for a menu item
 */
export function createItemId(menuSlug: string, itemName: string): string {
  const slug = itemName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  return `${menuSlug}-${slug}`;
}
