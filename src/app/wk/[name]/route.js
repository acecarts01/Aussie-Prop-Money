import { notFound } from 'next/navigation'
import wellKnown from '@/generated/well-known.json'

export async function GET(req, { params }) {
  const { name } = await params
  const entry = wellKnown[name]

  if (!entry) notFound()

  return new Response(entry.content, {
    headers: {
      'Content-Type': entry.type,
      'Access-Control-Allow-Origin': '*'
    }
  })
}
