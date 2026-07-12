import React, { useState } from 'react'
import { Plus, Gift, Coins } from 'lucide-react'
import PageHeader from '../../components/common/PageHeader.jsx'
import Card from '../../components/common/Card.jsx'
import Button from '../../components/common/Button.jsx'
import StatusPill from '../../components/common/StatusPill.jsx'
import Modal from '../../components/common/Modal.jsx'
import { rewards as initialRewards } from '../../data/mockData.js'

const MY_BALANCE = 1450

export default function Rewards() {
  const [rewards, setRewards] = useState(initialRewards)
  const [balance, setBalance] = useState(MY_BALANCE)
  const [confirm, setConfirm] = useState(null)

  const redeem = () => {
    if (!confirm) return
    setRewards((prev) => prev.map((r) => (r.id === confirm.id ? { ...r, stock: r.stock - 1, status: r.stock - 1 <= 0 ? 'Out of Stock' : r.status } : r)))
    setBalance((b) => b - confirm.pointsRequired)
    setConfirm(null)
  }

  return (
    <div>
      <PageHeader
        eyebrow="Gamification"
        title="Rewards"
        description="Employees redeem earned XP/Points for rewards from the catalog, subject to stock availability."
        action={
          <div className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-forest-500/10 text-forest-700 text-sm font-medium">
            <Coins size={15} /> {balance.toLocaleString()} points available
          </div>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {rewards.map((r) => {
          const canRedeem = r.status === 'Active' && r.stock > 0 && balance >= r.pointsRequired
          return (
            <Card key={r.id}>
              <div className="flex items-start justify-between">
                <div className="w-10 h-10 rounded-lg bg-rose-500/10 text-rose-600 flex items-center justify-center">
                  <Gift size={18} />
                </div>
                <StatusPill status={r.status} />
              </div>
              <p className="font-display font-semibold text-ink mt-3">{r.name}</p>
              <p className="text-xs text-ink/50 mt-1">{r.description}</p>
              <div className="flex items-center justify-between mt-4">
                <span className="text-sm font-semibold text-ink">{r.pointsRequired.toLocaleString()} pts</span>
                <span className="text-xs text-ink/40">{r.stock > 0 ? `${r.stock} in stock` : 'No stock'}</span>
              </div>
              <Button
                variant={canRedeem ? 'primary' : 'secondary'}
                disabled={!canRedeem}
                onClick={() => setConfirm(r)}
                className="w-full justify-center mt-3"
              >
                {r.stock === 0 ? 'Out of Stock' : balance < r.pointsRequired ? 'Not enough points' : 'Redeem'}
              </Button>
            </Card>
          )
        })}
      </div>

      <Modal open={!!confirm} onClose={() => setConfirm(null)} title="Confirm Redemption"
        footer={<><Button variant="secondary" onClick={() => setConfirm(null)}>Cancel</Button><Button onClick={redeem}>Confirm Redemption</Button></>}>
        {confirm && (
          <p className="text-sm text-ink/70">
            Redeem <span className="font-semibold text-ink">{confirm.name}</span> for{' '}
            <span className="font-semibold text-ink">{confirm.pointsRequired.toLocaleString()} points</span>?
            This will deduct from your balance and reduce stock by one.
          </p>
        )}
      </Modal>
    </div>
  )
}
