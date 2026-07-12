import React, { useState } from 'react'
import { Plus, FileText } from 'lucide-react'
import PageHeader from '../../components/common/PageHeader.jsx'
import Card from '../../components/common/Card.jsx'
import DataTable from '../../components/common/DataTable.jsx'
import Button from '../../components/common/Button.jsx'
import StatusPill from '../../components/common/StatusPill.jsx'
import Modal from '../../components/common/Modal.jsx'
import { esgPolicies } from '../../data/mockData.js'

export default function ESGPolicies() {
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({ title: '', category: 'Governance', owner: '' })

  const columns = [
    { key: 'title', label: 'Policy', render: (v) => <span className="flex items-center gap-2 font-medium text-ink"><FileText size={14} className="text-ink/30" />{v}</span> },
    { key: 'category', label: 'Category' },
    { key: 'owner', label: 'Owner' },
    { key: 'version', label: 'Version' },
    { key: 'effectiveDate', label: 'Effective Date' },
    { key: 'status', label: 'Status', render: (v) => <StatusPill status={v} /> },
  ]

  return (
    <div>
      <PageHeader
        eyebrow="Governance"
        title="ESG Policies"
        description="Governance, environmental and social policies published for organization-wide acknowledgement."
        action={<Button icon={Plus} onClick={() => setOpen(true)}>New Policy</Button>}
      />
      <Card>
        <DataTable columns={columns} rows={esgPolicies} searchKeys={['title', 'category', 'owner']} />
      </Card>

      <Modal open={open} onClose={() => setOpen(false)} title="Create ESG Policy"
        footer={<><Button variant="secondary" onClick={() => setOpen(false)}>Cancel</Button><Button onClick={() => setOpen(false)}>Save as Draft</Button></>}>
        <div className="space-y-3">
          <div>
            <label className="text-xs text-ink/60 font-medium block mb-1">Policy Title</label>
            <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full px-3 py-2 text-sm rounded-lg border border-ink/10 outline-none focus-ring" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-ink/60 font-medium block mb-1">Category</label>
              <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full px-3 py-2 text-sm rounded-lg border border-ink/10 outline-none focus-ring">
                <option>Governance</option><option>Environmental</option><option>Social</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-ink/60 font-medium block mb-1">Owner</label>
              <input value={form.owner} onChange={(e) => setForm({ ...form, owner: e.target.value })} className="w-full px-3 py-2 text-sm rounded-lg border border-ink/10 outline-none focus-ring" />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  )
}
