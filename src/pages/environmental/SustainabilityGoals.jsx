import React, { useState } from 'react'
import { Plus, Target } from 'lucide-react'
import PageHeader from '../../components/common/PageHeader.jsx'
import Card from '../../components/common/Card.jsx'
import Button from '../../components/common/Button.jsx'
import Modal from '../../components/common/Modal.jsx'
import ProgressBar from '../../components/common/ProgressBar.jsx'
import StatusPill from '../../components/common/StatusPill.jsx'
import { environmentalGoals } from '../../data/mockData.js'

export default function SustainabilityGoals() {
  const [goals] = useState(environmentalGoals)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(null)

  return (
    <div>
      <PageHeader
        eyebrow="Environmental · Targets"
        title="Sustainability Goals"
        description="Track progress against department-level environmental targets and deadlines."
        action={<Button icon={Plus}>Set New Goal</Button>}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {goals.map((goal) => {
          const pctOfTarget = goal.title.toLowerCase().includes('reduce') || goal.title.toLowerCase().includes('cut')
            ? Math.min(100, Math.round((goal.current / goal.target) * 100))
            : Math.min(100, Math.round((goal.current / goal.target) * 100))
          return (
            <Card key={goal.id} className="cursor-pointer hover:shadow-lg transition-shadow" >
              <div className="flex items-start justify-between mb-2">
                <div className="w-9 h-9 rounded-lg bg-forest-500/10 text-forest-600 flex items-center justify-center">
                  <Target size={17} />
                </div>
                <StatusPill status={goal.status} />
              </div>
              <p className="font-display font-semibold text-ink mt-2 leading-snug">{goal.title}</p>
              <p className="text-xs text-ink/50 mt-1">{goal.department} · Due {goal.deadline}</p>
              <div className="mt-4">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-ink/60">{goal.current.toLocaleString()} / {goal.target.toLocaleString()} {goal.metric}</span>
                  <span className="font-medium text-ink">{pctOfTarget}%</span>
                </div>
                <ProgressBar value={goal.current} max={goal.target} color={goal.status === 'At Risk' ? '#B5563A' : '#1F6F4A'} />
              </div>
              <button onClick={() => { setActive(goal); setOpen(true) }} className="text-xs text-forest-600 font-medium mt-3 hover:underline">
                View details
              </button>
            </Card>
          )
        })}
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title={active?.title || 'Goal'}
        footer={<Button variant="secondary" onClick={() => setOpen(false)}>Close</Button>}>
        {active && (
          <div className="space-y-2 text-sm text-ink/75">
            <p><span className="text-ink/45">Department:</span> {active.department}</p>
            <p><span className="text-ink/45">Metric:</span> {active.metric}</p>
            <p><span className="text-ink/45">Current:</span> {active.current.toLocaleString()}</p>
            <p><span className="text-ink/45">Target:</span> {active.target.toLocaleString()}</p>
            <p><span className="text-ink/45">Deadline:</span> {active.deadline}</p>
            <p><span className="text-ink/45">Status:</span> {active.status}</p>
          </div>
        )}
      </Modal>
    </div>
  )
}
