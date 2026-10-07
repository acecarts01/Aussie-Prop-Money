import { SITE } from '@/config/site'

export async function GET() {
  const baseUrl = `https://${SITE.domain}`
  
  const services = [
    { 
      id: 'product-catalog', 
      type: 'catalog', 
      url: `${baseUrl}/shop/`, 
      description: 'Full product catalog of Australian prop money' 
    },
    { 
      id: 'mcp-server', 
      type: 'mcp', 
      url: `${baseUrl}/api/mcp`, 
      description: 'MCP Streamable HTTP server for live agent interaction' 
    },
    { 
      id: 'wholesale', 
      type: 'b2b', 
      url: `${baseUrl}/wholesale/`, 
      description: 'Wholesale pricing and bulk ordering for productions' 
    }
  ]

  return Response.json({
    ucp: '1.0',
    services,
    capabilities: ['browse', 'search', 'inquiry', 'wholesale', 'mcp']
  }, { 
    headers: { 
      'Access-Control-Allow-Origin': '*', 
      'Cache-Control': 'public, max-age=3600' 
    } 
  })
}
