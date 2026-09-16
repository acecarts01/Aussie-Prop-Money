import { SITE } from '@/config/site'

const esc = (v) => String(v ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]))
const nl2br = (v) => esc(v).replace(/\n/g, '<br>')
const site = `https://${SITE.domain}`
const abr = SITE.abrUrl

// Base64 SVG logo with xmlns for email <img> rendering
const LOGO_B64 = 'PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MjAgMTEwIiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJub25lIj4KICA8ZGVmcz4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0idmF1bHRHb2xkIiB4MT0iMCUiIHkxPSIwJSIgeDI9IjEwMCUiIHkyPSIxMDAlIj4KICAgICAgPHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iI0ZDRTA4MiIgLz4KICAgICAgPHN0b3Agb2Zmc2V0PSI1MCUiIHN0b3AtY29sb3I9IiNENEFGMzciIC8+CiAgICAgIDxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iIzkzNkIxOCIgLz4KICAgIDwvbGluZWFyR3JhZGllbnQ+CiAgICA8bGluZWFyR3JhZGllbnQgaWQ9InBvbHltZXJIb2xvIiB4MT0iMCUiIHkxPSIxMDAlIiB4Mj0iMTAwJSIgeTI9IjAlIj4KICAgICAgPHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iIzA1OTY2OSIgLz4KICAgICAgPHN0b3Agb2Zmc2V0PSI1MCUiIHN0b3AtY29sb3I9IiMxMEI5ODEiIC8+CiAgICAgIDxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iIzZFRTdCNyIgLz4KICAgIDwvbGluZWFyR3JhZGllbnQ+CiAgICA8ZmlsdGVyIGlkPSJzb2Z0R29sZEdsb3ciIHg9Ii0yMCUiIHk9Ii0yMCUiIHdpZHRoPSIxNDAlIiBoZWlnaHQ9IjE0MCUiPgogICAgICA8ZmVHYXVzc2lhbkJsdXIgLz4KICAgICAgPGZlQ29tcG9zaXRlIGluPSJTb3VyY2VHcmFwaGljIiBpbjI9ImJsdXIiIG9wZXJhdG9yPSJvdmVyIiAvPgogICAgPC9maWx0ZXI+CiAgPC9kZWZzPgoKICA8IS0tIElDT04gQkFER0U6IFRyZWFzdXJ5IFNoaWVsZCArIEJhbmRlZCBTdHJhcHMgLS0+CiAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTAsIDgpIj4KICAgIDxwYXRoIGQ9Ik00NiA0IEw4NCAxOCBWNTYgQzg0IDc4IDQ2IDkyIDQ2IDkyIEM0NiA5MiA4IDc4IDggNTYgVjE4IFoiIGZpbGw9IiMwRDEzMUYiIHN0cm9rZT0idXJsKCN2YXVsdEdvbGQpIiBzdHJva2Utd2lkdGg9IjIuMiIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgLz4KICAgIDxwYXRoIGQ9Ik00NiAxNCBMNzYgMjUgVjUyIEM3NiA3MCA0NiA4MiA0NiA4MiBDNDYgODIgMTYgNzAgMTYgNTIgVjI1IFoiIGZpbGw9Im5vbmUiIHN0cm9rZT0idXJsKCN2YXVsdEdvbGQpIiBzdHJva2Utd2lkdGg9IjAuOCIgc3Ryb2tlLWRhc2hhcnJheT0iMiAxLjUiIG9wYWNpdHk9IjAuNDUiIC8+CgogICAgPCEtLSBMYXllcmVkIEJhbmtub3RlIFN0YWNrIC0tPgogICAgPHBvbHlnb24gcG9pbnRzPSIyMyw1MiA0Niw0MSA2OSw1MiA0Niw2MyIgZmlsbD0iIzE4MjIzNSIgc3Ryb2tlPSJ1cmwoI3ZhdWx0R29sZCkiIHN0cm9rZS13aWR0aD0iMS4yIiAvPgogICAgPHBvbHlnb24gcG9pbnRzPSIyMyw0NSA0NiwzNCA2OSw0NSA0Niw1NiIgZmlsbD0iIzFFMkE0MCIgc3Ryb2tlPSJ1cmwoI3ZhdWx0R29sZCkiIHN0cm9rZS13aWR0aD0iMS4yIiAvPgogICAgPHBvbHlnb24gcG9pbnRzPSIyMywzOCA0NiwyNyA2OSwzOCA0Niw0OSIgZmlsbD0iIzI0MzM0QyIgc3Ryb2tlPSJ1cmwoI3ZhdWx0R29sZCkiIHN0cm9rZS13aWR0aD0iMS42IiAvPgoKICAgIDwhLS0gUG9seW1lciBTZWN1cml0eSBXaW5kb3cgRmVhdHVyZSAtLT4KICAgIDxlbGxpcHNlIGN4PSI0NiIgY3k9IjM4IiByeD0iOCIgcnk9IjQiIGZpbGw9InVybCgjcG9seW1lckhvbG8pIiBvcGFjaXR5PSIwLjkiIGZpbHRlcj0idXJsKCNzb2Z0R29sZEdsb3cpIiAvPgogICAgPGNpcmNsZSBjeD0iNDYiIGN5PSIzOCIgcj0iMS41IiBmaWxsPSIjRkZGRkZGIiAvPgogIDwvZz4KCiAgPCEtLSBUWVBPR1JBUEhZIExPQ0tVUCAtLT4KICA8ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxMTAsIDQyKSI+CiAgICA8dGV4dCBmb250LWZhbWlseT0iJ0NpbnplbCcsICdUcmFqYW4gUHJvJywgR2VvcmdpYSwgc2VyaWYiIGZvbnQtc2l6ZT0iMjQiIGZvbnQtd2VpZ2h0PSI3MDAiIGZpbGw9IiNGRkZGRkYiPgogICAgICBBVVNUUkFMSUFOCiAgICA8L3RleHQ+CiAgICA8dGV4dCB4PSIwIiB5PSIyNyIgZm9udC1mYW1pbHk9IidDaW56ZWwnLCAnVHJhamFuIFBybycsIEdlb3JnaWEsIHNlcmlmIiBmb250LXNpemU9IjI0IiBmb250LXdlaWdodD0iNzAwIiBmaWxsPSJ1cmwoI3ZhdWx0R29sZCkiPgogICAgICBSRVNFUlZFIFBST1BTCiAgICA8L3RleHQ+CiAgICA8dGV4dCB4PSIyIiB5PSI0NyIgZm9udC1mYW1pbHk9IidNb250c2VycmF0JywgJ0ludGVyJywgc2Fucy1zZXJpZiIgZm9udC1zaXplPSI4IiBmb250LXdlaWdodD0iNjAwIiBmaWxsPSIjOEI5QUIwIj4KICAgICAgQVVUSEVOVElDIE1PVElPTiBQSUNUVVJFIENVUlJFTkNZCiAgICA8L3RleHQ+CiAgPC9nPgo8L3N2Zz4='
const logoImg = (w, h, opacity = '') => `<img src="data:image/svg+xml;base64,${LOGO_B64}" alt="${esc(SITE.name)}" width="${w}" height="${h}" style="display:block;max-width:${w}px;height:auto${opacity ? `;opacity:${opacity}` : ''}">`

// Design tokens
const bg = '#0B0B0C'
const card = '#141416'
const card2 = '#1B1B1F'
const line = '#2A2A2F'
const ink = '#F2F0EB'
const ink2 = '#B3B0A8'
const ink3 = '#7C7972'
const accent = '#35D07F'
const accentInk = '#062A17'
const headGrad = 'linear-gradient(135deg,#101012 0%,#1E1E23 60%,#0B0B0C 100%)'

const font = "font-family:-apple-system,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;"
const display = "font-family:'Arial Narrow','Helvetica Neue',Arial,sans-serif;font-weight:800;text-transform:uppercase;"

// Keep old exports for backward compat (route files reference these)
const MODELS = { cinema: { name: 'Cinema' }, studio: { name: 'Studio' }, ticket: { name: 'Ticket' } }
export const MODEL_NAMES = Object.keys(MODELS)
export function pickModel() { return MODELS.cinema }

// ---------- order reference ----------
export function orderRef(date = new Date()) {
  const d = date.toISOString().slice(0, 10).replace(/-/g, '')
  const r = Math.random().toString(36).slice(2, 6).toUpperCase()
  return `ARP-${d}-${r}`
}

const fmtDate = (d = new Date()) => d.toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Australia/Sydney' })

// ---------- shell ----------
// Gmail's mobile app (and some other clients) auto-reprocess emails that
// don't explicitly declare dark-mode support, re-flipping an already-dark
// design toward white. color-scheme/supported-color-schemes meta tags plus
// bgcolor HTML attributes (belt-and-suspenders alongside the inline CSS,
// for Outlook and older webviews that ignore CSS background) stop that.
function shell(inner, preheader = '') {
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width">
<meta name="color-scheme" content="dark">
<meta name="supported-color-schemes" content="dark">
<title>${esc(SITE.name)}</title>
<style>
  :root { color-scheme: dark; supported-color-schemes: dark; }
  body { background-color: ${bg} !important; }
  [data-ogsc] body { background-color: ${bg} !important; }
</style>
</head>
<body bgcolor="${bg}" style="margin:0;padding:0;background:${bg};background-color:${bg};${font}">
<span style="display:none!important;visibility:hidden;opacity:0;color:transparent;height:0;width:0;overflow:hidden">${esc(preheader)}</span>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" bgcolor="${bg}" style="background:${bg};background-color:${bg};padding:28px 12px">
<tr><td align="center" bgcolor="${bg}" style="background:${bg};background-color:${bg}">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" bgcolor="${bg}" style="max-width:600px;width:100%;background:${bg};background-color:${bg}">
${inner}
</table>
</td></tr></table>
</body></html>`
}

// ---------- header with logo ----------
function header({ eyebrow, title, ref }) {
  return `
<tr><td bgcolor="${card}" style="background:${card};background-color:${card};background-image:${headGrad};border-radius:10px 10px 0 0;padding:26px 28px 22px">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" bgcolor="${card}" style="background:${card};background-color:${card}"><tr>
    <td valign="middle" bgcolor="${card}" style="background:${card};background-color:${card}">${logoImg(280, 58)}</td>
    <td valign="top" align="right" bgcolor="${card}" style="background:${card};background-color:${card};${font}font-size:10px;letter-spacing:0.16em;text-transform:uppercase;color:${accent};font-weight:700;white-space:nowrap">${esc(ref || '')}</td>
  </tr></table>
  <div style="height:22px"></div>
  <div style="${font}font-size:10px;letter-spacing:0.2em;text-transform:uppercase;font-weight:700;color:${accent}">${esc(eyebrow)}</div>
  <div style="${display}font-size:30px;line-height:1;margin-top:6px;color:${ink}">${esc(title)}</div>
</td></tr>
<tr><td bgcolor="${accent}" style="height:4px;background:${accent};background-color:${accent};line-height:4px;font-size:0">&nbsp;</td></tr>`
}

// ---------- section ----------
function section(label, bodyHtml, { tone = 'card' } = {}) {
  const bgColor = tone === 'card2' ? card2 : card
  return `
<tr><td bgcolor="${bgColor}" style="background:${bgColor};background-color:${bgColor};padding:22px 28px;border-left:1px solid ${line};border-right:1px solid ${line}">
  ${label ? `<div style="${font}font-size:10px;letter-spacing:0.18em;text-transform:uppercase;font-weight:700;color:${ink3};margin-bottom:10px">${esc(label)}</div>` : ''}
  ${bodyHtml}
</td></tr>
<tr><td bgcolor="${line}" style="height:1px;background:${line};background-color:${line};line-height:1px;font-size:0">&nbsp;</td></tr>`
}

// Nested <table>/<td> elements default to an OPAQUE WHITE background in
// Outlook and Apple Mail when they carry no background of their own — unlike
// a <div>, which is naturally transparent and shows the parent through. Since
// nearly all content below lives inside these nested tables, every one of
// them (and every cell in them) must carry its own explicit bgcolor/background
// matching its parent card tone, or the whole email renders white.

// ---------- key-value table ----------
function kv(rows, bg2 = card) {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" bgcolor="${bg2}" style="background:${bg2};background-color:${bg2}">${rows
    .map(([k, v, opts]) => {
      const color = opts?.accent ? accent : ink
      const weight = opts?.bold ? 'font-weight:700;' : ''
      return `<tr>
      <td valign="top" bgcolor="${bg2}" style="background:${bg2};background-color:${bg2};${font}font-size:12px;color:${ink3};padding:7px 14px 7px 0;white-space:nowrap;width:150px;border-bottom:1px solid ${line}">${esc(k)}</td>
      <td valign="top" bgcolor="${bg2}" style="background:${bg2};background-color:${bg2};${font}font-size:14px;color:${color};padding:7px 0;border-bottom:1px solid ${line};${weight}">${nl2br(v)}</td>
    </tr>`
    }).join('')}</table>`
}

// Parses one "order_summary" line into { qty, desc, price }. Anchors on the
// TRAILING dollar amount rather than a specific dash character between desc
// and price: the separator in submitted text is sometimes an em dash, an en
// dash, a plain hyphen, or (when copy/paste mangles the encoding) the U+FFFD
// replacement glyph — matching a literal "—" made the whole regex fail on
// any of those, silently dropping the price and defaulting qty to 1. A line
// like "1 x Briefcase Prop Set — $250,000 — $188.00" also has an embedded
// dollar figure that isn't the price, so the match must take the LAST one.
function parseOrderLine(line) {
  const priceMatch = line.match(/(\$[\d,]+(?:\.\d{1,2})?)\s*$/)
  const price = priceMatch ? priceMatch[1] : ''
  let rest = priceMatch ? line.slice(0, priceMatch.index) : line
  const qtyMatch = rest.match(/^\s*(\d+)\s*[×x]\s*/)
  const qty = qtyMatch ? qtyMatch[1] : '1'
  if (qtyMatch) rest = rest.slice(qtyMatch[0].length)
  const desc = rest.replace(/[\s\-‐-―�]+$/u, '').trim() || line
  return { qty, desc, price }
}

// ---------- items table for order emails ----------
function itemsTable(summary, bg2 = card) {
  const lines = String(summary || '').split('\n').filter(Boolean)
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" bgcolor="${bg2}" style="background:${bg2};background-color:${bg2}">${lines
    .map((l) => {
      const { qty, desc, price } = parseOrderLine(l)
      const left = qty !== '1' ? `${qty} × ${desc}` : desc
      return `<tr>
        <td bgcolor="${bg2}" style="background:${bg2};background-color:${bg2};${font}font-size:14px;color:${ink};padding:12px 0;border-bottom:1px dashed ${line}"><strong>${esc(left)}</strong></td>
        <td align="right" bgcolor="${bg2}" style="background:${bg2};background-color:${bg2};${font}font-size:14px;color:${ink};padding:12px 0;border-bottom:1px dashed ${line};white-space:nowrap;font-weight:700;vertical-align:top">${esc(price)}</td>
      </tr>`
    }).join('')}</table>`
}

// ---------- items table for invoices (with qty column) ----------
function invoiceItemsTable(summary, bg2 = card) {
  const lines = String(summary || '').split('\n').filter(Boolean)
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" bgcolor="${bg2}" style="background:${bg2};background-color:${bg2};border:1px solid ${line};border-radius:6px;overflow:hidden">
    <tr bgcolor="${card2}" style="background:${card2};background-color:${card2}">
      <td bgcolor="${card2}" style="background:${card2};background-color:${card2};padding:10px 14px;font-size:11px;letter-spacing:0.1em;text-transform:uppercase;color:${ink3};font-weight:700">Description</td>
      <td align="center" bgcolor="${card2}" style="background:${card2};background-color:${card2};padding:10px 8px;font-size:11px;letter-spacing:0.1em;text-transform:uppercase;color:${ink3};font-weight:700;width:50px">Qty</td>
      <td align="right" bgcolor="${card2}" style="background:${card2};background-color:${card2};padding:10px 14px;font-size:11px;letter-spacing:0.1em;text-transform:uppercase;color:${ink3};font-weight:700;width:80px">Amount</td>
    </tr>
    ${lines.map((l) => {
      const { qty, desc, price } = parseOrderLine(l)
      return `<tr><td bgcolor="${bg2}" style="background:${bg2};background-color:${bg2};padding:12px 14px;font-size:14px;color:${ink};border-top:1px solid ${line}">${esc(desc)}</td><td align="center" bgcolor="${bg2}" style="background:${bg2};background-color:${bg2};padding:12px 8px;font-size:14px;color:${ink};border-top:1px solid ${line}">${esc(qty)}</td><td align="right" bgcolor="${bg2}" style="background:${bg2};background-color:${bg2};padding:12px 14px;font-size:14px;color:${ink};border-top:1px solid ${line};font-weight:700">${esc(price)}</td></tr>`
    }).join('')}
  </table>`
}

// ---------- totals ----------
function totals(rows, bg2 = card) {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" bgcolor="${bg2}" style="background:${bg2};background-color:${bg2}">${rows
    .filter(Boolean)
    .map(([k, v, strong, green]) => `<tr>
      <td bgcolor="${bg2}" style="background:${bg2};background-color:${bg2};${font}font-size:${strong ? 15 : 13}px;color:${green ? accent : (strong ? ink : ink2)};padding:${strong ? '12px 0 0' : '4px 0'};font-weight:${strong ? 700 : 500}">${esc(k)}</td>
      <td align="right" bgcolor="${bg2}" style="background:${bg2};background-color:${bg2};${strong ? display + 'font-size:24px;' : font + 'font-size:13px;'}color:${green ? accent : (strong ? ink : ink2)};padding:${strong ? '12px 0 0' : '4px 0'};white-space:nowrap">${esc(v)}</td>
    </tr>`)
    .join('')}</table>`
}

// ---------- green CTA button ----------
function button(label, href) {
  return `<table role="presentation" cellpadding="0" cellspacing="0"><tr>
    <td bgcolor="${accent}" style="background:${accent};background-color:${accent};border-radius:5px">
      <a href="${esc(href)}" style="display:inline-block;padding:12px 22px;${display}font-size:12px;letter-spacing:0.1em;color:${accentInk};text-decoration:none">${esc(label)}</a>
    </td>
  </tr></table>`
}

// ---------- WhatsApp CTA ----------
function whatsappCta(text, prefilledMsg) {
  const waUrl = `https://api.whatsapp.com/send?phone=${SITE.whatsapp.replace(/[^0-9]/g, '')}&text=${encodeURIComponent(prefilledMsg)}`
  return `<div style="font-size:12px;color:${ink3};margin-bottom:10px">${esc(text)}</div>${button('Chat on WhatsApp →', waUrl)}`
}

// ---------- footer with logo + verified business + compliance ----------
function footer() {
  return `
<tr><td bgcolor="${card}" style="background:${card};background-color:${card};border:1px solid ${line};border-top:0;border-radius:0 0 10px 10px;padding:20px 28px 24px">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" bgcolor="${card}" style="margin-bottom:16px;background:${card};background-color:${card}"><tr><td align="center" bgcolor="${card}" style="background:${card};background-color:${card}">
    ${logoImg(200, 42, '0.6')}
  </td></tr></table>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" bgcolor="${card2}" style="border:1px solid ${line};border-left:4px solid ${accent};border-radius:6px;background:${card2};background-color:${card2}"><tr>
    <td bgcolor="${card2}" style="background:${card2};background-color:${card2};padding:14px 16px">
      <div style="${display}font-size:14px;letter-spacing:0.06em;color:${accent}">ABN ${esc(SITE.abn)}</div>
      <div style="${font}font-size:13px;color:${ink};margin-top:2px">${esc(SITE.legalName)} &middot; Australian Private Company</div>
      <div style="${font}font-size:12px;color:${ink2};margin-top:2px">ABN active &middot; GST registered &middot; ${esc(SITE.location)}</div>
      <a href="${abr}" style="${font}font-size:12px;color:${accent};font-weight:700;text-decoration:underline;display:inline-block;margin-top:6px">Verify on the Australian Business Register &nearr;</a>
    </td>
  </tr></table>
  <table role="presentation" cellpadding="0" cellspacing="0" bgcolor="${card2}" style="margin-top:14px;background:${card2};background-color:${card2}"><tr>
    <td style="width:6px;background:repeating-linear-gradient(135deg,${ink} 0 6px,${card} 6px 12px);border-radius:3px 0 0 3px">&nbsp;</td>
    <td bgcolor="${card2}" style="background:${card2};background-color:${card2};border:1px solid ${line};border-left:0;padding:9px 12px;${font}font-size:10px;letter-spacing:0.14em;text-transform:uppercase;font-weight:700;color:${ink2}"><span style="color:${accent}">Not legal tender</span> &middot; Reduced-scale prop currency &middot; For film, theatre &amp; performance use</td>
  </tr></table>
  <p style="${font}font-size:11px;line-height:1.6;color:${ink3};margin:16px 0 0">All products sold by ${esc(SITE.name)} are novelty prop items &mdash; reproductions sized to differ from genuine Australian currency by at least 25% in line with RBA reproduction guidance, carrying no replicated banknote security features and clearly marked NOT LEGAL TENDER. They are not currency and cannot be used as payment. ${esc(SITE.name)} is a trading name of ${esc(SITE.legalName)}.</p>
  <p style="${font}font-size:11px;color:${ink3};margin:10px 0 0"><a href="${site}" style="color:${ink2};text-decoration:none">${esc(SITE.domain)}</a> &middot; <a href="mailto:${esc(SITE.email)}" style="color:${ink2};text-decoration:none">${esc(SITE.email)}</a> &middot; WhatsApp ${esc(SITE.whatsapp)}</p>
</td></tr>`
}

// ============================================================
// 1. CUSTOMER ORDER CONFIRMATION
// ============================================================
export function customerOrderEmail({ model, data, ref }) {
  const firstName = (data.name || '').split(' ')[0]
  const totalRows = [
    ['Subtotal', data.order_subtotal],
    data.order_discount ? ['Crypto discount (10%)', data.order_discount, false, true] : null,
    ['Shipping', data.order_shipping || 'Free'],
    ['Total due', data.order_total, true],
  ]

  const waMsg = `📦 *Order ${ref}*\n\nHi ARP — just placed order ${ref} for ${data.order_total} via ${data.payment_method}. Ready to settle when you are!`

  const inner = `
${header({ eyebrow: 'Order confirmation', title: `Thanks, ${firstName}. It's in.`, ref })}
${section(null, `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" bgcolor="${card}" style="background:${card};background-color:${card}"><tr><td align="center" bgcolor="${card}" style="background:${card};background-color:${card}">
    <table role="presentation" cellpadding="0" cellspacing="0" style="border-radius:999px;border:1px solid ${line};background:rgba(53,208,127,0.08)">
    <tr><td style="padding:10px 18px;${font}font-size:12px;letter-spacing:0.12em;text-transform:uppercase;font-weight:700;color:${accent}">&#9679;&ensp;Order Logged &mdash; Awaiting Concierge Payment Details</td></tr>
    </table>
  </td></tr></table>
  <p style="${font}font-size:15px;line-height:1.6;color:${ink};margin:16px 0 0;text-align:center">We have your order request and it is now in the print queue pending payment. Everything below is what we&rsquo;ll produce &mdash; reduced-scale, marked NOT LEGAL TENDER, packed to spec.</p>`)}
${section('Order details', kv([
    ['Order reference', ref, { bold: true }],
    ['Date', fmtDate()],
    ['Customer', `${data.name} &middot; ${data.email}`],
    ['Payment method', data.payment_method || '—', { accent: true, bold: true }],
    ['Delivery', `Australia Post Tracked &middot; ${data.address || 'Address on file'}`],
  ]))}
${section('Items', `${itemsTable(data.order_summary)}<div style="height:16px"></div>${totals(totalRows)}`)}
${section('Payment — to be confirmed', `<p style="${font}font-size:14px;line-height:1.6;color:${ink};margin:0">You selected <strong style="color:${accent}">${esc(data.payment_method || 'a payment method')}</strong> with the 10% discount applied. Nothing is due yet: we confirm the method with you first, then send a tax invoice carrying the exact wallet address and your order reference. If you&rsquo;d prefer a different method, just reply to this email.</p>
  <table role="presentation" cellpadding="0" cellspacing="0" bgcolor="${card2}" style="margin-top:16px;background:${card2};background-color:${card2}"><tr>
    <td bgcolor="${card2}" style="background:${card2};background-color:${card2};border:1px solid ${line};color:${ink2};${display}font-size:11px;letter-spacing:0.14em;padding:7px 12px;border-radius:4px">&#9679;&ensp;AWAITING CONCIERGE SETTLEMENT</td>
  </tr></table>`, { tone: 'card2' })}
${section('What happens next', `<table role="presentation" cellpadding="0" cellspacing="0" bgcolor="${card}" style="background:${card};background-color:${card}">
    ${[
      ['1', 'Inventory reserved', 'Your items are set aside in the print queue. No one else can claim them.'],
      ['2', 'Official tax invoice with payment details', `Sent to this address shortly with your ${data.payment_method?.toLowerCase().includes('crypto') ? 'BTC wallet address' : 'payment details'} and the order reference to quote.`],
      ['3', 'You pay · we confirm', 'You get a paid tax invoice and a print date the moment it clears.'],
      ['4', 'Print, pack, tracked delivery', 'Circulation level and banding exactly as ordered. Australia Post tracking on dispatch.'],
    ].map(([n, t, d]) => `<tr>
      <td valign="top" bgcolor="${card}" style="background:${card};background-color:${card};padding:0 12px 14px 0"><div style="width:26px;height:26px;border-radius:13px;background:${accent};color:${accentInk};${display}font-size:12px;line-height:26px;text-align:center">${n}</div></td>
      <td valign="top" bgcolor="${card}" style="background:${card};background-color:${card};padding:0 0 14px"><div style="${font}font-size:14px;font-weight:700;color:${ink}">${t}</div><div style="${font}font-size:13px;color:${ink2}">${d}</div></td>
    </tr>`).join('')}
  </table>`)}
${section(null, `<div style="text-align:center">${whatsappCta('Need it faster? Message us directly.', waMsg)}</div>`, { tone: 'card2' })}
${footer()}`

  return {
    subject: `Order ${ref} confirmed — ${SITE.name}`,
    html: shell(inner, `Order ${ref} received — ${data.order_total} · ${data.payment_method} — inventory reserved, concierge payment details incoming.`),
  }
}

// ============================================================
// 2. INTERNAL ORDER NOTIFICATION (seller/admin email)
// ============================================================
export function internalOrderEmail({ model, data, ref }) {
  const totalRows = [
    ['Subtotal', data.order_subtotal],
    data.order_discount ? ['Crypto discount (10%)', data.order_discount, false, true] : null,
    ['Shipping', data.order_shipping || 'Free'],
    ['Total', data.order_total, true],
  ]

  const waMsg = `📋 *Admin: Order ${ref}*\nCustomer: ${data.name}\nTotal: ${data.order_total} (${data.payment_method})\nStatus: Ready to settle`

  // Deep link into /admin/invoice/ with the order pre-filled — the owner
  // only has to add the payment details and hit send, no re-typing.
  const adminParams = new URLSearchParams({
    ref: ref || '',
    name: data.name || '',
    email: data.email || '',
    address: data.address || '',
    items: data.order_summary || '',
    subtotal: data.order_subtotal || '',
    discount: data.order_discount || '',
    shipping: data.order_shipping || 'Free',
    total: data.order_total || '',
    paymentMethod: data.payment_method || '',
  })
  const adminUrl = `${site}/admin/invoice/?${adminParams.toString()}`

  const inner = `
${header({ eyebrow: 'Incoming order', title: `${data.order_total} · ${data.payment_method}`, ref })}
${section(null, `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" bgcolor="${card}" style="background:${card};background-color:${card}"><tr><td bgcolor="${card}" style="background:${card};background-color:${card}">
    <table role="presentation" cellpadding="0" cellspacing="0" style="border-radius:999px;border:1px solid ${line};background:rgba(53,208,127,0.08)">
    <tr><td style="padding:7px 14px;${font}font-size:11px;letter-spacing:0.12em;text-transform:uppercase;font-weight:700;color:${accent}">&#9679;&ensp;Awaiting settlement</td></tr>
    </table>
    <table role="presentation" cellpadding="0" cellspacing="0" bgcolor="${card}" style="margin-left:12px;display:inline-table;background:${card};background-color:${card}"><tr>
    <td bgcolor="${card}" style="background:${card};background-color:${card};border:1px solid ${line};padding:5px 12px;border-radius:4px;${font}font-size:11px;letter-spacing:0.1em;text-transform:uppercase;font-weight:700;color:${ink2}">&#8383; ${esc(data.payment_method || '—')}</td>
    </tr></table>
  </td></tr></table>`)}
${section('Customer', `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" bgcolor="${card}" style="background:${card};background-color:${card}">
    <tr>
      <td width="50%" valign="top" bgcolor="${card}" style="background:${card};background-color:${card};padding-right:12px">
        <div style="${font}font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:${ink3};font-weight:600;margin-bottom:2px">Name</div>
        <div style="${font}font-size:14px;color:${ink}">${esc(data.name)}</div>
      </td>
      <td width="50%" valign="top" bgcolor="${card}" style="background:${card};background-color:${card}">
        <div style="${font}font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:${ink3};font-weight:600;margin-bottom:2px">Email</div>
        <div style="${font}font-size:14px;color:${ink}">${esc(data.email)}</div>
      </td>
    </tr>
    <tr>
      <td width="50%" valign="top" bgcolor="${card}" style="background:${card};background-color:${card};padding-right:12px;padding-top:12px">
        <div style="${font}font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:${ink3};font-weight:600;margin-bottom:2px">Payment rail</div>
        <div style="${font}font-size:14px;color:${accent};font-weight:600">${esc(data.payment_method || '—')}</div>
      </td>
      <td width="50%" valign="top" bgcolor="${card}" style="background:${card};background-color:${card};padding-top:12px">
        <div style="${font}font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:${ink3};font-weight:600;margin-bottom:2px">Date</div>
        <div style="${font}font-size:14px;color:${ink}">${esc(fmtDate())}</div>
      </td>
    </tr>
    ${data.phone ? `<tr><td colspan="2" valign="top" bgcolor="${card}" style="background:${card};background-color:${card};padding-top:12px">
      <div style="${font}font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:${ink3};font-weight:600;margin-bottom:2px">Phone</div>
      <div style="${font}font-size:14px;color:${ink}">${esc(data.phone)}</div>
    </td></tr>` : ''}
  </table>`)}
${data.address ? section('Shipping address', `<div style="${font}font-size:14px;line-height:1.6;color:${ink}">${nl2br(data.address)}<br><span style="color:${ink3}">Australia &middot; Australia Post Tracked</span></div>`, { tone: 'card2' }) : ''}
${section('Items ordered', `${itemsTable(data.order_summary)}<div style="height:16px"></div>${totals(totalRows)}`)}
${data.notes ? section('Customer notes', `<p style="${font}font-size:14px;color:${ink2};font-style:italic">&ldquo;${esc(data.notes)}&rdquo;</p>`, { tone: 'card2' }) : ''}
${section(null, `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" bgcolor="${card2}" style="background:${card2};background-color:${card2}"><tr>
    <td bgcolor="${card2}" style="background:${card2};background-color:${card2};padding-right:10px">${button('View Order in Admin →', adminUrl)}</td>
    <td bgcolor="${card2}" style="background:${card2};background-color:${card2}">${button('WhatsApp', `https://api.whatsapp.com/send?phone=${SITE.whatsapp.replace(/[^0-9]/g, '')}&text=${encodeURIComponent(waMsg)}`)}</td>
  </tr></table>
  <p style="${font}font-size:12px;color:${ink3};margin:14px 0 0">Order reference <strong style="color:${ink}">${esc(ref)}</strong> &middot; received ${esc(fmtDate())} &middot; submitted from ${esc(SITE.domain)}</p>`, { tone: 'card2' })}
${footer()}`

  return {
    subject: `Order ${ref} — ${data.order_total} · ${data.payment_method} — ${data.name}`,
    html: shell(inner, `${data.name} · ${data.order_total} · ${data.payment_method}`),
  }
}

// ============================================================
// 3. CONTACT / WHOLESALE NOTIFICATION
// ============================================================
export function internalGenericEmail({ model, kind, data, rows }) {
  const title = kind === 'wholesale' ? 'Production enquiry' : 'Contact message'
  const inner = `
${header({ eyebrow: `New ${kind} submission`, title, ref: fmtDate() })}
${section('Details', kv(rows.map(([k, v]) => [k, v])))}
${section(null, button('Reply', `mailto:${esc(data.email)}?subject=${encodeURIComponent(`Re: your ${kind} enquiry — ${SITE.name}`)}`), { tone: 'card2' })}
${footer()}`
  return {
    subject: `${title} — ${data.name}`,
    html: shell(inner, `${data.name}: ${(data.message || data.details || '').slice(0, 90)}`),
  }
}

// ============================================================
// 4. TAX INVOICE
// ============================================================
export function taxInvoiceEmail({ model, inv }) {
  const gst = inv.gst || ''
  const totalRows = [
    ['Subtotal', inv.subtotal],
    inv.discount ? ['Crypto discount (10%)', inv.discount, false, true] : null,
    ['Shipping', inv.shipping || 'Free'],
    gst ? ['GST included (1/11th)', gst] : null,
    [inv.paid ? 'Total paid (AUD)' : 'Total due (AUD)', inv.total, true],
  ]

  const paymentBox = inv.paid ? '' : (inv.pay ? `
${section(null, `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" bgcolor="#0D1F15" style="border:2px solid ${accent};border-radius:8px;background:#0D1F15;background-color:#0D1F15;overflow:hidden">
    <tr><td bgcolor="#0D1F15" style="background:linear-gradient(135deg,#0B2A18 0%,#0D1F15 100%);background-color:#0D1F15;padding:20px 22px">
      <div style="${font}font-size:10px;letter-spacing:0.2em;text-transform:uppercase;font-weight:700;color:${accent};margin-bottom:12px">&#9679;&ensp;Payment settlement &mdash; ${esc(inv.pay.title)}</div>
      <div style="${font}font-size:14px;color:${ink};line-height:1.7;margin-bottom:14px">
        Send exactly <strong style="color:${accent};font-size:16px">${esc(inv.total)} AUD</strong> worth to the address below.<br>
        Quote your order reference <strong>${esc(inv.ref)}</strong> in any memo/note field.
      </div>
      ${inv.pay.lines.map(([k, v]) => `
        <div style="${font}font-size:10px;letter-spacing:0.14em;text-transform:uppercase;font-weight:700;color:${ink3};margin-bottom:6px;margin-top:10px">${esc(k)}</div>
        <div style="background:${bg};border:1px solid ${line};border-radius:6px;padding:14px 16px;font-family:'Courier New',Courier,monospace;font-size:14px;color:${accent};word-break:break-all;letter-spacing:0.04em">${esc(v)}</div>
      `).join('')}
      <p style="${font}font-size:12px;color:${ink2};margin-top:10px">${esc(inv.note || `Use ${inv.ref} as the payment reference. Reply to this email once sent — printing starts the moment payment clears.`)}</p>
    </td></tr>
  </table>`)}` : section('Payment', `<p style="${font}font-size:14px;line-height:1.6;color:${ink};margin:0">${nl2br(inv.note || `Use ${inv.ref} as the payment reference. Reply to this email once sent — printing starts the moment payment clears.`)}</p>`, { tone: 'card2' }))

  const waMsg = inv.paid
    ? `✅ *Payment Confirmed* — Order ${inv.ref}\n\nThanks — payment received. When does printing start?`
    : `✅ *Payment Sent* — Order ${inv.ref}\n\nHi ARP, I've just sent ${inv.total} in ${inv.paymentMethod || 'payment'}. Please confirm when received.`

  const inner = `
${header({ eyebrow: inv.paid ? 'Tax invoice · payment received' : 'Tax invoice', title: inv.paid ? 'Paid. Now printing.' : 'Payment Settlement', ref: inv.invoiceNo })}
${section(null, `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" bgcolor="${card}" style="background:${card};background-color:${card}"><tr>
    <td width="50%" valign="top" bgcolor="${card}" style="background:${card};background-color:${card}">
      <div style="${font}font-size:10px;letter-spacing:0.18em;text-transform:uppercase;font-weight:700;color:${ink3};margin-bottom:8px">Billed to</div>
      <div style="${font}font-size:14px;color:${ink};line-height:1.6">${esc(inv.name)}<br>${esc(inv.email)}${inv.address ? `<br>${nl2br(inv.address)}` : ''}</div>
    </td>
    <td width="50%" valign="top" bgcolor="${card}" style="background:${card};background-color:${card}">
      <div style="${font}font-size:10px;letter-spacing:0.18em;text-transform:uppercase;font-weight:700;color:${ink3};margin-bottom:8px">Invoice from</div>
      <div style="${font}font-size:14px;color:${ink};line-height:1.6">${esc(SITE.legalName)}<br>ABN ${esc(SITE.abn)}<br>${esc(SITE.location)}<br>${esc(SITE.email)}</div>
    </td>
  </tr></table>
  <div style="height:16px"></div>
  ${kv([
    ['Invoice date', inv.date || fmtDate()],
    ['Order reference', inv.ref, { bold: true }],
    ['Payment method', inv.paymentMethod || '—', { accent: true, bold: true }],
    ['Payment due', inv.paid ? `Paid ${inv.paidDate || fmtDate()}` : 'Upon receipt', { bold: true }],
  ])}`)}
${section('Items', `${invoiceItemsTable(inv.items)}<div style="height:16px"></div>${totals(totalRows)}`)}
${paymentBox}
${inv.paid ? section('What happens next', `<p style="${font}font-size:14px;line-height:1.6;color:${ink};margin:0">${esc(inv.note || 'Printing and packing to spec — circulation level and banding exactly as ordered. You will receive an Australia Post tracking number by email on dispatch.')}</p>`, { tone: 'card2' }) : ''}
${section(null, `<div style="text-align:center"><p style="${font}font-size:13px;color:${ink2};margin-bottom:12px">Once you&rsquo;ve sent payment, reply to this email or message us on WhatsApp and we&rsquo;ll confirm receipt.</p>${button('Confirm Payment on WhatsApp →', `https://api.whatsapp.com/send?phone=${SITE.whatsapp.replace(/[^0-9]/g, '')}&text=${encodeURIComponent(waMsg)}`)}</div>`)}
${footer()}`

  return {
    subject: inv.paid ? `Payment received — tax invoice ${inv.invoiceNo} — ${SITE.name}` : `Tax invoice ${inv.invoiceNo} — ${SITE.name}`,
    html: shell(inner, `${inv.paid ? 'Paid' : 'Tax Invoice'} ${inv.invoiceNo} — ${inv.total} AUD${inv.paymentMethod ? ` — ${inv.paymentMethod}` : ''}`),
  }
}
