import Link from 'next/link'

export const metadata = { robots: { index: false, follow: true } }

export default function NotFound() {
  return (
    <div className="container section" style={{ maxWidth: '60ch', textAlign: 'center' }}>
      <h1>Page Not Found</h1>
      <p>That page doesn&rsquo;t exist. Try the shop instead.</p>
      <Link href="/shop/" className="btn btn-accent">Go to Shop</Link>
    </div>
  )
}
