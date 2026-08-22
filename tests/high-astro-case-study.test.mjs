import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import test from "node:test";

const landingUrl = new URL(
  "../public/tranzmit-ai-landing/index.html",
  import.meta.url,
);

const assetsUrl = new URL(
  "../public/tranzmit-ai-landing/assets/",
  import.meta.url,
);

test("High Astro case study uses clipped phones and Jungle-style result cards", async () => {
  const landing = await readFile(landingUrl, "utf8");
  const section = landing.match(
    /<section[^>]+id="case-study-high-astro"[\s\S]*?<\/section>/,
  )?.[0];

  assert.ok(section, "High Astro case-study section should exist");
  assert.match(section, /High Astro Case Study/);
  assert.match(section, /25% uplift in paywall flickthrough rates/);
  assert.match(section, /more than 400,000 users/);
  assert.match(section, /within two weeks of going live/);

  const imageNames = [
    "high-astro-trial-paywall.jpeg",
    "high-astro-marriage-paywall.jpeg",
  ];

  for (const imageName of imageNames) {
    assert.match(section, new RegExp(`\\.\\/assets\\/${imageName}`));
    const image = await stat(new URL(imageName, assetsUrl));
    assert.ok(image.size > 0, `${imageName} should contain image data`);
  }

  assert.equal(
    [...section.matchAll(/class="astro-case__image"/g)].length,
    2,
    "both supplied High Astro images should be visible",
  );
  assert.equal(
    [...section.matchAll(/class="cs2-stat astro-case__metric/g)].length,
    3,
    "all three results should use the Jungle metric-card component",
  );
  assert.match(
    landing,
    /\.astro-case__media\s*\{[^}]*aspect-ratio:9 \/ 18\.6;[^}]*overflow:hidden;/s,
    "each source image should be clipped to a portrait phone viewport",
  );
  assert.match(
    landing,
    /\.astro-case__image\s*\{[^}]*position:absolute;[^}]*width:208%;[^}]*max-width:none;/s,
    "the supplied image should be zoomed so its existing iPhone casing fills the viewport",
  );
  assert.match(
    landing,
    /@media \(max-width: 1080px\)[\s\S]*?\.astro-case__grid\s*\{\s*grid-template-columns:minmax\(0,1fr\);/,
  );
  assert.match(
    landing,
    /@media \(max-width: 560px\)[\s\S]*?\.astro-case__visual\s*\{\s*grid-template-columns:1fr;/,
  );
});
