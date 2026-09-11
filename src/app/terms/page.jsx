import LegalPage from '@/components/LegalPage'
import { SITE } from '@/config/site'
import { absoluteUrl } from '@/lib/utils'

export const metadata = {
  title: 'Terms of Service — Australian Reserve Props',
  description: 'Terms of sale for Australian Reserve Props prop money: novelty use only, reduced-scale notes, no custom serials, Australia-only shipping.',
  alternates: { canonical: absoluteUrl('/terms/') },
}

export default function TermsPage() {
  return (
    <LegalPage crumb="Terms" href="/terms/" title="Terms of service" subtitle={`What you agree to when you order from ${SITE.name}.`}>
      <ul>
        <li>All products are novelty/prop items only. They are NOT LEGAL TENDER and must not be used to deceive anyone into believing they are genuine currency.</li>
        <li>Products are reproduced to differ from genuine Australian currency by at least 25% in size, per RBA reproduction guidance, and do not replicate banknote security features.</li>
        <li>We do not offer custom or buyer-specified serial numbers under any circumstances.</li>
        <li>We ship within Australia only.</li>
        <li>Misuse of products for fraud or attempted deception is illegal and is not something we support, enable, or condone.</li>
      </ul>
    </LegalPage>
  )
}
