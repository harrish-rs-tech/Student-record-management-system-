import { useState, useEffect } from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Sidebar from './Sidebar'
import Navbar from './Navbar'
import { useApp } from '../context/AppContext'
import { CheckCircle2, XCircle, Info } from 'lucide-react'

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { isAuthenticated, toast } = useApp()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (!isAuthenticated) navigate('/login', { replace: true })
  }, [isAuthenticated, navigate])

  useEffect(() => {
    setSidebarOpen(false)
  }, [location.pathname])

  if (!isAuthenticated) return null

  return (
    <div className="flex min-h-screen" style={{ background: 'var(--bg)' }}>
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col min-w-0">
        <Navbar onMenuClick={() => setSidebarOpen(true)} />

        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>

        <footer
          className="border-t px-4 sm:px-6 py-5 mt-8"
          style={{ borderColor: 'var(--border)', background: 'var(--bg-card)' }}
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-xs text-center sm:text-left" style={{ color: 'var(--text-muted)' }}>
              © 2024 <span className="font-bold" style={{ color: 'var(--gold-dark)' }}>HRS Institute</span> · Student Record Management System · All rights reserved.
            </div>
            <div className="flex items-center gap-4 text-xs" style={{ color: 'var(--text-muted)' }}>
              <a href="#" className="hover:underline">Privacy</a>
              <a href="#" className="hover:underline">Terms</a>
              <span className="badge-gold">v2.4.0</span>
            </div>
          </div>
        </footer>
      </div>

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="fixed bottom-6 right-6 z-50 max-w-sm"
          >
            <div
              className="flex items-start gap-3 px-5 py-4 rounded-2xl shadow-2xl border"
              style={{
                background: 'var(--bg-card)',
                borderColor: toast.type === 'success' ? '#16a34a' :
                  toast.type === 'error' ? '#dc2626' : 'var(--gold)',
              }}
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{
                  background: toast.type === 'success' ? 'rgba(34,197,94,0.15)' :
                    toast.type === 'error' ? 'rgba(220,38,38,0.15)' : 'rgba(212,175,55,0.15)',
                  color: toast.type === 'success' ? '#16a34a' :
                    toast.type === 'error' ? '#dc2626' : 'var(--gold-dark)',
                }}
              >
                {toast.type === 'success' ? <CheckCircle2 size={18} /> :
                  toast.type === 'error' ? <XCircle size={18} /> : <Info size={18} />}
              </div>
              <div className="flex-1">
                <p className="text-xs font-bold uppercase tracking-wider mb-0.5" style={{
                  color: toast.type === 'success' ? '#16a34a' :
                    toast.type === 'error' ? '#dc2626' : 'var(--gold-dark)'
                }}>
                  {toast.type === 'success' ? 'Success' : toast.type === 'error' ? 'Notice' : 'Info'}
                </p>
                <p className="text-sm font-medium" style={{ color: 'var(--text)' }}>
                  {toast.message}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}