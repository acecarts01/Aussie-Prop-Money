import Link from 'next/link'
import ProductCard from '@/components/ProductCard'
import Breadcrumbs from '@/components/Breadcrumbs'
import PageHeader from '@/components/PageHeader'
import ComplianceBadge from '@/components/ComplianceBadge'
import { CATEGORIES } from '@/config/site'
import { productsIn, absoluteUrl } from '@/lib/utils'

export const metadata = {
  title: 'Buy Prop Money Australia — Full Range | Australian Reserve Props',
  description: 'Screen-ready prop money by denomination, bundle size and use case — $20, $50 and $100 stacks, briefcase sets, bulk production packs, party and content props. Ships Australia-wide.',
  alternates: { canonical: absoluteUrl('/shop/') },
}

export default function ShopPage() {
  return (
    <div>
      <PageHeader
        eyebrow="The full range"
        title="Buy prop money Australia — full range"
        subtitle="Every stack, set and pack we make, grouped by how it gets used. All reduced-scale, all marked NOT LEGAL TENDER, all from one registered Australian company."
        breadcrumbs={<Breadcrumbs trail={[{ label: 'Shop', href: '/shop/' }]} />}
      />

      <div className="container section-tight">
        <nav aria-label="Categories" className="chip-row">
          {CATEGORIES.map((c) => (
            <a key={c.slug} href={`#${c.slug}`} className="chip">{c.name}</a>
          ))}
        </nav>
      </div>

      <div className="container">
        {CATEGORIES.map((category, i) => {
          const products = productsIn(category.slug)
          if (products.length === 0) return null
          return (
            <section key={category.slug} id={category.slug} className="section-tight" style={{ scrollMarginTop: '6rem', borderTop: i === 0 ? 0 : '1px solid var(--line)' }}>
              <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '1rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
                <div style={{ maxWidth: '62ch' }}>
                  <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', margin: 0 }}>{category.name}</h2>
                  <p style={{ margin: '0.5rem 0 0', color: 'var(--ink-2)' }}>{category.description}</p>
                </div>
                <Link href={`/shop/${category.slug}/`} className="btn btn-ghost">View category →</Link>
              </div>
              <div className="grid grid-4">
                {products.map((p) => <ProductCard key={p.slug} product={p} />)}
              </div>
            </section>
          )
        })}
      </div>

      <section className="section surface-2">
        <div className="container" style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', alignItems: 'center', justifyContent: 'space-between' }}>
          <ComplianceBadge size="lg" />
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <Link href="/blog/prop-money-buying-guide-for-australian-filmmakers/" className="btn btn-outline">Buying guide</Link>
            <Link href="/faq/" className="btn btn-outline">Legal &amp; FAQ</Link>
            <Link href="/wholesale/" className="btn btn-accent">Production &amp; wholesale</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
