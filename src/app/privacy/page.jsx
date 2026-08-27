import Breadcrumbs from '@/components/Breadcrumbs'
import { SITE } from '@/config/site'
import { absoluteUrl } from '@/lib/utils'

export const metadata = { title: 'Privacy Policy', alternates: { canonical: absoluteUrl('/privacy/') } }

export default function PrivacyPage() {
  return (
    <div className="container section" style={{ maxWidth: '68ch' }}>
      <Breadcrumbs trail={[{ label: 'Privacy', href: '/privacy/' }]} />
      <h1>Privacy Policy</h1>
      <hr className="gold-rule" />
      <p>
        {SITE.name} collects only the information needed to process an order or respond to an enquiry: your name,
        email, and any details you provide in a form or order request. We do not sell customer data to third
        parties.
      </p>
      <p>
        Cart contents are stored in your browser&rsquo;s local storage and are never transmitted to us until you
        submit an order request.
      </p>
      <p>Contact us to request access to or deletion of your data.</p>
    </div>
  )
}
