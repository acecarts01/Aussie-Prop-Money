export const metadata = { robots: { index: false, follow: true } }

export default function ThankYouContact() {
  return (
    <div className="container section" style={{ maxWidth: '60ch', textAlign: 'center' }}>
      <h1>Message Sent</h1>
      <p>Thanks for reaching out — we&rsquo;ll get back to you soon.</p>
    </div>
  )
}
