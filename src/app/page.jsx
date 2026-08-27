import Link from 'next/link'
import ProductCard from '@/components/ProductCard'
import { CATEGORIES, PRODUCTS, FAQS, REVIEWS, SITE, NOTE_COLORS } from '@/config/site'
import { absoluteUrl } from '@/lib/utils'

export const metadata = {
  title: 'Prop Money Australia — Australian Reserve Props',
  description:
    'Compliance-first Australian prop money for film, theatre, content creation, education, and gifting. All five denominations, Australia-wide shipping.',
  alternates: { canonical: absoluteUrl('/') },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQS.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
}

const avgRating = (REVIEWS.reduce((s, r) => s + r.rating, 0) / REVIEWS.length).toFixed(1)
const aggregateSchema = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: SITE.name,
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: avgRating,
    reviewCount: REVIEWS.length,
  },
  review: REVIEWS.slice(0, 8).map((r) => ({
    '@type': 'Review',
    author: { '@type': 'Person', name: r.name },
    datePublished: r.date,
    reviewRating: { '@type': 'Rating', ratingValue: r.rating, bestRating: 5 },
    reviewBody: r.text,
  })),
}

const bestSellers = PRODUCTS.filter((p) => p.badge === 'Best Seller' || p.badge === 'Most Requested' || p.badge === 'Creator Favourite' || p.badge === 'Party Favourite').slice(0, 4)

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aggregateSchema) }} />

      <section className="hero luxury-band">
        <div className="container hero-grid">
          <div>
            <span className="eyebrow">Australia-Only · Compliance-First</span>
            <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)' }}>Prop Money Australia, Done Properly</h1>
            <hr className="gold-rule" />
            <p style={{ maxWidth: '48ch', fontSize: '1.05rem', color: 'rgba(243,239,231,0.78)' }}>
              Australian-note-styled prop currency for film, theatre, content creation, education, and gifting —
              all five denominations, reproduced to RBA reproduction guidance and clearly marked NOT LEGAL TENDER.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
              <Link href="/shop/" className="btn btn-accent">Shop All Denominations</Link>
              <Link href="/wholesale/" className="btn btn-outline">Bulk / Production Orders</Link>
            </div>
          </div>
          <div className="hero-fan" aria-hidden="true">
            {[
              { key: 'five', rot: -18, x: 0 },
              { key: 'ten', rot: -8, x: 40 },
              { key: 'twenty', rot: 2, x: 80 },
              { key: 'fifty', rot: 12, x: 120 },
              { key: 'hundred', rot: 22, x: 160 },
            ].map((n, i) => (
              <div
                key={n.key}
                className="hero-note"
                style={{
                  background: NOTE_COLORS[n.key],
                  left: `${n.x}px`,
                  top: '60px',
                  transform: `rotate(${n.rot}deg)`,
                  animationDelay: `${i * 90}ms`,
                }}
              >
                ${n.key === 'five' ? 5 : n.key === 'ten' ? 10 : n.key === 'twenty' ? 20 : n.key === 'fifty' ? 50 : 100}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container trust-bar">
          <div className="trust-item">🇦🇺 Australia-wide shipping only</div>
          <div className="trust-item">📏 RBA-compliant reproduction sizing</div>
          <div className="trust-item">🎬 Trusted by theatre &amp; production crews</div>
          <div className="trust-item">🔒 No custom serial numbers, ever</div>
        </div>
      </section>

      <section className="section section-tint">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Shop by Denomination</span>
            <h2>Every Australian Note, One Range</h2>
          </div>
          <div className="grid grid-4">
            {CATEGORIES.filter((c) => ['five-dollar-notes','ten-dollar-notes','twenty-dollar-notes','fifty-dollar-notes','hundred-dollar-notes'].includes(c.slug)).map((c) => (
              <Link
                key={c.slug}
                href={`/shop/${c.slug}/`}
                className="card"
                style={{ textDecoration: 'none', color: 'inherit', padding: '1.5rem', borderTop: `4px solid ${NOTE_COLORS[c.color]}` }}
              >
                <h3 style={{ fontSize: '1.1rem' }}>{c.name}</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--ink-faint)', margin: 0 }}>{c.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Best Sellers</span>
            <h2>Popular With Productions &amp; Creators</h2>
          </div>
          <div className="grid grid-4">
            {bestSellers.map((p) => <ProductCard key={p.slug} product={p} />)}
          </div>
        </div>
      </section>

      <section className="section section-tint">
        <div className="container" style={{ maxWidth: '72ch' }}>
          <span className="eyebrow">About {SITE.name}</span>
          <h2>Built Compliance-First, From the Start</h2>
          <p>{SITE.brandStatement}</p>
          <p>
            We ship within Australia only, price every pack the same regardless of payment method, and never offer
            custom or buyer-specified serial numbers — every note carries a system-assigned placeholder serial.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ maxWidth: '72ch' }}>
          <div className="section-head">
            <span className="eyebrow">Frequently Asked</span>
            <h2>Common Questions</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {FAQS.map((f) => (
              <details key={f.q} className="callout">
                <summary style={{ fontWeight: 600, cursor: 'pointer' }}>{f.q}</summary>
                <p style={{ marginTop: '0.6rem', marginBottom: 0 }}>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-tint">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Customer Reviews</span>
            <h2>{avgRating}★ from {REVIEWS.length} Reviews</h2>
          </div>
          <div className="grid grid-3">
            {REVIEWS.slice(0, 6).map((r) => (
              <div key={r.name + r.date} className="card review-card">
                <div className="review-stars" aria-label={`${r.rating} out of 5 stars`}>{'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}</div>
                <p style={{ fontSize: '0.9rem' }}>{r.text.length > 220 ? `${r.text.slice(0, 220)}…` : r.text}</p>
                <p style={{ fontSize: '0.8rem', color: 'var(--ink-faint)', margin: 0 }}>{r.name} · {new Date(r.date).toLocaleDateString('en-AU', { year: 'numeric', month: 'short', day: 'numeric' })}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
