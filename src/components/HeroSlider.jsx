'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import LinkNext from 'next/link'
import { motion, AnimatePresence } from 'motion/react'
import { HERO } from '@/config/site'
import Icon from './Icon'

const SLIDES = [
  {
    id: 1,
    eyebrow: 'Prop currency for production',
    h1Lines: HERO.h1Lines,
    sub: HERO.sub,
    image: HERO.image,
    ctaPrimary: HERO.ctaPrimary,
    ctaSecondary: HERO.ctaSecondary,
  },
  {
    id: 2,
    eyebrow: '10% Crypto Discount',
    title: 'Pay with Crypto and Save 10%',
    sub: 'Get an immediate 10% discount on your goods subtotal when paying with Bitcoin, Ethereum, USDT, or BNB. Auto-applied at checkout.',
    image: 'hundred-dollar-prop-note-stack.webp',
    ctaPrimary: { label: 'Shop now', href: '/shop/' },
    ctaSecondary: { label: 'About payment', href: '/faq/' },
  },
  {
    id: 3,
    eyebrow: 'Australian Registered Business',
    title: 'Verified ABN: 84 676 764 971',
    sub: 'Money 365 Pty Ltd is a fully registered Australian Private Company. We operate under strict RBA reproduction guidance for full compliance.',
    image: 'briefcase-prop-set-50k.webp',
    ctaPrimary: { label: 'Verify on ABR', href: 'https://abr.business.gov.au/ABN/View?id=84676764971' },
    ctaSecondary: { label: 'Our story', href: '/about/' },
  },
  {
    id: 4,
    eyebrow: 'Full Legal Compliance',
    title: 'RBA-COMPLIANT SIZING',
    sub: 'Every note is produced at reduced-scale to differ from genuine Australian currency by at least 25%, per RBA reproduction guidance.',
    image: 'fifty-dollar-prop-note-stack.webp',
    ctaPrimary: { label: 'Legal explainer', href: '/blog/is-prop-money-legal-in-australia/' },
    ctaSecondary: { label: 'Full FAQ', href: '/faq/' },
  }
]

export default function HeroSlider() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % SLIDES.length)
    }, 8000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="hero-cine gridlines" style={{ minHeight: '80vh', position: 'relative' }}>
      <AnimatePresence mode="wait">
        <motion.div 
          key={active}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="hero-slide-item active" 
          style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center' }}
        >
          <div className="hero-media" aria-hidden="true">
            <motion.div
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              style={{ width: '100%', height: '100%' }}
            >
              <Image 
                src={`/images/products/${SLIDES[active].image}`} 
                alt={SLIDES[active].title || 'Prop money'} 
                fill 
                priority 
                sizes="100vw" 
                style={{ objectFit: 'cover', opacity: 0.6 }} 
              />
            </motion.div>
          </div>
          <div className="hero-scrim" aria-hidden="true" />
          
          <div className="container">
            <div className="hero-inner">
              <motion.span 
                initial={{ opacity: 0, y: 20, translateZ: 0 }}
                animate={{ opacity: 1, y: 0, translateZ: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="eyebrow"
              >
                {SLIDES[active].eyebrow}
              </motion.span>
              
              {active === 0 ? (
                <h1 className="h1-animated" style={{ perspective: '1000px' }}>
                  <motion.span 
                    initial={{ opacity: 0, y: 40, rotateX: 30, translateZ: 0 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0, translateZ: 0 }}
                    transition={{ delay: 0.3, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                    className="line"
                  >
                    {SLIDES[active].h1Lines[0]}
                  </motion.span>
                  <motion.span 
                    initial={{ opacity: 0, y: 40, rotateX: 30, translateZ: 0 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0, translateZ: 0 }}
                    transition={{ delay: 0.4, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                    className="line"
                  >
                    {SLIDES[active].h1Lines[1]}
                  </motion.span>
                  <motion.span 
                    initial={{ opacity: 0, y: 40, rotateX: 30, translateZ: 0 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0, translateZ: 0 }}
                    transition={{ delay: 0.5, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                    className="line accent"
                  >
                    {SLIDES[active].h1Lines[2]}
                  </motion.span>
                </h1>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, y: 40, translateZ: 0 }}
                  animate={{ opacity: 1, y: 0, translateZ: 0 }}
                  transition={{ delay: 0.3, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                  className="h1-style" 
                  style={{ marginBottom: '1.2rem', fontFamily: 'var(--font-display)', fontSize: 'clamp(2.6rem, 7vw, 5.4rem)', textTransform: 'uppercase', fontWeight: 800, lineHeight: 0.98, color: 'var(--ink)', perspective: '1000px' }}
                >
                  {SLIDES[active].title}
                </motion.div>
              )}
              
              <motion.p 
                initial={{ opacity: 0, y: 20, translateZ: 0 }}
                animate={{ opacity: 1, y: 0, translateZ: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="hero-sub"
              >
                {SLIDES[active].sub}
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.8 }}
                className="hero-cta"
              >
                <LinkNext href={SLIDES[active].ctaPrimary.href} className="btn btn-accent">
                  {SLIDES[active].ctaPrimary.label} <span className="arrow"><Icon name="arrow" size={16} /></span>
                </LinkNext>
                <LinkNext href={SLIDES[active].ctaSecondary.href} className="btn btn-outline">{SLIDES[active].ctaSecondary.label}</LinkNext>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="hero-meta" 
                style={{ marginTop: '1.4rem' }}
              >
                {HERO.meta.map(([k, v]) => (
                  <span key={k}>{k}: <b>{v}</b></span>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="hero-dots" style={{ position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '0.5rem', zIndex: 10 }}>
        {SLIDES.map((_, i) => (
          <button
            key={i}
            type="button"
            className={`dot ${i === active ? 'active' : ''}`}
            onClick={() => setActive(i)}
            aria-label={`Go to slide ${i + 1}`}
            style={{ width: i === active ? '24px' : '8px', height: '8px', borderRadius: '999px', background: i === active ? 'var(--accent)' : 'var(--line-strong)', border: 0, transition: 'all 300ms ease', cursor: 'pointer' }}
          />
        ))}
      </div>
      <span className="hero-corner" aria-hidden="true">{HERO.cornerTag}</span>
    </section>
  )
}
