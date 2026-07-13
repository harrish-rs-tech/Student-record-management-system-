import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  Users,
  Building2,
  BookOpen,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  Calendar,
  Clock,
  Sparkles,
  ChevronRight,
  GraduationCap,
  FileText,
  UserPlus,
} from 'lucide-react'
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts'
import { useApp } from '../context/AppContext'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.05, duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
  }),
}

const enrollmentData = [
  { month: 'Jan', students: 420, target: 400 },
  { month: 'Feb', students: 480, target: 450 },
  { month: 'Mar', students: 510, target: 500 },
  { month: 'Apr', students: 540, target: 520 },
  { month: 'May', students: 620, target: 580 },
  { month: 'Jun', students: 710, target: 650 },
  { month: 'Jul', students: 820, target: 750 },
  { month: 'Aug', students: 980, target: 850 },
  { month: 'Sep', students: 1050, target: 950 },
  { month: 'Oct', students: 1180, target: 1050 },
  { month: 'Nov', students: 1240, target: 1150 },
  { month: 'Dec', students: 1290, target: 1200 },
]

const attendanceData = [
  { dept: 'AI & DS', attendance: 94 },
  { dept: 'CS', attendance: 91 },
  { dept: 'ECE', attendance: 88 },
  { dept: 'Mech', attendance: 85 },
  { dept: 'Civil', attendance: 82 },
  { dept: 'EEE', attendance: 89 },
]

const departmentDistribution = [
  { name: 'AI & Data Science', value: 32, color: '#D4AF37' },
  { name: 'Computer Science', value: 28, color: '#F5D27A' },
  { name: 'Electronics', value: 18, color: '#A8842B' },
  { name: 'Mechanical', value: 12, color: '#E1C35D' },
  { name: 'Civil', value: 6, color: '#C49A24' },
  { name: 'Others', value: 4, color: '#8B6B1F' },
]

const recentActivities = [
  { id: 1, type: 'add', user: 'Dr. Anand Krishnan', action: 'added new student record', target: 'Aarav Sharma', time: '2 min ago', icon: UserPlus, color: '#16a34a' },
  { id: 2, type: 'edit', user: 'Prof. Vikram Singh', action: 'updated attendance for', target: 'AI & DS · 3rd Year', time: '18 min ago', icon: Activity, color: 'var(--gold-dark)' },
  { id: 3, type: 'report', user: 'System', action: 'generated semester report for', target: 'Computer Science', time: '1 hr ago', icon: FileText, color: '#3b82f6' },
  { id: 4, type: 'login', user: 'Dr. Meera S.', action: 'logged in from', target: 'Admin Portal', time: '2 hr ago', icon: GraduationCap, color: '#8b5cf6' },
  { id: 5, type: 'delete', user: 'Dr. Anand Krishnan', action: 'removed student record', target: 'ID #HRS2024XX099', time: 'Yesterday', icon: Users, color: '#dc2626' },
]

export default function Dashboard() {
  const { students, user, dark } = useApp()
  const totalStudents = students.length
  const departments = new Set(students.map(s => s.department)).size
  const avgAttendance = Math.round(students.reduce((a, s) => a + s.attendance, 0) / students.length)
  const avgCgpa = (students.reduce((a, s) => a + s.cgpa, 0) / students.length).toFixed(1)

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto">
      {/* Page header */}
      <motion.div initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.05 } } }}>
        <motion.div variants={fadeUp} custom={0} className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="badge-gold inline-flex mb-3">
              <Sparkles size={11} /> Live · HRS Institute ERP
            </span>
            <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight" style={{ color: 'var(--text)' }}>
              Admin <span className="text-gold-gradient">Dashboard</span>
            </h1>
            <p className="text-sm mt-1.5 flex items-center gap-2" style={{ color: 'var(--text-muted)' }}>
              <Calendar size={13} /> {new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
              <span style={{ color: 'var(--border-strong)' }}>·</span>
              <Clock size={13} /> {new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/students/add" className="btn-gold text-sm inline-flex items-center gap-2">
              <UserPlus size={14} /> Add Student
            </Link>
            <Link to="/reports" className="btn-outline text-sm inline-flex items-center gap-2">
              <FileText size={14} /> Reports
            </Link>
          </div>
        </motion.div>
      </motion.div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Students', value: totalStudents, change: '+12%', up: true, icon: Users, color: '#D4AF37' },
          { label: 'Departments', value: departments, change: '+2', up: true, icon: Building2, color: '#A8842B' },
          { label: 'Courses', value: 184, change: '+8', up: true, icon: BookOpen, color: '#F5D27A' },
          { label: 'Avg Attendance', value: `${avgAttendance}%`, change: '-1.2%', up: false, icon: TrendingUp, color: '#E1C35D' },
        ].map((c, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.05, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="premium-card p-5 rounded-2xl border relative overflow-hidden group"
            style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}
          >
            <div
              className="absolute -right-6 -top-6 w-24 h-24 rounded-full opacity-10 group-hover:scale-150 transition-transform duration-500"
              style={{ background: c.color }}
            />
            <div className="flex items-start justify-between mb-4 relative">
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center"
                style={{ background: `linear-gradient(135deg, ${c.color}30, ${c.color}10)` }}
              >
                <c.icon size={20} style={{ color: c.color }} />
              </div>
              <span
                className="text-[11px] font-bold px-2 py-1 rounded-full flex items-center gap-0.5"
                style={{
                  background: c.up ? 'rgba(34,197,94,0.1)' : 'rgba(220,38,38,0.1)',
                  color: c.up ? '#16a34a' : '#dc2626',
                }}
              >
                {c.up ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}
                {c.change}
              </span>
            </div>
            <p className="font-display text-3xl sm:text-4xl font-bold animate-count" style={{ color: 'var(--text)' }}>
              {c.value}
            </p>
            <p className="text-xs uppercase tracking-wider font-semibold mt-1" style={{ color: 'var(--text-muted)' }}>
              {c.label}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid lg:grid-cols-3 gap-4">
        {/* Enrollment chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-2 premium-card p-5 rounded-2xl border"
          style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}
        >
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="font-display text-lg font-bold" style={{ color: 'var(--text)' }}>Enrollment Trend</h3>
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Monthly new admissions · 2024</p>
            </div>
            <span className="badge-gold"><TrendingUp size={10} /> +18% YoY</span>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={enrollmentData}>
              <defs>
                <linearGradient id="goldGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#D4AF37" stopOpacity={0.6} />
                  <stop offset="100%" stopColor="#D4AF37" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="darkGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0a0a0a" stopOpacity={0.2} />
                  <stop offset="100%" stopColor="#0a0a0a" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="month" stroke="var(--text-muted)" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke="var(--text-muted)" fontSize={11} tickLine={false} axisLine={false} />
              <Tooltip
                contentStyle={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  borderRadius: 12,
                  fontSize: 12,
                  boxShadow: '0 10px 30px -10px rgba(168,132,43,0.3)',
                }}
              />
              <Area type="monotone" dataKey="students" stroke="#D4AF37" strokeWidth={2.5} fill="url(#goldGrad)" />
              <Area type="monotone" dataKey="target" stroke="#0a0a0a" strokeWidth={1.5} strokeDasharray="4 4" fill="url(#darkGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Department pie */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="premium-card p-5 rounded-2xl border"
          style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}
        >
          <div className="mb-4">
            <h3 className="font-display text-lg font-bold" style={{ color: 'var(--text)' }}>Department Split</h3>
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Active enrollments by dept</p>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={departmentDistribution} dataKey="value" innerRadius={45} outerRadius={80} paddingAngle={3}>
                {departmentDistribution.map((d, i) => (
                  <Cell key={i} fill={d.color} stroke="none" />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  borderRadius: 12,
                  fontSize: 12,
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-1.5 mt-2">
            {departmentDistribution.slice(0, 4).map((d, i) => (
              <div key={i} className="flex items-center gap-2 text-xs">
                <span className="w-2.5 h-2.5 rounded-sm flex-shrink-0" style={{ background: d.color }} />
                <span className="flex-1 truncate" style={{ color: 'var(--text-soft)' }}>{d.name}</span>
                <span className="font-bold" style={{ color: 'var(--text)' }}>{d.value}%</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Attendance chart + Activities */}
      <div className="grid lg:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2 premium-card p-5 rounded-2xl border"
          style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}
        >
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="font-display text-lg font-bold" style={{ color: 'var(--text)' }}>Department-wise Attendance</h3>
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Average % across all years</p>
            </div>
            <span className="badge-dark">Live data</span>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={attendanceData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#F5D27A" />
                  <stop offset="100%" stopColor="#A8842B" />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="dept" stroke="var(--text-muted)" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke="var(--text-muted)" fontSize={11} tickLine={false} axisLine={false} />
              <Tooltip
                contentStyle={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  borderRadius: 12,
                  fontSize: 12,
                }}
                formatter={(v) => [`${v}%`, 'Attendance']}
              />
              <Bar dataKey="attendance" fill="url(#barGrad)" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="premium-card p-5 rounded-2xl border"
          style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-display text-lg font-bold" style={{ color: 'var(--text)' }}>Recent Activities</h3>
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Latest admin actions</p>
            </div>
            <Activity size={16} style={{ color: 'var(--gold-dark)' }} />
          </div>
          <div className="space-y-3">
            {recentActivities.slice(0, 5).map((a, i) => (
              <motion.div
                key={a.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.05 }}
                className="flex items-start gap-3 group"
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: `${a.color}20`, color: a.color }}
                >
                  <a.icon size={14} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs leading-snug" style={{ color: 'var(--text-soft)' }}>
                    <span className="font-bold" style={{ color: 'var(--text)' }}>{a.user}</span>{' '}
                    {a.action}{' '}
                    <span className="font-semibold" style={{ color: 'var(--gold-dark)' }}>{a.target}</span>
                  </p>
                  <p className="text-[10px] mt-0.5" style={{ color: 'var(--text-muted)' }}>{a.time}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Quick actions + Profile */}
      <div className="grid lg:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="lg:col-span-2 premium-card p-5 rounded-2xl border"
          style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}
        >
          <h3 className="font-display text-lg font-bold mb-4" style={{ color: 'var(--text)' }}>Quick Actions</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[
              { to: '/students/add', icon: UserPlus, label: 'Add Student', desc: 'Register new admission' },
              { to: '/students', icon: Users, label: 'View Records', desc: 'Browse all students' },
              { to: '/students/delete', icon: Activity, label: 'Delete Record', desc: 'Remove student data' },
              { to: '/reports', icon: FileText, label: 'Generate Report', desc: 'Department analytics' },
              { to: '/dashboard', icon: BookOpen, label: 'Manage Courses', desc: 'Course catalog' },
              { to: '/contact', icon: Building2, label: 'Contact HRS', desc: 'Get support' },
            ].map((a, i) => (
              <Link
                key={i}
                to={a.to}
                className="p-4 rounded-xl border text-left group hover:border-[var(--gold)] transition-all"
                style={{ background: 'var(--bg-soft)', borderColor: 'var(--border)' }}
              >
                <a.icon size={18} style={{ color: 'var(--gold-dark)' }} className="mb-2 transition-transform group-hover:scale-110" />
                <p className="font-bold text-sm" style={{ color: 'var(--text)' }}>{a.label}</p>
                <p className="text-[11px] mt-0.5" style={{ color: 'var(--text-muted)' }}>{a.desc}</p>
                <ChevronRight size={14} className="mt-2 transition-transform group-hover:translate-x-1" style={{ color: 'var(--text-muted)' }} />
              </Link>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          className="premium-card p-6 rounded-2xl border relative overflow-hidden"
          style={{
            background: dark ? 'linear-gradient(135deg, #0a0a0a, #1a1a1a)' : 'linear-gradient(135deg, #0a0a0a, #2a2a2a)',
            borderColor: 'var(--gold-dark)',
          }}
        >
          <div className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-30" style={{ background: 'var(--gold)' }} />
          <div className="relative">
            <span className="badge-gold inline-flex mb-4">
              <Sparkles size={11} /> Administrator
            </span>
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-lg"
                style={{ background: 'linear-gradient(135deg, #D4AF37, #F5D27A)', color: '#0a0a0a' }}
              >
                {user?.avatar}
              </div>
              <div>
                <p className="font-display text-lg font-bold text-white">{user?.name}</p>
                <p className="text-xs text-white/60">{user?.role}</p>
              </div>
            </div>
            <div className="space-y-2.5 text-xs">
              <div className="flex items-center justify-between text-white/70">
                <span>Admin ID</span>
                <span className="font-mono text-white">#HRS-ADM-001</span>
              </div>
              <div className="flex items-center justify-between text-white/70">
                <span>Department</span>
                <span className="text-white">All Departments</span>
              </div>
              <div className="flex items-center justify-between text-white/70">
                <span>Access Level</span>
                <span style={{ color: 'var(--gold)' }} className="font-bold">SUPER ADMIN</span>
              </div>
              <div className="flex items-center justify-between text-white/70">
                <span>Last Login</span>
                <span className="text-white">Today, 09:42 AM</span>
              </div>
            </div>
            <div className="gold-line my-4" />
            <p className="text-[10px] text-white/50 uppercase tracking-widest font-bold">
              HRS Institute · Academic Excellence
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}