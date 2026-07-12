import React, { useState } from 'react'
import { Plus, MapPin, Users2, Calendar } from 'lucide-react'
import PageHeader from '../../components/common/PageHeader.jsx'
import Card from '../../components/common/Card.jsx'
import Button from '../../components/common/Button.jsx'
import StatusPill from '../../components/common/StatusPill.jsx'
import Modal from '../../components/common/Modal.jsx'
import { csrActivities, categories } from '../../data/mockData.js'

export default function CSRActivities() {
  const [open, setOpen] = useState(false)
  const csrCategories = categories.filter((c) => c.type === 'CSR Activity')
  const [form, setForm] = useState({ title: '', category: csrCategories[0]?.name, location: '', date: '' })

  return (
    <div>
      <PageHeader
        eyebrow="Social"
        title="CSR Activities"
        description="Company-organized social initiatives that employees can join and log participation for."
        action={<Button icon={Plus} onClick={() => setOpen(true)}>Create Activity</Button>}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {csrActivities.map((a) => (
          <Card key={a.id}>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[11px] uppercase tracking-wide text-rose-600 font-semibold">{a.category}</p>
                <p className="font-display font-semibold text-ink mt-1 text-[15px]">{a.title}</p>
              </div>
              <StatusPill status={a.status} />
            </div>
            <div className="mt-3 space-y-1.5 text-xs text-ink/55">
              <p className="flex items-center gap-1.5"><Calendar size={13} /> {a.date}</p>
              <p className="flex items-center gap-1.5"><MapPin size={13} /> {a.location}</p>
              <p className="flex items-center gap-1.5"><Users2 size={13} /> {a.participants} employees involved · {a.department}</p>
            </div>
          </Card>
        ))}
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title="Create CSR Activity"
        footer={<><Button variant="secondary" onClick={() => setOpen(false)}>Cancel</Button><Button onClick={() => setOpen(false)}>Create Activity</Button></>}>
        <div className="space-y-3">
          <div>
            <label className="text-xs text-ink/60 font-medium block mb-1">Activity Title</label>
            <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full px-3 py-2 text-sm rounded-lg border border-ink/10 outline-none focus-ring" />
          </div>
          <div>
            <label className="text-xs text-ink/60 font-medium block mb-1">Category</label>
            <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full px-3 py-2 text-sm rounded-lg border border-ink/10 outline-none focus-ring">
              {csrCategories.map((c) => <option key={c.id}>{c.name}</option>)}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-ink/60 font-medium block mb-1">Location</label>
              <input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} className="w-full px-3 py-2 text-sm rounded-lg border border-ink/10 outline-none focus-ring" />
            </div>
            <div>
              <label className="text-xs text-ink/60 font-medium block mb-1">Date</label>
              <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className="w-full px-3 py-2 text-sm rounded-lg border border-ink/10 outline-none focus-ring" />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  )
}
