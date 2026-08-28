# TSF Music — Native

A **completely standalone** cross-platform music streaming app, rebuilt in
React Native (Expo). No server, no URLs to configure, no setup — install the
APK and it works.

## What changed from v1

v1 wrapped the web app in a Capacitor WebView that pointed at a hosted
Next.js server — away from that server it could only show a blank screen.
v2 is a **real native app**: the music stack runs entirely on the device.

- **JioSaavn catalog, on-device**: search, trending charts and 320 kbps AAC
  stream URLs (DES-ECB decrypted locally with pure-JS crypto) fetched
  directly by the app — React Native has no CORS restrictions.
- **iTunes fallback**: international gaps are topped up with 30-second
  previews, clearly badged.
- **Native audio engine** (react-native-track-player): background playback,
  notification + lock-screen controls, headphone handling, automatic
  recovery when a stream URL goes stale.
- **Offline downloads**: save any song to the app's private storage from
  the player screen; the queue automatically prefers the local file.
- **Your library, on device**: favorites, play history and recent searches
  in AsyncStorage — private, no account.

## Stack

Expo SDK 52 · React Native 0.76 · react-native-track-player ·
react-navigation v7 · AsyncStorage · crypto-js · expo-file-system

## Build

GitHub Actions builds a signed release APK on every push to `main`
(`.github/workflows/native-android.yml`). The signing keystore lives in
GitHub Secrets — same identity as v1, so v2 upgrades in place. Tag `v*`
to publish a GitHub Release.

Local dev:

```bash
bun install
bunx expo start          # Metro
bunx expo run:android    # build & run on device/emulator
```

iOS: the codebase is cross-platform (`expo run:ios`); an Apple Developer
account + build cloud (or Mac) is required to produce an IPA.

The legacy web/WebView implementation is preserved on the `legacy-web`
branch.
