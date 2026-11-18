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
export type { Menu, MenuItem, SeasonalMenu, YearRoundMenu, SeasonStatus } from '../types';

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
import type { Menu, SeasonalMenu, YearRoundMenu } from '../types';

/**
 * All seasonal menus, in the order the menus page lists them.
 * Which one is featured comes from each menu's status: see ../season.ts.
 */
export const seasonalMenus: SeasonalMenu[] = [
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
export const yearRoundMenus: YearRoundMenu[] = [
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
