import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiShield, FiBell, FiEye, FiLogOut, FiChevronRight, FiSettings } from 'react-icons/fi'
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
    <div className="max-w-6xl mx-auto py-8 px-4 sm:px-0">
      <div className="mb-12">
        <h1 className="text-4xl font-extrabold mb-2 text-primary">Account <span className="gradient-text italic">Settings</span></h1>
        <p className="text-secondary font-bold text-lg">Manage your security preferences and profile details.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Nav */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-white p-4 rounded-3xl border border-purple-100 shadow-sm space-y-1">
            <h3 className="text-[10px] font-bold text-text-secondary uppercase tracking-widest mb-4 mt-2 px-3 opacity-60">Account Control</h3>
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl font-bold text-sm transition-all duration-200 group ${
                  activeTab === tab.id 
                    ? 'bg-[#EDE9FE] text-[#7C3AED] shadow-sm' 
                    : 'text-[#374151] hover:bg-[#F5F3FF] hover:text-[#7C3AED]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <tab.icon size={18} className={activeTab === tab.id ? 'text-primary' : 'text-text-secondary transition-colors'} />
                  {tab.label}
                </div>
                <FiChevronRight size={14} className={`transition-transform duration-300 ${activeTab === tab.id ? 'translate-x-0 opacity-100' : '-translate-x-2 opacity-0'}`} />
              </button>
            ))}
          </div>

          <button 
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-red-50 text-red-600 font-bold text-sm hover:bg-red-100 transition-all cursor-pointer border border-red-100"
          >
            <FiLogOut size={18} />
            Sign Out
          </button>
        </div>

        {/* Content Area */}
        <div className="lg:col-span-3">
          <div className="bg-white p-8 sm:p-10 rounded-3xl border border-purple-100 shadow-md min-h-[500px]">
             <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="mb-10 pb-6 border-b border-light">
                    <div className="flex items-center gap-3 mb-2">
                       <div className="p-2 bg-light rounded-lg text-primary">
                          <FiSettings size={20} />
                       </div>
                        <h2 className="text-2xl font-extrabold text-primary capitalize tracking-tight">{activeTab}</h2>
                    </div>
                    <p className="text-sm text-secondary font-bold pl-11">Configure and customize your {activeTab} preferences.</p>
                  </div>
                  <div className="pl-0 sm:pl-11">
                    {renderTabContent()}
                  </div>
                </motion.div>
             </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}

