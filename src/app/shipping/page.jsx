import LegalPage from '@/components/LegalPage'
import { SITE } from '@/config/site'
import { absoluteUrl, formatPrice } from '@/lib/utils'

export const metadata = {
  title: 'Shipping — Australia-Wide Tracked Delivery',
  description: 'Australian Reserve Props ships prop money Australia-wide via tracked Australia Post. Free tracked shipping on every order; minimum order $350. No international shipping.',
  alternates: { canonical: absoluteUrl('/shipping/') },
}

export default function ShippingPage() {
  return (
    <LegalPage crumb="Shipping" href="/shipping/" title="Shipping" subtitle="Australia only. Tracked. Free on every order.">
      <p>We ship within Australia only — no international shipping or marketing at this time.</p>
      <ul>
        <li>Minimum order {formatPrice(SITE.orderRules.minOrder)} (goods subtotal, before any discount).</li>
        <li>Shipping is free on every order.</li>
        <li>Shipped via Australia Post with tracking.</li>
      </ul>
    </LegalPage>
  )
}
