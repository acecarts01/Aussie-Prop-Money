import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import { SITE } from '@/config/site'
import { customerOrderEmail, internalOrderEmail, internalGenericEmail, orderRef, MODEL_NAMES } from '@/lib/mail-templates'

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
 *   MAIL_TEMPLATE  'cinema' | 'studio' | 'ticket' — visual model for every email (default cinema)
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

const SKIP = new Set(['kind', 'botcheck', 'reply_to', 'template'])

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

  // Visual model: env default, overridable per request only for the design preview.
  const model = MODEL_NAMES.includes(data.template) ? data.template : (MODEL_NAMES.includes(env('MAIL_TEMPLATE')) ? env('MAIL_TEMPLATE') : 'cinema')

  try {
    if (data.kind === 'order') {
      const ref = orderRef()
      const pay = paymentInstructions(data.payment_method_id)

      // 1. Internal notification.
      const internal = internalOrderEmail({ model, data, ref })
      await mail.sendMail({ from, to: kind.to(), replyTo: data.email, subject: internal.subject, html: internal.html, text: rows.map(([k, v]) => `${k}: ${v}`).join('\n') })

      // 2. Customer confirmation (carries payment instructions when configured).
      const customer = customerOrderEmail({ model, data, pay, ref })
      const payText = pay ? `${pay.title}\n${pay.lines.map(([k, v]) => `${k}: ${v}`).join('\n')}\nReference: ${ref}` : `We will reply shortly with payment details for ${data.payment_method || 'your chosen method'}.`
      await mail.sendMail({
        from,
        to: data.email,
        subject: customer.subject,
        html: customer.html,
        text: `Thanks ${data.name} — order ${ref} received.\n\n${data.order_summary}\nSubtotal: ${data.order_subtotal}\n${data.order_discount ? `Crypto discount: ${data.order_discount}\n` : ''}Shipping: ${data.order_shipping}\nTotal: ${data.order_total}\n\n${payText}\n\n${SITE.legalName} · ABN ${SITE.abn}\nAll products are novelty props — NOT LEGAL TENDER.`,
      })
    } else {
      const generic = internalGenericEmail({ model, kind: data.kind, data, rows })
      await mail.sendMail({ from, to: kind.to(), replyTo: data.email, subject: generic.subject, html: generic.html, text: rows.map(([k, v]) => `${k}: ${v}`).join('\n') })
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[send] mail failed:', err?.message || err)
    return NextResponse.json({ ok: false, error: 'Sending failed — please try again or contact us on WhatsApp.' }, { status: 502 })
  }
}
