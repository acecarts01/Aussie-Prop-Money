'use client'

import { useState } from 'react'
import QtyStepper from './QtyStepper'
import { addToCart } from '@/lib/cart'
import { formatPrice } from '@/lib/utils'
import { SITE, ORDER, CIRCULATION_OPTIONS, PACKAGING_OPTIONS } from '@/config/site'

/**
 * Quantity + add-to-order straight from a product card, with the running line
 * total, the crypto price, and how many units reach the order minimum. Adds
 * with the default circulation / packaging; the product page still offers the
 * full option set.
 */
export default function CardAdd({ product }) {
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)
  const minOrder = SITE.orderRules.minOrder
  const line = product.price * qty
  const crypto = product.price * (1 - ORDER.cryptoDiscount)
  const unitsToMin = Math.ceil(minOrder / product.price)

  function add() {
    addToCart({
      slug: product.slug,
      name: product.name,
      price: product.price,
      qty,
      circulation: product.circulationOptions ? CIRCULATION_OPTIONS[0].label : null,
      packaging: PACKAGING_OPTIONS[0].label,
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 1800)
  }

  return (
    <div className="card-add" onClick={(e) => e.stopPropagation()}>
      <div className="card-add-prices">
        <span className="product-price">{formatPrice(product.price)}</span>
        <span className="card-crypto">{formatPrice(crypto)} <em>with crypto · 10% off</em></span>
      </div>
      <div className="card-add-row">
        <QtyStepper value={qty} onChange={setQty} />
        <button type="button" className="btn btn-accent card-add-btn" onClick={add} aria-live="polite">
          {added ? 'Added ✓' : `Add ${qty > 1 ? qty + ' · ' : ''}${formatPrice(line)}`}
        </button>
      </div>
      <p className="card-min">
        {line >= minOrder
          ? <>Clears the {formatPrice(minOrder)} minimum on its own</>
          : <>{unitsToMin} × reaches the {formatPrice(minOrder)} minimum — or mix with other items</>}
      </p>
    </div>
  )
}
