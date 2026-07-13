import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  GraduationCap,
  Users,
  BookOpen,
  Shield,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Award,
  TrendingUp,
  Building2,
  ChevronRight,
  Star,
  Globe,
  Zap,
} from 'lucide-react'
import Logo from '../components/Logo'
import { useApp } from '../context/AppContext'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  }),
}

const features = [
  { icon: Users, title: 'Student Records', desc: 'Centralized database for all student profiles, marks, and attendance.' },
  { icon: BookOpen, title: 'Department Mgmt', desc: 'Organize AI, CS, ECE, and Mechanical departments with custom curricula.' },
  { icon: Shield, title: 'Secure Access', desc: 'Role-based authentication and encrypted admin controls.' },
  { icon: TrendingUp, title: 'Analytics', desc: 'Real-time dashboards with attendance trends and academic performance.' },
  { icon: Award, title: 'Reports', desc: 'Generate department-wise and year-wise performance reports instantly.' },
  { icon: Globe, title: 'Cloud Ready', desc: 'Built for scale with MySQL backend integration support.' },
]

const stats = [
  { value: '12,500+', label: 'Students Enrolled' },
  { value: '48', label: 'Departments' },
  { value: '320+', label: 'Faculty Members' },
  { value: '95%', label: 'Placement Rate' },
]

const testimonials = [
  { name: 'Dr. Meera Subramaniam', role: 'Dean of Academics', text: 'The HRS ERP transformed how we manage 12,000+ students. The interface is intuitive and elegant.', initials: 'MS' },
  { name: 'Prof. Vikram Singh', role: 'HOD, AI & Data Science', text: 'A premium platform that matches the standards of our institute. Reporting is effortless.', initials: 'VS' },
]

export default function Home() {
  const { dark, toggleDark } = useApp()

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ background: 'var(--bg)' }}>
      {/* Decorative background */}
      <div className="fixed inset-0 pointer-events-none bg-pattern" />
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 -left-20 w-96 h-96 rounded-full opacity-30 blur-3xl" style={{ background: 'radial-gradient(circle, #F5D27A, transparent)' }} />
        <div className="absolute bottom-20 -right-20 w-96 h-96 rounded-full opacity-20 blur-3xl" style={{ background: 'radial-gradient(circle, #D4AF37, transparent)' }} />
      </div>

      {/* Navbar */}
      <header className="sticky top-0 z-40 backdrop-blur-xl border-b" style={{
        background: dark ? 'rgba(15,15,15,0.85)' : 'rgba(255,255,255,0.85)',
        borderColor: 'var(--border)',
      }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Logo size={40} />
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium">
            <a href="#features" className="hover:text-[var(--gold-dark)] transition" style={{ color: 'var(--text-soft)' }}>Features</a>
            <a href="#stats" className="hover:text-[var(--gold-dark)] transition" style={{ color: 'var(--text-soft)' }}>Insights</a>
            <a href="#testimonials" className="hover:text-[var(--gold-dark)] transition" style={{ color: 'var(--text-soft)' }}>Voices</a>
            <a href="#contact" className="hover:text-[var(--gold-dark)] transition" style={{ color: 'var(--text-soft)' }}>Contact</a>
          </nav>
          <div className="flex items-center gap-2">
            <button
              onClick={toggleDark}
              className="p-2.5 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition"
              aria-label="Toggle theme"
            >
              {dark ? <Sparkles size={16} style={{ color: 'var(--gold)' }} /> : <Zap size={16} />}
            </button>
            <Link to="/login" className="btn-gold text-sm hidden sm:inline-flex items-center gap-2">
              Admin Login <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative pt-16 pb-24 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.1 } } }}
            className="grid lg:grid-cols-2 gap-12 items-center"
          >
            <div>
              <motion.div variants={fadeUp} custom={0} className="badge-gold mb-5 inline-flex">
                <Sparkles size={12} /> B.Tech AI & Data Science Mini Project
              </motion.div>

              <motion.h1 variants={fadeUp} custom={1} className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight">
                <span style={{ color: 'var(--text)' }}>Student Record</span>
                <br />
                <span className="text-gold-gradient">Management System</span>
              </motion.h1>

              <motion.div variants={fadeUp} custom={2} className="gold-line-short mt-6 mb-6" />

              <motion.p variants={fadeUp} custom={3} className="text-lg leading-relaxed max-w-xl" style={{ color: 'var(--text-soft)' }}>
                A premium ERP-grade platform for <span className="font-bold" style={{ color: 'var(--gold-dark)' }}>HRS Institute</span> —
                engineered for administrators, faculty, and students. Elegant UI, secure MySQL backend, real-time analytics.
              </motion.p>

              <motion.div variants={fadeUp} custom={4} className="flex flex-wrap gap-3 mt-8">
                <Link to="/login" className="btn-gold inline-flex items-center gap-2">
                  <Shield size={16} /> Admin Login <ArrowRight size={16} />
                </Link>
                <a href="#features" className="btn-outline inline-flex items-center gap-2">
                  Explore Features <ChevronRight size={16} />
                </a>
              </motion.div>

              <motion.div variants={fadeUp} custom={5} className="grid grid-cols-3 gap-4 mt-12 max-w-md">
                {[
                  { icon: Shield, label: 'Secure Auth' },
                  { icon: CheckCircle2, label: 'MySQL Ready' },
                  { icon: Star, label: 'Premium UI' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs font-semibold" style={{ color: 'var(--text-muted)' }}>
                    <item.icon size={14} style={{ color: 'var(--gold)' }} />
                    {item.label}
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Hero visual */}
            <motion.div variants={fadeUp} custom={6} className="relative">
              <div className="relative">
                {/* Floating stat cards */}
                <motion.div
                  animate={{ y: [0, -15, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -top-6 -left-6 z-20 glass-strong rounded-2xl p-4 shadow-premium border"
                  style={{ borderColor: 'var(--border)' }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #D4AF37, #F5D27A)' }}>
                      <Users size={18} color="#0a0a0a" />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-wider font-bold" style={{ color: 'var(--text-muted)' }}>Active Students</p>
                      <p className="font-display text-xl font-bold" style={{ color: 'var(--text)' }}>12,500+</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  animate={{ y: [0, 15, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                  className="absolute -bottom-6 -right-6 z-20 glass-strong rounded-2xl p-4 shadow-premium border"
                  style={{ borderColor: 'var(--border)' }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: '#0a0a0a' }}>
                      <TrendingUp size={18} style={{ color: 'var(--gold)' }} />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-wider font-bold" style={{ color: 'var(--text-muted)' }}>Avg Attendance</p>
                      <p className="font-display text-xl font-bold" style={{ color: 'var(--text)' }}>94.2%</p>
                    </div>
                  </div>
                </motion.div>

                {/* Main dashboard preview */}
                <div className="relative gradient-border p-6 shadow-premium">
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                      <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                    </div>
                    <span className="text-[10px] font-mono uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>hrs.erp.dashboard</span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-4">
                    {[
                      { label: 'Students', val: '6,847', color: '#D4AF37' },
                      { label: 'Departments', val: '12', color: '#A8842B' },
                      { label: 'Courses', val: '184', color: '#D4AF37' },
                      { label: 'Faculty', val: '328', color: '#A8842B' },
                    ].map((c, i) => (
                      <div key={i} className="rounded-xl p-3" style={{ background: 'var(--bg-soft)' }}>
                        <p className="text-[10px] uppercase tracking-wider font-bold" style={{ color: 'var(--text-muted)' }}>{c.label}</p>
                        <p className="font-display text-2xl font-bold" style={{ color: c.color }}>{c.val}</p>
                      </div>
                    ))}
                  </div>

                  {/* Mock chart */}
                  <div className="rounded-xl p-4" style={{ background: 'var(--bg-soft)' }}>
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-[10px] uppercase tracking-wider font-bold" style={{ color: 'var(--text-muted)' }}>Enrollment Trend</p>
                      <span className="text-[10px] font-bold" style={{ color: '#16a34a' }}>+18%</span>
                    </div>
                    <svg viewBox="0 0 200 60" className="w-full h-12">
                      <defs>
                        <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
                          <stop offset="0%" stopColor="#D4AF37" />
                          <stop offset="100%" stopColor="#F5D27A" />
                        </linearGradient>
                      </defs>
                      <path d="M0,45 Q25,30 50,32 T100,22 T150,15 T200,8" stroke="url(#lineGrad)" strokeWidth="2" fill="none" />
                      <path d="M0,45 Q25,30 50,32 T100,22 T150,15 T200,8 L200,60 L0,60 Z" fill="url(#lineGrad)" opacity="0.15" />
                    </svg>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section id="stats" className="py-16 px-4 sm:px-6 border-y" style={{ borderColor: 'var(--border)', background: 'var(--bg-card)' }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="text-center"
              >
                <p className="font-display text-4xl sm:text-5xl font-bold text-gold-gradient">{s.value}</p>
                <div className="gold-line-short mx-auto mt-2 mb-3" />
                <p className="text-xs uppercase tracking-[0.2em] font-bold" style={{ color: 'var(--text-muted)' }}>{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="badge-gold inline-flex mb-4">Core Modules</span>
            <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight" style={{ color: 'var(--text)' }}>
              Premium <span className="text-gold-gradient">ERP Modules</span>
            </h2>
            <div className="gold-line-short mx-auto mt-4 mb-5" />
            <p className="max-w-2xl mx-auto" style={{ color: 'var(--text-muted)' }}>
              Built end-to-end with React, TypeScript, Tailwind, and MySQL — designed for real-world college administration.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.5 }}
                className="premium-card p-6 rounded-2xl border group cursor-pointer"
                style={{
                  background: 'var(--bg-card)',
                  borderColor: 'var(--border)',
                }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition group-hover:scale-110"
                  style={{ background: 'linear-gradient(135deg, rgba(212,175,55,0.15), rgba(245,210,122,0.05))' }}
                >
                  <f.icon size={20} style={{ color: 'var(--gold-dark)' }} />
                </div>
                <h3 className="font-display text-xl font-bold mb-2" style={{ color: 'var(--text)' }}>{f.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 px-4 sm:px-6 border-t" style={{ borderColor: 'var(--border)' }}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="badge-gold inline-flex mb-4">Trusted Voices</span>
            <h2 className="font-display text-4xl sm:text-5xl font-bold" style={{ color: 'var(--text)' }}>
              What <span className="text-gold-gradient">Faculty Says</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="premium-card p-6 rounded-2xl border"
                style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, k) => (
                    <Star key={k} size={14} fill="var(--gold)" strokeWidth={0} />
                  ))}
                </div>
                <p className="text-base leading-relaxed mb-5 font-display italic" style={{ color: 'var(--text-soft)' }}>
                  "{t.text}"
                </p>
                <div className="flex items-center gap-3">
                  <div
                    className="w-11 h-11 rounded-full flex items-center justify-center font-bold text-sm"
                    style={{ background: 'linear-gradient(135deg, #D4AF37, #F5D27A)', color: '#0a0a0a' }}
                  >
                    {t.initials}
                  </div>
                  <div>
                    <p className="text-sm font-bold" style={{ color: 'var(--text)' }}>{t.name}</p>
                    <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="contact" className="py-20 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative rounded-3xl overflow-hidden p-10 sm:p-16 text-center"
            style={{ background: '#0a0a0a' }}
          >
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-10 left-10 w-40 h-40 rounded-full blur-3xl" style={{ background: '#D4AF37' }} />
              <div className="absolute bottom-10 right-10 w-60 h-60 rounded-full blur-3xl" style={{ background: '#F5D27A' }} />
            </div>
            <div className="relative">
              <Building2 size={32} style={{ color: 'var(--gold)' }} className="mx-auto mb-4" />
              <h2 className="font-display text-3xl sm:text-5xl font-bold text-white mb-4">
                Step Into the <span style={{ color: 'var(--gold)' }}>Future of Education</span>
              </h2>
              <p className="text-white/70 max-w-2xl mx-auto mb-8">
                Access the HRS Institute ERP dashboard to manage student records, generate reports, and oversee departments — all in one premium interface.
              </p>
              <Link to="/login" className="btn-gold inline-flex items-center gap-2">
                <Shield size={16} /> Launch Admin Portal <ArrowRight size={16} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-10 px-4 sm:px-6" style={{ borderColor: 'var(--border)' }}>
        <div className="max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-2">
            <Logo size={36} />
            <p className="text-sm mt-3 max-w-sm" style={{ color: 'var(--text-muted)' }}>
              HRS Institute is committed to academic excellence through innovation. This ERP system is a B.Tech AI & Data Science mini project.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider mb-3" style={{ color: 'var(--gold-dark)' }}>Quick Links</h4>
            <ul className="space-y-2 text-sm" style={{ color: 'var(--text-muted)' }}>
              <li><Link to="/login" className="hover:text-[var(--gold-dark)]">Admin Login</Link></li>
              <li><a href="#features" className="hover:text-[var(--gold-dark)]">Features</a></li>
              <li><Link to="/contact" className="hover:text-[var(--gold-dark)]">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider mb-3" style={{ color: 'var(--gold-dark)' }}>Contact</h4>
            <ul className="space-y-2 text-sm" style={{ color: 'var(--text-muted)' }}>
              <li>📍 42, Academic District, Bengaluru</li>
              <li>📞 +91 80 4567 8900</li>
              <li>✉ admin@hrs.edu.in</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-10 pt-6 border-t text-center text-xs" style={{ borderColor: 'var(--border)', color: 'var(--text-muted)' }}>
          © 2024 HRS Institute · Built with React + TypeScript + Tailwind · MySQL Backend Ready
        </div>
      </footer>
    </div>
  )
}