#!/usr/bin/env python3
"""Probe: simulate the planned onboarding artist pipeline against real JioSaavn.

Song-search per category -> artistMap.primary_artists[0] -> (name, id, image).
Validates image realism (rejects /_i/ defaults + empty) and prints a TS fixture
block for src/webmocks/fixtures.ts.
"""
import json
import urllib.parse
import urllib.request

UA = {"User-Agent": "Mozilla/5.0 (Linux; Android 13; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Mobile Safari/537.36"}
CATEGORIES = [
    ("Bollywood", "top hindi hits"),
    ("Punjabi", "punjabi hits"),
    ("Indie", "indie india songs"),
    ("Hip-Hop", "hindi rap gana"),
    ("Retro", "old hindi songs"),
    ("Romance", "romantic hindi songs"),
    ("Sufi", "sufi songs"),
    ("Pop", "indian pop hits"),
]

def saavn(params):
    qs = urllib.parse.urlencode({"_format": "json", "_marker": "0", "api_version": "4", "ctx": "web6dot0", **params})
    req = urllib.request.Request(f"https://www.jiosaavn.com/api.php?{qs}", headers=UA)
    with urllib.request.urlopen(req, timeout=15) as r:
        return json.loads(r.read().decode("utf-8", "replace"))

def usable_image(url: str) -> str:
    """Real artist photo only; upgrade to 500x500."""
    if not url:
        return ""
    if "/_i/" in url or "artist-default" in url or "share-image" in url:
        return ""
    if "/artists/" not in url:
        return ""  # album art masquerading as artist image
    return url.replace("150x150", "500x500").replace("50x50", "500x500")

pool = []
seen = set()
for label, q in CATEGORIES:
    try:
        d = saavn({"__call": "search.getResults", "q": q, "p": 1, "n": 40})
    except Exception as e:
        print(f"!! {label}: {e}")
        continue
    got = 0
    for s in d.get("results", []):
        am = (s.get("more_info") or {}).get("artistMap") or {}
        pa = (am.get("primary_artists") or [None])[0]
        if not pa:
            continue
        name = pa.get("name", "").strip()
        key = name.lower()
        img = usable_image(pa.get("image", ""))
        if not name or key in seen or len(name) > 26 or "," in name:
            continue  # skip long collab names
        seen.add(key)
        pool.append({"name": name, "id": pa.get("id", ""), "image": img, "cat": label})
        got += 1
        if got >= 10:
            break
    print(f"{label:10s} -> {got} artists")

with_img = [a for a in pool if a["image"]]
print(f"\nTOTAL unique: {len(pool)}, with real photo: {len(with_img)}")
print("\n---- TS FIXTURE ----")
for a in pool[:40]:
    print(f"  {{ name: '{a['name']}', id: '{a['id']}', image: '{a['image']}' }},")
