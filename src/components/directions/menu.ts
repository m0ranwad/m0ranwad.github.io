/**
 * Helpers for the Phase 0 menu samples (#2).
 */
import type { MenuItem, SeasonalMenu } from '../../data/types';

/**
 * The deadline as a sentence, "Order by Saturday, December 12." The date is
 * a calendar day, so it is formatted at noon UTC, where no time zone can move
 * it to another day.
 */
export function orderBySentence(menu: SeasonalMenu): string {
  if (!menu.orderBy) return '';
  const day = new Date(`${menu.orderBy}T12:00:00Z`).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });
  return `Order by ${day}.`;
}

/** The three items whose photos sample A shows beside the Christmas menu. */
const PICKS = ['Christmas Cookie Tray', 'Thumbprint Cookies', 'Glazed Sugar Cookies'];

export function samplePhotos(menu: SeasonalMenu): MenuItem[] {
  const picked = PICKS.map((name) => menu.items.find((i) => i.name === name)).filter((i): i is MenuItem => !!i);
  return picked.length ? picked : menu.items.slice(0, 3);
}
