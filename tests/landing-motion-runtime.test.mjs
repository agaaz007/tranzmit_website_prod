import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import test from "node:test";

import { chromium } from "playwright";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const port = 3187;
const baseUrl = `http://127.0.0.1:${port}`;

async function waitForServer(processHandle) {
  const deadline = Date.now() + 25_000;
  while (Date.now() < deadline) {
    if (processHandle.exitCode !== null) {
      throw new Error(`Next.js exited before becoming ready (${processHandle.exitCode})`);
    }
    try {
      const response = await fetch(baseUrl);
      if (response.ok) return;
    } catch {
      // The server is still starting.
    }
    await new Promise((resolve) => setTimeout(resolve, 200));
  }
  throw new Error("Timed out waiting for the landing-page test server");
}

function browserExecutable() {
  const candidates = [
    process.env.PLAYWRIGHT_CHROME_PATH,
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    chromium.executablePath(),
  ];
  return candidates.find((candidate) => candidate && existsSync(candidate));
}

test("landing motion stays scroll-controlled and degrades safely", { timeout: 45_000 }, async (t) => {
  const executablePath = browserExecutable();
  if (!executablePath) {
    t.skip("No Chromium-compatible browser is installed");
    return;
  }

  const server = spawn(
    process.execPath,
    ["node_modules/next/dist/bin/next", "dev", "-H", "127.0.0.1", "-p", String(port)],
    {
      cwd: repoRoot,
      env: { ...process.env, NEXT_TELEMETRY_DISABLED: "1" },
      stdio: "ignore",
    },
  );
  t.after(() => {
    if (server.exitCode === null) server.kill("SIGTERM");
  });
  await waitForServer(server);

  const browser = await chromium.launch({ headless: true, executablePath });
  t.after(() => browser.close());

  const desktop = await browser.newContext({ viewport: { width: 1512, height: 982 } });
  const page = await desktop.newPage();
  const pageErrors = [];
  page.on("pageerror", (error) => pageErrors.push(error.message));
  await page.goto(baseUrl, { waitUntil: "networkidle" });
  await page.locator("body.is-ready").waitFor();
  assert.ok(await page.locator(".nav").evaluate((element) => !element.classList.contains("is-scrolled")));
  assert.ok(
    await page.locator("[data-reveal]").count() >= 20,
    "the motion layer should register the major landing sections for reveal",
  );
  assert.deepEqual(
    await page.locator("[data-reveal]").evaluateAll((elements) =>
      elements.slice(0, 5).map((element) => element.style.getPropertyValue("--reveal-delay")),
    ),
    ["0ms", "65ms", "130ms", "195ms", "0ms"],
  );

  const heroTravel = await page.locator(".hero").evaluate(
    (element) => Math.max(1, element.offsetHeight - window.innerHeight),
  );
  await page.evaluate((scrollY) => window.scrollTo(0, scrollY), heroTravel * 0.5);
  await page.waitForTimeout(250);
  assert.ok(await page.locator(".nav").evaluate((element) => element.classList.contains("is-scrolled")));
  assert.deepEqual(
    await page.locator(".hero").evaluate((element) => ({
      paused: element.dataset.enginePaused,
      phase: element.dataset.enginePhase,
    })),
    { paused: "true", phase: "1" },
    "scrolling should pause autoplay and select the Generate phase",
  );

  await page.waitForTimeout(5_200);
  await page.evaluate(() => window.dispatchEvent(new Event("scroll")));
  await page.waitForTimeout(100);
  assert.equal(
    await page.locator(".hero").getAttribute("data-engine-phase"),
    "1",
    "autoplay must not overwrite the phase selected by scroll position",
  );

  for (const [fraction, expectedPhase] of [[0.03, "0"], [0.5, "1"], [0.97, "2"]]) {
    await page.evaluate((scrollY) => window.scrollTo(0, scrollY), heroTravel * fraction);
    await page.waitForTimeout(120);
    assert.equal(
      await page.locator(".hero").getAttribute("data-engine-phase"),
      expectedPhase,
      `hero scroll fraction ${fraction} should select phase ${expectedPhase}`,
    );
  }

  const pageProgress = await page.evaluate(() =>
    Number.parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--page-progress")),
  );
  assert.ok(pageProgress > 0, "the floating navigation should reflect page progress");

  await page.locator(".nav__cta").hover();
  await page.waitForTimeout(120);
  assert.equal(await page.locator("#tz-cursor .tz-cursor__label").textContent(), "Book");
  assert.ok(await page.locator("#tz-cursor").evaluate((element) => element.classList.contains("is-action")));
  assert.match(await page.locator("#tz-cursor").getAttribute("style"), /translate3d/);
  assert.equal(await page.locator("#cursorHue").evaluate((element) => element.style.opacity), "0.7");
  await page.locator('.nav__link[href="#how"]').hover();
  await page.waitForTimeout(60);
  assert.equal(await page.locator("#tz-cursor .tz-cursor__label").textContent(), "View");
  await page.locator(".hero h1").hover({ force: true });
  assert.ok(await page.locator("#tz-cursor").evaluate((element) => !element.classList.contains("is-action")));
  await page.locator(".nav__cta").hover();
  await page.mouse.down();
  assert.ok(await page.locator("#tz-cursor").evaluate((element) => element.classList.contains("is-down")));
  await page.mouse.up();
  assert.ok(await page.locator("#tz-cursor").evaluate((element) => !element.classList.contains("is-down")));

  const howTop = await page.locator("#how").evaluate(
    (element) => element.getBoundingClientRect().top + window.scrollY,
  );
  await page.evaluate((scrollY) => window.scrollTo(0, scrollY), howTop - 86);
  await page.waitForTimeout(250);
  assert.equal(await page.locator("#how").getAttribute("data-flow-step"), "1");
  assert.ok(await page.locator("#how .pipeline").evaluate((element) => element.classList.contains("is-visible")));

  const howHeight = await page.locator("#how").evaluate((element) => element.offsetHeight);
  const howTravel = Math.max(howHeight * 0.38, 982 * 0.55);
  for (const [fraction, expectedStep] of [[0.02, "1"], [0.3, "2"], [0.55, "3"], [0.82, "4"]]) {
    await page.evaluate(
      ({ scrollY }) => window.scrollTo(0, scrollY),
      { scrollY: howTop - 100 + howTravel * fraction },
    );
    await page.waitForTimeout(100);
    assert.equal(
      await page.locator("#how").getAttribute("data-flow-step"),
      expectedStep,
      `pipeline scroll fraction ${fraction} should select step ${expectedStep}`,
    );
    if (expectedStep !== "1") {
      assert.equal(
        await page.locator("#how .pipe-arrow").nth(Number(expectedStep) - 2).evaluate(
          (element) => element.classList.contains("is-firing"),
        ),
        true,
        `pipeline step ${expectedStep} should fire its incoming arrow`,
      );
    }
  }
  assert.match(await page.locator("#pipe-return-svg").innerHTML(), /<path/);
  await page.locator("#how .pcard").nth(1).dispatchEvent("pointerenter");
  assert.equal(await page.locator("#how").getAttribute("data-flow-step"), "2");
  await page.evaluate(() => window.dispatchEvent(new Event("resize")));
  await page.waitForTimeout(120);
  assert.match(await page.locator("#pipe-return-svg").innerHTML(), /<path/);

  await page.locator('.nav__link[href="#system"]').click();
  await page.waitForFunction(() => location.hash === "#system");
  await page.waitForTimeout(700);
  assert.equal(await page.locator('.nav__link[href="#system"]').getAttribute("aria-current"), "location");
  assert.ok(
    await page.locator("#how .pipeline").evaluate((element) => element.classList.contains("is-visible")),
    "revealed sections should stay visible after they leave the viewport",
  );

  await page.evaluate(() => document.dispatchEvent(new PointerEvent("pointerleave")));
  assert.ok(await page.locator("#tz-cursor").evaluate((element) => !element.classList.contains("is-visible")));
  assert.deepEqual(pageErrors, []);
  await desktop.close();

  const mobile = await browser.newContext({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
  });
  const mobilePage = await mobile.newPage();
  await mobilePage.goto(baseUrl, { waitUntil: "networkidle" });
  await mobilePage.locator("body.is-ready").waitFor();
  assert.deepEqual(await mobilePage.evaluate(() => ({
    cursor: getComputedStyle(document.querySelector("#tz-cursor")).display,
    sticky: getComputedStyle(document.querySelector(".hero__sticky")).position,
    cue: getComputedStyle(document.querySelector(".hero-scroll-cue")).display,
    overflow: document.documentElement.scrollWidth - window.innerWidth,
  })), {
    cursor: "none",
    sticky: "relative",
    cue: "none",
    overflow: 0,
  });
  await mobile.close();

  const reduced = await browser.newContext({
    viewport: { width: 1280, height: 800 },
    reducedMotion: "reduce",
  });
  const reducedPage = await reduced.newPage();
  await reducedPage.goto(baseUrl, { waitUntil: "networkidle" });
  await reducedPage.locator("body.is-ready").waitFor();
  assert.deepEqual(await reducedPage.evaluate(() => ({
    cursor: getComputedStyle(document.querySelector("#tz-cursor")).display,
    revealOpacity: getComputedStyle(document.querySelector("[data-reveal]")).opacity,
    revealTransform: getComputedStyle(document.querySelector("[data-reveal]")).transform,
  })), {
    cursor: "none",
    revealOpacity: "1",
    revealTransform: "none",
  });
  await reduced.close();
});
