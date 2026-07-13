import { NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import {
  LayoutDashboard,
  Users,
  UserPlus,
  UserMinus,
  FileText,
  Mail,
  X,
  GraduationCap,
} from 'lucide-react'
import Logo from './Logo'

const links = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/students', label: 'Student Records', icon: Users },
  { to: '/students/add', label: 'Add Student', icon: UserPlus },
  { to: '/students/delete', label: 'Delete Student', icon: UserMinus },
  { to: '/reports', label: 'Reports', icon: FileText },
  { to: '/contact', label: 'Contact', icon: Mail },
]

type SidebarProps = {
  open: boolean
  onClose: () => void
}

export default function Sidebar({ open, onClose }: SidebarProps) {
  const location = useLocation()
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)

  const content = (
    <div
      className="h-full flex flex-col border-r"
      style={{
        background: 'var(--bg-card)',
        borderColor: 'var(--border)',
      }}
    >
      <div className="px-5 py-5 border-b flex items-center justify-between" style={{ borderColor: 'var(--border)' }}>
        <Logo size={36} />
        <button
          onClick={onClose}
          className="lg:hidden p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition"
          aria-label="Close sidebar"
        >
          <X size={18} />
        </button>
      </div>

      <div className="px-5 pt-5 pb-2">
        <p className="text-[10px] uppercase tracking-[0.2em] font-bold" style={{ color: 'var(--text-muted)' }}>
          Main Menu
        </p>
      </div>

      <nav className="flex-1 overflow-y-auto sidebar-scroll px-3 py-2 space-y-1">
        {links.map((link, idx) => {
          const Icon = link.icon
          const isActive = location.pathname === link.to ||
            (link.to !== '/dashboard' && location.pathname.startsWith(link.to))
          return (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={onClose}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
              className={`nav-link ${isActive ? 'active' : ''}`}
            >
              <motion.div
                animate={{ scale: hoveredIdx === idx || isActive ? 1.1 : 1, rotate: isActive ? -3 : 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <Icon size={18} strokeWidth={isActive ? 2.4 : 2} />
              </motion.div>
              <span>{link.label}</span>
              {isActive && (
                <motion.div
                  layoutId="activeIndicator"
                  className="ml-auto w-1.5 h-1.5 rounded-full"
                  style={{ background: 'var(--gold)' }}
                />
              )}
            </NavLink>
          )
        })}
      </nav>

      <div className="p-4 m-3 rounded-2xl glass-strong border" style={{ borderColor: 'var(--border)' }}>
        <div className="flex items-center gap-3 mb-3">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm"
            style={{ background: 'linear-gradient(135deg, #D4AF37, #F5D27A)', color: '#0a0a0a' }}
          >
            <GraduationCap size={20} />
          </div>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider" style={{ color: 'var(--gold-dark)' }}>
              Need Help?
            </p>
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
              Support Center
            </p>
          </div>
        </div>
        <p className="text-xs mb-3" style={{ color: 'var(--text-soft)' }}>
          Access documentation, tutorials, and reach our team.
        </p>
        <a
          href="/contact"
          onClick={onClose}
          className="block text-center py-2 rounded-lg text-xs font-bold transition"
          style={{ background: 'var(--gold)', color: '#0a0a0a' }}
        >
          Get Support
        </a>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop */}
      <aside className="hidden lg:block w-72 h-screen sticky top-0 flex-shrink-0">
        {content}
      </aside>

      {/* Mobile */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            />
            <motion.aside
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="lg:hidden fixed left-0 top-0 bottom-0 w-72 z-50 shadow-2xl"
            >
              {content}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}