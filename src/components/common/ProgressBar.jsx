import React from 'react'

export default function ProgressBar({ value, max = 100, color = '#1F6F4A', height = 8, showLabel = false }) {
  const pct = Math.min(100, Math.round((value / max) * 100))
  return (
    <div className="w-full">
      <div className="w-full rounded-full bg-canopy-900/[0.06]" style={{ height }}>
        <div
          className="rounded-full transition-all duration-500"
          style={{ width: `${pct}%`, height, background: color }}
        />
      </div>
      {showLabel && <p className="text-xs text-ink/60 mt-1">{pct}%</p>}
    </div>
  )
}
