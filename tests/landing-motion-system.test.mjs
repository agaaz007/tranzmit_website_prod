import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const landing = readFileSync(
  new URL("../public/tranzmit-ai-landing/index.html", import.meta.url),
  "utf8",
);

test("the editorial hero keeps the Tranzmit story and paywall engine separate", () => {
  assert.match(landing, /class="hero__sticky"/);
  assert.match(landing, /Make your revenue surfaces/);
  assert.match(landing, /class="hero__title-line hero__title-accent">improve themselves\.<\/em>/);
  assert.match(landing, /class="hero__proof wrap"/);
  assert.match(landing, /class="hero-scroll-cue"/);
  assert.match(landing, /scroll to see the system learn/);
  assert.match(landing, /\.hero__sticky\s*\{[^}]*position:sticky/);
});

test("the floating navigation exposes the major landing-page destinations", () => {
  for (const destination of ["#how", "#system", "#customers", "#case-study"]) {
    assert.match(landing, new RegExp(`class="nav__link" href="${destination}"`));
  }
  assert.match(landing, /class="nav__progress"/);
  assert.match(landing, /--page-progress/);
  assert.match(landing, /link\.setAttribute\('aria-current','location'\)/);
});

test("scroll motion is progressive and remains accessible", () => {
  assert.match(landing, /data-reveal/);
  assert.match(landing, /new IntersectionObserver/);
  assert.match(landing, /hero\.style\.setProperty\('--hero-scroll'/);
  assert.match(landing, /hero\.dataset\.enginePaused!=='true'/);
  assert.match(landing, /var activePhase = Number\(hero\.dataset\.enginePhase\)/);
  assert.match(landing, /phaseButtons\[nextPhase\]\.click\(\)/);
  assert.match(landing, /section\.offsetHeight \* \.38/);
  assert.match(landing, /setActive\(Math\.floor\(progress \* cards\.length\)\)/);
  assert.match(landing, /@media \(prefers-reduced-motion:reduce\)/);
  assert.match(landing, /revealNodes\.forEach\(function\(node\)\{ node\.classList\.add\('is-visible'\)/);
});

test("the contextual cursor is desktop-only and does not replace touch input", () => {
  assert.match(landing, /id="tz-cursor" aria-hidden="true"/);
  assert.match(landing, /class="tz-cursor__arrow"/);
  assert.match(landing, /data-cursor-label="Book"/);
  assert.match(landing, /document\.addEventListener\('pointermove',cursorMove/);
  assert.match(landing, /function startCursor\(\)/);
  assert.match(landing, /cancelAnimationFrame\(cursorFrame\)/);
  assert.match(landing, /@media \(hover:none\),\(pointer:coarse\) \{ #tz-cursor \{ display:none!important; \} \}/);
});
