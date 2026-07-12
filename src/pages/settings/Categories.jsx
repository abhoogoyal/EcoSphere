import React, { useState } from 'react'
import { Plus } from 'lucide-react'
import PageHeader from '../../components/common/PageHeader.jsx'
import Card from '../../components/common/Card.jsx'
import DataTable from '../../components/common/DataTable.jsx'
import Button from '../../components/common/Button.jsx'
import StatusPill from '../../components/common/StatusPill.jsx'
import Modal from '../../components/common/Modal.jsx'
import { categories as initialCategories } from '../../data/mockData.js'

export default function Categories() {
  const [categories, setCategories] = useState(initialCategories)
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({ name: '', type: 'CSR Activity' })

  const columns = [
    { key: 'name', label: 'Category Name' },
    { key: 'type', label: 'Used In' },
    { key: 'status', label: 'Status', render: (v) => <StatusPill status={v} /> },
  ]

  const handleAdd = () => {
    if (!form.name) return
    setCategories((prev) => [...prev, { id: `C${String(prev.length + 1).padStart(2, '0')}`, ...form, status: 'Active' }])
    setForm({ name: '', type: 'CSR Activity' })
    setOpen(false)
  }

  return (
    <div>
      <PageHeader
        eyebrow="Settings & Administration"
        title="Categories"
        description="Shared category values used across the Social and Gamification modules."
        action={<Button icon={Plus} onClick={() => setOpen(true)}>Add Category</Button>}
      />
      <Card>
        <DataTable columns={columns} rows={categories} searchKeys={['name', 'type']} />
      </Card>

      <Modal open={open} onClose={() => setOpen(false)} title="Add Category"
        footer={<><Button variant="secondary" onClick={() => setOpen(false)}>Cancel</Button><Button onClick={handleAdd}>Save Category</Button></>}>
        <div className="space-y-3">
          <div>
            <label className="text-xs text-ink/60 font-medium block mb-1">Name</label>
            <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-3 py-2 text-sm rounded-lg border border-ink/10 outline-none focus-ring" />
          </div>
          <div>
            <label className="text-xs text-ink/60 font-medium block mb-1">Type</label>
            <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className="w-full px-3 py-2 text-sm rounded-lg border border-ink/10 outline-none focus-ring">
              <option>CSR Activity</option><option>Challenge</option>
            </select>
          </div>
        </div>
      </Modal>
    </div>
  )
}
