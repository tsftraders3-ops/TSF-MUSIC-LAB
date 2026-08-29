# TSF Music — Architecture

This document maps the entire codebase: what every module does, how data
flows through the app, and the contracts that keep the standalone promise
("no server, works after install") intact.

```
┌────────────────────────────────────────────────────────────────────┐
│                              App.tsx                                │
│  SafeArea → Toast → PlayerProvider → DynamicTheme → Navigation     │
│         (WhatsNewDialog + Onboarding overlay the stack)            │
├──────────────┬──────────────┬──────────────┬───────────────────────┤
│  HomeScreen  │ SearchScreen │ LibraryScreen│ PremiumScreen         │
│              │              │              │   (bottom tabs)       │
├──────────────┴──────────────┴──────────────┴───────────────────────┤
│  Stack screens: Player (modal) · Collection · Playlist · Stats ·   │
│                 Taste · AI                                          │
├────────────────────────────────────────────────────────────────────┤
│  MiniPlayer (floats above the tab bar) · PlayerProvider            │
├────────────────────────────────────────────────────────────────────┤
│  mindbeat facade  →  src/ai (MINDBEAT intelligence, see            │
│                      docs/MINDBEAT.md)                             │
├────────────────────────────────────────────────────────────────────┤
│  api/saavn · api/artists · api/music · api/itunes                  │
├────────────────────────────────────────────────────────────────────┤
│  storage/store (AsyncStorage) · storage/downloads (files) ·        │
│  ai/core/storeSqlite (event ledger)                                │
├────────────────────────────────────────────────────────────────────┤
│  react-native-track-player  ←  background service (service.ts)     │
│  JioSaavn CDN (320 kbps AAC)  ·  iTunes preview CDN                │
└────────────────────────────────────────────────────────────────────┘
```

## App shell

`App.tsx` composes the provider stack and navigation:

- **Providers** (outer→inner): `SafeAreaProvider` → `ToastProvider` →
  `PlayerProvider` → `DynamicThemeProvider` → `NavigationContainer`.
- **Tabs** (`TabParamList`): Home / Search / Your Library / Premium —
  a full-width pure-black 58px bottom bar (Spotify Android layout), with
  the `MiniPlayer` floating above it.
- **Stack** (`RootStackParamList`): `Collection`, `Playlist`, `Stats`,
  `Taste`, `AI` (slide from right) and `Player` (bottom modal).
- **Overlays**: `WhatsNewDialog` (one-time modal per release) and
  `Onboarding` (first-run flow) render above the navigator. Onboarding
  deliberately gates behind the What's-new dismissal so the two modals
  never stack.
- **Fonts**: six Figtree weights (400–900) are loaded before first
  render; a load failure falls back to the system font rather than
  crashing.

## Data providers (`src/api/`)

### saavn.ts — the primary catalog
React Native has no CORS restrictions, so the app calls JioSaavn's public
web API **directly from the device**:

- `saavnGet(params)` — JSON helper that tolerates JioSaavn's junk-prefixed
  response bodies.
- `decryptMediaUrl(encrypted)` — DES-ECB decryption (pure-JS `crypto-js`)
  of `encrypted_media_url` into a playable 320 kbps AAC CDN URL. The key
  is embedded; no secrets are transmitted.
- Search, album tracks, artist tracks, trending, charts, playlist
  details, homepage editorial feed (`content.getHomepageData`), stream
  URL resolution + refresh (used by stale-URL recovery).
- Every track leaving this module for an algorithmic surface passes the
  safety filter; search results keep explicit rows (badged "E") because
  they represent user intent.

### artists.ts — real artist photography (v3.2)
JioSaavn's artist *search* returns placeholder art, but two endpoints
carry genuine portraits. This module is the honest layer on top:

- `ARTIST_SEEDS` — 48 A-listers with verified photo URLs (harvested from
  the live API), so onboarding's first screen needs zero round-trips.
- `ARTIST_CATEGORIES` — 8 live pool queries (Bollywood, Punjabi, Indie…)
  powering the "More …" batches.
- `searchSaavnArtists()`, `getArtistPhoto(id)`, `lookupArtistPhoto(name)`
  — all cached.
- `sanitizeArtistImage()` is the gate: **only `c.saavncdn.com/artists/`
  URLs pass** (upgraded to 500×500). Album art masquerading as artist
  art is rejected; callers fall back to an elegant initials circle
  (`Artwork` component) — the app never shows a wrong photo.

### music.ts + itunes.ts — aggregation & fallback
`searchMusic()` queries JioSaavn first; if results are thin (< 8) or the
request fails, it tops up with iTunes 30-second previews (badged via
`Track.previewOnly`). Dedup is by normalized title+artist. The user
always gets results, even when Saavn is unreachable in their region.

## Playback pipeline (`src/player/`)

### PlayerProvider.tsx
Wraps react-native-track-player into the app-level player API:

- queue, shuffle, repeat, likes, play counts
- `playNext` / `addToQueue` / `removeFromQueue` with toast feedback
- **Smart Shuffle** — injects MINDBEAT recommendations between upcoming
  tracks (sparkle-badged rows)
- autoplay toggle, `contextId` tracking (which collection is playing —
  powers the green play-FAB overlays)
- progress intentionally lives **outside** React context so playback does
  not re-render list rows
- setup failures are never cached — the next interaction retries cleanly
- owns MINDBEAT instrumentation while in the foreground (single-owner
  rule; the service mirrors ownership when the UI is killed)

### service.ts — the background service
Registered with TrackPlayer and running even when the UI process is gone:

- remote controls (notification / lock-screen / headset)
- audio-focus handling
- **stale-URL auto-recovery**: playback errors trigger refetch → decrypt
  → reload of the same track
- **endless radio**: on `PlaybackQueueEnded` with Autoplay on, MINDBEAT
  Radio v2 builds the next picks from the last track + session context
- 1-second progress ticks feed the ledger's heartbeats so graded
  evidence survives app kills mid-track

### Downloads (`src/storage/downloads.ts`)
`resolveStreamUrl()` → save the m4a into `documentDirectory/tsf-downloads/`
→ index in AsyncStorage. `localUri` on the track makes playback skip the
network entirely. Removing a download deletes the file and the index row.

## MINDBEAT (src/ai/) — summary

The intelligence stack is documented separately in
[docs/MINDBEAT.md](MINDBEAT.md). The contract that matters for
architecture:

- **`src/ai/mindbeat.ts` is the only entry point.** Screens and the
  player talk to the facade; nothing outside `src/ai` touches the ledger.
- `init()` is performance-shaped: the SQLite store opens, a snapshot
  gives an instant profile, the full rebuild runs behind the first
  render (cold-start budget < 80 ms).
- The **event ledger** lives in `expo-sqlite` (WAL, transactional) on
  native and an in-memory store on web/tests behind one interface
  (`storeSqlite.ts` / `storeMemory.ts`).
- Legacy v2.1 surfaces (`engine.ts`, `generator.ts`) remain as the
  fallback layer for very young profiles; MINDBEAT surfaces take over as
  evidence accumulates (the "ladder", §10.4 — never emptier than
  before).

## Dynamic theming (`src/theme/`)

- `dynamic.ts` — the palette engine: fetch a 50×50 artwork variant
  (~2 KB) → decode in pure JS (`jpeg-js`, zero native risk) → 4096-bucket
  quantizer (border/vignette luminance filters, saturation-weighted
  dominant+vibrant scoring) → HSL art-direction (hue from art; floors and
  clamps so dark covers still glow; grayscale art → steel-blue accent).
  Emits `{dominant, vibrant, deep, glow, wash}`. LRU cache (64) +
  in-flight dedupe; deterministic curated fallbacks — it never rejects.
- `DynamicThemeProvider.tsx` — palette context driven by the active
  track; `useTrackPalette()` for per-card tinting. The Player gradient
  and collection/playlist header washes read from here.
- `theme.ts` — the static Spotify design system (palette, type scale,
  chip tokens, genre color pairs, Figtree font helpers).

Performance guardrails: no BlurViews, static gradient views, extraction
runs once per track change off the render path.

## Persistence map

| Store | Technology | Contents |
|---|---|---|
| `storage/store.ts` | AsyncStorage | favorites, recents, play counts, recent searches, playlists, download index, charts + home-feed caches (6h TTL), autoplay/smart-shuffle settings, onboarding dual-write flag + progress, user name |
| `ai/core/storeSqlite.ts` | expo-sqlite (WAL) | the event ledger: raw events (90d, ≤20k), graded listens, session records, kv (taste snapshot, onboarding seeds, kill switch) |
| `storage/downloads.ts` | FileSystem | offline m4a files in app-private storage |

Write protocol: storage mutations are serialized on a promise chain so
rapid taps can't clobber each other; ledger writes amortize heartbeats
(10s flush cadence).

## Content safety (`src/safety.ts`)

Two layers: provider explicit flags, plus a word-boundary regex blocklist
(English + Hindi/Punjabi romanized, tuned to avoid false positives like
"cocktail"). `filterClean()` / `isClean()` gate **every** algorithmic
surface (home shelves, mixes, radio, shuffle, AI playlists). Search shows
an "E" badge instead of filtering. Editorial shelves render through a
collection-level clean check.

## Web harness (`src/webmocks/` + `metro.config.js`)

The device lab runs the real app on `react-native-web` by redirecting
modules — **web platform only**:

| Real module | Web replacement |
|---|---|
| `react-native-track-player` | in-memory player with `window.__TsfMock` control plane |
| `expo-file-system` | no-op |
| `src/api/saavn.ts` | fixture catalog (real JioSaavn CDN artwork) |
| `src/api/music.ts`, `artists.ts` | fixture aggregations |
| `src/ai/core/storeSqlite.ts` | `storeMemory.ts` (same interface) |

Every redirect is gated on `platform === 'web'`; Android bundles are
byte-verified after each release to prove no mock leaks
(`scripts/verify_v*_apk.py`). See [docs/DEVELOPMENT.md](DEVELOPMENT.md)
for the lab workflow.

## Navigation & screen inventory

| Screen | Role |
|---|---|
| `HomeScreen` | Deep feed: shortcuts, Made for {name}, Now Sound, Jump back in, Popular artists, Trending, On the Rise, Because you listened, New releases, Featured playlists, charts |
| `SearchScreen` | Search field, recents, Top-result hero + Songs list, 18-category Browse grid, TSF AI card, Keyword⇄Vibe toggle |
| `LibraryScreen` | Playlists/Artists/Albums/Downloaded filters, sort, list⇄grid toggle, Liked Songs hero, Your Sound row, version badge |
| `PremiumScreen` | Spotify-style Premium landing (4th tab); CTA honestly confirms the app is free |
| `PlayerScreen` | Now-playing modal: palette gradient, artwork, progress, controls, queue sheet (Now playing / Next up), Smart Shuffle + Autoplay chips, share |
| `CollectionScreen` | Album/playlist/chart detail with palette-tinted hero; lazy-resolves tracks by `kind` |
| `PlaylistScreen` | User playlist detail with per-track remove + long-press menu |
| `AIScreen` | AI playlist generator with staged thinking animation, save/play/shuffle/regenerate |
| `StatsScreen` | "Your Sound" v2: 30-second-rule streams, listening clock, streaks, skip profile |
| `TasteScreen` | "Taste DNA": the full model, daypart matrix, Boost/Mute, export, reset, kill switch |

Shared components: `Onboarding` (3-step first run), `WhatsNewDialog`,
`MiniPlayer`, `TrackRow`/`TrackMenu` (corrections: Not for me / Boost /
Mute), `Shelf`/`ShelfSkeleton`, `Artwork` (with initials fallback),
`PressableScale`, `Toast`.

## CI / release topology

`.github/workflows/native-android.yml`:

1. `bun install --frozen-lockfile`
2. stamp `versionCode = 100 + run_number` and `version = tag name` into
   `app.json` (monotonic in-place upgrades)
3. `expo prebuild --platform android --no-install`
4. decode the release keystore from GitHub Secrets +
   `ci/patch-android-signing.mjs` patches gradle for release signing
5. `./gradlew assembleRelease` → verify signature with `apksigner`
6. upload artifact; on `v*` tags, publish a GitHub Release

The native `android/` directory is never committed — it is regenerated
by prebuild on every run.
