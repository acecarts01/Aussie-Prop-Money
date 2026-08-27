import Link from 'next/link'
import { absoluteUrl } from '@/lib/utils'

export default function Breadcrumbs({ trail }) {
  const items = [{ label: 'Home', href: '/' }, ...trail]

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.label,
      item: absoluteUrl(item.href),
    })),
  }

  return (
    <nav aria-label="Breadcrumb" className="breadcrumbs">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      {items.map((item, i) => (
        <span key={item.href}>
          {i > 0 && ' / '}
          {i === items.length - 1 ? <span aria-current="page">{item.label}</span> : <Link href={item.href}>{item.label}</Link>}
        </span>
      ))}
    </nav>
  )
}
