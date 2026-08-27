import Link from 'next/link'
import { SITE, CATEGORIES } from '@/config/site'

function encodedEmail(email) {
  return email.replace('@', '&#64;')
}

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-col" style={{ flex: '1 1 260px' }}>
          <h4>{SITE.name}</h4>
          <p style={{ color: 'var(--ink-soft)', fontSize: '0.9rem', maxWidth: '32ch' }}>{SITE.tagline}</p>
          <p style={{ fontSize: '0.85rem', color: 'var(--ink-faint)' }}>
            {SITE.email === '[EMAIL]' ? (
              'Contact details coming soon'
            ) : (
              <a href={`mailto:${encodedEmail(SITE.email)}`} dangerouslySetInnerHTML={{ __html: encodedEmail(SITE.email) }} />
            )}
          </p>
        </div>

        <div className="footer-col">
          <h4>Shop</h4>
          <ul>
            {CATEGORIES.slice(0, 6).map((c) => (
              <li key={c.slug}>
                <Link href={`/shop/${c.slug}/`}>{c.name}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-col">
          <h4>Company</h4>
          <ul>
            <li><Link href="/about/">About</Link></li>
            <li><Link href="/wholesale/">Wholesale</Link></li>
            <li><Link href="/blog/">Blog</Link></li>
            <li><Link href="/faq/">FAQ</Link></li>
            <li><Link href="/contact/">Contact</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Legal</h4>
          <ul>
            <li><Link href="/shipping/">Shipping</Link></li>
            <li><Link href="/refund/">Refunds</Link></li>
            <li><Link href="/privacy/">Privacy</Link></li>
            <li><Link href="/terms/">Terms</Link></li>
          </ul>
        </div>
      </div>

      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} {SITE.name}. Novelty currency for film, theatre, education, and gifting — not legal tender.</span>
        <span>Ships within Australia only.</span>
      </div>
    </footer>
  )
}
