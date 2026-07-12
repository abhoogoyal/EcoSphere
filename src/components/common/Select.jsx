import React from 'react'
import { ChevronDown } from 'lucide-react'

export default function Select({ value, onChange, options, label, className = '' }) {
  return (
    <label className={`text-xs text-ink/60 font-medium ${className}`}>
      {label && <span className="block mb-1">{label}</span>}
      <div className="relative">
        <select
          value={value}
          onChange={onChange}
          className="appearance-none w-full pl-3 pr-8 py-2 text-sm rounded-lg border border-ink/10 bg-white text-ink focus-ring focus:border-forest-500/50 outline-none"
        >
          {options.map((opt) => (
            <option key={opt.value ?? opt} value={opt.value ?? opt}>{opt.label ?? opt}</option>
          ))}
        </select>
        <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-ink/40 pointer-events-none" />
      </div>
    </label>
  )
}
