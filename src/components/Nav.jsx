'use client'

import Link from 'next/link'
import { useState } from 'react'
import { SITE, CATEGORIES } from '@/config/site'

const NAV_LINKS = [
  { href: '/shop/', label: 'Shop' },
  { href: '/wholesale/', label: 'Wholesale' },
  { href: '/blog/', label: 'Blog' },
  { href: '/faq/', label: 'FAQ' },
  { href: '/about/', label: 'About' },
  { href: '/contact/', label: 'Contact' },
]

export default function Nav() {
  const [open, setOpen] = useState(false)

  return (
    <header className="site-header">
      <div className="container nav-row">
        <Link href="/" className="brand">
          <span className="brand-mark" aria-hidden="true">ARP</span>
          {SITE.name}
        </Link>

        <nav aria-label="Primary">
          <ul className="nav-links">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href}>{l.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="nav-actions">
          <Link href="/cart/" className="btn btn-outline tap-target" aria-label="View cart">
            Cart
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
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)}>
              {l.label}
            </Link>
          ))}
          <div style={{ marginTop: '0.5rem', display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
            {CATEGORIES.map((c) => (
              <Link
                key={c.slug}
                href={`/shop/${c.slug}/`}
                onClick={() => setOpen(false)}
                className="chip"
                style={{ textDecoration: 'none' }}
              >
                {c.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
