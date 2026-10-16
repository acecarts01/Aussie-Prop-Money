import { SITE, CATEGORIES, PRODUCTS, POSTS } from '@/config/site'

export default function sitemap() {
  const base = `https://${SITE.domain}`
  // Date the shop, category and page content last changed. Update it when that content changes; a build-time
  // value would tell crawlers every page changed on every deploy.
  const now = '2026-10-09'

  // /cart/ and /search/ are excluded — dynamic, personalised pages with no
  // fixed content of their own, not worth submitting to GSC/BWT as indexable URLs.
  const staticRoutes = [
    '/', '/shop/', '/wholesale/', '/about/', '/faq/', '/contact/', '/blog/',
    '/shipping/', '/refund/', '/privacy/', '/terms/',
  ].map((route) => ({ url: `${base}${route}`, lastModified: now, changeFrequency: 'weekly', priority: route === '/' ? 1.0 : 0.7 }))

  const img = (file) => `${base}/images/products/${file}`
  const categoryRoutes = CATEGORIES.map((c) => {
    const photo = PRODUCTS.find((p) => p.category === c.slug && p.images?.[0])?.images[0]
    return { url: `${base}/shop/${c.slug}/`, lastModified: now, changeFrequency: 'weekly', priority: 0.8, ...(photo ? { images: [img(photo)] } : {}) }
  })
  const productRoutes = PRODUCTS.map((p) => ({
    url: `${base}/product/${p.slug}/`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.9,
    ...(p.images?.length ? { images: p.images.map(img) } : {}),
  }))
  const postRoutes = POSTS.map((p) => ({ url: `${base}/blog/${p.slug}/`, lastModified: p.updated || p.date, changeFrequency: 'monthly', priority: 0.6 }))

  return [...staticRoutes, ...categoryRoutes, ...productRoutes, ...postRoutes]
}
