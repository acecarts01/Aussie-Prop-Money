'use client'

import { useMemo } from 'react'

/**
 * FaqBlock handles both the visual FAQ accordion and the background 
 * JSON-LD schema injection for Google Rich Results.
 * 
 * Safely serializes data to prevent XSS (escapes </script> tags).
 */
export default function FaqBlock({ faqs, title = 'Frequently asked questions', hideTitle = false }) {
  if (!faqs || faqs.length === 0) return null

  // Generate the schema reactively when faqs change.
  // We use useMemo to ensure stability and performance.
  const schema = useMemo(() => ({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.a
      }
    }))
  }), [faqs])

  // Safe serialization helper to avoid XSS in JSON-LD injection.
  const safeSchema = useMemo(() => {
    return JSON.stringify(schema).replace(/</g, '\\u003c')
  }, [schema])

  return (
    <section className="faq-block" style={{ marginTop: '3rem' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeSchema }}
      />
      
      {title && (hideTitle
        ? <h2 className="visually-hidden">{title}</h2>
        : <h2 style={{ fontSize: '1.4rem', marginBottom: '1.2rem' }}>{title}</h2>)}
      
      <div className="faq-list">
        {faqs.map((f, i) => (
          <details key={f.q || i}>
            <summary><h3 className="faq-q">{f.q}</h3></summary>
            <p>{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  )
}
