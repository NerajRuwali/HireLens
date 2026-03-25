import { FiHome, FiClock, FiBarChart2, FiSettings, FiSearch, FiMenu, FiX, FiZap, FiUser } from 'react-icons/fi'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import ThemeToggle from '../components/dashboard/ThemeToggle'
import UserProfile from '../components/dashboard/UserProfile'

const NAV_ITEMS = [
  { name: 'Dashboard', icon: FiHome, path: '/' },
  { name: 'History', icon: FiClock, path: '/history' },
  { name: 'Analytics', icon: FiBarChart2, path: '/analytics' },
  { name: 'Settings', icon: FiSettings, path: '/settings' },
]

export default function DashboardLayout({ children }) {
  const location = useLocation()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [location.pathname])

  const SidebarContent = () => (
    <>
      <div className="flex items-center gap-3 mb-12 px-2">
        <motion.div 
          className="p-2.5 bg-linear-to-br from-primary to-secondary rounded-2xl text-white shadow-lg shadow-primary/20"
          whileHover={{ rotate: 5, scale: 1.05 }}
        >
          <FiZap size={24} />
        </motion.div>
        <span className="text-2xl font-black tracking-tighter text-text-main uppercase">
          Hire<span className="gradient-text italic">Lens</span>
        </span>
      </div>

      <nav className="flex-1 space-y-3">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon
          const isActive = location.pathname === item.path
          return (
            <motion.div
              key={item.name}
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                to={item.path}
                className={`flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 font-bold text-sm ${
                  isActive 
                    ? 'bg-primary text-white shadow-xl shadow-primary/20' 
                    : 'text-text-muted hover:bg-slate-100 hover:text-text-main group'
                }`}
              >
                <Icon size={18} className={`${isActive ? 'text-white' : 'text-primary opacity-60 group-hover:opacity-100'}`} />
                {item.name}
              </Link>
            </motion.div>
          )
        })}
      </nav>

      <div className="mt-auto pt-8 border-t border-glass-border">
        <div className="p-4 bg-primary/5 rounded-2xl border border-primary/10">
          <p className="text-[10px] font-black uppercase text-primary tracking-widest mb-1 leading-none">System</p>
          <p className="text-xs font-bold text-text-muted m-0">Performance: Optimal</p>
        </div>
      </div>
    </>
  )

  return (
    <div className="flex h-screen bg-slate-50 text-text-main transition-colors duration-300 overflow-hidden dark:bg-slate-900 dark:text-slate-100">
      {/* Desktop Sidebar */}
      <aside className="w-72 bg-white border-r border-glass-border flex flex-col p-8 hidden lg:flex shadow-[4px_0_24px_rgba(0,0,0,0.02)] dark:bg-slate-800 dark:border-slate-700">
        <SidebarContent />
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navbar */}
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-glass-border px-6 md:px-10 flex items-center justify-between sticky top-0 z-40 dark:bg-slate-800/80 dark:border-slate-700">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2.5 bg-slate-100 rounded-xl text-text-muted hover:text-primary transition-colors dark:bg-slate-700 dark:text-slate-300"
            >
              <FiMenu size={20} />
            </button>
            <div className="flex items-center gap-4 bg-slate-100 px-5 py-2.5 rounded-2xl border border-glass-border w-full md:w-80 group focus-within:border-primary/40 transition-all dark:bg-slate-700/50 dark:border-slate-600">
              <FiSearch size={16} className="text-text-muted group-focus-within:text-primary transition-colors" />
              <input 
                type="text" 
                placeholder="Search resources..." 
                className="bg-transparent border-none outline-none w-full text-xs font-bold dark:placeholder-slate-500"
              />
            </div>
          </div>

          <div className="flex items-center gap-4 md:gap-8">
            <ThemeToggle />
            <UserProfile />
          </div>
        </header>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-10 scroll-smooth bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="pb-20"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <motion.aside 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="w-72 h-full bg-white p-8 flex flex-col shadow-2xl dark:bg-slate-800"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-end mb-4">
                <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-text-muted hover:text-text-main">
                  <FiX size={24} />
                </button>
              </div>
              <SidebarContent />
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
