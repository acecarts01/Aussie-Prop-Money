export default function FaqBlock({ faqs, title = 'Frequently Asked Questions' }) {
  if (!faqs || faqs.length === 0) return null

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  }

  return (
    <div style={{ marginTop: '3rem', maxWidth: '640px' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <h2 style={{ fontSize: '1.2rem' }}>{title}</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '1rem' }}>
        {faqs.map((f) => (
          <details key={f.q} className="callout">
            <summary style={{ fontWeight: 600, cursor: 'pointer' }}>{f.q}</summary>
            <p style={{ marginTop: '0.6rem', marginBottom: 0 }}>{f.a}</p>
          </details>
        ))}
      </div>
    </div>
  )
}
