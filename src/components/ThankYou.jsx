import Link from 'next/link'
import ComplianceBadge from '@/components/ComplianceBadge'

// Shared shell for the three post-submit pages and the 404.
export default function ThankYou({ eyebrow, title, body, primary = { label: 'Back to the range', href: '/shop/' }, secondary = { label: 'Read the guides', href: '/blog/' } }) {
  return (
    <section className="section surface-1 gridlines" style={{ minHeight: '60vh', display: 'grid', placeItems: 'center' }}>
      <div className="container" style={{ maxWidth: '60ch', textAlign: 'center' }}>
        <span className="eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
        <p style={{ color: 'var(--ink-2)' }}>{body}</p>
        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
          <Link href={primary.href} className="btn btn-accent">{primary.label}</Link>
          <Link href={secondary.href} className="btn btn-outline">{secondary.label}</Link>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}><ComplianceBadge /></div>
      </div>
    </section>
  )
}
