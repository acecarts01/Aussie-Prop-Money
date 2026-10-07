'use client'

import Link from 'next/link'
import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { SITE, CATEGORIES, BRANDS } from '@/config/site'
import { getCart } from '@/lib/cart'
import Icon from '@/components/Icon'

const NAV_LINKS = [
  { href: '/shop/', label: 'Shop', dropdown: true },
  { href: '/wholesale/', label: 'Production' },
  { href: '/blog/', label: 'Guides' },
  { href: '/faq/', label: 'FAQ' },
  { href: '/about/', label: 'About' },
  { href: '/contact/', label: 'Contact' },
]

export default function Nav() {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [count, setCount] = useState(0)
  const [activeSlide, setActiveSlide] = useState(0)
  const searchInputRef = useRef(null)

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    if (!query.trim()) return
    router.push(`/search/?q=${encodeURIComponent(query.trim())}`)
    setSearchOpen(false)
    setQuery('')
  }

  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [searchOpen])

  const slides = [
    {
      id: 'abn',
      content: (
        <a href={SITE.abrUrl} target="_blank" rel="noopener noreferrer" className="topbar-abn">
          <span className="topbar-abn-num">ABN {SITE.abn}</span>
          <span className="topbar-abn-name">{SITE.legalName} · Registered Australian company · Verify <span aria-hidden="true">↗</span></span>
        </a>
      ),
    },
    {
      id: 'compliance',
      content: (
        <div className="announce">
          <em>Not legal tender</em> · RBA-COMPLIANT SIZING · Reduced-scale prop currency<span className="announce-more"> for film, theatre &amp; performance · Ships Australia-wide</span>
        </div>
      ),
    },
    {
      id: 'crypto',
      content: (
        <div className="announce">
          <em>10% Crypto Discount</em> · BTC · ETH · USDT · BNB <span className="announce-more">· Auto-applied at checkout</span>
        </div>
      ),
    },
  ]

  useEffect(() => {
    const sync = () => setCount(getCart().reduce((n, i) => n + i.qty, 0))
    sync()
    window.addEventListener('cart-updated', sync)
    return () => window.removeEventListener('cart-updated', sync)
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length)
    }, 4500)
    return () => clearInterval(timer)
  }, [slides.length])

  const dropdownGroups = [
    {
      title: 'By Denomination',
      items: CATEGORIES.filter((c) => ['twenty-dollar-notes', 'fifty-dollar-notes', 'hundred-dollar-notes', 'vintage-series-notes'].includes(c.slug)),
    },
    {
      title: 'Sets & Production',
      items: CATEGORIES.filter((c) => ['packs-bundles', 'briefcases-bags', 'display-collectibles', 'accessories'].includes(c.slug)),
    },
    {
      title: 'Gifts & Novelty',
      items: CATEGORIES.filter((c) => ['kids-play-money', 'personalised-novelty', 'confetti-party-favors', 'gift-sets'].includes(c.slug)),
    },
    {
      title: 'Brands',
      items: BRANDS,
    },
  ]

  return (
    <header className="site-header">
      <div className="topbar">
        <div className="container topbar-inner">
          {slides.map((slide, i) => (
            <div key={slide.id} className={`topbar-slide ${i === activeSlide ? 'active' : ''}`}>
              {slide.content}
            </div>
          ))}
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
              <li key={l.href} className={l.dropdown ? 'has-dropdown' : ''}>
                <Link href={l.href}>{l.label}</Link>
                {l.dropdown && (
                  <div className="dropdown-mega">
                    {dropdownGroups.map((group) => (
                      <div key={group.title} className="dropdown-col">
                        <h5>{group.title}</h5>
                        <ul>
                          {group.items.map((item) => (
                            <li key={item.slug}>
                              <Link href={`/shop/${item.slug}/`}>{item.name}</Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="nav-actions">
          <button 
            type="button" 
            className="btn-icon" 
            aria-label="Toggle search"
            onClick={() => setSearchOpen(!searchOpen)}
          >
            <Icon name="search" size={20} />
          </button>
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

      {searchOpen && (
        <div className="search-overlay">
          <div className="container search-overlay-inner">
            <form onSubmit={handleSearchSubmit} className="search-form">
              <Icon name="search" size={20} className="search-form-icon" />
              <input
                ref={searchInputRef}
                type="search"
                placeholder="Search products, guides, information..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                autoFocus
              />
              <button type="button" className="search-close" onClick={() => setSearchOpen(false)} aria-label="Close search">✕</button>
            </form>
          </div>
        </div>
      )}

      {open && (
        <div id="mobile-menu" className="container mobile-menu">
          {NAV_LINKS.map((l) => (
            <div key={l.href}>
              <Link href={l.href} onClick={() => setOpen(false)}>{l.label}</Link>
              {l.dropdown && (
                <div className="mobile-subs" style={{ paddingLeft: '1rem', marginBottom: '0.5rem' }}>
                  {[...CATEGORIES, ...BRANDS].map((c) => (
                    <Link
                      key={c.slug}
                      href={`/shop/${c.slug}/`}
                      onClick={() => setOpen(false)}
                      style={{ fontSize: '0.8rem', padding: '0.6rem 0', borderBottom: '1px solid var(--line)', opacity: 0.8 }}
                    >
                      {c.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </header>
  )
}
