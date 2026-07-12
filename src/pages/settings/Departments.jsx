import React, { useState } from 'react'
import { Plus } from 'lucide-react'
import PageHeader from '../../components/common/PageHeader.jsx'
import Card from '../../components/common/Card.jsx'
import DataTable from '../../components/common/DataTable.jsx'
import Button from '../../components/common/Button.jsx'
import StatusPill from '../../components/common/StatusPill.jsx'
import Modal from '../../components/common/Modal.jsx'
import { departments as initialDepartments } from '../../data/mockData.js'

export default function Departments() {
  const [departments, setDepartments] = useState(initialDepartments)
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({ name: '', code: '', head: '', employeeCount: '' })

  const columns = [
    { key: 'name', label: 'Department' },
    { key: 'code', label: 'Code' },
    { key: 'head', label: 'Department Head' },
    { key: 'employeeCount', label: 'Employees' },
    { key: 'status', label: 'Status', render: (v) => <StatusPill status={v} /> },
  ]

  const handleAdd = () => {
    if (!form.name || !form.code) return
    setDepartments((prev) => [...prev, { id: `D${String(prev.length + 1).padStart(2, '0')}`, ...form, employeeCount: Number(form.employeeCount) || 0, parent: null, status: 'Active' }])
    setForm({ name: '', code: '', head: '', employeeCount: '' })
    setOpen(false)
  }

  return (
    <div>
      <PageHeader
        eyebrow="Settings & Administration"
        title="Departments"
        description="Organizational hierarchy and ESG ownership per department."
        action={<Button icon={Plus} onClick={() => setOpen(true)}>Add Department</Button>}
      />
      <Card>
        <DataTable columns={columns} rows={departments} searchKeys={['name', 'code', 'head']} />
      </Card>

      <Modal open={open} onClose={() => setOpen(false)} title="Add Department"
        footer={<><Button variant="secondary" onClick={() => setOpen(false)}>Cancel</Button><Button onClick={handleAdd}>Save Department</Button></>}>
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-ink/60 font-medium block mb-1">Name</label>
              <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-3 py-2 text-sm rounded-lg border border-ink/10 outline-none focus-ring" />
            </div>
            <div>
              <label className="text-xs text-ink/60 font-medium block mb-1">Code</label>
              <input value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value.toUpperCase() })} className="w-full px-3 py-2 text-sm rounded-lg border border-ink/10 outline-none focus-ring" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-ink/60 font-medium block mb-1">Department Head</label>
              <input value={form.head} onChange={(e) => setForm({ ...form, head: e.target.value })} className="w-full px-3 py-2 text-sm rounded-lg border border-ink/10 outline-none focus-ring" />
            </div>
            <div>
              <label className="text-xs text-ink/60 font-medium block mb-1">Employee Count</label>
              <input type="number" value={form.employeeCount} onChange={(e) => setForm({ ...form, employeeCount: e.target.value })} className="w-full px-3 py-2 text-sm rounded-lg border border-ink/10 outline-none focus-ring" />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  )
}
