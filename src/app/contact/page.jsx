import Link from 'next/link'
import Breadcrumbs from '@/components/Breadcrumbs'
import WebForm from '@/components/WebForm'
import PageHeader from '@/components/PageHeader'
import FaqBlock from '@/components/FaqBlock'
import ComplianceBadge from '@/components/ComplianceBadge'
import { SITE, PAGE_FAQS } from '@/config/site'
import { absoluteUrl } from '@/lib/utils'

export const metadata = {
  title: 'Contact Australian Reserve Props — Orders, Productions, Questions',
  description: 'Contact Australian Reserve Props for orders, production and wholesale enquiries, or questions about compliant prop money in Australia.',
  alternates: { canonical: absoluteUrl('/contact/') },
}

const pendingContact = SITE.email === '[EMAIL]'

export default function ContactPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Get in touch"
        title="Talk to the print room"
        subtitle={pendingContact
          ? 'Direct contact details are being finalised — the form below reaches us in the meantime.'
          : 'Email us directly, or use the form below. We answer every production enquiry.'}
        breadcrumbs={<Breadcrumbs trail={[{ label: 'Contact', href: '/contact/' }]} />}
      />

      <section className="section surface-1">
        <div className="container grid grid-2" style={{ alignItems: 'start' }}>
          <div>
            <span className="eyebrow">What to include</span>
            <h2 style={{ fontSize: '1.5rem' }}>Rough is fine. Dates help.</h2>
            <ul style={{ color: 'var(--ink-2)', paddingLeft: '1.1rem' }}>
              <li>Denominations and approximate face value</li>
              <li>Shoot or event date, if you have one</li>
              <li>Circulation level (crisp, lightly handled, worn)</li>
              <li>Delivery state or territory</li>
            </ul>
            <p style={{ color: 'var(--ink-2)' }}>
              Running a multi-scene production? Use the <Link href="/wholesale/">production &amp; wholesale form</Link> so everything prints in one run.
            </p>
            <ComplianceBadge />
          </div>
          <div className="card card-pad">
            <WebForm
              subject="Contact form — Australian Reserve Props"
              fromName="Contact Form"
              thankYouHref="/thank-you-contact/"
              submitLabel="Send message"
              fields={
                <>
                  <div className="field"><label htmlFor="c-name">Name</label><input id="c-name" name="name" type="text" required /></div>
                  <div className="field"><label htmlFor="c-email">Email</label><input id="c-email" name="email" type="email" required /></div>
                  <div className="field"><label htmlFor="c-message">Message</label><textarea id="c-message" name="message" rows={5} required /></div>
                </>
              }
            />
          </div>
        </div>
        <div className="container"><FaqBlock faqs={PAGE_FAQS.contact} /></div>
      </section>
    </div>
  )
}
