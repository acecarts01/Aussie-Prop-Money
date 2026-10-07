import { Archivo, Manrope } from 'next/font/google'
import '../styles/globals.css'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import ChatHub from '@/components/ChatHub'
import ActivityPop from '@/components/ActivityPop'
import Metadata from '@/components/Metadata'
import { SITE } from '@/config/site'
import { absoluteUrl, seoDescription } from '@/lib/utils'

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
  // Pages set complete titles via seoTitle() (≤60 chars) — no template suffix, so nothing doubles up.
  title: { default: `Prop Money Australia | ${SITE.name}`, template: '%s' },
  description: seoDescription(SITE.brandStatement),
  openGraph: {
    type: 'website',
    siteName: SITE.name,
    locale: 'en_AU',
    title: `Prop Money Australia | ${SITE.name}`,
    description: seoDescription(SITE.brandStatement),
    url: absoluteUrl('/'),
    images: [{ url: absoluteUrl('/og-default.jpg'), width: 1200, height: 630, alt: `${SITE.name} — studio-grade prop money, reduced-scale and marked NOT LEGAL TENDER` }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `Prop Money Australia | ${SITE.name}`,
    description: seoDescription(SITE.brandStatement),
    images: [absoluteUrl('/og-default.jpg')],
  },
  alternates: { canonical: absoluteUrl('/') },
  ...(Object.keys(verification).length > 0 ? { verification } : {}),
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }) {
  return (
    <html lang={SITE.locale} className={`${archivo.variable} ${manrope.variable}`}>
      <head>
        <script src="/js/webmcp.js" defer />
        <Metadata includeSiteSchemas={true} />
      </head>
      <body>
        <a href="#main" className="skip-link">Skip to content</a>
        <Nav />
        <main id="main">{children}</main>
        <Footer />
        <ChatHub />
        <ActivityPop />
      </body>
    </html>
  )
}
