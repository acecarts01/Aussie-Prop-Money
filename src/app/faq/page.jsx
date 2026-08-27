import Breadcrumbs from '@/components/Breadcrumbs'
import PageHeader from '@/components/PageHeader'
import { FAQS } from '@/config/site'
import { absoluteUrl } from '@/lib/utils'

export const metadata = {
  title: 'FAQ — Is Prop Money Legal in Australia?',
  description: 'Answers on legality, serial numbers, payment methods, shipping, and circulation-level options for Australian prop money.',
  alternates: { canonical: absoluteUrl('/faq/') },
}

const schema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQS.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
}

export default function FaqPage() {
  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <PageHeader
        eyebrow="Straight Answers"
        title="Frequently Asked Questions"
        breadcrumbs={<Breadcrumbs trail={[{ label: 'FAQ', href: '/faq/' }]} />}
      />

      <div className="container section" style={{ maxWidth: '72ch' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {FAQS.map((f) => (
            <div key={f.q} className="card" style={{ padding: '1.25rem 1.5rem' }}>
              <h2 style={{ fontSize: '1.05rem' }}>{f.q}</h2>
              <p style={{ margin: 0 }}>{f.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
