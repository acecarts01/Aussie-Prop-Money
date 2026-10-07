'use client'

import { motion } from 'motion/react'

export default function AnimatedText({ children, delay = 0, className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15, scale: 0.99, translateZ: 0 }}
      whileInView={{ opacity: 1, y: 0, scale: 1, translateZ: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
