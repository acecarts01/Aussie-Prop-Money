'use client'

import { useState } from 'react'
import WebForm from './WebForm'

export default function SubmitSetReport({ productName }) {
  const [rating, setRating] = useState(5)

  return (
    <div className="set-report">
      <h2 style={{ fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        💬 Submit Set Report
      </h2>
      <p style={{ fontSize: '0.9rem' }}>
        Used this on a shoot or on stage? Share your camera-test results or set feedback — every submission is
        reviewed by us before it&rsquo;s published, so it won&rsquo;t appear instantly.
      </p>

      <WebForm
        subject={`Set report${productName ? ` — ${productName}` : ''} — Australian Reserve Props`}
        fromName="Set Report Form"
        thankYouHref="/thank-you-contact/"
        submitLabel="Submit Set Report"
        fields={
          <>
            {productName && <input type="hidden" name="product" value={productName} />}
            <input type="hidden" name="set_rating" value={rating} />
            <div className="field">
              <label htmlFor="sr-name">Your Name</label>
              <input id="sr-name" name="name" type="text" placeholder="e.g. John K. (Grip)" required />
            </div>
            <div className="field">
              <label htmlFor="sr-role">Production Role / Title</label>
              <input id="sr-role" name="role" type="text" placeholder="Production Coordinator" />
            </div>
            <div className="field">
              <label htmlFor="sr-email">Email</label>
              <input id="sr-email" name="email" type="email" required />
            </div>
            <div className="field">
              <span id="sr-rating-label">Set Rating</span>
              <div className="star-picker" role="radiogroup" aria-labelledby="sr-rating-label">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button
                    key={n}
                    type="button"
                    role="radio"
                    aria-checked={rating === n}
                    aria-label={`${n} star${n > 1 ? 's' : ''}`}
                    className={n <= rating ? 'filled' : ''}
                    onClick={() => setRating(n)}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>
            <div className="field">
              <label htmlFor="sr-feedback">Feedback / Set Experience</label>
              <textarea id="sr-feedback" name="feedback" rows={4} placeholder="Describe how the notes handled under lighting, crispness on camera, or audience reaction…" required />
            </div>
          </>
        }
      />
    </div>
  )
}
