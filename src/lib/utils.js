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

export function relatedProducts(product, count = 4) {
  return PRODUCTS.filter((p) => p.slug !== product.slug && p.category === product.category).slice(0, count)
}
