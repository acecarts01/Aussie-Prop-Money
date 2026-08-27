import Link from 'next/link'
import ProductCard from '@/components/ProductCard'
import Breadcrumbs from '@/components/Breadcrumbs'
import { CATEGORIES, PRODUCTS, NOTE_COLORS } from '@/config/site'
import { absoluteUrl } from '@/lib/utils'

export const metadata = {
  title: 'Shop Prop Money Australia — All Denominations',
  description: 'Browse Australian prop money by denomination, pack size, and use case — all five note values, plus packs, kids play money, gifts, and accessories.',
  alternates: { canonical: absoluteUrl('/shop/') },
}

export default function ShopPage() {
  return (
    <div className="container section">
      <Breadcrumbs trail={[{ label: 'Shop', href: '/shop/' }]} />
      <h1>Shop Prop Money Australia</h1>
      <p style={{ maxWidth: '60ch', color: 'var(--ink-soft)' }}>
        Every category below ships Australia-wide. Reproductions follow RBA reproduction guidance and are clearly
        marked NOT LEGAL TENDER.
      </p>

      <div className="chip-row" style={{ margin: '1.5rem 0' }}>
        {CATEGORIES.map((c) => (
          <Link key={c.slug} href={`/shop/${c.slug}/`} className="chip" style={{ textDecoration: 'none', borderColor: NOTE_COLORS[c.color] }}>
            {c.name}
          </Link>
        ))}
      </div>

      <div className="grid grid-4">
        {PRODUCTS.map((p) => <ProductCard key={p.slug} product={p} />)}
      </div>
    </div>
  )
}
