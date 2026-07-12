import React from 'react'
import { NavLink } from 'react-router-dom'
import { Leaf, ChevronsLeft, ChevronsRight, X } from 'lucide-react'
import { navGroups } from './navConfig.js'
import { useApp } from '../../context/AppContext.jsx'

export default function Sidebar() {
  const { sidebarCollapsed, setSidebarCollapsed, mobileNavOpen, setMobileNavOpen } = useApp()

  const content = (
    <div className="flex flex-col h-full">
      <div className={`flex items-center gap-2.5 px-4 h-16 shrink-0 border-b border-white/[0.06] ${sidebarCollapsed ? 'justify-center' : ''}`}>
        <div className="w-8 h-8 rounded-lg bg-forest-500 flex items-center justify-center shrink-0">
          <Leaf size={17} className="text-white" />
        </div>
        {!sidebarCollapsed && (
          <div className="leading-tight">
            <p className="font-display font-semibold text-white text-[15px]">EcoSphere</p>
            <p className="text-[10px] text-white/40 uppercase tracking-wider">ESG Platform</p>
          </div>
        )}
        <button
          onClick={() => setMobileNavOpen(false)}
          className="ml-auto lg:hidden text-white/60 hover:text-white"
        >
          <X size={18} />
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto px-2.5 py-4 space-y-5">
        {navGroups.map((group) => (
          <div key={group.label}>
            {!sidebarCollapsed && (
              <p className="px-2.5 text-[10px] font-semibold uppercase tracking-wider text-white/35 mb-1.5">
                {group.label}
              </p>
            )}
            <div className="space-y-0.5">
              {group.items.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === '/'}
                  onClick={() => setMobileNavOpen(false)}
                  title={sidebarCollapsed ? item.label : undefined}
                  className={({ isActive }) =>
                    `flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm transition-colors group ${
                      isActive
                        ? 'bg-forest-500/15 text-white font-medium'
                        : 'text-white/60 hover:text-white hover:bg-white/[0.06]'
                    } ${sidebarCollapsed ? 'justify-center' : ''}`
                  }
                >
                  <item.icon size={16} className="shrink-0" />
                  {!sidebarCollapsed && <span className="truncate">{item.label}</span>}
                </NavLink>
              ))}
            </div>
          </div>
        ))}
      </nav>

      <button
        onClick={() => setSidebarCollapsed((c) => !c)}
        className="hidden lg:flex items-center gap-2 px-4 h-12 border-t border-white/[0.06] text-white/50 hover:text-white text-xs shrink-0"
      >
        {sidebarCollapsed ? <ChevronsRight size={16} /> : <><ChevronsLeft size={16} /><span>Collapse</span></>}
      </button>
    </div>
  )

  return (
    <>
      {/* Desktop sidebar — dynamic width */}
      <aside
        className={`hidden lg:flex flex-col fixed inset-y-0 left-0 bg-canopy-900 z-30 transition-[width] duration-200 ${
          sidebarCollapsed ? 'w-[68px]' : 'w-[248px]'
        }`}
      >
        {content}
      </aside>

      {/* Mobile drawer */}
      {mobileNavOpen && (
        <div className="lg:hidden fixed inset-0 z-40">
          <div className="absolute inset-0 bg-ink/50" onClick={() => setMobileNavOpen(false)} />
          <aside className="absolute inset-y-0 left-0 w-[260px] bg-canopy-900">{content}</aside>
        </div>
      )}
    </>
  )
}
