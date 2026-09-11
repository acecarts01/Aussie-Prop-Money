import LegalPage from '@/components/LegalPage'
import { absoluteUrl } from '@/lib/utils'

export const metadata = {
  title: 'Refund Policy — Australian Reserve Props',
  description: 'Damaged, misprinted or incorrect prop money orders are replaced or refunded within 14 days of delivery. Printed to order, so no change-of-mind returns once shipped.',
  alternates: { canonical: absoluteUrl('/refund/') },
}

export default function RefundPage() {
  return (
    <LegalPage crumb="Refunds" href="/refund/" title="Refund policy" subtitle="Printed to order. Made right if it arrives wrong.">
      <p>If your order arrives damaged, misprinted, or incorrect, contact us within 14 days of delivery for a replacement or refund. Because notes are printed to order, we don&rsquo;t offer change-of-mind refunds once an order has shipped.</p>
      <p>This policy operates alongside your rights under the Australian Consumer Law.</p>
    </LegalPage>
  )
}
