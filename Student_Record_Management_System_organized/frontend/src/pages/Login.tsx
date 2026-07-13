import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate, Link } from 'react-router-dom'
import {
  Eye,
  EyeOff,
  Lock,
  User,
  Shield,
  Sparkles,
  ArrowLeft,
  GraduationCap,
  AlertCircle,
} from 'lucide-react'
import Logo from '../components/Logo'
import { useApp } from '../context/AppContext'

export default function Login() {
  const { login, showToast } = useApp()
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [show, setShow] = useState(false)
  const [remember, setRemember] = useState(true)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showForgot, setShowForgot] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (!username || !password) {
      setError('Please enter both username and password')
      return
    }
    if (password.length < 4) {
      setError('Password must be at least 4 characters')
      return
    }
    setLoading(true)
    setTimeout(() => {
      const success = login(username, password, remember)
      setLoading(false)
      if (success) {
        showToast('Welcome back, Dr. Anand Krishnan', 'success')
        navigate('/dashboard')
      }
    }, 800)
  }

  const handleForgot = (e: React.FormEvent) => {
    e.preventDefault()
    showToast('Password reset link sent to your registered email', 'success')
    setShowForgot(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8 relative overflow-hidden" style={{ background: 'var(--bg)' }}>
      {/* Animated background */}
      <div className="absolute inset-0 bg-pattern" />
      <div className="absolute inset-0 bg-grid opacity-40" />
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-10 -left-20 w-96 h-96 rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, #F5D27A, transparent)' }}
        />
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, delay: 2 }}
          className="absolute bottom-10 -right-20 w-[28rem] h-[28rem] rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, #D4AF37, transparent)' }}
        />
      </div>

      {/* Decorative geometric shapes */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        className="absolute top-20 right-20 w-32 h-32 border-2 rounded-full hidden lg:block"
        style={{ borderColor: 'rgba(212,175,55,0.2)' }}
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
        className="absolute bottom-20 left-20 w-24 h-24 border-2 rounded-full hidden lg:block"
        style={{ borderColor: 'rgba(212,175,55,0.15)' }}
      />

      <div className="relative w-full max-w-md">
        <Link
          to="/"
          className="inline-flex items-center gap-2 mb-6 text-sm font-semibold hover:gap-3 transition-all"
          style={{ color: 'var(--gold-dark)' }}
        >
          <ArrowLeft size={14} /> Back to Home
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="gradient-border p-8 sm:p-10 shadow-2xl"
        >
          {/* Header */}
          <div className="text-center mb-7">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
              className="flex justify-center mb-4"
            >
              <Logo size={64} showText={false} />
            </motion.div>

            <span className="badge-gold inline-flex mb-3">
              <Shield size={11} /> Secure Admin Portal
            </span>

            <h1 className="font-display text-2xl sm:text-3xl font-bold leading-tight" style={{ color: 'var(--text)' }}>
              Welcome to Student Record
            </h1>
            <h1 className="font-display text-2xl sm:text-3xl font-bold leading-tight text-gold-gradient">
              Management System
            </h1>
            <div className="gold-line-short mx-auto mt-3 mb-2" />
            <p className="text-sm flex items-center justify-center gap-1.5" style={{ color: 'var(--text-muted)' }}>
              <GraduationCap size={12} /> HRS Institute · Admin Dashboard
            </p>
          </div>

          {!showForgot ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Username */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color: 'var(--text-soft)' }}>
                  Username
                </label>
                <div className="relative">
                  <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: 'var(--text-muted)' }} />
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="admin@hrs.edu.in"
                    className="input-premium pl-11"
                    autoComplete="username"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color: 'var(--text-soft)' }}>
                  Password
                </label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: 'var(--text-muted)' }} />
                  <input
                    type={show ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="input-premium pl-11 pr-11"
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShow(!show)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-md hover:bg-black/5 dark:hover:bg-white/5 transition"
                    aria-label="Toggle password"
                  >
                    {show ? <EyeOff size={16} style={{ color: 'var(--text-muted)' }} /> : <Eye size={16} style={{ color: 'var(--text-muted)' }} />}
                  </button>
                </div>
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold"
                  style={{ background: 'rgba(220,38,38,0.1)', color: '#dc2626' }}
                >
                  <AlertCircle size={14} />
                  {error}
                </motion.div>
              )}

              {/* Remember + Forgot */}
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                    className="checkbox-premium"
                  />
                  <span style={{ color: 'var(--text-soft)' }}>Remember me</span>
                </label>
                <button
                  type="button"
                  onClick={() => setShowForgot(true)}
                  className="text-xs font-bold hover:underline"
                  style={{ color: 'var(--gold-dark)' }}
                >
                  Forgot Password?
                </button>
              </div>

              {/* Submit */}
              <motion.button
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="btn-gold w-full mt-2 relative overflow-hidden flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full"
                    />
                    Authenticating...
                  </>
                ) : (
                  <>
                    <Shield size={16} /> Secure Login
                  </>
                )}
              </motion.button>

              {/* Demo helper */}
              <div className="mt-4 p-3 rounded-xl text-xs flex items-start gap-2" style={{ background: 'rgba(212,175,55,0.08)', border: '1px dashed rgba(212,175,55,0.3)' }}>
                <Sparkles size={14} style={{ color: 'var(--gold-dark)' }} className="flex-shrink-0 mt-0.5" />
                <div style={{ color: 'var(--text-soft)' }}>
                  <strong style={{ color: 'var(--gold-dark)' }}>Demo credentials:</strong> any username + password (min 4 chars).
                </div>
              </div>
            </form>
          ) : (
            <form onSubmit={handleForgot} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color: 'var(--text-soft)' }}>
                  Registered Email
                </label>
                <div className="relative">
                  <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: 'var(--text-muted)' }} />
                  <input type="email" placeholder="admin@hrs.edu.in" className="input-premium pl-11" required />
                </div>
                <p className="text-xs mt-2" style={{ color: 'var(--text-muted)' }}>
                  We'll send a secure reset link to your email.
                </p>
              </div>
              <motion.button whileTap={{ scale: 0.98 }} type="submit" className="btn-gold w-full">
                Send Reset Link
              </motion.button>
              <button
                type="button"
                onClick={() => setShowForgot(false)}
                className="w-full text-sm font-semibold hover:underline"
                style={{ color: 'var(--gold-dark)' }}
              >
                ← Back to login
              </button>
            </form>
          )}
        </motion.div>

        <p className="text-center text-xs mt-5" style={{ color: 'var(--text-muted)' }}>
          Protected by HRS Institute · © 2024 · v2.4.0
        </p>
      </div>
    </div>
  )
}