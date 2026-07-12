import React from 'react'
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell } from 'recharts'
import PageHeader from '../../components/common/PageHeader.jsx'
import Card from '../../components/common/Card.jsx'
import ProgressBar from '../../components/common/ProgressBar.jsx'
import { carbonTransactions, departments } from '../../data/mockData.js'

const PALETTE = ['#1F6F4A', '#3B4B5C', '#B5563A', '#E8A33D', '#4C9A73', '#5C7085']

export default function DepartmentCarbonTracking() {
  const byDept = departments.map((d) => ({
    department: d.name,
    emissions: carbonTransactions.filter((t) => t.department === d.name).reduce((s, t) => s + t.emissions, 0),
  })).sort((a, b) => b.emissions - a.emissions)

  const max = Math.max(...byDept.map((d) => d.emissions), 1)

  return (
    <div>
      <PageHeader
        eyebrow="Environmental · Analysis"
        title="Department Carbon Tracking"
        description="Compare emissions footprint across departments to prioritize reduction efforts."
      />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2">
          <p className="text-sm font-semibold text-ink mb-3">Emissions by Department (kg CO2e)</p>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={byDept} layout="vertical" margin={{ left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E5DC" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 11, fill: '#5C7085' }} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="department" tick={{ fontSize: 12, fill: '#141A17' }} axisLine={false} tickLine={false} width={130} />
              <Tooltip contentStyle={{ borderRadius: 10, border: '1px solid #E2E5DC', fontSize: 12 }} />
              <Bar dataKey="emissions" radius={[0, 6, 6, 0]}>
                {byDept.map((_, i) => <Cell key={i} fill={PALETTE[i % PALETTE.length]} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <p className="text-sm font-semibold text-ink mb-3">Share of Total Footprint</p>
          <div className="space-y-4">
            {byDept.map((d, i) => (
              <div key={d.department}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-ink/70">{d.department}</span>
                  <span className="font-medium text-ink">{d.emissions.toLocaleString()} kg</span>
                </div>
                <ProgressBar value={d.emissions} max={max} color={PALETTE[i % PALETTE.length]} />
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
