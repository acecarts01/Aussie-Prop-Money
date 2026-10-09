import { PRODUCTS, CATEGORIES, SITE } from '@/config/site'
import { absoluteUrl } from '@/lib/utils'

export const dynamic = 'force-static'

// Google Merchant Center product feed (RSS 2.0). It is generated from the catalogue so it can never drift from the
// shop. It is NOT submitted anywhere: Merchant Center support should confirm prop money is eligible before an
// account is created or this URL is registered (see docs/keyword-map.md).
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
const money = (n) => `${Number(n).toFixed(2)} ${SITE.currency}`
const clip = (s, n) => (s.length > n ? s.slice(0, n - 1).replace(/\s+\S*$/, '') + '…' : s)
const TOYS = new Set(['kids-play-money', 'accessories'])

export function GET() {
  const items = PRODUCTS.filter((p) => p.images?.[0]).map((p) => {
    const cat = CATEGORIES.find((c) => c.slug === p.category)
    const google = TOYS.has(p.category) ? 'Toys &amp; Games' : 'Arts &amp; Entertainment &gt; Party &amp; Celebration'
    return `    <item>
      <g:id>${esc(p.slug)}</g:id>
      <title>${esc(clip(p.name, 150))}</title>
      <description>${esc(clip(p.description.replace(/\s+/g, ' ').trim(), 4900))}</description>
      <link>${absoluteUrl(`/product/${p.slug}/`)}</link>
      <g:image_link>${absoluteUrl(`/images/products/${p.images[0]}`)}</g:image_link>
      <g:availability>in_stock</g:availability>
      <g:price>${money(p.price)}</g:price>
      <g:condition>new</g:condition>
      <g:brand>${esc(SITE.name)}</g:brand>
      <g:identifier_exists>no</g:identifier_exists>
      <g:product_type>${esc(cat?.name || 'Prop money')}</g:product_type>
      <g:google_product_category>${google}</g:google_product_category>
      <g:shipping>
        <g:country>AU</g:country>
        <g:service>Australia Post tracked</g:service>
        <g:price>${money(0)}</g:price>
      </g:shipping>
    </item>`
  })

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss xmlns:g="http://base.google.com/ns/1.0" version="2.0">
  <channel>
    <title>${esc(SITE.name)}</title>
    <link>${absoluteUrl('/')}</link>
    <description>${esc(SITE.name)} product feed</description>
${items.join('\n')}
  </channel>
</rss>
`
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8', 'X-Robots-Tag': 'noindex' } })
}
