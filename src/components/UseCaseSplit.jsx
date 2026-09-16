import Link from 'next/link'
import Image from 'next/image'
import Icon from './Icon'
import { USE_CASES } from '@/config/site'

export default function UseCaseSplit() {
  return (
    <div className="usecase-grid">
      {USE_CASES.map((u) => (
        <Link key={u.href} href={u.href} className="usecase">
          <div className="plate">
            <span className="specimen-tag">{u.num}</span>
            <Image src={`/images/products/${u.image}`} alt="" width={1600} height={1200} loading="lazy" sizes="(max-width: 600px) 100vw, 33vw" />
          </div>
          <div className="body">
            <span className="num">Use case {u.num}</span>
            <h3>{u.title}</h3>
            <p>{u.text}</p>
            <span className="cta">{u.cta} <span className="arrow"><Icon name="arrow" size={16} /></span></span>
          </div>
        </Link>
      ))}
    </div>
  )
}
