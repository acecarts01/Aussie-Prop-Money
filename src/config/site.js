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
    'Australian Reserve Props is an Australia-based novelty currency brand established in 2024, offering compliance-first prop money for film, theatre, content creation, education, and gifting. Australian Reserve Props ships Australia-wide and specialises in Australian-note-styled prop currency across all five denominations. Every note is reproduced under RBA reproduction guidance, clearly marked NOT LEGAL TENDER, and sold for novelty and production use only.',
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
    slug: 'five-dollar-notes',
    name: '$5 Prop Notes',
    color: 'five',
    description:
      'Australian $5-style prop notes — the smallest denomination in the range, popular for party favours, magic tricks, and scenes needing a lower-value note.',
  },
  {
    slug: 'ten-dollar-notes',
    name: '$10 Prop Notes',
    color: 'ten',
    description:
      'Australian $10-style prop notes, a common choice for content creators and everyday prank or gift use.',
  },
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
    slug: 'packs-bundles',
    name: 'Packs & Bundles',
    color: 'neutral',
    description:
      'Mixed-denomination and bulk packs for productions and events needing more than a single note type.',
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

const disclaimer =
  'Reproduced at a size that differs from genuine Australian currency by at least 25%, per RBA reproduction guidance. Clearly marked NOT LEGAL TENDER on every note, with no replicated banknote security features. For film, theatre, education, and novelty use only.'

export const PRODUCTS = [
  {
    slug: 'five-dollar-prop-note-stack',
    name: '$5 AUD Prop Note Stack',
    category: 'five-dollar-notes',
    price: 19.95,
    faceValueLabel: '$500 face value per stack',
    badge: 'Party Favourite',
    tags: ['five-dollar-prop-note', 'novelty-currency', 'not-legal-tender', 'party-prank-money'],
    circulationOptions: true,
    customSerials: false,
    description: `A stack of 100 Australian $5-style prop notes, most often picked up for party favours, magic tricks, and photo props where a smaller denomination reads naturally. ${disclaimer}`,
    images: ['placeholder-five.svg'],
  },
  {
    slug: 'ten-dollar-prop-note-stack',
    name: '$10 AUD Prop Note Stack',
    category: 'ten-dollar-notes',
    price: 22.95,
    faceValueLabel: '$1,000 face value per stack',
    badge: 'Creator Favourite',
    tags: ['ten-dollar-prop-note', 'novelty-currency', 'not-legal-tender', 'content-creator-props'],
    circulationOptions: true,
    customSerials: false,
    description: `A stack of 100 Australian $10-style prop notes, a regular pick for content creators filming unboxing, prank, and flex-style videos. ${disclaimer}`,
    images: ['placeholder-ten.svg'],
  },
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
    images: ['placeholder-twenty.svg'],
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
    images: ['placeholder-fifty.svg'],
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
    images: ['placeholder-hundred.svg'],
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
    description: `A mixed pack spanning all five denominations, sized for a first order or a scene that needs visual variety rather than a single note type. ${disclaimer}`,
    images: ['placeholder-mixed.svg'],
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
    images: ['placeholder-bulk.svg'],
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
    images: ['placeholder-kids.svg'],
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
    images: ['placeholder-giftbox.svg'],
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
    images: ['placeholder-refill.svg'],
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
      'A $10 or $20 stack is usually enough for close-up shots; save the $100 stacks for wide shots or briefcase reveals where scale matters more than detail.',
      'Keep the "not legal tender" disclaimer visible in-frame where practical — it protects you as a creator and keeps the video itself unambiguous about what viewers are looking at.',
    ],
    tags: ['content-creator-props', 'ten-dollar-prop-note'],
  },
]
