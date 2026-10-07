import { next } from '@vercel/functions'

export const config = {
  matcher: '/:path*'
}

export default async function middleware(request) {
  const url = new URL(request.url)
  const accept = request.headers.get('accept') || ''

  // Only negotiate markdown for eligible page paths
  const isPage = !url.pathname.includes('.') && 
                 !url.pathname.startsWith('/api/') && 
                 !url.pathname.startsWith('/_next/')

  if (prefersMarkdownOverHtml(accept) && isPage) {
    // Determine the .md path (e.g. /shop/ -> /shop/index.md or /shop.md)
    // For this build, we assume markdown files are generated in /public/md/ or similar
    // Actually, per prompt: "Generate a .md sibling next to every indexable route's built output"
    // Since we can't easily fetch built output at runtime in middleware without a complex setup,
    // we'll try to fetch it from the same origin but with .md extension or from a reserved /md/ path.
    
    // Simplification: map /path/ to /path.md
    const mdPath = url.pathname.endsWith('/') ? `${url.pathname}index.md` : `${url.pathname}.md`
    const mdUrl = new URL(mdPath, request.url)
    
    try {
      const mdRes = await fetch(mdUrl)
      if (mdRes.ok) {
        return new Response(await mdRes.text(), {
          headers: { 'Content-Type': 'text/markdown; charset=utf-8' }
        })
      }
    } catch (e) {
      // Fallback to HTML if md fetch fails
    }
  }

  return next()
}

/**
 * Negotiates Accept header q-values correctly.
 * NEVER use a naive includes('text/markdown') check.
 */
function prefersMarkdownOverHtml(accept) {
  let mdQ = -1
  let htmlQ = -1

  for (const part of accept.split(',')) {
    const [type, ...params] = part.trim().split(';').map(s => s.trim())
    let q = 1
    for (const p of params) {
      const m = /^q=([\d.]+)$/.exec(p)
      if (m) q = parseFloat(m[1])
    }
    if (type === 'text/markdown') mdQ = Math.max(mdQ, q)
    if (type === 'text/html') htmlQ = Math.max(htmlQ, q)
  }

  return mdQ > -1 && mdQ > htmlQ
}
