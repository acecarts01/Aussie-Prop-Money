import { SITE, CATEGORIES, PRODUCTS, POSTS } from '@/config/site'

export default function sitemap() {
  const base = `https://${SITE.domain}`
  const now = new Date().toISOString()

  // /cart/ and /search/ are excluded — dynamic, personalised pages with no
  // fixed content of their own, not worth submitting to GSC/BWT as indexable URLs.
  const staticRoutes = [
    '/', '/shop/', '/wholesale/', '/about/', '/faq/', '/contact/', '/blog/',
    '/shipping/', '/refund/', '/privacy/', '/terms/',
  ].map((route) => ({ url: `${base}${route}`, lastModified: now }))

  const categoryRoutes = CATEGORIES.map((c) => ({ url: `${base}/shop/${c.slug}/`, lastModified: now }))
  const productRoutes = PRODUCTS.map((p) => ({ url: `${base}/product/${p.slug}/`, lastModified: now }))
  const postRoutes = POSTS.map((p) => ({ url: `${base}/blog/${p.slug}/`, lastModified: p.date }))

  return [...staticRoutes, ...categoryRoutes, ...productRoutes, ...postRoutes]
}
