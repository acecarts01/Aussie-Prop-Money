// Pre-ship crosscheck — scans source + public output for the compliance and
// structural rules in CLAUDE.md. Placeholders ([EMAIL], [NUMBER], etc.) are
// warnings, not failures, while the site is intentionally pre-launch.
import { readdirSync, readFileSync, statSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join, extname } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')

const BANNED_TERMS = [
  'counterfeit', 'undetectable', 'indistinguishable', 'passes the pen test',
  '1:1 scale', 'full size', 'spendable', 'heist money', 'ransom money',
  'low-profile payment', 'untraceable', 'anonymous payment',
]

const SCAN_DIRS = ['src', 'public', 'docs']
const SCAN_EXT = new Set(['.js', '.jsx', '.mjs', '.md', '.txt', '.json', '.css'])

let errors = 0
let warnings = 0

function walk(dir, cb) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry)
    const st = statSync(full)
    if (st.isDirectory()) {
      if (entry === 'node_modules' || entry === '.next' || entry === 'out') continue
      walk(full, cb)
    } else if (SCAN_EXT.has(extname(full))) {
      cb(full)
    }
  }
}

console.log('WEBFORGE CROSSCHECK — Australian Reserve Props\n')

// 1. Banned-term scan (case-insensitive), excluding this script and CLAUDE.md's own list of the words.
for (const dir of SCAN_DIRS) {
  try {
    walk(join(root, dir), (file) => {
      if (file.endsWith('crosscheck.mjs') || file.endsWith('CLAUDE.md') || file.endsWith('keyword-map.md') || file.endsWith('PROJECT.md') || file.endsWith('_semrush-clean.json') || file.endsWith('product-photo-shotlist.csv')) return // these files legitimately document the banned/excluded words or are raw research data
      const text = readFileSync(file, 'utf8').toLowerCase()
      for (const term of BANNED_TERMS) {
        if (text.includes(term)) {
          console.log(`FAIL  Banned term "${term}" found in ${file.replace(root, '.')}`)
          errors++
        }
      }
    })
  } catch { /* dir may not exist yet */ }
}

// 2. Placeholder check (warning only, pre-launch)
const placeholders = ['[EMAIL]', '[NUMBER]', '[WHATSAPP_NUMBER]', '[LOCATION_PENDING]', '[ADDRESS_PENDING]', '[ABN_PENDING]']
try {
  const siteConfig = readFileSync(join(root, 'src/config/site.js'), 'utf8')
  for (const p of placeholders) {
    if (siteConfig.includes(p)) {
      console.log(`WARN  Placeholder ${p} still present in src/config/site.js — expected pre-launch, fill in before going live`)
      warnings++
    }
  }
} catch { /* ignore */ }

// 3. Required agent-ready files present
const requiredPublic = [
  'llms.txt', 'auth.md', 'js/webmcp.js',
  '.well-known/api-catalog', '.well-known/agent-skills/index.json', '.well-known/mcp/server-card.json',
  '.well-known/oauth-protected-resource', '.well-known/oauth-authorization-server', '.well-known/openid-configuration',
  '.well-known/acp.json', '.well-known/ucp',
]
for (const f of requiredPublic) {
  try {
    statSync(join(root, 'public', f))
  } catch {
    console.log(`FAIL  Missing required agent-ready file: public/${f} — run "npm run build" (prebuild generates it) first`)
    errors++
  }
}

// 4. vercel.json present (Vercel target)
try {
  statSync(join(root, 'vercel.json'))
} catch {
  console.log('FAIL  vercel.json missing at repo root — run the build (prebuild step generates it)')
  errors++
}

// 5. No custom-serial-number affordance in product data
const siteConfigRaw = readFileSync(join(root, 'src/config/site.js'), 'utf8')
if (/customSerials:\s*true/.test(siteConfigRaw)) {
  console.log('FAIL  A product has customSerials: true — custom serial numbers are banned by CLAUDE.md')
  errors++
}

console.log(`\n${errors} error(s), ${warnings} warning(s).`)
if (errors > 0) {
  console.log('Crosscheck FAILED — fix the errors above before shipping.')
  process.exit(1)
} else {
  console.log('Crosscheck passed (warnings are expected pre-launch placeholders).')
}
