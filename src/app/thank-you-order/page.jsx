import ThankYou from '@/components/ThankYou'

export const metadata = { robots: { index: false, follow: true } }

export default function ThankYouOrder() {
  return (
    <ThankYou
      eyebrow="Order request received"
      title="Received. Confirming next."
      body="We will be in touch shortly with payment details for your chosen method. Nothing prints until you have confirmed."
    />
  )
}
