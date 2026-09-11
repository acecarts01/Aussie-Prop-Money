import ThankYou from '@/components/ThankYou'

export const metadata = { robots: { index: false, follow: true } }

export default function ThankYouWholesale() {
  return (
    <ThankYou
      eyebrow="Production enquiry received"
      title="Quote on the way."
      body="Thanks — we will follow up with a quote for your production, printed as one run."
    />
  )
}
