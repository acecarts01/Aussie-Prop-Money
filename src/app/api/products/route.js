// Read-only public product catalogue for agents and integrations (advertised in auth.md,
// api-catalog and the MCP server card). Static at build time — no server state, no mutations.
import { SITE, CATEGORIES, PRODUCTS, ORDER, PAYMENT_METHODS } from '@/config/site'

export const dynamic = 'force-static'

export function GET() {
  const base = `https://${SITE.domain}`
  const body = {
    site: SITE.name,
    currency: SITE.currency,
    minimum_order: SITE.orderRules.minOrder,
    shipping: 'free, Australia only',
    payment_methods: PAYMENT_METHODS.map((m) => m.label),
    crypto_discount: ORDER.cryptoDiscount,
    compliance: 'Reduced-scale (≥25% size difference from genuine AUD notes), marked NOT LEGAL TENDER, no replicated security features. Film, theatre, education and novelty use only.',
    categories: CATEGORIES.map((c) => ({ slug: c.slug, name: c.name, url: `${base}/shop/${c.slug}/` })),
    products: PRODUCTS.map((p) => ({
      slug: p.slug,
      name: p.name,
      category: p.category,
      price: p.price,
      note_count: p.noteCount ?? null,
      prop_face_value: p.faceValue ?? null,
      url: `${base}/product/${p.slug}/`,
      image: p.images?.[0] ? `${base}/images/products/${p.images[0]}` : null,
    })),
  }
  return Response.json(body, {
    headers: { 'Access-Control-Allow-Origin': '*', 'Cache-Control': 'public, max-age=3600' },
  })
}
