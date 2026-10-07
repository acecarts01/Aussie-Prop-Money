'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { REVIEWS, SITE } from '@/config/site'
import Icon from './Icon'

export default function ReviewSlider() {
  const [active, setActive] = useState(0)
  const timer = useRef(null)

  // Only show reviews from the ABN registration date (2024-04-22)
  const abnDate = new Date('2024-04-22')
  const validReviews = REVIEWS.filter(r => new Date(r.date) >= abnDate)

  const next = () => setActive((v) => (v + 1) % validReviews.length)
  const prev = () => setActive((v) => (v - 1 + validReviews.length) % validReviews.length)

  useEffect(() => {
    timer.current = setInterval(next, 8000)
    return () => clearInterval(timer.current)
  }, [validReviews.length])

  if (!validReviews.length) return null

  return (
    <div className="rev-slider-wrap">
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="trustpilot-summary"
      >
        <div className="tp-logo">
          <Icon name="trustpilot" size={24} style={{ color: '#00b67a' }} />
          <span>Trustpilot</span>
        </div>
        <div className="tp-rating">
          <div className="stars">
            {[1, 2, 3, 4, 5].map((s) => (
              <div key={s} className={`tp-star-box ${s <= Math.floor(SITE.trustpilotRating) ? 'filled' : ''}`}>
                <Icon name="trustpilot" size={14} />
              </div>
            ))}
          </div>
          <span className="rating-text">TrustScore <b>{SITE.trustpilotRating}</b> | <b>{SITE.reviewCount}</b> reviews</span>
        </div>
      </motion.div>

      <div className="rev-slider">
        <button type="button" className="rev-nav prev" onClick={prev} aria-label="Previous review">
          <Icon name="arrow" size={20} style={{ transform: 'rotate(180deg)' }} />
        </button>

        <div className="rev-container" style={{ position: 'relative', height: '100%', width: '100%' }}>
          <AnimatePresence mode="wait">
            <motion.div 
              key={active}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="rev-slide active"
              style={{ position: 'relative' }}
            >
              <div className="rev-stars">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Icon key={s} name="trustpilot" size={16} style={{ color: s <= validReviews[active].rating ? '#00b67a' : 'var(--line-strong)' }} />
                ))}
              </div>
              <blockquote>{validReviews[active].text}</blockquote>
              <div className="rev-meta">
                <span className="name">{validReviews[active].name}</span>
                {validReviews[active].location && <span className="loc">{validReviews[active].location}</span>}
                <span className="date">{new Date(validReviews[active].date).toLocaleDateString('en-AU', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <button type="button" className="rev-nav next" onClick={next} aria-label="Next review">
          <Icon name="arrow" size={20} />
        </button>
      </div>

      <div className="rev-dots">
        {validReviews.map((_, i) => (
          <button
            key={i}
            type="button"
            className={`dot ${i === active ? 'active' : ''}`}
            onClick={() => setActive(i)}
            aria-label={`Go to review ${i + 1}`}
          />
        ))}
      </div>

      <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
        <a href="/reviews/" className="btn btn-ghost" style={{ fontSize: '0.9rem' }}>
          View more reports ({SITE.reviewCount}) →
        </a>
      </div>
    </div>
  )
}
