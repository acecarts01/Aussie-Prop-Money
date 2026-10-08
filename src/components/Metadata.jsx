import { orgSchema, websiteSchema } from '@/lib/schema'

// JSON-LD injection only. Title, description, canonical, robots and Open Graph come
// from each route's Next metadata export; emitting them here as well produced two
// conflicting <title>, description and canonical tags on shop, blog, about and wholesale pages.
export default function Metadata({ schemas = [], includeSiteSchemas = false }) {
  const allSchemas = [...(includeSiteSchemas ? [orgSchema, websiteSchema] : []), ...schemas]

  const safeSerialize = (data) =>
    JSON.stringify(data).replace(/</g, '\\u003c').replace(/>/g, '\\u003e').replace(/&/g, '&#64;')

  return (
    <>
      {allSchemas.map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeSerialize(schema) }} />
      ))}
    </>
  )
}
