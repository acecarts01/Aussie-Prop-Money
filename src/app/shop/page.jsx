import Link from 'next/link'
import ProductCard from '@/components/ProductCard'
import Breadcrumbs from '@/components/Breadcrumbs'
import PageHeader from '@/components/PageHeader'
import { CATEGORIES, NOTE_COLORS } from '@/config/site'
import { productsIn, absoluteUrl } from '@/lib/utils'

export const metadata = {
  title: 'Shop Prop Money Australia — All Denominations',
  description: 'Browse Australian prop money by denomination, pack size, and use case — $20, $50, and $100 notes, plus vintage notes, briefcases, prop coins, confetti, display sets, personalised gifts, kids play money, and accessories.',
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
        <div className="chip-row" style={{ margin: '0 0 2.5rem' }}>
          {CATEGORIES.map((c) => (
            <a key={c.slug} href={`#${c.slug}`} className="chip" style={{ textDecoration: 'none', borderColor: NOTE_COLORS[c.color] }}>
              {c.name}
            </a>
          ))}
        </div>

        {CATEGORIES.map((category) => {
          const products = productsIn(category.slug)
          if (products.length === 0) return null
          return (
            <div key={category.slug} id={category.slug} style={{ marginBottom: '3rem', scrollMarginTop: '5rem' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: '1rem', marginBottom: '1rem', borderTop: `3px solid ${NOTE_COLORS[category.color]}`, paddingTop: '1rem' }}>
                <div>
                  <h2 style={{ fontSize: '1.3rem', margin: 0 }}>{category.name}</h2>
                  <p style={{ margin: '0.2rem 0 0', fontSize: '0.85rem', color: 'var(--ink-faint)', maxWidth: '60ch' }}>{category.description}</p>
                </div>
                <Link href={`/shop/${category.slug}/`} style={{ fontSize: '0.85rem', fontWeight: 700, whiteSpace: 'nowrap' }}>View all →</Link>
              </div>
              <div className="grid grid-4">
                {products.map((p) => <ProductCard key={p.slug} product={p} />)}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
