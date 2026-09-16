import Link from 'next/link'
import Breadcrumbs from '@/components/Breadcrumbs'
import PageHeader from '@/components/PageHeader'
import FaqBlock from '@/components/FaqBlock'
import ComplianceBadge from '@/components/ComplianceBadge'
import VerifiedBusiness from '@/components/VerifiedBusiness'
import Icon from '@/components/Icon'
import { SITE, PAGE_FAQS, PRODUCTS, CATEGORIES } from '@/config/site'
import { absoluteUrl, seoTitle, seoDescription, ogMeta } from '@/lib/utils'

export const metadata = {
  title: seoTitle('About Australian Reserve Props — Compliance-First Prop Money'),
  description: seoDescription('An Australia-based prop money brand founded in 2024. Reduced-scale, RBA-compliant prop currency for film, theatre, content and events — and the rules we build to.'),
  ...ogMeta(seoTitle('About Australian Reserve Props — Compliance-First Prop Money'), '/about/'),
  alternates: { canonical: absoluteUrl('/about/') },
}

const schema = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  mainEntity: { '@type': 'Organization', name: SITE.name, foundingDate: String(SITE.foundingYear), url: absoluteUrl('/'), areaServed: 'AU' },
}

const DIFF = [
  ['Australian spec, not US', 'Built around the Crimes (Currency) Act 1981 and RBA reproduction guidance — not repackaged US-dollar props.'],
  ['Reduced-scale, always', 'Every note differs from genuine currency by at least 25% and carries no replicated security features.'],
  ['Marked, and proud of it', 'NOT LEGAL TENDER on every note. Visible in frame if you want it. It\'s the whole point.'],
  ['A registered company, on the record', 'Money 365 Pty Ltd, ABN 84 676 764 971, GST registered. Look us up on the Australian Business Register before you order.'],
  ['No custom serials', 'System-assigned placeholder serials only. On every product. At any volume.'],
  ['Production-tested', 'The set reports on this site are real, recovered from our predecessor site and confirmed genuine.'],
]

export default function AboutPage() {
  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <PageHeader
        eyebrow={`Est. ${SITE.foundingYear} · Australia`}
        title="Built to the rules. Built for the shot."
        subtitle={SITE.brandStatement}
        breadcrumbs={<Breadcrumbs trail={[{ label: 'About', href: '/about/' }]} />}
      />

      <section className="section surface-1">
        <div className="container" style={{ maxWidth: '72ch' }}>
          <span className="eyebrow">Why we exist</span>
          <h2>Most prop money sold here wasn&rsquo;t made for here</h2>
          <p className="lede">
            Most prop money available to Australian buyers is printed overseas to US-dollar specifications, or sold without much thought to the Crimes (Currency) Act 1981 and the Reserve Bank of Australia&rsquo;s reproduction guidelines. We built {SITE.name} specifically for the Australian market — and for the crews, teachers and creators who need a prop that reads on camera and holds up under scrutiny.
          </p>
          <p style={{ color: 'var(--ink-2)' }}>
            {SITE.name} was founded in {SITE.foundingYear}. A predecessor site operated briefly before going offline; a number of genuine customer reviews from that period were recovered and are published across this site with their original dates. Today the range covers {PRODUCTS.length} products across {CATEGORIES.length} categories, shipped Australia-wide.
          </p>
        </div>
      </section>

      <section className="section surface-2">
        <div className="container">
          <span className="eyebrow">What we won&rsquo;t compromise on</span>
          <h2 style={{ maxWidth: '20ch' }}>Six things that are true of every note</h2>
          <div className="grid grid-3" style={{ marginTop: '2rem' }}>
            {DIFF.map(([t, d]) => (
              <div key={t} className="card card-pad">
                <span style={{ color: 'var(--accent)', display: 'inline-block', marginBottom: '0.6rem' }}><Icon name="check" size={20} /></span>
                <h3 style={{ marginBottom: '0.4rem' }}>{t}</h3>
                <p style={{ color: 'var(--ink-2)', margin: 0, fontSize: '0.95rem' }}>{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section surface-1">
        <div className="container" style={{ marginBottom: '2.5rem' }}><VerifiedBusiness /></div>
        <div className="container" style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', alignItems: 'center', justifyContent: 'space-between' }}>
          <ComplianceBadge size="lg" />
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <Link href="/shop/" className="btn btn-accent">Shop film-ready packs</Link>
            <Link href="/contact/" className="btn btn-outline">Contact</Link>
          </div>
        </div>
        <div className="container"><FaqBlock faqs={PAGE_FAQS.about} /></div>
      </section>
    </div>
  )
}
