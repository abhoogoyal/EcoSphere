import React, { useState } from 'react'
import { Plus, AlertOctagon } from 'lucide-react'
import PageHeader from '../../components/common/PageHeader.jsx'
import Card from '../../components/common/Card.jsx'
import DataTable from '../../components/common/DataTable.jsx'
import Button from '../../components/common/Button.jsx'
import StatusPill from '../../components/common/StatusPill.jsx'
import Modal from '../../components/common/Modal.jsx'
import { complianceIssues, audits, departments } from '../../data/mockData.js'

const TODAY = new Date('2026-07-12')

export default function ComplianceIssues() {
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({ audit: audits[0].title, severity: 'Medium', description: '', owner: '', dueDate: '' })

  const rows = complianceIssues.map((c) => ({
    ...c,
    overdue: c.status === 'Open' && new Date(c.dueDate) < TODAY,
  }))
  const overdueCount = rows.filter((r) => r.overdue).length

  const columns = [
    { key: 'description', label: 'Issue' },
    { key: 'audit', label: 'Source Audit' },
    { key: 'severity', label: 'Severity', render: (v) => <StatusPill status={v} /> },
    { key: 'owner', label: 'Owner' },
    {
      key: 'dueDate', label: 'Due Date',
      render: (v, row) => <span className={row.overdue ? 'text-rose-600 font-medium' : ''}>{v}{row.overdue && ' · Overdue'}</span>,
    },
    { key: 'status', label: 'Status', render: (v) => <StatusPill status={v} /> },
  ]

  return (
    <div>
      <PageHeader
        eyebrow="Governance"
        title="Compliance Issues"
        description="Every issue must have an assigned owner and due date. Open issues past their due date are automatically flagged."
        action={<Button icon={Plus} onClick={() => setOpen(true)}>Log Issue</Button>}
      />

      {overdueCount > 0 && (
        <Card className="mb-4 flex items-center gap-2.5 bg-rose-500/[0.05] border-rose-500/20">
          <AlertOctagon size={16} className="text-rose-600 shrink-0" />
          <p className="text-xs text-ink/70">{overdueCount} open issue{overdueCount > 1 ? 's are' : ' is'} past due date and flagged for notification.</p>
        </Card>
      )}

      <Card>
        <DataTable columns={columns} rows={rows} searchKeys={['description', 'audit', 'owner']} />
      </Card>

      <Modal open={open} onClose={() => setOpen(false)} title="Log Compliance Issue"
        footer={<><Button variant="secondary" onClick={() => setOpen(false)}>Cancel</Button><Button onClick={() => setOpen(false)}>Log Issue</Button></>}>
        <div className="space-y-3">
          <div>
            <label className="text-xs text-ink/60 font-medium block mb-1">Description</label>
            <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} className="w-full px-3 py-2 text-sm rounded-lg border border-ink/10 outline-none focus-ring resize-none" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-ink/60 font-medium block mb-1">Source Audit</label>
              <select value={form.audit} onChange={(e) => setForm({ ...form, audit: e.target.value })} className="w-full px-3 py-2 text-sm rounded-lg border border-ink/10 outline-none focus-ring">
                {audits.map((a) => <option key={a.id}>{a.title}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs text-ink/60 font-medium block mb-1">Severity</label>
              <select value={form.severity} onChange={(e) => setForm({ ...form, severity: e.target.value })} className="w-full px-3 py-2 text-sm rounded-lg border border-ink/10 outline-none focus-ring">
                <option>High</option><option>Medium</option><option>Low</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-ink/60 font-medium block mb-1">Owner (required)</label>
              <input value={form.owner} onChange={(e) => setForm({ ...form, owner: e.target.value })} className="w-full px-3 py-2 text-sm rounded-lg border border-ink/10 outline-none focus-ring" />
            </div>
            <div>
              <label className="text-xs text-ink/60 font-medium block mb-1">Due Date (required)</label>
              <input type="date" value={form.dueDate} onChange={(e) => setForm({ ...form, dueDate: e.target.value })} className="w-full px-3 py-2 text-sm rounded-lg border border-ink/10 outline-none focus-ring" />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  )
}
