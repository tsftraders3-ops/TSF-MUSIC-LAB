# GAUNTLET BARS — SIG Search Fix + YouTube Source
### Locked autonomously, verified in CI-grade runs (bun test), evidence-captured

**Baseline:** v3.3.0 (commit 18e23aa) · **Lab:** this repo · **Suite:** 159 tests (126 inherited + 33 new), all green · `bun run typecheck` clean

---

## The bars (each named, measurable, test-locked)

| Bar | Statement | Lock |
|---|---|---|
| **SI1** | "tu chaiye of atif aslam" (the real user failure) ends S-RESCUED with a verified "Tu Chahiye" top row — YouTube full-length when streamable, iTunes 30s otherwise | `tests/ai/search_sig_e2e.test.ts` |
| **SI2** | In the captured junk pool, the title-matching row outranks O'Meri Laila and Kon Mayate; no artist-only row carries "Best match for your search" | `tests/ai/search_rescue.test.ts` |
| **SI3** | "atif aslam" boundary-matches "Atif Aslam" and "Muhammad Atif Aslam", NEVER "Atif Aslam BD" (prefix-only rule) | `search_rescue.test.ts` |
| **SI4** | queryMatch counts title tokens only — O'Meri Laila scores 0 for the user's query | `search_rescue.test.ts` |
| **SI5** | Probes are connector-free ("tu chaiye", not "tu chaiye of") and unique (no wasted duplicate slot) | `search_rescue.test.ts` |
| **SI6** | "tu chaiye" expands to "tu chahiye" (≤2, deterministic, symmetric); known titles expand to nothing | `search_rescue.test.ts` |
| **SIG** | sigUnmet() contract: junk pool = unmet; pool with both-axes row = met; verifyRescueRow accepts only dual-verified rows | `search_rescue.test.ts` |
| **YT-A** | YT Music search parses the LIVE response shape (musicShelf AND itemSection/musicCardShelf variants); songs before videos; dups dropped; duration/artist/artwork mapped | `tests/ai/youtube.test.ts` |
| **YT-B** | Client ladder picks audio-only (prefers AAC itag 140 over higher-bitrate opus), skips bot-walled clients, caches URLs (repeat = zero player calls), refresh invalidates | `youtube.test.ts` |
| **YT-C** | Kill switch: 3 consecutive stream failures soft-disable YouTube for 1h, auto-retry, success clears the streak — YouTube breakage can never degrade the core | `youtube.test.ts` |
| **CORE** | All 126 inherited v3.3.0 tests stay green — zero core regression | full suite |

## Live verification (this sandbox, real networks)

- Organic pool for the user's query: probes `["tu chaiye","tu chaiye atif aslam","tu chahiye","tu chaahiye"]`, 38 rows, title-matching rows on top, no wrong-artist promotion.
- sigUnmet detected → rescue ladder: youtube (bot-walled from THIS datacenter IP — expected, see guide) → **iTunes rescued in ~0.8–1.0 s** → final #1 = "Tu Chahiye | Pritam & Atif Aslam".
- Live YT Music search: 8 tracks + 2 albums parsed from the current (morphed) response shape.
- Honest degradation verified end-to-end with real APIs.

## Bar for the device session (Gate G1 — cannot be proven here)

From a real phone on residential/mobile data:
1. ≥1 client in `src/api/youtube.ts` returns `streamingData` with a fetchable audio URL (`ytResolveStream` → ok:true).
2. The rescued top result for "tu chaiye of atif aslam" arrives with `rescueRung: 'youtube'` (full length, ad-free).
If G1 fails, the app must still behave exactly as this sandbox does: iTunes rescue + honest labels, YouTube soft-disabled.
