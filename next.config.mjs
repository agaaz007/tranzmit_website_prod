/** @type {import('next').NextConfig} */
const nextConfig = {
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
