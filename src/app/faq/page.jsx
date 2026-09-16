import Link from 'next/link'
import Breadcrumbs from '@/components/Breadcrumbs'
import PageHeader from '@/components/PageHeader'
import ComplianceBadge from '@/components/ComplianceBadge'
import { FAQS, CATEGORY_FAQS } from '@/config/site'
import { absoluteUrl, seoTitle, seoDescription, ogMeta } from '@/lib/utils'

export const metadata = {
  title: seoTitle('FAQ — Is Prop Money Legal in Australia? Realism, Sizing, Delivery'),
  description: seoDescription('Straight answers on legality, realism on camera, sizing rules, serial numbers, payment methods and Australia-wide delivery for studio-grade prop money.'),
  ...ogMeta(seoTitle('FAQ — Is Prop Money Legal in Australia? Realism, Sizing, Delivery'), '/faq/'),
  alternates: { canonical: absoluteUrl('/faq/') },
}

// Site-wide FAQs first, then a curated subset of category FAQs — all covered by one FAQPage schema.
const CATEGORY_PICKS = ['fifty-dollar-notes', 'briefcases-bags', 'packs-bundles', 'kids-play-money']
const extra = CATEGORY_PICKS.flatMap((slug) => (CATEGORY_FAQS[slug] || []).slice(0, 1))
const ALL = [...FAQS, ...extra]

const schema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: ALL.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
}

export default function FaqPage() {
  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <PageHeader
        eyebrow="Straight answers"
        title="Legality. Realism. Delivery."
        subtitle="The questions crews, teachers and creators actually ask before ordering — answered plainly."
        breadcrumbs={<Breadcrumbs trail={[{ label: 'FAQ', href: '/faq/' }]} />}
      />

      <div className="container section grid grid-2" style={{ alignItems: 'start' }}>
        <div className="faq-list">
          {ALL.map((f) => (
            <details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>
          ))}
        </div>
        <aside className="card card-pad" style={{ position: 'sticky', top: '6rem' }}>
          <span className="eyebrow">The short version</span>
          <h2 style={{ fontSize: '1.4rem' }}>Legal to make. Never money.</h2>
          <p style={{ color: 'var(--ink-2)' }}>
            Reduced-scale, clearly marked, no replicated security features — built inside the Crimes (Currency) Act 1981 and RBA reproduction guidance. Used on set, on stage, in classrooms and at parties. Never usable as payment.
          </p>
          <ComplianceBadge />
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginTop: '1.25rem' }}>
            <Link href="/blog/is-prop-money-legal-in-australia/" className="btn btn-outline">Legal explainer</Link>
            <Link href="/shop/" className="btn btn-accent">Shop film-ready packs</Link>
          </div>
        </aside>
      </div>
    </div>
  )
}
