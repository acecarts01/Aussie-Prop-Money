import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import { SITE } from '@/config/site'

/**
 * Order / contact / wholesale mail — runs on Vercel, configured ONLY by
 * environment variables (Project → Settings → Environment Variables):
 *
 *   SMTP_HOST      smtp.zoho.com for this mailbox (global cluster; .com.au rejects the login)
 *   SMTP_PORT      465 (SSL) or 587 (STARTTLS)
 *   SMTP_USER      info@australianreserveprops.com
 *   SMTP_PASS      Zoho app-specific password (NOT the mailbox login password)
 *   MAIL_FROM      optional, defaults to SMTP_USER
 *   ORDER_TO / CONTACT_TO / WHOLESALE_TO   optional inboxes, default to SMTP_USER
 *
 * Payment instructions for the customer confirmation email (all optional — a
 * method whose details are missing falls back to "details to follow"):
 *   PAYID_ID, PAYID_NAME
 *   BANK_NAME, BANK_BSB, BANK_ACCOUNT, BANK_ACCOUNT_NAME
 *   CRYPTO_BTC, CRYPTO_USDT, CRYPTO_ETH, CRYPTO_BNB
 *
 * None of these values ever reach the browser.
 */

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const env = (k, fallback = '') => (process.env[k] || fallback).trim()

const KINDS = {
  order: { to: () => env('ORDER_TO', env('SMTP_USER')), subject: (d) => `Order request — ${d.name || 'website'} — ${d.order_total || ''}`.trim() },
  contact: { to: () => env('CONTACT_TO', env('SMTP_USER')), subject: (d) => `Contact — ${d.name || 'website'}` },
  wholesale: { to: () => env('WHOLESALE_TO', env('SMTP_USER')), subject: (d) => `Production / wholesale enquiry — ${d.name || 'website'}` },
}

const esc = (v) => String(v ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]))
const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(v || ''))

function smtpReady() {
  return Boolean(env('SMTP_HOST') && env('SMTP_USER') && env('SMTP_PASS'))
}

function transporter() {
  const port = Number(env('SMTP_PORT', '465'))
  return nodemailer.createTransport({
    host: env('SMTP_HOST'),
    port,
    secure: port === 465,
    auth: { user: env('SMTP_USER'), pass: env('SMTP_PASS') },
  })
}

function paymentInstructions(method) {
  if (method === 'payid') {
    const id = env('PAYID_ID')
    if (!id) return null
    return { title: 'PayID', lines: [['PayID', id], ['Account name', env('PAYID_NAME', SITE.legalName)]] }
  }
  if (method === 'bank-transfer') {
    const bsb = env('BANK_BSB'), acct = env('BANK_ACCOUNT')
    if (!bsb || !acct) return null
    return { title: 'Bank transfer', lines: [['Bank', env('BANK_NAME')], ['Account name', env('BANK_ACCOUNT_NAME', SITE.legalName)], ['BSB', bsb], ['Account number', acct]].filter(([, v]) => v) }
  }
  if (method === 'crypto') {
    const wallets = [['BTC', env('CRYPTO_BTC')], ['USDT', env('CRYPTO_USDT')], ['ETH', env('CRYPTO_ETH')], ['BNB', env('CRYPTO_BNB')]].filter(([, v]) => v)
    if (!wallets.length) return null
    return { title: 'Crypto (10% discount applied)', lines: wallets }
  }
  return null
}

function table(rows) {
  return `<table cellpadding="6" style="border-collapse:collapse;font:14px/1.5 -apple-system,Segoe UI,Roboto,sans-serif">${rows
    .map(([k, v]) => `<tr><td style="color:#666;padding-right:16px;vertical-align:top"><strong>${esc(k)}</strong></td><td style="white-space:pre-wrap">${esc(v)}</td></tr>`)
    .join('')}</table>`
}

const SKIP = new Set(['kind', 'botcheck', 'reply_to'])

export async function POST(req) {
  let data
  try {
    data = await req.json()
  } catch {
    return NextResponse.json({ ok: false, error: 'Bad request' }, { status: 400 })
  }

  // Honeypot — bots fill every field.
  if (data.botcheck) return NextResponse.json({ ok: true })

  const kind = KINDS[data.kind]
  if (!kind) return NextResponse.json({ ok: false, error: 'Unknown form' }, { status: 400 })
  if (!data.name || !isEmail(data.email)) return NextResponse.json({ ok: false, error: 'Name and a valid email are required' }, { status: 400 })

  if (!smtpReady()) {
    return NextResponse.json(
      { ok: false, error: 'Ordering by email is not switched on yet — please reach us on WhatsApp or email and we will confirm your order directly.' },
      { status: 503 },
    )
  }

  const rows = Object.entries(data)
    .filter(([k, v]) => !SKIP.has(k) && v !== '' && v != null)
    .map(([k, v]) => [k.replace(/_/g, ' '), v])

  const from = `"${SITE.name}" <${env('MAIL_FROM', env('SMTP_USER'))}>`
  const mail = transporter()

  try {
    // 1. Internal notification.
    await mail.sendMail({
      from,
      to: kind.to(),
      replyTo: data.email,
      subject: kind.subject(data),
      text: rows.map(([k, v]) => `${k}: ${v}`).join('\n'),
      html: `<p>New ${esc(data.kind)} submission from ${esc(SITE.domain)}.</p>${table(rows)}`,
    })

    // 2. Customer acknowledgement (orders get payment instructions when configured).
    if (data.kind === 'order') {
      const pay = paymentInstructions(data.payment_method_id)
      const summary = [['Order', data.order_summary], ['Subtotal', data.order_subtotal], data.order_discount ? ['Crypto discount', data.order_discount] : null, ['Shipping', data.order_shipping], ['Total', data.order_total]].filter(Boolean)
      const payHtml = pay
        ? `<h3 style="margin:24px 0 8px">${esc(pay.title)}</h3>${table(pay.lines)}<p>Please use your name (<strong>${esc(data.name)}</strong>) as the payment reference and reply to this email once sent. Printing starts when payment clears.</p>`
        : `<p>We will reply shortly with payment details for <strong>${esc(data.payment_method || 'your chosen method')}</strong>. Printing starts when payment clears.</p>`
      await mail.sendMail({
        from,
        to: data.email,
        subject: `Your order request — ${SITE.name}`,
        text: `Thanks ${data.name} — we have your order request.\n\n${summary.map(([k, v]) => `${k}: ${v}`).join('\n')}\n\n${pay ? `${pay.title}\n${pay.lines.map(([k, v]) => `${k}: ${v}`).join('\n')}\nUse your name as the payment reference.` : `We will reply shortly with payment details for ${data.payment_method || 'your chosen method'}.`}\n\n${SITE.legalName} · ABN ${SITE.abn}\nAll products are novelty props — NOT LEGAL TENDER.`,
        html: `<div style="font:15px/1.6 -apple-system,Segoe UI,Roboto,sans-serif;max-width:600px"><h2 style="margin:0 0 8px">Thanks ${esc(data.name)} — we have your order request.</h2>${table(summary)}${payHtml}<p style="color:#666;font-size:13px;margin-top:24px">${esc(SITE.legalName)} · ABN ${esc(SITE.abn)} · ${esc(SITE.location)}<br>All products are reduced-scale novelty props, clearly marked NOT LEGAL TENDER, for film, theatre, education and novelty use only.</p></div>`,
      })
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[send] mail failed:', err?.message || err)
    return NextResponse.json({ ok: false, error: 'Sending failed — please try again or contact us on WhatsApp.' }, { status: 502 })
  }
}
