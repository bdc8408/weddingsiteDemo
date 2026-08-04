# Public Demo Wedding Site

Single-page Vite + React wedding website demo designed for a mobile-first scrolling experience with a retro-modern, art deco-inspired palette.

## Sections

- Splash with countdown to August 1, 2026 in the Finger Lakes region
- Placeholder photo journey for demo assets
- FAQ with emphasized shuttle guidance
- Registry and hotel block area
- Large final RSVP call to action

## Local development

1. Install Node.js 20 or newer.
2. Run `npm install`
3. Run `npm run dev`
4. Open the local Vite URL in a browser

## Docker

Build the container:

```bash
docker build -t weddingsite .
```

Run it on port 8383:

```bash
docker run --rm -p 8383:8383 weddingsite
```

Then open `http://localhost:8383`.

## Docker Compose

Start the site with Compose:

```bash
docker compose up -d --build
```

Stop it:

```bash
docker compose down
```

## Demo notes

- This copy, imagery, and links are intentionally anonymized for public sharing
- Replace `example.com` links in `src/App.jsx` with your own destinations
- Replace placeholder image assets in `public/assets/photos/` as needed
- Adjust countdown date and logistics copy for your live event

## Fonts and assets

- Follow `ASSET_GUIDE.md` for exact file names and folder locations
- Put Astonscript files in `public/assets/fonts/` as `Astonscript.woff2` and/or `Astonscript.woff`
- Put engagement photos in `public/assets/photos/` using the names listed in `ASSET_GUIDE.md`