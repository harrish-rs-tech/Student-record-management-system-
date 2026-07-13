import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Mail,
  Phone,
  MapPin,
  Send,
  MessageSquare,
  Building2,
  Clock,
  Globe,
  Sparkles,
  CheckCircle2,
  Headphones,
  Github,
  Twitter,
  Linkedin,
} from 'lucide-react'
import { useApp } from '../context/AppContext'

const contactInfo = [
  { icon: MapPin, label: 'Campus Address', value: '42, Academic District, Hosur Road, Bengaluru, Karnataka 560068' },
  { icon: Phone, label: 'Phone', value: '+91 80 4567 8900', link: 'tel:+918045678900' },
  { icon: Mail, label: 'Email', value: 'admin@hrs.edu.in', link: 'mailto:admin@hrs.edu.in' },
  { icon: Clock, label: 'Office Hours', value: 'Mon – Sat · 09:00 AM – 06:00 PM' },
  { icon: Globe, label: 'Website', value: 'www.hrs.edu.in', link: '#' },
  { icon: Headphones, label: 'Support', value: '24/7 ERP Helpdesk Available' },
]

const departments = [
  { name: 'Admissions Office', email: 'admissions@hrs.edu.in', phone: '+91 80 4567 8901' },
  { name: 'Academic Office', email: 'academic@hrs.edu.in', phone: '+91 80 4567 8902' },
  { name: 'Examination Cell', email: 'exams@hrs.edu.in', phone: '+91 80 4567 8903' },
  { name: 'IT Helpdesk', email: 'support@hrs.edu.in', phone: '+91 80 4567 8904' },
]

export default function Contact() {
  const { showToast, dark } = useApp()
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) {
      showToast('Please fill all required fields', 'error')
      return
    }
    setSubmitting(true)
    setTimeout(() => {
      setSubmitting(false)
      setSubmitted(true)
      showToast('Message sent successfully · We will respond within 24 hrs', 'success')
      setTimeout(() => {
        setSubmitted(false)
        setForm({ name: '', email: '', subject: '', message: '' })
      }, 3000)
    }, 1000)
  }

  return (
    <div className="space-y-5 max-w-[1400px] mx-auto">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-2xl mx-auto">
        <span className="badge-gold inline-flex mb-3">
          <Sparkles size={11} /> Get In Touch
        </span>
        <h1 className="font-display text-4xl sm:text-5xl font-bold mb-3" style={{ color: 'var(--text)' }}>
          Contact <span className="text-gold-gradient">HRS Institute</span>
        </h1>
        <p style={{ color: 'var(--text-muted)' }}>
          Have questions about the ERP system, admissions, or academic programs? Our team is here to help.
        </p>
      </motion.div>

      {/* Contact info cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {contactInfo.map((c, i) => {
          const content = (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 + i * 0.04 }}
              className="premium-card p-5 rounded-2xl border group h-full"
              style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center mb-3 transition-transform group-hover:scale-110"
                style={{ background: 'linear-gradient(135deg, rgba(212,175,55,0.15), rgba(245,210,122,0.05))' }}
              >
                <c.icon size={18} style={{ color: 'var(--gold-dark)' }} />
              </div>
              <p className="text-[10px] uppercase tracking-wider font-bold mb-1" style={{ color: 'var(--text-muted)' }}>
                {c.label}
              </p>
              <p className="text-sm font-semibold" style={{ color: 'var(--text)' }}>{c.value}</p>
            </motion.div>
          )
          return c.link ? (
            <a key={i} href={c.link} className="block">{content}</a>
          ) : <div key={i}>{content}</div>
        })}
      </div>

      {/* Form + Departments */}
      <div className="grid lg:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="lg:col-span-2 p-6 sm:p-8 rounded-2xl border"
          style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}
        >
          <div className="flex items-center gap-2 mb-2">
            <MessageSquare size={20} style={{ color: 'var(--gold-dark)' }} />
            <h3 className="font-display text-2xl font-bold" style={{ color: 'var(--text)' }}>Send a Message</h3>
          </div>
          <p className="text-sm mb-6" style={{ color: 'var(--text-muted)' }}>
            Fill out the form and our team will get back to you within 24 hours.
          </p>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-12 text-center"
            >
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #16a34a, #4ade80)' }}
              >
                <CheckCircle2 size={40} color="#fff" />
              </motion.div>
              <h4 className="font-display text-xl font-bold mb-1" style={{ color: 'var(--text)' }}>Message Sent!</h4>
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>We'll respond to <strong style={{ color: 'var(--gold-dark)' }}>{form.email}</strong> shortly.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color: 'var(--text-soft)' }}>
                    Full Name <span style={{ color: '#dc2626' }}>*</span>
                  </label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm(f => ({ ...f, name: e.target.value }))}
                    placeholder="Your full name"
                    className="input-premium"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color: 'var(--text-soft)' }}>
                    Email <span style={{ color: '#dc2626' }}>*</span>
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm(f => ({ ...f, email: e.target.value }))}
                    placeholder="you@example.com"
                    className="input-premium"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color: 'var(--text-soft)' }}>
                  Subject
                </label>
                <input
                  type="text"
                  value={form.subject}
                  onChange={(e) => setForm(f => ({ ...f, subject: e.target.value }))}
                  placeholder="What is this regarding?"
                  className="input-premium"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color: 'var(--text-soft)' }}>
                  Message <span style={{ color: '#dc2626' }}>*</span>
                </label>
                <textarea
                  value={form.message}
                  onChange={(e) => setForm(f => ({ ...f, message: e.target.value }))}
                  rows={5}
                  placeholder="Tell us how we can help..."
                  className="input-premium resize-none"
                />
              </div>
              <motion.button
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={submitting}
                className="btn-gold w-full inline-flex items-center justify-center gap-2"
              >
                {submitting ? (
                  <>
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full"
                    />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={16} /> Send Message
                  </>
                )}
              </motion.button>
            </form>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-4"
        >
          <div className="p-5 rounded-2xl border" style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}>
            <h3 className="font-display text-lg font-bold mb-4 flex items-center gap-2" style={{ color: 'var(--text)' }}>
              <Building2 size={18} style={{ color: 'var(--gold-dark)' }} /> Departments
            </h3>
            <div className="space-y-3">
              {departments.map((d, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.35 + i * 0.05 }}
                  className="p-3 rounded-xl"
                  style={{ background: 'var(--bg-soft)' }}
                >
                  <p className="font-bold text-sm" style={{ color: 'var(--text)' }}>{d.name}</p>
                  <p className="text-[11px] mt-0.5 truncate" style={{ color: 'var(--gold-dark)' }}>{d.email}</p>
                  <p className="text-[11px]" style={{ color: 'var(--text-muted)' }}>{d.phone}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="p-5 rounded-2xl border relative overflow-hidden" style={{
            background: dark ? 'linear-gradient(135deg, #0a0a0a, #1a1a1a)' : 'linear-gradient(135deg, #0a0a0a, #2a2a2a)',
            borderColor: 'var(--gold-dark)',
          }}>
            <div className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-30" style={{ background: 'var(--gold)' }} />
            <div className="relative">
              <h3 className="font-display text-lg font-bold text-white mb-2">Follow Us</h3>
              <p className="text-xs text-white/60 mb-4">Stay updated with HRS Institute</p>
              <div className="flex gap-2">
                {[
                  { icon: Twitter, label: 'Twitter' },
                  { icon: Linkedin, label: 'LinkedIn' },
                  { icon: Github, label: 'GitHub' },
                  { icon: Mail, label: 'Email' },
                ].map((s, i) => (
                  <motion.a
                    key={i}
                    whileHover={{ y: -2 }}
                    href="#"
                    aria-label={s.label}
                    className="w-10 h-10 rounded-xl flex items-center justify-center transition"
                    style={{ background: 'rgba(212,175,55,0.15)', color: 'var(--gold)' }}
                  >
                    <s.icon size={16} />
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Map */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="p-2 rounded-2xl border overflow-hidden"
        style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}
      >
        <div className="relative h-64 sm:h-80 rounded-xl overflow-hidden">
          <svg viewBox="0 0 800 300" className="w-full h-full" style={{ background: 'linear-gradient(135deg, #f4f1ea, #ece7d6)' }}>
            <defs>
              <pattern id="mapPattern" patternUnits="userSpaceOnUse" width="40" height="40">
                <rect width="40" height="40" fill="none" />
                <path d="M0 20 L40 20 M20 0 L20 40" stroke="rgba(212,175,55,0.1)" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="800" height="300" fill="url(#mapPattern)" />

            {/* Roads */}
            <path d="M0 150 Q200 100 400 150 T800 130" stroke="rgba(10,10,10,0.15)" strokeWidth="14" fill="none" />
            <path d="M300 0 L320 300" stroke="rgba(10,10,10,0.1)" strokeWidth="10" fill="none" />
            <path d="M600 0 L580 300" stroke="rgba(10,10,10,0.1)" strokeWidth="10" fill="none" />

            {/* Blocks */}
            <rect x="80" y="40" width="120" height="60" rx="6" fill="rgba(212,175,55,0.15)" stroke="rgba(212,175,55,0.3)" strokeWidth="1.5" />
            <rect x="240" y="50" width="100" height="50" rx="6" fill="rgba(212,175,55,0.1)" stroke="rgba(212,175,55,0.2)" strokeWidth="1" />
            <rect x="380" y="180" width="140" height="70" rx="6" fill="rgba(212,175,55,0.15)" stroke="rgba(212,175,55,0.3)" strokeWidth="1.5" />
            <rect x="560" y="40" width="130" height="70" rx="6" fill="rgba(212,175,55,0.1)" stroke="rgba(212,175,55,0.2)" strokeWidth="1" />

            {/* Marker */}
            <motion.g
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <circle cx="450" cy="220" r="40" fill="rgba(212,175,55,0.2)" />
              <circle cx="450" cy="220" r="22" fill="rgba(212,175,55,0.4)" />
              <circle cx="450" cy="220" r="12" fill="#D4AF37" stroke="#fff" strokeWidth="3" />
              <path d="M450 232 L444 250 L450 245 L456 250 Z" fill="#D4AF37" />
            </motion.g>

            {/* Label */}
            <g>
              <rect x="320" y="250" width="260" height="36" rx="10" fill="#0a0a0a" />
              <text x="450" y="273" textAnchor="middle" fill="#D4AF37" fontFamily="Inter, sans-serif" fontSize="12" fontWeight="700">
                HRS Institute · Bengaluru
              </text>
            </g>
          </svg>
        </div>
      </motion.div>
    </div>
  )
}