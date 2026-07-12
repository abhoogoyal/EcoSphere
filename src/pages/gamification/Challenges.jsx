import React, { useState } from 'react'
import { Plus, Zap, Clock, ShieldQuestion } from 'lucide-react'
import PageHeader from '../../components/common/PageHeader.jsx'
import Card from '../../components/common/Card.jsx'
import Button from '../../components/common/Button.jsx'
import StatusPill from '../../components/common/StatusPill.jsx'
import Modal from '../../components/common/Modal.jsx'
import { challenges as initialChallenges, categories, challengeParticipation } from '../../data/mockData.js'

const STAGES = ['Draft', 'Active', 'Under Review', 'Completed', 'Archived']
const NEXT_STAGE = { Draft: 'Active', Active: 'Under Review', 'Under Review': 'Completed' }

export default function Challenges() {
  const [challenges, setChallenges] = useState(initialChallenges)
  const [open, setOpen] = useState(false)
  const challengeCategories = categories.filter((c) => c.type === 'Challenge')
  const [form, setForm] = useState({ title: '', category: challengeCategories[0]?.name, description: '', xp: 100, difficulty: 'Easy', deadline: '' })

  const advance = (id) => {
    setChallenges((prev) => prev.map((c) => (c.id === id && NEXT_STAGE[c.status] ? { ...c, status: NEXT_STAGE[c.status] } : c)))
  }
  const archive = (id) => {
    setChallenges((prev) => prev.map((c) => (c.id === id ? { ...c, status: 'Archived' } : c)))
  }

  const handleCreate = () => {
    if (!form.title) return
    setChallenges((prev) => [...prev, { id: `CH${String(prev.length + 1).padStart(2, '0')}`, ...form, xp: Number(form.xp), evidenceRequired: true, status: 'Draft' }])
    setForm({ title: '', category: challengeCategories[0]?.name, description: '', xp: 100, difficulty: 'Easy', deadline: '' })
    setOpen(false)
  }

  const participantsFor = (title) => challengeParticipation.filter((p) => p.challenge === title).length

  return (
    <div>
      <PageHeader
        eyebrow="Gamification"
        title="Challenges"
        description="Full lifecycle: Draft → Active → Under Review → Completed, or Archived at any point."
        action={<Button icon={Plus} onClick={() => setOpen(true)}>New Challenge</Button>}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {STAGES.map((stage) => (
          <div key={stage} className="min-w-0">
            <div className="flex items-center justify-between mb-2 px-1">
              <p className="text-xs font-semibold text-ink/55 uppercase tracking-wide">{stage}</p>
              <span className="text-[11px] text-ink/35">{challenges.filter((c) => c.status === stage).length}</span>
            </div>
            <div className="space-y-2.5">
              {challenges.filter((c) => c.status === stage).map((c) => (
                <Card key={c.id} className="!p-3.5">
                  <p className="text-[11px] uppercase tracking-wide text-amber-600 font-semibold">{c.category}</p>
                  <p className="font-medium text-ink text-sm mt-1 leading-snug">{c.title}</p>
                  <p className="text-xs text-ink/50 mt-1.5 line-clamp-2">{c.description}</p>
                  <div className="flex items-center gap-2 mt-2.5 text-[11px] text-ink/50">
                    <span className="flex items-center gap-1"><Zap size={11} className="text-amber-500" />{c.xp} XP</span>
                    <span>·</span>
                    <span>{c.difficulty}</span>
                    {c.deadline && (<><span>·</span><span className="flex items-center gap-1"><Clock size={11} />{c.deadline}</span></>)}
                  </div>
                  {stage !== 'Completed' && stage !== 'Archived' && (
                    <div className="flex gap-1.5 mt-3">
                      {NEXT_STAGE[stage] && (
                        <button onClick={() => advance(c.id)} className="text-[11px] px-2 py-1 rounded-md bg-forest-500/10 text-forest-600 hover:bg-forest-500/20 font-medium">
                          Move to {NEXT_STAGE[stage]}
                        </button>
                      )}
                      <button onClick={() => archive(c.id)} className="text-[11px] px-2 py-1 rounded-md bg-ink/[0.05] text-ink/50 hover:bg-ink/10 font-medium">
                        Archive
                      </button>
                    </div>
                  )}
                  {stage === 'Active' && (
                    <p className="text-[11px] text-ink/40 mt-2">{participantsFor(c.title)} participating</p>
                  )}
                </Card>
              ))}
              {challenges.filter((c) => c.status === stage).length === 0 && (
                <div className="text-center py-8 text-ink/25 text-xs border border-dashed border-ink/10 rounded-xl2">
                  <ShieldQuestion size={16} className="mx-auto mb-1" />
                  Empty
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title="Create Challenge"
        footer={<><Button variant="secondary" onClick={() => setOpen(false)}>Cancel</Button><Button onClick={handleCreate}>Save as Draft</Button></>}>
        <div className="space-y-3">
          <div>
            <label className="text-xs text-ink/60 font-medium block mb-1">Title</label>
            <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full px-3 py-2 text-sm rounded-lg border border-ink/10 outline-none focus-ring" />
          </div>
          <div>
            <label className="text-xs text-ink/60 font-medium block mb-1">Description</label>
            <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={2} className="w-full px-3 py-2 text-sm rounded-lg border border-ink/10 outline-none focus-ring resize-none" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-ink/60 font-medium block mb-1">Category</label>
              <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full px-3 py-2 text-sm rounded-lg border border-ink/10 outline-none focus-ring">
                {challengeCategories.map((c) => <option key={c.id}>{c.name}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs text-ink/60 font-medium block mb-1">Difficulty</label>
              <select value={form.difficulty} onChange={(e) => setForm({ ...form, difficulty: e.target.value })} className="w-full px-3 py-2 text-sm rounded-lg border border-ink/10 outline-none focus-ring">
                <option>Easy</option><option>Medium</option><option>Hard</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-ink/60 font-medium block mb-1">XP Reward</label>
              <input type="number" value={form.xp} onChange={(e) => setForm({ ...form, xp: e.target.value })} className="w-full px-3 py-2 text-sm rounded-lg border border-ink/10 outline-none focus-ring" />
            </div>
            <div>
              <label className="text-xs text-ink/60 font-medium block mb-1">Deadline</label>
              <input type="date" value={form.deadline} onChange={(e) => setForm({ ...form, deadline: e.target.value })} className="w-full px-3 py-2 text-sm rounded-lg border border-ink/10 outline-none focus-ring" />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  )
}
