import { PRODUCTS, POSTS, CATEGORIES } from '@/config/site'

export async function GET(req) {
  const { searchParams } = new URL(req.url)
  const q = searchParams.get('q')?.toLowerCase() || ''

  if (!q) {
    return Response.json({ products: [], posts: [], categories: [] })
  }

  const products = PRODUCTS.filter(p => 
    p.name.toLowerCase().includes(q) || 
    p.category.toLowerCase().includes(q) ||
    p.tags?.some(t => t.toLowerCase().includes(q)) ||
    p.description.toLowerCase().includes(q)
  ).slice(0, 10)

  const posts = POSTS.filter(p => 
    p.title.toLowerCase().includes(q) || 
    p.excerpt.toLowerCase().includes(q) ||
    p.tags?.some(t => t.toLowerCase().includes(q))
  ).slice(0, 5)

  const categories = CATEGORIES.filter(c => 
    c.name.toLowerCase().includes(q) || 
    c.description.toLowerCase().includes(q)
  ).slice(0, 5)

  return Response.json({
    products,
    posts,
    categories,
    query: q
  }, {
    headers: {
      'Cache-Control': 'public, max-age=3600',
      'Access-Control-Allow-Origin': '*'
    }
  })
}
