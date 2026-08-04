# Asset Placement And Naming

## Folder structure

- Place all photos in `public/assets/photos/`
- Place all custom fonts in `public/assets/fonts/`

## Required photo names

Use these exact filenames so the content map stays predictable as you replace placeholders:

- `hero-main.jpg` (main landing portrait, full-screen sticky hero)
- `countdown-bg.jpg` (landscape photo behind the countdown section — full-bleed)
- `photo-motion.jpg` (RSVP section full-bleed background)
- `gallery-1.jpg` through `gallery-6.jpg` (engagement photo grid — 6 images)

Map section notes:

- The map uses a Google Maps embed and does not require local map assets

Recommended format and sizing:

- Use `.jpg` for photos and keep each file under ~700KB if possible
- Hero image target: around 2200px wide
- Gallery images target: around 1400px wide
- RSVP background: around 1800px wide

## Font files

Place these font files in `public/assets/fonts/`:

- `AstonScript.ttf` (preferred)
- `Astonscript.ttf` (also supported)
- `Astonscript.woff2`
- `Astonscript.woff`
- `Amarante.ttf`
- `Amarante.woff2` (optional)
- `Amarante.woff` (optional)

`Bodoni Moda` is loaded from Google Fonts in the CSS.

If Astonscript is still not rendering:

- Confirm the file is actually in `public/assets/fonts/`
- Confirm the extension is lowercase `.ttf`
- Hard refresh after redeploy

## Next steps

- Drop `hero-main.jpg`, `countdown-bg.jpg`, and `photo-motion.jpg` into `public/assets/photos/`
- Add 6 engagement photos named `gallery-1.jpg` through `gallery-6.jpg`
- Countdown background should be landscape-oriented (≥ 2200 px wide)