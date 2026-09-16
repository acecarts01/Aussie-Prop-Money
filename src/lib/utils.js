import { CATEGORIES, PRODUCTS, SITE } from '@/config/site'

export function getCategory(slug) {
  return CATEGORIES.find((c) => c.slug === slug) || null
}

export function getProduct(slug) {
  return PRODUCTS.find((p) => p.slug === slug) || null
}

export function productsIn(categorySlug) {
  return PRODUCTS.filter((p) => p.category === categorySlug)
}

export function formatPrice(amount) {
  return new Intl.NumberFormat('en-AU', {
    style: 'currency',
    currency: SITE.currency,
    minimumFractionDigits: 2,
  }).format(amount)
}

export function absoluteUrl(path = '/') {
  const clean = path.startsWith('/') ? path : `/${path}`
  return `https://${SITE.domain}${clean}`
}

// Placeholder-art label only (see ProductArt) — real photos replace this entirely.
export function artLabelFor(product) {
  const dollarMatch = product.name.match(/\$\d+/)
  if (dollarMatch) return dollarMatch[0]
  return product.name.split(' ')[0].toUpperCase().slice(0, 10)
}

// ---- SEO helpers (audit 2026-09-16) ----
// Title ≤ 60 chars: full brand suffix when it fits, short suffix when it doesn't, bare otherwise.
export function seoTitle(base) {
  const b = String(base).trim()
  if (b.length + 3 + SITE.name.length <= 60) return `${b} | ${SITE.name}`
  if (b.length + 6 <= 60) return `${b} | ARP`
  return b.length <= 60 ? b : b.slice(0, 57).replace(/\s+\S*$/, '') + '…'
}

const DESC_TAIL = ['Reduced-scale, marked NOT LEGAL TENDER.', 'Ships Australia-wide.', 'Registered Australian company.']
// Description in the 120–158 band: trim long copy at a word boundary; pad short copy with whole brand sentences.
export function seoDescription(text) {
  let d = String(text || '').replace(/\s+/g, ' ').trim()
  if (d.length > 158) d = d.slice(0, 155).replace(/\s+\S*$/, '').replace(/[,;:—-]$/, '') + '…'
  if (d.length < 120) {
    if (!/[.!?…]$/.test(d)) d += '.'
    for (const t of DESC_TAIL) { if (d.length + 1 + t.length <= 158) d += ' ' + t; else break }
  }
  return d
}

// Open Graph + Twitter blocks for a page. Next replaces (does not merge) the layout's openGraph
// when a page sets its own, so every page passes through here to keep the default image.
export function ogMeta(title, path, image, extra = {}) {
  const img = image || { url: absoluteUrl('/og-default.jpg'), width: 1200, height: 630, alt: `${SITE.name} — studio-grade prop money` }
  return {
    openGraph: { type: 'website', siteName: SITE.name, locale: 'en_AU', title, url: absoluteUrl(path), images: [img], ...extra },
    twitter: { card: 'summary_large_image', title, images: [img.url] },
  }
}

export function relatedProducts(product, count = 4) {
  return PRODUCTS.filter((p) => p.slug !== product.slug && p.category === product.category).slice(0, count)
}

// ItemList of product pages for shop/category listings — tells crawlers which products the
// listing contains and in what order, without repeating full Product entities off their own page.
export function itemListSchema(products, name) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name,
    numberOfItems: products.length,
    itemListElement: products.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: p.name,
      url: absoluteUrl(`/product/${p.slug}/`),
    })),
  }
}
