import React from 'react'

const TONE_MAP = {
  green: 'bg-forest-500/10 text-forest-600 border-forest-500/20',
  amber: 'bg-amber-500/10 text-amber-600 border-amber-500/30',
  rose: 'bg-rose-500/10 text-rose-600 border-rose-500/25',
  slate: 'bg-slate2-500/10 text-slate2-600 border-slate2-500/20',
  ink: 'bg-ink/5 text-ink/70 border-ink/10',
}

const STATUS_TONE = {
  Active: 'green', Published: 'green', Approved: 'green', Completed: 'green',
  Acknowledged: 'green', Resolved: 'green', 'On Track': 'green',
  Pending: 'amber', Draft: 'amber', 'Under Review': 'amber', Scheduled: 'amber', Upcoming: 'amber',
  'At Risk': 'rose', Rejected: 'rose', Overdue: 'rose', Open: 'rose', High: 'rose',
  Archived: 'slate', Inactive: 'slate', 'In Progress': 'slate', Medium: 'amber', Low: 'slate',
  'Out of Stock': 'slate',
}

export default function StatusPill({ status, tone }) {
  const resolvedTone = tone || STATUS_TONE[status] || 'ink'
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${TONE_MAP[resolvedTone]}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current" />
      {status}
    </span>
  )
}
