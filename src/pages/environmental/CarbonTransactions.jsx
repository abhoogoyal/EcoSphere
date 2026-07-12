import React, { useState } from 'react'
import { Zap, Plus } from 'lucide-react'
import PageHeader from '../../components/common/PageHeader.jsx'
import Card from '../../components/common/Card.jsx'
import DataTable from '../../components/common/DataTable.jsx'
import Button from '../../components/common/Button.jsx'
import StatusPill from '../../components/common/StatusPill.jsx'
import Select from '../../components/common/Select.jsx'
import { carbonTransactions, departments } from '../../data/mockData.js'
import { useApp } from '../../context/AppContext.jsx'

export default function CarbonTransactions() {
  const { settings, toggleSetting } = useApp()
  const [deptFilter, setDeptFilter] = useState('All')

  const rows = deptFilter === 'All' ? carbonTransactions : carbonTransactions.filter((t) => t.department === deptFilter)

  const columns = [
    { key: 'id', label: 'Txn ID' },
    { key: 'department', label: 'Department' },
    { key: 'source', label: 'Emission Source' },
    { key: 'linkedRecord', label: 'Linked ERP Record' },
    { key: 'quantity', label: 'Quantity', render: (v, row) => `${v.toLocaleString()} ${row.unit}` },
    { key: 'emissions', label: 'Emissions (kgCO2e)', render: (v) => v.toLocaleString() },
    { key: 'date', label: 'Date' },
    { key: 'auto', label: 'Source', render: (v) => <StatusPill status={v ? 'Auto-Calculated' : 'Manual Entry'} tone={v ? 'green' : 'slate'} /> },
  ]

  return (
    <div>
      <PageHeader
        eyebrow="Environmental · Transactions"
        title="Carbon Transactions"
        description="Emissions calculated from Purchase, Manufacturing, Expense and Fleet records using linked emission factors."
        action={<Button icon={Plus}>Add Manual Transaction</Button>}
      />

      <Card className="mb-4 flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-forest-500/10 text-forest-600 flex items-center justify-center">
            <Zap size={17} />
          </div>
          <div>
            <p className="text-sm font-medium text-ink">Auto Emission Calculation</p>
            <p className="text-xs text-ink/50">When enabled, transactions are generated automatically from linked ERP records.</p>
          </div>
        </div>
        <button
          onClick={() => toggleSetting('autoEmissionCalc')}
          role="switch"
          aria-checked={settings.autoEmissionCalc}
          className={`relative w-11 h-6 rounded-full transition-colors shrink-0 ${settings.autoEmissionCalc ? 'bg-forest-500' : 'bg-ink/15'}`}
        >
          <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${settings.autoEmissionCalc ? 'translate-x-5' : ''}`} />
        </button>
      </Card>

      <Card>
        <div className="flex items-center justify-between mb-3 flex-wrap gap-3">
          <Select
            value={deptFilter}
            onChange={(e) => setDeptFilter(e.target.value)}
            options={['All', ...departments.map((d) => d.name)]}
            label="Filter by department"
          />
        </div>
        <DataTable columns={columns} rows={rows} searchKeys={['id', 'department', 'source', 'linkedRecord']} />
      </Card>
    </div>
  )
}
