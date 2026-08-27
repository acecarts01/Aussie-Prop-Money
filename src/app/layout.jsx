import '../styles/globals.css'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import ChatHub from '@/components/ChatHub'
import { SITE } from '@/config/site'
import { absoluteUrl } from '@/lib/utils'

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
    <html lang={SITE.locale}>
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
