import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from './Sidebar.jsx'
import Topbar from './Topbar.jsx'
import { useApp } from '../../context/AppContext.jsx'
import { navGroups } from './navConfig.js'

function currentTitle(pathname) {
  for (const group of navGroups) {
    for (const item of group.items) {
      if (item.to === pathname) return item.label
    }
  }
  return 'Dashboard'
}

export default function Layout() {
  const { sidebarCollapsed } = useApp()
  const { pathname } = useLocation()

  return (
    <div className="min-h-screen bg-paper">
      <Sidebar />
      <div className={`transition-[margin] duration-200 ${sidebarCollapsed ? 'lg:ml-[68px]' : 'lg:ml-[248px]'}`}>
        <Topbar title={currentTitle(pathname)} />
        <main className="px-4 sm:px-6 py-6 max-w-[1400px]">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
