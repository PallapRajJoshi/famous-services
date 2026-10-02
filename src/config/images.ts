/**
 * PICTURES - how the site finds them.
 *
 * Every picture is a file inside  public/images/  (see public/images/README.txt).
 * The file NAME is the slot: to change a picture, put a file with the same name in the same folder.
 * You do NOT edit any code. Photos (.webp .jpg .png .avif) always win over the sample drawings (.svg).
 *
 *   hero/home                  home page big picture
 *   categories/<category>      service category (plumbing, cleaning, ...)
 *   services/<service>         one service. Extra pictures: <service>-2, <service>-3, <service>-4
 *   packages/<package>         package / combo
 *   listings/<listing id>      one rooms / land / property listing. Extra: -2, -3, -4
 *   rentals/<type>             rooms, land and property TYPE (room-single, land-agri, prop-house, ...)
 *   guides/<guide>             help guide
 *   brand/logo, brand/og       optional: your own logo and the picture shown when the site is shared
 *
 * If a service / listing / package has no PHOTO of its own, your photo of its category / type is used (if you added one).
 * The list of existing files is generated into ./images.generated.ts (run `npm run images`).
 */
import { IMAGE_FILES } from "./images.generated";

export const imageKey = {
  hero: "hero/home",
  category: (slug: string) => `categories/${slug}`,
  service: (slug: string) => `services/${slug}`,
  package: (slug: string) => `packages/${slug}`,
  listing: (id: string) => `listings/${id}`,
  rental: (type: string) => `rentals/${type}`,
  guide: (slug: string) => `guides/${slug}`,
} as const;

/** Web path of the picture for a slot, or undefined if there is none. */
export function imageSrc(key?: string): string | undefined {
  return key ? IMAGE_FILES[key.toLowerCase()] : undefined;
}

/** True for your own photos, false for the built-in sample drawings (.svg). */
export const isPhoto = (src: string) => !src.toLowerCase().endsWith(".svg");

/**
 * The picture to show for an item. Order: your photo of the item, your photo of its category/type,
 * then the sample drawing of the item, then the sample drawing of its category/type.
 * (So adding just the 15 category photos already covers every service.)
 */
export function pickImage(...keys: (string | undefined)[]): string | undefined {
  const found = keys.map(imageSrc).filter((s): s is string => !!s);
  return found.find(isPhoto) ?? found[0];
}

/**
 * Pictures for a detail-page gallery: <key>, <key>-2, <key>-3, <key>-4 (only the ones that exist, only your own photos).
 * With none of its own, the item shows your photo of its category/type (`fallbacks`), if you added one.
 * Empty list = no photos at all -> the page shows the built-in drawings.
 */
export function galleryPhotos(key: string, ...fallbacks: string[]): string[] {
  const own = [key, `${key}-2`, `${key}-3`, `${key}-4`].map(imageSrc).filter((s): s is string => !!s && isPhoto(s));
  if (own.length) return own;
  const shared = fallbacks.map(imageSrc).find((s): s is string => !!s && isPhoto(s));
  return shared ? [shared] : [];
}
