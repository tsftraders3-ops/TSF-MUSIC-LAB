#!/usr/bin/env python3
"""TSF Music icon — ROUND 2 (critic-driven: 'C direction, but crisp').

Fixes from R1: smaller disc w/ breathing room, razor-sharp disc edge
(glow pasted BEHIND, never over), tight low-alpha halo, subtle inner
edge ring for depth, corner vignette, pure-dark bars for contrast.
"""
from PIL import Image, ImageDraw, ImageFilter
import os

SS = 4
SIZE = 1024
OUT = "/home/z/my-project/scripts/icon_variants"
os.makedirs(OUT, exist_ok=True)

GREEN_CORE = (41, 230, 108)
GREEN_MID = (30, 200, 90)
GREEN_EDGE = (16, 140, 62)
BLACK = (10, 10, 11)
BARS = (6, 7, 8)


def disc_gradient(size, core, mid, edge):
    img = Image.new("RGB", (size, size))
    px = img.load()
    cx = cy = (size - 1) / 2
    rmax = size / 2
    for y in range(size):
        for x in range(size):
            d = ((x - cx) ** 2 + (y - cy) ** 2) ** 0.5 / rmax
            if d <= 0.62:
                t = d / 0.62
                c = (core[0] + (mid[0] - core[0]) * t, core[1] + (mid[1] - core[1]) * t, core[2] + (mid[2] - core[2]) * t)
            else:
                t = (d - 0.62) / 0.38
                c = (mid[0] + (edge[0] - mid[0]) * t, mid[1] + (edge[1] - mid[1]) * t, mid[2] + (edge[2] - mid[2]) * t)
            px[x, y] = tuple(int(v) for v in c)
    return img


def vignette(img, strength=34):
    S = img.size[0]
    mask = Image.new("L", (S, S), 0)
    d = ImageDraw.Draw(mask)
    d.ellipse([-S * 0.32, -S * 0.32, S * 1.32, S * 1.32], fill=255)
    mask = mask.filter(ImageFilter.GaussianBlur(S * 0.10))
    dark = Image.new("RGB", (S, S), (0, 0, 0))
    # blend dark where mask < 255 (corners)
    inv = mask.point(lambda v: 255 - v)
    strength_map = inv.point(lambda v: v * strength // 255)
    return Image.composite(Image.blend(img, dark, 0.9), img, strength_map.point(lambda v: 255 - v)) if False else Image.composite(dark, img, inv.point(lambda v: (v * (100 - 0)) // 100 * strength // 100 or 0))


def make_icon(disc_scale, halo_alpha, ring, bar_color, core, mid, edge, canvas=BLACK, glow_radius_scale=0.030, vign=True):
    S = SIZE * SS
    img = Image.new("RGB", (S, S), canvas)
    d = disc_scale * S

    # halo BEHIND the disc (tight, subtle)
    halo = Image.new("L", (S, S), 0)
    hd = ImageDraw.Draw(halo)
    h = d * 1.10
    hd.ellipse([S / 2 - h / 2, S / 2 - h / 2, S / 2 + h / 2, S / 2 + h / 2], fill=halo_alpha)
    halo = halo.filter(ImageFilter.GaussianBlur(S * glow_radius_scale))
    img.paste(Image.new("RGB", (S, S), (28, 200, 92)), (0, 0), halo)

    # crisp disc
    disc = disc_gradient(int(d), core, mid, edge)
    mask = Image.new("L", (int(d), int(d)), 0)
    ImageDraw.Draw(mask).ellipse([0, 0, int(d) - 1, int(d) - 1], fill=255)
    img.paste(disc, (int(S / 2 - d / 2), int(S / 2 - d / 2)), mask)

    # thin inner edge ring (depth) — crisp 1.2% stroke just inside the rim
    if ring:
        rd = ImageDraw.Draw(img, "RGBA")
        lw = max(2, int(d * 0.014))
        rd.ellipse(
            [S / 2 - d / 2 + lw * 1.6, S / 2 - d / 2 + lw * 1.6, S / 2 + d / 2 - lw * 1.6, S / 2 + d / 2 - lw * 1.6],
            outline=(0, 0, 0, 46), width=lw,
        )

    # specular crescent — clipped INSIDE the disc, subtle (no blur bleed)
    spec = Image.new("L", (S, S), 0)
    sd = ImageDraw.Draw(spec)
    sd.ellipse([S / 2 - d * 0.40, S / 2 - d * 0.44, S / 2 + d * 0.22, S / 2 + d * 0.08], fill=20)
    spec = spec.filter(ImageFilter.GaussianBlur(S * 0.016))
    # clip to disc
    clip = Image.new("L", (S, S), 0)
    ImageDraw.Draw(clip).ellipse([S / 2 - d / 2, S / 2 - d / 2, S / 2 + d / 2, S / 2 + d / 2], fill=255)
    spec = Image.composite(spec, Image.new("L", (S, S), 0), clip)
    white = Image.new("RGB", (S, S), (255, 255, 255))
    img = Image.composite(Image.blend(img, white, 0.5), img, spec)

    if vign:
        corner = Image.new("L", (S, S), 0)
        cd = ImageDraw.Draw(corner)
        cd.ellipse([-S * 0.28, -S * 0.28, S * 1.28, S * 1.28], fill=255)
        corner = corner.filter(ImageFilter.GaussianBlur(S * 0.09))
        inv = corner.point(lambda v: 255 - v)  # strong at corners
        att = inv.point(lambda v: v * 13 // 100)
        img = Image.composite(Image.blend(img, Image.new("RGB", (S, S), (0, 0, 0)), 0.55), img, att)

    # 3-bar wave
    dd = ImageDraw.Draw(img)
    widths = [0.52, 0.38, 0.26]
    bh = d * 0.115
    gap = d * 0.098
    total = 3 * bh + 2 * gap
    y0 = S / 2 - total / 2 + bh / 2
    for i, wv in enumerate(widths):
        cy = y0 + i * (bh + gap)
        dd.rounded_rectangle(
            [S / 2 - wv * d / 2, cy - bh / 2, S / 2 + wv * d / 2, cy + bh / 2],
            radius=bh / 2, fill=bar_color,
        )
    return img


def down(img, size):
    return img.resize((size, size), Image.LANCZOS)


# v4 — refined C: 0.56 disc, tight halo, ring, vignette
v4 = make_icon(0.56, 60, True, BARS, GREEN_CORE, GREEN_MID, GREEN_EDGE)
# v5 — v4 + slightly larger disc 0.60, stronger depth
v5 = make_icon(0.60, 74, True, BARS, GREEN_CORE, GREEN_MID, GREEN_EDGE)
# v6 — v4 with brighter core (more Spotify-like punch) no ring
v6 = make_icon(0.58, 66, False, BARS, (64, 240, 124), (35, 208, 96), GREEN_EDGE)

for name, v in [("v4", v4), ("v5", v5), ("v6", v6)]:
    down(v, 1024).save(f"{OUT}/{name}-1024.png")
    down(v, 192).save(f"{OUT}/{name}-192.png")
    down(v, 48).save(f"{OUT}/{name}-48.png")

print("R2 variants done")
