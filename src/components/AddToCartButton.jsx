'use client'

import { useState } from 'react'
import QtyStepper from './QtyStepper'
import { addToCart } from '@/lib/cart'
import { formatPrice } from '@/lib/utils'
import { CIRCULATION_OPTIONS, PACKAGING_OPTIONS } from '@/config/site'

export default function AddToCartButton({ product }) {
  const [qty, setQty] = useState(1)
  const [circulation, setCirculation] = useState(CIRCULATION_OPTIONS[0])
  const [packaging, setPackaging] = useState(PACKAGING_OPTIONS[0])
  const [added, setAdded] = useState(false)

  const unitPrice = product.price + (product.circulationOptions ? circulation.price : 0) + packaging.price
  const totalPrice = unitPrice * qty

  function handleAdd() {
    addToCart({
      slug: product.slug,
      name: product.name,
      price: unitPrice,
      qty,
      circulation: product.circulationOptions ? circulation.label : null,
      packaging: packaging.label,
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div className="option-stack">
      {product.circulationOptions && (
        <fieldset className="option-step">
          <legend><span className="step-num">1</span> Distressing / Circulation Level</legend>
          <div className="option-grid">
            {CIRCULATION_OPTIONS.map((opt) => (
              <button
                key={opt.id}
                type="button"
                className={`option-tile${circulation.id === opt.id ? ' selected' : ''}`}
                aria-pressed={circulation.id === opt.id}
                onClick={() => setCirculation(opt)}
              >
                <span className="option-tile-label">{opt.label}</span>
                <span className="option-tile-desc">{opt.desc}</span>
                {opt.price > 0 && <span className="option-tile-price">+{formatPrice(opt.price)}</span>}
              </button>
            ))}
          </div>
        </fieldset>
      )}

      <fieldset className="option-step">
        <legend><span className="step-num">2</span> Packaging / Currency Band Style</legend>
        <div className="option-grid option-grid-3">
          {PACKAGING_OPTIONS.map((opt) => (
            <button
              key={opt.id}
              type="button"
              className={`option-tile${packaging.id === opt.id ? ' selected' : ''}`}
              aria-pressed={packaging.id === opt.id}
              onClick={() => setPackaging(opt)}
            >
              <span className="option-tile-label">{opt.label}</span>
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset className="option-step">
        <legend><span className="step-num">3</span> Serialization</legend>
        <div className="option-tile selected" style={{ cursor: 'default' }}>
          <span className="option-tile-label">Standard Sequential</span>
          <span className="option-tile-desc">System-assigned serial code. Custom or buyer-specified serials are not offered on any product.</span>
        </div>
      </fieldset>

      <div className="price-summary">
        <span>Item unit price: <strong>{formatPrice(unitPrice)}</strong></span>
        <span>Total: <strong className="product-price">{formatPrice(totalPrice)}</strong></span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
        <QtyStepper value={qty} onChange={setQty} />
        <button type="button" className="btn btn-accent" onClick={handleAdd}>
          {added ? 'Added ✓' : 'Add to Cart'}
        </button>
      </div>
    </div>
  )
}
