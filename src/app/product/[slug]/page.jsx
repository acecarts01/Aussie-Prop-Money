import { notFound } from 'next/navigation'
import ProductArt from '@/components/ProductArt'
import ProductCard from '@/components/ProductCard'
import AddToCartButton from '@/components/AddToCartButton'
import Breadcrumbs from '@/components/Breadcrumbs'
import { PRODUCTS, SITE } from '@/config/site'
import { getProduct, getCategory, relatedProducts, formatPrice, absoluteUrl } from '@/lib/utils'

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }))
}

export function generateMetadata({ params }) {
  const product = getProduct(params.slug)
  if (!product) return {}
  return {
    title: product.name,
    description: product.description.slice(0, 155),
    alternates: { canonical: absoluteUrl(`/product/${product.slug}/`) },
  }
}

export default function ProductPage({ params }) {
  const product = getProduct(params.slug)
  if (!product) notFound()
  const category = getCategory(product.category)
  const related = relatedProducts(product)

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    category: category?.name,
    brand: { '@type': 'Brand', name: SITE.name },
    image: absoluteUrl('/'),
    offers: {
      '@type': 'Offer',
      priceCurrency: SITE.currency,
      price: product.price,
      availability: 'https://schema.org/InStock',
      url: absoluteUrl(`/product/${product.slug}/`),
    },
  }

  return (
    <div className="container section">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <Breadcrumbs
        trail={[
          { label: 'Shop', href: '/shop/' },
          { label: category?.name || 'Shop', href: `/shop/${product.category}/` },
          { label: product.name, href: `/product/${product.slug}/` },
        ]}
      />

      <div className="grid grid-2" style={{ alignItems: 'start', gap: '2.5rem' }}>
        <div className="product-frame" style={{ borderRadius: 'var(--radius)', border: '1px solid var(--line)' }}>
          <ProductArt colorKey={category?.color} label={product.name.match(/\$\d+/)?.[0]} />
        </div>

        <div>
          {product.badge && <span className="product-badge" style={{ background: 'var(--ink)' }}>{product.badge}</span>}
          <h1 style={{ marginTop: '0.5rem' }}>{product.name}</h1>
          <p style={{ color: 'var(--ink-faint)' }}>{product.faceValueLabel}</p>
          <p className="product-price" style={{ fontSize: '1.6rem' }}>{formatPrice(product.price)}</p>
          <p>{product.description}</p>

          <div className="callout" style={{ margin: '1.25rem 0' }}>
            Reproduced to differ from genuine Australian currency by at least 25% in size, per RBA reproduction
            guidance. Clearly marked NOT LEGAL TENDER. For film, theatre, education, and novelty use only.
          </div>

          <AddToCartButton product={product} />
        </div>
      </div>

      {related.length > 0 && (
        <div style={{ marginTop: '3rem' }}>
          <h2 style={{ fontSize: '1.3rem' }}>You Might Also Like</h2>
          <div className="grid grid-4">
            {related.map((p) => <ProductCard key={p.slug} product={p} />)}
          </div>
        </div>
      )}
    </div>
  )
}
