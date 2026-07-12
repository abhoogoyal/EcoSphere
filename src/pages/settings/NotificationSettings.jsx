import React from 'react'
import PageHeader from '../../components/common/PageHeader.jsx'
import Card from '../../components/common/Card.jsx'
import Toggle from '../../components/common/Toggle.jsx'
import { useApp } from '../../context/AppContext.jsx'

export default function NotificationSettings() {
  const { settings, toggleSetting } = useApp()

  return (
    <div>
      <PageHeader
        eyebrow="Settings & Administration"
        title="Notification Settings"
        description="Configure which events trigger notifications, and through which channels."
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <p className="text-sm font-semibold text-ink mb-1">Notify me when...</p>
          <div className="divide-y divide-ink/[0.05]">
            <Toggle checked={settings.notifyCompliance} onChange={() => toggleSetting('notifyCompliance')} label="New compliance issue raised" />
            <Toggle checked={settings.notifyApprovals} onChange={() => toggleSetting('notifyApprovals')} label="CSR / Challenge approval decisions" />
            <Toggle checked={settings.notifyPolicyReminders} onChange={() => toggleSetting('notifyPolicyReminders')} label="Policy acknowledgement reminders" />
            <Toggle checked={settings.notifyBadgeUnlocks} onChange={() => toggleSetting('notifyBadgeUnlocks')} label="Badge unlocks" />
          </div>
        </Card>

        <Card>
          <p className="text-sm font-semibold text-ink mb-1">Delivery Channels</p>
          <div className="divide-y divide-ink/[0.05]">
            <Toggle checked={settings.notifyChannelInApp} onChange={() => toggleSetting('notifyChannelInApp')} label="In-app notifications" description="Shown in the notification bell" />
            <Toggle checked={settings.notifyChannelEmail} onChange={() => toggleSetting('notifyChannelEmail')} label="Email notifications" description="Sent to your registered work email" />
          </div>
        </Card>
      </div>
    </div>
  )
}
