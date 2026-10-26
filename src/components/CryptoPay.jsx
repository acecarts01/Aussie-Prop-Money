'use client'
import { useEffect, useState } from 'react'
import { CRYPTO_WALLETS } from '@/config/site'

// Shown only when the client has chosen crypto. Pick a coin, get its address and a QR code of
// exactly that address (plain address, so any wallet app can scan it).
export default function CryptoPay() {
  const [id, setId] = useState(CRYPTO_WALLETS[0].id)
  const [svg, setSvg] = useState('')
  const [copied, setCopied] = useState(false)
  const wallet = CRYPTO_WALLETS.find((w) => w.id === id) || CRYPTO_WALLETS[0]

  useEffect(() => {
    let live = true
    setSvg('')
    import('qrcode').then((Q) => Q.toString(wallet.address, { type: 'svg', margin: 1, errorCorrectionLevel: 'M', color: { dark: '#000000', light: '#ffffff' } }))
      .then((s) => { if (live) setSvg(s) })
      .catch(() => { if (live) setSvg('') })
    return () => { live = false }
  }, [wallet.address])

  const copy = async () => {
    try { await navigator.clipboard.writeText(wallet.address); setCopied(true); setTimeout(() => setCopied(false), 1800) } catch { /* clipboard blocked: address is selectable */ }
  }

  return (
    <div className="crypto-pay" role="group" aria-label="Crypto wallet addresses">
      <span className="eyebrow">Choose your coin</span>
      <div className="crypto-coins">
        {CRYPTO_WALLETS.map((w) => (
          <button key={w.id} type="button" className={`crypto-coin${w.id === id ? ' on' : ''}`} aria-pressed={w.id === id} onClick={() => { setId(w.id); setCopied(false) }}>
            {w.symbol}{w.id.startsWith('usdt') ? ` · ${w.network.includes('Tron') ? 'TRC-20' : 'ERC-20'}` : ''}
          </button>
        ))}
      </div>
      <div className="crypto-detail">
        <div className="crypto-qr" aria-label={`QR code for the ${wallet.symbol} address`}>
          {svg ? <div dangerouslySetInnerHTML={{ __html: svg }} /> : <span style={{ color: 'var(--ink-3)', fontSize: '0.8rem' }}>Loading QR…</span>}
        </div>
        <div className="crypto-info">
          <p style={{ margin: 0, fontWeight: 700 }}>{wallet.coin} ({wallet.symbol})</p>
          <p style={{ margin: '0.15rem 0 0.5rem', color: 'var(--ink-3)', fontSize: '0.85rem' }}>Network: <strong>{wallet.network}</strong></p>
          <code className="crypto-addr">{wallet.address}</code>
          <button type="button" className="btn btn-ghost" style={{ marginTop: '0.6rem' }} onClick={copy}>{copied ? 'Copied' : 'Copy address'}</button>
        </div>
      </div>
      <p className="crypto-warn">Send only <strong>{wallet.symbol}</strong> on the <strong>{wallet.network}</strong> network to this address. Coins sent on a different network cannot be recovered. Send the 10%-discounted total from your order, then quote your order reference. Want a coin that is not listed? Message us on WhatsApp or through the contact page and we will provide an address.</p>
    </div>
  )
}
