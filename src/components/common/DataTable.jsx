import React, { useMemo, useState } from 'react'
import { Search, ChevronUp, ChevronDown, Inbox } from 'lucide-react'

export default function DataTable({ columns, rows, searchable = true, searchKeys, pageSize = 8, emptyMessage = 'No records found.' }) {
  const [query, setQuery] = useState('')
  const [sortKey, setSortKey] = useState(null)
  const [sortDir, setSortDir] = useState('asc')
  const [page, setPage] = useState(1)

  const keys = searchKeys || columns.map((c) => c.key)

  const filtered = useMemo(() => {
    let data = rows
    if (query.trim()) {
      const q = query.toLowerCase()
      data = data.filter((row) => keys.some((k) => String(row[k] ?? '').toLowerCase().includes(q)))
    }
    if (sortKey) {
      data = [...data].sort((a, b) => {
        const av = a[sortKey]
        const bv = b[sortKey]
        if (typeof av === 'number' && typeof bv === 'number') return sortDir === 'asc' ? av - bv : bv - av
        return sortDir === 'asc' ? String(av).localeCompare(String(bv)) : String(bv).localeCompare(String(av))
      })
    }
    return data
  }, [rows, query, sortKey, sortDir, keys])

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize))
  const pageRows = filtered.slice((page - 1) * pageSize, page * pageSize)

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortKey(key)
      setSortDir('asc')
    }
  }

  return (
    <div>
      {searchable && (
        <div className="flex items-center gap-2 mb-3">
          <div className="relative w-full sm:w-72">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink/35" />
            <input
              value={query}
              onChange={(e) => { setQuery(e.target.value); setPage(1) }}
              placeholder="Search..."
              className="w-full pl-8 pr-3 py-2 text-sm rounded-lg border border-ink/10 bg-white focus-ring focus:border-forest-500/50 outline-none"
            />
          </div>
          <span className="text-xs text-ink/40">{filtered.length} record{filtered.length !== 1 ? 's' : ''}</span>
        </div>
      )}
      <div className="overflow-x-auto rounded-xl2 border border-ink/[0.06] bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-canopy-900/[0.03] border-b border-ink/[0.06]">
              {columns.map((col) => (
                <th
                  key={col.key}
                  onClick={() => col.sortable !== false && handleSort(col.key)}
                  className={`text-left px-4 py-3 font-medium text-ink/55 text-xs uppercase tracking-wide whitespace-nowrap ${col.sortable !== false ? 'cursor-pointer select-none hover:text-ink/80' : ''}`}
                >
                  <span className="inline-flex items-center gap-1">
                    {col.label}
                    {sortKey === col.key && (sortDir === 'asc' ? <ChevronUp size={12} /> : <ChevronDown size={12} />)}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pageRows.length === 0 && (
              <tr>
                <td colSpan={columns.length} className="px-4 py-12 text-center text-ink/40">
                  <Inbox size={22} className="mx-auto mb-2 opacity-50" />
                  {emptyMessage}
                </td>
              </tr>
            )}
            {pageRows.map((row, i) => (
              <tr key={row.id || i} className="border-b border-ink/[0.05] last:border-0 hover:bg-canopy-900/[0.02] transition-colors">
                {columns.map((col) => (
                  <td key={col.key} className="px-4 py-3 text-ink/80 whitespace-nowrap">
                    {col.render ? col.render(row[col.key], row) : row[col.key] ?? '—'}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-3 text-xs text-ink/50">
          <span>Page {page} of {totalPages}</span>
          <div className="flex gap-1.5">
            <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1} className="px-2.5 py-1 rounded-md border border-ink/10 disabled:opacity-40 hover:bg-ink/[0.03]">Prev</button>
            <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="px-2.5 py-1 rounded-md border border-ink/10 disabled:opacity-40 hover:bg-ink/[0.03]">Next</button>
          </div>
        </div>
      )}
    </div>
  )
}
