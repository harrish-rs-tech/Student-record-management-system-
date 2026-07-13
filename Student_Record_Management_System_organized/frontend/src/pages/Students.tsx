import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useSearchParams } from 'react-router-dom'
import {
  Search,
  Filter,
  Users,
  Download,
  ChevronUp,
  ChevronDown,
  Grid3x3,
  List,
  Mail,
  Phone,
  MapPin,
  Building2,
  Hash,
  Eye,
  ArrowUpDown,
  X,
  UserPlus,
} from 'lucide-react'
import { useApp } from '../context/AppContext'

type SortKey = 'fullName' | 'id' | 'department' | 'year' | 'attendance' | 'cgpa'
type SortDir = 'asc' | 'desc'

export default function Students() {
  const { students, showToast } = useApp()
  const [searchParams] = useSearchParams()
  const initialQuery = searchParams.get('q') || ''

  const [search, setSearch] = useState(initialQuery)
  const [department, setDepartment] = useState('all')
  const [year, setYear] = useState('all')
  const [sortKey, setSortKey] = useState<SortKey>('fullName')
  const [sortDir, setSortDir] = useState<SortDir>('asc')
  const [view, setView] = useState<'grid' | 'table'>('grid')
  const [page, setPage] = useState(1)
  const perPage = 8

  const departments = useMemo(() => Array.from(new Set(students.map(s => s.department))), [students])
  const years = useMemo(() => Array.from(new Set(students.map(s => s.year))), [students])

  const filtered = useMemo(() => {
    let arr = students.filter(s => {
      const q = search.toLowerCase()
      const matchSearch = !q ||
        s.fullName.toLowerCase().includes(q) ||
        s.id.toLowerCase().includes(q) ||
        s.email.toLowerCase().includes(q) ||
        s.department.toLowerCase().includes(q)
      const matchDept = department === 'all' || s.department === department
      const matchYear = year === 'all' || s.year === year
      return matchSearch && matchDept && matchYear
    })
    arr = [...arr].sort((a, b) => {
      const av = a[sortKey]
      const bv = b[sortKey]
      const cmp = typeof av === 'number' && typeof bv === 'number'
        ? av - bv
        : String(av).localeCompare(String(bv))
      return sortDir === 'asc' ? cmp : -cmp
    })
    return arr
  }, [students, search, department, year, sortKey, sortDir])

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage))
  const paged = filtered.slice((page - 1) * perPage, page * perPage)

  const handleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir(d => d === 'asc' ? 'desc' : 'asc')
    else { setSortKey(key); setSortDir('asc') }
  }

  const SortIcon = ({ k }: { k: SortKey }) => {
    if (sortKey !== k) return <ArrowUpDown size={11} className="opacity-40" />
    return sortDir === 'asc' ? <ChevronUp size={11} /> : <ChevronDown size={11} />
  }

  const exportCSV = () => {
    const csv = [
      ['ID', 'Name', 'Department', 'Year', 'Section', 'Email', 'Phone', 'CGPA', 'Attendance'].join(','),
      ...filtered.map(s => [s.id, s.fullName, s.department, s.year, s.section, s.email, s.phone, s.cgpa, `${s.attendance}%`].join(','))
    ].join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `hrs_students_${Date.now()}.csv`
    a.click()
    URL.revokeObjectURL(url)
    showToast(`Exported ${filtered.length} records to CSV`, 'success')
  }

  const initials = (name: string) => name.split(' ').map(n => n[0]).slice(0, 2).join('')
  const avatarColor = (id: string) => {
    const colors = ['#D4AF37', '#A8842B', '#F5D27A', '#C49A24', '#8B6B1F', '#E1C35D']
    return colors[id.length % colors.length]
  }

  return (
    <div className="space-y-5 max-w-[1600px] mx-auto">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <span className="badge-gold inline-flex mb-3">
            <Users size={11} /> Records Management
          </span>
          <h1 className="font-display text-3xl sm:text-4xl font-bold" style={{ color: 'var(--text)' }}>
            Student <span className="text-gold-gradient">Records</span>
          </h1>
          <p className="text-sm mt-1.5" style={{ color: 'var(--text-muted)' }}>
            {filtered.length} {filtered.length === 1 ? 'student' : 'students'} · HRS Institute Database
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={exportCSV} className="btn-outline text-sm inline-flex items-center gap-2">
            <Download size={14} /> Export CSV
          </button>
          <Link to="/students/add" className="btn-gold text-sm inline-flex items-center gap-2">
            <UserPlus size={14} /> Add Student
          </Link>
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="p-4 rounded-2xl border flex flex-wrap items-center gap-3"
        style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}
      >
        <div className="relative flex-1 min-w-[220px]">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: 'var(--text-muted)' }} />
          <input
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1) }}
            placeholder="Search by name, ID, email, department..."
            className="input-premium pl-10"
          />
          {search && (
            <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded hover:bg-black/5 dark:hover:bg-white/5">
              <X size={14} style={{ color: 'var(--text-muted)' }} />
            </button>
          )}
        </div>

        <div className="relative">
          <Building2 size={14} className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: 'var(--text-muted)' }} />
          <select
            value={department}
            onChange={(e) => { setDepartment(e.target.value); setPage(1) }}
            className="input-premium pl-9 pr-8 appearance-none cursor-pointer min-w-[180px]"
          >
            <option value="all">All Departments</option>
            {departments.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
        </div>

        <div className="relative">
          <Filter size={14} className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: 'var(--text-muted)' }} />
          <select
            value={year}
            onChange={(e) => { setYear(e.target.value); setPage(1) }}
            className="input-premium pl-9 pr-8 appearance-none cursor-pointer min-w-[150px]"
          >
            <option value="all">All Years</option>
            {years.map(y => <option key={y} value={y}>{y}</option>)}
          </select>
        </div>

        <div className="flex items-center rounded-xl p-1 border" style={{ background: 'var(--bg-soft)', borderColor: 'var(--border)' }}>
          <button
            onClick={() => setView('grid')}
            className={`p-2 rounded-lg transition ${view === 'grid' ? 'shadow' : ''}`}
            style={{ background: view === 'grid' ? 'var(--bg-card)' : 'transparent', color: view === 'grid' ? 'var(--gold-dark)' : 'var(--text-muted)' }}
            aria-label="Grid view"
          >
            <Grid3x3 size={15} />
          </button>
          <button
            onClick={() => setView('table')}
            className={`p-2 rounded-lg transition ${view === 'table' ? 'shadow' : ''}`}
            style={{ background: view === 'table' ? 'var(--bg-card)' : 'transparent', color: view === 'table' ? 'var(--gold-dark)' : 'var(--text-muted)' }}
            aria-label="Table view"
          >
            <List size={15} />
          </button>
        </div>
      </motion.div>

      {/* View */}
      <AnimatePresence mode="wait">
        {view === 'grid' ? (
          <motion.div
            key="grid"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
          >
            {paged.length === 0 && (
              <div className="col-span-full p-12 text-center rounded-2xl border" style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}>
                <Users size={40} className="mx-auto mb-3" style={{ color: 'var(--text-muted)' }} />
                <p className="font-display text-lg font-bold" style={{ color: 'var(--text)' }}>No students found</p>
                <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Try adjusting your filters or add a new student.</p>
              </div>
            )}
            {paged.map((s, i) => (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                className="premium-card p-5 rounded-2xl border group"
                style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="relative">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-lg shadow-sm"
                      style={{ background: `linear-gradient(135deg, ${avatarColor(s.id)}, #F5D27A)`, color: '#0a0a0a' }}
                    >
                      {initials(s.fullName)}
                    </div>
                    <span
                      className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold border-2"
                      style={{ background: s.gender === 'Female' ? '#ec4899' : '#3b82f6', color: '#fff', borderColor: 'var(--bg-card)' }}
                    >
                      {s.gender[0]}
                    </span>
                  </div>
                  <span className="badge-gold text-[10px]">{s.bloodGroup}</span>
                </div>

                <h3 className="font-display text-lg font-bold truncate" style={{ color: 'var(--text)' }}>{s.fullName}</h3>
                <p className="text-xs font-mono mt-0.5 mb-3 flex items-center gap-1" style={{ color: 'var(--gold-dark)' }}>
                  <Hash size={11} /> {s.id}
                </p>

                <div className="space-y-1.5 mb-4 text-xs" style={{ color: 'var(--text-soft)' }}>
                  <p className="flex items-center gap-2 truncate">
                    <Building2 size={12} style={{ color: 'var(--text-muted)' }} />
                    <span className="truncate">{s.department}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="text-[10px] uppercase tracking-wider font-bold" style={{ color: 'var(--text-muted)' }}>Year</span>
                    <span>{s.year} · Sec {s.section}</span>
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 mb-4">
                  <div className="rounded-lg p-2 text-center" style={{ background: 'var(--bg-soft)' }}>
                    <p className="text-[10px] uppercase tracking-wider font-bold" style={{ color: 'var(--text-muted)' }}>CGPA</p>
                    <p className="font-display text-base font-bold" style={{ color: 'var(--gold-dark)' }}>{s.cgpa}</p>
                  </div>
                  <div className="rounded-lg p-2 text-center" style={{ background: 'var(--bg-soft)' }}>
                    <p className="text-[10px] uppercase tracking-wider font-bold" style={{ color: 'var(--text-muted)' }}>Attend.</p>
                    <p className="font-display text-base font-bold" style={{ color: s.attendance >= 90 ? '#16a34a' : s.attendance >= 75 ? 'var(--gold-dark)' : '#dc2626' }}>{s.attendance}%</p>
                  </div>
                </div>

                <Link
                  to={`/students/${s.id}`}
                  className="block text-center py-2 rounded-lg text-xs font-bold transition"
                  style={{ background: 'linear-gradient(135deg, #D4AF37, #F5D27A)', color: '#0a0a0a' }}
                >
                  <Eye size={12} className="inline mr-1" /> View Profile
                </Link>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="table"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="rounded-2xl border overflow-hidden"
            style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}
          >
            <div className="overflow-x-auto">
              <table className="table-premium">
                <thead>
                  <tr>
                    <th onClick={() => handleSort('id')} className="cursor-pointer">
                      <span className="inline-flex items-center gap-1">Student ID <SortIcon k="id" /></span>
                    </th>
                    <th onClick={() => handleSort('fullName')} className="cursor-pointer">
                      <span className="inline-flex items-center gap-1">Name <SortIcon k="fullName" /></span>
                    </th>
                    <th onClick={() => handleSort('department')} className="cursor-pointer">
                      <span className="inline-flex items-center gap-1">Department <SortIcon k="department" /></span>
                    </th>
                    <th onClick={() => handleSort('year')} className="cursor-pointer">
                      <span className="inline-flex items-center gap-1">Year <SortIcon k="year" /></span>
                    </th>
                    <th>Contact</th>
                    <th onClick={() => handleSort('attendance')} className="cursor-pointer">
                      <span className="inline-flex items-center gap-1">Attendance <SortIcon k="attendance" /></span>
                    </th>
                    <th onClick={() => handleSort('cgpa')} className="cursor-pointer">
                      <span className="inline-flex items-center gap-1">CGPA <SortIcon k="cgpa" /></span>
                    </th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {paged.length === 0 && (
                    <tr><td colSpan={8} className="text-center py-12" style={{ color: 'var(--text-muted)' }}>No records match your filters.</td></tr>
                  )}
                  {paged.map(s => (
                    <tr key={s.id}>
                      <td className="font-mono font-semibold" style={{ color: 'var(--gold-dark)' }}>{s.id}</td>
                      <td>
                        <div className="flex items-center gap-3">
                          <div
                            className="w-9 h-9 rounded-lg flex items-center justify-center font-bold text-xs flex-shrink-0"
                            style={{ background: `linear-gradient(135deg, ${avatarColor(s.id)}, #F5D27A)`, color: '#0a0a0a' }}
                          >
                            {initials(s.fullName)}
                          </div>
                          <div>
                            <p className="font-semibold" style={{ color: 'var(--text)' }}>{s.fullName}</p>
                            <p className="text-[11px]" style={{ color: 'var(--text-muted)' }}>{s.bloodGroup} · {s.gender}</p>
                          </div>
                        </div>
                      </td>
                      <td>{s.department}</td>
                      <td>{s.year} <span className="text-[11px]" style={{ color: 'var(--text-muted)' }}>· Sec {s.section}</span></td>
                      <td>
                        <div className="text-xs space-y-0.5">
                          <p className="flex items-center gap-1.5 truncate"><Mail size={11} /> {s.email}</p>
                          <p className="flex items-center gap-1.5" style={{ color: 'var(--text-muted)' }}><Phone size={11} /> {s.phone}</p>
                        </div>
                      </td>
                      <td>
                        <div className="flex items-center gap-2">
                          <div className="w-20 h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--bg-soft)' }}>
                            <div
                              className="h-full rounded-full"
                              style={{
                                width: `${s.attendance}%`,
                                background: s.attendance >= 90 ? 'linear-gradient(90deg, #16a34a, #4ade80)' :
                                  s.attendance >= 75 ? 'linear-gradient(90deg, #D4AF37, #F5D27A)' : 'linear-gradient(90deg, #dc2626, #f87171)',
                              }}
                            />
                          </div>
                          <span className="text-xs font-bold" style={{ color: 'var(--text)' }}>{s.attendance}%</span>
                        </div>
                      </td>
                      <td className="font-display font-bold text-base" style={{ color: 'var(--gold-dark)' }}>{s.cgpa}</td>
                      <td>
                        <Link
                          to={`/students/${s.id}`}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition hover:scale-105"
                          style={{ background: 'rgba(212,175,55,0.15)', color: 'var(--gold-dark)' }}
                        >
                          <Eye size={12} /> View
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pagination */}
      {filtered.length > perPage && (
        <div className="flex items-center justify-between mt-4 px-2">
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
            Showing <span className="font-bold" style={{ color: 'var(--text)' }}>{(page - 1) * perPage + 1}</span>–
            <span className="font-bold" style={{ color: 'var(--text)' }}>{Math.min(page * perPage, filtered.length)}</span> of{' '}
            <span className="font-bold" style={{ color: 'var(--text)' }}>{filtered.length}</span>
          </p>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-3 py-1.5 rounded-lg text-xs font-bold border disabled:opacity-40"
              style={{ borderColor: 'var(--border)', color: 'var(--text)' }}
            >
              ← Prev
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).slice(0, 5).map(p => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className="w-8 h-8 rounded-lg text-xs font-bold transition"
                style={{
                  background: page === p ? 'linear-gradient(135deg, #D4AF37, #F5D27A)' : 'transparent',
                  color: page === p ? '#0a0a0a' : 'var(--text-soft)',
                  border: '1px solid var(--border)',
                }}
              >
                {p}
              </button>
            ))}
            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-3 py-1.5 rounded-lg text-xs font-bold border disabled:opacity-40"
              style={{ borderColor: 'var(--border)', color: 'var(--text)' }}
            >
              Next →
            </button>
          </div>
        </div>
      )}
    </div>
  )
}