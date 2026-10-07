import { SITE } from '@/config/site'
import { absoluteUrl } from '@/lib/utils'
import { orgSchema, websiteSchema } from '@/lib/schema'

/**
 * Metadata component for injecting standard meta tags and JSON-LD schema into the document head.
 * This component handles centralized schema injection and ensures all critical SEO tags are present.
 */
export default function Metadata({ 
  title, 
  description, 
  canonical, 
  ogImage, 
  schemas = [],
  includeSiteSchemas = false 
}) {
  const url = canonical ? absoluteUrl(canonical) : null
  const imgUrl = ogImage ? absoluteUrl(ogImage) : absoluteUrl('/og-default.jpg')

  // Combine site-wide schemas with component-specific schemas
  const allSchemas = [
    ...(includeSiteSchemas ? [orgSchema, websiteSchema] : []),
    ...schemas
  ]

  // Safe serialization helper to avoid XSS in JSON-LD injection and handle character encoding
  const safeSerialize = (data) => {
    return JSON.stringify(data)
      .replace(/</g, '\\u003c')
      .replace(/>/g, '\\u003e')
      .replace(/&/g, '&#64;') // basic entity encoding for emails in strings if needed, though schema already has it
  }

  return (
    <>
      {/* Search Engine Optimization Tags */}
      {title && <title>{title}</title>}
      {description && <meta name="description" content={description} />}
      {url && <link rel="canonical" href={url} />}

      {/* OpenGraph Social Sharing Card Data */}
      <meta property="og:site_name" content={SITE.name} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="en_AU" />
      {title && <meta property="og:title" content={title} />}
      {description && <meta property="og:description" content={description} />}
      {url && <meta property="og:url" content={url} />}
      <meta property="og:image" content={imgUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      {/* Twitter Social Card Data */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={`@${SITE.name.replace(/\s+/g, '').toLowerCase()}`} />
      {title && <meta name="twitter:title" content={title} />}
      {description && <meta name="twitter:description" content={description} />}
      <meta name="twitter:image" content={imgUrl} />

      {/* JSON-LD Structured Data for Rich Results */}
      {allSchemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: safeSerialize(schema) }}
        />
      ))}
    </>
  )
}
