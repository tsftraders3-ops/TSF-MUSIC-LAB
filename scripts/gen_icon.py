#!/usr/bin/env python3
"""TSF Music icon suite generator — v3.2 professional icon.

Concept: black canvas + vibrant green disc (radial gradient) + the app's
3-bar soundwave mark in near-black — brand-consistent with the in-app
logo (white disc + dark bars) and the Premium tab mark. Rendered at 4x
and downsampled for crisp anti-aliasing.

Variants are rendered to scripts/icon_variants/ for the VLM gauntlet;
the winner is installed to assets/.
"""
from PIL import Image, ImageDraw, ImageFilter, ImageFont
import os

SS = 4  # supersample factor
SIZE = 1024
OUT = "/home/z/my-project/scripts/icon_variants"
os.makedirs(OUT, exist_ok=True)

GREEN_CORE = (37, 224, 102)     # #25e066
GREEN_EDGE = (18, 156, 70)      # #129c46
BLACK = (10, 10, 11)            # #0A0A0B
BARS = (8, 9, 10)


def radial_disc(size: int, core, edge) -> Image.Image:
    """Radial-gradient disc via concentric alpha-blended rings."""
    img = Image.new("RGB", (size, size), edge)
    px = img.load()
    cx = cy = (size - 1) / 2
    rmax = size / 2
    for y in range(size):
        for x in range(size):
            d = ((x - cx) ** 2 + (y - cy) ** 2) ** 0.5 / rmax
            t = min(1.0, d)
            # ease: keep core color longer, darken toward edge
            tt = t ** 1.7
            px[x, y] = (
                int(core[0] + (edge[0] - core[0]) * tt),
                int(core[1] + (edge[1] - core[1]) * tt),
                int(core[2] + (edge[2] - core[2]) * tt),
            )
    return img


def rounded_bar(draw: ImageDraw.ImageDraw, cx, cy, w, h, color):
    r = h / 2
    draw.rounded_rectangle([cx - w / 2, cy - h / 2, cx + w / 2, cy + h / 2], radius=r, fill=color)


def make_mark(disc_px: int, disc_scale: float, bars_color, canvas_color, glow: bool, hi: bool) -> Image.Image:
    """Full icon canvas with centered disc + 3-bar wave."""
    S = disc_px
    img = Image.new("RGB", (S, S), canvas_color)
    d = disc_scale * S  # disc diameter
    disc = radial_disc(int(d), GREEN_CORE, GREEN_EDGE)

    # soft glow behind the disc
    if glow:
        halo = Image.new("L", (S, S), 0)
        hd = ImageDraw.Draw(halo)
        hd.ellipse([S / 2 - d / 2 * 1.22, S / 2 - d / 2 * 1.22, S / 2 + d / 2 * 1.22, S / 2 + d / 2 * 1.22], fill=70)
        halo = halo.filter(ImageFilter.GaussianBlur(S * 0.045))
        green_layer = Image.new("RGB", (S, S), (24, 190, 86))
        img.paste(green_layer, (0, 0), halo)

    # paste disc through a circular mask
    mask = Image.new("L", (int(d), int(d)), 0)
    ImageDraw.Draw(mask).ellipse([0, 0, int(d) - 1, int(d) - 1], fill=255)
    img.paste(disc, (int(S / 2 - d / 2), int(S / 2 - d / 2)), mask)

    # top-left specular hint (subtle crescent)
    if hi:
        hi_img = Image.new("L", (S, S), 0)
        hid = ImageDraw.Draw(hi_img)
        hid.ellipse([S / 2 - d / 2 * 0.86, S / 2 - d / 2 * 0.92, S / 2 + d / 2 * 0.5, S / 2 + d / 2 * 0.25], fill=26)
        hi_img = hi_img.filter(ImageFilter.GaussianBlur(S * 0.03))
        img = Image.composite(Image.blend(img, Image.new("RGB", (S, S), (255, 255, 255)), 0.5), img, hi_img)

    # 3-bar wave (widths 52/38/26% of disc, height 11.5%, gap 9.5%)
    dd = ImageDraw.Draw(img)
    widths = [0.52, 0.38, 0.26]
    bh = d * 0.115
    gap = d * 0.095
    total_h = 3 * bh + 2 * gap
    y0 = S / 2 - total_h / 2 + bh / 2
    for i, wv in enumerate(widths):
        cy = y0 + i * (bh + gap)
        rounded_bar(dd, S / 2, cy, wv * d, bh, bars_color)
    return img


def down(img: Image.Image, size: int) -> Image.Image:
    return img.resize((size, size), Image.LANCZOS)


# ── Variants for the gauntlet ────────────────────────────────────────────
v1 = make_mark(SIZE * SS, 0.68, BARS, BLACK, glow=True, hi=True)     # classic disc+wave
v2 = make_mark(SIZE * SS, 0.82, BLACK, GREEN_CORE, glow=False, hi=True)  # full-green tile, dark bars (Spotify-ish silhouette inverse)
v3 = make_mark(SIZE * SS, 0.58, BARS, (14, 14, 16), glow=True, hi=False)  # compact disc, quiet

for name, v in [("v1", v1), ("v2", v2), ("v3", v3)]:
    down(v, 1024).save(f"{OUT}/{name}-1024.png")
    down(v, 192).save(f"{OUT}/{name}-192.png")
    down(v, 48).save(f"{OUT}/{name}-48.png")

# ── Splash: mark + wordmark on dark ─────────────────────────────────────
splash = Image.new("RGB", (1284, 1284), BLACK)
mark = down(make_mark(1000, 0.52, BARS, BLACK, glow=True, hi=True), 520)
splash.paste(mark, ((1284 - 520) // 2, (1284 - 520) // 2 - 90), None)
try:
    font = ImageFont.truetype("/home/z/my-project/assets/fonts/Figtree-800.ttf", 84)
    d = ImageDraw.Draw(splash)
    text = "TSF Music"
    bbox = d.textbbox((0, 0), text, font=font)
    tw = bbox[2] - bbox[0]
    d.text(((1284 - tw) / 2, (1284 - 520) // 2 + 520 - 40), text, font=font, fill=(255, 255, 255))
except Exception as e:
    print("font fail", e)
splash.save(f"{OUT}/splash-1284.png")

print("variants written to", OUT)
