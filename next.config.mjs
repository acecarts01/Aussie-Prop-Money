const isStatic = process.env.TARGET === 'static'

// Retired blog posts: thin or duplicate pages consolidated into the stronger page on the same topic,
// or into the shop where the search intent is to buy. Permanent so any link value moves with the visitor.
const RETIRED_POSTS = {
  'whats-on-the-australian-100-dollar-note': '/blog/whats-on-australian-banknotes/',
  'whats-on-the-australian-50-dollar-note': '/blog/whats-on-australian-banknotes/',
  'whats-on-the-australian-20-dollar-note': '/blog/whats-on-australian-banknotes/',
  'prop-money-gift-ideas-for-him': '/blog/novelty-cash-gift-ideas-australia/',
  'prop-money-gift-ideas-for-her': '/blog/novelty-cash-gift-ideas-australia/',
  'prop-money-gift-ideas-for-teenagers': '/blog/novelty-cash-gift-ideas-australia/',
  'personalised-prop-money-gift-ideas': '/blog/novelty-cash-gift-ideas-australia/',
  'easter-prop-money-gift-ideas': '/blog/novelty-cash-gift-ideas-australia/',
  'valentines-day-prop-money-gag-gifts': '/blog/novelty-cash-gift-ideas-australia/',
  'retirement-and-farewell-money-gift-ideas': '/blog/novelty-cash-gift-ideas-australia/',
  'best-novelty-gifts-under-25-in-australia': '/blog/novelty-cash-gift-ideas-australia/',
  'sourcing-vintage-australian-prop-notes-for-period-dramas': '/blog/vintage-australian-notes-period-production-guide/',
  'prop-money-for-content-creators-flex-guide': '/blog/prop-money-for-content-creators/',
  'educational-play-money-australian-classrooms': '/blog/australian-play-money-guide-for-parents-and-teachers/',
  'educational-play-money-for-australian-schools-and-kids': '/blog/australian-play-money-guide-for-parents-and-teachers/',
  'how-realistic-fake-money-is-made-for-australian-productions': '/blog/how-realistic-does-prop-money-need-to-be/',
  'how-to-spot-fake-notes-australia-atm-bank-safety': '/blog/how-to-spot-fake-australian-currency/',
  'how-to-tell-if-money-is-fake-australia-prop-guide': '/blog/how-to-spot-fake-australian-currency/',
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
