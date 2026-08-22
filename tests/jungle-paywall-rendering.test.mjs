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

test("Jungle paywalls cannot push the landing page into horizontal scroll", () => {
  assert.match(
    landing,
    /html\s*\{[^}]*overflow-x:\s*clip;/s,
    "the document should clip accidental horizontal overflow at every viewport",
  );
  assert.match(
    landing,
    /\.cs2-grid\s*\{[^}]*grid-template-columns:minmax\(0,1fr\) minmax\(0,\.92fr\);/s,
    "case-study columns should be allowed to shrink below their content width",
  );
  assert.match(
    landing,
    /\.cs2-left,\.cs2-right,\.cs2-card\s*\{\s*min-width:0;\s*\}/,
    "case-study children should not impose intrinsic overflow",
  );
  assert.match(
    landing,
    /\.cs2-branch--phones\s*\{[^}]*width:100%;[^}]*min-width:0;/s,
    "the three-phone grid should stay within the narrative column",
  );
});
