import React from 'react'
import { BellRing } from 'lucide-react'
import PageHeader from '../../components/common/PageHeader.jsx'
import Card from '../../components/common/Card.jsx'
import DataTable from '../../components/common/DataTable.jsx'
import StatusPill from '../../components/common/StatusPill.jsx'
import Button from '../../components/common/Button.jsx'
import { policyAcknowledgements } from '../../data/mockData.js'

export default function PolicyAcknowledgements() {
  const pending = policyAcknowledgements.filter((p) => p.status !== 'Acknowledged').length

  const columns = [
    { key: 'policy', label: 'Policy' },
    { key: 'employee', label: 'Employee' },
    { key: 'date', label: 'Acknowledged On', render: (v) => v || '—' },
    { key: 'status', label: 'Status', render: (v) => <StatusPill status={v} /> },
  ]

  return (
    <div>
      <PageHeader
        eyebrow="Governance"
        title="Policy Acknowledgements"
        description="Track which employees have acknowledged published ESG policies."
        action={<Button icon={BellRing} variant="secondary">Send Reminders ({pending})</Button>}
      />
      <Card>
        <DataTable columns={columns} rows={policyAcknowledgements} searchKeys={['policy', 'employee']} />
      </Card>
    </div>
  )
}
