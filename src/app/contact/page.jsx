import Breadcrumbs from '@/components/Breadcrumbs'
import WebForm from '@/components/WebForm'
import { SITE } from '@/config/site'
import { absoluteUrl } from '@/lib/utils'

export const metadata = {
  title: 'Contact Australian Reserve Props',
  description: 'Get in touch with Australian Reserve Props for orders, wholesale enquiries, or general questions.',
  alternates: { canonical: absoluteUrl('/contact/') },
}

export default function ContactPage() {
  return (
    <div className="container section" style={{ maxWidth: '640px' }}>
      <Breadcrumbs trail={[{ label: 'Contact', href: '/contact/' }]} />
      <h1>Contact Us</h1>
      <p style={{ color: 'var(--ink-soft)' }}>
        {SITE.email === '[EMAIL]'
          ? 'Direct contact details are being finalised — use the form below in the meantime.'
          : `Email us directly, or use the form below.`}
      </p>

      <div className="card" style={{ padding: '1.5rem', marginTop: '1.5rem' }}>
        <WebForm
          subject="Contact form — Australian Reserve Props"
          fromName="Contact Form"
          thankYouHref="/thank-you-contact/"
          submitLabel="Send Message"
          fields={
            <>
              <div className="field">
                <label htmlFor="c-name">Name</label>
                <input id="c-name" name="name" type="text" required />
              </div>
              <div className="field">
                <label htmlFor="c-email">Email</label>
                <input id="c-email" name="email" type="email" required />
              </div>
              <div className="field">
                <label htmlFor="c-message">Message</label>
                <textarea id="c-message" name="message" rows={5} required />
              </div>
            </>
          }
        />
      </div>
    </div>
  )
}
