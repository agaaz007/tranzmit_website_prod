import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const landing = readFileSync(
  new URL("../public/tranzmit-ai-landing/index.html", import.meta.url),
  "utf8",
);

const count = (source, pattern) => [...source.matchAll(pattern)].length;

test("the landing hero preserves the complete paywall-engine component surface", () => {
  const referenceVariants = 10;
  const landingVariants = count(
    landing,
    /<div class="hero-engine-card hero-engine-card--/g,
  );

  assert.equal(
    landingVariants,
    referenceVariants,
    "landing page should render every paywall variant from the archive",
  );
  assert.match(landing, /hero-engine-card--trust/);
  assert.match(landing, /hero-engine-card--urgent/);

  assert.equal(
    count(landing, /data-engine-phase-control="[012]"/g),
    3,
    "all three story phases should be directly selectable",
  );
  assert.equal(count(landing, /<button[^>]+data-engine-motion-toggle/g), 1);
  assert.equal(count(landing, /class="hero-engine-system-status"/g), 1);
  assert.equal(count(landing, /class="hero-engine-loop"/g), 1);
  assert.equal(
    count(landing, /class="hero-engine-signal"/g),
    referenceVariants,
    "every desktop paywall should keep its live signal animation",
  );

  assert.match(landing, /@keyframes\s+heroEngineSignal/);
  assert.match(landing, /enginePaused/);
  assert.match(landing, /phaseButtons\.forEach/);

  const compactCloudBreakpoint = landing.match(
    /@media\s*\(max-width:(\d+)px\)\s*\{[\s\S]{0,200}\.hero-engine-cloud\s*\{\s*display:none;/,
  );
  assert.ok(compactCloudBreakpoint, "the compact cloud breakpoint should exist");
  assert.ok(
    Number(compactCloudBreakpoint[1]) <= 680,
    "the full orbiting cloud should remain visible at laptop widths",
  );
});
