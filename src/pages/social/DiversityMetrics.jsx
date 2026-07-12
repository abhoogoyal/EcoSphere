import React from 'react'
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts'
import PageHeader from '../../components/common/PageHeader.jsx'
import Card from '../../components/common/Card.jsx'
import StatCard from '../../components/common/StatCard.jsx'
import { diversityMetrics } from '../../data/mockData.js'
import { Scale, Users } from 'lucide-react'

const GENDER_COLORS = ['#3B4B5C', '#B5563A', '#E8A33D']

export default function DiversityMetrics() {
  const { genderSplit, ageGroups, leadershipDiversity, payEquityRatio } = diversityMetrics

  return (
    <div>
      <PageHeader
        eyebrow="Social"
        title="Diversity Metrics"
        description="Workforce composition and equity indicators reported for social ESG performance."
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <StatCard icon={Users} label="Leadership Diversity" value={`${leadershipDiversity}%`} sublabel="Underrepresented groups in leadership" tone="rose" />
        <StatCard icon={Scale} label="Pay Equity Ratio" value={payEquityRatio} sublabel="Median pay ratio, like-for-like roles" tone="slate" />
        <StatCard label="Gender Split (Women)" value={`${genderSplit[1].value}%`} sublabel="Of total workforce" tone="forest" />
        <StatCard label="Age Diversity" value={`${ageGroups[0].pct + ageGroups[1].pct}%`} sublabel="Workforce under 40" tone="amber" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <p className="text-sm font-semibold text-ink mb-3">Gender Composition</p>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={genderSplit} dataKey="value" nameKey="name" innerRadius={50} outerRadius={80} paddingAngle={3}>
                {genderSplit.map((_, i) => <Cell key={i} fill={GENDER_COLORS[i]} />)}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: 10, border: '1px solid #E2E5DC', fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-4 mt-1 flex-wrap">
            {genderSplit.map((g, i) => (
              <div key={g.name} className="flex items-center gap-1.5 text-xs">
                <span className="w-2 h-2 rounded-full" style={{ background: GENDER_COLORS[i] }} />
                <span className="text-ink/60">{g.name} · {g.value}%</span>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <p className="text-sm font-semibold text-ink mb-3">Age Distribution</p>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={ageGroups}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E5DC" vertical={false} />
              <XAxis dataKey="group" tick={{ fontSize: 12, fill: '#5C7085' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: '#5C7085' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 10, border: '1px solid #E2E5DC', fontSize: 12 }} />
              <Bar dataKey="pct" fill="#B5563A" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  )
}
