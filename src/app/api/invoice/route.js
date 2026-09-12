import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import { SITE } from '@/config/site'
import { taxInvoiceEmail, MODEL_NAMES } from '@/lib/mail-templates'
import { paymentInstructions } from '@/lib/payment-details'

/**
 * Owner-only: sends a designed tax invoice / payment-received email to a
 * customer, in the same visual model as the order emails. Triggered from the
 * private page /admin/invoice/. Protected by the ADMIN_KEY environment variable
 * (Vercel → Settings → Environment Variables, type Secret) — the page asks for
 * it every time and never stores it.
 *
 * Uses the same SMTP_* variables as /api/send. A copy goes to ORDER_TO.
 */

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const env = (k, fallback = '') => (process.env[k] || fallback).trim()
const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(v || ''))

// Constant-time-ish compare so the key can't be guessed byte by byte.
function keyOk(given) {
  const expected = env('ADMIN_KEY')
  if (!expected || !given || given.length !== expected.length) return false
  let diff = 0
  for (let i = 0; i < expected.length; i++) diff |= expected.charCodeAt(i) ^ given.charCodeAt(i)
  return diff === 0
}

const money = (n) => `$${Number(n).toFixed(2)}`
const parseMoney = (v) => Number(String(v ?? '').replace(/[^0-9.-]/g, '')) || 0

export async function POST(req) {
  let body
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ ok: false, error: 'Bad request' }, { status: 400 })
  }

  if (!keyOk(req.headers.get('x-admin-key') || '')) {
    return NextResponse.json({ ok: false, error: env('ADMIN_KEY') ? 'Wrong admin key' : 'ADMIN_KEY is not set in Vercel yet' }, { status: 401 })
  }
  if (!env('SMTP_HOST') || !env('SMTP_USER') || !env('SMTP_PASS')) {
    return NextResponse.json({ ok: false, error: 'SMTP is not configured' }, { status: 503 })
  }
  if (!body.name || !isEmail(body.email) || !body.items || !body.total) {
    return NextResponse.json({ ok: false, error: 'Name, valid email, items and total are required' }, { status: 400 })
  }

  const total = parseMoney(body.total)
  const inv = {
    invoiceNo: body.invoiceNo || `INV-${(body.ref || '').replace(/^ARP-/, '') || Date.now()}`,
    ref: body.ref || '—',
    date: body.date || '',
    paid: Boolean(body.paid),
    paidDate: body.paidDate || '',
    name: body.name,
    email: body.email,
    address: body.address || '',
    items: body.items,
    subtotal: body.subtotal || money(total),
    discount: body.discount || '',
    shipping: body.shipping || 'Free',
    total: money(total),
    // GST-inclusive pricing: GST component is 1/11th of the total.
    gst: body.gstInclusive === false ? '' : money(total / 11),
    paymentMethod: body.paymentMethod || '',
    // Unpaid invoices carry the payment details for the chosen method (from env vars) when configured.
    pay: body.paid ? null : paymentInstructions(body.paymentMethod),
    note: body.note || '',
  }

  const model = MODEL_NAMES.includes(env('MAIL_TEMPLATE')) ? env('MAIL_TEMPLATE') : 'studio'
  const email = taxInvoiceEmail({ model, inv })
  const port = Number(env('SMTP_PORT', '465'))
  const mail = nodemailer.createTransport({ host: env('SMTP_HOST'), port, secure: port === 465, auth: { user: env('SMTP_USER'), pass: env('SMTP_PASS') } })
  const from = `"${SITE.name}" <${env('MAIL_FROM', env('SMTP_USER'))}>`

  try {
    await mail.sendMail({
      from,
      to: inv.email,
      bcc: env('ORDER_TO', env('SMTP_USER')),
      replyTo: env('MAIL_FROM', env('SMTP_USER')),
      subject: email.subject,
      html: email.html,
      text: `${email.subject}\n\nOrder ${inv.ref}\n${inv.items}\nSubtotal: ${inv.subtotal}\n${inv.discount ? `Discount: ${inv.discount}\n` : ''}Shipping: ${inv.shipping}\n${inv.gst ? `Includes GST: ${inv.gst}\n` : ''}Total: ${inv.total}\n\n${inv.pay ? `${inv.pay.title}\n${inv.pay.lines.map(([k, v]) => `${k}: ${v}`).join('\n')}\n\n` : ''}${inv.note ? inv.note + '\n\n' : ''}${SITE.legalName} · ABN ${SITE.abn}`,
    })
    return NextResponse.json({ ok: true, invoiceNo: inv.invoiceNo })
  } catch (err) {
    console.error('[invoice] mail failed:', err?.message || err)
    return NextResponse.json({ ok: false, error: 'Sending failed — check the Vercel logs.' }, { status: 502 })
  }
}
