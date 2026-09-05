import { Fraunces, Public_Sans } from 'next/font/google'
import '../styles/globals.css'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import ChatHub from '@/components/ChatHub'
import { SITE } from '@/config/site'
import { absoluteUrl } from '@/lib/utils'

// next/font self-hosts these at build time — no runtime request to Google Fonts,
// no render-blocking @import chain. Replaces the old globals.css @import.
const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-fraunces',
  display: 'swap',
})

const publicSans = Public_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-public-sans',
  display: 'swap',
})

// Only emit a verification tag once a real code replaces the [PENDING] placeholder —
// a placeholder value in a live <meta> tag would just be a broken verification claim.
const isLive = (v) => typeof v === 'string' && v.length > 0 && !v.startsWith('[')

const verification = {}
if (isLive(SITE.gscVerification)) verification.google = SITE.gscVerification
if (isLive(SITE.bingVerification)) verification.other = { 'msvalidate.01': SITE.bingVerification }

export const metadata = {
  metadataBase: new URL(absoluteUrl('/')),
  title: {
    default: `${SITE.name} — ${SITE.tagline}`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.brandStatement.slice(0, 155),
  openGraph: {
    type: 'website',
    siteName: SITE.name,
    title: SITE.name,
    description: SITE.brandStatement.slice(0, 155),
    url: absoluteUrl('/'),
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE.name,
    description: SITE.brandStatement.slice(0, 155),
  },
  alternates: { canonical: absoluteUrl('/') },
  ...(Object.keys(verification).length > 0 ? { verification } : {}),
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

const orgSchema = {
  '@context': 'https://schema.org',
  '@type': ['Store', 'Organization'],
  name: SITE.name,
  description: SITE.brandStatement,
  url: absoluteUrl('/'),
  foundingDate: String(SITE.foundingYear),
  areaServed: 'AU',
  priceRange: '$$',
  sameAs: SITE.sameAs,
}

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE.name,
  url: absoluteUrl('/'),
  potentialAction: {
    '@type': 'SearchAction',
    target: `${absoluteUrl('/search/')}?q={search_term_string}`,
    'query-input': 'required name=search_term_string',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang={SITE.locale} className={`${fraunces.variable} ${publicSans.variable}`}>
      <head>
        <script src="/js/webmcp.js" defer />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
      </head>
      <body>
        <a href="#main" className="skip-link">Skip to content</a>
        <Nav />
        <main id="main">{children}</main>
        <Footer />
        <ChatHub />
      </body>
    </html>
  )
}
