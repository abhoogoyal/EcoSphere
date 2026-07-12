import React from 'react'
import Card from './Card.jsx'

export default function StatCard({ icon: Icon, label, value, sublabel, trend, tone = 'forest' }) {
  const toneMap = {
    forest: 'bg-forest-500/10 text-forest-600',
    rose: 'bg-rose-500/10 text-rose-600',
    amber: 'bg-amber-500/10 text-amber-600',
    slate: 'bg-slate2-500/10 text-slate2-600',
  }
  return (
    <Card>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs uppercase tracking-wide text-ink/50 font-medium">{label}</p>
          <p className="font-display text-[26px] font-semibold text-ink mt-1">{value}</p>
          {sublabel && <p className="text-xs text-ink/50 mt-1">{sublabel}</p>}
        </div>
        {Icon && (
          <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${toneMap[tone]}`}>
            <Icon size={18} strokeWidth={2} />
          </div>
        )}
      </div>
      {trend && (
        <p className={`text-xs mt-3 font-medium ${trend.startsWith('-') ? 'text-forest-600' : 'text-rose-600'}`}>
          {trend}
        </p>
      )}
    </Card>
  )
}
