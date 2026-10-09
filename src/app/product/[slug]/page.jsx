import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import ProductArt from '@/components/ProductArt'
import ProductCard from '@/components/ProductCard'
import AddToCartButton from '@/components/AddToCartButton'
import Breadcrumbs from '@/components/Breadcrumbs'
import ValueTable from '@/components/ValueTable'
import BundleCompare from '@/components/BundleCompare'
import ValueReturn from '@/components/ValueReturn'
import YieldCallout from '@/components/YieldCallout'
import { valueReturn } from '@/lib/value'
import SubmitSetReport from '@/components/SubmitSetReport'
import ComplianceBadge from '@/components/ComplianceBadge'
import FaqBlock from '@/components/FaqBlock'
import Metadata from '@/components/Metadata'
import YieldChart from '@/components/YieldChart'
import Icon from '@/components/Icon'
import { PRODUCTS, SITE, CATEGORY_FAQS, REVIEWS } from '@/config/site'
import { productAnswer, productFacts } from '@/lib/answers'
import { graphOf, webPageNode, idRef, ids } from '@/lib/schema'
import { getProduct, getCategory, relatedProducts, formatPrice, formatPriceShort, absoluteUrl, artLabelFor, seoTitle, seoDescription, ogMeta } from '@/lib/utils'

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }))
}

export function generateMetadata({ params }) {
  const product = getProduct(params.slug)
  if (!product) return {}
  const photo = product.images?.[0]
  const n = product.name
  const title = [`Buy ${n} Australia | Free Shipping`, `Buy ${n} | Free Shipping`, `Buy ${n} | ARP`, `Buy ${n}`].find((t) => t.length <= 60) || `Buy ${n}`.slice(0, 57).replace(/\s+\S*$/, '…')
  const firstSentence = (String(product.description).match(/^.*?[.!?](\s|$)/) || [product.description])[0].trim()
  return {
    title,
    description: seoDescription(`Buy ${n} for ${formatPriceShort(product.price)}. Free tracked Australia-wide shipping. ${firstSentence}`),
    alternates: { canonical: absoluteUrl(`/product/${product.slug}/`) },
    ...ogMeta(title, `/product/${product.slug}/`, photo ? { url: absoluteUrl(`/images/products/${photo}`), width: 1600, height: 1200, alt: product.name } : undefined),
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

  const pageUrl = absoluteUrl(`/product/${product.slug}/`)
  const productId = `${pageUrl}#product`
  const imageUrl = photo ? absoluteUrl(`/images/products/${photo}`) : absoluteUrl('/og-default.jpg')
  const schema = graphOf(
    webPageNode({ path: `/product/${product.slug}/`, name: product.name, description: product.description, about: productId, image: imageUrl }),
    {
      '@type': 'Product',
      '@id': productId,
      name: product.name,
      description: product.description,
      sku: product.slug,
      url: pageUrl,
      category: category?.name,
      brand: { '@type': 'Brand', name: SITE.name },
      manufacturer: idRef(ids.org),
      image: [imageUrl],
      mainEntityOfPage: idRef(`${pageUrl}#webpage`),
      offers: {
        '@type': 'Offer',
        url: pageUrl,
        priceCurrency: SITE.currency,
        price: product.price,
        availability: 'https://schema.org/InStock',
        itemCondition: 'https://schema.org/NewCondition',
        seller: idRef(ids.org),
        shippingDetails: {
          '@type': 'OfferShippingDetails',
          shippingRate: { '@type': 'MonetaryAmount', value: 0, currency: SITE.currency },
          shippingDestination: { '@type': 'DefinedRegion', addressCountry: 'AU' },
        },
      },
    }
  )

  return (
    <div className="has-sticky-cta">
      <Metadata schemas={[schema]} />

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
            {valueReturn(product) ? (
              <ValueReturn product={product} size="hero" />
            ) : (
              <>
                <p style={{ color: 'var(--ink-2)', margin: '0 0 0.5rem' }}>{product.faceValueLabel}</p>
                <p className="product-price" style={{ fontSize: '1.9rem', padding: 0, margin: '0 0 1rem' }}>{formatPrice(product.price)}</p>
              </>
            )}
            <p style={{ fontSize: '0.75rem', color: 'var(--ink-3)', letterSpacing: '0.12em', fontWeight: 600, textTransform: 'uppercase', margin: '0.6rem 0 1rem' }}>AUD · GST inc. · 10% off when paying in crypto</p>
            <hr className="gold-rule" />
            <p style={{ color: 'var(--ink-2)' }}>{product.description}</p>

            <div style={{ margin: '1.25rem 0 1.5rem' }}>
              <ComplianceBadge size="lg" />
            </div>

            <AddToCartButton product={product} />

            <ul style={{ listStyle: 'none', padding: 0, margin: '1.5rem 0 0', display: 'grid', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--ink-2)' }}>
              <li style={{ display: 'flex', gap: '0.6rem', alignItems: 'center' }}><span style={{ color: 'var(--accent)' }}><Icon name="check" size={16} /></span>Minimum order {formatPrice(SITE.orderRules.minOrder)} · ships Australia-wide via Australia Post, tracked</li>
              <li style={{ display: 'flex', gap: '0.6rem', alignItems: 'center' }}><span style={{ color: 'var(--accent)' }}><Icon name="check" size={16} /></span>Free tracked shipping on every order</li>
              <li style={{ display: 'flex', gap: '0.6rem', alignItems: 'center' }}><span style={{ color: 'var(--accent)' }}><Icon name="check" size={16} /></span>System-assigned serials only — no custom serial numbers on any product</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Compare / value */}
      <section className="section surface-2">
        <div className="container grid grid-2" style={{ alignItems: 'start' }}>
          <div>
            <BundleCompare product={product} />
            {isNoteStack && (
              <div style={{ marginTop: '2rem' }}>
                <h2 style={{ fontSize: '1.3rem', marginBottom: '0.9rem' }}>Face value by denomination</h2>
                <ValueTable currentSlug={product.slug} />
                <YieldChart currentSlug={product.slug} />
              </div>
            )}
          </div>
          <YieldCallout product={product} />
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

      <section className="section surface-1">
        <div className="container" style={{ maxWidth: '72ch' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '0.75rem' }}>What is the {product.name}?</h2>
          <p>{productAnswer(product)}</p>
          <h3 style={{ fontSize: '1.1rem', margin: '1.5rem 0 0.75rem' }}>Key facts</h3>
          <dl className="key-facts">
            {productFacts(product, SITE.orderRules.minOrder).map(([k, v]) => (
              <div key={k}><dt>{k}</dt><dd>{v}</dd></div>
            ))}
          </dl>
        </div>
      </section>

      {/* FAQ + related + report */}
      <section className="section surface-2">
        <div className="container grid grid-2" style={{ alignItems: 'start' }}>
          <div>
            <FaqBlock faqs={faqs} title="Questions about this product" />
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
