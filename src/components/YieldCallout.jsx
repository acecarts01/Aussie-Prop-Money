import Link from 'next/link'
import { formatPrice } from '@/lib/utils'
import { yieldLadder, fmtFace } from '@/lib/value'

const SIZE_NAME = { 50: 'Half pack · single strap', 100: 'Full stack', 250: 'Jumbo pack' }

/**
 * "What arrives in your parcel" — the exact yield per strap / stack / jumbo for
 * this denomination, so the buyer never has to guess what a size means.
 */
export default function YieldCallout({ product }) {
  const ladder = yieldLadder(product.category)
  if (ladder.length < 2) return null
  const denom = product.mix?.match(/\$\d+/)?.[0] || ''

  return (
    <div className="yield">
      <div className="yield-head">
        <span className="eyebrow">What arrives in your parcel</span>
        <h2>Every {denom} size, note for note</h2>
        <p>Same note, same print, same banding — only the count changes. Pick the size by the shot: a strap for a wallet or handoff, a stack for a register or a table, a jumbo for a spread.</p>
      </div>
      <table className="yield-table">
        <thead>
          <tr><th>Size</th><th>Notes</th><th>Face value</th><th>You pay</th><th>Per note</th></tr>
        </thead>
        <tbody>
          {ladder.map((p) => {
            const current = p.slug === product.slug
            return (
              <tr key={p.slug} className={current ? 'current' : undefined} aria-current={current ? 'true' : undefined}>
                <td>
                  <Link href={`/product/${p.slug}/`}>{SIZE_NAME[p.noteCount] || p.name}</Link>
                  {current && <span className="tag">Viewing</span>}
                </td>
                <td className="num">{p.noteCount.toLocaleString('en-AU')}</td>
                <td className="num face">{fmtFace(p.faceValue)}</td>
                <td className="num">{formatPrice(p.price)}</td>
                <td className="num">{formatPrice(p.price / p.noteCount)}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <p className="yield-foot">Face value is the value printed on the prop notes. Every note is reduced-scale, marked NOT LEGAL TENDER, and carries no replicated security features.</p>
    </div>
  )
}
