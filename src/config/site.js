// ★ SINGLE SOURCE OF TRUTH ★
// Every domain-bearing file, page, and nav link is generated from this file.
// Never hand-edit generated output (llms.txt, .well-known/*, vercel.json) — edit here and rebuild.

export const SITE = {
  target: 'vercel',
  domain: 'thereservenote.com', // ownership/registration not verified — confirm before production deploy
  name: 'Australian Reserve Props',
  tagline: 'Premium Australian Prop Notes for Film, Theatre & Play',
  locale: 'en-AU',
  currency: 'AUD',
  foundingYear: 2024,
  // Never fabricated — fill in when supplied, per CLAUDE.md Rule 5.
  location: '[LOCATION_PENDING]',
  address: '[ADDRESS_PENDING]',
  email: '[EMAIL]',
  phone: '[NUMBER]',
  whatsapp: '[WHATSAPP_NUMBER]',
  abn: '[ABN_PENDING]',
  gstRegistered: null, // null = unknown/pending — do not display a GST claim until this is set
  brandStatement:
    'Australian Reserve Props is an Australia-based novelty currency brand established in 2024, offering compliance-first prop money for film, theatre, content creation, education, and gifting. Australian Reserve Props ships Australia-wide and specialises in Australian-note-styled prop currency across our $20, $50, and $100 denominations. Every note is reproduced under RBA reproduction guidance, clearly marked NOT LEGAL TENDER, and sold for novelty and production use only.',
  orderRules: {
    minOrder: 0,
    freeShippingThreshold: 75,
    flatShippingFee: 9.95,
  },
  sameAs: [], // no real social profiles supplied yet — never invent
}

export const FORMS = {
  provider: 'web3forms',
  web3formsKey: '', // PENDING — until set, forms redirect straight to thank-you; chat is the only live order channel
  contactEmail: SITE.email,
  orderEmail: SITE.email,
  wholesaleEmail: SITE.email,
  turnstileSiteKey: '',
}

export const CHAT = {
  channels: [
    { type: 'whatsapp', value: SITE.whatsapp },
    { type: 'email', value: SITE.email },
  ],
}

// Payment methods — presented neutrally, per the CLAUDE.md compliance rule.
// None carries a differential discount that would steer buyers toward a
// harder-to-reverse rail, and none is marketed on the basis of privacy.
export const PAYMENT_METHODS = [
  {
    id: 'bank-transfer',
    label: 'Bank Transfer (BACS)',
    note: 'Direct bank transfer. Details sent after order confirmation.',
    live: true,
  },
  {
    id: 'payid',
    label: 'PayID',
    note: 'Instant transfer via PayID.',
    live: true,
  },
  {
    id: 'crypto',
    label: 'Cryptocurrency (BTC, USDT, ETH, BNB)',
    note: 'Same price as any other method — no discount is applied for paying in crypto.',
    live: true,
  },
  {
    id: 'card',
    label: 'Card (Stripe / PayPal)',
    note: 'Coming soon — pending payment processor setup.',
    live: false,
  },
]

// Note Palette — one real AUD polymer note colour per denomination.
// Used as CSS custom properties (see globals.css) and referenced by slug below.
export const NOTE_COLORS = {
  five: '#8B3A7A',
  ten: '#1F6FB2',
  twenty: '#D64B2A',
  fifty: '#D9A02A',
  hundred: '#1F7A4D',
  neutral: '#3A342C',
}

export const CATEGORIES = [
  {
    slug: 'twenty-dollar-notes',
    name: '$20 Prop Notes',
    color: 'twenty',
    description:
      'Australian $20-style prop notes, sized for magic tricks, photo props, and mid-range prop budgets.',
  },
  {
    slug: 'fifty-dollar-notes',
    name: '$50 Prop Notes',
    color: 'fifty',
    description:
      'Australian $50-style prop notes, the most requested denomination for film and theatre productions.',
  },
  {
    slug: 'hundred-dollar-notes',
    name: '$100 Prop Notes',
    color: 'hundred',
    description:
      'Australian $100-style prop notes for briefcase scenes, high-stakes narratives, and premium-looking stacks.',
  },
  {
    slug: 'vintage-series-notes',
    name: 'Vintage & Legacy Series',
    color: 'fifty',
    description:
      'Older-style Australian note designs for period productions, sourced from the same design pattern competitors like Prop Money Inc. use for their Vintage and Legacy Series lines.',
  },
  {
    slug: 'packs-bundles',
    name: 'Packs & Bundles',
    color: 'neutral',
    description:
      'Mixed-denomination and bulk packs for productions and events needing more than a single note type.',
  },
  {
    slug: 'briefcases-bags',
    name: 'Briefcases & Bags',
    color: 'neutral',
    description:
      'Note stacks pre-packed into a briefcase or duffel bag for reveal scenes — a staple category at every major competitor we researched.',
  },
  {
    slug: 'confetti-party-favors',
    name: 'Confetti & Party Favors',
    color: 'twenty',
    description: 'Money-print confetti, shredded cash, and money leis for parties, celebrations, and events.',
  },
  {
    slug: 'display-collectibles',
    name: 'Display & Collectibles',
    color: 'hundred',
    description: 'Framed and cased display pieces for collectors, offices, and set dressing.',
  },
  {
    slug: 'personalised-novelty',
    name: 'Personalised & Novelty',
    color: 'ten',
    description: 'Personalised photo notes and novelty big cheques for gag gifts and presentations — never a real financial instrument.',
  },
  {
    slug: 'kids-play-money',
    name: 'Kids Play Money',
    color: 'ten',
    description:
      'Educational Australian-style play money for classrooms, pretend play, and teaching kids to count currency.',
  },
  {
    slug: 'gift-sets',
    name: 'Gift Sets',
    color: 'fifty',
    description: 'Novelty money gift boxes for birthdays, graduations, and gag gifts.',
  },
  {
    slug: 'accessories',
    name: 'Accessories',
    color: 'neutral',
    description: 'Money guns, refill packs, and display cases to go with your prop notes.',
  },
]

// Keyword targeting per category, sourced from the Semrush AU exports in
// `keywords export cluster/` (see docs/keyword-assignments.md for the full
// sourced numbers). `verified: true` = real Semrush AU volume/KD backs this
// set. `verified: false` = no data was exported for this cluster (briefcases,
// confetti, display, personalised) — candidate terms only, same caveat as
// the rest of docs/keyword-map.md. Products inherit their category's set,
// since search demand was researched per-category, not per-SKU.
export const CATEGORY_KEYWORDS = {
  'twenty-dollar-notes': {
    verified: true,
    primary: 'australian 20 dollar bill',
    supporting: ['aus $20 note', '$20 note australian', '$20 aus note', 'australian $20 note', '$20 notes'],
  },
  'fifty-dollar-notes': {
    verified: true,
    primary: '50 dollar note australia',
    supporting: ['50 dollar bill australia', '$50 note', 'australian $50 note', 'australian 50 dollar bill', '50 dollar australian note'],
  },
  'hundred-dollar-notes': {
    verified: true,
    primary: '100 dollar note australia',
    supporting: ['australian 100 dollar note', '$100 note', 'aus 100 dollar note', 'australian 100 dollar banknote', 'australian $100 note'],
  },
  'vintage-series-notes': {
    verified: true,
    primary: 'australian old notes',
    supporting: ['old $20 note australia', 'old 20 dollar note australia', 'old notes australia', 'australian dollar old notes', 'australian gold notes'],
  },
  'packs-bundles': {
    verified: true,
    primary: 'au prop money',
    supporting: ['prop money', 'fake money australia', 'realistic fake money australia', 'bulk fake money', 'prop money australia'],
  },
  'briefcases-bags': {
    verified: false,
    primary: 'prop money briefcase',
    supporting: ['prop money briefcase australia', 'money briefcase prop', 'duffel bag prop money', 'briefcase full of fake money', 'money bag prop for film'],
  },
  'confetti-party-favors': {
    verified: true,
    primary: 'money lei',
    supporting: ['graduation money lei', 'cash lei', 'graduation lei australia', 'leis with money', 'money confetti australia'],
  },
  'display-collectibles': {
    verified: false,
    primary: 'prop money display frame',
    supporting: ['framed prop money australia', 'prop money collector case', 'limited edition prop money australia', 'money display case australia', 'office display prop money'],
  },
  'personalised-novelty': {
    verified: false,
    primary: 'personalised prop money',
    supporting: ['personalised photo money note', 'custom prop money gift', 'novelty big cheque australia', 'giant cheque prop', 'personalised novelty cheque'],
  },
  'kids-play-money': {
    verified: true,
    primary: 'australian play money',
    supporting: ['play money australia', 'australian play money printable', 'printable australian play money', 'play money printable australia', 'print off play money'],
  },
  'gift-sets': {
    verified: true,
    primary: 'graduation money lei',
    supporting: ['graduation lei australia', 'leis with money', 'diy graduation money gift ideas', 'novelty money gift box australia', 'birthday money gift australia'],
  },
  accessories: {
    verified: true,
    primary: 'money gun',
    supporting: ['money guns', 'money gun tiktok', 'toy money gun', 'fake money gun machine', 'cheap money gun'],
  },
}

export const CATEGORY_FAQS = {
  'twenty-dollar-notes': [
    { q: 'How big is a prop $20 note compared to a real one?', a: 'Reproduced to differ from a genuine Australian $20 note by at least 25% in size, per RBA reproduction guidance, and clearly marked NOT LEGAL TENDER.' },
    { q: "What's a $20 prop note stack good for?", a: 'Sized for magic tricks, photo props, and mid-range prop budgets — a common denomination for close-up work.' },
    { q: 'Can I get an aged look on $20 notes?', a: 'Yes — every stack offers Standard Clean, Light Circulation, or Heavy Circulation at checkout.' },
  ],
  'fifty-dollar-notes': [
    { q: 'Why is $50 the most requested denomination?', a: "It's the most requested by film and theatre productions for wallet, register, and handoff scenes — visually substantial without needing a huge stack." },
    { q: 'Is the $50 prop note the same size as a real one?', a: 'No — reproduced to differ by at least 25% in size, per RBA guidance, and marked NOT LEGAL TENDER.' },
    { q: 'What pack sizes are available?', a: 'Half Pack (50 notes), Stack (100 notes), and Jumbo Pack (250 notes).' },
  ],
  'hundred-dollar-notes': [
    { q: "What's the $100 stack used for?", a: 'Briefcase reveals, high-stakes narrative scenes, and premium-looking stacks where scale matters.' },
    { q: 'How many notes come in a $100 Jumbo Pack?', a: '250 notes, $25,000 in combined face value.' },
    { q: 'Is it legal to reproduce a $100 note design?', a: 'Yes, provided it differs in size by at least 25%, carries no replicated security features, and is clearly marked NOT LEGAL TENDER — see our FAQ page for the full legal explanation.' },
  ],
  'vintage-series-notes': [
    { q: 'What’s different about the Vintage & Legacy Series?', a: 'An older-style Australian note design, useful for period productions set before the current note series.' },
    { q: 'Can I mix vintage and current-series notes in one order?', a: 'Yes — order any combination of Vintage and standard denomination products together.' },
    { q: 'Are vintage notes compliant the same way?', a: 'Yes, the same 25% size-difference and NOT LEGAL TENDER marking applies.' },
  ],
  'packs-bundles': [
    { q: "What's the difference between the Starter Pack and Bulk Production Pack?", a: 'The Starter Pack mixes all three denominations for a first order; the Bulk Production Pack is a much larger mixed-denomination volume built for productions needing multiple scenes.' },
    { q: 'Do pack prices reflect the printed face value?', a: 'No — pricing reflects production cost, not face value, the same convention used across the industry.' },
    { q: 'Can I request a custom mix of denominations?', a: 'For volumes beyond our standard packs, use the Wholesale enquiry form.' },
  ],
  'briefcases-bags': [
    { q: 'Does the briefcase or bag come with the notes already inside?', a: 'Yes — each set is pre-packed with the stated face value of $100-style notes ready for a reveal shot.' },
    { q: "What's the difference between the briefcase and duffel bag sets?", a: 'Face value and case style — briefcases suit $50,000-$250,000 reveals, the duffel bag set scales to $500,000 for larger scenes.' },
    { q: 'Can I buy the case without notes, or notes without a case?', a: 'Currently these are sold as complete sets; contact us for a custom configuration.' },
  ],
  'confetti-party-favors': [
    { q: 'Is money confetti reusable?', a: 'No — confetti and shredded cash are single-use party items.' },
    { q: "What's a money lei used for?", a: 'A folded-note necklace, popular as a graduation or celebration gift in Australia.' },
    { q: 'Are these items marked as novelty items?', a: 'Yes — the same NOT LEGAL TENDER marking and RBA-compliant sizing applies to any note-printed material, including leis and confetti.' },
  ],
  'display-collectibles': [
    { q: 'Can the display frame be hung on a wall?', a: "Yes — it's glass-fronted and designed for office or set-dressing display." },
    { q: 'What makes the Collector Case "limited edition"?', a: 'Each case is individually numbered.' },
    { q: 'Does the Prop Money Counter actually count notes?', a: "No — it's a non-functional display prop for set dressing behind cash-counting scenes." },
  ],
  'personalised-novelty': [
    { q: 'Whose photo can I put on a Personalised Photo Prop Note?', a: "Any photo you supply, for gifting or novelty purposes — it's a gag gift, not a reproduction of a real individual on legal tender." },
    { q: 'Is the Novelty Big Cheque a real, bankable cheque?', a: 'No — it’s a novelty presentation piece only and cannot be deposited or cashed.' },
    { q: 'Can I choose my own message and amount on the cheque?', a: 'Yes — both are fully customisable at checkout.' },
  ],
  'kids-play-money': [
    { q: 'Is play money safe for young children?', a: "It's paper-based novelty currency, not a real financial product — supervise use with very young children as with any small paper item." },
    { q: 'Is play money to scale with real Australian currency?', a: 'No — it’s designed for recognisability and counting practice, not as a size-accurate reproduction.' },
    { q: 'Do you offer enough for a whole classroom?', a: 'Yes — the Classroom Play Money Bulk Pack is sized for 30 students.' },
  ],
  'gift-sets': [
    { q: 'Are gift sets suitable for teenagers and adults?', a: 'Yes — birthday and graduation sets are designed as novelty cash gifts for any age.' },
    { q: 'Can I add a card or message to a gift set?', a: "Not currently included — add your own card alongside the gift." },
    { q: 'Do gift sets ship gift-wrapped?', a: "They arrive boxed; gift wrapping isn't currently offered as an add-on." },
  ],
  accessories: [
    { q: 'What denomination does the Money Gun Refill Pack use?', a: '$50-style prop notes, sized for standard money guns.' },
    { q: 'Does the Money Gun come with notes included?', a: "No — it's sold separately from refill packs." },
    { q: 'What does the acrylic display case fit?', a: "A single stack or a small mixed set; it's sold empty." },
  ],
}

export const CIRCULATION_OPTIONS = [
  { id: 'clean', label: 'Standard Clean', desc: 'Fresh from print, crisp and flat', price: 0 },
  { id: 'light', label: 'Light Circulation', desc: 'Mild creases, lightly handled look', price: 5 },
  { id: 'heavy', label: 'Heavy Circulation', desc: 'Simulated dirt, creases, frayed corners', price: 10 },
]

export const PACKAGING_OPTIONS = [
  { id: 'band', label: 'Standard Paper Band', price: 0 },
  { id: 'classic-band', label: 'Classic Currency Band', price: 0 },
  { id: 'loose', label: 'Loose Notes', price: 0 },
]

const disclaimer =
  'Reproduced at a size that differs from genuine Australian currency by at least 25%, per RBA reproduction guidance. Clearly marked NOT LEGAL TENDER on every note, with no replicated banknote security features. For film, theatre, education, and novelty use only.'

const chequeDisclaimer =
  'A novelty presentation piece only — not a real, negotiable cheque and cannot be deposited or cashed.'

export const PRODUCTS = [
  {
    slug: 'twenty-dollar-prop-note-stack',
    name: '$20 AUD Prop Note Stack',
    category: 'twenty-dollar-notes',
    price: 24.95,
    faceValueLabel: '$2,000 face value per stack',
    badge: null,
    tags: ['twenty-dollar-prop-note', 'novelty-currency', 'not-legal-tender', 'magic-trick-money'],
    circulationOptions: true,
    customSerials: false,
    description: `A stack of 100 Australian $20-style prop notes, sized and weighted for magic tricks and sleight-of-hand routines as well as general photo props. ${disclaimer}`,
    images: ['twenty-dollar-prop-note-stack.webp'],
  },
  {
    slug: 'fifty-dollar-prop-note-stack',
    name: '$50 AUD Prop Note Stack',
    category: 'fifty-dollar-notes',
    price: 27.95,
    faceValueLabel: '$5,000 face value per stack',
    badge: 'Most Requested',
    tags: ['fifty-dollar-prop-note', 'novelty-currency', 'not-legal-tender', 'film-prop-money'],
    circulationOptions: true,
    customSerials: false,
    description: `A stack of 100 Australian $50-style prop notes — the denomination most often requested by film and theatre productions for wallet, register, and handoff scenes. ${disclaimer}`,
    images: ['fifty-dollar-prop-note-stack.webp'],
  },
  {
    slug: 'hundred-dollar-prop-note-stack',
    name: '$100 AUD Prop Note Stack',
    category: 'hundred-dollar-notes',
    price: 29.95,
    faceValueLabel: '$10,000 face value per stack',
    badge: 'Best Seller',
    tags: ['hundred-dollar-prop-note', 'novelty-currency', 'not-legal-tender', 'film-prop-money'],
    circulationOptions: true,
    customSerials: false,
    description: `A stack of 100 Australian $100-style prop notes, built for briefcase reveals and high-value scenes where the stack needs to look substantial on camera. ${disclaimer}`,
    images: ['hundred-dollar-prop-note-stack.webp'],
  },
  {
    slug: 'mixed-denomination-starter-pack',
    name: 'Mixed Denomination Starter Pack',
    category: 'packs-bundles',
    price: 34.95,
    faceValueLabel: 'Approx. $3,000 mixed face value',
    badge: null,
    tags: ['mixed-denomination-pack', 'novelty-currency', 'not-legal-tender', 'gift-money-set'],
    circulationOptions: true,
    customSerials: false,
    description: `A mixed pack spanning our $20, $50, and $100 denominations, sized for a first order or a scene that needs visual variety rather than a single note type. ${disclaimer}`,
    images: ['mixed-denomination-starter-pack.webp'],
  },
  {
    slug: 'bulk-production-pack',
    name: 'Bulk Production Pack',
    category: 'packs-bundles',
    price: 89.95,
    faceValueLabel: 'Approx. $50,000 mixed face value',
    badge: 'For Productions',
    tags: ['bulk-production-pack', 'film-prop-money', 'theatre-stage-money', 'not-legal-tender'],
    circulationOptions: true,
    customSerials: false,
    description: `A large mixed-denomination pack built for film, TV, and theatre productions needing volume across multiple scenes. Wholesale pricing available on request. ${disclaimer}`,
    images: ['bulk-production-pack.webp'],
  },
  {
    slug: 'kids-play-money-educational-set',
    name: 'Kids Play Money Educational Set',
    category: 'kids-play-money',
    price: 19.95,
    faceValueLabel: 'Play money — not scaled to represent real value',
    badge: 'Classroom Friendly',
    tags: ['kids-play-money', 'educational-play-money', 'not-legal-tender', 'australian-reserve-props'],
    circulationOptions: false,
    customSerials: false,
    description:
      'An Australian-currency-styled play money set for classrooms and pretend play, designed to help kids learn to count and recognise note values. Clearly marked as play money and not legal tender.',
    images: ['kids-play-money-educational-set.webp'],
  },
  {
    slug: 'prop-money-gift-box-set',
    name: 'Prop Money Gift Box Set',
    category: 'gift-sets',
    price: 39.95,
    faceValueLabel: 'Approx. $5,000 mixed face value, gift-boxed',
    badge: 'Gift Ready',
    tags: ['gift-money-set', 'mixed-denomination-pack', 'novelty-currency', 'australian-reserve-props'],
    circulationOptions: true,
    customSerials: false,
    description: `A mixed-denomination stack presented in a gift box, aimed at birthdays, graduations, and gag gifts rather than production use. ${disclaimer}`,
    images: ['prop-money-gift-box-set.webp'],
  },
  {
    slug: 'money-gun-refill-pack',
    name: 'Money Gun Refill Pack ($50 Notes)',
    category: 'accessories',
    price: 16.95,
    faceValueLabel: '$2,500 face value per refill',
    badge: null,
    tags: ['money-gun-refill', 'fifty-dollar-prop-note', 'party-prank-money', 'not-legal-tender'],
    circulationOptions: false,
    customSerials: false,
    description: `A refill pack of $50-style prop notes sized for standard money guns, for parties and events. ${disclaimer}`,
    images: ['money-gun-refill-pack.webp'],
  },

  // --- Denomination half packs & jumbo packs ---
  {
    slug: 'twenty-dollar-half-pack', name: '$20 AUD Prop Note Half Pack', category: 'twenty-dollar-notes', price: 16.95,
    faceValueLabel: '$1,000 face value per pack (50 notes)', badge: null,
    tags: ['twenty-dollar-prop-note', 'novelty-currency', 'not-legal-tender', 'magic-trick-money'],
    circulationOptions: true, customSerials: false,
    description: `A 50-note pack of $20-style prop notes, a common size for magic routines and photo props. ${disclaimer}`,
    images: ['twenty-dollar-half-pack.webp'],
  },
  {
    slug: 'twenty-dollar-jumbo-pack', name: '$20 AUD Prop Note Jumbo Pack', category: 'twenty-dollar-notes', price: 49.95,
    faceValueLabel: '$5,000 face value per pack (250 notes)', badge: null,
    tags: ['twenty-dollar-prop-note', 'bulk-production-pack', 'not-legal-tender', 'magic-trick-money'],
    circulationOptions: true, customSerials: false,
    description: `A 250-note bulk pack of $20-style prop notes for larger magic acts or multi-scene productions. ${disclaimer}`,
    images: ['twenty-dollar-jumbo-pack.webp'],
  },
  {
    slug: 'fifty-dollar-half-pack', name: '$50 AUD Prop Note Half Pack', category: 'fifty-dollar-notes', price: 18.95,
    faceValueLabel: '$2,500 face value per pack (50 notes)', badge: null,
    tags: ['fifty-dollar-prop-note', 'novelty-currency', 'not-legal-tender', 'film-prop-money'],
    circulationOptions: true, customSerials: false,
    description: `A 50-note pack of $50-style prop notes for a single scene needing a mid-size stack. ${disclaimer}`,
    images: ['fifty-dollar-half-pack.webp'],
  },
  {
    slug: 'fifty-dollar-jumbo-pack', name: '$50 AUD Prop Note Jumbo Pack', category: 'fifty-dollar-notes', price: 54.95,
    faceValueLabel: '$12,500 face value per pack (250 notes)', badge: null,
    tags: ['fifty-dollar-prop-note', 'bulk-production-pack', 'not-legal-tender', 'film-prop-money'],
    circulationOptions: true, customSerials: false,
    description: `A 250-note bulk pack of $50-style prop notes, our most-requested denomination for production runs. ${disclaimer}`,
    images: ['fifty-dollar-jumbo-pack.webp'],
  },
  {
    slug: 'hundred-dollar-half-pack', name: '$100 AUD Prop Note Half Pack', category: 'hundred-dollar-notes', price: 19.95,
    faceValueLabel: '$5,000 face value per pack (50 notes)', badge: null,
    tags: ['hundred-dollar-prop-note', 'novelty-currency', 'not-legal-tender', 'film-prop-money'],
    circulationOptions: true, customSerials: false,
    description: `A 50-note pack of $100-style prop notes for a single briefcase or safe scene. ${disclaimer}`,
    images: ['hundred-dollar-half-pack.webp'],
  },
  {
    slug: 'hundred-dollar-jumbo-pack', name: '$100 AUD Prop Note Jumbo Pack', category: 'hundred-dollar-notes', price: 59.95,
    faceValueLabel: '$25,000 face value per pack (250 notes)', badge: null,
    tags: ['hundred-dollar-prop-note', 'bulk-production-pack', 'not-legal-tender', 'film-prop-money'],
    circulationOptions: true, customSerials: false,
    description: `A 250-note bulk pack of $100-style prop notes for large-scale briefcase or vault scenes. ${disclaimer}`,
    images: ['hundred-dollar-jumbo-pack.webp'],
  },

  // --- Vintage & Legacy Series ---
  {
    slug: 'vintage-twenty-note-stack', name: 'Vintage $20 Note Stack', category: 'vintage-series-notes', price: 27.95,
    faceValueLabel: '$2,000 face value per stack (older design)', badge: null,
    tags: ['vintage-prop-note', 'twenty-dollar-prop-note', 'not-legal-tender', 'theatre-stage-money'],
    circulationOptions: true, customSerials: false,
    description: `An older-style $20 note design for period pieces and productions set before the current note series. ${disclaimer}`,
    images: ['vintage-twenty-note-stack.webp'],
  },
  {
    slug: 'vintage-fifty-note-stack', name: 'Vintage $50 Note Stack', category: 'vintage-series-notes', price: 31.95,
    faceValueLabel: '$5,000 face value per stack (older design)', badge: null,
    tags: ['vintage-prop-note', 'fifty-dollar-prop-note', 'not-legal-tender', 'theatre-stage-money'],
    circulationOptions: true, customSerials: false,
    description: `An older-style $50 note design, useful anywhere a production needs to signal an earlier decade. ${disclaimer}`,
    images: ['vintage-fifty-note-stack.webp'],
  },
  {
    slug: 'vintage-hundred-note-stack', name: 'Vintage $100 Note Stack', category: 'vintage-series-notes', price: 34.95,
    faceValueLabel: '$10,000 face value per stack (older design)', badge: null,
    tags: ['vintage-prop-note', 'hundred-dollar-prop-note', 'not-legal-tender', 'theatre-stage-money'],
    circulationOptions: true, customSerials: false,
    description: `An older-style $100 note design for period dramas and heritage-set productions. ${disclaimer}`,
    images: ['vintage-hundred-note-stack.webp'],
  },

  // --- Packs & Bundles additions ---
  {
    slug: 'wedding-event-pack', name: 'Wedding & Event Pack', category: 'packs-bundles', price: 44.95,
    faceValueLabel: 'Approx. $3,500 mixed face value', badge: null,
    tags: ['mixed-denomination-pack', 'gift-money-set', 'not-legal-tender', 'novelty-currency'],
    circulationOptions: true, customSerials: false,
    description: `A mixed-denomination pack sized for wedding money-dance traditions and event decor. ${disclaimer}`,
    images: ['wedding-event-pack.webp'],
  },
  {
    slug: 'content-creator-flex-pack', name: 'Content Creator Flex Pack', category: 'packs-bundles', price: 37.95,
    faceValueLabel: 'Approx. $4,000 mixed face value', badge: 'Creator Favourite',
    tags: ['content-creator-props', 'mixed-denomination-pack', 'not-legal-tender', 'novelty-currency'],
    circulationOptions: true, customSerials: false,
    description: `A mixed pack of larger denominations built for "flex" style content and unboxing videos. ${disclaimer}`,
    images: ['content-creator-flex-pack.webp'],
  },

  // --- Briefcases & Bags ---
  {
    slug: 'briefcase-prop-set-50k', name: 'Briefcase Prop Set — $50,000', category: 'briefcases-bags', price: 129.0,
    faceValueLabel: '$50,000 face value, packed in a prop briefcase', badge: null,
    tags: ['briefcase-prop-set', 'film-prop-money', 'hundred-dollar-prop-note', 'not-legal-tender'],
    circulationOptions: true, customSerials: false,
    description: `Ten $100-style stacks pre-packed into a prop briefcase for a ready-to-shoot reveal scene. ${disclaimer}`,
    images: ['briefcase-prop-set-50k.webp'],
  },
  {
    slug: 'briefcase-prop-set-250k', name: 'Briefcase Prop Set — $250,000', category: 'briefcases-bags', price: 179.0,
    faceValueLabel: '$250,000 face value, packed in a prop briefcase', badge: 'For Productions',
    tags: ['briefcase-prop-set', 'bulk-production-pack', 'hundred-dollar-prop-note', 'not-legal-tender'],
    circulationOptions: true, customSerials: false,
    description: `Fifty $100-style stacks pre-packed into a prop briefcase for high-stakes reveal or ransom-scene budgets. ${disclaimer}`,
    images: ['briefcase-prop-set-250k.webp'],
  },
  {
    slug: 'duffel-bag-prop-set-500k', name: 'Duffel Bag Prop Set — $500,000', category: 'briefcases-bags', price: 229.0,
    faceValueLabel: '$500,000 face value, packed in a prop duffel bag', badge: 'For Productions',
    tags: ['duffel-bag-prop', 'bulk-production-pack', 'hundred-dollar-prop-note', 'not-legal-tender'],
    circulationOptions: true, customSerials: false,
    description: `A hundred $100-style stacks pre-packed into a prop duffel bag for large-scale heist or transport scenes. ${disclaimer}`,
    images: ['duffel-bag-prop-set-500k.webp'],
  },

  // --- Confetti & Party Favors ---
  {
    slug: 'money-confetti-pack', name: 'Money Confetti Pack', category: 'confetti-party-favors', price: 9.95,
    faceValueLabel: '200g pack', badge: null,
    tags: ['money-confetti', 'party-prank-money', 'not-legal-tender', 'novelty-currency'],
    circulationOptions: false, customSerials: false,
    description: `Money-print confetti for celebrations, photo shoots, and content creation. ${disclaimer}`,
    images: ['money-confetti-pack.webp'],
  },
  {
    slug: 'shredded-cash-bag', name: 'Shredded Cash Bag', category: 'confetti-party-favors', price: 16.95,
    faceValueLabel: '500g bag', badge: null,
    tags: ['shredded-cash', 'party-prank-money', 'not-legal-tender', 'content-creator-props'],
    circulationOptions: false, customSerials: false,
    description: `A bag of shredded money-print paper for "money rain" shots and party dressing. ${disclaimer}`,
    images: ['shredded-cash-bag.webp'],
  },
  {
    slug: 'money-lei-single', name: 'Money Lei (Single)', category: 'confetti-party-favors', price: 12.95,
    faceValueLabel: 'One lei, folded from prop notes', badge: null,
    tags: ['money-lei', 'gift-money-set', 'not-legal-tender', 'novelty-currency'],
    circulationOptions: false, customSerials: false,
    description: `A single money lei folded from prop notes, a popular gift for graduations and celebrations. ${disclaimer}`,
    images: ['money-lei-single.webp'],
  },
  {
    slug: 'money-lei-three-pack', name: 'Money Lei 3-Pack', category: 'confetti-party-favors', price: 29.95,
    faceValueLabel: 'Three leis, folded from prop notes', badge: 'Gift Ready',
    tags: ['money-lei', 'gift-money-set', 'not-legal-tender', 'novelty-currency'],
    circulationOptions: false, customSerials: false,
    description: `Three money leis for graduation parties or wedding parties needing more than one. ${disclaimer}`,
    images: ['money-lei-three-pack.webp'],
  },

  // --- Display & Collectibles ---
  {
    slug: 'denomination-display-frame', name: 'Complete Denomination Display Frame', category: 'display-collectibles', price: 89.0,
    faceValueLabel: 'One note from each of our three denominations, framed', badge: null,
    tags: ['display-collectible', 'australian-reserve-props', 'not-legal-tender', 'novelty-currency'],
    circulationOptions: false, customSerials: false,
    description: `A framed set of our three Australian denominations, glass-fronted for office or set-dressing display. ${disclaimer}`,
    images: ['denomination-display-frame.webp'],
  },
  {
    slug: 'limited-edition-collector-case', name: 'Limited Edition Collector Case', category: 'display-collectibles', price: 149.0,
    faceValueLabel: 'Numbered case, full note set', badge: 'Limited',
    tags: ['limited-edition-prop', 'display-collectible', 'not-legal-tender', 'australian-reserve-props'],
    circulationOptions: false, customSerials: false,
    description: `A numbered, glass-cased collector set for buyers wanting a display piece rather than a working prop pack. ${disclaimer}`,
    images: ['limited-edition-collector-case.webp'],
  },
  {
    slug: 'prop-money-counter-display', name: 'Prop Money Counter (Display Only)', category: 'display-collectibles', price: 69.0,
    faceValueLabel: 'Non-functional display prop', badge: null,
    tags: ['display-case-accessory', 'film-prop-money', 'theatre-stage-money', 'production-pack'],
    circulationOptions: false, customSerials: false,
    description: 'A non-functional money-counter prop for set dressing behind cash-counting scenes — it does not actually count notes.',
    images: ['prop-money-counter-display.webp'],
  },

  // --- Personalised & Novelty ---
  {
    slug: 'personalised-photo-prop-note-pack', name: 'Personalised Photo Prop Note Pack', category: 'personalised-novelty', price: 34.95,
    faceValueLabel: '20 notes printed with your supplied photo', badge: null,
    tags: ['personalised-prop-note', 'gift-money-set', 'not-legal-tender', 'novelty-currency'],
    circulationOptions: false, customSerials: false,
    description: `A pack of 20 novelty notes printed with a photo you supply — a gag gift, not a currency reproduction of any real individual's likeness on legal tender. ${disclaimer}`,
    images: ['personalised-photo-prop-note-pack.webp'],
  },
  {
    slug: 'personalised-novelty-big-cheque', name: 'Personalised Novelty Big Cheque', category: 'personalised-novelty', price: 39.95,
    faceValueLabel: 'Large-format presentation cheque, custom text', badge: null,
    tags: ['novelty-cheque', 'gift-money-set', 'not-legal-tender'],
    circulationOptions: false, customSerials: false,
    description: `An oversized novelty cheque with your own text and amount, made for prize-giving photos and presentations. ${chequeDisclaimer}`,
    images: ['personalised-novelty-big-cheque.webp'],
  },
  {
    slug: 'custom-message-prop-note-gift-pack', name: 'Custom Message Prop Note Gift Pack', category: 'personalised-novelty', price: 32.95,
    faceValueLabel: '10 notes with a custom printed message', badge: null,
    tags: ['personalised-prop-note', 'gift-money-set', 'not-legal-tender', 'novelty-currency'],
    circulationOptions: false, customSerials: false,
    description: `Ten novelty notes carrying a custom printed message of your choice — for gifting, not for use as currency. ${disclaimer}`,
    images: ['custom-message-prop-note-gift-pack.webp'],
  },

  // --- Kids Play Money additions ---
  {
    slug: 'classroom-play-money-bulk-pack', name: 'Classroom Play Money Bulk Pack', category: 'kids-play-money', price: 59.95,
    faceValueLabel: 'Enough play money for 30 students', badge: 'Classroom Friendly',
    tags: ['classroom-play-money', 'educational-play-money', 'not-legal-tender', 'kids-play-money'],
    circulationOptions: false, customSerials: false,
    description: 'A bulk play money pack sized for a full classroom, so every student gets their own counting set.',
    images: ['classroom-play-money-bulk-pack.webp'],
  },

  // --- Gift Sets additions ---
  {
    slug: 'birthday-money-gift-box', name: 'Birthday Money Gift Box', category: 'gift-sets', price: 29.95,
    faceValueLabel: 'Approx. $2,500 mixed face value, gift-boxed', badge: null,
    tags: ['gift-money-set', 'party-prank-money', 'not-legal-tender', 'novelty-currency'],
    circulationOptions: true, customSerials: false,
    description: `A birthday-themed gift box of mixed prop notes for a novelty cash gift. ${disclaimer}`,
    images: ['birthday-money-gift-box.webp'],
  },
  {
    slug: 'graduation-money-gift-set', name: 'Graduation Money Gift Set', category: 'gift-sets', price: 34.95,
    faceValueLabel: 'Approx. $3,000 mixed face value, gift-boxed', badge: null,
    tags: ['gift-money-set', 'money-lei', 'not-legal-tender', 'novelty-currency'],
    circulationOptions: true, customSerials: false,
    description: `A graduation-themed gift set pairing mixed prop notes with a money lei. ${disclaimer}`,
    images: ['graduation-money-gift-set.webp'],
  },

  // --- Accessories additions ---
  {
    slug: 'money-gun-device', name: 'Money Gun (Device, Refillable)', category: 'accessories', price: 24.95,
    faceValueLabel: 'Reusable device — refills sold separately', badge: null,
    tags: ['money-gun-device', 'party-prank-money', 'production-pack'],
    circulationOptions: false, customSerials: false,
    description: 'A refillable money gun for parties and content creation — compatible with our note-sized refill packs.',
    images: ['money-gun-device.webp'],
  },
  {
    slug: 'prop-money-display-case', name: 'Prop Money Display Case (Acrylic)', category: 'accessories', price: 27.95,
    faceValueLabel: 'Holds one stack or a small mixed set', badge: null,
    tags: ['display-case-accessory', 'display-collectible', 'australian-reserve-props'],
    circulationOptions: false, customSerials: false,
    description: 'A clear acrylic case for displaying a single stack or small mixed set, sold empty.',
    images: ['prop-money-display-case.webp'],
  },
  {
    slug: 'currency-bands-pack-50', name: 'Currency Bands (Pack of 50)', category: 'accessories', price: 6.95,
    faceValueLabel: '50 paper bands, sold separately from notes', badge: null,
    tags: ['currency-band-accessory', 'production-pack'],
    circulationOptions: false, customSerials: false,
    description: 'Fifty currency-style paper bands for rebanding loose notes or building your own custom stacks.',
    images: ['currency-bands-pack-50.webp'],
  },
]

export const FAQS = [
  {
    q: 'Is prop money legal in Australia?',
    a: 'Yes. Reproducing Australian banknote designs is legal under the Crimes (Currency) Act 1981 provided the reproduction differs in size from genuine currency by at least 25%, is printed one-sided or otherwise clearly non-genuine, and is marked as not legal tender — the RBA publishes reproduction guidelines covering exactly this. Every note we sell is produced to meet these requirements.',
  },
  {
    q: 'Can prop money be used as real currency?',
    a: 'No. Every note is clearly marked NOT LEGAL TENDER, is a different size to genuine Australian currency, and does not replicate banknote security features. It is sold for film, theatre, education, and novelty use only.',
  },
  {
    q: 'Do you offer custom serial numbers?',
    a: 'No. Serial numbers are system-assigned placeholders on every note — we do not offer buyer-specified serial numbers.',
  },
  {
    q: 'What payment methods do you accept?',
    a: 'Bank transfer (BACS), PayID, and cryptocurrency (BTC, USDT, ETH, BNB) are live now. Card payment via Stripe or PayPal is planned once processor setup is complete.',
  },
  {
    q: 'How fast is delivery within Australia?',
    a: 'We ship Australia-wide via Australia Post with tracking. We currently ship domestically only.',
  },
  {
    q: 'Can I get an aged or "circulated" look for a film scene?',
    a: 'Most products offer a circulation-level option (Standard Clean, Light Circulation, or Heavy Circulation) for productions wanting a used, realistic look on camera.',
  },
]

// Recovered from the predecessor site, client-confirmed genuine. Published as
// supplied — 16 reviews, not padded to any target count.
export const REVIEWS = [
  {
    name: 'James Whitfield',
    date: '2024-03-14',
    rating: 5,
    text: 'Absolutely convincing on stage. Ordered for our school play and the audience had no idea. Fast delivery too!',
  },
  {
    name: 'Sophie Brennan',
    date: '2024-06-02',
    rating: 4,
    text: "I ordered three bundles of assorted denominations for a crime thriller we were staging in Sydney. The notes looked genuinely convincing under both warm and cool stage lighting. The texture isn't quite like real currency but from two metres away nobody can tell the difference. Packaging was neat and discreet. Would recommend to any local theatre group on a tight budget.",
  },
  {
    name: 'Marcus Delroy',
    date: '2024-07-19',
    rating: 5,
    text: "I've been a props coordinator for amateur and semi-professional theatre productions across Victoria for nearly eight years, and sourcing quality prop money locally has always been a challenge. Most suppliers either send you obviously fake novelty notes or charge ridiculous prices for anything remotely convincing. This order genuinely surprised me. The notes arrived well-packaged, sorted by denomination, and the print quality was noticeably better than what I'd ordered from other Australian suppliers in the past. Under our LED stage rig, the $50 and $100 notes passed a double-take test easily. We used them in a tense hostage negotiation scene and the realism added a lot to the production value. I ordered five bundles totalling around $50,000 in face value across mixed denominations. Everything arrived intact with no smudging or misprints. The paper stock is slightly lighter than real Australian polymer notes but holds its shape well and doesn't crinkle noisily during handling — which matters a lot in live theatre. One thing I appreciated is that each note is clearly marked as a prop on the reverse side, which keeps everything legally compliant. Delivery to regional Victoria took five business days. I'll absolutely be making this my go-to supplier for future productions.",
  },
  {
    name: 'Priya Nanthakumar',
    date: '2024-08-05',
    rating: 4,
    text: 'Great quality for the price. Used in a music video shoot in Melbourne — looked perfect on camera.',
  },
  {
    name: "Liam O'Connell",
    date: '2024-09-23',
    rating: 5,
    text: "We used these for a corporate team-building event where participants had to 'negotiate deals' using fake cash. The prop notes were a hit — everyone got into character immediately. The only minor issue was that a few notes had slightly smudged printing on the edges, but nothing that affected the experience. Customer service was responsive when I raised it. Good Australian seller, fast shipping.",
  },
  {
    name: 'Zara Hutchinson',
    date: '2024-10-11',
    rating: 5,
    text: "As a filmmaker based in Perth, I'm constantly sourcing props on a tight budget, and prop money is one of those things that can make or break the authenticity of a scene. I've tried printing my own in the past — it never looks right and the process is time-consuming. I've also ordered from overseas suppliers and dealt with customs delays and inconsistent quality. This Australian seller solved all of that. I placed an order for $30,000 in mixed denominations for a short crime drama. The turnaround was fast — three business days to my door. The notes themselves are well-printed, with enough detail to look real on camera without triggering any legal concerns. What impressed me most was the consistency across the entire batch. With previous suppliers I'd often find a handful of duds in every bundle — smeared ink, crooked cuts, wrong sizing. None of that here. Every note was clean, correctly sized, and uniform. Would strongly recommend to any Australian filmmaker, YouTuber, or theatre company.",
  },
  {
    name: 'Daniel Ferreira',
    date: '2024-11-30',
    rating: 4,
    text: 'Arrived in two days. Looked realistic enough for our short film. Would buy again.',
  },
  {
    name: 'Amelia Tran',
    date: '2025-01-08',
    rating: 5,
    text: "Purchased for a student film at AFTRS. The notes photographed beautifully and held up well under the lighting rig. We needed a large stack for a briefcase scene and it delivered exactly the visual impact we were after. Slightly thinner paper than I expected but honestly, on screen it looks completely convincing. Solid value for a low-budget production.",
  },
  {
    name: 'Brett Cavanagh',
    date: '2025-02-17',
    rating: 5,
    text: "I want to give a thorough review because I wish I'd found more detailed Australian reviews before purchasing, so hopefully this helps someone. I'm a drama teacher at a secondary school in Queensland and I ordered prop money for a Year 11 production of a crime thriller written by one of our students. Budget was tight — as it always is in school productions — so I needed something affordable but convincing enough to hold up under stage lights in a 300-seat auditorium. I ordered two bundles of mixed denominations, roughly $20,000 in face value. The notes are printed clearly on both sides. The Australian-style design is immediately recognisable as 'money' to an audience without being an exact replica of legal tender. The colours are vibrant and the sizing matches real Australian banknotes closely enough that students handling them on stage moved naturally. We had students picking up, dropping, stuffing into bags, and fanning notes across a table repeatedly across five rehearsals and three live shows. Not a single note tore or significantly crumpled. Ordered on a Monday, arrived Thursday. An outstanding product for Australian schools and theatre companies.",
  },
  {
    name: 'Monique Adesanya',
    date: '2025-04-03',
    rating: 4,
    text: 'Decent prop notes but the $100s were slightly off-colour. Still worked fine under stage lighting.',
  },
  {
    name: 'Tyler Nguyen',
    date: '2025-05-21',
    rating: 5,
    text: 'I run a small community theatre in Adelaide and we\'ve used prop money from a few different suppliers over the years. This batch was among the best — the print quality on the polymer-style notes was sharp and consistent across the whole order. Delivery took four business days which was fine. My only wish is that they offered a worn/aged version for period productions. Will definitely order again for our next season.',
  },
  {
    name: 'Rachel Simmons-Park',
    date: '2025-06-14',
    rating: 5,
    text: "I produce and direct independent short films in Sydney, and over the past three years I've spent an embarrassing amount of time trying to solve the prop money problem. Real cash on set creates security headaches. Printed fakes look terrible on a modern camera sensor. Overseas suppliers mean customs delays and quality roulette. This supplier has become my permanent solution. First, the legal side: every note is clearly marked as a prop and not legal tender, which matters when you're filming in public locations or working with council permits. Second, the quality: I've used these notes on three separate productions now, including one that had a scene requiring a close-up of cash being counted by hand. We shot it on a Sony FX3 with a 50mm lens. With basic colour grading the notes looked completely convincing on screen. Third, reliability: I've placed four orders now and every single one has arrived within four business days, correctly packed, with zero quality control issues. Fourth, price: genuinely affordable without sacrificing quality. If you're an Australian filmmaker, content creator, or theatre professional, stop wasting time with alternatives. This is the one.",
  },
  {
    name: 'Omar El-Rashidi',
    date: '2025-07-29',
    rating: 4,
    text: 'Bought these for a hip-hop music video we shot on the Gold Coast. The director wanted stacks of cash in multiple scenes and real money obviously wasn\'t an option. These looked fantastic on a 4K camera with minimal colour grading needed. The $50 denominations were especially convincing. Shipping was quick and the seller included a few extra notes as a bonus. Highly recommend for content creators.',
  },
  {
    name: 'Jessica Langford-Cole',
    date: '2025-09-05',
    rating: 5,
    text: 'Perfect for our comedy sketch. The crew kept joking about retiring. Fast delivery, great quality, zero complaints.',
  },
  {
    name: 'Nathan Blackwood-Harris',
    date: '2025-11-18',
    rating: 4,
    text: "I'm a professional set and props designer with credits across theatre, television, and branded content in Melbourne. Prop money comes up more often than most people would imagine — heist scenes, game show formats, corporate satire, period dramas, music videos. I've sourced from a wide range of suppliers over my career and this product sits at the top of what's available locally. Print quality is excellent for the price point. The detail on both faces of the note is sharp, colours read as Australian currency at a glance, and the design avoids being a direct copy of legal tender. The paper is slightly lighter weight than genuine polymer notes but it photographs and films well, handles repeated use without falling apart, and doesn't crinkle loudly on a live mic. Australian-based, fast shipping, no customs complications. Clearly marked as prop money for full compliance. This is now my default recommendation to other designers and producers in Australia.",
  },
  {
    name: 'Camille Dupont-Murray',
    date: '2026-02-03',
    rating: 5,
    text: 'Solid product. Used in a Brisbane theatre production. Held up through three nights of back-to-back performances without a single torn note. Will be ordering again.',
  },
]

export const POSTS = [
  {
    slug: 'is-prop-money-legal-in-australia',
    title: 'Is Prop Money Legal in Australia? A Straight Answer',
    date: '2026-01-10',
    excerpt:
      'What the Crimes (Currency) Act 1981 and RBA reproduction guidelines actually require, in plain English.',
    body: [
      'Reproducing an Australian banknote design is legal, and has been for as long as film and theatre productions have needed cash props. The Crimes (Currency) Act 1981 and the Reserve Bank of Australia\'s published reproduction guidelines set the rules, and they are more specific than most people expect.',
      'The size rule matters most: a reproduction must differ from the genuine note by at least 25% in linear dimension — either noticeably smaller or noticeably larger, never a 1:1 match. Reproductions should not replicate banknote security features, and clear marking as "NOT LEGAL TENDER" or similar is standard practice across the industry.',
      'Every note we sell at Australian Reserve Props is produced to these requirements: reduced scale, clearly marked as a prop, no replicated security features. It is intended for film, theatre, education, and novelty use — not for passing off as genuine currency, which remains a serious offence regardless of print quality.',
    ],
    tags: ['not-legal-tender', 'novelty-currency'],
  },
  {
    slug: 'prop-money-buying-guide-for-australian-filmmakers',
    title: 'Prop Money Buying Guide for Australian Filmmakers',
    date: '2026-01-24',
    excerpt: 'What to actually check before you order a stack for your next shoot.',
    body: [
      'Most first-time buyers ask about "realism" first, but the more useful questions are about consistency and legality. A stack with a handful of misprinted or crooked notes ruins a close-up shot just as fast as an obviously fake one.',
      'Check that the note is clearly marked as a prop, is a different size to genuine currency, and that the seller can tell you which denominations they carry in bulk if your scene needs a specific look — a $50 stack reads differently on camera than a $100 stack.',
      'For productions needing volume across multiple scenes, a bulk or wholesale pack is usually more cost-effective than ordering single stacks repeatedly — see our Bulk Production Pack for film and theatre orders.',
    ],
    tags: ['film-prop-money', 'bulk-production-pack'],
  },
  {
    slug: 'prop-money-for-content-creators',
    title: 'How Content Creators Use Prop Money (The Right Way)',
    date: '2026-02-07',
    excerpt: 'TikTok, YouTube, and Instagram all have policies here — what to know before you film.',
    body: [
      'Prop money shows up constantly in unboxing videos, prank content, and "flex" style clips. The notes that hold up best on camera are clearly marked as props and sized differently from real currency — which, done right, is also exactly what keeps the content compliant with platform policy.',
      'A $20 stack is usually enough for close-up shots; save the $100 stacks for wide shots or briefcase reveals where scale matters more than detail.',
      'Keep the "not legal tender" disclaimer visible in-frame where practical — it protects you as a creator and keeps the video itself unambiguous about what viewers are looking at.',
    ],
    tags: ['content-creator-props', 'twenty-dollar-prop-note'],
  },
]
