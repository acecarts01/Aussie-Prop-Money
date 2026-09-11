import ThankYou from '@/components/ThankYou'

export const metadata = { robots: { index: false, follow: true } }

export default function ThankYouContact() {
  return (
    <ThankYou
      eyebrow="Message sent"
      title="Got it. We will reply soon."
      body="Thanks for reaching out — we answer every enquiry."
    />
  )
}
