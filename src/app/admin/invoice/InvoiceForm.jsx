'use client'

import { Suspense, useState } from 'react'
import { useSearchParams } from 'next/navigation'

const F = ({ id, label, hint, children }) => (
  <div className="field">
    <label htmlFor={id}>{label}</label>
    {children}
    {hint && <small style={{ color: 'var(--ink-3)', display: 'block', marginTop: '0.3rem' }}>{hint}</small>}
  </div>
)

// The "View Order in Admin" button in the internal order email links here
// with the order pre-filled — normalize its free-text payment_method into
// one of the fixed <select> options so it comes in pre-selected too.
function matchPaymentMethod(raw) {
  const s = String(raw || '').toLowerCase()
  if (s.includes('crypto') || s.includes('btc') || s.includes('usdt') || s.includes('eth') || s.includes('bnb')) return 'Crypto (BTC, USDT, ETH, BNB) — 10% off'
  if (s.includes('bank')) return 'Bank Transfer'
  if (s.includes('payid')) return 'PayID'
  return 'PayID'
}

function InvoiceFormInner() {
  const params = useSearchParams()
  const pre = {
    ref: params.get('ref') || '',
    name: params.get('name') || '',
    email: params.get('email') || '',
    address: params.get('address') || '',
    items: params.get('items') || '',
    subtotal: params.get('subtotal') || '',
    discount: params.get('discount') || '',
    shipping: params.get('shipping') || 'Free',
    total: params.get('total') || '',
    paymentMethod: matchPaymentMethod(params.get('paymentMethod')),
  }
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const [msg, setMsg] = useState('')
  const [paid, setPaid] = useState(false)

  async function onSubmit(e) {
    e.preventDefault()
    const form = e.currentTarget
    if (!form.reportValidity()) return
    setStatus('sending')
    setMsg('')
    const fd = new FormData(form)
    const adminKey = fd.get('adminKey')
    fd.delete('adminKey')
    const body = Object.fromEntries(fd.entries())
    body.paid = paid
    body.gstInclusive = fd.get('gstInclusive') === 'on'
    try {
      const res = await fetch('/api/invoice/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json', 'x-admin-key': adminKey },
        body: JSON.stringify(body),
      })
      const out = await res.json().catch(() => ({}))
      if (res.ok && out.ok) {
        setStatus('sent')
        setMsg(`Sent — invoice ${out.invoiceNo} delivered to ${body.email}, copy to your inbox.`)
      } else {
        throw new Error(out.error || 'Failed')
      }
    } catch (err) {
      setStatus('error')
      setMsg(err.message)
    }
  }

  return (
    <form onSubmit={onSubmit} noValidate className="card card-pad">
      <F id="adminKey" label="Admin key" hint="The ADMIN_KEY value from Vercel. Asked for every time, never stored.">
        <input id="adminKey" name="adminKey" type="password" autoComplete="off" required />
      </F>

      <div className="grid grid-2">
        <F id="ref" label="Order reference"><input id="ref" name="ref" type="text" placeholder="ARP-20260912-K7Q2" defaultValue={pre.ref} required /></F>
        <F id="invoiceNo" label="Invoice number" hint="Leave blank to derive from the order reference."><input id="invoiceNo" name="invoiceNo" type="text" placeholder="INV-20260912-K7Q2" /></F>
        <F id="name" label="Customer name"><input id="name" name="name" type="text" defaultValue={pre.name} required /></F>
        <F id="email" label="Customer email"><input id="email" name="email" type="email" defaultValue={pre.email} required /></F>
      </div>

      <F id="address" label="Billing address (optional)" hint="Required on tax invoices over $1,000."><textarea id="address" name="address" rows={2} defaultValue={pre.address} /></F>

      <F id="items" label="Items" hint="One per line, exactly as in the order email: “2 x $50 AUD Prop Note Stack (Standard Clean) — $55.90”.">
        <textarea id="items" name="items" rows={4} defaultValue={pre.items} required />
      </F>

      <div className="grid grid-4">
        <F id="subtotal" label="Subtotal"><input id="subtotal" name="subtotal" type="text" placeholder="$244.90" defaultValue={pre.subtotal} required /></F>
        <F id="discount" label="Discount"><input id="discount" name="discount" type="text" placeholder="−$24.49" defaultValue={pre.discount} /></F>
        <F id="shipping" label="Shipping"><input id="shipping" name="shipping" type="text" placeholder="Free" defaultValue={pre.shipping} /></F>
        <F id="total" label="Total"><input id="total" name="total" type="text" placeholder="$220.41" defaultValue={pre.total} required /></F>
      </div>

      <div className="grid grid-2">
        <F id="paymentMethod" label="Payment method (confirmed with the customer)" hint="Unpaid invoices include the details for this method from your Vercel env vars, if set.">
          <select id="paymentMethod" name="paymentMethod" defaultValue={pre.paymentMethod}>
            <option>PayID</option>
            <option>Bank Transfer</option>
            <option>Crypto (BTC, USDT, ETH, BNB) — 10% off</option>
          </select>
        </F>
        <F id="paidDate" label="Payment received on" hint="Shown on the PAID stamp. Leave blank for today."><input id="paidDate" name="paidDate" type="text" placeholder="12 September 2026" /></F>
      </div>

      <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', margin: '0.5rem 0 1rem' }}>
        <label style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <input type="checkbox" checked={paid} onChange={(e) => setPaid(e.target.checked)} /> Payment received — sends the &ldquo;Paid · now printing&rdquo; version instead of the awaiting-payment invoice
        </label>
        <label style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <input type="checkbox" name="gstInclusive" defaultChecked /> Prices include GST (shows the 1/11th GST component)
        </label>
      </div>

      <F id="note" label="Payment details / note to customer (optional)" hint="Shown in the Payment section. Use this to type the PayID, BSB/account or wallet address if it isn't set in Vercel, or to add any instruction."><textarea id="note" name="note" rows={3} /></F>

      <div className="form-status" aria-live="polite">
        {status === 'sent' && <p style={{ color: 'var(--accent)' }}>{msg}</p>}
        {status === 'error' && <p className="error">{msg}</p>}
      </div>
      <button type="submit" className="btn btn-accent" disabled={status === 'sending'}>{status === 'sending' ? 'Sending…' : 'Send invoice'}</button>
    </form>
  )
}

export default function InvoiceForm() {
  return (
    <Suspense fallback={<p>Loading…</p>}>
      <InvoiceFormInner />
    </Suspense>
  )
}
