// Answer-first helpers: standalone 40-60 word answers and key-fact lists built from real site data.
// Pure functions with no imports, so they run in server components and in Node scripts alike.

const plain = (s) => String(s).replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
export const wc = (s) => plain(s).split(/\s+/).filter(Boolean).length
const sentences = (s) => String(s).split(/(?<=[.!?])\s+(?=[A-Z$"“(\[0-9])/).filter(Boolean)

function clip(s, max) {
  const words = plain(s).split(/\s+/)
  let t = words.slice(0, max).join(' ')
  const cut = Math.max(t.lastIndexOf(', '), t.lastIndexOf('; '), t.lastIndexOf(' — '))
  if (cut > t.length * 0.6) t = t.slice(0, cut)
  return t.replace(/[,;:—-]+$/, '') + '.'
}

// Pull the opening sentences of an article into a 40-60 word answer and return the remaining paragraphs
// without them, so nothing is repeated on the page.
export function splitAnswer(paras, min = 40, max = 60, soft = 72) {
  const picked = []
  const rest = []
  let total = 0
  let done = false
  for (const para of paras) {
    if (done) { rest.push(para); continue }
    const ss = sentences(para)
    let k = 0
    for (; k < ss.length; k++) {
      const w = wc(ss[k])
      if (total >= min) { done = true; break }
      if (picked.length && total + w > max && !(total < min && total + w <= soft)) { done = true; break }
      if (!picked.length && w > max) { picked.push(clip(ss[k], max)); total = max; k++; done = true; break }
      picked.push(ss[k])
      total += w
    }
    if (total >= min) done = true
    const left = ss.slice(k)
    if (left.length) rest.push(left.join(' '))
  }
  return { answer: picked.join(' '), rest, words: total }
}

export function fitWords(text, pads = [], min = 40, max = 60) {
  let t = String(text).replace(/\s+/g, ' ').trim()
  for (const p of pads) {
    if (wc(t) >= min) break
    if (wc(t) + wc(p) <= max) t += ' ' + p
  }
  if (wc(t) > max) {
    let out = ''
    for (const s of sentences(t)) {
      const next = (out + ' ' + s).trim()
      if (wc(next) > max) break
      out = next
    }
    t = out || clip(t, max)
  }
  return t
}

const money = (n) => (Number.isInteger(n) ? `$${n.toLocaleString('en-AU')}` : `$${n.toLocaleString('en-AU', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`)
const list = (a) => (a.length < 2 ? a.join('') : `${a.slice(0, -1).join(', ')} and ${a[a.length - 1]}`)

// Hand-written answers for the posts whose opening sentences are too long to lift cleanly (40-60 words each).
export const ANSWER_OVERRIDES = {
  'prop-money-buying-guide-for-australian-filmmakers': 'Choose prop money by the shot: match the denomination to the scene, order enough stacks to look full on camera, and pick a circulation level that suits the story. Every Australian Reserve Props note is reduced-scale by at least 25%, marked NOT LEGAL TENDER and shipped free and tracked across Australia.',
  'producers-guide-to-bulk-prop-money': 'Bulk prop money suits productions that need matching stacks across many scenes. Our Bulk Production Pack and briefcase sets are built for volume, with pre-banded stacks and wholesale pricing available on request. Every note is reduced-scale by at least 25%, marked NOT LEGAL TENDER and shipped free and tracked across Australia.',
  'christmas-prop-money-gift-ideas': 'Novelty money makes a funny Christmas gift: a prop money gift box, a money lei, or a stack of prop notes in a card. Each item is reduced-scale, marked NOT LEGAL TENDER and meant for novelty use only. Orders ship free and tracked across Australia, so order early to arrive before the holidays.',
  'what-is-prop-money-actually-made-of': 'Prop money is novelty currency printed for how it looks and handles on camera, not for spending. It does not use the polymer base or the security features of genuine Australian banknotes. Australian Reserve Props notes are reduced-scale by at least 25% and marked NOT LEGAL TENDER.',
  'prop-money-shipping-and-delivery-explained': 'Australian Reserve Props ships Australia-wide by tracked Australia Post, and shipping is free on every order. There is no regional pricing tier or excluded postcode, and we do not ship internationally. The minimum order is $350 in goods. Payment details are sent after you place your order and the payment method is confirmed.',
  'fake-money-australia-buyers-guide': 'Fake money in Australia means novelty prop currency, and the safe kind is reduced-scale, clearly marked and free of copied security features. Buy from a supplier that states the size reduction and marks every note NOT LEGAL TENDER. Australian Reserve Props notes are at least 25% smaller than genuine notes and ship free and tracked.',
  'corporate-event-and-conference-prop-money-ideas': 'Prop money works at corporate events as stage dressing, game-show cash, trade-show giveaways and photo-booth props. Choose reduced-scale notes marked NOT LEGAL TENDER, and avoid any use that implies the cash is genuine. Australian Reserve Props ships free and tracked across Australia, with volume pricing available on request for large orders.',
  'prop-money-for-school-and-university-projects': 'For school and university projects, use play money or prop notes that are clearly not genuine: reduced-scale, marked NOT LEGAL TENDER and used for learning, drama or business simulations. Our kids play money educational set and classroom bulk pack suit teaching, and orders ship free and tracked across Australia.',
}

export const CATEGORY_ANSWERS = {
  'twenty-dollar-notes': { q: 'What are $20 prop notes?', a: '$20 prop notes are Australian $20-style novelty notes made for film, magic tricks, photo shoots and parties. Each note is reduced-scale by at least 25% and marked NOT LEGAL TENDER. Packs come in 50, 100 and 250 notes, with free tracked Australia Post shipping across Australia and a $350 minimum order.' },
  'fifty-dollar-notes': { q: 'Why are $50 prop notes the most requested?', a: '$50 prop notes are Australian $50-style novelty notes, and film and theatre productions request them most for wallets, registers and handoffs. Each note is reduced-scale by at least 25% and marked NOT LEGAL TENDER. Choose a 50-note half pack, a 100-note stack or a 250-note jumbo pack, shipped free and tracked.' },
  'hundred-dollar-notes': { q: 'What are $100 prop notes used for?', a: '$100 prop notes are Australian $100-style novelty notes built for briefcase reveals and high-value scenes where a stack needs to look substantial on camera. Each note is reduced-scale by at least 25% and marked NOT LEGAL TENDER. Packs come in 50, 100 and 250 notes, shipped free and tracked across Australia.' },
  'vintage-series-notes': { q: 'What are vintage series prop notes?', a: 'Vintage and legacy series prop notes are older-style Australian note designs for period productions. They are reduced-scale by at least 25%, marked NOT LEGAL TENDER and carry no replicated security features. Choose $20, $50 or $100 vintage stacks, shipped free and tracked across Australia, with a $350 minimum order on goods.' },
  'packs-bundles': { q: 'What are prop money packs and bundles?', a: 'Prop money packs and bundles combine several denominations or larger quantities in one order. The range includes a mixed-denomination starter pack, a bulk production pack and event packs for weddings and content creators. Every note is reduced-scale by at least 25% and marked NOT LEGAL TENDER, with free tracked shipping Australia-wide.' },
  'briefcases-bags': { q: 'What is a prop money briefcase?', a: 'A prop money briefcase is a ready-packed case of note stacks for film reveal scenes. Choose the $50,000 or $250,000 briefcase set or the $500,000 duffel bag set, each dressed from reduced-scale notes marked NOT LEGAL TENDER. Orders ship free and tracked across Australia, with a $350 minimum order on goods.' },
  'confetti-party-favors': { q: 'What are money confetti and money leis?', a: 'Money confetti, shredded cash and money leis are novelty party items made from money-print paper. They suit graduations, weddings, birthdays and photo booths, and are sold for novelty use only. Choose a money confetti pack, a shredded cash bag or a single or three-pack money lei, shipped free and tracked across Australia.' },
  'display-collectibles': { q: 'What are display and collectible prop money pieces?', a: 'Display and collectible pieces show prop notes as framed or cased items for offices, collectors and set dressing. The range includes a denomination display frame, a limited edition collector case, a counter display and an acrylic display case. Every note is reduced-scale by at least 25% and marked NOT LEGAL TENDER, with free tracked shipping.' },
  'personalised-novelty': { q: 'What is personalised prop money?', a: 'Personalised prop money covers photo prop note packs, custom message gift packs and novelty big cheques. They suit gifts, presentations and gag moments, and a novelty cheque is never a real financial instrument. Every note is reduced-scale by at least 25% and marked NOT LEGAL TENDER, with free tracked shipping across Australia.' },
  'kids-play-money': { q: 'What is Australian play money for kids?', a: 'Australian play money for kids is an educational set for counting, shopping games and classroom role play. The range includes a kids play money educational set and a classroom bulk pack. The notes are reduced-scale and marked NOT LEGAL TENDER, and orders ship free and tracked across Australia with a $350 minimum order on goods.' },
  'gift-sets': { q: 'What are novelty money gift sets?', a: 'Novelty money gift sets are boxed gifts for birthdays, graduations and gag presents. The range includes a prop money gift box set, a birthday money gift box and a graduation money gift set. Every note is reduced-scale by at least 25% and marked NOT LEGAL TENDER, and orders ship free and tracked across Australia.' },
  accessories: { q: 'What prop money accessories are available?', a: 'Prop money accessories include a money gun device, a money gun refill pack, currency bands and display cases that pair with prop notes. Use them for party effects, content and displays. Notes sold with them are reduced-scale and marked NOT LEGAL TENDER, and orders ship free and tracked across Australia.' },
}

export const HOME_DEFINITION = 'Prop money is novelty currency made for film, television, theatre, photography and parties. Australian Reserve Props makes reduced-scale Australian-styled notes, each at least 25% smaller than a genuine note, marked NOT LEGAL TENDER and free of replicated security features, so they photograph as cash without being mistaken for it.'

const isNoteProduct = (p) => p.noteCount > 1
const isNovelty = (p) => (p.tags || []).includes('not-legal-tender')

const NOTE_PADS = [
  'Every note is reduced-scale by at least 25% and marked NOT LEGAL TENDER.',
  'It ships free and tracked across Australia.',
  'System-assigned placeholder serials only.',
]
const ITEM_PADS = [
  'It ships free and tracked across Australia.',
  'Prices are in Australian dollars and include GST.',
  'A $350 minimum order on goods applies to every order.',
]

export function productAnswer(p) {
  const name = p.name
  const price = money(p.price)
  let text
  if (p.noteCount > 1 && p.faceValue) {
    text = `The ${name} contains ${p.noteCount.toLocaleString('en-AU')} Australian-styled prop notes (${p.mix}) with a combined face value of ${money(p.faceValue)}, priced at ${price} AUD. Every note is reduced-scale by at least 25%, marked NOT LEGAL TENDER and carries a system-assigned serial only. It ships free and tracked across Australia.`
  } else {
    const first = (sentences(p.description)[0] || '').trim()
    text = `The ${name} is priced at ${price} AUD. ${first}`
  }
  const pads = isNoteProduct(p) ? NOTE_PADS : isNovelty(p) ? ['It is a novelty item marked NOT LEGAL TENDER.', ...ITEM_PADS] : ITEM_PADS
  return fitWords(text, pads)
}

export function productFacts(p, minOrder) {
  const f = [['Price', `${money(p.price)} AUD, GST inclusive`]]
  if (p.mix) f.push(['Contents', p.mix])
  if (p.noteCount > 1) f.push(['Notes', p.noteCount.toLocaleString('en-AU')])
  if (p.faceValue) f.push(['Combined face value', money(p.faceValue)])
  if (p.noteCount > 1) f.push(['Price per note', money(p.price / p.noteCount)])
  if (isNoteProduct(p)) f.push(['Size and marking', 'Reduced by at least 25%, marked NOT LEGAL TENDER'])
  f.push(['Shipping', 'Free, tracked Australia Post across Australia'])
  if (minOrder) f.push(['Minimum order', `${money(minOrder)} in goods`])
  return f
}

export function categoryFacts(products, minOrder) {
  const prices = products.map((p) => p.price)
  const f = [['Products', String(products.length)], ['Price range', `${money(Math.min(...prices))} to ${money(Math.max(...prices))} AUD`]]
  const sizes = [...new Set(products.filter((p) => p.noteCount > 1).map((p) => p.noteCount))].sort((a, b) => a - b)
  if (sizes.length > 1) f.push(['Pack sizes', `${list(sizes.map((n) => n.toLocaleString('en-AU')))} notes`])
  const fv = products.map((p) => p.faceValue).filter(Boolean)
  if (fv.length) f.push(['Face value per pack', `${money(Math.min(...fv))} to ${money(Math.max(...fv))}`])
  f.push(['Shipping', 'Free, tracked Australia Post across Australia'])
  if (minOrder) f.push(['Minimum order', `${money(minOrder)} in goods`])
  return f
}
