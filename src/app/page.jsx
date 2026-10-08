import Link from 'next/link'
import Image from 'next/image'
import ProductCard from '@/components/ProductCard'
import SectionHead from '@/components/SectionHead'
import TrustBadges from '@/components/TrustBadges'
import VerifiedBusiness from '@/components/VerifiedBusiness'
import UseCaseSplit from '@/components/UseCaseSplit'
import ComplianceBadge from '@/components/ComplianceBadge'
import Icon from '@/components/Icon'
import ReviewSlider from '@/components/ReviewSlider'
import HeroSlider from '@/components/HeroSlider'
import FaqBlock from '@/components/FaqBlock'
import AnimatedStatStrip from '@/components/AnimatedStatStrip'
import AnimatedText from '@/components/AnimatedText'
import { CATEGORIES, PRODUCTS, FAQS, REVIEWS, POSTS, SITE, HERO, COMPLIANCE } from '@/config/site'
import { absoluteUrl, ogMeta } from '@/lib/utils'

export const metadata = {
  title: 'Buy Prop Money Australia | Australian Reserve Props',
  description: 'Buy prop money in Australia: $20, $50 and $100 prop note stacks, packs and briefcase sets. Free tracked shipping Australia-wide. Marked NOT LEGAL TENDER.',
  ...ogMeta('Buy Prop Money Australia | Australian Reserve Props', '/'),
  alternates: { canonical: absoluteUrl('/') },
}

const HOME_FAQS = FAQS.slice(0, 8)

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
const featured = FEATURED_SLUGS.map((s) => PRODUCTS.find((p) => p.slug === s)).filter(Boolean)
const latestPosts = [...POSTS].sort((a, b) => (a.date < b.date ? 1 : -1)).slice(0, 3)

export default function HomePage() {
  return (
    <>
      <HeroSlider />

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
            <AnimatedText delay={0.2} style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                {COMPLIANCE.links.map((l, i) => (
                  <Link key={l.href} href={l.href} className={`btn ${i === 0 ? 'btn-outline' : 'btn-ghost'}`}>{l.label}</Link>
                ))}
              </div>
            </AnimatedText>
          </div>
          <div className="isnt-grid">
            <AnimatedText delay={0.3} className="isnt-col">
              <h3 className="is">What it is</h3>
              <ul>{COMPLIANCE.is.map((t) => <li key={t}>{t}</li>)}</ul>
            </AnimatedText>
            <AnimatedText delay={0.4} className="isnt-col">
              <h3>What it isn&rsquo;t</h3>
              <ul>{COMPLIANCE.isnt.map((t) => <li key={t}>{t}</li>)}</ul>
            </AnimatedText>
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
      <AnimatedStatStrip />

      {/* From set — real reviews from production use */}
      <section className="section surface-1">
        <div className="container">
          <SectionHead
            eyebrow="Set reports"
            title={`${SITE.trustpilotRating}★ across ${SITE.reviewCount} reports`}
            sub="Compliance-first prop money, trusted by Australian filmmakers, photographers, and theatre crews."
          />
          <ReviewSlider />
        </div>
      </section>

      {/* Authority — the AI-visibility payload */}
      <section className="section surface-2 gridlines">
        <div className="container" style={{ maxWidth: '76ch' }}>
          <SectionHead eyebrow={`About ${SITE.name}`} title="Compliance-first from day one" />
          <AnimatedText delay={0.2}>
            <p className="lede">{SITE.brandStatement}</p>
          </AnimatedText>
          <AnimatedText delay={0.3}>
            <p style={{ color: 'var(--ink-2)' }}>
              Most prop money sold to Australian buyers is printed to US-dollar specs or without much thought to the Crimes (Currency) Act 1981. We built this range specifically for Australian productions: every note is reduced-scale, carries no replicated security features, and is marked NOT LEGAL TENDER. Every product is priced the same regardless of how you pay, and we never offer custom serial numbers.
            </p>
          </AnimatedText>
          <AnimatedText delay={0.4}>
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
              <Link href="/about/" className="btn btn-outline">Our story</Link>
              <Link href="/wholesale/" className="btn btn-ghost">Production &amp; wholesale →</Link>
            </div>
          </AnimatedText>
        </div>
      </section>

      {/* 6 — FAQ */}
      <section className="section surface-1">
        <div className="container" style={{ maxWidth: '76ch' }}>
          <SectionHead eyebrow="Straight answers" title="Legality, realism, delivery" />
          <FaqBlock faqs={HOME_FAQS} title="" />
          <AnimatedText delay={0.3}>
            <div style={{ marginTop: '1.25rem' }}>
              <Link href="/faq/" className="btn btn-ghost">All questions →</Link>
            </div>
          </AnimatedText>
        </div>
      </section>

      {/* Guides */}
      <section className="section surface-2">
        <div className="container">
          <SectionHead eyebrow="Guides" title="Read before you shoot" />
          <div className="grid grid-3">
            {latestPosts.map((p, i) => (
              <AnimatedText key={p.slug} delay={i * 0.1}>
                <Link href={`/blog/${p.slug}/`} className="card card-pad blog-card">
                  <span className="date">{new Date(p.date).toLocaleDateString('en-AU', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  <h3>{p.title}</h3>
                  <p>{p.excerpt}</p>
                  <span className="go">Read →</span>
                </Link>
              </AnimatedText>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
