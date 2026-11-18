/**
 * Dates in menu data (`opens`, `orderBy`) are calendar days written
 * 'YYYY-MM-DD' and read in the viewer's own time zone. Used at build time
 * and in the browser, so both agree on what a date means.
 */

const DAY_MS = 24 * 60 * 60 * 1000;

/** True for a real calendar date written 'YYYY-MM-DD'. */
export function isIsoDate(value: unknown): value is string {
  if (typeof value !== 'string') return false;
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) return false;
  const [year, month, day] = match.slice(1).map(Number);
  const date = new Date(year, month - 1, day);
  return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
}

/** Midnight at the start of the day: when a menu's orders open. */
export function startOfDay(iso: string): Date {
  return new Date(`${iso}T00:00:00`);
}

/** The last second of the day: orders are taken through the whole `orderBy` day. */
export function endOfDay(iso: string): Date {
  return new Date(`${iso}T23:59:59`);
}

/** True once the whole day has gone by. */
export function hasPassed(iso: string, now: Date = new Date()): boolean {
  return now.getTime() > endOfDay(iso).getTime();
}

/** Whole days left until `target`, rounded up; 0 or less once it has arrived. */
export function daysUntil(target: Date, now: Date = new Date()): number {
  return Math.ceil((target.getTime() - now.getTime()) / DAY_MS);
}
