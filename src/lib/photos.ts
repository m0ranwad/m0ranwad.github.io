/**
 * Every photo the site shows lives in src/assets/img/. Data files and pages
 * name a photo by its path from there, written '/assets/img/<file>', the same
 * way they did when photos were served as-is from public/. This module turns
 * that path into an optimised image; nothing else should load a photo.
 *
 * - <Photo> (src/components/ui/Photo.astro) renders a responsive <picture>
 * - largeUrl() is the single big version the lightbox opens
 * - thumbUrl() is the small version shown in the inquiry list
 * - socialUrl() is the JPEG used for link previews
 * - backgroundUrl() is for a photo used as a CSS background
 *
 * A path that matches no file, letter case included, fails the build.
 * scripts/check-images.mjs checks the data files before the build starts and
 * suggests the right spelling.
 */

import type { ImageMetadata } from 'astro';
import { getImage } from 'astro:assets';

const files = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/img/**/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}',
  { eager: true },
);

const byPath = new Map(
  Object.entries(files).map(([file, mod]) => [file.replace(/^\/src/, ''), mod.default]),
);

/** The photo at '/assets/img/<file>'. Throws if there is none. */
export function photo(path: string): ImageMetadata {
  const image = byPath.get(path);
  if (!image) {
    throw new Error(`No photo at ${path}: put the file in src${path} (letter case matters). See ADDING_PHOTOS.md.`);
  }
  return image;
}

/** Long edge of the lightbox photo. */
const LARGE = 2000;

async function url(path: string, options: { width?: number; height?: number; format: 'webp' | 'jpg'; quality: number }) {
  return (await getImage({ src: photo(path), ...options })).src;
}

/** The lightbox version: at most 2000 px on its long edge. Quality 65 keeps
 * the busiest photo under 400 KB. */
export function largeUrl(path: string): Promise<string> {
  const { width, height } = photo(path);
  return url(path, width >= height
    ? { width: Math.min(width, LARGE), format: 'webp', quality: 65 }
    : { height: Math.min(height, LARGE), format: 'webp', quality: 65 });
}

/** The inquiry-list thumbnail. */
export function thumbUrl(path: string): Promise<string> {
  return url(path, { width: 240, format: 'webp', quality: 75 });
}

/** A JPEG for link previews (Facebook, iMessage and others). */
export function socialUrl(path: string): Promise<string> {
  return url(path, { width: 1200, format: 'jpg', quality: 75 });
}

/** A photo used as a CSS background. Both uses sit under a strong tint, so
 * low quality doesn't show. */
export function backgroundUrl(path: string): Promise<string> {
  return url(path, { width: 1920, format: 'webp', quality: 60 });
}
