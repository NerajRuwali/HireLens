import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiUser, FiShield, FiBell, FiEye, FiLogOut, FiChevronRight } from 'react-icons/fi'
import Security from '../components/settings/Security'
import Notifications from '../components/settings/Notifications'
import Privacy from '../components/settings/Privacy'
import { clearSession } from '../services/auth'
import { useNavigate } from 'react-router-dom'

const TABS = [
  { id: 'security', label: 'Security', icon: FiShield },
  { id: 'notifications', label: 'Notifications', icon: FiBell },
  { id: 'privacy', label: 'Privacy', icon: FiEye },
]

export default function Settings() {
  const [activeTab, setActiveTab] = useState('security')
  const navigate = useNavigate()

  const handleLogout = () => {
    clearSession()
    navigate('/login')
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'security': return <Security />
      case 'notifications': return <Notifications />
      case 'privacy': return <Privacy />
      default: return <Security />
    }
  }

  return (
    <div className="max-w-6xl mx-auto py-8">
      <div className="mb-12">
        <h1 className="text-4xl font-extrabold mb-2">Account <span className="gradient-text">Settings</span></h1>
        <p className="text-text-muted font-medium">Manage your security preferences and profile details.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
        {/* Sidebar Nav */}
        <div className="lg:col-span-1 space-y-6">
          <div className="glass-card p-6 space-y-2">
            <h3 className="text-xs font-black text-text-muted uppercase tracking-widest mb-4 px-2">Account Control</h3>
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl font-bold text-sm transition-all duration-300 group ${
                  activeTab === tab.id 
                    ? 'bg-primary text-white shadow-xl shadow-primary/20 scale-[1.02]' 
                    : 'text-text-muted hover:bg-slate-50 hover:text-text-main'
                }`}
              >
                <div className="flex items-center gap-3">
                  <tab.icon size={18} className={activeTab === tab.id ? 'text-white' : 'text-primary/60 group-hover:text-primary'} />
                  {tab.label}
                </div>
                <FiChevronRight size={14} className={activeTab === tab.id ? 'opacity-100' : 'opacity-0'} />
              </button>
            ))}
          </div>

          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-6 py-4 rounded-2xl bg-red-50 text-red-600 font-black text-xs uppercase tracking-widest hover:bg-red-100 transition-all cursor-pointer shadow-sm shadow-red-100"
          >
            <FiLogOut size={16} />
            Sign Out
          </button>
        </div>

        {/* Content Area */}
        <div className="lg:col-span-3">
          <div className="glass-card p-10 min-h-[500px]">
             <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="mb-10 pb-6 border-b border-glass-border">
                    <h2 className="text-2xl font-black capitalize">{activeTab}</h2>
                    <p className="text-sm text-text-muted">Configure and customize your {activeTab} preferences.</p>
                  </div>
                  {renderTabContent()}
                </motion.div>
             </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}
