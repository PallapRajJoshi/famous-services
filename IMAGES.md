# Pictures - where they are and how to change them

All pictures are files in **`public/images/`**. The file name decides where it appears.
To change one, put a photo with the **same name** in the **same folder**. No code changes.

```
public/images/
├── hero/          home.svg                       big picture on the home page            1 file
├── categories/    plumbing.svg, cleaning.svg …   service categories                     16 files
├── services/      pipe-leakage-repair.svg …      one picture per service                75 files
├── packages/      home-deep-cleaning.svg …       combo packages                          6 files
├── rentals/       room-single.svg, land-agri.svg, prop-house.svg …   rooms/land/property types   13 files
├── listings/      room-koteshwor-shared-bed.svg …  one picture per demo listing         26 files
├── guides/        monsoon-ready.svg …            help guides                             6 files
└── brand/         (empty)  logo.png, og.jpg      optional: your logo, share picture
```

The `.svg` files are the sample drawings the prototype used. They are placeholders.

## Replace a picture (3 steps)

1. Open the folder, e.g. `public/images/services/`.
2. Add your photo with the same name and a photo extension: `pipe-leakage-repair.jpg` (or `.webp`, `.png`, `.avif`).
3. Refresh the browser. The photo is used instead of the drawing. You can delete the `.svg` or leave it.

Gallery on a service or listing page: add `pipe-leakage-repair-2.jpg`, `-3`, `-4` for more pictures.
With only one photo the page shows it big, without the small thumbnails.

## The shortcut: you do not need 143 photos

If an item has no photo of its own, the site shows the photo of its **category** (services, packages, guides) or **type** (rooms, land, property listings).

| Add this | It covers |
|---|---|
| 1 hero photo `hero/home.jpg` | home page |
| 16 category photos `categories/<name>.jpg` | all 75 services, packages and guides |
| 13 type photos `rentals/<type>.jpg` | all 26 listings and the rentals pages |

So **30 photos make the whole site photographic.** Add per-service and per-listing photos later, one at a time.

## Sizes

| Where | Size | Notes |
|---|---|---|
| Cards, services, packages, listings, guides | 1200 × 900 px (4:3) | `.jpg` or `.webp`, under 400 KB. Cropped to 4:3, 16:10 or 16:9 - keep the subject in the middle. |
| Hero | 1120 × 1040 px | shown with rounded corners next to the headline |
| `brand/logo` | `.png` or `.svg`, transparent, ≥ 80 px high | replaces the built-in logo and name in the header and footer |
| `brand/og` | 1200 × 630 px `.jpg` | shown when the site is shared on WhatsApp / Facebook |

The site resizes large photos itself. Do not worry about 5 MB originals, but smaller uploads load faster.

## Names

- Exactly the same as the existing file, lower-case, hyphens, no spaces.
- The name is the service / package / listing slug. For a new service you add in `src/data/catalog.ts`, the picture name is its slug.
- Files or folders that start with `_` or `.` are ignored. Use `public/images/_old/` to keep spare files.

## Where a picture is used

| Folder | Pages |
|---|---|
| `hero/` | Home page |
| `categories/` | Home categories, `/services`, each `/services/<category>` header, service cards (fallback) |
| `services/` | Service cards, service page gallery, booking summary, search, saved items |
| `packages/` | `/packages`, package page |
| `rentals/` | `/rentals` hub, type tiles, listing cards (fallback) |
| `listings/` | Listing cards, listing page gallery, search results |
| `guides/` | `/guides`, guide page |
| `brand/` | Header / footer logo, share preview |

## How it works (for the developer)

- `src/config/images.ts` - the rules and the helper functions (`imageKey`, `pickImage`, `galleryPhotos`). Read the comment at the top.
- `src/config/images.generated.ts` - the list of files that exist. **Generated** by `scripts/build-images.mjs`; do not edit.
- `src/components/art/scenes.tsx` - `<ServiceScene>` shows the file if there is one, otherwise draws the built-in scene.
- `src/components/ui/site-image.tsx` - draws one picture file (photos are optimised by Next.js).
- `npm run dev` watches the folder; `npm run images` rebuilds the list by hand; `npm run build` does it automatically.

When the backend exists, owner-uploaded listing photos come from the API instead (`GET /api/v1/public/files/{id}`);
this folder then holds only the site's own pictures.
