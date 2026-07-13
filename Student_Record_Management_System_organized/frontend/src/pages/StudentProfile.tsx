import { motion } from 'framer-motion'
import { Link, useParams, useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Building2,
  GraduationCap,
  Hash,
  Droplets,
  User,
  Users,
  Award,
  TrendingUp,
  Sparkles,
  FileText,
  Trash2,
  CheckCircle2,
  XCircle,
} from 'lucide-react'
import { LineChart, Line, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid, Area, AreaChart } from 'recharts'
import { useApp } from '../context/AppContext'
import { useState } from 'react'

const initials = (name: string) => name.split(' ').map(n => n[0]).slice(0, 2).join('')
const avatarColor = (id: string) => {
  const colors = ['#D4AF37', '#A8842B', '#F5D27A', '#C49A24', '#8B6B1F', '#E1C35D']
  return colors[id.length % colors.length]
}

const performanceData = [
  { sem: 'Sem 1', gpa: 8.2 },
  { sem: 'Sem 2', gpa: 8.5 },
  { sem: 'Sem 3', gpa: 8.8 },
  { sem: 'Sem 4', gpa: 8.6 },
  { sem: 'Sem 5', gpa: 9.0 },
  { sem: 'Sem 6', gpa: 9.2 },
]

const subjectMarks = [
  { subject: 'Machine Learning', marks: 92, grade: 'A+' },
  { subject: 'Data Structures', marks: 88, grade: 'A' },
  { subject: 'Statistics', marks: 85, grade: 'A' },
  { subject: 'Python Programming', marks: 95, grade: 'A+' },
  { subject: 'Database Systems', marks: 89, grade: 'A' },
  { subject: 'Linear Algebra', marks: 87, grade: 'A' },
]

const attendanceHistory = [
  { month: 'Aug', pct: 95 },
  { month: 'Sep', pct: 92 },
  { month: 'Oct', pct: 96 },
  { month: 'Nov', pct: 93 },
  { month: 'Dec', pct: 94 },
  { month: 'Jan', pct: 97 },
]

export default function StudentProfile() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { getStudent, deleteStudent } = useApp()
  const [confirmDelete, setConfirmDelete] = useState(false)

  const student = id ? getStudent(id) : undefined

  if (!student) {
    return (
      <div className="max-w-md mx-auto py-20 text-center">
        <div className="w-20 h-20 rounded-2xl mx-auto mb-4 flex items-center justify-center" style={{ background: 'rgba(220,38,38,0.1)' }}>
          <XCircle size={40} style={{ color: '#dc2626' }} />
        </div>
        <h2 className="font-display text-2xl font-bold mb-2" style={{ color: 'var(--text)' }}>Student Not Found</h2>
        <p className="text-sm mb-5" style={{ color: 'var(--text-muted)' }}>
          The record you're looking for doesn't exist or has been deleted.
        </p>
        <Link to="/students" className="btn-gold inline-flex items-center gap-2">
          <ArrowLeft size={14} /> Back to Records
        </Link>
      </div>
    )
  }

  const handleDelete = () => {
    deleteStudent(student.id)
    navigate('/students')
  }

  return (
    <div className="max-w-6xl mx-auto space-y-5">
      {/* Back */}
      <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
        <Link to="/students" className="inline-flex items-center gap-2 text-sm font-bold hover:gap-3 transition-all" style={{ color: 'var(--gold-dark)' }}>
          <ArrowLeft size={14} /> Back to Student Records
        </Link>
      </motion.div>

      {/* Profile hero */}
      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="relative rounded-3xl overflow-hidden border"
        style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}
      >
        {/* Banner */}
        <div
          className="h-32 sm:h-40 relative"
          style={{
            background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0a0a0a 100%)',
          }}
        >
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-4 left-1/4 w-40 h-40 rounded-full blur-3xl" style={{ background: '#D4AF37' }} />
            <div className="absolute bottom-4 right-1/4 w-60 h-60 rounded-full blur-3xl" style={{ background: '#F5D27A' }} />
          </div>
          <div className="absolute inset-0 bg-dots opacity-20" />
        </div>

        <div className="px-6 sm:px-8 pb-6 -mt-16 relative">
          <div className="flex flex-col sm:flex-row sm:items-end gap-4">
            <div
              className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl flex items-center justify-center font-display text-4xl sm:text-5xl font-bold shadow-2xl border-4"
              style={{
                background: student.photo ? `url(${student.photo}) center/cover` : `linear-gradient(135deg, ${avatarColor(student.id)}, #F5D27A)`,
                color: '#0a0a0a',
                borderColor: 'var(--bg-card)',
              }}
            >
              {!student.photo && initials(student.fullName)}
            </div>
            <div className="flex-1 min-w-0">
              <span className="badge-gold inline-flex mb-2">
                <Sparkles size={11} /> Active Student
              </span>
              <h1 className="font-display text-3xl sm:text-4xl font-bold" style={{ color: 'var(--text)' }}>
                {student.fullName}
              </h1>
              <p className="text-sm mt-1 flex items-center gap-2" style={{ color: 'var(--gold-dark)' }}>
                <Hash size={13} /> {student.id}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setConfirmDelete(true)}
                className="px-4 py-2 rounded-xl text-sm font-bold inline-flex items-center gap-2 transition hover:scale-[1.02]"
                style={{ background: 'rgba(220,38,38,0.1)', color: '#dc2626', border: '1px solid rgba(220,38,38,0.2)' }}
              >
                <Trash2 size={14} /> Delete Record
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Quick stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
        className="grid grid-cols-2 sm:grid-cols-4 gap-3"
      >
        {[
          { label: 'CGPA', value: student.cgpa, sub: 'Cumulative', icon: Award, color: 'var(--gold-dark)' },
          { label: 'Attendance', value: `${student.attendance}%`, sub: 'Overall', icon: TrendingUp, color: '#16a34a' },
          { label: 'Year', value: student.year, sub: `Section ${student.section}`, icon: GraduationCap, color: '#3b82f6' },
          { label: 'Blood', value: student.bloodGroup, sub: student.gender, icon: Droplets, color: '#ec4899' },
        ].map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.04 }}
            className="premium-card p-4 rounded-2xl border"
            style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}
          >
            <div className="flex items-center gap-2 mb-2">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: `${s.color}20`, color: s.color }}
              >
                <s.icon size={14} />
              </div>
              <p className="text-[10px] uppercase tracking-wider font-bold" style={{ color: 'var(--text-muted)' }}>
                {s.label}
              </p>
            </div>
            <p className="font-display text-2xl font-bold" style={{ color: 'var(--text)' }}>{s.value}</p>
            <p className="text-[10px] mt-0.5" style={{ color: 'var(--text-muted)' }}>{s.sub}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Main grid */}
      <div className="grid lg:grid-cols-3 gap-4">
        {/* Personal info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
          className="lg:col-span-1 p-5 rounded-2xl border"
          style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}
        >
          <h3 className="font-display text-lg font-bold mb-4 flex items-center gap-2" style={{ color: 'var(--text)' }}>
            <span className="w-1.5 h-6 rounded-full" style={{ background: 'var(--gold)' }} />
            Personal Details
          </h3>
          <div className="space-y-3 text-sm">
            <InfoRow icon={User} label="Full Name" value={student.fullName} />
            <InfoRow icon={Calendar} label="Date of Birth" value={new Date(student.dob).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })} />
            <InfoRow icon={Users} label="Gender" value={student.gender} />
            <InfoRow icon={Droplets} label="Blood Group" value={student.bloodGroup} />
            <InfoRow icon={Mail} label="Email" value={student.email} link={`mailto:${student.email}`} />
            <InfoRow icon={Phone} label="Phone" value={student.phone} link={`tel:${student.phone}`} />
            <InfoRow icon={MapPin} label="Address" value={student.address} multiline />
          </div>

          <div className="gold-line my-5" />

          <h3 className="font-display text-lg font-bold mb-4 flex items-center gap-2" style={{ color: 'var(--text)' }}>
            <span className="w-1.5 h-6 rounded-full" style={{ background: 'var(--gold)' }} />
            Academic Details
          </h3>
          <div className="space-y-3 text-sm">
            <InfoRow icon={Building2} label="Department" value={student.department} />
            <InfoRow icon={GraduationCap} label="Year" value={student.year} />
            <InfoRow icon={Hash} label="Section" value={student.section} />
            <InfoRow icon={FileText} label="Admission Date" value={new Date(student.admissionDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })} />
          </div>

          <div className="gold-line my-5" />

          <h3 className="font-display text-lg font-bold mb-4 flex items-center gap-2" style={{ color: 'var(--text)' }}>
            <span className="w-1.5 h-6 rounded-full" style={{ background: 'var(--gold)' }} />
            Parent / Guardian
          </h3>
          <div className="space-y-3 text-sm">
            <InfoRow icon={User} label="Name" value={student.parentName} />
            <InfoRow icon={Phone} label="Phone" value={student.parentPhone} link={`tel:${student.parentPhone}`} />
          </div>
        </motion.div>

        {/* Performance + Marks */}
        <div className="lg:col-span-2 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="p-5 rounded-2xl border"
            style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-display text-lg font-bold" style={{ color: 'var(--text)' }}>Academic Performance</h3>
                <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Semester-wise GPA progression</p>
              </div>
              <span className="badge-gold"><Award size={10} /> Top 5%</span>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={performanceData}>
                <defs>
                  <linearGradient id="profGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#D4AF37" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="#D4AF37" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="sem" stroke="var(--text-muted)" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--text-muted)" fontSize={11} tickLine={false} axisLine={false} domain={[7, 10]} />
                <Tooltip
                  contentStyle={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 12, fontSize: 12 }}
                />
                <Area type="monotone" dataKey="gpa" stroke="#D4AF37" strokeWidth={2.5} fill="url(#profGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
            className="p-5 rounded-2xl border"
            style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-display text-lg font-bold" style={{ color: 'var(--text)' }}>Subject Marks</h3>
                <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Latest semester results</p>
              </div>
            </div>
            <div className="space-y-2">
              {subjectMarks.map((m, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-semibold truncate" style={{ color: 'var(--text)' }}>{m.subject}</p>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className="text-xs font-bold" style={{ color: 'var(--gold-dark)' }}>{m.marks}/100</span>
                        <span
                          className="text-[10px] font-bold px-2 py-0.5 rounded"
                          style={{
                            background: m.grade.startsWith('A') ? 'rgba(212,175,55,0.15)' : 'rgba(0,0,0,0.05)',
                            color: m.grade.startsWith('A') ? 'var(--gold-dark)' : 'var(--text)',
                          }}
                        >
                          {m.grade}
                        </span>
                      </div>
                    </div>
                    <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--bg-soft)' }}>
                      <motion.div
                        initial={{ width: 0 }} animate={{ width: `${m.marks}%` }} transition={{ delay: 0.3 + i * 0.05, duration: 0.8 }}
                        className="h-full rounded-full"
                        style={{ background: 'linear-gradient(90deg, #D4AF37, #F5D27A)' }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="p-5 rounded-2xl border"
            style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-display text-lg font-bold" style={{ color: 'var(--text)' }}>Attendance Trend</h3>
                <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Last 6 months</p>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={140}>
              <LineChart data={attendanceHistory}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="month" stroke="var(--text-muted)" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--text-muted)" fontSize={11} tickLine={false} axisLine={false} domain={[80, 100]} />
                <Tooltip contentStyle={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 12, fontSize: 12 }} formatter={(v) => [`${v}%`, 'Attendance']} />
                <Line type="monotone" dataKey="pct" stroke="#D4AF37" strokeWidth={2.5} dot={{ fill: '#D4AF37', r: 4 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>
        </div>
      </div>

      {/* Confirm delete modal */}
      {confirmDelete && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            onClick={() => setConfirmDelete(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div
              className="w-full max-w-md rounded-3xl border shadow-2xl overflow-hidden"
              style={{ background: 'var(--bg-card)', borderColor: '#dc2626' }}
            >
              <div className="p-6 text-center" style={{ background: 'linear-gradient(135deg, rgba(220,38,38,0.08), rgba(220,38,38,0.02))' }}>
                <div className="w-16 h-16 rounded-2xl mx-auto mb-3 flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #dc2626, #f87171)' }}>
                  <Trash2 size={28} color="#fff" />
                </div>
                <h3 className="font-display text-2xl font-bold" style={{ color: 'var(--text)' }}>Delete this record?</h3>
                <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>
                  Are you sure you want to delete <strong>{student.fullName}</strong>'s record?
                </p>
              </div>
              <div className="p-6 flex gap-3">
                <button onClick={() => setConfirmDelete(false)} className="flex-1 btn-outline">Cancel</button>
                <button
                  onClick={handleDelete}
                  className="flex-1 py-3 rounded-xl font-bold text-sm inline-flex items-center justify-center gap-2"
                  style={{ background: 'linear-gradient(135deg, #dc2626, #f87171)', color: '#fff' }}
                >
                  <Trash2 size={14} /> Delete
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </div>
  )
}

function InfoRow({ icon: Icon, label, value, link, multiline }: { icon: React.ComponentType<{ size?: number; style?: React.CSSProperties }>; label: string; value: string; link?: string; multiline?: boolean }) {
  const content = (
    <div className="flex items-start gap-3 group">
      <div
        className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
        style={{ background: 'rgba(212,175,55,0.1)', color: 'var(--gold-dark)' }}
      >
        <Icon size={14} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[10px] uppercase tracking-wider font-bold mb-0.5" style={{ color: 'var(--text-muted)' }}>{label}</p>
        <p className={`text-sm font-medium ${multiline ? '' : 'truncate'} ${link ? 'group-hover:text-[var(--gold-dark)] transition' : ''}`} style={{ color: 'var(--text)' }}>{value}</p>
      </div>
    </div>
  )
  return link ? <a href={link}>{content}</a> : content
}