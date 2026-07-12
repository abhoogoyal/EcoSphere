import React from 'react'
import { Settings2 } from 'lucide-react'
import PageHeader from '../../components/common/PageHeader.jsx'
import Card from '../../components/common/Card.jsx'
import Toggle from '../../components/common/Toggle.jsx'
import { useApp } from '../../context/AppContext.jsx'

export default function ESGConfiguration() {
  const { weighting, setWeighting, settings, toggleSetting } = useApp()

  const total = weighting.environmental + weighting.social + weighting.governance

  const update = (key) => (e) => setWeighting((w) => ({ ...w, [key]: Number(e.target.value) }))

  return (
    <div>
      <PageHeader
        eyebrow="Settings & Administration"
        title="ESG Configuration"
        description="Configure how the Overall ESG Score is weighted and which automation rules are active."
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <div className="flex items-center gap-2.5 mb-1">
            <div className="w-9 h-9 rounded-lg bg-forest-500/10 text-forest-600 flex items-center justify-center">
              <Settings2 size={17} />
            </div>
            <div>
              <p className="text-sm font-semibold text-ink">Score Weighting</p>
              <p className="text-xs text-ink/50">Default: 40% Environmental / 30% Social / 30% Governance</p>
            </div>
          </div>

          <div className="space-y-5 mt-5">
            {[
              { key: 'environmental', label: 'Environmental', color: '#1F6F4A' },
              { key: 'social', label: 'Social', color: '#B5563A' },
              { key: 'governance', label: 'Governance', color: '#3B4B5C' },
            ].map(({ key, label, color }) => (
              <div key={key}>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="text-ink/70">{label}</span>
                  <span className="font-semibold text-ink">{weighting[key]}%</span>
                </div>
                <input
                  type="range" min={0} max={100} value={weighting[key]} onChange={update(key)}
                  className="w-full accent-forest-500" style={{ accentColor: color }}
                />
              </div>
            ))}
          </div>

          <p className={`text-xs mt-4 font-medium ${total === 100 ? 'text-forest-600' : 'text-rose-600'}`}>
            Total weighting: {total}% {total !== 100 && '— must equal 100%'}
          </p>
        </Card>

        <Card>
          <p className="text-sm font-semibold text-ink mb-1">Business Rules</p>
          <p className="text-xs text-ink/50 mb-1">Toggle core automation used across the platform.</p>
          <div className="divide-y divide-ink/[0.05]">
            <Toggle
              checked={settings.autoEmissionCalc}
              onChange={() => toggleSetting('autoEmissionCalc')}
              label="Auto Emission Calculation"
              description="Carbon Transactions are calculated automatically from linked ERP records."
            />
            <Toggle
              checked={settings.evidenceRequired}
              onChange={() => toggleSetting('evidenceRequired')}
              label="Evidence Requirement"
              description="CSR participation cannot be Approved without an attached proof file."
            />
            <Toggle
              checked={settings.badgeAutoAward}
              onChange={() => toggleSetting('badgeAutoAward')}
              label="Badge Auto-Award"
              description="Badges are assigned automatically when an employee's metrics satisfy the unlock rule."
            />
          </div>
        </Card>
      </div>
    </div>
  )
}
