import { formatPrice } from '@/lib/utils'
import { valueReturn } from '@/lib/value'

/**
 * Price, note count and price per note.
 *   size="card"  → one-line strip for product cards
 *   size="hero"  → the buy-panel block
 */
export default function ValueReturn({ product, size = 'card' }) {
  const v = valueReturn(product)
  if (!v) return null

  if (size === 'card') {
    return (
      <p className="value-strip">
        <span className="pay">{formatPrice(product.price)}</span>
        <span className="get">{v.noteCount.toLocaleString('en-AU')} notes</span>
        <span className="mult">{formatPrice(v.costPerNote)} / note</span>
      </p>
    )
  }

  return (
    <div className="value-hero" aria-label="Price and note count">
      <div className="value-col">
        <span className="k">Price</span>
        <span className="v pay">{formatPrice(product.price)}</span>
        <span className="s">AUD · GST inc.</span>
      </div>
      <div className="value-col">
        <span className="k">In the pack</span>
        <span className="v get">{v.noteCount.toLocaleString('en-AU')} notes</span>
        <span className="s">{product.mix}</span>
      </div>
      <div className="value-badge">
        <span className="mult">{formatPrice(v.costPerNote)}</span>
        <span className="lbl">per note{v.badge ? ` · ${v.badge}` : ''}</span>
      </div>
    </div>
  )
}
