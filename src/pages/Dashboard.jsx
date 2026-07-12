import React from 'react'
import { Flame, Users, ShieldAlert, Trophy, TrendingDown, ArrowUpRight } from 'lucide-react'
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  BarChart, Bar, Legend,
} from 'recharts'
import PageHeader from '../components/common/PageHeader.jsx'
import Card from '../components/common/Card.jsx'
import StatCard from '../components/common/StatCard.jsx'
import ScoreRing from '../components/common/ScoreRing.jsx'
import StatusPill from '../components/common/StatusPill.jsx'
import {
  departmentScores, overallScore, emissionTrend, carbonTransactions,
  complianceIssues, challenges, employees, orgWeighting,
} from '../data/mockData.js'

export default function Dashboard() {
  const scores = overallScore(departmentScores, orgWeighting)
  const totalEmissions = carbonTransactions.reduce((s, t) => s + t.emissions, 0)
  const openIssues = complianceIssues.filter((c) => c.status === 'Open').length
  const activeChallenges = challenges.filter((c) => c.status === 'Active').length
  const topEmployee = [...employees].sort((a, b) => b.xp - a.xp)[0]

  return (
    <div>
      <PageHeader
        eyebrow="Organization Overview"
        title="ESG Performance Dashboard"
        description="A unified view of environmental, social, governance and gamification activity across your organization."
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <Card className="lg:col-span-1">
          <ScoreRing scores={scores} />
          <p className="text-xs text-ink/45 mt-4">
            Weighted {orgWeighting.environmental}% Environmental / {orgWeighting.social}% Social / {orgWeighting.governance}% Governance
          </p>
        </Card>

        <div className="lg:col-span-2 grid grid-cols-2 gap-4">
          <StatCard icon={Flame} label="Emissions (MTD)" value={`${(totalEmissions / 1000).toFixed(1)}t`} sublabel="CO2e across all scopes" trend="-6.2% vs last month" tone="forest" />
          <StatCard icon={ShieldAlert} label="Open Compliance Issues" value={openIssues} sublabel={`${complianceIssues.length} total logged`} tone="rose" />
          <StatCard icon={Trophy} label="Active Challenges" value={activeChallenges} sublabel={`${challenges.length} total this cycle`} tone="amber" />
          <StatCard icon={Users} label="Top Contributor" value={topEmployee.name.split(' ')[0]} sublabel={`${topEmployee.xp.toLocaleString()} XP earned`} tone="slate" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm font-semibold text-ink">Emissions by Scope</p>
              <p className="text-xs text-ink/45">Monthly trend, kg CO2e</p>
            </div>
            <span className="inline-flex items-center gap-1 text-xs text-forest-600 font-medium">
              <TrendingDown size={13} /> Trending down
            </span>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={emissionTrend}>
              <defs>
                <linearGradient id="s1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#1F6F4A" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#1F6F4A" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="s2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B4B5C" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3B4B5C" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="s3" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#B5563A" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#B5563A" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E5DC" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#5C7085' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: '#5C7085' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 10, border: '1px solid #E2E5DC', fontSize: 12 }} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Area type="monotone" dataKey="scope1" name="Scope 1" stroke="#1F6F4A" fill="url(#s1)" strokeWidth={2} />
              <Area type="monotone" dataKey="scope2" name="Scope 2" stroke="#3B4B5C" fill="url(#s2)" strokeWidth={2} />
              <Area type="monotone" dataKey="scope3" name="Scope 3" stroke="#B5563A" fill="url(#s3)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <p className="text-sm font-semibold text-ink mb-1">Recent Compliance Issues</p>
          <p className="text-xs text-ink/45 mb-3">Requires owner attention</p>
          <div className="space-y-3">
            {complianceIssues.slice(0, 4).map((issue) => (
              <div key={issue.id} className="flex items-start justify-between gap-2 pb-3 border-b border-ink/[0.05] last:border-0 last:pb-0">
                <div className="min-w-0">
                  <p className="text-xs text-ink/80 leading-snug line-clamp-2">{issue.description}</p>
                  <p className="text-[11px] text-ink/40 mt-1">Owner: {issue.owner} · Due {issue.dueDate}</p>
                </div>
                <StatusPill status={issue.severity} />
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2">
          <p className="text-sm font-semibold text-ink mb-1">Department ESG Scores</p>
          <p className="text-xs text-ink/45 mb-3">Environmental · Social · Governance, per department</p>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={departmentScores} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E5DC" vertical={false} />
              <XAxis dataKey="department" tick={{ fontSize: 11, fill: '#5C7085' }} axisLine={false} tickLine={false} interval={0} angle={-15} textAnchor="end" height={60} />
              <YAxis tick={{ fontSize: 12, fill: '#5C7085' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 10, border: '1px solid #E2E5DC', fontSize: 12 }} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Bar dataKey="environmental" name="Environmental" fill="#1F6F4A" radius={[4, 4, 0, 0]} />
              <Bar dataKey="social" name="Social" fill="#B5563A" radius={[4, 4, 0, 0]} />
              <Bar dataKey="governance" name="Governance" fill="#3B4B5C" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-semibold text-ink">Department Rankings</p>
            <ArrowUpRight size={14} className="text-ink/30" />
          </div>
          <div className="space-y-2.5">
            {[...departmentScores].sort((a, b) => b.total - a.total).map((d, i) => (
              <div key={d.department} className="flex items-center gap-3">
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-semibold shrink-0 ${i === 0 ? 'bg-amber-500 text-white' : 'bg-ink/[0.06] text-ink/60'}`}>
                  {i + 1}
                </span>
                <span className="text-sm text-ink/80 flex-1 truncate">{d.department}</span>
                <span className="text-sm font-semibold text-ink">{d.total}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
