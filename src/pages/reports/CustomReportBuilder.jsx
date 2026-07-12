import React, { useState } from 'react'
import { Download, FileSpreadsheet, FileText, FileJson } from 'lucide-react'
import PageHeader from '../../components/common/PageHeader.jsx'
import Card from '../../components/common/Card.jsx'
import Button from '../../components/common/Button.jsx'
import { departments, employees, challenges, categories } from '../../data/mockData.js'

const MODULES = ['Environmental', 'Social', 'Governance', 'Gamification']

export default function CustomReportBuilder() {
  const [filters, setFilters] = useState({
    department: 'All', dateFrom: '', dateTo: '', module: 'All', employee: 'All', challenge: 'All', esgCategory: 'All',
  })
  const [format, setFormat] = useState('PDF')

  const set = (key) => (e) => setFilters((f) => ({ ...f, [key]: e.target.value }))

  const activeFilters = Object.entries(filters).filter(([, v]) => v && v !== 'All')

  return (
    <div>
      <PageHeader
        eyebrow="Reports"
        title="Custom Report Builder"
        description="Combine filters below to build a tailored report, then export it."
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2">
          <p className="text-sm font-semibold text-ink mb-4">Filters</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-ink/60 font-medium block mb-1">Department</label>
              <select value={filters.department} onChange={set('department')} className="w-full px-3 py-2 text-sm rounded-lg border border-ink/10 outline-none focus-ring">
                <option>All</option>{departments.map((d) => <option key={d.id}>{d.name}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs text-ink/60 font-medium block mb-1">Module</label>
              <select value={filters.module} onChange={set('module')} className="w-full px-3 py-2 text-sm rounded-lg border border-ink/10 outline-none focus-ring">
                <option>All</option>{MODULES.map((m) => <option key={m}>{m}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs text-ink/60 font-medium block mb-1">Date From</label>
              <input type="date" value={filters.dateFrom} onChange={set('dateFrom')} className="w-full px-3 py-2 text-sm rounded-lg border border-ink/10 outline-none focus-ring" />
            </div>
            <div>
              <label className="text-xs text-ink/60 font-medium block mb-1">Date To</label>
              <input type="date" value={filters.dateTo} onChange={set('dateTo')} className="w-full px-3 py-2 text-sm rounded-lg border border-ink/10 outline-none focus-ring" />
            </div>
            <div>
              <label className="text-xs text-ink/60 font-medium block mb-1">Employee</label>
              <select value={filters.employee} onChange={set('employee')} className="w-full px-3 py-2 text-sm rounded-lg border border-ink/10 outline-none focus-ring">
                <option>All</option>{employees.map((e) => <option key={e.id}>{e.name}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs text-ink/60 font-medium block mb-1">Challenge</label>
              <select value={filters.challenge} onChange={set('challenge')} className="w-full px-3 py-2 text-sm rounded-lg border border-ink/10 outline-none focus-ring">
                <option>All</option>{challenges.map((c) => <option key={c.id}>{c.title}</option>)}
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className="text-xs text-ink/60 font-medium block mb-1">ESG Category</label>
              <select value={filters.esgCategory} onChange={set('esgCategory')} className="w-full px-3 py-2 text-sm rounded-lg border border-ink/10 outline-none focus-ring">
                <option>All</option>{categories.map((c) => <option key={c.id}>{c.name}</option>)}
              </select>
            </div>
          </div>
        </Card>

        <Card>
          <p className="text-sm font-semibold text-ink mb-3">Summary</p>
          {activeFilters.length === 0 ? (
            <p className="text-xs text-ink/45">No filters applied — report will include all records.</p>
          ) : (
            <div className="flex flex-wrap gap-1.5 mb-4">
              {activeFilters.map(([k, v]) => (
                <span key={k} className="text-[11px] px-2 py-1 rounded-full bg-forest-500/10 text-forest-700 font-medium capitalize">
                  {k}: {v}
                </span>
              ))}
            </div>
          )}

          <p className="text-xs text-ink/60 font-medium mb-2 mt-4">Export Format</p>
          <div className="grid grid-cols-3 gap-2 mb-4">
            {[{ f: 'PDF', icon: FileText }, { f: 'Excel', icon: FileSpreadsheet }, { f: 'CSV', icon: FileJson }].map(({ f, icon: Icon }) => (
              <button
                key={f}
                onClick={() => setFormat(f)}
                className={`flex flex-col items-center gap-1 py-2.5 rounded-lg border text-xs font-medium transition-colors ${
                  format === f ? 'border-forest-500 bg-forest-500/10 text-forest-700' : 'border-ink/10 text-ink/50 hover:bg-ink/[0.03]'
                }`}
              >
                <Icon size={16} />{f}
              </button>
            ))}
          </div>
          <Button icon={Download} className="w-full justify-center">Export Report</Button>
        </Card>
      </div>
    </div>
  )
}
