#!/usr/bin/env python3
"""
Second half of the brand-asset pipeline. Run after generate-brand-assets.mjs.

    python3 scripts/prepare-brand-assets.py

Does two jobs the generator cannot:

1. Colour-matches each plate to the site palette. The model returns paper
   around #F4F1E8 and ink around #1E47B5 — close, but a plate that sits
   full-bleed next to CSS-painted #FBF8F2 has to match it exactly or the
   seam shows. This measures the actual paper white in each file and applies
   a per-channel linear lift so the paper lands on the page colour, which
   carries the ink along with it and leaves the paper grain intact.

2. Ships them. The raw PNGs are 2.3-3.4MB each; nothing that heavy belongs
   on a landing page. Outputs WebP at the size each asset is actually used
   at, plus a correctly cropped 1200x630 OG card.

Source PNGs are left on disk untouched so a plate can be re-derived without
another API call.
"""

from pathlib import Path
from collections import Counter

from PIL import Image

ASSETS = Path(__file__).resolve().parent.parent / "public/tranzmit-ai-landing/assets"

PAPER = (0xFB, 0xF8, 0xF2)  # --paper / --cream


def measure_paper(im: Image.Image) -> tuple[int, int, int]:
    """Most common near-white pixel: the unprinted stock."""
    small = im.resize((im.width // 3, im.height // 3))
    hits: Counter = Counter()
    for r, g, b in small.getdata():
        if r > 225 and g > 220 and b > 205 and abs(r - b) < 32:
            hits[(r, g, b)] += 1
    return hits.most_common(1)[0][0] if hits else (255, 255, 255)


def match_paper(im: Image.Image, target=PAPER) -> Image.Image:
    """Linear per-channel lift so the measured stock lands on `target`."""
    src = measure_paper(im)
    lut = []
    for ch in range(3):
        scale = target[ch] / max(src[ch], 1)
        lut += [min(255, round(v * scale)) for v in range(256)]
    out = im.point(lut)
    print(f"      paper #{src[0]:02X}{src[1]:02X}{src[2]:02X}"
          f" -> #{target[0]:02X}{target[1]:02X}{target[2]:02X}")
    return out


def save_webp(im: Image.Image, name: str, width: int, quality: int) -> None:
    if im.width != width:
        h = round(im.height * width / im.width)
        im = im.resize((width, h), Image.LANCZOS)
    dest = ASSETS / name
    im.save(dest, "WEBP", quality=quality, method=6)
    print(f"      -> {name}  {im.width}x{im.height}  {dest.stat().st_size // 1024}KB")


def main() -> None:
    # ---- specimen sheet: full-bleed plate, composited with multiply ----
    # This one is NOT matched to the page colour. Multiply blending means the
    # page shows through wherever the source is white, so normalising the
    # stock to pure white is what makes the plate seamless — matching it to
    # #FBF8F2 instead multiplies ivory by ivory and prints a visibly darker
    # rectangle on the page. The page supplies the paper; the plate supplies
    # only the ink and the grain.
    print("specimen-sheet.png")
    sheet = Image.open(ASSETS / "specimen-sheet.png").convert("RGB")
    sheet = match_paper(sheet, (255, 255, 255))
    # The generated sheet has a soft edge shadow around its border, which
    # multiply turns into a visible frame. Trim it.
    m = round(sheet.width * 0.018)
    sheet = sheet.crop((m, m, sheet.width - m, sheet.height - m))
    save_webp(sheet, "specimen-sheet.webp", 1536, 82)

    # ---- ink plate: a texture blended at low opacity, so it can be small ----
    print("ink-plate.png")
    ink = Image.open(ASSETS / "ink-plate.png").convert("RGB")
    save_webp(ink, "ink-plate.webp", 720, 78)

    # ---- OG card: exact 1200x630, cropped to keep the clean upper half ----
    # The generator was asked to leave the top half empty so the wordmark and
    # headline can be composited there. The crop keeps that space and the row
    # of candidate screens along the bottom.
    print("og-card-v2.png")
    og = match_paper(Image.open(ASSETS / "og-card-v2.png").convert("RGB"))
    target_ratio = 1200 / 630
    crop_h = round(og.width / target_ratio)          # 806 from a 1536-wide source
    og = og.crop((0, og.height - crop_h, og.width, og.height))
    og = og.resize((1200, 630), Image.LANCZOS)
    # PNG lands at ~970KB here: the paper grain is noise, which is exactly what
    # PNG cannot compress. JPEG at 88 is visually identical on a flat plate and
    # a tenth the weight, and every OG scraper handles JPEG.
    dest = ASSETS / "og-card-v2.jpg"
    og.save(dest, "JPEG", quality=88, optimize=True, progressive=True)
    print(f"      -> og-card-v2.jpg  1200x630  {dest.stat().st_size // 1024}KB")


if __name__ == "__main__":
    main()
