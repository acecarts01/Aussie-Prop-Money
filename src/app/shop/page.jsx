import Link from 'next/link'
import ProductCard from '@/components/ProductCard'
import Breadcrumbs from '@/components/Breadcrumbs'
import PageHeader from '@/components/PageHeader'
import { CATEGORIES, PRODUCTS, NOTE_COLORS } from '@/config/site'
import { absoluteUrl } from '@/lib/utils'

export const metadata = {
  title: 'Shop Prop Money Australia — All Denominations',
  description: 'Browse Australian prop money by denomination, pack size, and use case — all five note values, plus packs, kids play money, gifts, and accessories.',
  alternates: { canonical: absoluteUrl('/shop/') },
}

export default function ShopPage() {
  return (
    <div>
      <PageHeader
        eyebrow="The Full Range"
        title="Shop Prop Money Australia"
        subtitle="Every category below ships Australia-wide. Reproductions follow RBA reproduction guidance and are clearly marked NOT LEGAL TENDER."
        breadcrumbs={<Breadcrumbs trail={[{ label: 'Shop', href: '/shop/' }]} />}
      />

      <div className="container section">
        <div className="chip-row" style={{ margin: '0 0 1.5rem' }}>
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
    </div>
  )
}
