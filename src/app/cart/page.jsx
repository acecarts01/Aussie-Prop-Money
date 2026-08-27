'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import QtyStepper from '@/components/QtyStepper'
import WebForm from '@/components/WebForm'
import { getCart, updateQty, removeFromCart, subtotal } from '@/lib/cart'
import { formatPrice } from '@/lib/utils'
import { SITE, PAYMENT_METHODS } from '@/config/site'

export default function CartPage() {
  const [items, setItems] = useState([])
  const [paymentMethod, setPaymentMethod] = useState('bank-transfer')

  useEffect(() => {
    const sync = () => setItems(getCart())
    sync()
    window.addEventListener('cart-updated', sync)
    return () => window.removeEventListener('cart-updated', sync)
  }, [])

  const sub = subtotal(items)
  const shipping = sub === 0 || sub >= SITE.orderRules.freeShippingThreshold ? 0 : SITE.orderRules.flatShippingFee
  const total = sub + shipping

  const summary = items
    .map((i) => `${i.qty} x ${i.name}${i.circulation ? ` (${i.circulation}` : ''}${i.packaging ? `${i.circulation ? ', ' : ' ('}${i.packaging})` : i.circulation ? ')' : ''} — ${formatPrice(i.price * i.qty)}`)
    .join('\n')

  return (
    <div className="container section" style={{ maxWidth: '900px' }}>
      <h1>Your Cart</h1>

      {items.length === 0 ? (
        <p>
          Your cart is empty. <Link href="/shop/">Browse the shop</Link>.
        </p>
      ) : (
        <>
          <div className="table-wrap" style={{ marginBottom: '1.5rem' }}>
            <table>
              <thead>
                <tr><th>Item</th><th>Options</th><th>Qty</th><th>Price</th><th></th></tr>
              </thead>
              <tbody>
                {items.map((item, i) => (
                  <tr key={i}>
                    <td>{item.name}</td>
                    <td style={{ fontSize: '0.82rem', color: 'var(--ink-faint)' }}>
                      {item.circulation ? `${item.circulation} · ` : ''}{item.packaging}
                    </td>
                    <td><QtyStepper value={item.qty} onChange={(q) => updateQty(i, q)} /></td>
                    <td className="product-price">{formatPrice(item.price * item.qty)}</td>
                    <td>
                      <button type="button" className="btn btn-outline" style={{ padding: '0.4rem 0.8rem' }} onClick={() => removeFromCart(i)}>
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', flexDirection: 'column', alignItems: 'flex-end', gap: '0.25rem', marginBottom: '2rem' }}>
            <span>Subtotal: {formatPrice(sub)}</span>
            <span>Shipping: {shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
            {shipping > 0 && (
              <span style={{ fontSize: '0.82rem', color: 'var(--ink-faint)' }}>
                Free shipping over {formatPrice(SITE.orderRules.freeShippingThreshold)}
              </span>
            )}
            <strong style={{ fontSize: '1.2rem' }}>Total: {formatPrice(total)}</strong>
          </div>

          <div className="card" style={{ padding: '1.5rem' }}>
            <h2 style={{ fontSize: '1.15rem' }}>Request This Order</h2>
            <p style={{ fontSize: '0.9rem', color: 'var(--ink-soft)' }}>
              We&rsquo;ll confirm your order and send payment details for your chosen method. No card payment is live
              yet — Bank Transfer, PayID, and crypto are all priced the same, with no method discounted over another.
            </p>

            <fieldset style={{ border: 'none', padding: 0, margin: '1rem 0' }}>
              <legend style={{ fontWeight: 600, marginBottom: '0.5rem' }}>Preferred payment method</legend>
              {PAYMENT_METHODS.map((m) => (
                <label key={m.id} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem', opacity: m.live ? 1 : 0.5 }}>
                  <input
                    type="radio"
                    name="payment_method"
                    value={m.label}
                    disabled={!m.live}
                    checked={paymentMethod === m.id}
                    onChange={() => setPaymentMethod(m.id)}
                  />
                  {m.label} {!m.live && '(coming soon)'}
                </label>
              ))}
            </fieldset>

            <WebForm
              subject="New order request — Australian Reserve Props"
              fromName="Website Cart"
              thankYouHref="/thank-you-order/"
              submitLabel="Send Order Request"
              fields={
                <>
                  <input type="hidden" name="order_summary" value={summary} />
                  <input type="hidden" name="order_total" value={formatPrice(total)} />
                  <div className="field">
                    <label htmlFor="name">Name</label>
                    <input id="name" name="name" type="text" required />
                  </div>
                  <div className="field">
                    <label htmlFor="email">Email</label>
                    <input id="email" name="email" type="email" required />
                  </div>
                  <div className="field">
                    <label htmlFor="notes">Notes (optional)</label>
                    <textarea id="notes" name="notes" rows={3} />
                  </div>
                </>
              }
            />
          </div>
        </>
      )}
    </div>
  )
}
