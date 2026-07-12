import React from 'react'
import { GraduationCap } from 'lucide-react'
import PageHeader from '../../components/common/PageHeader.jsx'
import Card from '../../components/common/Card.jsx'
import ProgressBar from '../../components/common/ProgressBar.jsx'
import StatCard from '../../components/common/StatCard.jsx'
import { trainingCompletion } from '../../data/mockData.js'

export default function TrainingCompletion() {
  const totalAssigned = trainingCompletion.reduce((s, d) => s + d.assigned, 0)
  const totalCompleted = trainingCompletion.reduce((s, d) => s + d.completed, 0)
  const overallPct = Math.round((totalCompleted / totalAssigned) * 100)

  return (
    <div>
      <PageHeader
        eyebrow="Social"
        title="Training Completion"
        description="ESG, compliance and safety training completion rates by department."
      />

      <div className="grid grid-cols-3 gap-4 mb-4">
        <StatCard icon={GraduationCap} label="Overall Completion" value={`${overallPct}%`} tone="forest" />
        <StatCard label="Assigned" value={totalAssigned} tone="slate" />
        <StatCard label="Completed" value={totalCompleted} tone="amber" />
      </div>

      <Card>
        <p className="text-sm font-semibold text-ink mb-4">Completion by Department</p>
        <div className="space-y-4">
          {trainingCompletion.map((d) => {
            const pct = Math.round((d.completed / d.assigned) * 100)
            return (
              <div key={d.department}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-ink/70">{d.department}</span>
                  <span className="font-medium text-ink">{d.completed}/{d.assigned} · {pct}%</span>
                </div>
                <ProgressBar value={d.completed} max={d.assigned} color={pct >= 90 ? '#1F6F4A' : pct >= 70 ? '#E8A33D' : '#B5563A'} />
              </div>
            )
          })}
        </div>
      </Card>
    </div>
  )
}
