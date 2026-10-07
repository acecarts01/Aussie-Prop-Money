'use client'

import { motion } from 'motion/react'

// The one section-header pattern used everywhere: eyebrow → H2 → one-line sub.
export default function SectionHead({ eyebrow, title, sub, center = false, as: Tag = 'h2' }) {
  const MotionTag = motion[Tag] || motion.h2

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20, translateZ: 0 }}
      whileInView={{ opacity: 1, y: 0, translateZ: 0 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`section-head${center ? ' center' : ''}`}
    >
      {eyebrow && (
        <motion.span 
          initial={{ opacity: 0, x: -10, translateZ: 0 }}
          whileInView={{ opacity: 1, x: 0, translateZ: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="eyebrow"
        >
          {eyebrow}
        </motion.span>
      )}
      <MotionTag>{title}</MotionTag>
      {sub && (
        <motion.p
          initial={{ opacity: 0, translateZ: 0 }}
          whileInView={{ opacity: 1, translateZ: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          {sub}
        </motion.p>
      )}
    </motion.div>
  )
}
