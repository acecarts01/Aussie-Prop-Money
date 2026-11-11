import { SITE } from '@/config/site'

// Static robots.txt. Written as a route (not robots.js) so it can carry Content-Signal directives
// (contentsignals.org): search and AI answers allowed, AI model training not.
export const dynamic = 'force-static'

const AI_BOTS = [
  'GPTBot', 'ChatGPT-User', 'ClaudeBot', 'Claude-Web', 'PerplexityBot', 'Applebot',
  'Amazonbot', 'Bytespider', 'CCBot', 'Google-Extended', 'Meta-ExternalAgent', 'cohere-ai', 'anthropic-ai',
]

export function GET() {
  const base = `https://${SITE.domain}`
  const lines = [
    'User-Agent: *',
    'Content-Signal: search=yes, ai-input=yes, ai-train=no',
    'Allow: /',
    'Allow: /api/products/',
    'Disallow: /admin/',
    'Disallow: /api/',
    'Disallow: /wk/',
    '',
    ...AI_BOTS.flatMap((a) => [`User-Agent: ${a}`, 'Allow: /', '']),
    `Sitemap: ${base}/sitemap.xml`,
    '',
  ]
  return new Response(lines.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } })
}
