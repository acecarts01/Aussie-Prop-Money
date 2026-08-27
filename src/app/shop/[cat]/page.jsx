import { notFound } from 'next/navigation'
import ProductCard from '@/components/ProductCard'
import Breadcrumbs from '@/components/Breadcrumbs'
import { CATEGORIES } from '@/config/site'
import { getCategory, productsIn, absoluteUrl } from '@/lib/utils'

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ cat: c.slug }))
}

export function generateMetadata({ params }) {
  const category = getCategory(params.cat)
  if (!category) return {}
  return {
    title: `${category.name} — Prop Money Australia`,
    description: category.description,
    alternates: { canonical: absoluteUrl(`/shop/${category.slug}/`) },
  }
}

export default function CategoryPage({ params }) {
  const category = getCategory(params.cat)
  if (!category) notFound()
  const products = productsIn(category.slug)

  return (
    <div className="container section">
      <Breadcrumbs trail={[{ label: 'Shop', href: '/shop/' }, { label: category.name, href: `/shop/${category.slug}/` }]} />
      <h1>{category.name}</h1>
      <p style={{ maxWidth: '60ch', color: 'var(--ink-soft)' }}>{category.description}</p>

      {products.length > 0 ? (
        <div className="grid grid-4" style={{ marginTop: '1.5rem' }}>
          {products.map((p) => <ProductCard key={p.slug} product={p} />)}
        </div>
      ) : (
        <p>No products in this category yet — check back soon.</p>
      )}
    </div>
  )
}
