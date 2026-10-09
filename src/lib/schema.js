import { SITE, CATEGORIES } from '@/config/site'
import { absoluteUrl } from './utils'

// Stable entity ids. Every page-level node points at these instead of repeating the business details,
// so crawlers and answer engines resolve one organisation, one website and one logo.
export const ids = {
  org: absoluteUrl('/#organization'),
  website: absoluteUrl('/#website'),
  logo: absoluteUrl('/#logo'),
}

const ref = (id) => ({ '@id': id })
const cleanNumber = (s) => parseInt(String(s).replace(/\D/g, ''), 10)

// Person node, emitted only when real editor details are filled in SITE.editor.
// Shape: { name, jobTitle, url, sameAs: [real profile URLs], knowsAbout: [...] }
export function personNode(editor = SITE.editor) {
  if (!editor?.name) return null
  return {
    '@type': 'Person',
    '@id': absoluteUrl('/#editor'),
    name: editor.name,
    ...(editor.jobTitle ? { jobTitle: editor.jobTitle } : {}),
    ...(editor.url ? { url: editor.url } : {}),
    ...(editor.sameAs?.length ? { sameAs: editor.sameAs } : {}),
    ...(editor.knowsAbout?.length ? { knowsAbout: editor.knowsAbout } : {}),
    worksFor: ref(ids.org),
  }
}

export function orgNode() {
  const geo = SITE.geo ? { geo: { '@type': 'GeoCoordinates', latitude: SITE.geo.lat, longitude: SITE.geo.lng } } : {}
  const maps = SITE.mapsCid ? { hasMap: `https://www.google.com/maps?cid=${SITE.mapsCid}` } : {}
  return {
    '@type': ['Organization', 'LocalBusiness', 'Store'],
    '@id': ids.org,
    name: SITE.name,
    legalName: SITE.legalName,
    url: absoluteUrl('/'),
    description: 'Australian Reserve Props sells reduced-scale, Australian-styled prop money for film, theatre, content, education and gifting, shipped Australia-wide. Every product is marked NOT LEGAL TENDER.',
    logo: { '@type': 'ImageObject', '@id': ids.logo, url: absoluteUrl('/icon.png'), contentUrl: absoluteUrl('/icon.png'), width: 512, height: 512 },
    image: absoluteUrl('/og-default.jpg'),
    foundingDate: String(SITE.foundingYear),
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITE.address.street,
      addressLocality: SITE.address.locality,
      addressRegion: SITE.address.region,
      postalCode: SITE.address.postcode,
      addressCountry: SITE.address.country,
    },
    ...geo,
    ...maps,
    telephone: SITE.phone,
    openingHoursSpecification: SITE.hours.map((h) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: h.days.map((d) => `https://schema.org/${d}`),
      opens: h.opens,
      closes: h.closes,
    })),
    contactPoint: [{ '@type': 'ContactPoint', contactType: 'customer service', telephone: SITE.phone, areaServed: 'AU', availableLanguage: 'en-AU' }],
    taxID: `ABN ${SITE.abn}`,
    identifier: { '@type': 'PropertyValue', propertyID: 'ABN', value: SITE.abn.replace(/\s/g, '') },
    areaServed: { '@type': 'Country', name: 'Australia' },
    priceRange: '$$',
    currenciesAccepted: SITE.currency,
    paymentAccepted: 'PayID, Osko bank transfer, cryptocurrency',
    knowsAbout: ['Prop money', 'Australian banknote reproduction rules', 'Film and theatre props', 'Novelty currency', 'Educational play money'],
    sameAs: SITE.sameAs,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: SITE.trustpilotRating,
      bestRating: 5,
      worstRating: 1,
      ratingCount: cleanNumber(SITE.reviewCount),
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `${SITE.name} product range`,
      itemListElement: CATEGORIES.map((c) => ({ '@type': 'OfferCatalog', name: c.name, url: absoluteUrl(`/shop/${c.slug}/`) })),
    },
  }
}

export function websiteNode() {
  return {
    '@type': 'WebSite',
    '@id': ids.website,
    url: absoluteUrl('/'),
    name: SITE.name,
    inLanguage: 'en-AU',
    publisher: ref(ids.org),
    potentialAction: {
      '@type': 'SearchAction',
      target: { '@type': 'EntryPoint', urlTemplate: `${absoluteUrl('/search/')}?q={search_term_string}` },
      'query-input': 'required name=search_term_string',
    },
  }
}

// One @graph carried on every page: organisation, website and (when real details exist) the editor.
export const siteGraph = {
  '@context': 'https://schema.org',
  '@graph': [orgNode(), websiteNode(), personNode()].filter(Boolean),
}

export function webPageNode({ path, name, description, type = 'WebPage', about, image }) {
  const url = absoluteUrl(path)
  return {
    '@type': type,
    '@id': `${url}#webpage`,
    url,
    name,
    ...(description ? { description } : {}),
    inLanguage: 'en-AU',
    isPartOf: ref(ids.website),
    publisher: ref(ids.org),
    ...(about ? { about: ref(about) } : {}),
    ...(image ? { primaryImageOfPage: { '@type': 'ImageObject', url: image } } : {}),
  }
}

export const graphOf = (...nodes) => ({ '@context': 'https://schema.org', '@graph': nodes.filter(Boolean) })
export { ref as idRef }
