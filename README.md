# Ship Fast. Go Deep. — Vibe Build Pitch

English web slides for Jason Kuan's ikigai vibe build pitch.

## Run locally

```bash
just dev
```

Open <http://localhost:7333>. The dev server uses port `7333` and fails clearly if that port is already occupied.

The deck has no package-install step or external runtime dependencies. Its small Node static server is intentional: this workspace is mounted `noexec`, so native npm build binaries such as esbuild cannot run reliably here.

## Configure live demos

Edit `.env`:

```dotenv
VITE_SKYLINE_RUSH_URL=https://jason9075.github.io/Skyline-Rush/
VITE_TAIWAN_DRONE_FLIGHT_URL=https://your-tailscale-or-local-url.example
```

Restart `just dev` after changing `.env`. An unset Taiwan URL shows a safe configuration reminder instead of opening a broken page.

## Add fallback videos

Place two silent, 16:9 MP4 files here:

- `public/media/skyline-rush.mp4`
- `public/media/taiwan-drone-flight.mp4`

The videos autoplay, loop, stay muted, and remain inline. A designed placeholder remains visible until each video loads successfully.

For broad Chromium compatibility, encode H.264 video with `yuv420p` pixel format. A 15–25 second, 1080p clip is sufficient.

## Present

- `←` / `→`, `PageUp` / `PageDown`, or `Space`: navigate
- `Home` / `End`: first or last slide
- `F`: toggle fullscreen
- `T`: toggle the hidden timer
- `R`: reset the timer while it is visible
- Swipe horizontally on a touch screen to navigate

The timer starts when leaving the cover and turns coral after six minutes. It is hidden by default so the projected screen stays clean.

Chinese delivery cues and the six-minute cut are in [SPEAKER_NOTES.md](./SPEAKER_NOTES.md).

## Verify the deck

```bash
just build
```

This checks JavaScript syntax, the six-slide structure, both demo buttons, critical copy, the QR asset, and supporting files. The presentation is already static; no bundle or `dist/` directory is required.

## Event checklist

1. Put both MP4 files in `public/media/`.
2. Set and test the Taiwan live-demo URL in `.env`.
3. Open both live demos once before presenting so their assets and sessions are warm.
4. Confirm the home PC cannot sleep and Tailscale is connected.
5. Run the deck in the same Chromium profile and network used on stage.
6. Press `F` on the cover, then `T` only if an on-screen timer is useful.
7. If a live demo does not recover in 10 seconds, return to the slide and use the looping MP4.
