'use client'

import { motion } from 'motion/react'
import { SITE, PRODUCTS, CATEGORIES } from '@/config/site'

export default function AnimatedStatStrip() {
  const stats = [
    { label: 'Established', value: SITE.foundingYear },
    { label: 'Products', value: PRODUCTS.length },
    { label: 'Categories', value: CATEGORIES.length },
    { label: 'Ships nationwide', value: 'AU' },
  ]

  return (
    <section aria-label="At a glance">
      <div className="stat-strip">
        {stats.map((stat, i) => (
          <motion.div 
            key={stat.label}
            initial={{ opacity: 0, y: 10, translateZ: 0 }}
            whileInView={{ opacity: 1, y: 0, translateZ: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="stat"
          >
            <b>{stat.value}</b>
            <span>{stat.label}</span>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
