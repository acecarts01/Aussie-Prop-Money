import { PRODUCTS, CATEGORIES } from '@/config/site'
import { formatPriceShort } from '@/lib/utils'

const LADDER_CATEGORIES = ['twenty-dollar-notes', 'fifty-dollar-notes', 'hundred-dollar-notes', 'briefcases-bags']

// Original data table: every figure is read straight from the live catalogue, so it cannot drift from the shop.
export default function PriceLadder() {
  const rows = LADDER_CATEGORIES.flatMap((slug) =>
    PRODUCTS.filter((p) => p.category === slug && p.noteCount > 1 && p.faceValue).sort((a, b) => a.faceValue - b.faceValue)
  )
  if (!rows.length) return null
  const catName = (slug) => CATEGORIES.find((c) => c.slug === slug)?.name

  return (
    <section style={{ margin: '0 0 2rem' }} aria-labelledby="price-ladder">
      <h2 id="price-ladder" style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Price per note, pack by pack</h2>
      <p style={{ margin: '0 0 0.75rem', fontSize: '0.95rem' }}>
        Current Australian Reserve Props prices in AUD, GST inclusive, for every note pack and briefcase set.
      </p>
      <div className="data-table-wrap">
        <table className="data-table">
          <thead>
            <tr><th scope="col">Pack</th><th scope="col">Range</th><th scope="col">Notes</th><th scope="col">Face value</th><th scope="col">Price</th><th scope="col">Per note</th></tr>
          </thead>
          <tbody>
            {rows.map((p) => (
              <tr key={p.slug}>
                <th scope="row">{p.name}</th>
                <td>{catName(p.category)}</td>
                <td>{p.noteCount.toLocaleString('en-AU')}</td>
                <td>{formatPriceShort(p.faceValue)}</td>
                <td>{formatPriceShort(p.price)}</td>
                <td>{formatPriceShort(p.price / p.noteCount)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
