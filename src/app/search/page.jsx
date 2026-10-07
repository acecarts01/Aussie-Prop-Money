import { Suspense } from 'react'
import SearchResults from './SearchResults'
import PageHeader from '@/components/PageHeader'
import Breadcrumbs from '@/components/Breadcrumbs'
import Metadata from '@/components/Metadata'
import { seoTitle } from '@/lib/utils'

export const metadata = {
  title: seoTitle('Search Results — Prop Money Australia'),
  robots: { index: false, follow: true }
}

export default function SearchPage() {
  return (
    <div>
      <Metadata title="Search Results — Australian Reserve Props" canonical="/search/" />
      <PageHeader 
        title="Site Search" 
        subtitle="Search across our full product range, legal guides, and production notes."
        breadcrumbs={<Breadcrumbs trail={[{ label: 'Search', href: '/search/' }]} />}
      />
      <div className="container section">
        <Suspense fallback={<div className="container">Loading results...</div>}>
          <SearchResults />
        </Suspense>
      </div>
    </div>
  )
}
