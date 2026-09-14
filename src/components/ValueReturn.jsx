import { formatPrice } from '@/lib/utils'
import { valueReturn, fmtFace } from '@/lib/value'

/**
 * "What you pay vs. what you receive" — the face-value return, stated plainly.
 *   size="card"  → one-line strip for product cards
 *   size="hero"  → the buy-panel block: price, arrow, face value, multiplier badge
 */
export default function ValueReturn({ product, size = 'card' }) {
  const v = valueReturn(product)
  if (!v) return null

  if (size === 'card') {
    return (
      <p className="value-strip">
        <span className="pay">Pay {formatPrice(product.price)}</span>
        <span className="arrow" aria-hidden="true">→</span>
        <span className="get">{fmtFace(v.faceValue)} face value</span>
        <span className="mult">{v.multiplier}×</span>
      </p>
    )
  }

  return (
    <div className="value-hero" aria-label="What you pay versus the prop face value you receive">
      <div className="value-col">
        <span className="k">You pay</span>
        <span className="v pay">{formatPrice(product.price)}</span>
        <span className="s">Real AUD · GST inc.</span>
      </div>
      <div className="value-arrow" aria-hidden="true">→</div>
      <div className="value-col">
        <span className="k">You receive</span>
        <span className="v get">{fmtFace(v.faceValue)}</span>
        <span className="s">{v.noteCount.toLocaleString('en-AU')} camera-ready prop notes · {product.mix}</span>
      </div>
      <div className="value-badge">
        <span className="mult">{v.multiplier}×</span>
        <span className="lbl">{v.badge.replace(/^\d+× · ?/, '').replace(/^\d+× /, '')}</span>
      </div>
    </div>
  )
}
