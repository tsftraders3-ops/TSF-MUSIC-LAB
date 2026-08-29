#!/usr/bin/env python3
"""Package the lab screenshots for user review: full-res per device +
labeled side-by-side pairs + browsable HTML gallery."""
import glob
import os
from PIL import Image, ImageDraw, ImageFont

SRC = "/home/z/my-project/screenshots"
OUT = "/home/z/my-project/download/tsf-ui-screenshots"
os.makedirs(f"{OUT}/pixel7", exist_ok=True)
os.makedirs(f"{OUT}/iphone13", exist_ok=True)
os.makedirs(f"{OUT}/side-by-side", exist_ok=True)

font = ImageFont.truetype("/home/z/my-project/assets/fonts/Figtree-700.ttf", 34)

p7 = sorted(glob.glob(f"{SRC}/pixel7/*.png"))
ip13 = sorted(glob.glob(f"{SRC}/iphone13/*.png"))
names = [os.path.basename(p) for p in p7]

# copy full-res
import shutil

for p in p7:
    shutil.copy(p, f"{OUT}/pixel7/{os.path.basename(p)}")
for p in ip13:
    shutil.copy(p, f"{OUT}/iphone13/{os.path.basename(p)}")

# side-by-side pairs
pairs = 0
for name in names:
    a = f"{SRC}/pixel7/{name}"
    b = f"{SRC}/iphone13/{name}"
    if not (os.path.exists(a) and os.path.exists(b)):
        continue
    ia, ib = Image.open(a), Image.open(b)
    H = 1400

    def fitv(im):
        w = int(im.width * H / im.height)
        return im.resize((w, H), Image.LANCZOS)

    ia, ib = fitv(ia), fitv(ib)
    label_h = 70
    sheet = Image.new("RGB", (ia.width + ib.width + 60, H + label_h + 30), (18, 18, 20))
    d = ImageDraw.Draw(sheet)
    sheet.paste(ia, (20, 20))
    sheet.paste(ib, (ia.width + 40, 20))
    d.text((20, H + 28), f"Pixel 7 | iPhone 13 — {name.removesuffix('.png')}", font=font, fill=(46, 219, 102))
    sheet.save(f"{OUT}/side-by-side/{name}")
    pairs += 1

# HTML gallery
rows = "\n".join(
    f'<div class="pair"><h2>{n.removesuffix(".png")}</h2>'
    f'<div class="imgs"><img loading="lazy" src="side-by-side/{n}"></div></div>'
    for n in names
    if os.path.exists(f"{OUT}/side-by-side/{n}")
)
html = f"""<!doctype html><html><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>TSF Music v3.2.0 — UI Gallery</title>
<style>
body{{margin:0;background:#0d0d0f;color:#eee;font-family:system-ui,sans-serif}}
h1{{padding:24px 32px 4px}} .sub{{color:#888;padding:0 32px 18px}}
.pair{{padding:14px 32px}} h2{{font-size:15px;color:#1ed760;margin:18px 0 8px}}
img{{max-width:100%;border-radius:10px}} .imgs{{display:flex;gap:12px;overflow-x:auto}}
nav{{position:sticky;top:0;background:#0d0d0fd9;backdrop-filter:blur(6px);padding:10px 32px;display:flex;flex-wrap:wrap;gap:8px;z-index:5}}
nav a{{color:#aaa;text-decoration:none;font-size:12px;background:#1b1b1e;border-radius:99px;padding:4px 10px}}
</style></head><body>
<h1>TSF Music v3.2.0 — UI Gallery</h1>
<div class="sub">Real captures from the device lab (Pixel 7 &amp; iPhone 13). v3.2.0: real artist photos in onboarding, home that scrolls deep, Top-result search, new icon, onboarding that never re-asks.</div>
<nav>{''.join(f'<a href="#{n.removesuffix(".png")}">{n.removesuffix(".png")}</a>' for n in names if os.path.exists(f"{OUT}/side-by-side/{n}"))}</nav>
{rows.replace('<h2>', '<h2 id="')}
</body></html>"""
open(f"{OUT}/UI-Gallery.html", "w").write(html)
print(f"packaged: {len(names)} screens/device, {pairs} pairs, gallery html")
