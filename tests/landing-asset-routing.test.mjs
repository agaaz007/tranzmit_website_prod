import assert from "node:assert/strict"
import { readFile } from "node:fs/promises"
import test from "node:test"

import nextConfig from "../next.config.mjs"

const LANDING_HTML = new URL("../public/tranzmit-ai-landing/index.html", import.meta.url)
const LANDING_ASSETS = new URL("../public/tranzmit-ai-landing/assets/", import.meta.url)

test("the root landing route exposes every bundled asset", async () => {
  const html = await readFile(LANDING_HTML, "utf8")
  const assetNames = new Set(
    [...html.matchAll(/\.\/assets\/([^"')\s]+)/g)].map((match) => match[1]),
  )

  assert.ok(assetNames.size > 0, "expected the landing page to reference bundled assets")

  for (const assetName of assetNames) {
    await assert.doesNotReject(
      readFile(new URL(assetName, LANDING_ASSETS)),
      `missing landing asset: ${assetName}`,
    )
  }

  const rewrites = await nextConfig.rewrites()
  assert.deepEqual(
    rewrites.beforeFiles.find((rewrite) => rewrite.source === "/assets/:path*"),
    {
      source: "/assets/:path*",
      destination: "/tranzmit-ai-landing/assets/:path*",
    },
    "the rewritten root HTML resolves ./assets/* at /assets/*, so that URL must map to the landing bundle",
  )
})
