import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import ProductArt from '@/components/ProductArt'
import ProductCard from '@/components/ProductCard'
import AddToCartButton from '@/components/AddToCartButton'
import Breadcrumbs from '@/components/Breadcrumbs'
import ValueTable from '@/components/ValueTable'
import BundleCompare from '@/components/BundleCompare'
import SubmitSetReport from '@/components/SubmitSetReport'
import ComplianceBadge from '@/components/ComplianceBadge'
import Icon from '@/components/Icon'
import { PRODUCTS, SITE, CATEGORY_FAQS, REVIEWS } from '@/config/site'
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

const setReports = REVIEWS.filter((r) => /film|theatre|production|stage|set|shoot|crew|camera/i.test(r.text)).slice(0, 3)

export default function ProductPage({ params }) {
  const product = getProduct(params.slug)
  if (!product) notFound()
  const category = getCategory(product.category)
  const related = relatedProducts(product)
  const photo = product.images?.[0]
  const faqs = CATEGORY_FAQS[product.category] || []
  const isNoteStack = ['twenty-dollar-notes', 'fifty-dollar-notes', 'hundred-dollar-notes'].includes(product.category)

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
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}

      <div className="container" style={{ paddingTop: '1.5rem' }}>
        <Breadcrumbs
          trail={[
            { label: 'Shop', href: '/shop/' },
            { label: category?.name || 'Shop', href: `/shop/${product.category}/` },
            { label: product.name, href: `/product/${product.slug}/` },
          ]}
        />
      </div>

      <section className="section-tight">
        <div className="container grid grid-2" style={{ alignItems: 'start', gap: 'clamp(1.5rem, 4vw, 3.5rem)' }}>
          {/* Gallery — lit specimen plate */}
          <div>
            <div className="plate standalone">
              <span className="specimen-tag">{category?.name}</span>
              <span className="specimen-tag right">Not legal tender</span>
              {photo ? (
                <Image src={`/images/products/${photo}`} alt={product.name} width={1600} height={1200} priority />
              ) : (
                <ProductArt colorKey={category?.color} label={artLabelFor(product)} />
              )}
            </div>
            <p style={{ fontSize: '0.78rem', color: 'var(--ink-3)', margin: '0.8rem 0 0', letterSpacing: '0.06em', textTransform: 'uppercase', fontWeight: 600 }}>
              Studio plate · shot on white for print-detail review · video sample slot reserved
            </p>
          </div>

          {/* Buy panel */}
          <div id="buy">
            {product.badge && <span className="product-badge">{product.badge}</span>}
            <h1 style={{ fontSize: 'clamp(2rem, 4.2vw, 3.2rem)', marginTop: '0.6rem' }}>{product.name}</h1>
            <p style={{ color: 'var(--ink-2)', margin: '0 0 0.5rem' }}>{product.faceValueLabel}</p>
            <p className="product-price" style={{ fontSize: '1.9rem', padding: 0, margin: '0 0 1rem' }}>{formatPrice(product.price)} <span style={{ fontSize: '0.75rem', color: 'var(--ink-3)', letterSpacing: '0.12em', fontFamily: 'var(--font-body)', fontWeight: 600 }}>AUD · 10% off when paying in cryptont method</span></p>
            <hr className="gold-rule" />
            <p style={{ color: 'var(--ink-2)' }}>{product.description}</p>

            <div style={{ margin: '1.25rem 0 1.5rem' }}>
              <ComplianceBadge size="lg" />
            </div>

            <AddToCartButton product={product} />

            <ul style={{ listStyle: 'none', padding: 0, margin: '1.5rem 0 0', display: 'grid', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--ink-2)' }}>
              <li style={{ display: 'flex', gap: '0.6rem', alignItems: 'center' }}><span style={{ color: 'var(--accent)' }}><Icon name="check" size={16} /></span>Ships Australia-wide via Australia Post, tracked</li>
              <li style={{ display: 'flex', gap: '0.6rem', alignItems: 'center' }}><span style={{ color: 'var(--accent)' }}><Icon name="check" size={16} /></span>Free shipping over {formatPrice(SITE.orderRules.freeShippingThreshold)} · flat {formatPrice(SITE.orderRules.flatShippingFee)} under</li>
              <li style={{ display: 'flex', gap: '0.6rem', alignItems: 'center' }}><span style={{ color: 'var(--accent)' }}><Icon name="check" size={16} /></span>System-assigned serials only — no custom serial numbers on any product</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Compare / value */}
      <section className="section surface-2">
        <div className="container grid grid-2" style={{ alignItems: 'start' }}>
          <BundleCompare product={product} />
          {isNoteStack && (
            <div>
              <h2 style={{ fontSize: '1.3rem', marginBottom: '0.9rem' }}>Face value by denomination</h2>
              <ValueTable currentSlug={product.slug} />
            </div>
          )}
        </div>
      </section>

      {/* Set reports */}
      {setReports.length > 0 && (
        <section className="section surface-1">
          <div className="container">
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1.25rem' }}>From set &amp; stage</h2>
            <div className="grid grid-3">
              {setReports.map((r) => (
                <div key={r.name + r.date} className="card review-card">
                  <div className="review-stars" aria-label={`${r.rating} out of 5`}>{'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}</div>
                  <blockquote>{r.text.length > 220 ? `${r.text.slice(0, 220)}…` : r.text}</blockquote>
                  <span className="who">{r.name} · {new Date(r.date).toLocaleDateString('en-AU', { year: 'numeric', month: 'short' })}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ + related + report */}
      <section className="section surface-2">
        <div className="container grid grid-2" style={{ alignItems: 'start' }}>
          <div>
            {faqs.length > 0 && (
              <>
                <h2 style={{ fontSize: '1.3rem', marginBottom: '0.9rem' }}>Questions about this product</h2>
                <div className="faq-list">
                  {faqs.map((f) => (
                    <details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>
                  ))}
                </div>
              </>
            )}
          </div>
          <div className="card">
            <SubmitSetReport productName={product.name} />
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="section surface-1">
          <div className="container">
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1.25rem' }}>Also in {category?.name}</h2>
            <div className="grid grid-4">
              {related.map((p) => <ProductCard key={p.slug} product={p} />)}
            </div>
            <div style={{ marginTop: '1.5rem', display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <Link href={`/shop/${product.category}/`} className="btn btn-outline">All {category?.name}</Link>
              <Link href="/wholesale/" className="btn btn-ghost">Need production volume? →</Link>
            </div>
          </div>
        </section>
      )}

      {/* Sticky mobile CTA */}
      <div className="sticky-cta" aria-hidden="true">
        <span className="product-price">{formatPrice(product.price)}</span>
        <a href="#buy" className="btn btn-accent">Configure &amp; add</a>
      </div>
    </div>
  )
}
