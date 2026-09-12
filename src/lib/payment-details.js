// Payment instructions from server-side Vercel env vars. Returns null when a
// method has no details configured, so callers can fall back to "details to follow".
import { SITE } from '@/config/site'

const env = (k, fallback = '') => (process.env[k] || fallback).trim()

export const METHOD_IDS = { payid: 'payid', 'bank-transfer': 'bank-transfer', crypto: 'crypto' }

// Accepts an id ('payid') or a label ('PayID', 'Bank Transfer', 'Crypto (…) — 10% off').
export function methodId(v) {
  const s = String(v || '').toLowerCase()
  if (s.includes('payid')) return 'payid'
  if (s.includes('bank')) return 'bank-transfer'
  if (s.includes('crypto') || s.includes('btc') || s.includes('usdt')) return 'crypto'
  return ''
}

export function paymentInstructions(method) {
  const id = methodId(method)
  if (id === 'payid') {
    const pid = env('PAYID_ID')
    if (!pid) return null
    return { title: 'PayID', lines: [['PayID', pid], ['Account name', env('PAYID_NAME', SITE.legalName)]] }
  }
  if (id === 'bank-transfer') {
    const bsb = env('BANK_BSB'), acct = env('BANK_ACCOUNT')
    if (!bsb || !acct) return null
    return { title: 'Bank transfer', lines: [['Bank', env('BANK_NAME')], ['Account name', env('BANK_ACCOUNT_NAME', SITE.legalName)], ['BSB', bsb], ['Account number', acct]].filter(([, v]) => v) }
  }
  if (id === 'crypto') {
    const wallets = [['BTC', env('CRYPTO_BTC')], ['USDT', env('CRYPTO_USDT')], ['ETH', env('CRYPTO_ETH')], ['BNB', env('CRYPTO_BNB')]].filter(([, v]) => v)
    if (!wallets.length) return null
    return { title: 'Crypto (10% discount applied)', lines: wallets }
  }
  return null
}
