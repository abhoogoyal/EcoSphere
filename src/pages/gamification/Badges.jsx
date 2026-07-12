import React from 'react'
import { Sprout, Zap, HeartHandshake, ShieldCheck, Trophy, Award } from 'lucide-react'
import PageHeader from '../../components/common/PageHeader.jsx'
import Card from '../../components/common/Card.jsx'
import { badges } from '../../data/mockData.js'
import { useApp } from '../../context/AppContext.jsx'

const ICONS = { Sprout, Zap, HeartHandshake, ShieldCheck, Trophy }

export default function Badges() {
  const { settings, toggleSetting } = useApp()

  return (
    <div>
      <PageHeader
        eyebrow="Gamification"
        title="Badges"
        description="Employee achievements unlocked automatically when tracked metrics satisfy the badge's rule."
      />

      <Card className="mb-4 flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-amber-500/10 text-amber-600 flex items-center justify-center">
            <Award size={17} />
          </div>
          <div>
            <p className="text-sm font-medium text-ink">Badge Auto-Award</p>
            <p className="text-xs text-ink/50">Automatically assign a badge the moment an employee's tracked metric satisfies its unlock rule.</p>
          </div>
        </div>
        <button
          onClick={() => toggleSetting('badgeAutoAward')}
          role="switch"
          aria-checked={settings.badgeAutoAward}
          className={`relative w-11 h-6 rounded-full transition-colors shrink-0 ${settings.badgeAutoAward ? 'bg-forest-500' : 'bg-ink/15'}`}
        >
          <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${settings.badgeAutoAward ? 'translate-x-5' : ''}`} />
        </button>
      </Card>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {badges.map((b) => {
          const Icon = ICONS[b.icon] || Award
          return (
            <Card key={b.id} className="text-center">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 text-white flex items-center justify-center shadow-md">
                <Icon size={24} />
              </div>
              <p className="font-display font-semibold text-ink mt-3 text-sm">{b.name}</p>
              <p className="text-xs text-ink/50 mt-1 leading-snug">{b.description}</p>
              <p className="text-[10px] text-ink/35 mt-2 font-mono">{b.unlockRule}</p>
              <p className="text-[11px] text-forest-600 font-medium mt-2">{b.unlockedBy} employees unlocked</p>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
