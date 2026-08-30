# TSF MUSIC — MAIN-BUILDER HANDOVER REPORT
### Everything the Lab (v3.4.0-lab.1 → v3.4.0-lab.4) changed in the program, what each change bought, and how to port it into the main app

**Prepared:** after lab.4 ship · **Baseline:** main repo `v3.3.0` (Search V2 engine) · **Lab target:** real-device proof of every feature, zero resource use (all builds via GitHub Actions CI — never build locally)

**Scope in one line:** the lab took the v3.3.0 app and added (1) a title-truth search contract with an automatic rescue ladder, (2) a complete YouTube source with ad-free full-song playback that survives YouTube's bot defenses, (3) a never-blank player failure path, and (4) fullscreen window determinism + UI hardening — all verified on a real Android device and shipped as four GitHub Releases.

---

## 0. RELEASE MAP (what to pull and why)

| Release | Tag / commit | What it delivered | What it bought (user-visible) |
|---|---|---|---|
| lab.1 | `v3.4.0-lab.1` @ `24fedbe` | SIG search contract + rescue ladder + YouTube **search** source; CI signing preflight; first GitHub Release | "Tu chaiye"-class searches stop returning same-name cover spam; YouTube section appears in results |
| lab.2 | `v3.4.0-lab.2` @ `86e31e8` | Title-only authority-gap rescue + ortho-aware matching + YT view-count parse fix + junk-demoted rescue pick | The exact user failure ("tu chaiye" → cover listing) fixed: the official Atif Aslam song now wins with a "Found on YouTube · full song, ad-free" label |
| lab.3 | `v3.4.0-lab.3` @ `130dc2f` | Full YouTube **playback** rebuild: VISIONOS tokenless ladder + BotGuard PO-token WebView minter + honest failure toasts + search junk filter | Tapping any YouTube song plays the full song ad-free on device; no more blank player; junk rows (Slowed/Reverb/random videos) gone from YouTube results |
| lab.4 | `v3.4.0-lab.4` @ `cb710e7` | Fullscreen window policy (config plugin) + insets-aware tab bar + refreshed What's-New dialog | The half-screen UI wedge (app stuck in a Samsung split-window with the launcher visible below) is impossible now; tab bar respects gesture-nav insets; users get in-app confirmation they're on the new build |

Device acceptance status: **playback confirmed working by the user on-device after lab.3** ("everything is completely fine, it is working very good… no ad"); lab.4 fixes the UI/window report from the same session.

---

## 1. SEARCH: THE TITLE-TRUTH CONTRACT + RESCUE LADDER (lab.1 + lab.2)

### The problem
The v3.3.0 engine returned *lexically* good results but not *canonically* true ones. Searching "tu chaiye" (title-only, no artist) painted 31 same-name JioSaavn covers while the real Atif Aslam song wasn't even in that catalog. Title-only queries bypassed the v3.3.0 SIG gate entirely (it only covered artist+title plans).

### The design (port this as a unit)
**S0→S3 pipeline gains a SIG gate that now covers BOTH plan kinds:**
- `entity_title` plans: after organic ranking, if ≥1 row title-matches (qm ≥ 0.5) but the top rows are all below the authority floor → escalate to the rescue ladder. This is `titleAuthorityMissing()` with `AUTHORITY_FLOOR = 250_000` plays.
- `artist_title` plans: unchanged strict behavior (sigUnmet → ladder → partial/zero with partialArtists chips).

**Rescue ladder rungs (in order):** `youtube → itunes (30s preview) → variant (different spelling) → album (full song via its album)`.
- `rescueRowAuthoritative()` per source: JioSaavn keeps the hard 250k floor; iTunes accepted (curated); YouTube accepts a *song-kind row with an unknown metric* (YT Music song rows carry no view count — only video rows do) but rejects known-small metrics.
- `bestFirst()` demotes edit-class junk (Slowed / Reverb / LoFi / Remix / Unplugged) that carries huge views but is NOT the canonical recording.
- `verifyRescueRow()` is ortho-aware: plan variants (chaiye→chahiye) count as the same title token.

**SIG paint contract (must be preserved when porting):** a rescued row is spliced to rank 1 with `reasonCode: 'MATCHES_SEARCH'`, `sigState: 'rescued'`, and the UI renders honest per-rung labels:
- youtube → "Found on YouTube · full song, ad-free"
- itunes → "Found via Apple Music · 30s preview"
- variant → "Found under a different spelling"
- album → "Found via its album · full song"
- nothing credible found → the organic list is kept **silently** for a title query (honest; no false partial/zero states).

**Ortho-aware matching (rank.ts):** `acceptableTitleTokens()` + `titleHitCount()` make plan spelling-variants consumable in coverage/precision/verification. Empty variants ⇒ byte-identical legacy math (zero-regression guarantee, pinned by test SI4).

**View-count parsing (youtube.ts):** `parseHumanCount()` converts "6.2M views" → 6_200_000 (K/M/B/Lakh/Cr). The old strip-non-digits parse read "6.2M" as 6 — authority signals were thousandths of the truth.

### Files (port together)
`src/search/rescue.ts` (new, 255 lines) · `src/api/music.ts` (SIG gate orchestration, sigState='rescued' paint) · `src/search/rank.ts` (ortho tokens + rescue promotion +0.75 and deterministic sort) · `src/search/plan.ts` / `normalize.ts` (variant generation) · `src/screens/SearchScreen.tsx` (sigRescuedNote labels) · `src/types.ts` (sigState/rescueRung fields)

### Why it matters
The app stops lying. Either it has the canonical recording (labeled how it found it), or it shows what it has honestly. This is the contract that makes catalog gaps a solved class instead of whack-a-mole.

---

## 2. YOUTUBE SOURCE: SEARCH + AD-FREE FULL-SONG PLAYBACK (lab.1 + lab.3)

### The problem
Two separate problems: (a) YouTube search results leaked junk (duration-less videos, 15-min podcasts) into song results; (b) playback was the hard part — the old stream ladder was entirely dead (verified live: IOS/ANDROID 19.09 → HTTP 400; ANDROID_VR 1.60 / MWEB / WEB_REMIX tokenless → "confirm you're not a bot"; TVHTML5 embedded → unsupported) which produced the blank-player report.

### The design (port this as a unit)
**`src/api/youtube.ts` (625 lines) — the client registry, highest-value file in the release:**
- **Search** uses WEB_REMIX (YT Music) — working client-side, verified.
- **Playback ladder** (first that resolves wins, per-client health cooldowns 10 min on LOGIN_REQUIRED/UNPLAYABLE, full per-rung trail in `ytLastDiagnostics()`):
  1. **VISIONOS 1.04** — tokenless, pre-signed plain URLs, no decipher. This is NewPipe's production client class and yt-dlp's default since 2026-08. Resolves from residential IPs — this is the rung that works on the user's device.
  2. **WEB_REMIX (attested)** — needs BotGuard PO tokens (player pot bound to videoId + session visitor pot), with classic signatureCipher decipher fallback.
  3. **ANDROID_VR 1.65.10** — tokenless but dying (selective 403 after 1 MiB); last resort.
- Session `visitorData` bootstrap with 3h TTL; itag preference 140 (m4a) → opus 251 → bitrate pick.
- **Search junk filter:** songs always; videos only when `0 < duration ≤ 15 min` — kills the podcast/random-video leak-through.
- Diagnostics: every rung's HTTP status + reason is recorded (`ytLastDiagnostics()`), and `clearYtCaches()` resets cooldowns + trail (test isolation).

**`src/api/ytPoToken.tsx` (303 lines) — the hidden BotGuard minter (the lab.3 breakthrough):**
- A 1×1 `react-native-webview` mounted ONCE at the PlayerProvider root, running the mint engine **on the youtube.com origin** (html source + `baseUrl`).
- The proven chain, in-page: fetch youtube.com homepage → extract `ytcfg.set(...)` + the `window.ytAtN({...})` challenge (balanced-brace parser handles the current double-escaped shape) → load the BotGuard interpreter via script tag → VM snapshot → `GenerateIT` at jnn-pa.googleapis.com with the **rotated request key `O43z0dpjhgX20SCx4KAo`** → obtain the webPo minter → mint 128–133-byte Proof-of-Origin tokens.
- RN↔page bridge: requests in via `injectJavaScript('__ytOnMsg(...)')`, results out via `postMessage`; request/id map with timeouts; 11h session cache (`visitorData` + `webPot`), per-video `mintPlayerPot(videoId)`.
- Kill-switch discipline: every entry resolves `null` on any failure within timeouts — the bridge can never block JioSaavn playback. (TS note: the rn-webview props intersection degrades to `never` under strict TS — the file casts the component to a permissive type; keep that cast when porting.)

**`src/player/PlayerProvider.tsx` — the never-blank contract:**
- `playQueue` YT failure path: honest toast ("YouTube stream unavailable right now — retrying via secure resolver in a moment") → 1.2s warm-up retry through the now-mounted minter → if still failing, "That YouTube track is unavailable right now". **It never silently plays a different song than the one tapped, and never renders a blank player.**
- `playNext` / `addToQueue` YT-specific toasts; bridge mounted at provider root above the NavigationContainer.

### Why it matters
YouTube is now a first-class source: the catalog works, the canonical-song rescue lands on it, and playback survives the post-SABR bot-wall era with two independent mechanisms (tokenless VISIONOS from residential IPs; attested WEB_REMIX via the minter). Device-confirmed: **full songs, ad-free**.

### Porting prerequisites
`react-native-webview@^14` is in package.json (native module — the CI prebuild autolinks it; no manual steps). The WebView must mount exactly once, near the app root, before first YT tap.

---

## 3. FULLSCREEN WINDOW POLICY + UI HARDENING (lab.4)

### The field report
After lab.3, playback was confirmed working, but the home UI appeared "disturbed": content compressed into the top ~48% of the screen, tab bar mid-screen, dead space below. Pixel-level analysis of the screenshot (row-brightness scan + boosted crops) proved the app was rendering inside a **~48%-height top-anchored window with the launcher dock + 3-button nav bar visible below** — i.e. the OS had hosted the activity in a **Samsung split-screen / "snap window" / pop-up container**. Nothing inside the app's layout was broken (the full flex chain — RootView → SafeAreaProvider → nav containers → `tabsWrap flex:1` → bottom-tabs `screens flex:1` + in-flow bar — was verified sound, including against @react-navigation bottom-tabs v7.18 internals).

### The fix (three parts)
1. **`plugins/withWindowPolicy.js` (new) — fullscreen determinism via Expo config plugin.** CI regenerates `android/` with `expo prebuild` on every build, so the manifest cannot be hand-edited; the plugin injects, idempotently:
   - `android:resizeableActivity="false"` → the system refuses split-screen/snap-window/pop-up hosts and always renders full-screen (a snap attempt shows the standard "doesn't support split screen" toast instead of wedging the UI);
   - `android:maxAspectRatio="2.4"` (API 28+ attribute) + `<meta-data android:name="android.max_aspect" android:value="2.4"/>` (legacy) → tall screens render full-bleed, never letterboxed.
   - **Verified** by running a real `expo prebuild` and grepping the generated AndroidManifest for all three attributes. **app.json wires it:** `"plugins": ["expo-sqlite", "./plugins/withWindowPolicy"]`.
2. **Insets-aware tab bar (App.tsx):** `height: 58 + insets.bottom`, `paddingBottom: 6 + insets.bottom`; the floating mini-player offset (`58 + insets.bottom + 6`) mirrors it. On 3-button nav devices this is a no-op (insets.bottom = 0); on gesture-nav / future edge-to-edge it lifts labels clear of the system nav area.
3. **What's-New dialog refreshed to 3.4.0** (new seen-key `tsf.whatsNew.v3_4_0`) — doubles as on-device proof that the update installed, addressing the user's recurring "is this even the new build?" ambiguity.

### Why it matters
The reported UI disturbance class (window wedges, half-screen states) is eliminated at the manifest level — not patched in JS. Port the plugin verbatim and wire it in the main app's app.json.

---

## 4. FILE-BY-FILE INVENTORY (v3.3.0 → lab.4, code only)

**New (source):**
| File | Lines | Purpose |
|---|---|---|
| `src/api/youtube.ts` | 625 | YT client registry (search WEB_REMIX; playback VISIONOS→WEB_REMIX attested→ANDROID_VR), stream extraction, PO-token consumption, junk filter, diagnostics |
| `src/api/ytPoToken.tsx` | 303 | Hidden-WebView BotGuard minter + RN bridge (session + per-video PO tokens) |
| `src/search/rescue.ts` | 255 | Rescue ladder, authority floor, bestFirst junk demotion, ortho-aware verification |
| `plugins/withWindowPolicy.js` | 58 | Fullscreen window policy manifest mod (config plugin) |

**Modified (source):** `src/api/music.ts` (SIG gate + rescued paint) · `src/search/rank.ts` (+ortho tokens, rescue promotion, deterministic sort) · `src/search/plan.ts` + `src/search/normalize.ts` (variants) · `src/search/retrieve.ts` (YT rung wiring) · `src/api/saavn.ts` (+24 lines, helpers for ladder) · `src/player/PlayerProvider.tsx` (never-blank path + bridge mount) · `src/player/service.ts` (+9, playback hardening) · `src/components/TrackMenu.tsx` (+YT-aware actions) · `src/components/WhatsNewDialog.tsx` (3.4.0 content/key) · `src/screens/SearchScreen.tsx` (rescued labels) · `App.tsx` (insets-aware tab bar) · `src/types.ts` (sigState/rescueRung/YT fields) · `app.json` (plugin wiring)

**New (tests — 646 lines, all headless, no device needed):** `tests/ai/search_rescue.test.ts` (199) · `tests/ai/search_sig_e2e.test.ts` (234) · `tests/ai/youtube.test.ts` (213)

**New (docs/process):** `LAB-TESTING-GUIDE.md` (install/uninstall + signing identity) · `YOUTUBE-INTEGRATION-PLAN.md` · `SEARCH-INTENT-RESCUE-PLAN.md` · `gauntlet/SEARCH-YT-BARS.md` (acceptance bars) · `scripts/verify_v33_apk.py`

**CI:** `.github/workflows/native-android.yml` (+35: fail-fast signing-secret preflight, lab signing identity, v*-tag release publishing; versionCode = 100 + run number — monotonic, jumps past old Capacitor builds)

---

## 5. CONTRACTS & INVARIANTS (do not break while porting)

1. **Title truth over lexical match.** The canonical recording wins; covers may rank below but never displace a verified rescue.
2. **Honest sigState labels.** hit / rescued / partial / zero — every state renders a human explanation. Never fabricate a state.
3. **The rescue ladder order is youtube → itunes → variant → album**, with per-source authority rules (JioSaavn hard floor 250k; YT song-kind rows may have unknown metrics; known-small always rejected).
4. **Never-blank player.** A failed stream = honest toast + warm-up retry; never a silent nothing, never a different song than tapped.
5. **Kill-switch discipline.** YT must never block JioSaavn: every YT entry point resolves null within timeouts.
6. **Zero-regression matching.** Empty variant sets ⇒ byte-identical legacy ranking math (pinned by SI4).
7. **Prebuild-safe native config.** All manifest changes go through config plugins (`plugins/`), never hand-edits — CI regenerates `android/` every build.
8. **Deterministic ranking.** Sort is (score desc, id asc) — no ambient instability.

---

## 6. VERIFICATION METHOD (how we know it works)

- **Headless gauntlet:** `bun run typecheck` + `bun test` = **159/159 tests, 707 expect() calls, 14 files** (three suites added by the lab).
- **Live engine probes:** the real `searchMusicV2` was executed from the lab sandbox against live APIs with the user's exact queries before every ship ("tu chaiye" → sig=rescued, rank 1 = official Atif Aslam song, 2.2s).
- **Stream-ladder probes:** per-client player-endpoint probes documented exactly which YT clients are dead and why; the mint chain was proven end-to-end (challenge → interpreter → VM → GenerateIT → 128-byte tokens) before it was ported into the WebView.
- **Manifest verification:** the window-policy plugin was validated by running `expo prebuild` and grepping the generated AndroidManifest (`resizeableActivity="false"`, `maxAspectRatio="2.4"`, `android.max_aspect` meta-data all present).
- **Device acceptance:** the user runs each release APK on real hardware and reports; lab.3 playback and lab.4's UI report both came from this loop.
- **Screenshot forensics when needed:** the lab.4 diagnosis used pixel-level row-brightness analysis of the user's screenshot to distinguish an app-layout bug from an OS window state — worth reusing for future "the UI is broken" reports.

---

## 7. BUILD / RELEASE / SIGNING (what the main builder must know)

1. **Never build locally.** All builds run on GitHub Actions (`.github/workflows/native-android.yml`). Push `main` → CI run; push a `v*` tag → CI stamps `versionName` from the tag and `versionCode = 100 + run_number`, builds, apksigner-verifies, and **auto-publishes the GitHub Release** with `app-release.apk` (~76 MB).
2. **Signing identity differs from the main app** (lab alias `tsflocal` vs main `mua47105-hue`). Android will refuse a silent upgrade across identities — **uninstall the old app before installing a lab release.** Documented in `LAB-TESTING-GUIDE.md §6`.
3. **Version flow for a release:** bump `package.json` version → commit to main → tag `v<version>` → push tag → watch CI → verify the Release asset exists.
4. **New native modules** (e.g. react-native-webview) need no manual CI steps — prebuild autolinks. Any manifest/gradle change must be expressed as an Expo config plugin.

---

## 8. PORTING CHECKLIST (ordered, for the main builder)

1. Copy `src/search/rescue.ts`, `src/api/youtube.ts`, `src/api/ytPoToken.tsx`, `plugins/withWindowPolicy.js` verbatim.
2. Apply the diffs to `src/api/music.ts`, `src/search/rank.ts`, `src/search/plan.ts`, `src/search/normalize.ts`, `src/search/retrieve.ts`, `src/api/saavn.ts`, `src/types.ts` (mechanical; the lab diff is the reference).
3. Apply `src/player/PlayerProvider.tsx` + `src/player/service.ts` changes; mount `<YtPoTokenBridge />` at the PlayerProvider root (exactly once, above navigation).
4. Apply `SearchScreen.tsx` rescued-state labels and `TrackMenu.tsx` YT-aware actions.
5. Add `react-native-webview@^14` to the main app; wire `./plugins/withWindowPolicy` into the main `app.json`.
6. Copy the three test suites; run `bun run typecheck && bun test` — must be green with the main suite included.
7. Keep `App.tsx` tab bar insets-awareness if the main app's shell matches; otherwise port the principle (bar height + mini-player offset include `insets.bottom`).
8. Update the main app's What's-New flow for the merged release.
9. Ship via CI only; verify the Release asset and versionName/versionCode.

---

## 9. KNOWN LIMITATIONS & PARKED ITEMS

- **YouTube extraction is a living target.** Google rotates BotGuard (the WAA request key already rotated once: `O43z0dpjhgX20SCx4KAo`). Mitigations in place: three-rung ladder, per-rung diagnostics (`ytLastDiagnostics()`), per-client cooldowns. If device playback ever degrades, pull the diagnostics trail first — it names the failing rung and reason. Candidate next steps if needed: in-WebView full stream resolution + EJS decipher if WEB_REMIX sigCipher appears.
- **Datacenter IPs cannot validate YT playback** (bot-walled by design). Device (residential IP) is the acceptance environment for Gate G1 (tap-to-audio ≤ 2.5s).
- **Parked:** SEARCH-INTENT-RESCUE-PLAN P0→P3 (lower-priority intent expansions) — see `SEARCH-INTENT-RESCUE-PLAN.md`.
- **Split-screen is intentionally disabled** by the window policy (that's the wedge fix). If the product ever wants split-screen back, flip `resizeableActivity` to true and accept the Samsung half-window class of reports.

---

*Report generated from the lab repo at `cb710e7` (tag `v3.4.0-lab.4`). Releases: https://github.com/tsftraders3-ops/TSF-MUSIC-LAB/releases*
