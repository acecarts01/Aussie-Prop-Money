// Normalizes real product photos: trims uniform background border, fits the
// product onto a white 4:3 canvas at ~90% fill (enlarging small sources),
// sharpens upscaled images, and writes an adaptive-quality WebP under a
// size budget. Vercel's next/image still negotiates AVIF/format + responsive
// sizes at runtime — this pass only guarantees consistent framing.
import { readdirSync, mkdirSync, existsSync, statSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join, basename, extname } from 'node:path'
import sharp from 'sharp'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const srcDir = join(root, 'assets', 'product-photos')
const heroSrc = join(root, 'assets', 'hero', 'hero.webp')
const outDir = join(root, 'public', 'images', 'products')
const heroOutDir = join(root, 'public', 'images')

const CANVAS_W = 1600
const CANVAS_H = 1200
const FILL = 0.9
const SIZE_BUDGET = 200 * 1024

mkdirSync(outDir, { recursive: true })
mkdirSync(heroOutDir, { recursive: true })

async function processProduct(file) {
  const slug = basename(file, extname(file))
  const inputPath = join(srcDir, file)
  const outPath = join(outDir, `${slug}.webp`)

  let img = sharp(inputPath, { failOn: 'none' })
  const meta = await img.metadata()

  // Trim uniform border, but only keep the trim if neither dimension
  // collapses below ~12% of the original (protects edge-to-edge subjects).
  let working = sharp(inputPath, { failOn: 'none' })
  try {
    const trimmed = await sharp(inputPath, { failOn: 'none' }).trim({ threshold: 12 }).toBuffer({ resolveWithObject: true })
    const minW = meta.width * 0.12
    const minH = meta.height * 0.12
    if (trimmed.info.width >= minW && trimmed.info.height >= minH) {
      working = sharp(trimmed.data)
    }
  } catch {
    // trim can fail on flat/near-uniform images — fall back to the untrimmed source
  }

  const workingMeta = await working.metadata()
  const targetW = Math.round(CANVAS_W * FILL)
  const targetH = Math.round(CANVAS_H * FILL)
  const scale = Math.min(targetW / workingMeta.width, targetH / workingMeta.height)
  const upscaling = scale > 1.05

  let pipeline = working.resize({
    width: Math.round(workingMeta.width * scale),
    height: Math.round(workingMeta.height * scale),
    fit: 'inside',
    kernel: sharp.kernel.lanczos3,
    withoutEnlargement: false,
  })
  if (upscaling) pipeline = pipeline.sharpen({ sigma: 1 })

  const resizedBuffer = await pipeline.toBuffer()
  const canvas = sharp({
    create: { width: CANVAS_W, height: CANVAS_H, channels: 3, background: '#ffffff' },
  }).composite([{ input: resizedBuffer, gravity: 'center' }])

  // Adaptive quality: step down until under budget or floor reached.
  let quality = 88
  let outBuffer
  do {
    outBuffer = await canvas.clone().webp({ quality }).toBuffer()
    quality -= 8
  } while (outBuffer.length > SIZE_BUDGET && quality >= 40)

  // Retry-with-backoff write (AV scanning can lock a fresh file briefly on Windows).
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      await sharp(outBuffer).toFile(outPath)
      break
    } catch (err) {
      if (attempt === 2) throw err
      await new Promise((r) => setTimeout(r, 200 * (attempt + 1)))
    }
  }

  return { slug, bytes: outBuffer.length, upscaled: upscaling, sourceW: meta.width, sourceH: meta.height }
}

async function processHero() {
  if (!existsSync(heroSrc)) {
    console.log('[images] no hero source found at assets/hero/hero.webp — skipping')
    return null
  }
  const outPath = join(heroOutDir, 'hero.webp')
  let quality = 84
  let outBuffer
  const base = sharp(heroSrc).resize({ width: 2000, withoutEnlargement: true })
  do {
    outBuffer = await base.clone().webp({ quality }).toBuffer()
    quality -= 8
  } while (outBuffer.length > 400 * 1024 && quality >= 50)
  await sharp(outBuffer).toFile(outPath)
  return { bytes: outBuffer.length }
}

const files = readdirSync(srcDir).filter((f) => /\.(jpe?g|png|webp|avif|tiff)$/i.test(f))
console.log(`[images] processing ${files.length} product photos...`)

const results = []
for (const file of files) {
  try {
    const r = await processProduct(file)
    results.push(r)
    const kb = (r.bytes / 1024).toFixed(0)
    console.log(`  ✓ ${r.slug}.webp  ${kb}KB${r.upscaled ? '  (upscaled — check quality)' : ''}${r.sourceW < 500 || r.sourceH < 375 ? '  ⚠ small source, reshoot candidate' : ''}`)
  } catch (err) {
    console.log(`  ✗ FAILED: ${file} — ${err.message}`)
  }
}

const hero = await processHero()
if (hero) console.log(`  ✓ hero.webp  ${(hero.bytes / 1024).toFixed(0)}KB`)

console.log(`[images] done. ${results.length}/${files.length} product images written to public/images/products/`)
