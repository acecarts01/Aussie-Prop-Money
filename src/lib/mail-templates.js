// Transactional email templates — three visual models, selectable with the
// MAIL_TEMPLATE env var ('cinema' | 'studio' | 'ticket'). Table-based, inline
// styles only, system fonts: this is what renders reliably in Gmail, Outlook,
// Apple Mail and Zoho. Used for the internal order notification, the customer
// order confirmation, and contact / wholesale notifications.
import { SITE } from '@/config/site'

const esc = (v) => String(v ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]))
const nl2br = (v) => esc(v).replace(/\n/g, '<br>')
const site = `https://${SITE.domain}`
const abr = SITE.abrUrl

// ---------- palettes ----------
const MODELS = {
  cinema: {
    name: 'Cinema',
    bg: '#0B0B0C', card: '#141416', card2: '#1B1B1F', line: '#2A2A2F',
    ink: '#F2F0EB', ink2: '#B3B0A8', ink3: '#7C7972',
    accent: '#35D07F', accentInk: '#062A17',
    headBg: 'linear-gradient(135deg,#101012 0%,#1E1E23 60%,#0B0B0C 100%)', headSolid: '#141416',
    dark: true,
  },
  studio: {
    name: 'Studio',
    bg: '#F3F2EE', card: '#FFFFFF', card2: '#F7F6F2', line: '#E4E2DC',
    ink: '#111214', ink2: '#5B5A55', ink3: '#8A8880',
    accent: '#1F9D5E', accentInk: '#FFFFFF',
    headBg: 'linear-gradient(135deg,#FFFFFF 0%,#EEF8F2 100%)', headSolid: '#FFFFFF',
    dark: false,
  },
  ticket: {
    name: 'Ticket',
    bg: '#EFEBE3', card: '#FFFDF8', card2: '#F6F2EA', line: '#DED8CC',
    ink: '#151515', ink2: '#5A5751', ink3: '#8C877D',
    accent: '#111111', accentInk: '#F2E9D6',
    headBg: 'linear-gradient(135deg,#111111 0%,#2A2A2A 100%)', headSolid: '#111111',
    stripe: 'repeating-linear-gradient(135deg,#111 0 12px,#F2E9D6 12px 24px)',
    dark: false,
  },
}

export const MODEL_NAMES = Object.keys(MODELS)
export function pickModel(name) {
  return MODELS[name] || MODELS.cinema
}

// ---------- primitives ----------
const font = "font-family:-apple-system,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;"
const display = "font-family:'Arial Narrow','Helvetica Neue',Arial,sans-serif;font-weight:800;text-transform:uppercase;letter-spacing:0.02em;"

function shell(m, inner, preheader = '') {
  return `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>${esc(SITE.name)}</title></head>
<body style="margin:0;padding:0;background:${m.bg};${font}">
<span style="display:none!important;visibility:hidden;opacity:0;color:transparent;height:0;width:0;overflow:hidden">${esc(preheader)}</span>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${m.bg};padding:28px 12px">
<tr><td align="center">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%">
${inner}
</table>
</td></tr></table>
</body></html>`
}

function header(m, { eyebrow, title, ref }) {
  const stripe = m.stripe ? `<tr><td style="height:8px;background:${m.stripe};line-height:8px;font-size:0">&nbsp;</td></tr>` : `<tr><td style="height:4px;background:${m.accent};line-height:4px;font-size:0">&nbsp;</td></tr>`
  return `
<tr><td style="background:${m.headSolid};background-image:${m.headBg};border-radius:10px 10px 0 0;padding:26px 28px 22px">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
    <td valign="top">
      <table role="presentation" cellpadding="0" cellspacing="0"><tr>
        <td style="background:${m.dark || m.headSolid === '#111111' ? '#F2F0EB' : '#111'};color:${m.dark || m.headSolid === '#111111' ? '#0B0B0C' : '#F2F0EB'};${display}font-size:13px;letter-spacing:0.08em;padding:7px 9px;border-radius:5px">ARP</td>
        <td style="padding-left:11px;${display}font-size:15px;color:${m.dark ? '#F2F0EB' : (m.headSolid === '#111111' ? '#F2E9D6' : '#111')};line-height:1.1">Australian Reserve Props<br><span style="${font}font-weight:500;text-transform:none;letter-spacing:0.14em;font-size:9px;color:${m.dark ? m.ink3 : (m.headSolid === '#111111' ? '#A9A296' : m.ink3)}">STUDIO-GRADE PROP MONEY · EST. ${SITE.foundingYear}</span></td>
      </tr></table>
    </td>
    <td valign="top" align="right" style="${font}font-size:10px;letter-spacing:0.16em;text-transform:uppercase;color:${m.dark ? m.accent : (m.headSolid === '#111111' ? '#F2E9D6' : m.accent)};font-weight:700;white-space:nowrap">${esc(ref || '')}</td>
  </tr></table>
  <div style="height:22px"></div>
  <div style="${font}font-size:10px;letter-spacing:0.2em;text-transform:uppercase;font-weight:700;color:${m.dark ? m.accent : (m.headSolid === '#111111' ? '#F2E9D6' : m.accent)}">${esc(eyebrow)}</div>
  <div style="${display}font-size:30px;line-height:1;margin-top:6px;color:${m.dark ? '#F2F0EB' : (m.headSolid === '#111111' ? '#FFFDF8' : '#111')}">${esc(title)}</div>
</td></tr>
${stripe}`
}

function section(m, label, bodyHtml, { tone = 'card' } = {}) {
  return `
<tr><td style="background:${tone === 'card2' ? m.card2 : m.card};padding:22px 28px;border-left:1px solid ${m.line};border-right:1px solid ${m.line}">
  ${label ? `<div style="${font}font-size:10px;letter-spacing:0.18em;text-transform:uppercase;font-weight:700;color:${m.ink3};margin-bottom:10px">${esc(label)}</div>` : ''}
  ${bodyHtml}
</td></tr>
<tr><td style="height:1px;background:${m.line};line-height:1px;font-size:0">&nbsp;</td></tr>`
}

function kv(m, rows, { mono = false } = {}) {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0">${rows
    .map(([k, v]) => `<tr>
      <td valign="top" style="${font}font-size:12px;color:${m.ink3};padding:7px 14px 7px 0;white-space:nowrap;width:150px;border-bottom:1px solid ${m.line}">${esc(k)}</td>
      <td valign="top" style="${font}font-size:14px;color:${m.ink};padding:7px 0;border-bottom:1px solid ${m.line};${mono ? "font-family:Menlo,Consolas,'Courier New',monospace;font-size:13px;" : ''}">${nl2br(v)}</td>
    </tr>`)
    .join('')}</table>`
}

function totals(m, lines) {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0">${lines
    .filter(Boolean)
    .map(([k, v, strong]) => `<tr>
      <td style="${font}font-size:${strong ? 15 : 13}px;color:${strong ? m.ink : m.ink2};padding:${strong ? '12px 0 0' : '4px 0'};font-weight:${strong ? 700 : 500}">${esc(k)}</td>
      <td align="right" style="${strong ? display + 'font-size:24px;' : font + 'font-size:13px;'}color:${strong ? m.ink : m.ink2};padding:${strong ? '12px 0 0' : '4px 0'};white-space:nowrap">${esc(v)}</td>
    </tr>`)
    .join('')}</table>`
}

function button(m, label, href) {
  return `<table role="presentation" cellpadding="0" cellspacing="0"><tr><td style="background:${m.accent};border-radius:5px">
    <a href="${esc(href)}" style="display:inline-block;padding:12px 20px;${display}font-size:12px;letter-spacing:0.1em;color:${m.accentInk};text-decoration:none">${esc(label)}</a>
  </td></tr></table>`
}

function badge(m) {
  return `<table role="presentation" cellpadding="0" cellspacing="0" style="margin-top:14px"><tr>
    <td style="width:6px;background:repeating-linear-gradient(135deg,${m.ink} 0 6px,${m.card} 6px 12px);border-radius:3px 0 0 3px">&nbsp;</td>
    <td style="background:${m.card2};border:1px solid ${m.line};border-left:0;padding:9px 12px;${font}font-size:10px;letter-spacing:0.14em;text-transform:uppercase;font-weight:700;color:${m.ink2}"><span style="color:${m.dark ? m.accent : m.ink}">Not legal tender</span> · Reduced-scale prop currency · For film, theatre &amp; performance use</td>
  </tr></table>`
}

function verified(m) {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid ${m.line};border-left:4px solid ${m.accent};border-radius:6px;background:${m.card2}"><tr>
    <td style="padding:14px 16px">
      <div style="${display}font-size:14px;letter-spacing:0.06em;color:${m.dark ? m.accent : m.ink}">ABN ${esc(SITE.abn)}</div>
      <div style="${font}font-size:13px;color:${m.ink};margin-top:2px">${esc(SITE.legalName)} · ${esc(SITE.entityType)}</div>
      <div style="${font}font-size:12px;color:${m.ink2};margin-top:2px">ABN active · GST registered · ${esc(SITE.location)}</div>
      <a href="${abr}" style="${font}font-size:12px;color:${m.dark ? m.accent : '#1F9D5E'};font-weight:700;text-decoration:underline;display:inline-block;margin-top:6px">Verify on the Australian Business Register ↗</a>
    </td></tr></table>`
}

function footer(m) {
  return `
<tr><td style="background:${m.card};border:1px solid ${m.line};border-top:0;border-radius:0 0 10px 10px;padding:20px 28px 24px">
  ${verified(m)}
  ${badge(m)}
  <p style="${font}font-size:11px;line-height:1.6;color:${m.ink3};margin:16px 0 0">All products sold by ${esc(SITE.name)} are novelty prop items — reproductions sized to differ from genuine Australian currency by at least 25% in line with RBA reproduction guidance, carrying no replicated banknote security features and clearly marked NOT LEGAL TENDER. They are not currency and cannot be used as payment. ${esc(SITE.name)} is a trading name of ${esc(SITE.legalName)}.</p>
  <p style="${font}font-size:11px;color:${m.ink3};margin:10px 0 0"><a href="${site}" style="color:${m.ink2};text-decoration:none">${esc(SITE.domain)}</a> · <a href="mailto:${esc(SITE.email)}" style="color:${m.ink2};text-decoration:none">${esc(SITE.email)}</a> · WhatsApp ${esc(SITE.whatsapp)}</p>
</td></tr>`
}

// ---------- order reference ----------
export function orderRef(date = new Date()) {
  const d = date.toISOString().slice(0, 10).replace(/-/g, '')
  const r = Math.random().toString(36).slice(2, 6).toUpperCase()
  return `ARP-${d}-${r}`
}

const fmtDate = (d = new Date()) => d.toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Australia/Sydney' })

function itemsTable(m, summary) {
  const lines = String(summary || '').split('\n').filter(Boolean)
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0">${lines
    .map((l) => {
      const [left, price] = l.split(' — ')
      return `<tr>
        <td style="${font}font-size:14px;color:${m.ink};padding:9px 0;border-bottom:1px dashed ${m.line}">${esc(left)}</td>
        <td align="right" style="${font}font-size:14px;color:${m.ink};padding:9px 0;border-bottom:1px dashed ${m.line};white-space:nowrap;font-weight:700">${esc(price || '')}</td>
      </tr>`
    })
    .join('')}</table>`
}

// ---------- 1. customer order confirmation (doubles as the pro-forma invoice) ----------
export function customerOrderEmail({ model, data, pay, ref }) {
  const m = pickModel(model)
  const totalRows = [
    ['Subtotal', data.order_subtotal],
    data.order_discount ? ['Crypto discount (10%)', data.order_discount] : null,
    ['Shipping', data.order_shipping],
    ['Total due', data.order_total, true],
  ]
  const payBlock = pay
    ? section(m, `Pay by ${pay.title}`, `${kv(m, pay.lines, { mono: true })}
        <p style="${font}font-size:13px;line-height:1.6;color:${m.ink2};margin:14px 0 0">Use <strong style="color:${m.ink}">${esc(ref)}</strong> as the payment reference. Reply to this email once sent — printing starts the moment payment clears.</p>`, { tone: 'card2' })
    : section(m, 'Payment', `<p style="${font}font-size:14px;line-height:1.6;color:${m.ink};margin:0">You chose <strong>${esc(data.payment_method || 'your method')}</strong>. We reply within business hours with the payment details, then printing starts the moment payment clears.</p>`, { tone: 'card2' })

  const inner = `
${header(m, { eyebrow: 'Order confirmation', title: `Thanks, ${data.name.split(' ')[0]}. It's in.`, ref })}
${section(m, null, `<p style="${font}font-size:15px;line-height:1.6;color:${m.ink};margin:0">We have your order request and it is now in the print queue pending payment. Everything below is what we&rsquo;ll produce — reduced-scale, marked NOT LEGAL TENDER, packed to spec.</p>`)}
${section(m, 'Order details', kv(m, [['Order reference', ref], ['Date', fmtDate()], ['Payment method', data.payment_method], ['Ships to', 'Australia only · Australia Post tracked']]))}
${section(m, 'Items', `${itemsTable(m, data.order_summary)}<div style="height:10px"></div>${totals(m, totalRows)}`)}
${payBlock}
${section(m, 'What happens next', `<table role="presentation" cellpadding="0" cellspacing="0">${[
    ['1', 'Pay', 'Use the details above with the order reference.'],
    ['2', 'We confirm', 'You get a payment-received email and a print date.'],
    ['3', 'Print & pack', 'Circulation level and banding exactly as ordered.'],
    ['4', 'Tracked delivery', 'Australia Post tracking number sent on dispatch.'],
  ].map(([n, t, d]) => `<tr>
      <td valign="top" style="padding:0 12px 10px 0"><div style="width:24px;height:24px;border-radius:12px;background:${m.accent};color:${m.accentInk};${display}font-size:12px;line-height:24px;text-align:center">${n}</div></td>
      <td valign="top" style="padding:0 0 10px"><div style="${font}font-size:14px;font-weight:700;color:${m.ink}">${t}</div><div style="${font}font-size:13px;color:${m.ink2}">${d}</div></td>
    </tr>`).join('')}</table>
    <div style="height:16px"></div>${button(m, 'View your order on the site', `${site}/cart/`)}`)}
${footer(m)}`
  return { subject: `Order ${ref} confirmed — ${SITE.name}`, html: shell(m, inner, `Order ${ref} received — ${data.order_total} · ${data.payment_method}`) }
}

// ---------- 2. internal order notification ----------
export function internalOrderEmail({ model, data, ref }) {
  const m = pickModel(model)
  const totalRows = [
    ['Subtotal', data.order_subtotal],
    data.order_discount ? ['Crypto discount', data.order_discount] : null,
    ['Shipping', data.order_shipping],
    ['Total', data.order_total, true],
  ]
  const inner = `
${header(m, { eyebrow: 'New order request', title: `${data.order_total} · ${data.payment_method}`, ref })}
${section(m, 'Customer', kv(m, [['Name', data.name], ['Email', data.email], ['Notes', data.notes || '—']]))}
${section(m, 'Items', `${itemsTable(m, data.order_summary)}<div style="height:10px"></div>${totals(m, totalRows)}`)}
${section(m, 'Actions', `<table role="presentation" cellpadding="0" cellspacing="0"><tr>
    <td style="padding-right:10px">${button(m, 'Reply to customer', `mailto:${esc(data.email)}?subject=${encodeURIComponent(`Re: Order ${ref}`)}`)}</td>
    <td>${button(m, 'ABR record', abr)}</td>
  </tr></table>
  <p style="${font}font-size:12px;color:${m.ink3};margin:14px 0 0">Order reference <strong style="color:${m.ink}">${esc(ref)}</strong> · received ${esc(fmtDate())} · submitted from ${esc(SITE.domain)}</p>`, { tone: 'card2' })}
${footer(m)}`
  return { subject: `Order ${ref} — ${data.order_total} · ${data.payment_method} — ${data.name}`, html: shell(m, inner, `${data.name} · ${data.order_summary}`) }
}

// ---------- 3. internal contact / wholesale notification ----------
export function internalGenericEmail({ model, kind, data, rows }) {
  const m = pickModel(model)
  const title = kind === 'wholesale' ? 'Production enquiry' : 'Contact message'
  const inner = `
${header(m, { eyebrow: `New ${kind} submission`, title, ref: fmtDate() })}
${section(m, 'Details', kv(m, rows))}
${section(m, null, button(m, 'Reply', `mailto:${esc(data.email)}?subject=${encodeURIComponent(`Re: your ${kind} enquiry — ${SITE.name}`)}`), { tone: 'card2' })}
${footer(m)}`
  return { subject: `${title} — ${data.name}`, html: shell(m, inner, `${data.name}: ${(data.message || data.details || '').slice(0, 90)}`) }
}
