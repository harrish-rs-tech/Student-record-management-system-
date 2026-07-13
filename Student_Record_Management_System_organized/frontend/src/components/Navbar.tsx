import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Bell,
  Sun,
  Moon,
  Menu,
  Search,
  LogOut,
  User,
  Settings,
  ChevronDown,
  Sparkles,
} from 'lucide-react'
import { useApp } from '../context/AppContext'
import Logo from './Logo'

type NavbarProps = {
  onMenuClick: () => void
}

export default function Navbar({ onMenuClick }: NavbarProps) {
  const { dark, toggleDark, notifications, unreadCount, markAllRead, logout, user } = useApp()
  const [notifOpen, setNotifOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [search, setSearch] = useState('')
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (search.trim()) {
      navigate(`/students?q=${encodeURIComponent(search)}`)
      setSearch('')
    }
  }

  return (
    <header
      className="sticky top-0 z-30 border-b backdrop-blur-xl"
      style={{
        background: dark ? 'rgba(15,15,15,0.85)' : 'rgba(255,255,255,0.85)',
        borderColor: 'var(--border)',
      }}
    >
      <div className="flex items-center justify-between px-4 sm:px-6 py-3 gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition"
            aria-label="Open sidebar"
          >
            <Menu size={20} />
          </button>
          <div className="lg:hidden">
            <Logo size={32} />
          </div>
          <div className="hidden md:block">
            <h1 className="text-sm font-semibold" style={{ color: 'var(--text)' }}>
              Welcome back, <span style={{ color: 'var(--gold-dark)' }}>{user?.name.split(' ')[1] || 'Admin'}</span>
            </h1>
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
              HRS Institute · Academic Year 2024–25
            </p>
          </div>
        </div>

        <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: 'var(--text-muted)' }} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search students, IDs, departments..."
            className="input-premium pl-10 text-sm"
          />
        </form>

        <div className="flex items-center gap-1 sm:gap-2">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={toggleDark}
            className="p-2.5 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition"
            aria-label="Toggle theme"
          >
            {dark ? <Sun size={18} style={{ color: 'var(--gold)' }} /> : <Moon size={18} />}
          </motion.button>

          <div className="relative">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => { setNotifOpen(o => !o); setProfileOpen(false) }}
              className="p-2.5 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition relative"
              aria-label="Notifications"
            >
              <Bell size={18} />
              {unreadCount > 0 && (
                <span
                  className="absolute top-1.5 right-1.5 w-4 h-4 text-[10px] font-bold rounded-full flex items-center justify-center text-black"
                  style={{ background: 'linear-gradient(135deg, #F5D27A, #D4AF37)' }}
                >
                  {unreadCount}
                </span>
              )}
            </motion.button>

            <AnimatePresence>
              {notifOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.95 }}
                  transition={{ duration: 0.18 }}
                  className="absolute right-0 mt-2 w-80 rounded-2xl border shadow-premium overflow-hidden"
                  style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}
                >
                  <div className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: 'var(--border)' }}>
                    <h3 className="font-bold text-sm">Notifications</h3>
                    <button
                      onClick={markAllRead}
                      className="text-xs font-semibold hover:underline"
                      style={{ color: 'var(--gold-dark)' }}
                    >
                      Mark all read
                    </button>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {notifications.map(n => (
                      <div
                        key={n.id}
                        className="px-4 py-3 border-b hover:bg-black/5 dark:hover:bg-white/5 transition cursor-pointer"
                        style={{ borderColor: 'var(--border)' }}
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                            style={{
                              background: n.type === 'success' ? 'rgba(34,197,94,0.15)' :
                                n.type === 'warning' ? 'rgba(245,158,11,0.15)' : 'rgba(212,175,55,0.15)',
                              color: n.type === 'success' ? '#16a34a' :
                                n.type === 'warning' ? '#f59e0b' : 'var(--gold-dark)',
                            }}
                          >
                            <Sparkles size={14} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <p className="text-sm font-semibold truncate" style={{ color: 'var(--text)' }}>{n.title}</p>
                              {!n.read && (
                                <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: 'var(--gold)' }} />
                              )}
                            </div>
                            <p className="text-xs mt-0.5 line-clamp-2" style={{ color: 'var(--text-muted)' }}>{n.message}</p>
                            <p className="text-[10px] mt-1" style={{ color: 'var(--text-muted)' }}>{n.time}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="px-4 py-2 text-center">
                    <button className="text-xs font-semibold hover:underline" style={{ color: 'var(--gold-dark)' }}>
                      View all notifications
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="relative">
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => { setProfileOpen(o => !o); setNotifOpen(false) }}
              className="flex items-center gap-2 pl-1.5 pr-2 py-1.5 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition"
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs"
                style={{ background: 'linear-gradient(135deg, #D4AF37, #F5D27A)', color: '#0a0a0a' }}
              >
                {user?.avatar}
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-xs font-bold leading-tight" style={{ color: 'var(--text)' }}>{user?.name}</p>
                <p className="text-[10px] leading-tight" style={{ color: 'var(--text-muted)' }}>{user?.role}</p>
              </div>
              <ChevronDown size={14} className="hidden sm:block" />
            </motion.button>

            <AnimatePresence>
              {profileOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.95 }}
                  transition={{ duration: 0.18 }}
                  className="absolute right-0 mt-2 w-56 rounded-2xl border shadow-premium overflow-hidden"
                  style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}
                >
                  <div className="px-4 py-3 border-b" style={{ borderColor: 'var(--border)' }}>
                    <p className="text-sm font-bold" style={{ color: 'var(--text)' }}>{user?.name}</p>
                    <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{user?.role}</p>
                  </div>
                  <div className="py-1">
                    <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-black/5 dark:hover:bg-white/5 transition" style={{ color: 'var(--text)' }}>
                      <User size={15} /> Profile
                    </button>
                    <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-black/5 dark:hover:bg-white/5 transition" style={{ color: 'var(--text)' }}>
                      <Settings size={15} /> Settings
                    </button>
                    <div className="border-t my-1" style={{ borderColor: 'var(--border)' }} />
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-red-500/10 transition"
                      style={{ color: '#dc2626' }}
                    >
                      <LogOut size={15} /> Logout
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  )
}