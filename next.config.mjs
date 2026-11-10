const isStatic = process.env.TARGET === 'static'

import { RETIRED_POSTS } from './src/config/retired-posts.js'

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: isStatic ? 'export' : 'standalone',
  trailingSlash: true,
  // LOW_MEM=1 caps page-generation workers for local builds on small machines.
  ...(process.env.LOW_MEM ? { experimental: { cpus: 2 } } : {}),
  images: isStatic
    ? { unoptimized: true }
    : { formats: ['image/avif', 'image/webp'], deviceSizes: [640, 750, 828, 1080, 1200, 1600] },
  ...(isStatic
    ? {}
    : {
        async redirects() {
          return Object.entries(RETIRED_POSTS).map(([slug, destination]) => ({
            source: `/blog/${slug}/`,
            destination,
            permanent: true,
          }))
        },
      }),
}

export default nextConfig
