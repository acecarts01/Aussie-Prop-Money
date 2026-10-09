const isStatic = process.env.TARGET === 'static'

// Retired blog posts: thin or duplicate pages consolidated into the stronger page on the same topic,
// or into the shop where the search intent is to buy. Permanent so any link value moves with the visitor.
const RETIRED_POSTS = {
  'best-realistic-australian-prop-money-for-sale': '/shop/',
  'where-to-buy-realistic-fake-money-in-australia-online-2024': '/shop/',
  'is-prop-money-legal-in-australia-penalties-and-rba-rules': '/blog/is-prop-money-legal-in-australia/',
  'how-to-detect-prop-money-australian-business-guide': '/blog/why-businesses-need-prop-money-detectors/',
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: isStatic ? 'export' : 'standalone',
  trailingSlash: true,
  // LOW_MEM=1 caps page-generation workers for local builds on small machines.
  ...(process.env.LOW_MEM ? { experimental: { cpus: 2 } } : {}),
  images: isStatic
    ? { unoptimized: true }
    : { formats: ['image/avif', 'image/webp'] },
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
