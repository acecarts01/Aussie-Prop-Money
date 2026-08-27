export const metadata = { robots: { index: false, follow: true } }

export default function ThankYouOrder() {
  return (
    <div className="container section" style={{ maxWidth: '60ch', textAlign: 'center' }}>
      <h1>Order Request Received</h1>
      <p>We&rsquo;ll be in touch shortly with payment details for your chosen method.</p>
    </div>
  )
}
