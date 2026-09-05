// Generates every domain-bearing / agent-ready file from src/config/site.js.
// Never hand-edit the files this script writes — edit the config and rerun.
import { mkdirSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { SITE, CATEGORIES, PRODUCTS, FORMS } from '../src/config/site.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const pub = join(root, 'public')
const isStatic = process.env.TARGET === 'static'

const domain = SITE.domain
const base = `https://${domain}`
const email = SITE.email
const phone = SITE.phone

function write(relPath, content) {
  const full = join(pub, relPath)
  mkdirSync(dirname(full), { recursive: true })
  writeFileSync(full, content, 'utf8')
}

// A — robots.txt is handled by src/app/robots.js (Next native). Nothing to do here.

// IndexNow key file — self-service, no account needed. Bing (and other IndexNow-
// participating engines) verify ownership by fetching this exact file at the root.
// Ping the API after deploy: POST https://api.indexnow.org/indexnow with
// { host, key, keyLocation, urlList }. See docs/PROJECT.md for the exact call.
write(`${SITE.indexNowKey}.txt`, SITE.indexNowKey)

// B — llms.txt
const categoryLines = CATEGORIES.map((c) => {
  const prices = PRODUCTS.filter((p) => p.category === c.slug).map((p) => p.price)
  const range = prices.length ? `$${Math.min(...prices).toFixed(2)}-$${Math.max(...prices).toFixed(2)} AUD` : 'see site'
  return `- [${c.name}](${base}/shop/${c.slug}/): ${range}, ${c.description}`
}).join('\n')

write('llms.txt', `# ${SITE.name}

> ${SITE.tagline}

${SITE.brandStatement}

## Contact
- Email: ${email}
- Phone: ${phone}
- Ships: Australia only

## Categories
${categoryLines}

## Compliance
All products are reproduced to differ from genuine Australian currency by at least 25% in size, per RBA
reproduction guidance, are clearly marked NOT LEGAL TENDER, and carry no replicated banknote security features.
No custom or buyer-specified serial numbers are offered under any circumstances.

## Key pages
- [Shop](${base}/shop/): full catalog
- [Wholesale](${base}/wholesale/): bulk/production orders
- [FAQ](${base}/faq/): legal and ordering questions
- [Blog](${base}/blog/): buying guides

## Optional
- [API Catalog](${base}/.well-known/api-catalog)
- [Agent Skills](${base}/.well-known/agent-skills/index.json)
- [MCP Server Card](${base}/.well-known/mcp/server-card.json)
- [Auth](${base}/auth.md)
`)

// C — auth.md
write('auth.md', `# Auth.md

${SITE.name} — public ecommerce catalog. No authentication is required to browse or read any resource.

## Agent Registration
No registration is needed. All resources below are public.

| Resource | URL |
|---|---|
| Shop | ${base}/shop/ |
| Product catalog (API) | ${base}/api/products |
| FAQ | ${base}/faq/ |
| Wholesale | ${base}/wholesale/ |

\`\`\`json
{
  "agent_auth": {
    "register_uri": null,
    "identity_types_supported": ["none"],
    "credential_types_supported": ["none"],
    "notes": "No authentication required. All resources are public."
  }
}
\`\`\`

Ordering is human-assisted: an agent may browse products and draft an order, but a human completes payment.
Age restriction: none. This site sells novelty currency only — not legal tender, not a financial product.
`)

// D — api-catalog
write('.well-known/api-catalog', JSON.stringify({
  linkset: [
    { anchor: `${base}/`, 'https://www.iana.org/assignments/link-relations/service-doc': [{ href: `${base}/faq/` }], title: `${SITE.name} — ${SITE.tagline}` },
    { anchor: `${base}/shop/`, type: 'text/html', title: `${SITE.name} Product Catalog` },
    { anchor: `${base}/wholesale/`, type: 'text/html', title: `${SITE.name} Wholesale` },
  ],
}, null, 2))

// E — agent-skills
write('.well-known/agent-skills/index.json', JSON.stringify({
  '$schema': 'https://agentskills.io/schema/v0.2.0/index.json',
  name: SITE.name,
  url: base,
  description: SITE.tagline,
  skills: [
    { name: 'browse-products', type: 'navigation', description: 'Browse the full prop money catalog by denomination', url: `${base}/shop/`, sha256: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855' },
    { name: 'wholesale-inquiry', type: 'commerce', description: 'Bulk/production pricing and enquiry for film & theatre', url: `${base}/wholesale/`, sha256: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855' },
    { name: 'product-education', type: 'content', description: 'Legal and buying-guide blog content', url: `${base}/blog/`, sha256: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855' },
    { name: 'contact', type: 'support', description: 'Contact for orders or questions', url: `${base}/contact/`, sha256: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855' },
  ],
}, null, 2))

// F — mcp server-card
write('.well-known/mcp/server-card.json', JSON.stringify({
  '$schema': 'https://modelcontextprotocol.io/schemas/server-card/v1.json',
  serverInfo: { name: SITE.name, version: '1.0.0', description: SITE.tagline, homepage: base, contact: { email } },
  transport: isStatic
    ? { type: 'none', human_ordering_only: true }
    : { type: 'streamable-http', endpoint: `${base}/api/mcp` },
  capabilities: {
    resources: [
      { name: 'product-catalog', description: 'Full product catalog', uri: `${base}/shop/` },
      { name: 'wholesale-info', description: 'Wholesale pricing and ordering', uri: `${base}/wholesale/` },
      { name: 'blog', description: 'Educational content', uri: `${base}/blog/` },
    ],
    commerce: {
      ordering: 'human-assisted (order request form / chat)',
      payment: ['bank-transfer', 'payid', 'crypto-BTC', 'crypto-USDT', 'crypto-ETH', 'crypto-BNB'],
      currency: SITE.currency,
      minimumOrder: SITE.orderRules.minOrder,
      freeShipping: SITE.orderRules.freeShippingThreshold,
      ships: 'Australia only',
    },
  },
  legal: {
    ageRestriction: 'none',
    productType: 'novelty currency (prop money) — not legal tender',
    compliance: 'Reproduced per RBA reproduction guidance and the Crimes (Currency) Act 1981. No custom serial numbers offered.',
  },
}, null, 2))

// G, H, I — OAuth/OIDC discovery stubs
write('.well-known/oauth-protected-resource', JSON.stringify({
  resource: base,
  resource_name: `${SITE.name} Public Catalog`,
  authorization_servers: [],
  scopes_supported: [],
  bearer_methods_supported: [],
  resource_documentation: `${base}/auth.md`,
  resource_policy_uri: `${base}/terms/`,
  tls_client_certificate_bound_access_tokens: false,
  note: `All resources on ${domain} are publicly accessible. No OAuth tokens are required.`,
}, null, 2))

write('.well-known/oauth-authorization-server', JSON.stringify({
  issuer: base,
  authorization_endpoint: null,
  token_endpoint: null,
  jwks_uri: null,
  grant_types_supported: [],
  response_types_supported: [],
  scopes_supported: [],
  note: `${SITE.name} has no protected APIs. All resources are publicly accessible.`,
  public_resources: [`${base}/shop/`, `${base}/blog/`, `${base}/faq/`, `${base}/wholesale/`, `${base}/llms.txt`],
  agent_auth: { register_uri: null, identity_types_supported: ['none'], credential_types_supported: ['none'], notes: 'No registration required.' },
}, null, 2))

write('.well-known/openid-configuration', JSON.stringify({
  issuer: base,
  note: `${SITE.name} does not operate an OpenID Connect provider. All resources are publicly accessible.`,
  public_site: true,
  authorization_endpoint: null,
  token_endpoint: null,
  userinfo_endpoint: null,
  jwks_uri: null,
  scopes_supported: [],
  response_types_supported: [],
  grant_types_supported: [],
  subject_types_supported: [],
  id_token_signing_alg_values_supported: [],
}, null, 2))

// J — acp.json
write('.well-known/acp.json', JSON.stringify({
  protocol: { name: 'acp', version: '0.1.0' },
  name: SITE.name,
  description: SITE.tagline,
  api_base_url: base,
  homepage: base,
  transports: ['https'],
  capabilities: {
    services: ['product-catalog', 'wholesale', 'blog', 'faq'],
    ordering: 'human-assisted',
    payment_methods: ['bank-transfer', 'payid', 'crypto-BTC', 'crypto-USDT', 'crypto-ETH', 'crypto-BNB'],
    currency: SITE.currency,
    minimum_order_usd: SITE.orderRules.minOrder,
    free_shipping_threshold_usd: SITE.orderRules.freeShippingThreshold,
  },
  contact: { email },
  legal: { age_restriction: 'none', region: 'AU', ships_to: 'Australia only', product_type: 'novelty currency', compliance: 'RBA reproduction guidance + Crimes (Currency) Act 1981' },
}, null, 2))

// K — ucp
write('.well-known/ucp', JSON.stringify({
  ucp: '1.0',
  protocol_version: '1.0',
  spec: 'https://ucp.dev/specification/overview/',
  schema: 'https://ucp.dev/schema/v1.json',
  site: base,
  name: SITE.name,
  description: SITE.tagline,
  services: [
    { id: 'product-catalog', type: 'catalog', url: `${base}/shop/`, description: 'Full product catalog' },
    { id: 'wholesale', type: 'b2b', url: `${base}/wholesale/`, description: 'Wholesale pricing and bulk ordering' },
  ],
  capabilities: ['browse', 'inquiry', 'wholesale', 'content'],
  endpoints: {
    catalog: `${base}/shop/`,
    contact: `${base}/contact/`,
    agent_skills: `${base}/.well-known/agent-skills/index.json`,
    mcp_server_card: `${base}/.well-known/mcp/server-card.json`,
    api_catalog: `${base}/.well-known/api-catalog`,
    llms_txt: `${base}/llms.txt`,
  },
  currency: SITE.currency,
  minimum_order_usd: SITE.orderRules.minOrder,
  payment_methods: ['bank-transfer', 'payid', 'crypto-BTC', 'crypto-USDT', 'crypto-ETH', 'crypto-BNB'],
  legal: { age_restriction: 'none', product_type: 'novelty currency', compliance: 'RBA reproduction guidance + Crimes (Currency) Act 1981' },
}, null, 2))

// L — webmcp.js
write('js/webmcp.js', `(function () {
  if (typeof navigator === 'undefined' || !navigator.modelContext) return;
  navigator.modelContext.provideContext({
    tools: [
      {
        name: 'browse_products',
        description: 'Browse Australian prop money by category',
        inputSchema: { type: 'object', properties: { category: { type: 'string', description: 'Category slug to browse' } } },
        execute: async ({ category }) => {
          const url = category ? '${base}/shop/' + category + '/' : '${base}/shop/';
          window.location.href = url;
          return { url };
        }
      },
      {
        name: 'get_wholesale_info',
        description: 'Get wholesale/bulk pricing info for productions',
        inputSchema: { type: 'object', properties: {} },
        execute: async () => { window.location.href = '${base}/wholesale/'; return { url: '${base}/wholesale/' }; }
      },
      {
        name: 'contact',
        description: 'Contact for product questions or orders',
        inputSchema: { type: 'object', properties: {} },
        execute: async () => { window.location.href = '${base}/contact/'; return { url: '${base}/contact/' }; }
      }
    ]
  });
})();
`)

// M — vercel.json (Vercel target) — headers + www->apex redirect
if (SITE.target === 'vercel') {
  const linkHeader = [
    '</.well-known/api-catalog>; rel="api-catalog"',
    '</.well-known/agent-skills/index.json>; rel="describedby"',
    '</llms.txt>; rel="describedby"',
    '</.well-known/mcp/server-card.json>; rel="service-desc"',
    '</auth.md>; rel="auth"',
    '</.well-known/openid-configuration>; rel="openid-configuration"',
  ].join(', ')

  const vercelJson = {
    '$schema': 'https://openapi.vercel.sh/vercel.json',
    trailingSlash: true,
    redirects: [
      { source: '/:path*', has: [{ type: 'host', value: `www.${domain}` }], destination: `${base}/:path*`, permanent: true },
    ],
    headers: [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'geolocation=(), microphone=(), camera=()' },
          { key: 'Link', value: linkHeader },
        ],
      },
      { source: '/.well-known/api-catalog', headers: [{ key: 'Content-Type', value: 'application/linkset+json' }, { key: 'Access-Control-Allow-Origin', value: '*' }] },
      { source: '/.well-known/agent-skills/index.json', headers: [{ key: 'Content-Type', value: 'application/json' }, { key: 'Access-Control-Allow-Origin', value: '*' }] },
      { source: '/.well-known/mcp/server-card.json', headers: [{ key: 'Content-Type', value: 'application/json' }, { key: 'Access-Control-Allow-Origin', value: '*' }] },
      { source: '/.well-known/oauth-protected-resource', headers: [{ key: 'Content-Type', value: 'application/json' }, { key: 'Access-Control-Allow-Origin', value: '*' }] },
      { source: '/.well-known/oauth-authorization-server', headers: [{ key: 'Content-Type', value: 'application/json' }, { key: 'Access-Control-Allow-Origin', value: '*' }] },
      { source: '/.well-known/openid-configuration', headers: [{ key: 'Content-Type', value: 'application/json' }, { key: 'Access-Control-Allow-Origin', value: '*' }] },
      { source: '/.well-known/acp.json', headers: [{ key: 'Content-Type', value: 'application/json' }, { key: 'Access-Control-Allow-Origin', value: '*' }] },
      { source: '/.well-known/ucp', headers: [{ key: 'Content-Type', value: 'application/json' }, { key: 'Access-Control-Allow-Origin', value: '*' }] },
      { source: '/auth.md', headers: [{ key: 'Content-Type', value: 'text/markdown; charset=utf-8' }, { key: 'Access-Control-Allow-Origin', value: '*' }] },
      { source: '/llms.txt', headers: [{ key: 'Content-Type', value: 'text/plain; charset=utf-8' }, { key: 'Access-Control-Allow-Origin', value: '*' }] },
    ],
  }
  writeFileSync(join(root, 'vercel.json'), JSON.stringify(vercelJson, null, 2), 'utf8')
}

console.log(`[gen-agent-files] wrote agent-ready files + config for domain: ${domain}${isStatic ? ' (static target)' : ''}`)
