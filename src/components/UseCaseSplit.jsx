'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'motion/react'
import Icon from './Icon'
import { USE_CASES } from '@/config/site'

export default function UseCaseSplit() {
  return (
    <div className="usecase-grid">
      {USE_CASES.map((u, i) => (
        <motion.div
          key={u.href}
          initial={{ opacity: 0, y: 20, translateZ: 0 }}
          whileInView={{ opacity: 1, y: 0, translateZ: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <Link href={u.href} className="usecase">
            <div className="plate">
              <span className="specimen-tag">{u.num}</span>
              <Image src={`/images/products/${u.image}`} alt={`${u.title} — prop money for ${u.title.toLowerCase()}`} width={1600} height={1200} loading="lazy" sizes="(max-width: 600px) 100vw, 33vw" />
            </div>
            <div className="body">
              <span className="num">Use case {u.num}</span>
              <h3>{u.title}</h3>
              <p>{u.text}</p>
              <span className="cta">{u.cta} <span className="arrow"><Icon name="arrow" size={16} /></span></span>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  )
}
