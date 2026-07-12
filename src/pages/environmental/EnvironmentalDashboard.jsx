import React from 'react'
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, LineChart, Line, XAxis, YAxis, CartesianGrid, Legend } from 'recharts'
import { Flame, Fuel, Target, TrendingDown } from 'lucide-react'
import PageHeader from '../../components/common/PageHeader.jsx'
import Card from '../../components/common/Card.jsx'
import StatCard from '../../components/common/StatCard.jsx'
import { carbonTransactions, emissionTrend, environmentalGoals } from '../../data/mockData.js'

const SCOPE_COLORS = { 'Scope 1': '#1F6F4A', 'Scope 2': '#3B4B5C', 'Scope 3': '#B5563A' }

export default function EnvironmentalDashboard() {
  const totalEmissions = carbonTransactions.reduce((s, t) => s + t.emissions, 0)
  const onTrackGoals = environmentalGoals.filter((g) => g.status === 'On Track').length
  const atRiskGoals = environmentalGoals.filter((g) => g.status === 'At Risk').length

  const scopeTotals = emissionTrend.length
    ? [
        { name: 'Scope 1', value: emissionTrend.at(-1).scope1 },
        { name: 'Scope 2', value: emissionTrend.at(-1).scope2 },
        { name: 'Scope 3', value: emissionTrend.at(-1).scope3 },
      ]
    : []

  return (
    <div>
      <PageHeader
        eyebrow="Environmental"
        title="Environmental Dashboard"
        description="Live view of carbon performance, sustainability goal progress and emissions composition."
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <StatCard icon={Flame} label="Total Emissions" value={`${(totalEmissions / 1000).toFixed(1)}t`} sublabel="CO2e this period" tone="forest" />
        <StatCard icon={Fuel} label="Transactions Logged" value={carbonTransactions.length} sublabel="This billing cycle" tone="slate" />
        <StatCard icon={Target} label="Goals On Track" value={onTrackGoals} sublabel={`of ${environmentalGoals.length} active goals`} tone="forest" />
        <StatCard icon={TrendingDown} label="Goals At Risk" value={atRiskGoals} sublabel="Need attention" tone="rose" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2">
          <p className="text-sm font-semibold text-ink mb-3">Emissions Trend by Scope</p>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={emissionTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E5DC" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#5C7085' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: '#5C7085' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 10, border: '1px solid #E2E5DC', fontSize: 12 }} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Line type="monotone" dataKey="scope1" name="Scope 1" stroke="#1F6F4A" strokeWidth={2.5} dot={false} />
              <Line type="monotone" dataKey="scope2" name="Scope 2" stroke="#3B4B5C" strokeWidth={2.5} dot={false} />
              <Line type="monotone" dataKey="scope3" name="Scope 3" stroke="#B5563A" strokeWidth={2.5} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <p className="text-sm font-semibold text-ink mb-3">Current Scope Composition</p>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={scopeTotals} dataKey="value" nameKey="name" innerRadius={55} outerRadius={80} paddingAngle={3}>
                {scopeTotals.map((s) => <Cell key={s.name} fill={SCOPE_COLORS[s.name]} />)}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: 10, border: '1px solid #E2E5DC', fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-4 mt-1">
            {scopeTotals.map((s) => (
              <div key={s.name} className="flex items-center gap-1.5 text-xs">
                <span className="w-2 h-2 rounded-full" style={{ background: SCOPE_COLORS[s.name] }} />
                <span className="text-ink/60">{s.name}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
