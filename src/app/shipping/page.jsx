import Breadcrumbs from '@/components/Breadcrumbs'
import { SITE } from '@/config/site'
import { absoluteUrl } from '@/lib/utils'

export const metadata = { title: 'Shipping', alternates: { canonical: absoluteUrl('/shipping/') } }

export default function ShippingPage() {
  return (
    <div className="container section" style={{ maxWidth: '68ch' }}>
      <Breadcrumbs trail={[{ label: 'Shipping', href: '/shipping/' }]} />
      <h1>Shipping</h1>
      <hr className="gold-rule" />
      <p>We ship within Australia only — no international shipping or marketing at this time.</p>
      <ul>
        <li>Free shipping on orders over {SITE.orderRules.freeShippingThreshold} AUD.</li>
        <li>Flat rate of {SITE.orderRules.flatShippingFee} AUD on smaller orders.</li>
        <li>Shipped via Australia Post with tracking.</li>
      </ul>
    </div>
  )
}
