import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import {
  UserMinus,
  Search,
  Trash2,
  AlertTriangle,
  Eye,
  X,
  CheckCircle2,
  Users,
  Building2,
  Filter,
  Shield,
} from 'lucide-react'
import { useApp } from '../context/AppContext'

const initials = (name: string) => name.split(' ').map(n => n[0]).slice(0, 2).join('')
const avatarColor = (id: string) => {
  const colors = ['#D4AF37', '#A8842B', '#F5D27A', '#C49A24', '#8B6B1F', '#E1C35D']
  return colors[id.length % colors.length]
}

export default function DeleteStudent() {
  const { students, deleteStudent } = useApp()
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [department, setDepartment] = useState('all')
  const [confirmId, setConfirmId] = useState<string | null>(null)
  const [confirmedId, setConfirmedId] = useState<string | null>(null)
  const [confirmText, setConfirmText] = useState('')

  const departments = useMemo(() => Array.from(new Set(students.map(s => s.department))), [students])

  const filtered = useMemo(() => {
    return students.filter(s => {
      const q = search.toLowerCase()
      const match = !q || s.fullName.toLowerCase().includes(q) || s.id.toLowerCase().includes(q)
      const matchDept = department === 'all' || s.department === department
      return match && matchDept
    })
  }, [students, search, department])

  const target = students.find(s => s.id === confirmId)

  const handleDelete = () => {
    if (!target) return
    if (confirmText.toLowerCase() !== 'delete') return
    deleteStudent(target.id)
    setConfirmedId(target.id)
    setConfirmId(null)
    setConfirmText('')
    setTimeout(() => setConfirmedId(null), 2500)
  }

  return (
    <div className="space-y-5 max-w-[1600px] mx-auto">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold mb-3" style={{ background: 'rgba(220,38,38,0.1)', color: '#dc2626' }}>
            <AlertTriangle size={11} /> Restricted Action
          </span>
          <h1 className="font-display text-3xl sm:text-4xl font-bold" style={{ color: 'var(--text)' }}>
            Delete <span className="text-gold-gradient">Student</span>
          </h1>
          <p className="text-sm mt-1.5" style={{ color: 'var(--text-muted)' }}>
            Permanently remove student records · {filtered.length} {filtered.length === 1 ? 'record' : 'records'} available
          </p>
        </div>
      </motion.div>

      {/* Warning banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
        className="p-4 rounded-2xl border flex items-start gap-3"
        style={{ background: 'rgba(220,38,38,0.05)', borderColor: 'rgba(220,38,38,0.2)' }}
      >
        <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(220,38,38,0.15)' }}>
          <Shield size={18} style={{ color: '#dc2626' }} />
        </div>
        <div className="flex-1">
          <p className="font-bold text-sm" style={{ color: '#dc2626' }}>Important — Read Before Deleting</p>
          <p className="text-xs mt-0.5" style={{ color: 'var(--text-soft)' }}>
            Per HRS Institute policy, student records are <strong>immutable once created</strong>. There is <strong>no update option</strong> available in the system.
            Only deletion is permitted, and it is permanent. Please verify the student identity before proceeding.
          </p>
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        className="p-4 rounded-2xl border flex flex-wrap items-center gap-3"
        style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}
      >
        <div className="relative flex-1 min-w-[240px]">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: 'var(--text-muted)' }} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by student name or ID..."
            className="input-premium pl-10"
          />
        </div>
        <div className="relative">
          <Building2 size={14} className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: 'var(--text-muted)' }} />
          <select
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="input-premium pl-9 pr-8 appearance-none cursor-pointer min-w-[200px]"
          >
            <option value="all">All Departments</option>
            {departments.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
        </div>
      </motion.div>

      {/* Students list */}
      {filtered.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="p-16 text-center rounded-2xl border"
          style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}
        >
          <Users size={48} className="mx-auto mb-4" style={{ color: 'var(--text-muted)' }} />
          <p className="font-display text-xl font-bold mb-1" style={{ color: 'var(--text)' }}>No matching records</p>
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Adjust your filters to see students.</p>
        </motion.div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((s, i) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: confirmedId === s.id ? 0.3 : 1, y: 0, scale: confirmedId === s.id ? 0.95 : 1 }}
              transition={{ delay: i * 0.03 }}
              className="premium-card p-5 rounded-2xl border"
              style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}
            >
              <div className="flex items-start gap-3 mb-4">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-lg flex-shrink-0"
                  style={{ background: `linear-gradient(135deg, ${avatarColor(s.id)}, #F5D27A)`, color: '#0a0a0a' }}
                >
                  {initials(s.fullName)}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-display font-bold truncate" style={{ color: 'var(--text)' }}>{s.fullName}</h3>
                  <p className="text-xs font-mono mt-0.5 truncate" style={{ color: 'var(--gold-dark)' }}>{s.id}</p>
                  <p className="text-xs mt-1 truncate" style={{ color: 'var(--text-muted)' }}>{s.department} · {s.year} · Sec {s.section}</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-1 mb-4 text-center">
                <div className="rounded-lg py-1.5" style={{ background: 'var(--bg-soft)' }}>
                  <p className="text-[9px] uppercase font-bold" style={{ color: 'var(--text-muted)' }}>CGPA</p>
                  <p className="font-bold text-xs" style={{ color: 'var(--text)' }}>{s.cgpa}</p>
                </div>
                <div className="rounded-lg py-1.5" style={{ background: 'var(--bg-soft)' }}>
                  <p className="text-[9px] uppercase font-bold" style={{ color: 'var(--text-muted)' }}>Attend</p>
                  <p className="font-bold text-xs" style={{ color: 'var(--text)' }}>{s.attendance}%</p>
                </div>
                <div className="rounded-lg py-1.5" style={{ background: 'var(--bg-soft)' }}>
                  <p className="text-[9px] uppercase font-bold" style={{ color: 'var(--text-muted)' }}>Blood</p>
                  <p className="font-bold text-xs" style={{ color: 'var(--text)' }}>{s.bloodGroup}</p>
                </div>
              </div>

              <div className="flex gap-2">
                <Link
                  to={`/students/${s.id}`}
                  className="flex-1 py-2 rounded-lg text-xs font-bold inline-flex items-center justify-center gap-1 transition"
                  style={{ background: 'var(--bg-soft)', color: 'var(--text-soft)', border: '1px solid var(--border)' }}
                >
                  <Eye size={12} /> View
                </Link>
                <button
                  onClick={() => setConfirmId(s.id)}
                  className="flex-1 py-2 rounded-lg text-xs font-bold inline-flex items-center justify-center gap-1 transition hover:scale-[1.02]"
                  style={{ background: 'linear-gradient(135deg, #dc2626, #f87171)', color: '#fff' }}
                >
                  <Trash2 size={12} /> Delete
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Confirm modal */}
      <AnimatePresence>
        {confirmId && target && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => { setConfirmId(null); setConfirmText('') }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
            >
              <div
                className="w-full max-w-md rounded-3xl border shadow-2xl overflow-hidden pointer-events-auto"
                style={{ background: 'var(--bg-card)', borderColor: '#dc2626' }}
              >
                <div
                  className="p-6 text-center relative"
                  style={{ background: 'linear-gradient(135deg, rgba(220,38,38,0.08), rgba(220,38,38,0.02))' }}
                >
                  <motion.div
                    animate={{ scale: [1, 1.08, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="w-16 h-16 rounded-2xl mx-auto mb-3 flex items-center justify-center"
                    style={{ background: 'linear-gradient(135deg, #dc2626, #f87171)' }}
                  >
                    <AlertTriangle size={28} color="#fff" />
                  </motion.div>
                  <h3 className="font-display text-2xl font-bold mb-1" style={{ color: 'var(--text)' }}>
                    Confirm Deletion
                  </h3>
                  <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                    This action cannot be undone.
                  </p>
                  <button
                    onClick={() => { setConfirmId(null); setConfirmText('') }}
                    className="absolute top-4 right-4 p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5"
                  >
                    <X size={16} />
                  </button>
                </div>

                <div className="p-6 space-y-4">
                  <div className="p-3 rounded-xl flex items-center gap-3" style={{ background: 'var(--bg-soft)' }}>
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center font-bold flex-shrink-0"
                      style={{ background: `linear-gradient(135deg, ${avatarColor(target.id)}, #F5D27A)`, color: '#0a0a0a' }}
                    >
                      {initials(target.fullName)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold truncate" style={{ color: 'var(--text)' }}>{target.fullName}</p>
                      <p className="text-xs font-mono truncate" style={{ color: 'var(--gold-dark)' }}>{target.id}</p>
                    </div>
                  </div>

                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-soft)' }}>
                    <strong style={{ color: '#dc2626' }}>Are you sure you want to delete this student record?</strong><br />
                    All data including attendance, marks, and personal details will be permanently erased.
                  </p>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color: 'var(--text-soft)' }}>
                      Type <span className="font-mono px-1.5 py-0.5 rounded" style={{ background: 'rgba(220,38,38,0.1)', color: '#dc2626' }}>delete</span> to confirm
                    </label>
                    <input
                      type="text"
                      value={confirmText}
                      onChange={(e) => setConfirmText(e.target.value)}
                      placeholder="Type 'delete' here"
                      className="input-premium font-mono"
                      autoFocus
                    />
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button
                      onClick={() => { setConfirmId(null); setConfirmText('') }}
                      className="flex-1 btn-outline"
                    >
                      Cancel
                    </button>
                    <motion.button
                      whileTap={{ scale: 0.97 }}
                      onClick={handleDelete}
                      disabled={confirmText.toLowerCase() !== 'delete'}
                      className="flex-1 py-3 rounded-xl font-bold text-sm inline-flex items-center justify-center gap-2 transition disabled:opacity-40 disabled:cursor-not-allowed"
                      style={{ background: 'linear-gradient(135deg, #dc2626, #f87171)', color: '#fff' }}
                    >
                      <Trash2 size={14} /> Delete Permanently
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Deleted success toast area */}
      <AnimatePresence>
        {confirmedId && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50"
          >
            <div className="px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3" style={{ background: '#16a34a', color: '#fff' }}>
              <CheckCircle2 size={18} />
              <span className="font-semibold text-sm">Record permanently deleted</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}