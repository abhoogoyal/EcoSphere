import React from 'react'

export default function Card({ children, className = '', padded = true }) {
  return (
    <div className={`bg-white border border-ink/[0.06] rounded-xl2 shadow-card ${padded ? 'p-5' : ''} ${className}`}>
      {children}
    </div>
  )
}
