import Link from 'next/link'
import ComplianceBadge from './ComplianceBadge'
import VerifiedBusiness from './VerifiedBusiness'
import { SITE, CATEGORIES, PAYMENT_METHODS } from '@/config/site'

function encodedEmail(email) {
  return email.replace('@', '&#64;')
}

export default function Footer() {
  const livePayments = PAYMENT_METHODS.filter((m) => m.live).map((m) => (m.id === 'crypto' ? 'Crypto (10% off)' : m.label))
  const hasEmail = SITE.email && !SITE.email.startsWith('[')
  const hasWhatsapp = SITE.whatsapp && !SITE.whatsapp.startsWith('[')
  const waHref = `https://wa.me/${(SITE.whatsapp || '').replace(/\D/g, '')}`

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col">
            <span className="brand-word" style={{ display: 'block' }}>
              Australian Reserve Props
              <small>Studio-grade prop money · Est. {SITE.foundingYear}</small>
            </span>
            <p style={{ marginTop: '1rem', maxWidth: '40ch' }}>
              Reduced-scale, clearly marked prop currency for film, TV, theatre, content and events. Built to RBA reproduction guidance, shipped Australia-wide.
            </p>
            <div style={{ marginTop: '1rem' }}>
              <ComplianceBadge />
            </div>
            <div className="footer-trust" aria-label="Trust signals">
              <span>For motion picture &amp; performance use</span>
              <span>RBA-compliant sizing</span>
              <span>Ships Australia-wide</span>
              <span>{livePayments.join(' · ')}</span>
            </div>
          </div>

          <div className="footer-col">
            <h4>Shop</h4>
            <ul>
              {CATEGORIES.map((c) => (
                <li key={c.slug}><Link href={`/shop/${c.slug}/`}>{c.name}</Link></li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <h4>Company</h4>
            <ul>
              <li><Link href="/about/">About</Link></li>
              <li><Link href="/wholesale/">Production &amp; wholesale</Link></li>
              <li><Link href="/blog/">Guides</Link></li>
              <li><Link href="/faq/">FAQ</Link></li>
              <li><Link href="/contact/">Contact</Link></li>
              <li><Link href="/cart/">Cart</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Legal &amp; support</h4>
            <ul>
              <li><Link href="/shipping/">Shipping</Link></li>
              <li><Link href="/refund/">Refunds</Link></li>
              <li><Link href="/privacy/">Privacy</Link></li>
              <li><Link href="/terms/">Terms</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Contact</h4>
            <ul className="contact-list">
              {hasEmail && <li><span>Email</span><a href={`mailto:${encodedEmail(SITE.email)}`} dangerouslySetInnerHTML={{ __html: encodedEmail(SITE.email) }} /></li>}
              {hasWhatsapp && <li><span>WhatsApp</span><a href={waHref} target="_blank" rel="noopener noreferrer">{SITE.whatsapp}</a></li>}
            </ul>
          </div>
        </div>

        <div className="footer-verified">
          <VerifiedBusiness compact />
        </div>

        <p className="footer-legal">
          All products sold by {SITE.name} are novelty prop items — reproductions sized to differ from genuine Australian currency by at least 25% in line with Reserve Bank of Australia reproduction guidance, carrying no replicated banknote security features and clearly marked NOT LEGAL TENDER. They are not currency, cannot be used as payment, and are sold for film, television, theatre, content creation, education, and novelty use only. We do not offer custom or buyer-specified serial numbers on any product. {SITE.name} is a trading name of {SITE.legalName} (ABN {SITE.abn}). Australian Consumer Law rights apply.
        </p>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} {SITE.legalName} · {SITE.location}</span>
          <span>Australia only · Australia Post tracked</span>
        </div>
      </div>
    </footer>
  )
}
