import { notFound } from 'next/navigation'
import ProductCard from '@/components/ProductCard'
import Breadcrumbs from '@/components/Breadcrumbs'
import PageHeader from '@/components/PageHeader'
import { CATEGORIES, NOTE_COLORS, CATEGORY_KEYWORDS, CATEGORY_FAQS } from '@/config/site'
import { getCategory, productsIn, absoluteUrl } from '@/lib/utils'

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ cat: c.slug }))
}

export function generateMetadata({ params }) {
  const category = getCategory(params.cat)
  if (!category) return {}
  const kw = CATEGORY_KEYWORDS[category.slug]
  return {
    title: `${category.name} — Prop Money Australia`,
    description: kw ? `${category.description} Covers ${kw.primary} and related styles.` : category.description,
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
      <PageHeader
        eyebrow="Shop"
        title={category.name}
        subtitle={category.description}
        accent={NOTE_COLORS[category.color]}
        breadcrumbs={<Breadcrumbs trail={[{ label: 'Shop', href: '/shop/' }, { label: category.name, href: `/shop/${category.slug}/` }]} />}
      />

      <div className="container section">
        {products.length > 0 ? (
          <div className="grid grid-4">
            {products.map((p) => <ProductCard key={p.slug} product={p} />)}
          </div>
        ) : (
          <p>No products in this category yet — check back soon.</p>
        )}

        {faqs.length > 0 && (
          <div style={{ marginTop: '3rem', maxWidth: '640px' }}>
            <h2 style={{ fontSize: '1.2rem' }}>Frequently Asked Questions</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '1rem' }}>
              {faqs.map((f) => (
                <details key={f.q} className="callout">
                  <summary style={{ fontWeight: 600, cursor: 'pointer' }}>{f.q}</summary>
                  <p style={{ marginTop: '0.6rem', marginBottom: 0 }}>{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
