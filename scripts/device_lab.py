#!/usr/bin/env python3
"""TSF Music device lab (v3.2) — Playwright walkthrough on Expo web with
react-native-web, emulating real hardware viewports (no browser chrome).

Devices: Pixel 7 (412x915 @2.625) and iPhone 13 (390x844 @3).

The critical v3.2 regression test lives here: complete onboarding →
RELOAD → assert onboarding never reappears and Home greets by name
(the user-reported re-ask bug).
"""
import json
import os
import sys
import time

from playwright.sync_api import sync_playwright, expect

URL = os.environ.get("TSF_URL", "http://localhost:8123")
SHOT_DIR = os.environ.get("TSF_SHOTS", "/home/z/my-project/screenshots")
DEVICES = [
    ("pixel7", {"viewport": {"width": 412, "height": 915}, "device_scale_factor": 2.625, "is_mobile": True, "has_touch": True, "user_agent": "Mozilla/5.0 (Linux; Android 13; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Mobile Safari/537.36"}),
    ("iphone13", {"viewport": {"width": 390, "height": 844}, "device_scale_factor": 3, "is_mobile": True, "has_touch": True, "user_agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1"}),
]

results = []
console_errors = []


def log(device, step, ok, note=""):
    results.append({"device": device, "step": step, "ok": bool(ok), "note": note})
    print(f"[{'OK ' if ok else 'FAIL'}] {device:9s} {step} {note}")


def shot(page, device, name):
    path = os.path.join(SHOT_DIR, device, f"{name}.png")
    os.makedirs(os.path.dirname(path), exist_ok=True)
    page.wait_for_timeout(450)
    page.screenshot(path=path, full_page=False)
    return path


def scroll(page, dy, times=1):
    for _ in range(times):
        page.mouse.wheel(0, dy)
        page.wait_for_timeout(260)


def tab(page, name):
    """Robust bottom-tab click: testID first, then role/text fallback."""
    sel = f'[data-testid="tab-{name}"]'
    if page.locator(sel).count() > 0:
        page.click(sel)
        return
    # react-native-web tab bar: match by accessible label text
    label = "Your Library" if name == "library" else name.capitalize()
    page.get_by_text(label, exact=True).last.click()


def run_device(pw, name, cfg):
    browser = pw.chromium.launch(args=["--force-device-scale-factor=1"])
    ctx = browser.new_context(**cfg)
    page = ctx.new_page()
    page.on("console", lambda m: console_errors.append(f"{name}: {m.text}") if m.type == "error" else None)
    page.on("pageerror", lambda e: console_errors.append(f"{name}: pageerror {e}"))

    try:
        # 01 — fresh install: What's new dialog
        page.goto(URL, wait_until="domcontentloaded", timeout=120000)
        page.wait_for_selector('[data-testid="whatsnew-continue"]', timeout=90000)
        shot(page, name, "01-whatsnew")
        page.click('[data-testid="whatsnew-continue"]')
        log(name, "whatsnew-dismiss", True)

        # 02 — onboarding step 1: name
        page.wait_for_selector('[data-testid="onb-name-input"]', timeout=60000)
        shot(page, name, "02-onb-name")
        page.fill('[data-testid="onb-name-input"]', "Rahul")
        page.click('[data-testid="onb-continue"]')

        # 03 — onboarding step 2: REAL artist photos
        page.wait_for_selector('[data-testid="onb-artist"]', timeout=60000)
        page.wait_for_timeout(1800)  # let photos paint
        artists = page.locator('[data-testid="onb-artist"]')
        count = artists.count()
        shot(page, name, "03-onb-artists")
        log(name, "onb-artists-pool", count >= 15, f"{count} tiles")

        # pick 3 artists spread across the grid
        for i in (0, 4, 8):
            artists.nth(i).click()
            page.wait_for_timeout(220)
        shot(page, name, "03b-onb-picked")
        log(name, "onb-pick-artists", True, "3 picked")

        # 03c — More tile expands the pool
        before = artists.count()
        page.locator('[data-testid="onb-more"]').scroll_into_view_if_needed()
        page.click('[data-testid="onb-more"]')
        page.wait_for_timeout(1200)
        after = artists.count()
        shot(page, name, "03c-onb-more")
        log(name, "onb-more-expands", after > before, f"{before} -> {after}")

        # 03d — artist search returns photo tiles
        page.fill('[data-testid="onb-search"]', "arijit")
        page.press('[data-testid="onb-search"]', "Enter")
        page.wait_for_timeout(1500)
        hits = page.locator('[data-testid="onb-artist"]').count()
        shot(page, name, "03d-onb-search")
        log(name, "onb-search", hits >= 1, f"{hits} hits")
        page.fill('[data-testid="onb-search"]', "")
        page.wait_for_timeout(400)

        page.click('[data-testid="onb-continue"]')

        # 04 — onboarding step 3: genres
        page.wait_for_selector('[data-testid="onb-genre"]', timeout=30000)
        shot(page, name, "04-onb-genres")
        page.locator('[data-testid="onb-genre"]').nth(0).click()
        page.locator('[data-testid="onb-genre"]').nth(2).click()
        page.wait_for_timeout(250)
        shot(page, name, "04b-onb-genres-picked")
        page.click('[data-testid="onb-continue"]')
        page.wait_for_timeout(1200)
        log(name, "onb-finish", True)

        # 05 — ★ PERSISTENCE REGRESSION: reload must NOT re-ask
        page.reload(wait_until="domcontentloaded")
        page.wait_for_timeout(6000)
        reask = page.locator('[data-testid="onb-name-input"]').count()
        log(name, "PERSISTENCE-no-reask", reask == 0, f"onb visible={reask}")
        # greeting appears when the mixes shelf builds (seed-driven) — wait for it
        greeting = 0
        for _ in range(10):
            greeting = page.get_by_text("Made for Rahul", exact=False).count()
            if greeting >= 1:
                break
            page.wait_for_timeout(1500)
        shot(page, name, "05-after-reload")
        log(name, "PERSISTENCE-greeting", greeting >= 1, f"'Made for Rahul' x{greeting}")

        # 06 — home loaded + deep scroll proof
        page.wait_for_timeout(2500)
        shot(page, name, "06-home")
        scroll(page, 1400, 2)
        shot(page, name, "07-home-scrolled1")
        scroll(page, 1600, 2)
        shot(page, name, "08-home-scrolled2")
        scroll(page, 1800, 3)
        page.wait_for_timeout(1200)
        shot(page, name, "09-home-scrolled3")
        artists_rail = page.locator('[data-testid="home-artist"]').count()
        log(name, "home-artist-rail", artists_rail >= 6, f"{artists_rail} artist cards")
        shelves = page.get_by_text("New releases", exact=False).count() + page.get_by_text("Featured playlists", exact=False).count()
        log(name, "home-deep-shelves", shelves >= 1, f"editorial shelves x{shelves}")
        # back to top
        page.evaluate("window.scrollTo(0,0)")
        page.wait_for_timeout(600)

        # 07 — search: browse grid + top result
        tab(page, "search")
        page.wait_for_timeout(900)
        shot(page, name, "10-search-browse")
        page.get_by_placeholder("What do you want to listen to?").fill("mashooqa")
        page.wait_for_timeout(2200)
        shot(page, name, "11-search-results")
        top = page.locator('[data-testid="search-top-result"]').count()
        log(name, "search-top-result", top >= 1)

        # 08 — play from the Top result card → mini player → full player
        if page.locator('[data-testid="search-top-result"]').count() > 0:
            page.locator('[data-testid="search-top-result"]').first.click()
            page.wait_for_timeout(1500)
            shot(page, name, "12-miniplayer")
            try:
                page.locator('[data-testid="mini-player"]').click(force=True, timeout=8000)
            except Exception:
                page.locator('[data-testid="mini-player"]').focus()
                page.keyboard.press("Enter")
            page.wait_for_selector('[data-testid="player-queue-btn"]', timeout=20000)
            page.evaluate("window.__TsfMock && window.__TsfMock.seek(95)")
            page.evaluate("window.__TsfMock && window.__TsfMock.force('playing')")
            page.wait_for_timeout(900)
            shot(page, name, "13-player-playing")
            log(name, "player-open", True)
            page.click('[data-testid="player-dismiss"]')
            page.wait_for_timeout(700)
        else:
            log(name, "player-open", False, "no top-result card")

        # 09 — library + premium tabs render
        tab(page, "library")
        page.wait_for_timeout(900)
        shot(page, name, "14-library")
        log(name, "library", True)
        tab(page, "premium")
        page.wait_for_timeout(900)
        shot(page, name, "15-premium")
        log(name, "premium", True)

    except Exception as e:
        try:
            shot(page, name, "99-failure")
        except Exception:
            pass
        log(name, "EXCEPTION", False, str(e)[:300])
    finally:
        ctx.close()
        browser.close()


def main():
    os.makedirs(SHOT_DIR, exist_ok=True)
    with sync_playwright() as pw:
        for name, cfg in DEVICES:
            run_device(pw, name, cfg)
    report = {
        "total": len(results),
        "passed": sum(1 for r in results if r["ok"]),
        "console_errors": console_errors,
        "steps": results,
    }
    with open(os.path.join(SHOT_DIR, "report.json"), "w") as f:
        json.dump(report, f, indent=2)
    print(json.dumps({k: report[k] for k in ("total", "passed", "console_errors")}, indent=2))
    sys.exit(0 if report["passed"] == report["total"] and not console_errors else 1)


if __name__ == "__main__":
    main()
