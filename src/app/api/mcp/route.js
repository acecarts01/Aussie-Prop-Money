import { PRODUCTS, CATEGORIES, SITE, SHOP, FAQ, COMPLIANCE } from '@/config/site'

const baseUrl = `https://${SITE.domain}`

export async function POST(req) {
  try {
    const body = await req.json()
    const { method, params, id } = body

    // Standard MCP Response helper
    const response = (result) => Response.json({ jsonrpc: '2.0', id, result }, { 
      headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' } 
    })

    // Standard MCP Error helper
    const error = (code, message) => Response.json({ jsonrpc: '2.0', id, error: { code, message } }, { status: 400 })

    switch (method) {
      case 'initialize':
        return response({
          protocolVersion: '2024-11-05',
          capabilities: {
            tools: {},
            resources: {}
          },
          serverInfo: {
            name: SITE.name,
            version: '1.0.0'
          }
        })

      case 'tools/list':
        return response({
          tools: [
            {
              name: 'search_products',
              description: 'Search Australian prop money products by keyword, category, or max price.',
              inputSchema: {
                type: 'object',
                properties: {
                  query: { type: 'string' },
                  category: { type: 'string' },
                  max_price: { type: 'number' }
                }
              }
            },
            {
              name: 'get_product',
              description: 'Get full product details by slug.',
              inputSchema: {
                type: 'object',
                required: ['slug'],
                properties: {
                  slug: { type: 'string' }
                }
              }
            },
            {
              name: 'list_categories',
              description: 'List all prop money categories.',
              inputSchema: { type: 'object', properties: {} }
            },
            {
              name: 'get_policies',
              description: 'Get shipping, payment, and returns policies.',
              inputSchema: { type: 'object', properties: {} }
            }
          ]
        })

      case 'tools/call':
        const { name, arguments: args } = params
        if (name === 'search_products') {
          const q = args.query?.toLowerCase() || ''
          const cat = args.category
          const max = args.max_price
          const matches = PRODUCTS.filter(p => {
            const mQ = !q || p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
            const mC = !cat || p.category === cat
            const mP = !max || p.price <= max
            return mQ && mC && mP
          }).map(p => ({
            name: p.name,
            price: `${SITE.currency} ${p.price}`,
            category: p.category,
            url: `${baseUrl}/product/${p.slug}/`
          }))
          return response({ content: [{ type: 'text', text: JSON.stringify(matches, null, 2) }] })
        }

        if (name === 'get_product') {
          const p = PRODUCTS.find(p => p.slug === args.slug)
          if (!p) return error(-32602, 'Product not found')
          return response({ 
            content: [{ 
              type: 'text', 
              text: JSON.stringify({
                ...p,
                url: `${baseUrl}/product/${p.slug}/`
              }, null, 2) 
            }] 
          })
        }

        if (name === 'list_categories') {
          return response({ content: [{ type: 'text', text: JSON.stringify(CATEGORIES, null, 2) }] })
        }

        if (name === 'get_policies') {
          return response({ 
            content: [{ 
              type: 'text', 
              text: JSON.stringify({
                shipping: SITE.orderRules,
                payment: SITE.paymentMethods || [],
                compliance: COMPLIANCE
              }, null, 2) 
            }] 
          })
        }

        return error(-32601, `Method not found: ${name}`)

      case 'resources/list':
        return response({
          resources: [
            { name: 'product-catalog', uri: `${baseUrl}/shop/`, mimeType: 'text/html' },
            { name: 'wholesale', uri: `${baseUrl}/wholesale/`, mimeType: 'text/html' },
            { name: 'blog', uri: `${baseUrl}/blog/`, mimeType: 'text/html' }
          ]
        })

      default:
        return error(-32601, `Method not found: ${method}`)
    }
  } catch (err) {
    return Response.json({ jsonrpc: '2.0', error: { code: -32700, message: 'Parse error' } }, { status: 400 })
  }
}

export async function OPTIONS() {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Accept, Mcp-Session-Id'
    }
  })
}
