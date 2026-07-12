import React, { useState } from 'react'
import { Plus } from 'lucide-react'
import PageHeader from '../../components/common/PageHeader.jsx'
import Card from '../../components/common/Card.jsx'
import DataTable from '../../components/common/DataTable.jsx'
import Button from '../../components/common/Button.jsx'
import StatusPill from '../../components/common/StatusPill.jsx'
import Modal from '../../components/common/Modal.jsx'
import { audits, departments } from '../../data/mockData.js'

export default function Audits() {
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({ title: '', department: departments[0].name, auditor: '', date: '' })

  const columns = [
    { key: 'title', label: 'Audit' },
    { key: 'department', label: 'Department' },
    { key: 'auditor', label: 'Auditor' },
    { key: 'date', label: 'Date' },
    { key: 'findings', label: 'Findings' },
    { key: 'status', label: 'Status', render: (v) => <StatusPill status={v} /> },
  ]

  return (
    <div>
      <PageHeader
        eyebrow="Governance"
        title="Audits"
        description="Governance audits scheduled or completed across the organization, feeding compliance issues."
        action={<Button icon={Plus} onClick={() => setOpen(true)}>Schedule Audit</Button>}
      />
      <Card>
        <DataTable columns={columns} rows={audits} searchKeys={['title', 'department', 'auditor']} />
      </Card>

      <Modal open={open} onClose={() => setOpen(false)} title="Schedule Audit"
        footer={<><Button variant="secondary" onClick={() => setOpen(false)}>Cancel</Button><Button onClick={() => setOpen(false)}>Schedule</Button></>}>
        <div className="space-y-3">
          <div>
            <label className="text-xs text-ink/60 font-medium block mb-1">Audit Title</label>
            <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full px-3 py-2 text-sm rounded-lg border border-ink/10 outline-none focus-ring" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-ink/60 font-medium block mb-1">Department</label>
              <select value={form.department} onChange={(e) => setForm({ ...form, department: e.target.value })} className="w-full px-3 py-2 text-sm rounded-lg border border-ink/10 outline-none focus-ring">
                {departments.map((d) => <option key={d.id}>{d.name}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs text-ink/60 font-medium block mb-1">Date</label>
              <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className="w-full px-3 py-2 text-sm rounded-lg border border-ink/10 outline-none focus-ring" />
            </div>
          </div>
          <div>
            <label className="text-xs text-ink/60 font-medium block mb-1">Auditor</label>
            <input value={form.auditor} onChange={(e) => setForm({ ...form, auditor: e.target.value })} className="w-full px-3 py-2 text-sm rounded-lg border border-ink/10 outline-none focus-ring" />
          </div>
        </div>
      </Modal>
    </div>
  )
}
