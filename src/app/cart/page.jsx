'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import QtyStepper from '@/components/QtyStepper'
import WebForm from '@/components/WebForm'
import PageHeader from '@/components/PageHeader'
import FaqBlock from '@/components/FaqBlock'
import ComplianceBadge from '@/components/ComplianceBadge'
import { getCart, updateQty, removeFromCart, subtotal } from '@/lib/cart'
import { formatPrice } from '@/lib/utils'
import { SITE, PAYMENT_METHODS, PAGE_FAQS, ORDER } from '@/config/site'
import VerifiedBusiness from '@/components/VerifiedBusiness'

export default function CartPage() {
  const [items, setItems] = useState([])
  const [paymentMethod, setPaymentMethod] = useState('payid')

  useEffect(() => {
    const sync = () => setItems(getCart())
    sync()
    window.addEventListener('cart-updated', sync)
    return () => window.removeEventListener('cart-updated', sync)
  }, [])

  const method = PAYMENT_METHODS.find((m) => m.id === paymentMethod) || PAYMENT_METHODS[0]
  const sub = subtotal(items)
  const discount = method.discount ? Math.round(sub * method.discount * 100) / 100 : 0
  const shipping = sub === 0 || sub >= SITE.orderRules.freeShippingThreshold ? 0 : SITE.orderRules.flatShippingFee
  const total = sub - discount + shipping

  const summary = items
    .map((i) => `${i.qty} x ${i.name}${i.circulation ? ` (${i.circulation}` : ''}${i.packaging ? `${i.circulation ? ', ' : ' ('}${i.packaging})` : i.circulation ? ')' : ''} — ${formatPrice(i.price * i.qty)}`)
    .join('\n')

  return (
    <div>
      <PageHeader
        eyebrow="Checkout"
        title="Your order"
        subtitle="Review your set, choose a payment method, and send the request. We confirm before anything prints."
      />
      <section className="section surface-1">
        <div className="container" style={{ maxWidth: '960px' }}>
          {items.length === 0 ? (
            <div className="card card-pad" style={{ textAlign: 'center', padding: '3rem 1.5rem' }}>
              <span className="eyebrow">Empty slate</span>
              <h2 style={{ fontSize: '1.5rem' }}>Nothing in your order yet</h2>
              <p style={{ color: 'var(--ink-2)' }}>Start with a note stack, a briefcase set, or a production pack.</p>
              <Link href="/shop/" className="btn btn-accent">Shop film-ready packs</Link>
            </div>
          ) : (
            <>
              <div className="table-wrap">
                <table>
                  <thead>
                    <tr><th>Item</th><th>Options</th><th>Qty</th><th>Price</th><th></th></tr>
                  </thead>
                  <tbody>
                    {items.map((item, i) => (
                      <tr key={i}>
                        <td><strong>{item.name}</strong></td>
                        <td style={{ fontSize: '0.85rem', color: 'var(--ink-3)' }}>
                          {item.circulation ? `${item.circulation} · ` : ''}{item.packaging}
                        </td>
                        <td><QtyStepper value={item.qty} onChange={(q) => updateQty(i, q)} /></td>
                        <td className="num product-price">{formatPrice(item.price * item.qty)}</td>
                        <td>
                          <button type="button" className="btn btn-ghost" onClick={() => removeFromCart(i)}>Remove</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="cart-totals">
                <span>Subtotal: {formatPrice(sub)}</span>
                {discount > 0 && <span style={{ color: 'var(--accent)' }}>Crypto discount ({Math.round(ORDER.cryptoDiscount * 100)}%): −{formatPrice(discount)}</span>}
                <span>Shipping: {shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
                {shipping > 0 && (
                  <span style={{ fontSize: '0.85rem', color: 'var(--ink-3)' }}>
                    Free shipping over {formatPrice(SITE.orderRules.freeShippingThreshold)}
                  </span>
                )}
                <strong>Total: {formatPrice(total)}</strong>
              </div>

              <div className="grid grid-2" style={{ alignItems: 'start' }}>
                <div>
                  <span className="eyebrow">How it works</span>
                  <h2 style={{ fontSize: '1.5rem' }}>Send the request. We confirm. Then it prints.</h2>
                  <p style={{ color: 'var(--ink-2)' }}>
                    Pick PayID, Bank Transfer, or crypto ({Math.round(ORDER.cryptoDiscount * 100)}% off the goods subtotal). We confirm the method with you first, then send a tax invoice with the payment details. Printing starts when payment clears.
                  </p>
                  <VerifiedBusiness compact />
                  <div style={{ marginTop: '1rem' }}><ComplianceBadge /></div>
                </div>
                <div className="card card-pad">
                  <fieldset style={{ border: 'none', padding: 0, margin: '0 0 1rem' }}>
                    <legend className="eyebrow" style={{ marginBottom: '0.6rem' }}>Preferred payment method</legend>
                    {PAYMENT_METHODS.map((m) => (
                      <label key={m.id} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', marginBottom: '0.6rem', opacity: m.live ? 1 : 0.5 }}>
                        <input
                          type="radio"
                          name="payment_method"
                          value={m.label}
                          disabled={!m.live}
                          checked={paymentMethod === m.id}
                          onChange={() => setPaymentMethod(m.id)}
                        />
                        <span>{m.label}{!m.live && ' (coming soon)'}<br /><small style={{ color: 'var(--ink-3)' }}>{m.note}</small></span>
                      </label>
                    ))}
                  </fieldset>

                  <WebForm
                    kind="order"
                    thankYouHref="/thank-you-order/"
                    submitLabel="Send order request"
                    fields={
                      <>
                        <input type="hidden" name="order_summary" value={summary} />
                        <input type="hidden" name="payment_method" value={method.label} />
                        <input type="hidden" name="payment_method_id" value={method.id} />
                        <input type="hidden" name="order_subtotal" value={formatPrice(sub)} />
                        {discount > 0 && <input type="hidden" name="order_discount" value={`−${formatPrice(discount)}`} />}
                        <input type="hidden" name="order_shipping" value={shipping === 0 ? 'Free' : formatPrice(shipping)} />
                        <input type="hidden" name="order_total" value={formatPrice(total)} />
                        <div className="field"><label htmlFor="name">Name</label><input id="name" name="name" type="text" required /></div>
                        <div className="field"><label htmlFor="email">Email</label><input id="email" name="email" type="email" required /></div>
                        <div className="field"><label htmlFor="notes">Notes (optional)</label><textarea id="notes" name="notes" rows={3} /></div>
                      </>
                    }
                  />
                </div>
              </div>
            </>
          )}

          <FaqBlock faqs={PAGE_FAQS.cart} />
        </div>
      </section>
    </div>
  )
}
