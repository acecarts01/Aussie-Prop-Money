import Breadcrumbs from '@/components/Breadcrumbs'
import PageHeader from '@/components/PageHeader'
import ComplianceBadge from '@/components/ComplianceBadge'

// Shared shell for terms / privacy / refund / shipping so all four read as one system.
export default function LegalPage({ crumb, href, eyebrow = 'Policies', title, subtitle, children }) {
  return (
    <div>
      <PageHeader
        eyebrow={eyebrow}
        title={title}
        subtitle={subtitle}
        breadcrumbs={<Breadcrumbs trail={[{ label: crumb, href }]} />}
      />
      <section className="section surface-1">
        <div className="container" style={{ maxWidth: '68ch' }}>
          <div style={{ color: 'var(--ink-2)', fontSize: '1.02rem' }}>{children}</div>
          <div style={{ marginTop: '2.5rem' }}><ComplianceBadge /></div>
        </div>
      </section>
    </div>
  )
}
