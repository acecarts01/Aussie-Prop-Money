'use client'

import { motion } from 'motion/react'
import Icon from './Icon'
import { TRUST_BADGES } from '@/config/site'

export default function TrustBadges() {
  return (
    <ul className="trust-badges" style={{ listStyle: 'none', margin: 0, padding: 0 }}>
      {TRUST_BADGES.map((b, i) => (
        <motion.li 
          key={b.title} 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1, duration: 0.5 }}
          className="trust-badge"
        >
          <span className="ico"><Icon name={b.icon} /></span>
          <div>
            <b>{b.title}</b>
            <span>{b.text}</span>
          </div>
        </motion.li>
      ))}
    </ul>
  )
}
