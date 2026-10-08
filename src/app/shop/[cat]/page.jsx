import { notFound } from 'next/navigation'
import Link from 'next/link'
import ProductCard from '@/components/ProductCard'
import Breadcrumbs from '@/components/Breadcrumbs'
import PageHeader from '@/components/PageHeader'
import ComplianceBadge from '@/components/ComplianceBadge'
import FaqBlock from '@/components/FaqBlock'
import Metadata from '@/components/Metadata'
import { CATEGORIES, BRANDS, CATEGORY_KEYWORDS, CATEGORY_FAQS } from '@/config/site'
import { getCategory, productsIn, absoluteUrl, seoTitle, seoDescription, ogMeta, itemListSchema, formatPriceShort } from '@/lib/utils'

export function generateStaticParams() {
  const cats = CATEGORIES.map((c) => ({ cat: c.slug }))
  const brands = BRANDS.map((b) => ({ cat: b.slug }))
  return [...cats, ...brands]
}

export function generateMetadata({ params }) {
  const category = getCategory(params.cat)
  if (!category) return {}
  const kw = CATEGORY_KEYWORDS[category.slug]
  const prices = productsIn(category.slug).map((p) => p.price)
  const from = prices.length ? formatPriceShort(Math.min(...prices)) : ''
  const title = kw?.title || seoTitle(`Buy ${category.name} | Prop Money Australia`)
  return {
    title,
    description: seoDescription(kw ? kw.desc.replace('{from}', from) : category.description),
    ...ogMeta(title, `/shop/${category.slug}/`),
    alternates: { canonical: absoluteUrl(`/shop/${category.slug}/`) },
  }
}

export default function CategoryPage({ params }) {
  const category = getCategory(params.cat)
  if (!category) notFound()
  const products = productsIn(category.slug)
  const faqs = CATEGORY_FAQS[category.slug] || []

  return (
    <div>
      <Metadata schemas={products.length > 0 ? [itemListSchema(products, `${category.name} — prop money`)] : []} />
      <PageHeader
        eyebrow="Shop"
        title={CATEGORY_KEYWORDS[category.slug]?.title.split(' | ')[0] || category.name}
        subtitle={category.description}
        breadcrumbs={<Breadcrumbs trail={[{ label: 'Shop', href: '/shop/' }, { label: category.name, href: `/shop/${category.slug}/` }]} />}
      />

      <div className="container section-tight">
        <nav aria-label="Categories" className="chip-row">
          {CATEGORIES.map((c) => (
            <Link key={c.slug} href={`/shop/${c.slug}/`} className="chip" aria-current={c.slug === category.slug ? 'page' : undefined}>{c.name}</Link>
          ))}
        </nav>
      </div>

      <div className="container section-tight">
        {products.length > 0 ? (
          <div className="grid grid-4">
            {products.map((p, i) => <ProductCard key={p.slug} product={p} priority={i < 2} />)}
          </div>
        ) : (
          <p>No products in this category yet — check back soon.</p>
        )}
      </div>

      <section className="section surface-2">
        <div className="container grid grid-2" style={{ alignItems: 'start' }}>
          <div>
            <h2 style={{ fontSize: '1.4rem', marginBottom: '0.9rem' }}>Before you order</h2>
            <ComplianceBadge size="lg" />
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginTop: '1.25rem' }}>
              <Link href="/blog/prop-money-buying-guide-for-australian-filmmakers/" className="btn btn-outline">Buying guide</Link>
              <Link href="/wholesale/" className="btn btn-ghost">Production volume →</Link>
            </div>
          </div>
          <FaqBlock faqs={faqs} title="Questions" />
        </div>
      </section>
    </div>
  )
}
