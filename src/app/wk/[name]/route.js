// Serves the extensionless .well-known documents (api-catalog, ucp, oauth-*, openid-configuration)
// with their correct Content-Type. Vercel's static CDN would otherwise send application/octet-stream.
// Reached only through the /.well-known/* rewrites in the generated vercel.json.
import WK from '@/generated/well-known.json'

export const dynamic = 'force-static'

export function generateStaticParams() {
  return Object.keys(WK).map((name) => ({ name }))
}

export function GET(_req, { params }) {
  const doc = WK[params.name]
  if (!doc) return new Response('Not found', { status: 404 })
  return new Response(doc.content, {
    headers: {
      'Content-Type': doc.type,
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'public, max-age=3600',
      'X-Robots-Tag': 'noindex',
    },
  })
}
