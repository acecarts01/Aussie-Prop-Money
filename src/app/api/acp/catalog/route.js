import { PRODUCTS, CATEGORIES, SITE } from '@/config/site'

export async function GET() {
  const baseUrl = `https://${SITE.domain}`
  
  const catalog = CATEGORIES.map(c => ({
    ...c,
    url: `${baseUrl}/shop/${c.slug}/`,
    products: PRODUCTS.filter(p => p.category === c.slug).map(p => ({
      slug: p.slug,
      name: p.name,
      price: p.price,
      currency: SITE.currency,
      url: `${baseUrl}/product/${p.slug}/`
    }))
  }))

  return Response.json({
    catalog,
    currency: SITE.currency,
    minimumOrder: SITE.orderRules.minOrder,
    paymentMethods: SITE.paymentMethods || [],
  }, { 
    headers: { 
      'Access-Control-Allow-Origin': '*', 
      'Cache-Control': 'public, max-age=3600' 
    } 
  })
}
