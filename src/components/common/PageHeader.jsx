import React from 'react'

export default function PageHeader({ eyebrow, title, description, action }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
      <div>
        {eyebrow && <p className="text-xs uppercase tracking-wider text-forest-600 font-semibold mb-1">{eyebrow}</p>}
        <h1 className="font-display text-2xl sm:text-[28px] font-semibold text-ink leading-tight">{title}</h1>
        {description && <p className="text-sm text-ink/60 mt-1.5 max-w-2xl">{description}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  )
}
