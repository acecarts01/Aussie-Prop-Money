'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { SITE, CATEGORIES } from '@/config/site'
import { getCart } from '@/lib/cart'

const NAV_LINKS = [
  { href: '/shop/', label: 'Shop' },
  { href: '/wholesale/', label: 'Production' },
  { href: '/blog/', label: 'Guides' },
  { href: '/faq/', label: 'FAQ' },
  { href: '/about/', label: 'About' },
  { href: '/contact/', label: 'Contact' },
]

export default function Nav() {
  const [open, setOpen] = useState(false)
  const [count, setCount] = useState(0)

  useEffect(() => {
    const sync = () => setCount(getCart().reduce((n, i) => n + i.qty, 0))
    sync()
    window.addEventListener('cart-updated', sync)
    return () => window.removeEventListener('cart-updated', sync)
  }, [])

  return (
    <header className="site-header">
      <div className="topbar">
        <div className="container topbar-row">
          <a href={SITE.abrUrl} target="_blank" rel="noopener noreferrer" className="topbar-abn">
            <span className="topbar-abn-num">ABN {SITE.abn}</span>
            <span className="topbar-abn-name">{SITE.legalName} · Registered Australian company · Verify <span aria-hidden="true">↗</span></span>
          </a>
          <div className="announce">
            <em>Not legal tender</em> · Reduced-scale prop currency<span className="announce-more"> for film, theatre &amp; performance · Ships Australia-wide</span>
          </div>
        </div>
      </div>

      <div className="container nav-row">
        <Link href="/" className="brand">
          <span className="brand-mark" aria-hidden="true">ARP</span>
          <span className="brand-word">
            Australian Reserve Props
            <small>Prop money · Est. {SITE.foundingYear}</small>
          </span>
        </Link>

        <nav aria-label="Primary">
          <ul className="nav-links">
            {NAV_LINKS.map((l) => (
              <li key={l.href}><Link href={l.href}>{l.label}</Link></li>
            ))}
          </ul>
        </nav>

        <div className="nav-actions">
          <Link href="/cart/" className="btn btn-outline tap-target" aria-label={`Cart, ${count} item${count === 1 ? '' : 's'}`}>
            Cart{count > 0 ? ` · ${count}` : ''}
          </Link>
          <button
            type="button"
            className="hamburger"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {open && (
        <div id="mobile-menu" className="container mobile-menu">
          {NAV_LINKS.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)}>{l.label}</Link>
          ))}
          <div className="chip-row" style={{ marginTop: '1rem' }}>
            {CATEGORIES.map((c) => (
              <Link key={c.slug} href={`/shop/${c.slug}/`} onClick={() => setOpen(false)} className="chip">
                {c.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
