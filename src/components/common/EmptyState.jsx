import React from 'react'
import { Leaf } from 'lucide-react'

export default function EmptyState({ icon: Icon = Leaf, title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-6">
      <div className="w-12 h-12 rounded-full bg-forest-500/10 text-forest-600 flex items-center justify-center mb-4">
        <Icon size={22} />
      </div>
      <p className="font-display text-lg font-semibold text-ink">{title}</p>
      {description && <p className="text-sm text-ink/55 mt-1.5 max-w-sm">{description}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  )
}
