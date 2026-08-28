import { PRODUCTS, NOTE_COLORS } from '@/config/site'
import { getCategory, formatPrice } from '@/lib/utils'

const DENOM_CATEGORIES = ['hundred-dollar-notes', 'fifty-dollar-notes', 'twenty-dollar-notes']

export default function ValueTable({ currentSlug }) {
  const rows = DENOM_CATEGORIES
    .map((cat) => PRODUCTS.find((p) => p.category === cat))
    .filter(Boolean)

  return (
    <div className="value-table">
      <div className="value-table-head">Face Value Per Stack</div>
      {rows.map((p) => {
        const category = getCategory(p.category)
        return (
          <div key={p.slug} className={`value-row${p.slug === currentSlug ? ' current' : ''}`}>
            <span className="denom">
              <span className="denom-dot" style={{ background: NOTE_COLORS[category?.color] }} aria-hidden="true" />
              {p.name.replace(' AUD Prop Note Stack', '')}
            </span>
            <span>{formatPrice(p.price)} per stack</span>
            <span className="facevalue">{p.faceValueLabel.replace('face value per stack', '').trim()}</span>
          </div>
        )
      })}
      <p style={{ fontSize: '0.75rem', color: 'var(--ink-faint)', padding: '0.75rem 1.25rem 1rem' }}>
        &ldquo;Face value&rdquo; is the amount printed on the notes in the stack, not their real-world worth — every
        note is NOT LEGAL TENDER. Price is the same regardless of payment method.
      </p>
    </div>
  )
}
