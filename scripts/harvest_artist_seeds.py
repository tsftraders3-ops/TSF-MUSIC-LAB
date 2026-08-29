#!/usr/bin/env python3
"""Harvest verified JioSaavn artist photos for the built-in ARTIST_SEEDS table.

For each curated A-lister: artist search -> best name match -> artist page
details -> real photo (500x500). Emits the TS literal for src/api/artists.ts.
"""
import json
import time
import urllib.parse
import urllib.request

UA = {"User-Agent": "Mozilla/5.0 (Linux; Android 13; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Mobile Safari/537.36"}

CURATED = [
    "Arijit Singh", "Shreya Ghoshal", "Pritam", "A.R. Rahman", "Sonu Nigam",
    "Diljit Dosanjh", "AP Dhillon", "Badshah", "Karan Aujla", "Guru Randhawa",
    "Yo Yo Honey Singh", "Shubh", "DIVINE", "Raftaar", "KK",
    "Mohit Chauhan", "Neha Kakkar", "Jubin Nautiyal", "Armaan Malik", "Darshan Raval",
    "Amit Trivedi", "Shankar Mahadevan", "Udit Narayan", "Kishore Kumar", "Lata Mangeshkar",
    "Asha Bhosle", "Rahat Fateh Ali Khan", "Nusrat Fateh Ali Khan", "Tanishk Bagchi", "Mithoon",
    "Anuv Jain", "Prateek Kuhad", "Ritviz", "Jasleen Royal", "B Praak",
    "Sachet-Parampara", "Vishal-Shekhar", "Sidhu Moose Wala", "Shubh Mukherjee", "Pawan Singh",
    "Alka Yagnik", "Kumar Sanu", "Hariharan", "Shankar-Ehsaan-Loy", "Anu Malik",
    "Amaal Mallik", "Neeti Mohan", "Sunidhi Chauhan", "Shreyas Puranik", "Ravi Basrur",
]

def saavn(params):
    qs = urllib.parse.urlencode({"_format": "json", "_marker": "0", "api_version": "4", "ctx": "web6dot0", **params})
    req = urllib.request.Request(f"https://www.jiosaavn.com/api.php?{qs}", headers=UA)
    return json.loads(urllib.request.urlopen(req, timeout=15).read().decode("utf-8", "replace"))

def usable(url):
    if not url or "/_i/" in url or "artist-default" in url or "share-image" in url:
        return ""
    return url.replace("150x150", "500x500").replace("50x50", "500x500")

def norm(s):
    return "".join(c.lower() for c in s if c.isalnum())

out = []
for name in CURATED:
    got = None
    try:
        d = saavn({"__call": "search.getArtistResults", "q": name, "p": 1, "n": 5})
        cands = d.get("results") or []
        best = None
        for c in cands:
            cn = c.get("name", "")
            if norm(cn) == norm(name) or norm(name).startswith(norm(cn)) or norm(cn).startswith(norm(name)):
                if "," not in cn and len(cn) <= len(name) + 3:
                    best = c
                    break
        if best:
            p = saavn({"__call": "artist.getArtistPageDetails", "artistId": best["id"], "n_song": 1})
            img = usable(p.get("image", ""))
            got = (p.get("name") or best.get("name", name), best["id"], img)
    except Exception as e:
        print(f"!! {name}: {e}")
    if got:
        out.append(got)
        print(f"OK  {got[0]:28s} {'PHOTO' if got[2] else 'noimg'}")
    else:
        print(f"MISS {name}")
    time.sleep(0.25)

print("\n---- TS LITERAL (photo holders only, with URLs) ----")
for n, i, img in out:
    if img:
        print(f"  {{ name: {json.dumps(n)}, id: {json.dumps(i)}, image: {json.dumps(img)} }},")
print(f"\n// {sum(1 for o in out if o[2])}/{len(out)} with verified photos")
