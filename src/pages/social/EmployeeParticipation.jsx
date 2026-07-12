import React, { useState } from 'react'
import { FileWarning, Paperclip } from 'lucide-react'
import PageHeader from '../../components/common/PageHeader.jsx'
import Card from '../../components/common/Card.jsx'
import DataTable from '../../components/common/DataTable.jsx'
import StatusPill from '../../components/common/StatusPill.jsx'
import Button from '../../components/common/Button.jsx'
import { employeeParticipation as initialRows } from '../../data/mockData.js'
import { useApp } from '../../context/AppContext.jsx'

export default function EmployeeParticipation() {
  const [rows, setRows] = useState(initialRows)
  const { settings } = useApp()

  const setStatus = (id, status) => {
    setRows((prev) => prev.map((r) => {
      if (r.id !== id) return r
      if (status === 'Approved' && settings.evidenceRequired && !r.proof) return r // blocked without proof
      return { ...r, approvalStatus: status, pointsEarned: status === 'Approved' ? (r.pointsEarned || 80) : 0 }
    }))
  }

  const columns = [
    { key: 'employee', label: 'Employee' },
    { key: 'activity', label: 'CSR Activity' },
    { key: 'proof', label: 'Proof', render: (v) => v ? <span className="flex items-center gap-1 text-forest-600"><Paperclip size={12} />{v}</span> : <span className="text-ink/35">None attached</span> },
    { key: 'pointsEarned', label: 'Points' },
    {
      key: 'approvalStatus', label: 'Status',
      render: (v, row) => (
        <div className="flex items-center gap-2">
          <StatusPill status={v} />
          {v === 'Pending' && (
            <div className="flex gap-1">
              <button
                onClick={() => setStatus(row.id, 'Approved')}
                title={settings.evidenceRequired && !row.proof ? 'Evidence required before approval' : 'Approve'}
                disabled={settings.evidenceRequired && !row.proof}
                className="text-[11px] px-2 py-0.5 rounded-md bg-forest-500/10 text-forest-600 hover:bg-forest-500/20 disabled:opacity-40 disabled:cursor-not-allowed"
              >Approve</button>
              <button onClick={() => setStatus(row.id, 'Rejected')} className="text-[11px] px-2 py-0.5 rounded-md bg-rose-500/10 text-rose-600 hover:bg-rose-500/20">Reject</button>
            </div>
          )}
        </div>
      ),
    },
  ]

  return (
    <div>
      <PageHeader
        eyebrow="Social"
        title="Employee Participation"
        description="Tracks employee involvement in CSR Activities — approvals award points that feed gamification."
      />

      {settings.evidenceRequired && (
        <Card className="mb-4 flex items-center gap-2.5 bg-amber-500/[0.05] border-amber-500/20">
          <FileWarning size={16} className="text-amber-600 shrink-0" />
          <p className="text-xs text-ink/70">Evidence Requirement is enabled in Settings — participation can't be approved without an attached proof file.</p>
        </Card>
      )}

      <Card>
        <DataTable columns={columns} rows={rows} searchKeys={['employee', 'activity']} />
      </Card>
    </div>
  )
}
