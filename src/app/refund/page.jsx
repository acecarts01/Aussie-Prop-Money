import Breadcrumbs from '@/components/Breadcrumbs'
import { absoluteUrl } from '@/lib/utils'

export const metadata = { title: 'Refund Policy', alternates: { canonical: absoluteUrl('/refund/') } }

export default function RefundPage() {
  return (
    <div className="container section" style={{ maxWidth: '68ch' }}>
      <Breadcrumbs trail={[{ label: 'Refunds', href: '/refund/' }]} />
      <h1>Refund Policy</h1>
      <p>
        If your order arrives damaged, misprinted, or incorrect, contact us within 14 days of delivery for a
        replacement or refund. Because notes are printed to order, we don&rsquo;t offer change-of-mind refunds once
        an order has shipped.
      </p>
      <p>This policy operates alongside your rights under the Australian Consumer Law.</p>
    </div>
  )
}
