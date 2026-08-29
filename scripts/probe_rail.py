#!/usr/bin/env python3
"""Focused probe: why does the typeahead rail not render?"""
import os
import time
from playwright.sync_api import sync_playwright

URL = os.environ.get("TSF_URL", "http://localhost:8123")

with sync_playwright() as pw:
    b = pw.chromium.launch()
    page = b.new_page(viewport={"width": 412, "height": 915}, device_scale_factor=2.625, is_mobile=True, has_touch=True)
    errors = []
    page.on("console", lambda m: errors.append(m.text) if m.type == "error" else None)
    page.goto(URL, wait_until="domcontentloaded")
    page.wait_for_timeout(15000)  # bundle
    # dismiss whatsnew + onboarding quickly
    for tid in ["whatsnew-got-it", "whatsnew-close", "onb-skip"]:
        try:
            page.locator(f'[data-testid="{tid}"]').first.click(timeout=1500)
            page.wait_for_timeout(400)
        except Exception:
            pass
    try:
        page.locator('[data-testid="tab-search"]').first.click(timeout=4000)
    except Exception:
        page.get_by_text("Search").first.click(timeout=4000)
    page.wait_for_timeout(800)
    field = page.get_by_placeholder("What do you want to listen to?")
    field.fill("tum")
    for wait in (300, 600, 1000):
        page.wait_for_timeout(wait if wait == 300 else wait - (300 if wait == 600 else 600))
        rows = page.locator('[data-testid="search-suggest-row"]').count()
        rail = page.locator('[data-testid="search-suggest-rail"]').count()
        tops = page.locator('[data-testid="search-suggest-topquery"]').count()
        html_has = "Best guess" in page.content()
        print(f"t+{wait}ms rows={rows} rail={rail} topq={tops} bestGuessText={html_has}")
    page.screenshot(path="/tmp/probe_rail.png")
    print("console errors:", errors[:5])
    b.close()
