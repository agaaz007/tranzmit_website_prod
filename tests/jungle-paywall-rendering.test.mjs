import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const landing = readFileSync(
  new URL("../public/tranzmit-ai-landing/index.html", import.meta.url),
  "utf8",
);

const jungleSection = landing.match(
  /<section[^>]+id="case-study-jungle"[\s\S]*?<\/section>/,
)?.[0];

test("Jungle case-study paywalls use complete portrait compositions", () => {
  assert.ok(jungleSection, "Jungle case-study section should exist");
  assert.equal(
    [...jungleSection.matchAll(/class="jungle-paywall jungle-paywall--/g)].length,
    3,
    "all three phone frames should contain purpose-built portrait paywalls",
  );
  assert.doesNotMatch(
    jungleSection,
    /cs2-pw-img--jungle/,
    "wide source images must not be cropped into narrow phone frames",
  );
  assert.match(landing, /\.jungle-paywall\s*\{/);
  assert.match(landing, /jungle-paywall--control/);
  assert.match(landing, /jungle-paywall--clinical/);
  assert.match(landing, /jungle-paywall--pharmacy/);
});
