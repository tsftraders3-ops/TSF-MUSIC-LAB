#!/usr/bin/env python3
"""
TSF Music icon suite — premium equalizer-bars mark on deep black.
Generates: icon.png (1024), adaptive-icon.png (safe-zone foreground),
splash.png, favicon.png. Green→cyan gradient bars = music + AI identity.
"""

from PIL import Image, ImageDraw, ImageFilter

GREEN = (29, 185, 84)
CYAN = (0, 229, 255)
BLACK = (10, 10, 11)


def lerp(a, b, t):
    return tuple(int(a[i] + (b[i] - a[i]) * t) for i in range(3))


def vertical_gradient(size, top, bottom):
    """Full RGBA vertical gradient image."""
    img = Image.new("RGBA", size, (0, 0, 0, 0))
    px = img.load()
    w, h = size
    for y in range(h):
        c = lerp(top, bottom, y / max(1, h - 1))
        for x in range(w):
            px[x, y] = (*c, 255)
    return img


def rounded_bar_mask(size, radius):
    m = Image.new("L", size, 0)
    d = ImageDraw.Draw(m)
    d.rounded_rectangle([0, 0, size[0] - 1, size[1] - 1], radius=radius, fill=255)
    return m


def make_mark(scale=1.0, with_glow=True, glow_strength=1.0):
    """The equalizer-bars mark, 4 bars with rounded caps, gradient fill."""
    base = int(1024 * scale)
    img = Image.new("RGBA", (base, base), (0, 0, 0, 0))

    # Bar geometry (relative): heights form a rising rhythm
    bar_w = int(base * 0.115)
    gap = int(base * 0.055)
    heights = [0.30, 0.52, 0.40, 0.66]  # musical rhythm
    total_w = 4 * bar_w + 3 * gap
    x0 = (base - total_w) // 2
    baseline = int(base * 0.70)

    bar_layer = Image.new("RGBA", (base, base), (0, 0, 0, 0))
    for i, hfrac in enumerate(heights):
        h = int(base * hfrac)
        x = x0 + i * (bar_w + gap)
        y = baseline - h
        grad = vertical_gradient((bar_w, h), GREEN, CYAN)
        mask = rounded_bar_mask((bar_w, h), bar_w // 2)
        bar_layer.paste(grad, (x, y), mask)

    if with_glow:
        glow = bar_layer.filter(ImageFilter.GaussianBlur(base * 0.045))
        if glow_strength != 1:
            r, g, b, a = glow.split()
            a = a.point(lambda v: int(v * glow_strength))
            glow = Image.merge("RGBA", (r, g, b, a))
        img.alpha_composite(glow)

    img.alpha_composite(bar_layer)
    return img


def make_icon():
    """Full app icon: dark bg + radial glow + mark."""
    S = 1024
    img = Image.new("RGBA", (S, S), (*BLACK, 255))

    # radial ambient glow (green-tinted, subtle)
    glow = Image.new("RGBA", (S, S), (0, 0, 0, 0))
    d = ImageDraw.Draw(glow)
    d.ellipse([S * 0.18, S * 0.10, S * 0.82, S * 0.95], fill=(29, 185, 84, 60))
    d.ellipse([S * 0.30, S * 0.00, S * 0.75, S * 0.55], fill=(0, 229, 255, 40))
    glow = glow.filter(ImageFilter.GaussianBlur(S * 0.16))
    img.alpha_composite(glow)

    # subtle vertical gradient darkening
    shade = vertical_gradient((S, S), (18, 20, 24, 255), (8, 9, 11, 255))
    img.alpha_composite(shade)

    mark = make_mark(scale=1.0)
    img.alpha_composite(mark)

    img.convert("RGB").save("assets/icon.png", "PNG")
    print("icon.png done")


def make_adaptive():
    """Adaptive foreground: transparent bg, mark inside 66% safe zone."""
    S = 1024
    img = Image.new("RGBA", (S, S), (0, 0, 0, 0))
    mark = make_mark(scale=0.62, with_glow=True, glow_strength=0.8)
    img.alpha_composite(mark)
    img.save("assets/adaptive-icon.png", "PNG")
    print("adaptive-icon.png done")


def make_splash():
    """Splash: dark bg with centered mark, generous margins."""
    S = 1284
    img = Image.new("RGBA", (S, S), (*BLACK, 255))
    glow = Image.new("RGBA", (S, S), (0, 0, 0, 0))
    d = ImageDraw.Draw(glow)
    d.ellipse([S * 0.22, S * 0.14, S * 0.78, S * 0.92], fill=(29, 185, 84, 50))
    glow = glow.filter(ImageFilter.GaussianBlur(S * 0.14))
    img.alpha_composite(glow)
    mark = make_mark(scale=0.55)
    img.alpha_composite(mark)
    img.convert("RGB").save("assets/splash.png", "PNG")
    print("splash.png done")


def make_favicon():
    S = 96
    img = Image.new("RGBA", (S, S), (*BLACK, 255))
    mark = make_mark(scale=0.8, with_glow=False)
    img.alpha_composite(mark)
    img.resize((48, 48), Image.LANCZOS).save("assets/favicon.png", "PNG")
    print("favicon.png done")


if __name__ == "__main__":
    make_icon()
    make_adaptive()
    make_splash()
    make_favicon()
    print("ALL ICONS DONE")
