import { notFound } from 'next/navigation'
import ProductCard from '@/components/ProductCard'
import Breadcrumbs from '@/components/Breadcrumbs'
import PageHeader from '@/components/PageHeader'
import { CATEGORIES, NOTE_COLORS } from '@/config/site'
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
    <div>
      <PageHeader
        eyebrow="Shop by Denomination"
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
      </div>
    </div>
  )
}
