'use client'

import { useState } from 'react'
import QtyStepper from './QtyStepper'
import { addToCart } from '@/lib/cart'

const CIRCULATION = ['Standard Clean', 'Light Circulation', 'Heavy Circulation']
const PACKAGING = ['Standard Paper Band', 'Loose Notes']

export default function AddToCartButton({ product }) {
  const [qty, setQty] = useState(1)
  const [circulation, setCirculation] = useState(CIRCULATION[0])
  const [packaging, setPackaging] = useState(PACKAGING[0])
  const [added, setAdded] = useState(false)

  function handleAdd() {
    addToCart({
      slug: product.slug,
      name: product.name,
      price: product.price,
      qty,
      circulation: product.circulationOptions ? circulation : null,
      packaging,
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {product.circulationOptions && (
        <div className="field">
          <label htmlFor="circulation">Circulation level</label>
          <select id="circulation" value={circulation} onChange={(e) => setCirculation(e.target.value)}>
            {CIRCULATION.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
      )}

      <div className="field">
        <label htmlFor="packaging">Packaging</label>
        <select id="packaging" value={packaging} onChange={(e) => setPackaging(e.target.value)}>
          {PACKAGING.map((p) => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>
      </div>

      <p style={{ fontSize: '0.82rem', color: 'var(--ink-faint)' }}>
        Serial numbers are system-assigned on every note — custom or buyer-specified serials are not offered.
      </p>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
        <QtyStepper value={qty} onChange={setQty} />
        <button type="button" className="btn btn-accent" onClick={handleAdd}>
          {added ? 'Added ✓' : 'Add to Cart'}
        </button>
      </div>
    </div>
  )
}
