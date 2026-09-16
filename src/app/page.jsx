import Link from 'next/link'
import Image from 'next/image'
import ProductCard from '@/components/ProductCard'
import SectionHead from '@/components/SectionHead'
import TrustBadges from '@/components/TrustBadges'
import VerifiedBusiness from '@/components/VerifiedBusiness'
import UseCaseSplit from '@/components/UseCaseSplit'
import ComplianceBadge from '@/components/ComplianceBadge'
import Icon from '@/components/Icon'
import { CATEGORIES, PRODUCTS, FAQS, REVIEWS, POSTS, SITE, HERO, COMPLIANCE } from '@/config/site'
import { absoluteUrl, ogMeta } from '@/lib/utils'

export const metadata = {
  title: 'Prop Money Australia | Australian Reserve Props',
  description: 'Studio-grade prop money for film, theatre and content. Reduced-scale, RBA-compliant, marked NOT LEGAL TENDER. $20, $50 and $100 stacks, packs and briefcases.',
  ...ogMeta('Prop Money Australia | Australian Reserve Props', '/'),
  alternates: { canonical: absoluteUrl('/') },
}

const HOME_FAQS = FAQS.slice(0, 5)

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: HOME_FAQS.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
}

// Featured: the three flagship stacks + the production/reveal sets + two use-case items.
const FEATURED_SLUGS = [
  'hundred-dollar-prop-note-stack',
  'fifty-dollar-prop-note-stack',
  'twenty-dollar-prop-note-stack',
  'briefcase-prop-set-250k',
  'bulk-production-pack',
  'duffel-bag-prop-set-500k',
  'content-creator-flex-pack',
  'money-gun-refill-pack',
]
const avgRating = (REVIEWS.reduce((s, r) => s + r.rating, 0) / REVIEWS.length).toFixed(1)
const featured = FEATURED_SLUGS.map((s) => PRODUCTS.find((p) => p.slug === s)).filter(Boolean)
const productionReviews = REVIEWS.filter((r) => /film|theatre|production|stage|set|shoot|crew/i.test(r.text)).slice(0, 3)
const latestPosts = [...POSTS].sort((a, b) => (a.date < b.date ? 1 : -1)).slice(0, 3)

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* 1 — Hero */}
      <section className="hero-cine gridlines" aria-labelledby="hero-h1">
        <div className="hero-media" aria-hidden="true">
          <Image src={`/images/products/${HERO.image}`} alt="Briefcase prop money set — studio-grade Australian prop currency by Australian Reserve Props" fill priority sizes="100vw" />
        </div>
        <div className="hero-scrim" aria-hidden="true" />
        <div className="container">
          <div className="hero-inner">
            <span className="eyebrow rise">Prop currency for production</span>
            <h1 id="hero-h1" className="rise rise-2">
              <span className="line">{HERO.h1Lines[0]}</span>
              <span className="line">{HERO.h1Lines[1]}</span>
              <span className="line accent">{HERO.h1Lines[2]}</span>
            </h1>
            <p className="hero-sub rise rise-3">{HERO.sub}</p>
            <div className="hero-cta rise rise-3">
              <Link href={HERO.ctaPrimary.href} className="btn btn-accent">
                {HERO.ctaPrimary.label} <span className="arrow"><Icon name="arrow" size={16} /></span>
              </Link>
              <Link href={HERO.ctaSecondary.href} className="btn btn-outline">{HERO.ctaSecondary.label}</Link>
            </div>
            <div className="rise rise-4"><ComplianceBadge size="lg" /></div>
            <div className="hero-meta rise rise-4" style={{ marginTop: '1.4rem' }}>
              {HERO.meta.map(([k, v]) => (
                <span key={k}>{k}: <b>{v}</b></span>
              ))}
            </div>
          </div>
        </div>
        <span className="hero-corner" aria-hidden="true">{HERO.cornerTag}</span>
      </section>

      {/* 2 — Trust badges */}
      <section className="section-tight surface-1" aria-label="Trust and compliance signals">
        <div className="container"><TrustBadges /></div>
        <div className="container" style={{ marginTop: '1.5rem' }}><VerifiedBusiness /></div>
      </section>

      {/* 3 — Use-case split */}
      <section className="section surface-2">
        <div className="container">
          <SectionHead
            eyebrow="Built for the job"
            title="Three ways it gets used. One standard."
            sub="Film, stage, and social all put different demands on a stack. The print quality, sizing, and marking stay the same across all of them."
          />
          <UseCaseSplit />
        </div>
      </section>

      {/* 4 — Compliance, up front */}
      <section className="section surface-1 compliance-section">
        <div className="slate" aria-hidden="true" style={{ position: 'absolute', top: 0, left: 0 }} />
        <div className="container compliance-grid">
          <div>
            <SectionHead eyebrow={COMPLIANCE.eyebrow} title={COMPLIANCE.title} sub={COMPLIANCE.lede} />
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              {COMPLIANCE.links.map((l, i) => (
                <Link key={l.href} href={l.href} className={`btn ${i === 0 ? 'btn-outline' : 'btn-ghost'}`}>{l.label}</Link>
              ))}
            </div>
          </div>
          <div className="isnt-grid">
            <div className="isnt-col">
              <h3 className="is">What it is</h3>
              <ul>{COMPLIANCE.is.map((t) => <li key={t}>{t}</li>)}</ul>
            </div>
            <div className="isnt-col">
              <h3>What it isn&rsquo;t</h3>
              <ul>{COMPLIANCE.isnt.map((t) => <li key={t}>{t}</li>)}</ul>
            </div>
          </div>
        </div>
      </section>

      {/* 5 — Featured products */}
      <section className="section surface-2">
        <div className="container">
          <SectionHead
            eyebrow="Featured"
            title="Screen-ready stacks, sets & packs"
            sub="Three denominations, $20 and up. Bundles sized from a single close-up to a full vault dressing."
          />
          <div className="grid grid-4">
            {featured.map((p, i) => <ProductCard key={p.slug} product={p} priority={i < 2} />)}
          </div>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginTop: '2rem' }}>
            <Link href="/shop/" className="btn btn-accent">Browse the full range <span className="arrow"><Icon name="arrow" size={16} /></span></Link>
            {CATEGORIES.filter((c) => ['twenty-dollar-notes', 'fifty-dollar-notes', 'hundred-dollar-notes'].includes(c.slug)).map((c) => (
              <Link key={c.slug} href={`/shop/${c.slug}/`} className="chip">{c.name}</Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stat strip — real numbers only */}
      <section aria-label="At a glance">
        <div className="stat-strip">
          <div className="stat"><b>{SITE.foundingYear}</b><span>Established</span></div>
          <div className="stat"><b>{PRODUCTS.length}</b><span>Products</span></div>
          <div className="stat"><b>{CATEGORIES.length}</b><span>Categories</span></div>
          <div className="stat"><b>AU</b><span>Ships nationwide</span></div>
        </div>
      </section>

      {/* From set — real reviews from production use */}
      <section className="section surface-1">
        <div className="container">
          <SectionHead
            eyebrow="Set reports"
            title={`${avgRating}★ across ${REVIEWS.length} reports`}
            sub="Recovered from our predecessor site and confirmed genuine. These are the ones from stage and set."
          />
          <div className="grid grid-3">
            {productionReviews.map((r) => (
              <div key={r.name + r.date} className="card review-card">
                <div className="review-stars" aria-label={`${r.rating} out of 5`}>{'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}</div>
                <blockquote>{r.text.length > 240 ? `${r.text.slice(0, 240)}…` : r.text}</blockquote>
                <span className="who">{r.name} · {new Date(r.date).toLocaleDateString('en-AU', { year: 'numeric', month: 'short' })}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Authority — the AI-visibility payload */}
      <section className="section surface-2 gridlines">
        <div className="container" style={{ maxWidth: '76ch' }}>
          <SectionHead eyebrow={`About ${SITE.name}`} title="Compliance-first from day one" />
          <p className="lede">{SITE.brandStatement}</p>
          <p style={{ color: 'var(--ink-2)' }}>
            Most prop money sold to Australian buyers is printed to US-dollar specs or without much thought to the Crimes (Currency) Act 1981. We built this range specifically for Australian productions: every note is reduced-scale, carries no replicated security features, and is marked NOT LEGAL TENDER. Every product is priced the same regardless of how you pay, and we never offer custom serial numbers.
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
            <Link href="/about/" className="btn btn-outline">Our story</Link>
            <Link href="/wholesale/" className="btn btn-ghost">Production &amp; wholesale →</Link>
          </div>
        </div>
      </section>

      {/* 6 — FAQ */}
      <section className="section surface-1">
        <div className="container" style={{ maxWidth: '76ch' }}>
          <SectionHead eyebrow="Straight answers" title="Legality, realism, delivery" />
          <div className="faq-list">
            {HOME_FAQS.map((f) => (
              <details key={f.q}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
          <div style={{ marginTop: '1.25rem' }}>
            <Link href="/faq/" className="btn btn-ghost">All questions →</Link>
          </div>
        </div>
      </section>

      {/* Guides */}
      <section className="section surface-2">
        <div className="container">
          <SectionHead eyebrow="Guides" title="Read before you shoot" />
          <div className="grid grid-3">
            {latestPosts.map((p) => (
              <Link key={p.slug} href={`/blog/${p.slug}/`} className="card card-pad blog-card">
                <span className="date">{new Date(p.date).toLocaleDateString('en-AU', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                <h3>{p.title}</h3>
                <p>{p.excerpt}</p>
                <span className="go">Read →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
