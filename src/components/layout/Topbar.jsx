import React, { useState } from 'react'
import { Menu, Bell, Search } from 'lucide-react'
import { useApp } from '../../context/AppContext.jsx'
import { departmentScores, overallScore } from '../../data/mockData.js'

export default function Topbar({ title }) {
  const { setMobileNavOpen, notifications, unreadCount, markAllRead } = useApp()
  const [showNotifs, setShowNotifs] = useState(false)
  const scores = overallScore(departmentScores)

  return (
    <header className="sticky top-0 z-20 h-16 bg-paper/85 backdrop-blur border-b border-ink/[0.06] flex items-center gap-3 px-4 sm:px-6">
      <button onClick={() => setMobileNavOpen(true)} className="lg:hidden text-ink/60 -ml-1">
        <Menu size={20} />
      </button>

      <div>
        <p className="text-xs text-ink/40 leading-none">Overview</p>
        <h2 className="font-display font-semibold text-ink text-[15px] mt-0.5">{title || 'Dashboard'}</h2>
      </div>

      <div className="hidden md:flex items-center gap-2 ml-4 flex-1 max-w-sm">
        <div className="relative w-full">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink/35" />
          <input
            placeholder="Search departments, policies, employees..."
            className="w-full pl-8 pr-3 py-2 text-sm rounded-lg border border-ink/10 bg-white/70 focus-ring focus:border-forest-500/50 outline-none"
          />
        </div>
      </div>

      <div className="ml-auto flex items-center gap-3 sm:gap-4">
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-ink/[0.06] text-xs">
          <span className="w-1.5 h-1.5 rounded-full bg-forest-500" />
          <span className="text-ink/50">Overall ESG</span>
          <span className="font-semibold text-ink">{scores.total}</span>
        </div>

        <div className="relative">
          <button
            onClick={() => setShowNotifs((s) => !s)}
            className="relative p-2 rounded-lg hover:bg-ink/[0.05] text-ink/60"
          >
            <Bell size={18} />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-paper" />
            )}
          </button>
          {showNotifs && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setShowNotifs(false)} />
              <div className="absolute right-0 mt-2 w-80 bg-white border border-ink/[0.08] rounded-xl2 shadow-xl z-20 max-h-96 overflow-y-auto">
                <div className="flex items-center justify-between px-4 py-3 border-b border-ink/[0.06]">
                  <p className="text-sm font-semibold text-ink">Notifications</p>
                  <button onClick={markAllRead} className="text-xs text-forest-600 hover:underline">Mark all read</button>
                </div>
                {notifications.map((n) => (
                  <div key={n.id} className={`px-4 py-3 border-b border-ink/[0.05] last:border-0 ${!n.read ? 'bg-forest-500/[0.04]' : ''}`}>
                    <p className="text-xs text-ink/80 leading-snug">{n.message}</p>
                    <p className="text-[10px] text-ink/40 mt-1">{n.time}</p>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        <div className="w-8 h-8 rounded-full bg-forest-500 text-white flex items-center justify-center text-xs font-semibold shrink-0">
          SA
        </div>
      </div>
    </header>
  )
}
