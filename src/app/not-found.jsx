import ThankYou from '@/components/ThankYou'

export const metadata = { robots: { index: false, follow: true } }

export default function NotFound() {
  return (
    <ThankYou
      eyebrow="404 · Missing reel"
      title="That page is not in the can"
      body="The link is broken or the page has moved. The full range is one click away."
      primary={{ label: 'Shop film-ready packs', href: '/shop/' }}
      secondary={{ label: 'Home', href: '/' }}
    />
  )
}
