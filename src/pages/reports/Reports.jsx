import React from 'react'
import { Link } from 'react-router-dom'
import { Leaf, HeartHandshake, ShieldCheck, FileBarChart, SlidersHorizontal, Download } from 'lucide-react'
import PageHeader from '../../components/common/PageHeader.jsx'
import Card from '../../components/common/Card.jsx'
import Button from '../../components/common/Button.jsx'

const REPORTS = [
  { title: 'Environmental Report', description: 'Emissions by scope, department carbon footprint, and goal progress.', icon: Leaf, tone: 'forest' },
  { title: 'Social Report', description: 'CSR participation, diversity metrics and training completion.', icon: HeartHandshake, tone: 'rose' },
  { title: 'Governance Report', description: 'Policy acknowledgements, audit outcomes and open compliance issues.', icon: ShieldCheck, tone: 'slate' },
  { title: 'ESG Summary Report', description: 'Weighted overall score and department rankings for leadership review.', icon: FileBarChart, tone: 'amber' },
]

const TONE_MAP = {
  forest: 'bg-forest-500/10 text-forest-600',
  rose: 'bg-rose-500/10 text-rose-600',
  slate: 'bg-slate2-500/10 text-slate2-600',
  amber: 'bg-amber-500/10 text-amber-600',
}

export default function Reports() {
  return (
    <div>
      <PageHeader
        eyebrow="Reports"
        title="All Reports"
        description="Standard ESG reports, ready to export as PDF, Excel or CSV."
        action={<Link to="/reports/builder"><Button icon={SlidersHorizontal} variant="secondary">Custom Report Builder</Button></Link>}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {REPORTS.map((r) => (
          <Card key={r.title}>
            <div className="flex items-start gap-3.5">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${TONE_MAP[r.tone]}`}>
                <r.icon size={18} />
              </div>
              <div className="flex-1">
                <p className="font-display font-semibold text-ink">{r.title}</p>
                <p className="text-xs text-ink/50 mt-1">{r.description}</p>
                <div className="flex gap-2 mt-3">
                  <Button variant="secondary" icon={Download} className="!text-xs !py-1.5">PDF</Button>
                  <Button variant="secondary" icon={Download} className="!text-xs !py-1.5">Excel</Button>
                  <Button variant="secondary" icon={Download} className="!text-xs !py-1.5">CSV</Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
