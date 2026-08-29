# TSF Music — Development Guide

How to work on this repo: setup, everyday commands, the visual-QA device
lab, tests, the gauntlet methodology, and the release pipeline.

## Prerequisites

- **Bun** (package manager + test runner)
- **Node 18+** (for Metro tooling)
- Android: Android SDK platform 35 + build-tools 35 (or let Expo install
  them) for `expo run:android`
- Python 3 + Playwright + Pillow for the device lab (`pip install
  playwright pillow && playwright install chromium`)

## Setup

```bash
git clone https://github.com/mua47105-hue/TSF-MUSIC.git
cd TSF-MUSIC
bun install
```

## Everyday commands

```bash
bunx expo start          # Metro dev server (scan with Expo Go or a debug build)
bunx expo run:android    # compile + install a native debug build
bunx expo run:ios        # native iOS build (macOS + Xcode required)
bun run typecheck        # tsc --noEmit — strict; keep it clean
bun test                 # the AI replay suite (74 tests)
```

`bun run typecheck` and `bun test` are the two gates every change must
pass before commit.

## The device lab (visual QA)

There is no Android emulator in this environment (no KVM), so the repo
ships its own "emulator": the real app running on **react-native-web**
with the data/player layers swapped for fixtures, driven by Playwright
at hardware-faithful viewports.

```bash
bash scripts/lab.sh
```

What it does:

1. Boots `expo start --web` on port 8123 (Metro is killed afterwards —
   the sandbox reaps background processes between runs).
2. Runs `scripts/device_lab.py`: a 28-check walkthrough (14 checkpoints ×
   2 devices) on **Pixel 7 (412×915 @2.625)** and **iPhone 13
   (390×844 @3)** viewports (no browser chrome — native full-screen
   dimensions):
   - What's-new dialog → onboarding (name → artist picks → genres)
   - **the persistence regression**: reload after completing onboarding
     and assert it never re-asks + Home greets by name
   - More-artists expansion, artist search
   - Home at 3 scroll depths (editorial feed verification)
   - Search (browse grid + top-result), mini-player, full player
     playing/paused, queue sheet, library, premium, tabs
3. Asserts **zero console errors** along the way.
4. Screenshots land in `screenshots/{pixel7,iphone13}/`, with a
   `report.json` of every step.

Package the shots for review:

```bash
python3 scripts/package_ui_shots.py
# → download/tsf-ui-screenshots/{pixel7,iphone13,side-by-side}/ + UI-Gallery.html
```

### How the web harness stays out of the Android build

`metro.config.js` redirects modules **only when `platform === 'web'`**:

- `react-native-track-player` → in-memory mock (with a
  `window.__TsfMock` control plane for seek/force/snapshot)
- `expo-file-system` → no-op
- `src/api/saavn.ts|music.ts|artists.ts` → fixture catalog
- `src/ai/core/storeSqlite.ts` → `storeMemory.ts` (same interface)

The Android bundle is unaffected by construction, and every release is
byte-verified to prove it (see "Release verification" below).

## The gauntlet loop

The methodology used for every major feature (UI fidelity, the icon,
MINDBEAT, onboarding):

1. **Set the bar** — gather *genuine* reference material (real Spotify
   screenshots, live API responses, the reference repo).
2. **Build** against the bar with pixel-measurable specs, not vibes.
3. **Critique harshly** — fresh-context critics (VLM side-by-side
   against references; adversarial code reviewers for the engine) that
   must FAIL the work with concrete, verifiable findings.
4. **Fix every P0** and add a regression lock for each
   (`tests/ai/gauntlet-r2.test.ts` now carries 25).
5. **Verify blind** — A/B the result against the reference/replacement
   without telling the critic which is which; ship only on a win or
   parity.
6. **Verify the artifact** — the shipped APK itself is deep-inspected,
   not just the working tree.

Artifacts from past gauntlets live in `gauntlet/` (icon rounds, UI
comparisons) and `scripts/ab2-blind.txt` (engine A/B).

## Release process

Releases are tag-driven:

```bash
# 1. Bump app.json expo.version (and WhatsNewDialog notes for user-visible changes)
# 2. Gates
bun run typecheck && bun test
# 3. Commit + tag + push
git add -A && git commit -m "vX.Y.Z: <summary>"
git tag vX.Y.Z
git push origin main vX.Y.Z
```

CI (`.github/workflows/native-android.yml`) then:

1. `bun install --frozen-lockfile`
2. stamps `versionCode = 100 + run_number` (monotonic → in-place
   upgrades) and `version` from the tag into `app.json`
3. `expo prebuild` regenerates `android/` (never committed)
4. decodes the keystore from GitHub Secrets and signs the release build
5. verifies the APK signature and publishes a **GitHub Release** on
   `v*` tags

### Release verification (post-ship)

Each release has been deep-verified with a script
(`scripts/verify_v32_apk.py` is the current template):

- downloads the published APK
- probes `AndroidManifest.xml` (UTF-16) for the expected versionName
- asserts every feature's **bundle markers** exist in the Hermes bundle
  (unique strings from the new code)
- asserts `webmocks` did **not** leak into the Android bundle

Copy the script per release, update the marker list, run it.

### Versioning conventions

- `app.json` `expo.version` = marketing version (matches the tag)
- `versionCode` = CI-controlled (`100 + run_number`) — never hand-edit
- Same keystore across all releases → updates install over previous
  versions without uninstalling
- `WhatsNewDialog` carries a per-release `SEEN` key: bump the notes and
  the key so upgraders see the dialog once

## Code conventions & house rules

These keep the app fast, honest and standalone:

- **The standalone contract**: no servers, no LLM APIs, no accounts, no
  telemetry. Music APIs are called from the device directly.
- **One intelligence entry point**: everything goes through the
  `mindbeat` facade; nothing outside `src/ai` touches the ledger.
- **Single-owner instrumentation**: exactly one of PlayerProvider /
  background service owns ledger events at a time.
- **All tuning numbers in `src/ai/core/constants.ts`** — no magic
  numbers in the intelligence stack.
- **Safety gate on every algorithmic surface** (`src/safety.ts`); search
  is the only explicit-tolerant surface (badged).
- **Artist images must pass `sanitizeArtistImage()`** — never render
  album art as an artist photo; fall back to initials.
- **Performance guardrails in UI**: no BlurViews, no animation loops on
  static screens, artwork palette extraction once per track change.
- **TestIDs are additive** (`track-row`, `mini-player`,
  `player-queue-btn`, `shelf-card`, `tab-*`) — the lab depends on them.
- Keep `bun.lock` committed (CI uses `--frozen-lockfile`).

## Repo layout quick reference

```
src/           app code (see docs/ARCHITECTURE.md for the module map)
tests/ai/      replay tests + gauntlet regression locks
scripts/       device lab, APK verifiers, icon generators, packaging
ci/            gradle signing patch used by CI
docs/          this documentation set
download/      packaged UI screenshots for review (tracked)
screenshots/   raw lab output (gitignored — regenerate with lab.sh)
gauntlet/      past gauntlet artifacts (reference comparisons)
worklog.md     the multi-agent session log (detailed history)
```

## Troubleshooting

- **Metro won't start / stale cache**: `bunx expo start -c`.
- **Lab says "metro failed to become ready"**: first web compile can
  take several minutes; the script waits up to 8 minutes and retries
  boot 4 times. Check `.lab-metro.log`.
- **`expo run:android` SDK errors**: install
  `platforms;android-35` + `build-tools;35.0.0` via sdkmanager.
- **Type errors after pulling**: `bun install` (new deps), then
  `bun run typecheck`.
