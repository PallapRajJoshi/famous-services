PICTURES FOR THE WEBSITE
========================

Every picture on the site is a file in this folder.

TO CHANGE A PICTURE
  1. Find the file you want to replace (for example  services/pipe-leakage-repair.svg).
  2. Put your photo in the SAME folder with the SAME name, but .jpg / .png / .webp
     (for example  services/pipe-leakage-repair.jpg).
  3. Refresh the browser. Nothing else to do. No code.
  Your photo wins over the .svg sample drawing. You can leave the .svg there or delete it.

FOLDERS
  hero/         home.*                  the big picture on the home page            (1 file)
  categories/   <category>.*            plumbing, cleaning, ...                     (16 files)
  services/     <service>.*             one service                                 (75 files)
                <service>-2.*, -3, -4   extra pictures for that service's gallery
  packages/     <package>.*             combo packages                              (6 files)
  rentals/      <type>.*                room-single, land-agri, prop-house, ...     (13 files)
  listings/     <listing id>.*          one rooms / land / property listing         (26 files)
                <id>-2.*, -3, -4        extra pictures for that listing's gallery
  guides/       <guide>.*               help guides                                 (6 files)
  brand/        logo.*   og.*           optional: your logo, and the picture shown when the site is shared
                                        (brand/ is empty until you add files)

SHORTCUT: if a service, package or listing has no photo of its own, the photo of its category
(or room/land/property type) is used. So 16 category photos + 13 type photos + 1 hero photo
already cover the whole site. Add the per-service photos later.

SIZE AND FORMAT
  Photos: .jpg, .png, .webp or .avif. Best: .jpg or .webp, 1200 x 900 px (4:3), under 400 KB.
  Hero:   1120 x 1040 px.      Share picture (brand/og): 1200 x 630 px .jpg.
  Logo:   .png or .svg with a transparent background, at least 80 px high.
  Pictures are cropped to fit (4:3 on cards, 16:10 and 16:9 in some places) - keep the subject in the middle.
  The site shrinks big photos automatically.

NAMES
  The name must match exactly: lower-case, hyphens, no spaces.
  Anything in a folder or file whose name starts with  _  or  .  is ignored (use  _old/  to keep spare files).

IF A NEW PICTURE DOES NOT SHOW
  With `npm run dev` the list updates by itself. Otherwise run:   npm run images
  (`npm run build` does it automatically.)
