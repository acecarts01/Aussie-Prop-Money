'use client'

import { useEffect, useRef } from 'react'
import * as d3 from 'd3'
import { PRODUCTS, SITE } from '@/config/site'

/**
 * YieldChart visualizes the relationship between the purchase price (Cost)
 * and the prop face value received (Yield).
 */
export default function YieldChart({ currentSlug, customData, title = 'Value Scaling Analysis' }) {
  const svgRef = useRef(null)

  // Use custom data if provided, otherwise default to all products with face value
  const data = (customData || PRODUCTS.filter(p => p.faceValue && p.price))
    .map(p => ({
      slug: p.slug,
      name: p.name,
      price: p.price,
      faceValue: p.faceValue,
      yield: p.faceValue / p.price
    }))
    .sort((a, b) => a.price - b.price)

  useEffect(() => {
    if (!svgRef.current || data.length === 0) return

    // Clear previous chart
    d3.select(svgRef.current).selectAll('*').remove()

    const width = 600
    const height = 300
    const margin = { top: 20, right: 30, bottom: 40, left: 70 }

    const svg = d3.select(svgRef.current)
      .attr('viewBox', `0 0 ${width} ${height}`)
      .style('width', '100%')
      .style('height', 'auto')

    // Scales - use linear if small data set, log for large range
    const useLog = data.length > 5 && (d3.max(data, d => d.price) / d3.min(data, d => d.price) > 10)
    
    const x = useLog ? d3.scaleLog() : d3.scaleLinear()
    x.domain([d3.min(data, d => d.price) * (useLog ? 0.8 : 0.9), d3.max(data, d => d.price) * (useLog ? 1.2 : 1.1)])
     .range([margin.left, width - margin.right])

    const y = useLog ? d3.scaleLog() : d3.scaleLinear()
    y.domain([d3.min(data, d => d.faceValue) * (useLog ? 0.8 : 0.9), d3.max(data, d => d.faceValue) * (useLog ? 1.2 : 1.1)])
     .range([height - margin.bottom, margin.top])

    // Grid lines
    svg.append('g')
      .attr('class', 'grid')
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x).ticks(5).tickSize(-height + margin.top + margin.bottom).tickFormat(''))
      .style('stroke-opacity', 0.1)

    svg.append('g')
      .attr('class', 'grid')
      .attr('transform', `translate(${margin.left},0)`)
      .call(d3.axisLeft(y).ticks(5).tickSize(-width + margin.left + margin.right).tickFormat(''))
      .style('stroke-opacity', 0.1)

    // Axes
    svg.append('g')
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x).ticks(5, d3.format('$.0f')))
      .attr('color', 'var(--ink-3)')

    svg.append('g')
      .attr('transform', `translate(${margin.left},0)`)
      .call(d3.axisLeft(y).ticks(5, d3.format('$.0s')))
      .attr('color', 'var(--ink-3)')

    // Line
    const line = d3.line()
      .x(d => x(d.price))
      .y(d => y(d.faceValue))
      .curve(data.length > 2 ? d3.curveMonotoneX : d3.curveLinear)

    svg.append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', 'var(--accent)')
      .attr('stroke-width', 2)
      .attr('d', line)

    // Dots
    svg.selectAll('.dot')
      .data(data)
      .enter()
      .append('circle')
      .attr('class', 'dot')
      .attr('cx', d => x(d.price))
      .attr('cy', d => y(d.faceValue))
      .attr('r', d => d.slug === currentSlug ? 6 : 4)
      .attr('fill', d => d.slug === currentSlug ? 'var(--accent)' : 'var(--bg-3)')
      .attr('stroke', 'var(--accent)')
      .attr('stroke-width', 2)
      .style('cursor', 'pointer')
      .append('title')
      .text(d => `${d.name}\nCost: $${d.price}\nYield: $${d.faceValue.toLocaleString()}`)

    // Label
    svg.append('text')
      .attr('text-anchor', 'end')
      .attr('x', width - margin.right)
      .attr('y', height - 5)
      .attr('fill', 'var(--ink-3)')
      .attr('font-size', '10px')
      .text('Cost (AUD)')

    svg.append('text')
      .attr('text-anchor', 'start')
      .attr('x', 5)
      .attr('y', 15)
      .attr('fill', 'var(--ink-3)')
      .attr('font-size', '10px')
      .text('Prop Face Value (AUD)')

  }, [data, currentSlug])

  return (
    <div className="yield-chart-wrap" style={{ marginTop: '1.5rem' }}>
      <p className="h-label" style={{ fontSize: '0.8rem', marginBottom: '1rem', color: 'var(--ink-2)' }}>{title}</p>
      <div style={{ background: 'rgba(0,0,0,0.2)', borderRadius: 'var(--radius)', padding: '1rem', border: '1px solid var(--line)' }}>
        <svg ref={svgRef} />
      </div>
    </div>
  )
}
