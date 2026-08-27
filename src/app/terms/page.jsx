import Breadcrumbs from '@/components/Breadcrumbs'
import { SITE } from '@/config/site'
import { absoluteUrl } from '@/lib/utils'

export const metadata = { title: 'Terms of Service', alternates: { canonical: absoluteUrl('/terms/') } }

export default function TermsPage() {
  return (
    <div className="container section" style={{ maxWidth: '68ch' }}>
      <Breadcrumbs trail={[{ label: 'Terms', href: '/terms/' }]} />
      <h1>Terms of Service</h1>
      <p>By ordering from {SITE.name}, you agree to the following:</p>
      <ul>
        <li>All products are novelty/prop items only. They are NOT LEGAL TENDER and must not be used to
          deceive anyone into believing they are genuine currency.</li>
        <li>Products are reproduced to differ from genuine Australian currency by at least 25% in size, per RBA
          reproduction guidance, and do not replicate banknote security features.</li>
        <li>We do not offer custom or buyer-specified serial numbers under any circumstances.</li>
        <li>We ship within Australia only.</li>
        <li>Misuse of products for fraud or attempted deception is illegal and is not something we support, enable,
          or condone.</li>
      </ul>
    </div>
  )
}
