# Famous Services — frontend prototype

Frontend-only prototype of the Famous Services home-services marketplace
(Kathmandu Valley). **No backend, database, payments, SMS/WhatsApp or maps API.**
Everything is simulated in the browser; bookings, login and preferences live in
`localStorage` (key `fs-frontend-demo-v1`).

## Run

    npm install
    npm run dev        # http://localhost:3000 (also watches public/images)
    npm run images     # re-scan public/images after adding pictures (dev and build do it automatically)
    npm run build && npm start
    npm run lint       # tsc --noEmit

Node 20+ recommended.

## Pictures
All pictures are files in `public/images/` - one file per service, package, listing, category and so on.
To change one, add a photo with the same name in the same folder. See **IMAGES.md** (full guide) and `public/images/README.txt`.

## Stack
Next.js 16 (App Router), React 19, TypeScript, Tailwind v4, Framer Motion, lucide-react, zustand, zod.

## Demo cheatsheet
- **Login (customer or `/pro`)**: any Nepal-style mobile (e.g. `9812345678`) + any 6 digits.
- **Coupons**: DEMO10, WELCOME200, CLEAN15, FESTIVE5, TANKCARE, BIZQUOTE.
- **Track**: `/track/FS-DEMO-1001`, `FS-DEMO-0990`, `FS-DEMO-0975`, or any booking you create (`FS-XXXXX`).
  Use Play / Next / Restart on the tracking page to simulate status changes.
- **Reset**: clear site data for the origin, or Account → Settings.
- **Language**: English / नेपाली toggle (cookie `fs_lang`, no URL prefix).

## Rentals & Property (one section)
`/rentals` hub with four tabs: Overview · Rooms for rent · Land for sale · Property for sale (+ `/rentals/list` for owners).
- **Rooms** are categorised by type (shared bed, single, double, studio, 1 BHK, 2 BHK) and furnishing (furnished / semi-furnished / unfurnished), with budget, district, bathroom, suited-for, availability and facility filters.
- **Land** is sized in ropani/aana with the sq-ft equivalent, price per aana, road access, facing and land type (residential / commercial / agricultural).
- **Property** covers houses, apartments, shops/commercial buildings and office space (beds, baths, built-up and land area, age, parking).
- Every listing has a detail page, a "Request a visit" form (simulated, saved on the device) and a document/safety checklist. Saved listings and requests appear in My Account → Saved / Rental requests.
- Data: `src/data/rentals.ts` (all listings are **demo** and labelled so). Filters: `src/lib/rental-filters.ts`. UI: `src/components/rentals/`.
- Test URLs: `/rentals/rooms?type=double&furn=furnished`, `/rentals/land?type=agricultural`, `/rentals/property/prop-jawalakhel-apartment`.

## Terms & policies (draft)

Nine business-specific documents live in `src/data/legal.ts` and render at `/legal` and `/legal/<slug>`:
`terms`, `service-terms`, `rental-terms`, `property-terms`, `owner-terms`, `pro-terms`, `cancellation` (with a window table), `guarantee` (with a period table) and `privacy`.

- They cover home-service booking, room rental, land/property sale, owners/listers, professionals, cancellation & refunds, the service guarantee and privacy.
- Anything wrapped in `⟦ … ⟧` is a decision or fact only the business can supply (fees, time limits, legal name, PAN/registration…). It shows as an amber `[ … ]` mark and each page counts them.
- English is the full text. Nepali covers titles, intros, headings and key points only; a note says so in Nepali mode.
- Consent checkboxes are wired into: booking review, rental/property visit request, owner listing form, professional registration; login shows a short "by continuing" note.
- Pages are `noindex`. Before launch: fill every `⟦ ⟧`, have a Nepali lawyer review and finalise, translate the full text, update `DRAFT_VERSION`, then remove `noindex`.

## What to change where
| I want to change... | Go to |
|---|---|
| A picture | `public/images/<folder>/<name>.jpg` - see IMAGES.md |
| Services, prices, categories, add-ons | `src/data/catalog.ts` |
| Packages, offers/coupons, areas, FAQs, reviews, site name and contact | `src/data/content.ts` |
| Help guides | `src/data/guides.ts` |
| Rooms / land / property listings | `src/data/rentals.ts` |
| Professional-portal sample data | `src/data/pro.ts` |
| Terms and policies | `src/data/legal.ts` |
| Colors and fonts | `src/app/globals.css` (the `--color-brand…` lines at the top) |
| Price and coupon rules | `src/lib/pricing.ts` |
| Page layout of one page | `src/app/<route>/page.tsx` and the matching folder in `src/components/` |

## Folder map
- `public/images/` - all pictures (see above).
- `src/app/` - one folder per page (URL).
- `src/components/` - pieces of pages: `ui/` buttons and basics, `cards/`, `layout/` header and footer, `home/`, `catalog/`, `booking/`, `track/`, `auth/`, `account/`, `pro/`, `forms/`, `content/`, `rentals/`, `legal/`, `art/` (built-in sample drawings).
- `src/data/` - the demo content (replace with API calls later).
- `src/config/` - how pictures are found (`images.ts`).
- `src/lib/` - helpers: pricing, filters, validation, language.
- `src/store/` - the demo store (saved in the browser).
- `scripts/` - small helper scripts for pictures and `npm run dev`.

## Honesty notes (intentional)
- All prices, offers, reviews and professionals are **sample data**, labelled in the UI. No ratings, review counts, customer counts or coverage claims are shown.
- Until you add photos (see IMAGES.md), visuals are original SVG illustrations, not photographs.
- Nepali copy is a machine-written draft and needs native-speaker review.
- Contact details are placeholders until `NEXT_PUBLIC_SUPPORT_PHONE` / `NEXT_PUBLIC_WHATSAPP_NUMBER` are set. Social links are unset.
- Legal pages are structured DRAFTS written for this business (see "Terms & policies" below). They are not legal advice and not in force.
- `robots.txt` disallows everything and pages are `noindex` until launch.

## Next steps toward production
Replace `src/data/*` and the store actions with API calls; add real OTP auth, payment gateway,
SMS/WhatsApp notifications, maps and verified reviews; supply real photography and legal copy; remove noindex.
