import React, { useState } from 'react'
import { Trophy, Medal } from 'lucide-react'
import PageHeader from '../../components/common/PageHeader.jsx'
import Card from '../../components/common/Card.jsx'
import Select from '../../components/common/Select.jsx'
import ProgressBar from '../../components/common/ProgressBar.jsx'
import { employees, departments } from '../../data/mockData.js'

const RANK_STYLE = ['bg-amber-500 text-white', 'bg-slate2-500 text-white', 'bg-rose-500 text-white']

export default function Leaderboard() {
  const [deptFilter, setDeptFilter] = useState('All')
  const rows = (deptFilter === 'All' ? employees : employees.filter((e) => e.department === deptFilter))
    .slice()
    .sort((a, b) => b.xp - a.xp)
  const maxXp = Math.max(...employees.map((e) => e.xp))

  return (
    <div>
      <PageHeader
        eyebrow="Gamification"
        title="Leaderboard"
        description="Ranks employees by XP earned across CSR participation and challenges."
        action={<Select value={deptFilter} onChange={(e) => setDeptFilter(e.target.value)} options={['All', ...departments.map((d) => d.name)]} />}
      />

      <Card>
        <div className="space-y-3">
          {rows.map((e, i) => (
            <div key={e.id} className="flex items-center gap-4">
              <span className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${i < 3 ? RANK_STYLE[i] : 'bg-ink/[0.06] text-ink/50'}`}>
                {i < 3 ? <Medal size={14} /> : i + 1}
              </span>
              <div className="w-9 h-9 rounded-full bg-forest-500/10 text-forest-700 flex items-center justify-center text-xs font-semibold shrink-0">
                {e.name.split(' ').map((n) => n[0]).join('')}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-medium text-ink truncate">{e.name}</p>
                  <p className="text-xs text-ink/50 shrink-0 ml-2">{e.department}</p>
                </div>
                <ProgressBar value={e.xp} max={maxXp} color={i === 0 ? '#E8A33D' : '#1F6F4A'} />
              </div>
              <span className="text-sm font-semibold text-ink w-20 text-right shrink-0">{e.xp.toLocaleString()} XP</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
