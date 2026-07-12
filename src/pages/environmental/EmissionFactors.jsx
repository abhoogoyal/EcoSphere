import React, { useState } from 'react'
import { Plus, Flame } from 'lucide-react'
import PageHeader from '../../components/common/PageHeader.jsx'
import Card from '../../components/common/Card.jsx'
import DataTable from '../../components/common/DataTable.jsx'
import Button from '../../components/common/Button.jsx'
import Modal from '../../components/common/Modal.jsx'
import StatusPill from '../../components/common/StatusPill.jsx'
import { emissionFactors as initialFactors } from '../../data/mockData.js'

export default function EmissionFactors() {
  const [factors, setFactors] = useState(initialFactors)
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({ source: '', scope: 'Scope 1', unit: '', factor: '', unitCO2e: 'kgCO2e' })

  const columns = [
    { key: 'source', label: 'Emission Source' },
    { key: 'scope', label: 'Scope', render: (v) => <StatusPill status={v} tone={v === 'Scope 1' ? 'green' : v === 'Scope 2' ? 'amber' : 'slate'} /> },
    { key: 'unit', label: 'Activity Unit' },
    { key: 'factor', label: 'Factor', render: (v, row) => `${v} ${row.unitCO2e} / ${row.unit}` },
  ]

  const handleAdd = () => {
    if (!form.source || !form.unit || !form.factor) return
    setFactors((prev) => [...prev, { id: `EF${String(prev.length + 1).padStart(2, '0')}`, ...form, factor: Number(form.factor) }])
    setForm({ source: '', scope: 'Scope 1', unit: '', factor: '', unitCO2e: 'kgCO2e' })
    setOpen(false)
  }

  return (
    <div>
      <PageHeader
        eyebrow="Environmental · Master Data"
        title="Emission Factors"
        description="Carbon values used to calculate emissions from operational activity — electricity, fuel, materials and travel."
        action={<Button icon={Plus} onClick={() => setOpen(true)}>Add Emission Factor</Button>}
      />
      <Card>
        <DataTable columns={columns} rows={factors} searchKeys={['source', 'scope', 'unit']} />
      </Card>

      <Modal open={open} onClose={() => setOpen(false)} title="Add Emission Factor"
        footer={<><Button variant="secondary" onClick={() => setOpen(false)}>Cancel</Button><Button onClick={handleAdd}>Save Factor</Button></>}>
        <div className="space-y-3">
          <div>
            <label className="text-xs text-ink/60 font-medium block mb-1">Emission Source</label>
            <input value={form.source} onChange={(e) => setForm({ ...form, source: e.target.value })} placeholder="e.g. Grid Electricity" className="w-full px-3 py-2 text-sm rounded-lg border border-ink/10 outline-none focus-ring" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-ink/60 font-medium block mb-1">Scope</label>
              <select value={form.scope} onChange={(e) => setForm({ ...form, scope: e.target.value })} className="w-full px-3 py-2 text-sm rounded-lg border border-ink/10 outline-none focus-ring">
                <option>Scope 1</option><option>Scope 2</option><option>Scope 3</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-ink/60 font-medium block mb-1">Activity Unit</label>
              <input value={form.unit} onChange={(e) => setForm({ ...form, unit: e.target.value })} placeholder="e.g. kWh, litre" className="w-full px-3 py-2 text-sm rounded-lg border border-ink/10 outline-none focus-ring" />
            </div>
          </div>
          <div>
            <label className="text-xs text-ink/60 font-medium block mb-1">Factor value (kgCO2e per unit)</label>
            <input value={form.factor} onChange={(e) => setForm({ ...form, factor: e.target.value })} type="number" step="0.001" placeholder="e.g. 0.716" className="w-full px-3 py-2 text-sm rounded-lg border border-ink/10 outline-none focus-ring" />
          </div>
        </div>
      </Modal>
    </div>
  )
}
