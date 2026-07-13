import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FileText,
  Download,
  Filter,
  Building2,
  GraduationCap,
  Users,
  TrendingUp,
  Award,
  Printer,
  Sparkles,
  BarChart3,
  PieChart as PieIcon,
  Calendar,
  ChevronDown,
} from 'lucide-react'
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  AreaChart,
  Area,
} from 'recharts'
import { useApp } from '../context/AppContext'

const departments = ['AI & Data Science', 'Computer Science', 'Electronics', 'Mechanical', 'Civil', 'Electrical']
const years = ['1st Year', '2nd Year', '3rd Year', '4th Year']
const sections = ['A', 'B', 'C', 'D']

type ReportType = 'department' | 'attendance' | 'performance' | 'demographics'

export default function Reports() {
  const { students, showToast } = useApp()
  const [reportType, setReportType] = useState<ReportType>('department')
  const [filterDept, setFilterDept] = useState('all')
  const [filterYear, setFilterYear] = useState('all')
  const [filterSection, setFilterSection] = useState('all')

  const filtered = useMemo(() => {
    return students.filter(s =>
      (filterDept === 'all' || s.department === filterDept) &&
      (filterYear === 'all' || s.year === filterYear) &&
      (filterSection === 'all' || s.section === filterSection)
    )
  }, [students, filterDept, filterYear, filterSection])

  // Department data
  const departmentData = useMemo(() => {
    const groups: Record<string, { count: number; totalCgpa: number; totalAtt: number }> = {}
    filtered.forEach(s => {
      if (!groups[s.department]) groups[s.department] = { count: 0, totalCgpa: 0, totalAtt: 0 }
      groups[s.department].count++
      groups[s.department].totalCgpa += s.cgpa
      groups[s.department].totalAtt += s.attendance
    })
    return Object.entries(groups).map(([dept, d]) => ({
      dept: dept.split(' ')[0],
      full: dept,
      students: d.count,
      avgCgpa: +(d.totalCgpa / d.count).toFixed(2),
      avgAtt: Math.round(d.totalAtt / d.count),
    }))
  }, [filtered])

  // Year data
  const yearData = useMemo(() => {
    const groups: Record<string, number> = {}
    filtered.forEach(s => {
      groups[s.year] = (groups[s.year] || 0) + 1
    })
    return Object.entries(groups).map(([year, count]) => ({ year, count }))
  }, [filtered])

  // Attendance distribution
  const attendanceBuckets = useMemo(() => {
    const ranges = [
      { range: '90-100%', min: 90, max: 100, color: '#16a34a' },
      { range: '75-89%', min: 75, max: 89, color: '#D4AF37' },
      { range: '60-74%', min: 60, max: 74, color: '#F5D27A' },
      { range: '<60%', min: 0, max: 59, color: '#dc2626' },
    ]
    return ranges.map(r => ({
      ...r,
      count: filtered.filter(s => s.attendance >= r.min && s.attendance <= r.max).length,
    }))
  }, [filtered])

  // CGPA distribution
  const cgpaBuckets = useMemo(() => {
    const ranges = [
      { range: '9.0+', min: 9, color: '#D4AF37' },
      { range: '8.0-8.9', min: 8, color: '#F5D27A' },
      { range: '7.0-7.9', min: 7, color: '#A8842B' },
      { range: '<7.0', min: 0, color: '#8B6B1F' },
    ]
    return ranges.map(r => ({
      ...r,
      count: filtered.filter(s => s.cgpa >= r.min && s.cgpa < (r.min + 1)).length,
    }))
  }, [filtered])

  // Gender
  const genderData = useMemo(() => {
    const m = filtered.filter(s => s.gender === 'Male').length
    const f = filtered.filter(s => s.gender === 'Female').length
    const o = filtered.length - m - f
    return [
      { name: 'Male', value: m, color: '#3b82f6' },
      { name: 'Female', value: f, color: '#ec4899' },
      { name: 'Other', value: o, color: '#8b5cf6' },
    ].filter(d => d.value > 0)
  }, [filtered])

  // Top performers
  const topPerformers = useMemo(() => {
    return [...filtered].sort((a, b) => b.cgpa - a.cgpa).slice(0, 5)
  }, [filtered])

  const handlePrint = () => {
    window.print()
    showToast('Print dialog opened', 'info')
  }

  const handleExport = () => {
    const csv = [
      ['Student ID', 'Name', 'Department', 'Year', 'Section', 'Gender', 'CGPA', 'Attendance', 'Email'].join(','),
      ...filtered.map(s => [s.id, s.fullName, s.department, s.year, s.section, s.gender, s.cgpa, `${s.attendance}%`, s.email].join(','))
    ].join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `hrs_report_${reportType}_${Date.now()}.csv`
    a.click()
    URL.revokeObjectURL(url)
    showToast(`Report exported (${filtered.length} records)`, 'success')
  }

  const reportTypes = [
    { id: 'department' as const, label: 'Department Analysis', icon: Building2 },
    { id: 'attendance' as const, label: 'Attendance Report', icon: TrendingUp },
    { id: 'performance' as const, label: 'Academic Performance', icon: Award },
    { id: 'demographics' as const, label: 'Demographics', icon: Users },
  ]

  const initials = (name: string) => name.split(' ').map(n => n[0]).slice(0, 2).join('')

  return (
    <div className="space-y-5 max-w-[1600px] mx-auto">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <span className="badge-gold inline-flex mb-3">
            <FileText size={11} /> Analytics & Insights
          </span>
          <h1 className="font-display text-3xl sm:text-4xl font-bold" style={{ color: 'var(--text)' }}>
            Reports <span className="text-gold-gradient">Center</span>
          </h1>
          <p className="text-sm mt-1.5" style={{ color: 'var(--text-muted)' }}>
            {filtered.length} {filtered.length === 1 ? 'record' : 'records'} · HRS Institute Analytics
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={handlePrint} className="btn-outline text-sm inline-flex items-center gap-2">
            <Printer size={14} /> Print
          </button>
          <button onClick={handleExport} className="btn-gold text-sm inline-flex items-center gap-2">
            <Download size={14} /> Export CSV
          </button>
        </div>
      </motion.div>

      {/* Report type tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
        className="p-1.5 rounded-2xl border inline-flex flex-wrap gap-1"
        style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}
      >
        {reportTypes.map(rt => (
          <button
            key={rt.id}
            onClick={() => setReportType(rt.id)}
            className={`px-4 py-2.5 rounded-xl text-sm font-bold inline-flex items-center gap-2 transition ${reportType === rt.id ? 'shadow-md' : ''}`}
            style={{
              background: reportType === rt.id ? 'linear-gradient(135deg, #D4AF37, #F5D27A)' : 'transparent',
              color: reportType === rt.id ? '#0a0a0a' : 'var(--text-soft)',
            }}
          >
            <rt.icon size={14} /> {rt.label}
          </button>
        ))}
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        className="p-4 rounded-2xl border flex flex-wrap items-center gap-3"
        style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}
      >
        <Filter size={16} style={{ color: 'var(--gold-dark)' }} />
        <span className="text-xs font-bold uppercase tracking-wider mr-2" style={{ color: 'var(--text-muted)' }}>Filters</span>

        <div className="relative">
          <Building2 size={14} className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: 'var(--text-muted)' }} />
          <select
            value={filterDept}
            onChange={(e) => setFilterDept(e.target.value)}
            className="input-premium pl-9 pr-8 appearance-none cursor-pointer min-w-[180px]"
          >
            <option value="all">All Departments</option>
            {departments.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
        </div>

        <div className="relative">
          <GraduationCap size={14} className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: 'var(--text-muted)' }} />
          <select
            value={filterYear}
            onChange={(e) => setFilterYear(e.target.value)}
            className="input-premium pl-9 pr-8 appearance-none cursor-pointer min-w-[140px]"
          >
            <option value="all">All Years</option>
            {years.map(y => <option key={y} value={y}>{y}</option>)}
          </select>
        </div>

        <div className="relative">
          <select
            value={filterSection}
            onChange={(e) => setFilterSection(e.target.value)}
            className="input-premium pr-8 appearance-none cursor-pointer min-w-[120px]"
          >
            <option value="all">All Sections</option>
            {sections.map(s => <option key={s} value={s}>Section {s}</option>)}
          </select>
        </div>

        {(filterDept !== 'all' || filterYear !== 'all' || filterSection !== 'all') && (
          <button
            onClick={() => { setFilterDept('all'); setFilterYear('all'); setFilterSection('all') }}
            className="text-xs font-bold hover:underline ml-auto"
            style={{ color: 'var(--gold-dark)' }}
          >
            Reset filters
          </button>
        )}
      </motion.div>

      {/* Summary cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-3"
      >
        {[
          { label: 'Total Records', value: filtered.length, sub: 'Students', icon: Users, color: '#D4AF37' },
          { label: 'Avg CGPA', value: filtered.length ? (filtered.reduce((a, s) => a + s.cgpa, 0) / filtered.length).toFixed(2) : '0', sub: 'Out of 10', icon: Award, color: '#A8842B' },
          { label: 'Avg Attendance', value: `${filtered.length ? Math.round(filtered.reduce((a, s) => a + s.attendance, 0) / filtered.length) : 0}%`, sub: 'Across records', icon: TrendingUp, color: '#16a34a' },
          { label: 'Departments', value: new Set(filtered.map(s => s.department)).size, sub: 'Active', icon: Building2, color: '#F5D27A' },
        ].map((c, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.05 }}
            className="premium-card p-4 rounded-2xl border"
            style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: `${c.color}20`, color: c.color }}>
                <c.icon size={16} />
              </div>
              <Sparkles size={12} style={{ color: 'var(--gold-dark)' }} />
            </div>
            <p className="font-display text-2xl sm:text-3xl font-bold" style={{ color: 'var(--text)' }}>{c.value}</p>
            <p className="text-[10px] uppercase tracking-wider font-bold mt-1" style={{ color: 'var(--text-muted)' }}>{c.label}</p>
            <p className="text-[10px]" style={{ color: 'var(--text-muted)' }}>{c.sub}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Report content */}
      <AnimatePresence mode="wait">
        {reportType === 'department' && (
          <motion.div
            key="dept"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            className="grid lg:grid-cols-3 gap-4"
          >
            <div className="lg:col-span-2 p-5 rounded-2xl border" style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}>
              <h3 className="font-display text-lg font-bold mb-4 flex items-center gap-2">
                <BarChart3 size={18} style={{ color: 'var(--gold-dark)' }} /> Students per Department
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={departmentData} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
                  <defs>
                    <linearGradient id="deptGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#F5D27A" />
                      <stop offset="100%" stopColor="#A8842B" />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                  <XAxis dataKey="dept" stroke="var(--text-muted)" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="var(--text-muted)" fontSize={11} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 12, fontSize: 12 }} />
                  <Bar dataKey="students" fill="url(#deptGrad)" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="p-5 rounded-2xl border" style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}>
              <h3 className="font-display text-lg font-bold mb-4">Department Table</h3>
              <div className="space-y-2">
                {departmentData.map((d, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-xl" style={{ background: 'var(--bg-soft)' }}>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold truncate" style={{ color: 'var(--text)' }}>{d.full}</p>
                      <p className="text-[10px] mt-0.5" style={{ color: 'var(--text-muted)' }}>
                        {d.students} students · {d.avgAtt}% attendance
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-display text-lg font-bold" style={{ color: 'var(--gold-dark)' }}>{d.avgCgpa}</p>
                      <p className="text-[10px] uppercase font-bold" style={{ color: 'var(--text-muted)' }}>CGPA</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {reportType === 'attendance' && (
          <motion.div
            key="att"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            className="grid lg:grid-cols-2 gap-4"
          >
            <div className="p-5 rounded-2xl border" style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}>
              <h3 className="font-display text-lg font-bold mb-4 flex items-center gap-2">
                <PieIcon size={18} style={{ color: 'var(--gold-dark)' }} /> Attendance Distribution
              </h3>
              <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                  <Pie data={attendanceBuckets} dataKey="count" nameKey="range" innerRadius={55} outerRadius={95} paddingAngle={3} label={(e: any) => `${e.count}`}>
                    {attendanceBuckets.map((d, i) => (
                      <Cell key={i} fill={d.color} stroke="none" />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 12, fontSize: 12 }} />
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="p-5 rounded-2xl border" style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}>
              <h3 className="font-display text-lg font-bold mb-4 flex items-center gap-2">
                <BarChart3 size={18} style={{ color: 'var(--gold-dark)' }} /> Attendance by Department
              </h3>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={departmentData} layout="vertical" margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="attGrad" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#D4AF37" />
                      <stop offset="100%" stopColor="#F5D27A" />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" horizontal={false} />
                  <XAxis type="number" stroke="var(--text-muted)" fontSize={11} tickLine={false} axisLine={false} domain={[0, 100]} />
                  <YAxis type="category" dataKey="dept" stroke="var(--text-muted)" fontSize={11} tickLine={false} axisLine={false} width={50} />
                  <Tooltip contentStyle={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 12, fontSize: 12 }} formatter={(v) => [`${v}%`, 'Attendance']} />
                  <Bar dataKey="avgAtt" fill="url(#attGrad)" radius={[0, 8, 8, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        )}

        {reportType === 'performance' && (
          <motion.div
            key="perf"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            className="grid lg:grid-cols-3 gap-4"
          >
            <div className="p-5 rounded-2xl border" style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}>
              <h3 className="font-display text-lg font-bold mb-4 flex items-center gap-2">
                <PieIcon size={18} style={{ color: 'var(--gold-dark)' }} /> CGPA Distribution
              </h3>
              <ResponsiveContainer width="100%" height={260}>
                <PieChart>
                  <Pie data={cgpaBuckets} dataKey="count" nameKey="range" innerRadius={50} outerRadius={85} paddingAngle={3}>
                    {cgpaBuckets.map((d, i) => <Cell key={i} fill={d.color} stroke="none" />)}
                  </Pie>
                  <Tooltip contentStyle={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 12, fontSize: 12 }} />
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="lg:col-span-2 p-5 rounded-2xl border" style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}>
              <h3 className="font-display text-lg font-bold mb-4 flex items-center gap-2">
                <Award size={18} style={{ color: 'var(--gold-dark)' }} /> Top 5 Performers
              </h3>
              <div className="space-y-2">
                {topPerformers.map((s, i) => (
                  <motion.div
                    key={s.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                    className="flex items-center gap-3 p-3 rounded-xl"
                    style={{ background: 'var(--bg-soft)' }}
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xs flex-shrink-0"
                      style={{
                        background: i === 0 ? 'linear-gradient(135deg, #D4AF37, #F5D27A)' :
                          i === 1 ? 'linear-gradient(135deg, #C0C0C0, #E8E8E8)' :
                            i === 2 ? 'linear-gradient(135deg, #CD7F32, #E8B07F)' : 'var(--bg-card)',
                        color: i < 3 ? '#0a0a0a' : 'var(--text)',
                        border: '1px solid var(--border)',
                      }}
                    >
                      {i + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-sm truncate" style={{ color: 'var(--text)' }}>{s.fullName}</p>
                      <p className="text-[11px] truncate" style={{ color: 'var(--text-muted)' }}>{s.department} · {s.year}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-display text-2xl font-bold" style={{ color: 'var(--gold-dark)' }}>{s.cgpa}</p>
                      <p className="text-[10px] uppercase font-bold" style={{ color: 'var(--text-muted)' }}>CGPA</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {reportType === 'demographics' && (
          <motion.div
            key="demo"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            className="grid lg:grid-cols-2 gap-4"
          >
            <div className="p-5 rounded-2xl border" style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}>
              <h3 className="font-display text-lg font-bold mb-4 flex items-center gap-2">
                <Users size={18} style={{ color: 'var(--gold-dark)' }} /> Gender Distribution
              </h3>
              <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                  <Pie data={genderData} dataKey="value" nameKey="name" innerRadius={55} outerRadius={95} paddingAngle={3} label={(e: any) => `${e.name}: ${e.value}`}>
                    {genderData.map((d, i) => <Cell key={i} fill={d.color} stroke="none" />)}
                  </Pie>
                  <Tooltip contentStyle={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 12, fontSize: 12 }} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="p-5 rounded-2xl border" style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}>
              <h3 className="font-display text-lg font-bold mb-4 flex items-center gap-2">
                <Calendar size={18} style={{ color: 'var(--gold-dark)' }} /> Year-wise Distribution
              </h3>
              <ResponsiveContainer width="100%" height={280}>
                <AreaChart data={yearData}>
                  <defs>
                    <linearGradient id="yearGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#D4AF37" stopOpacity={0.6} />
                      <stop offset="100%" stopColor="#D4AF37" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                  <XAxis dataKey="year" stroke="var(--text-muted)" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="var(--text-muted)" fontSize={11} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 12, fontSize: 12 }} />
                  <Area type="monotone" dataKey="count" stroke="#D4AF37" strokeWidth={2.5} fill="url(#yearGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Detailed table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
        className="rounded-2xl border overflow-hidden"
        style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}
      >
        <div className="px-5 py-4 border-b flex items-center justify-between" style={{ borderColor: 'var(--border)' }}>
          <div>
            <h3 className="font-display text-lg font-bold" style={{ color: 'var(--text)' }}>Detailed Records</h3>
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Complete data based on current filters</p>
          </div>
          <span className="badge-gold">{filtered.length} records</span>
        </div>
        <div className="overflow-x-auto">
          <table className="table-premium">
            <thead>
              <tr>
                <th>Student ID</th>
                <th>Name</th>
                <th>Department</th>
                <th>Year / Sec</th>
                <th>Gender</th>
                <th>CGPA</th>
                <th>Attendance</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr><td colSpan={7} className="text-center py-12" style={{ color: 'var(--text-muted)' }}>
                  No records match the selected filters.
                </td></tr>
              )}
              {filtered.map(s => (
                <tr key={s.id}>
                  <td className="font-mono font-semibold" style={{ color: 'var(--gold-dark)' }}>{s.id}</td>
                  <td>
                    <div className="flex items-center gap-3">
                      <div
                        className="w-9 h-9 rounded-lg flex items-center justify-center font-bold text-xs"
                        style={{ background: 'linear-gradient(135deg, #D4AF37, #F5D27A)', color: '#0a0a0a' }}
                      >
                        {initials(s.fullName)}
                      </div>
                      <span className="font-semibold" style={{ color: 'var(--text)' }}>{s.fullName}</span>
                    </div>
                  </td>
                  <td>{s.department}</td>
                  <td>{s.year} · {s.section}</td>
                  <td>{s.gender}</td>
                  <td className="font-display font-bold text-base" style={{ color: 'var(--gold-dark)' }}>{s.cgpa}</td>
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Footer note */}
      <div className="flex items-center gap-2 text-xs px-2" style={{ color: 'var(--text-muted)' }}>
        <Sparkles size={12} style={{ color: 'var(--gold-dark)' }} />
        Generated on {new Date().toLocaleString('en-IN')} · HRS Institute Analytics Engine
      </div>
    </div>
  )
}