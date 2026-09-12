import InvoiceForm from './InvoiceForm'

// Private owner page — not linked anywhere, not in the sitemap, noindex.
// Sends a designed tax invoice / payment-received email to a customer.
export const metadata = {
  title: 'Send invoice — Australian Reserve Props',
  robots: { index: false, follow: false, nocache: true },
}

export default function AdminInvoicePage() {
  return (
    <div>
      <div className="page-header gridlines">
        <div className="container">
          <span className="eyebrow">Owner tools</span>
          <h1>Send a tax invoice</h1>
          <p>Two uses. First, after you&rsquo;ve confirmed the payment method with the customer: paste the order details and send the <strong>awaiting-payment</strong> tax invoice with the payment details. Second, once the money lands: tick <strong>Payment received</strong> and send the paid version. The customer gets the same Studio-design email as their order confirmation; a copy lands in your inbox.</p>
        </div>
      </div>
      <section className="section surface-1">
        <div className="container" style={{ maxWidth: '760px' }}>
          <InvoiceForm />
        </div>
      </section>
    </div>
  )
}
