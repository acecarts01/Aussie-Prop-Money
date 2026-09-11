import LegalPage from '@/components/LegalPage'
import { SITE } from '@/config/site'
import { absoluteUrl } from '@/lib/utils'

export const metadata = {
  title: 'Privacy Policy — Australian Reserve Props',
  description: 'What Australian Reserve Props collects when you order or enquire, how cart data is stored in your browser, and how to request access or deletion.',
  alternates: { canonical: absoluteUrl('/privacy/') },
}

export default function PrivacyPage() {
  return (
    <LegalPage crumb="Privacy" href="/privacy/" title="Privacy policy" subtitle="We collect what an order needs and nothing more.">
      <p>{SITE.name} collects only the information needed to process an order or respond to an enquiry: your name, email, and any details you provide in a form or order request. We do not sell customer data to third parties.</p>
      <p>Cart contents are stored in your browser&rsquo;s local storage and are never transmitted to us until you submit an order request.</p>
      <p>Contact us to request access to or deletion of your data.</p>
    </LegalPage>
  )
}
