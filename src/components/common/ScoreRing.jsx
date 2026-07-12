import React from 'react'

// Signature element: concentric "growth rings" — echoing tree rings — where each
// ring's arc-length encodes one pillar's score. The center holds the weighted total.
const RING_CONFIG = [
  { key: 'environmental', color: '#1F6F4A', radius: 54 },
  { key: 'social', color: '#B5563A', radius: 42 },
  { key: 'governance', color: '#3B4B5C', radius: 30 },
]

export default function ScoreRing({ scores, size = 148, label = 'Overall ESG Score' }) {
  const center = size / 2
  return (
    <div className="flex items-center gap-5">
      <svg width={size} height={size} viewBox="0 0 148 148" className="shrink-0 -rotate-90">
        {RING_CONFIG.map(({ key, color, radius }) => {
          const circumference = 2 * Math.PI * radius
          const value = scores[key] ?? 0
          const dash = (value / 100) * circumference
          return (
            <g key={key}>
              <circle cx={center} cy={center} r={radius} className="ring-track" strokeWidth="8" />
              <circle
                cx={center}
                cy={center}
                r={radius}
                fill="none"
                stroke={color}
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={`${dash} ${circumference - dash}`}
                style={{ transition: 'stroke-dasharray 0.6s ease' }}
              />
            </g>
          )
        })}
        <text
          x={center}
          y={center}
          textAnchor="middle"
          dominantBaseline="central"
          transform={`rotate(90 ${center} ${center})`}
          className="font-display fill-ink"
          fontSize="30"
          fontWeight="600"
        >
          {scores.total}
        </text>
      </svg>
      <div>
        <p className="text-xs uppercase tracking-wider text-slate2-500 font-medium">{label}</p>
        <div className="mt-2 space-y-1.5">
          {RING_CONFIG.map(({ key, color }) => (
            <div key={key} className="flex items-center gap-2 text-sm">
              <span className="w-2.5 h-2.5 rounded-full" style={{ background: color }} />
              <span className="capitalize text-ink/70 w-24">{key}</span>
              <span className="font-semibold text-ink">{scores[key]}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
