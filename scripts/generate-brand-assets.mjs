#!/usr/bin/env node
/**
 * Generates the landing page's owned visual assets with OpenAI images.
 *
 *   OPENAI_API_KEY=sk-... node scripts/generate-brand-assets.mjs
 *   node scripts/generate-brand-assets.mjs --only specimen --force
 *
 * Reads the key from the environment or from .env.local. Writes PNGs into
 * public/tranzmit-ai-landing/assets/ and skips anything already on disk
 * unless --force is passed.
 *
 * ── Art direction rules these prompts follow ───────────────────────────────
 *
 * 1. Never ask the generator for text, numerals, logos, or UI copy. Rendered
 *    lettering is the single clearest tell that an image was generated, and
 *    this page already sets its own type. Every prompt asks for shape,
 *    material, light and ink, and explicitly forbids legible glyphs. Real
 *    type gets composited in CSS on top.
 *
 * 2. Every prompt states the palette in hex and names the paper. The assets
 *    have to sit on #FBF8F2 next to #1F3CB4 without looking pasted on.
 *
 * 3. The references are printing, not "digital art": offset litho, letterpress
 *    proofing sheets, ink on cotton stock. That is the page's existing voice,
 *    and it is a register image generators are genuinely good at — unlike
 *    "3D render of an abstract AI network", which is where slop comes from.
 *
 * 4. Each asset has a stated job on the page. Nothing is generated because it
 *    would be nice to have.
 */

import { mkdir, writeFile, access, readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import OpenAI from "openai";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT = path.join(ROOT, "public/tranzmit-ai-landing/assets");

const PAPER = "#FBF8F2";
const ULTRAMARINE = "#1F3CB4";
const GRAPHITE = "#15120E";

const ASSETS = [
  {
    name: "specimen-sheet",
    file: "specimen-sheet.png",
    size: "1536x1024",
    // The page's one owned image. Both design reviews landed on the same gap:
    // the site is type plus borrowed customer screenshots plus generic charts,
    // and owns no picture you could show cropped and still name the company.
    // This is the product stated as an object — a proof sheet of candidate
    // screens with exactly one pulled in colour.
    job: "Full-bleed plate between the pipeline and the platform sections, and the source crop for the OG card.",
    prompt: `An overhead photograph of a printer's proof sheet resting on warm ivory cotton paper, colour ${PAPER}.

On the sheet: a precise grid of roughly forty small vertical rectangles, each the proportion of a phone screen, arranged in even rows and columns with generous white space between them. Each rectangle is a blank printed block — inside it, a few horizontal bars of varying length suggest a heading, a price and a button, but they are abstract printed rules, not writing. Absolutely no letters, numbers, words or symbols anywhere in the image.

Every rectangle is printed in soft graphite ink, colour ${GRAPHITE}, at about 30% density, so they read as a quiet field. Exactly one rectangle, positioned off-centre in the lower right third, is printed in dense saturated ultramarine, colour ${ULTRAMARINE}, at full ink density. It is the only colour in the frame and it should immediately draw the eye.

Style: offset lithography on uncoated stock. Visible paper tooth and fibre. Slight ink bleed at the edges of each block. Faint registration crop marks in the sheet's corners. A trace of misregistration on two or three of the graphite blocks, as if the plate shifted. Flat even daylight from above, very soft shadow, no glare, no vignette.

Shot straight down, perfectly square to the sheet. Editorial print-catalogue photography. Restrained, analogue, expensive. No people, no hands, no devices, no screens, no gradients, no glow, no 3D rendering, no text of any kind.`,
  },
  {
    name: "ink-plate",
    file: "ink-plate.png",
    size: "1536x1024",
    // The closing CTA is a flat ultramarine plate. Flat is right, but a large
    // area of pure hex reads as a CSS colour rather than as a printed surface.
    // This gives it material at very low opacity without adding a shape.
    job: "Low-opacity overlay on the closing CTA band so the flat ultramarine reads as ink on stock rather than a filled div.",
    prompt: `A flat field of dense ultramarine printing ink, colour ${ULTRAMARINE}, rolled onto uncoated cotton paper and photographed straight on, filling the entire frame edge to edge.

The surface is almost uniform, but not perfectly so: the paper's tooth shows faintly through the ink, there is a very subtle variation in ink density across the sheet, and a slight roller texture runs in one direction. Grain is fine and organic, like a scanned letterpress solid.

No objects, no shapes, no figures, no text, no letters, no numbers, no logos, no borders, no vignette, no lighting hotspot, no gradient banding. Just ink and paper, evenly lit, edge to edge. Extremely subtle. This is a texture, not a picture.`,
  },
  {
    name: "og-card",
    file: "og-card-v2.png",
    size: "1536x1024",
    // Written alongside the existing og-card.png rather than over it, so the
    // current share image keeps working until this one is reviewed.
    job: "Open Graph / Twitter share image. Crop to 1200x630 and composite the wordmark in CSS or a design tool; the plate carries no type of its own.",
    prompt: `An overhead photograph of warm ivory cotton paper, colour ${PAPER}, filling the frame, with a wide margin of empty paper across the upper half.

Across the lower half, a single row of eight small vertical rectangles in the proportion of phone screens, evenly spaced, each printed in soft graphite ink, colour ${GRAPHITE}, at about 30% density, containing only abstract horizontal printed bars of varying length. The third rectangle from the right is printed in dense saturated ultramarine, colour ${ULTRAMARINE}, at full density — the only colour in the frame.

Absolutely no letters, numbers, words, symbols or logos anywhere in the image. The upper half must stay clean empty paper with nothing in it.

Style: offset lithography on uncoated stock, visible paper fibre, faint ink bleed, flat even daylight from directly above, very soft shadow. Shot square to the sheet. Editorial, analogue, restrained. No people, no devices, no gradients, no glow, no 3D rendering.`,
  },
];

async function loadKey() {
  if (process.env.OPENAI_API_KEY) return process.env.OPENAI_API_KEY;
  try {
    const env = await readFile(path.join(ROOT, ".env.local"), "utf8");
    const hit = env.match(/^OPENAI_API_KEY=(.+)$/m);
    if (hit) return hit[1].trim().replace(/^["']|["']$/g, "");
  } catch {
    // no .env.local, fall through to the error below
  }
  return null;
}

async function exists(p) {
  try {
    await access(p);
    return true;
  } catch {
    return false;
  }
}

async function main() {
  const args = process.argv.slice(2);
  const force = args.includes("--force");
  const onlyIdx = args.indexOf("--only");
  const only = onlyIdx > -1 ? args[onlyIdx + 1] : null;

  const key = await loadKey();
  if (!key) {
    console.error(
      "No OPENAI_API_KEY found.\n" +
        "Set it in the environment or add OPENAI_API_KEY=sk-... to .env.local\n" +
        "(.env.local is already gitignored).",
    );
    process.exit(1);
  }

  const client = new OpenAI({ apiKey: key });
  await mkdir(OUT, { recursive: true });

  const queue = only ? ASSETS.filter((a) => a.name === only) : ASSETS;
  if (!queue.length) {
    console.error(`No asset named "${only}". Known: ${ASSETS.map((a) => a.name).join(", ")}`);
    process.exit(1);
  }

  for (const asset of queue) {
    const dest = path.join(OUT, asset.file);
    if (!force && (await exists(dest))) {
      console.log(`skip  ${asset.file} (already on disk, pass --force to regenerate)`);
      continue;
    }

    process.stdout.write(`gen   ${asset.file} … `);
    const started = Date.now();
    const result = await client.images.generate({
      model: process.env.IMAGE_MODEL || "gpt-image-2",
      prompt: asset.prompt,
      size: asset.size,
      quality: "high",
      n: 1,
    });

    const b64 = result.data?.[0]?.b64_json;
    if (!b64) throw new Error(`no image returned for ${asset.name}`);
    await writeFile(dest, Buffer.from(b64, "base64"));
    const kb = Math.round(Buffer.from(b64, "base64").length / 1024);
    console.log(`${kb}KB in ${Math.round((Date.now() - started) / 1000)}s`);
    console.log(`      → ${asset.job}`);
  }

  console.log("\nDone. Review each image before wiring it in — regenerate with --force if a");
  console.log("plate comes back with stray lettering or a hotspot. The page renders correctly");
  console.log("without any of these; they are enhancements, not dependencies.");
}

main().catch((err) => {
  console.error("\nGeneration failed:", err?.message || err);
  process.exit(1);
});
