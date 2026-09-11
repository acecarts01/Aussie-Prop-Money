import LegalPage from '@/components/LegalPage'
import { SITE } from '@/config/site'
import { absoluteUrl, formatPrice } from '@/lib/utils'

export const metadata = {
  title: 'Shipping — Australia-Wide Tracked Delivery',
  description: 'Australian Reserve Props ships prop money Australia-wide via tracked Australia Post. Free shipping over $75, flat $9.95 on smaller orders. No international shipping.',
  alternates: { canonical: absoluteUrl('/shipping/') },
}

export default function ShippingPage() {
  return (
    <LegalPage crumb="Shipping" href="/shipping/" title="Shipping" subtitle="Australia only. Tracked. Free over the threshold.">
      <p>We ship within Australia only — no international shipping or marketing at this time.</p>
      <ul>
        <li>Free shipping on orders over {formatPrice(SITE.orderRules.freeShippingThreshold)}.</li>
        <li>Flat rate of {formatPrice(SITE.orderRules.flatShippingFee)} on smaller orders.</li>
        <li>Shipped via Australia Post with tracking.</li>
      </ul>
    </LegalPage>
  )
}
