import { notFound } from 'next/navigation'
import Image from 'next/image'
import ProductArt from '@/components/ProductArt'
import ProductCard from '@/components/ProductCard'
import AddToCartButton from '@/components/AddToCartButton'
import Breadcrumbs from '@/components/Breadcrumbs'
import ValueTable from '@/components/ValueTable'
import SubmitSetReport from '@/components/SubmitSetReport'
import { PRODUCTS, SITE, CATEGORY_KEYWORDS, CATEGORY_FAQS } from '@/config/site'
import { getProduct, getCategory, relatedProducts, formatPrice, absoluteUrl, artLabelFor } from '@/lib/utils'

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }))
}

export function generateMetadata({ params }) {
  const product = getProduct(params.slug)
  if (!product) return {}
  const photo = product.images?.[0]
  return {
    title: product.name,
    description: product.description.slice(0, 155),
    alternates: { canonical: absoluteUrl(`/product/${product.slug}/`) },
    openGraph: photo ? { images: [absoluteUrl(`/images/products/${photo}`)] } : undefined,
  }
}

export default function ProductPage({ params }) {
  const product = getProduct(params.slug)
  if (!product) notFound()
  const category = getCategory(product.category)
  const related = relatedProducts(product)

  const photo = product.images?.[0]
  const faqs = CATEGORY_FAQS[product.category] || []

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    category: category?.name,
    brand: { '@type': 'Brand', name: SITE.name },
    image: photo ? absoluteUrl(`/images/products/${photo}`) : absoluteUrl('/'),
    offers: {
      '@type': 'Offer',
      priceCurrency: SITE.currency,
      price: product.price,
      availability: 'https://schema.org/InStock',
      url: absoluteUrl(`/product/${product.slug}/`),
    },
  }

  const faqSchema = faqs.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  } : null

  return (
    <div className="container section">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}
      <Breadcrumbs
        trail={[
          { label: 'Shop', href: '/shop/' },
          { label: category?.name || 'Shop', href: `/shop/${product.category}/` },
          { label: product.name, href: `/product/${product.slug}/` },
        ]}
      />

      <div className="grid grid-2" style={{ alignItems: 'start', gap: '2.5rem' }}>
        <div className="product-frame" style={{ borderRadius: 'var(--radius)', border: '1px solid var(--line)' }}>
          {photo ? (
            <Image
              src={`/images/products/${photo}`}
              alt={product.name}
              width={1600}
              height={1200}
              priority
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            />
          ) : (
            <ProductArt colorKey={category?.color} label={artLabelFor(product)} />
          )}
        </div>

        <div>
          {product.badge && <span className="product-badge" style={{ background: 'var(--ink)' }}>{product.badge}</span>}
          <h1 style={{ marginTop: '0.5rem' }}>{product.name}</h1>
          <p style={{ color: 'var(--ink-faint)' }}>{product.faceValueLabel}</p>
          <p className="product-price" style={{ fontSize: '1.6rem' }}>{formatPrice(product.price)}</p>
          <hr className="gold-rule" />
          <p>{product.description}</p>

          <div className="callout" style={{ margin: '1.25rem 0' }}>
            Reproduced to differ from genuine Australian currency by at least 25% in size, per RBA reproduction
            guidance. Clearly marked NOT LEGAL TENDER. For film, theatre, education, and novelty use only.
          </div>

          <AddToCartButton product={product} />
        </div>
      </div>

      <div style={{ marginTop: '3rem', maxWidth: '640px' }}>
        <ValueTable currentSlug={product.slug} />
      </div>

      {related.length > 0 && (
        <div style={{ marginTop: '3rem' }}>
          <h2 style={{ fontSize: '1.3rem' }}>You Might Also Like</h2>
          <div className="grid grid-4">
            {related.map((p) => <ProductCard key={p.slug} product={p} />)}
          </div>
        </div>
      )}

      {faqs.length > 0 && (
        <div style={{ marginTop: '3rem', maxWidth: '640px' }}>
          <h2 style={{ fontSize: '1.2rem' }}>Questions About This Product</h2>
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

      <div style={{ marginTop: '3rem', maxWidth: '640px' }}>
        <SubmitSetReport productName={product.name} />
      </div>
    </div>
  )
}
