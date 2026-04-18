import { FiHome, FiClock, FiBarChart2, FiSettings, FiSearch, FiMenu, FiX, FiZap, FiUser } from 'react-icons/fi'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import UserProfile from '../components/dashboard/UserProfile'

const NAV_ITEMS = [
  { name: 'Home', icon: FiHome, path: '/' },
  { name: 'History', icon: FiClock, path: '/history' },
  { name: 'Analytics', icon: FiBarChart2, path: '/analytics' },
  { name: 'Settings', icon: FiSettings, path: '/settings' },
]

export default function DashboardLayout({ children }) {
  const location = useLocation()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    setIsMobileMenuOpen(false)
    const handleScroll = () => setScrolled(window.scrollY > 0)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [location.pathname])

  const SidebarContent = () => (
    <>
      <div className="flex items-center gap-3 mb-10 px-2 pt-2">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="p-2 bg-primary rounded-xl text-white shadow-lg shadow-primary/30 group-hover:scale-110 transition-transform duration-300">
            <FiZap size={22} strokeWidth={2.5} />
          </div>
          <span className="text-2xl font-extrabold tracking-tight text-primary">
            Hire<span className="text-primary group-hover:text-primary-hover transition-colors">Lens</span>
          </span>
        </Link>
      </div>

      <nav className="flex-1 space-y-1">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon
          const isActive = location.pathname === item.path
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-200 font-bold text-sm group ${
                isActive 
                  ? 'bg-[#EDE9FE] text-[#7C3AED] shadow-sm' 
                  : 'text-[#374151] hover:bg-[#F5F3FF] hover:text-[#7C3AED]'
              }`}
            >
              <Icon size={20} className={`${isActive ? 'text-[#7C3AED]' : 'text-[#6B7280] group-hover:text-[#7C3AED] transition-colors'}`} />
              {item.name}
            </Link>
          )
        })}
      </nav>

      <div className="mt-auto pt-6 border-t border-gray-100">
        <div className="p-4 bg-light rounded-2xl border border-purple-100 shadow-sm transition-all hover:bg-[#EDE9FE]">
          <div className="flex items-center gap-2 mb-2 text-primary">
            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <p className="text-[11px] font-extrabold uppercase tracking-widest leading-none">System Status</p>
          </div>
          <p className="text-xs font-bold text-secondary pl-3.5 leading-none">v2.4 • Active</p>
        </div>
      </div>
    </>
  )

  return (
    <div className="flex h-screen bg-background text-primary overflow-hidden font-sans">
      {/* Desktop Sidebar */}
      <aside className="w-64 bg-white border-r border-purple-100 flex flex-col p-6 hidden lg:flex">
        <SidebarContent />
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-full">
        {/* Top Navbar */}
        <header className={`h-20 px-6 md:px-10 flex items-center justify-between sticky top-0 z-40 transition-all ${scrolled ? 'bg-white border-b border-gray-100 shadow-sm' : 'bg-transparent'}`}>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2.5 rounded-xl text-text-secondary hover:bg-purple-50 hover:text-primary transition-colors"
            >
              <FiMenu size={22} />
            </button>
            <div className="flex items-center gap-3 bg-white px-4 py-2.5 rounded-xl border border-gray-200 w-full md:w-80 group focus-within:ring-2 focus-within:ring-primary/20 transition-all shadow-sm">
              <FiSearch size={18} className="text-muted group-focus-within:text-primary transition-colors" />
              <input 
                type="text" 
                placeholder="Search analysis..." 
                className="bg-transparent border-none outline-none w-full text-sm font-bold text-primary placeholder:text-[#9CA3AF]"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <UserProfile />
          </div>
        </header>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-10 scroll-smooth">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="pb-12 h-full"
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
            className="fixed inset-0 bg-text-main/20 backdrop-blur-sm z-50 lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <motion.aside 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="w-72 h-full bg-white p-6 flex flex-col shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-end mb-4">
                <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-text-secondary hover:text-primary transition-colors">
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

