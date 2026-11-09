// Each one stays reachable but out of search. `:rest(.*)` covers file names with
// spaces and brackets, which arrive percent-encoded or not depending on the client.
const noindexSources = [
  "/interactive-demo.html",
  "/insights-dashboard.html",
  "/final_report.html",
  "/gojek-combined-report.html",
  "/juno-report.html",
  "/Innerwear_Market_Research_Report:rest(.*).html",
  "/test:rest(.*).html",
  "/LIQUID:rest(.*)",
  "/gojek-report/:path*",
  "/juno-report/:path*",
  "/access-report/:path*",
  "/access-interview/:path*",
  "/sample-report/:path*",
  "/innerwear-report/:path*",
  "/innerwear-customer-report/:path*",
  "/growth-report-freecultr/:path*",
  "/try-agent/:path*",
]

/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      ...["trazmit.com", "www.trazmit.com"].map((host) => ({
        source: "/:path*",
        has: [{ type: "host", value: host }],
        destination: "https://tranzmitai.com/:path*",
        statusCode: 301,
      })),
      {
        source: "/book-demo",
        destination: "/#demo",
        statusCode: 301,
      },
    ]
  },
  async headers() {
    return noindexSources.map((source) => ({
      source,
      headers: [{ key: "X-Robots-Tag", value: "noindex" }],
    }))
  },
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: "/",
          destination: "/tranzmit-ai-landing/index.html",
        },
        {
          source: "/assets/:path*",
          destination: "/tranzmit-ai-landing/assets/:path*",
        },
      ],
    }
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
