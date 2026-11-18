/**
 * What each menu shows, derived from one field: a seasonal menu's `status`.
 *
 * Every page asks `menuView()` what to say and offer, and the home page and
 * the menus page ask `leadMenu()` which season to feature, so no page can
 * disagree with another. The status is set by hand because selling out does
 * not follow a calendar; the only date that changes the output on its own is
 * `orderBy`, which turns an open menu into a closed one. That is decided in
 * the viewer's browser, never at build time (the build runs in UTC, hours
 * ahead of the bakery's customers): pages render both wordings and
 * `DateSwitch.astro` picks one.
 */

import { hasPassed, isIsoDate } from '../scripts/dates';
import { allMenus } from './menus';
import type { Menu, SeasonalMenu, SeasonStatus } from './types';

/** A status, plus 'closed' (open, but `orderBy` has passed) and 'year-round'. */
export type MenuState = SeasonStatus | 'closed' | 'year-round';

export interface MenuView {
  state: MenuState;
  /** Short season name for sentences, e.g. "Mother's Day". */
  name: string;
  subtitle: string;
  intro: string;
  cta: { title: string; text: string };
  /** Status label on the menus page; the home page photo shows it unless orders are open. */
  badge?: string;
  /** Link text on the menus page callout. */
  calloutLink: string;
  /** Button under the home page photo. */
  homeButton: string;
  showPrices: boolean;
  /** Offer "Add to Inquiry" (items marked `soldOut` still don't get one). */
  canOrder: boolean;
  /** Show every item as sold out. */
  allSoldOut: boolean;
  /** Countdown pill: orders open in N days, or close in N days. */
  countdown?: { date: string; label: string; opens: boolean };
}

const ORDER_INTRO = 'Handcrafted with love. All treats made fresh to order.';
const ORDER_CTA = {
  title: 'Ready to Order?',
  text: 'Orders must be placed at least 5 days in advance. Contact us for large orders or custom designs.',
};
const STAY_CTA = {
  title: 'Stay in Touch',
  text: "We'd love to hear from you about custom orders or upcoming seasonal treats.",
};

export function seasonName(menu: Menu): string {
  return menu.title.replace(/ Menu$/, '');
}

/** The state from the status alone. 'closed' is applied in the browser, via closesOn(). */
export function menuState(menu: Menu): MenuState {
  return menu.kind === 'year-round' ? 'year-round' : menu.status;
}

/**
 * The `orderBy` date of an open menu, even one already past at build time.
 * Pages render the open wording and the closed wording (menuView(menu,
 * 'closed')) inside `DateSwitch`, which shows the right one in the browser.
 */
export function closesOn(menu: Menu): string | undefined {
  return menu.kind === 'seasonal' && menu.status === 'open' ? menu.orderBy : undefined;
}

export function menuView(menu: Menu, state: MenuState = menuState(menu)): MenuView {
  const name = seasonName(menu);
  type Rest = Omit<MenuView, 'state' | 'name' | 'homeButton' | 'calloutLink'> & Partial<MenuView>;
  const view = (rest: Rest): MenuView => ({
    state,
    name,
    homeButton: `View ${menu.title}`,
    calloutLink: 'View Menu →',
    ...rest,
  });

  switch (state) {
    case 'year-round':
    case 'open':
      return view({
        subtitle: menu.subtitle,
        intro: menu.intro ?? ORDER_INTRO,
        cta: menu.cta ?? ORDER_CTA,
        badge: state === 'open' ? 'Now Available!' : undefined,
        calloutLink: 'View Menu & Order →',
        homeButton: `Order ${menu.title}`,
        showPrices: true,
        canOrder: true,
        allSoldOut: false,
        countdown:
          menu.kind === 'seasonal' && menu.orderBy
            ? { date: menu.orderBy, label: `${name} orders`, opens: false }
            : undefined,
      });
    case 'closed':
      return view({
        subtitle: 'Orders are closed — thank you!',
        intro: `${name} orders are closed. Check back soon for our next seasonal menu.`,
        cta: STAY_CTA,
        badge: 'Orders Closed',
        showPrices: true,
        canOrder: false,
        allSoldOut: false,
      });
    case 'sold-out':
      return view({
        subtitle: 'All sold out — thank you!',
        intro: `${name} is all sold out! Check back soon for our next seasonal menu.`,
        cta: STAY_CTA,
        badge: 'Sold Out',
        showPrices: true,
        canOrder: false,
        allSoldOut: true,
      });
    case 'coming-soon':
      return view({
        subtitle: menu.subtitle,
        intro: `${name} is coming soon! Here's a first look. Check back to place your order.`,
        cta: STAY_CTA,
        badge: 'Coming Soon',
        showPrices: true,
        canOrder: false,
        allSoldOut: false,
        countdown:
          menu.kind === 'seasonal' && menu.opens
            ? { date: menu.opens, label: `${name} orders`, opens: true }
            : undefined,
      });
    case 'past':
      return view({
        subtitle: menu.subtitle,
        intro: `Here's what we made for ${name}. Check back soon for our next seasonal menu.`,
        cta: STAY_CTA,
        showPrices: false,
        canOrder: false,
        allSoldOut: false,
      });
  }
}

function isSeasonal(menu: Menu): menu is SeasonalMenu {
  return menu.kind === 'seasonal';
}

/**
 * The season the home page and the menus page feature: the open one, else
 * the coming-soon one that opens first, else one that just sold out. None
 * between seasons. At most one menu is open (open decision 2 in #1).
 */
export function leadMenu(menus: Menu[] = allMenus): SeasonalMenu | undefined {
  const seasonal = menus.filter(isSeasonal);
  const withStatus = (status: SeasonStatus) => seasonal.filter((m) => m.status === status);
  const comingSoon = withStatus('coming-soon').sort(
    (a, b) => (a.opens ?? '9999-12-31').localeCompare(b.opens ?? '9999-12-31'),
  );
  return withStatus('open')[0] ?? comingSoon[0] ?? withStatus('sold-out')[0];
}

/** The menu that is taking orders, if any. Its `orderBy` still applies: see closesOn(). */
export function openMenu(menus: Menu[] = allMenus): SeasonalMenu | undefined {
  return menus.filter(isSeasonal).find((m) => m.status === 'open');
}

const STATUSES: SeasonStatus[] = ['coming-soon', 'open', 'sold-out', 'past'];

/** Problems in menu data. Errors fail the build; warnings are printed. */
export function checkMenus(menus: Menu[], now: Date = new Date()): { errors: string[]; warnings: string[] } {
  const errors: string[] = [];
  const warnings: string[] = [];
  const file = (m: Menu) => `src/data/menus/${m.slug}.ts`;

  const slugs = new Set<string>();
  for (const menu of menus) {
    if (slugs.has(menu.slug)) errors.push(`${file(menu)}: another menu already uses the slug "${menu.slug}".`);
    slugs.add(menu.slug);
    if (!isSeasonal(menu)) continue;

    if (!STATUSES.includes(menu.status)) {
      errors.push(`${file(menu)}: status "${menu.status}" should be one of ${STATUSES.join(', ')}.`);
    }
    for (const field of ['opens', 'orderBy'] as const) {
      const value = menu[field];
      if (value !== undefined && !isIsoDate(value)) {
        errors.push(`${file(menu)}: ${field} "${value}" should be a date written YYYY-MM-DD.`);
      }
    }
    if (menu.status === 'open' && isIsoDate(menu.orderBy) && hasPassed(menu.orderBy, now)) {
      warnings.push(
        `${file(menu)}: orderBy ${menu.orderBy} has passed, so browsers show orders as closed. Set status to 'sold-out' or 'past'.`,
      );
    }
    if (menu.status === 'coming-soon' && isIsoDate(menu.opens) && hasPassed(menu.opens, now)) {
      warnings.push(`${file(menu)}: opens ${menu.opens} has passed. Set status to 'open' when orders open.`);
    }
  }

  const open = menus.filter(isSeasonal).filter((m) => m.status === 'open');
  if (open.length > 1) {
    errors.push(
      `Only one seasonal menu may be open at a time, but ${open.map((m) => m.slug).join(' and ')} are. Set the others to 'coming-soon', 'sold-out' or 'past'.`,
    );
  }
  return { errors, warnings };
}
