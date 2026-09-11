import { Archivo, Manrope } from 'next/font/google'
import '../styles/globals.css'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import ChatHub from '@/components/ChatHub'
import { SITE } from '@/config/site'
import { absoluteUrl } from '@/lib/utils'

// next/font self-hosts these at build time — no runtime request to Google Fonts,
// no render-blocking @import chain.
// Archivo is a variable face with a width axis: headlines use it condensed
// (font-stretch in CSS) for the "production house" display voice.
const archivo = Archivo({
  subsets: ['latin'],
  axes: ['wdth'],
  variable: '--font-archivo',
  display: 'swap',
})

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
})

// Only emit a verification tag once a real code replaces the [PENDING] placeholder —
// a placeholder value in a live <meta> tag would just be a broken verification claim.
const isLive = (v) => typeof v === 'string' && v.length > 0 && !v.startsWith('[')
// Accepts a single token or an array of tokens (one per Google account owning the property).
const liveList = (v) => (Array.isArray(v) ? v : [v]).filter(isLive)

const verification = {}
const gsc = liveList(SITE.gscVerification)
if (gsc.length) verification.google = gsc.length === 1 ? gsc[0] : gsc
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
  legalName: SITE.legalName,
  foundingDate: String(SITE.foundingYear),
  foundingLocation: { '@type': 'Place', address: { '@type': 'PostalAddress', addressLocality: SITE.address.locality, addressRegion: SITE.address.region, postalCode: SITE.address.postcode, addressCountry: SITE.address.country } },
  address: { '@type': 'PostalAddress', addressLocality: SITE.address.locality, addressRegion: SITE.address.region, postalCode: SITE.address.postcode, addressCountry: SITE.address.country },
  email: SITE.email.replace('@', '&#64;'),
  telephone: SITE.phone,
  taxID: `ABN ${SITE.abn}`,
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
    <html lang={SITE.locale} className={`${archivo.variable} ${manrope.variable}`}>
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
