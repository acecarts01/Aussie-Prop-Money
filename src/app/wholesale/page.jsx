import Link from 'next/link'
import WebForm from '@/components/WebForm'
import Breadcrumbs from '@/components/Breadcrumbs'
import PageHeader from '@/components/PageHeader'
import FaqBlock from '@/components/FaqBlock'
import { PAGE_FAQS } from '@/config/site'
import { absoluteUrl } from '@/lib/utils'

export const metadata = {
  title: 'Wholesale & Bulk Prop Money — Film & Theatre Productions',
  description: 'Bulk and wholesale prop money packages for film, TV, and theatre productions across Australia.',
  alternates: { canonical: absoluteUrl('/wholesale/') },
}

export default function WholesalePage() {
  return (
    <div>
      <PageHeader
        eyebrow="For Productions & Agencies"
        title="Wholesale & Production Orders"
        breadcrumbs={<Breadcrumbs trail={[{ label: 'Wholesale', href: '/wholesale/' }]} />}
      />

      <div className="container section" style={{ maxWidth: '760px' }}>
        <p>
          Film, TV, and theatre productions needing volume across multiple scenes can order in bulk. Our{' '}
          <Link href="/product/bulk-production-pack/">Bulk Production Pack</Link> is the starting point — get in touch for
          larger custom quantities or a mix of specific denominations for your production.
        </p>
        <div className="callout" style={{ margin: '1.5rem 0' }}>
          As with every product, bulk orders carry system-assigned placeholder serials only — we do not offer
          custom or buyer-specified serial numbers at any order size.
        </div>

        <div className="card" style={{ padding: '1.5rem' }}>
          <h2 style={{ fontSize: '1.15rem' }}>Enquire About a Bulk Order</h2>
          <WebForm
            subject="Wholesale enquiry — Australian Reserve Props"
            fromName="Wholesale Form"
            thankYouHref="/thank-you-wholesale/"
            submitLabel="Send Enquiry"
            fields={
              <>
                <div className="field">
                  <label htmlFor="w-name">Name / Production</label>
                  <input id="w-name" name="name" type="text" required />
                </div>
                <div className="field">
                  <label htmlFor="w-email">Email</label>
                  <input id="w-email" name="email" type="email" required />
                </div>
                <div className="field">
                  <label htmlFor="w-details">What do you need?</label>
                  <textarea id="w-details" name="details" rows={4} placeholder="Denominations, approximate face value, timeline" />
                </div>
              </>
            }
          />
        </div>

        <FaqBlock faqs={PAGE_FAQS.wholesale} />
      </div>
    </div>
  )
}
