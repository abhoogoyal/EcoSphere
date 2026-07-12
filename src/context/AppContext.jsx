import React, { createContext, useContext, useMemo, useState } from 'react'
import { notifications as initialNotifications, orgWeighting } from '../data/mockData.js'

const AppContext = createContext(null)

export function AppProvider({ children }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const [notifications, setNotifications] = useState(initialNotifications)
  const [weighting, setWeighting] = useState(orgWeighting)
  const [settings, setSettings] = useState({
    autoEmissionCalc: true,
    evidenceRequired: true,
    badgeAutoAward: true,
    notifyCompliance: true,
    notifyApprovals: true,
    notifyPolicyReminders: true,
    notifyBadgeUnlocks: true,
    notifyChannelInApp: true,
    notifyChannelEmail: true,
  })

  const unreadCount = useMemo(() => notifications.filter((n) => !n.read).length, [notifications])

  const markAllRead = () => setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  const toggleSetting = (key) => setSettings((prev) => ({ ...prev, [key]: !prev[key] }))

  const value = {
    sidebarCollapsed,
    setSidebarCollapsed,
    mobileNavOpen,
    setMobileNavOpen,
    notifications,
    unreadCount,
    markAllRead,
    weighting,
    setWeighting,
    settings,
    toggleSetting,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
