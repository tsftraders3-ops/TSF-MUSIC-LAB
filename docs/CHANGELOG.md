# Changelog

All notable releases of TSF Music. Dates are UTC.
Detailed build history: `worklog.md` (the session log).

## v3.2.0 — 2026-08-29

The user-feedback round: every reported issue fixed end-to-end.

- **Real artist photos** in onboarding and the new "Popular artists"
  home rail — 48 verified A-lister portraits ship in-app (instant first
  screen), plus live category batches ("More Bollywood / Punjabi /
  Hip-Hop / …"), artist search with photo enrichment, and an honest
  gate that rejects album-art-masquerading-as-artist-photo (initials
  fallback — never a wrong image).
- **Onboarding persistence fixed** (the re-ask bug): the completion
  flag is dual-written (SQLite + AsyncStorage) before the flow closes,
  the gate awaits store readiness, and a mid-flow kill resumes instead
  of restarting. Verified by an automated reload regression in the
  device lab.
- **Deep Home feed**: New releases + Featured playlists shelves from
  JioSaavn's editorial feed (6 h cached for instant cold starts),
  Popular artists rail — the home screen now scrolls Spotify-deep from
  the very first session.
- **Search upgraded**: Spotify's Top-result hero card over the Songs
  list, 18-category Browse grid, clear-recents button.
- **New app icon + splash** (10-round gauntlet vs genuine references):
  green music-note-from-waveform-bars mark on a dark premium tile;
  adaptive icon with safe zone; splash with Figtree wordmark.
- Device lab rebuilt and committed (28-step Playwright walkthrough,
  both device profiles, zero console errors).

## v3.1.0 — 2026-08-29

- **Spotify-faithful 3-step first-run onboarding**: "What's your
  name?" → "Choose 3 or more artists you like." (circular avatars,
  search, More batches) → "What kind of music do you like?" (12 genre
  tiles). Picks seed the taste profile immediately.
- "Made for {name}" shelf on Home; onboarding gates behind the
  What's-new dialog (no modal stacking).
- Gauntlet-verified end-to-end against genuine Spotify references
  (contrast ≥ 5.9:1 on every genre tile, pixel-verified selection
  treatment, iOS safe areas).

## v3.0.0 — MINDBEAT — 2026-08-28

The complete intelligence overhaul: every play/skip/like becomes graded
evidence.

- **L1 Event Ledger** — 20 event types, graded listen outcomes, crash
  -safe heartbeats, 90-day/20k bounded SQLite storage.
- **L2 Taste Profile** — decaying affinities (heart 180 d … era 120 d),
  the 5×2 daypart matrix, proxy feature space with behavioral
  calibration, co-play graphs, taste clusters, corrections
  (Boost / Mute / Not-for-me).
- **L3 Session Brain** — 12-track window, six-state vibe machine,
  skip-storm healing protocol.
- **L4 Decision Engine** — 5-pool scoring, ε-greedy exploration,
  8 truthful reason codes, deterministic ordering.
- **L5 Surfaces** — Smart Shuffle v2 (vibe-lock + queue healing),
  Radio v2 (multi-seed, drift, dedup, background), Daily Mixes v2
  (cluster crosses, 60/25/15), Now Sound daylist, On the Rise, AI
  Playlist v2 (five stages, Hinglish, negations), Vibe Search.
- **L6 Trust** — Taste DNA transparency screen, kill switch, JSON
  export, no-identifier privacy (verifier-tested).
- Your Sound v2 stats (30-second rule, listening clock, streaks);
  74/74 replay tests incl. latency budgets (decide() p95 ~4 ms vs
  150 ms budget); blind A/B preferred over the v2.1 generator 17/20.

## v2.5.0 — 2026-08-27

- Green-active filter chips with black text (pixel-verified against
  genuine Spotify), avatar-left home header with All / Music / AI.
- 8-tile shortcut grid (2×4) on Home.
- 4th bottom tab: **Premium** (Spotify-style landing page).
- Library: ghost-outline inactive chips + list⇄grid view toggle.
- Mini player: "Title • Artist" bold single line.
- **What's-new dialog** (one-time per release) + on-screen version
  badge — updates became visibly verifiable on the device.

## v2.4.1 — 2026-08-26

The forensic "why doesn't it look like Spotify" fix:

- Home canvas stays **flat #121212** (the artwork wash was misapplied
  there and read as mud); artwork tinting lives only on
  playlist/album/player pages via a new vivid `wash` palette token.
- Quick tiles carry album art again; semibold card titles; 8px radii.
- Player: plain white 62px play glyph (no circle — current Spotify),
  white progress thumb.
- White-active All/Music chips (per the reference of the time).

## v2.4.0 — 2026-08-26

- Repo-faithful rebuild against the studied reference client:
  gradient washes, white-active pills, translucent tiles, gradient
  mini player, plain-white play glyph, contextId tracking (green
  play-FAB overlays). Later rolled back and superseded by v2.4.1's
  corrected design direction.

## v2.3.1 — 2026-08-26

- Rollback release: byte-identical v2.3 UI restored by user preference,
  shipped as an upgradable APK (monotonic versionCode).

## v2.3.0 — 2026-08-25

- **A-to-Z authentic Spotify Android UI**: rebuilt every core surface
  against pixel-sampled genuine references — #121212 canvas, black
  3-tab bar, #282828 mini-player card, quick-tile grid, Spotify
  shelves, full now-playing rewrite, #242424 search pill + Browse-all
  grid, library layout, collection hero pages.
- Web screenshot harness born (the ancestor of today's device lab):
  in-memory player + fixture APIs + VLM-verified screenshots.

## v2.2.0 / v2.2.1 — 2026-08-24

- **Dynamic per-song theming**: artwork color extraction in pure JS
  (jpeg-js quantizer) → the app repaints with every track.
- Glassmorphism pass, rotating vinyl player with waveform scrubber
  (later replaced by the authentic Spotify player in v2.3).
- Ambient backdrop, palette-tinted cards; zero native modules added.

## v2.1.0 — 2026-08-23

- Spotify-grade UI overhaul: design system (palette, type scale,
  Figtree), Home shelves, Search browse grid, Library, full Player with
  queue sheet, press-scale haptics, toasts.
- **First AI generation (fully on-device)**: AI Playlist Generator with
  intent parsing + staged thinking animation, Smart Shuffle, Daily
  Mixes, Autoplay Radio, Because-you-listened, Your Sound stats.
- Content safety layer: provider flags + EN/Hindi/Punjabi blocklist on
  every algorithmic surface; E-badged search.
- GitHub Actions CI producing signed release APKs; tags publish
  GitHub Releases.

## v2.0.x — 2026-08-22

- Standalone React Native (Expo 52) baseline: direct JioSaavn API with
  on-device DES decryption (320 kbps), iTunes fallback,
  react-native-track-player with background audio and notification
  controls, downloads for offline, playlists/likes/history.
- Signed-APK CI pipeline (versionCode jumped past the v1.x Capacitor
  builds so Android accepts in-place upgrades).

## v1.x

- Capacitor hybrid prototype (superseded by the React Native rewrite).
