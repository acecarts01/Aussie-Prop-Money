import Breadcrumbs from '@/components/Breadcrumbs'
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
    <div className="container section" style={{ maxWidth: '72ch' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <Breadcrumbs trail={[{ label: 'FAQ', href: '/faq/' }]} />
      <h1>Frequently Asked Questions</h1>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginTop: '1.5rem' }}>
        {FAQS.map((f) => (
          <div key={f.q}>
            <h2 style={{ fontSize: '1.05rem' }}>{f.q}</h2>
            <p>{f.a}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
