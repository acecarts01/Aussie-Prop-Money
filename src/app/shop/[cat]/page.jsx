import { notFound } from 'next/navigation'
import Link from 'next/link'
import ProductCard from '@/components/ProductCard'
import Breadcrumbs from '@/components/Breadcrumbs'
import PageHeader from '@/components/PageHeader'
import ComplianceBadge from '@/components/ComplianceBadge'
import { CATEGORIES, CATEGORY_KEYWORDS, CATEGORY_FAQS } from '@/config/site'
import { getCategory, productsIn, absoluteUrl, seoTitle, seoDescription, ogMeta, itemListSchema } from '@/lib/utils'

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ cat: c.slug }))
}

export function generateMetadata({ params }) {
  const category = getCategory(params.cat)
  if (!category) return {}
  const kw = CATEGORY_KEYWORDS[category.slug]
  return {
    title: seoTitle(`${category.name} — Prop Money Australia`),
    description: seoDescription(kw ? `${category.description} Covers ${kw.primary} and related styles.` : category.description),
    ...ogMeta(seoTitle(`${category.name} — Prop Money Australia`), `/shop/${category.slug}/`),
    alternates: { canonical: absoluteUrl(`/shop/${category.slug}/`) },
  }
}

export default function CategoryPage({ params }) {
  const category = getCategory(params.cat)
  if (!category) notFound()
  const products = productsIn(category.slug)
  const faqs = CATEGORY_FAQS[category.slug] || []

  const faqSchema = faqs.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  } : null

  return (
    <div>
      {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}
      {products.length > 0 && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema(products, `${category.name} — prop money`)) }} />}
      <PageHeader
        eyebrow="Shop"
        title={category.name}
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
          {faqs.length > 0 && (
            <div>
              <h2 style={{ fontSize: '1.4rem', marginBottom: '0.9rem' }}>Questions</h2>
              <div className="faq-list">
                {faqs.map((f) => (
                  <details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
