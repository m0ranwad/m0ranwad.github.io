/**
 * Central export for all menu data
 */

export { valentinesMenu } from './valentines';
export { christmasMenu } from './christmas';
export { easterMenu } from './easter';
export { thanksgivingMenu } from './thanksgiving';
export { halloweenMenu } from './halloween';
export { mothersdayMenu } from './mothersday';
export { cookiesMenu } from './cookies';
export { cakesMenu } from './cakes';
export { giftsMenu } from './gifts';

// Re-export types
export type { Menu, MenuItem } from '../types';

// Import all menus for iteration
import { valentinesMenu } from './valentines';
import { christmasMenu } from './christmas';
import { easterMenu } from './easter';
import { thanksgivingMenu } from './thanksgiving';
import { halloweenMenu } from './halloween';
import { mothersdayMenu } from './mothersday';
import { cookiesMenu } from './cookies';
import { cakesMenu } from './cakes';
import { giftsMenu } from './gifts';
import type { Menu } from '../types';

/**
 * All seasonal menus (for holidays page)
 */
export const seasonalMenus: Menu[] = [
  valentinesMenu,
  easterMenu,
  mothersdayMenu,
  halloweenMenu,
  thanksgivingMenu,
  christmasMenu,
];

/**
 * All year-round menus
 */
export const yearRoundMenus: Menu[] = [
  cookiesMenu,
  cakesMenu,
  giftsMenu,
];

/**
 * All menus combined
 */
export const allMenus: Menu[] = [
  ...seasonalMenus,
  ...yearRoundMenus,
];

/**
 * Get a menu by its slug
 */
export function getMenuBySlug(slug: string): Menu | undefined {
  return allMenus.find(menu => menu.slug === slug);
}

/**
 * Get the currently featured menu
 */
export function getFeaturedMenu(): Menu | undefined {
  return allMenus.find(menu => menu.featured);
}
