import { SITE } from '@/config/site'

const AI_BOTS = [
  'GPTBot', 'ChatGPT-User', 'ClaudeBot', 'Claude-Web', 'PerplexityBot', 'Applebot',
  'Amazonbot', 'Bytespider', 'CCBot', 'Google-Extended', 'Meta-ExternalAgent', 'cohere-ai',
]

export default function robots() {
  const base = `https://${SITE.domain}`
  return {
    rules: [
      { userAgent: '*', allow: '/' },
      ...AI_BOTS.map((agent) => ({ userAgent: agent, allow: '/' })),
    ],
    sitemap: `${base}/sitemap.xml`,
  }
}
