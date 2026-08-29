#!/usr/bin/env python3
"""Compose the icon gauntlet sheet: real references (bar) vs our candidates."""
from PIL import Image, ImageDraw, ImageFont
import glob

W = 1400
CELL = 300
PAD = 30
LABEL_H = 60

font = ImageFont.truetype("/home/z/my-project/assets/fonts/Figtree-700.ttf", 30)

refs = sorted(glob.glob("/home/z/my-project/gauntlet/iconrefs/*.jpg"))[:4]
cands = [
    ("/home/z/my-project/scripts/icon_variants/v1-192.png", "A"),
    ("/home/z/my-project/scripts/icon_variants/v2-192.png", "B"),
    ("/home/z/my-project/scripts/icon_variants/v3-192.png", "C"),
]

def fit(img, size):
    img = img.convert("RGB")
    img.thumbnail((size, size), Image.LANCZOS)
    return img

rows = 2
cols = max(len(refs), len(cands))
sheet = Image.new("RGB", (PAD + cols * (CELL + PAD), PAD * 2 + rows * (CELL + LABEL_H + PAD)), (24, 24, 26))
d = ImageDraw.Draw(sheet)

# Row 1 — the bar (real icons, labeled "REFERENCE")
for i, r in enumerate(refs):
    img = fit(Image.open(r), CELL)
    x = PAD + i * (CELL + PAD) + (CELL - img.width) // 2
    y = PAD + (CELL - img.height) // 2
    sheet.paste(img, (x, y))
    d.text((PAD + i * (CELL + PAD), PAD + CELL + 8), f"REFERENCE {i+1}", font=font, fill=(255, 255, 255))

# Row 2 — candidates A/B/C at launcher size (192) upscaled for viewing
y2 = PAD * 2 + CELL + LABEL_H
for i, (path, label) in enumerate(cands):
    img = fit(Image.open(path), CELL - 40)
    x = PAD + i * (CELL + PAD) + (CELL - img.width) // 2
    yy = y2 + (CELL - img.height) // 2
    sheet.paste(img, (x, yy))
    d.text((PAD + i * (CELL + PAD), y2 + CELL + 8), label, font=font, fill=(46, 219, 102))

out = "/home/z/my-project/gauntlet/icon-gauntlet-r1.png"
sheet.save(out)
print("sheet:", out, sheet.size)
