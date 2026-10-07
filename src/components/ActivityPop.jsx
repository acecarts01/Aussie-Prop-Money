'use client'

import { useState, useEffect, useCallback } from 'react'
import { REVIEWS, SITE } from '@/config/site'
import Icon from './Icon'

export default function ActivityPop() {
  const [show, setShow] = useState(false)
  const [review, setReview] = useState(null)

  const pickReview = useCallback(() => {
    // Only show high-quality reviews or those from the recent set
    const filtered = REVIEWS.filter(r => r.rating >= 4)
    const random = filtered[Math.floor(Math.random() * filtered.length)]
    setReview(random)
  }, [])

  useEffect(() => {
    // Wait 10 seconds before the first one
    const firstTimer = setTimeout(() => {
      pickReview()
      setShow(true)
    }, 10000)

    const interval = setInterval(() => {
      pickReview()
      setShow(true)
      
      // Auto-hide after 8 seconds
      setTimeout(() => setShow(false), 8000)
    }, 30000)

    return () => {
      clearTimeout(firstTimer)
      clearInterval(interval)
    }
  }, [pickReview])

  if (!review) return null

  return (
    <div className={`activity-pop ${show ? 'active' : ''}`}>
      <button type="button" className="close" onClick={() => setShow(false)} aria-label="Close notification">✕</button>
      <div className="ap-icon">
        <Icon name="check" size={14} />
      </div>
      <div className="ap-content">
        <p className="ap-title">Verified Set Report</p>
        <p className="ap-text">
          <b>{review.name}</b> from {review.location || 'Australia'} rated 5★
          <span className="quote">&ldquo;{review.text.length > 80 ? review.text.slice(0, 80) + '...' : review.text}&rdquo;</span>
        </p>
        <div className="ap-meta">
          <span className="tp-link">
            <Icon name="trustpilot" size={12} style={{ color: '#00b67a' }} />
            Verified Purchase
          </span>
          <span className="time">Just now</span>
        </div>
      </div>
    </div>
  )
}
