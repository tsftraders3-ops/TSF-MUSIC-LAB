# TSF Music v2.1 — Spotify-grade AI music app

**A completely standalone, cross-platform (Android + iOS) music app.**
No server. No setup. No account. Install and it works.

Music streams at 320 kbps straight from the device via direct JioSaavn
API calls (DES-decrypted on-device) with an iTunes preview fallback —
React Native talks to the APIs directly, so there are no CORS proxies,
no backends, nothing to host.

## What's in v2.1 — the Spotify experience

### UI/UX (rebuilt to match Spotify's design language)
- Spotify palette, type scale and layout system; Figtree typography
- Home: greeting, quick-shortcut grid, horizontal shelves (Made for
  You / Jump back in / Trending now / Because you listened / Charts)
- Search: colorful genre "Browse all" grid, recent searches
- Library: playlists, Liked, Downloads, Recent + Your Sound stats
- Player: blurred artwork backdrop, scaled cover art, scrub slider,
  control deck, queue sheet (Now playing / Next up), share
- Press-scale micro-interactions with haptics everywhere
- Toast pill notifications for every action
- Animated equalizer bars on the active row, shimmer skeletons

### TSF AI — 100% on-device intelligence
- **AI Playlist Generator**: type a vibe ("Punjabi gym bangers",
  "90s heartbreak Bollywood") → intent engine extracts artists, moods,
  genres and eras → parallel catalog searches → scored, diversified,
  safety-filtered 25-track playlist with staged "thinking" animation
- **Smart Shuffle**: AI recommendations interleaved into the upcoming
  queue, badged with sparkles (like Spotify's smart shuffle)
- **Daily Mixes**: per-artist clusters of your heaviest rotations,
  refreshed daily and cached
- **Autoplay Radio**: when the queue ends, a song radio builds from
  the last played artist and keeps playing — even if the UI is dead
  (runs in the background playback service)
- **Because you listened to …**: artist radios for your top artists
- **Your Sound stats**: minutes, plays, top artists, top songs
- The AI learns from your listening graph (recents, likes, play
  counts) — stored only on your device

### Content safety
Explicit/abusive content never appears on Home or any algorithmic
surface: provider explicit flags + a word-boundary profanity blocklist
(EN + Hindi/Punjabi). Search results (user intent) show an "E" badge
instead.

### Player
320 kbps playback, background audio with notification/lock-screen
controls, stale-URL auto-recovery, play next / add to queue / remove
from queue, play counts, downloads for offline.

## Build

GitHub Actions (`.github/workflows/native-android.yml`) stamps the
version, prebuilds the native project and produces a signed release
APK on every push to `main`; tags (`v*`) publish a GitHub Release.

```bash
bun install
bun run typecheck
bunx expo start        # dev
bunx expo run:android  # native build
```

## Stack

React Native 0.76 · Expo SDK 52 (prebuild, bare workflow) ·
react-native-track-player · expo-blur / haptics / linear-gradient /
font · crypto-js (DES stream decryption) · TypeScript strict.
