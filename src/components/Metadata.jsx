import { siteGraph } from '@/lib/schema'

// JSON-LD injection only. Title, description, canonical, robots and Open Graph come
// from each route's Next metadata export; emitting them here as well produced two
// conflicting <title>, description and canonical tags on shop, blog, about and wholesale pages.
export default function Metadata({ schemas = [], includeSiteSchemas = false }) {
  const all = [...(includeSiteSchemas ? [siteGraph] : []), ...schemas]

  // JSON inside a <script> only needs "<", ">" and the two line separators neutralised.
  // An earlier version also rewrote "&", which corrupted names such as "Packs & Bundles".
  const serialize = (data) =>
    JSON.stringify(data).replace(/</g, '\\u003c').replace(/>/g, '\\u003e').replace(/\u2028/g, '\\u2028').replace(/\u2029/g, '\\u2029')

  return (
    <>
      {all.map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: serialize(schema) }} />
      ))}
    </>
  )
}
