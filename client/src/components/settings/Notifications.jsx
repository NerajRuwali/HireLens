import { FiBell, FiMail, FiMessageSquare, FiToggleRight } from 'react-icons/fi'
import { motion } from 'framer-motion'

export default function Notifications() {
  const settings = [
    { title: 'Email Notifications', desc: 'Receive analysis reports via email', icon: FiMail, enabled: true },
    { title: 'Browser Alerts', desc: 'Get instant feedback on analysis completion', icon: FiBell, enabled: false },
    { title: 'Product Updates', desc: 'Stay informed about new features', icon: FiToggleRight, enabled: true },
    { title: 'Community Insights', desc: 'Periodic career growth suggestions', icon: FiMessageSquare, enabled: false },
  ]

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {settings.map((s, i) => (
        <div key={i} className="flex items-center justify-between p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:border-[#8B5CF6]/20 transition-all">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-[#F5F3FF] rounded-xl text-[#8B5CF6] shadow-sm">
              <s.icon size={20} />
            </div>
            <div>
              <h4 className="font-extrabold text-primary m-0 tracking-tight">{s.title}</h4>
              <p className="text-sm text-secondary m-0 font-bold">{s.desc}</p>
            </div>
          </div>
          <div className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors ${s.enabled ? 'bg-[#8B5CF6]' : 'bg-gray-200'}`}>
            <div className={`w-4 h-4 bg-white rounded-full transition-transform ${s.enabled ? 'translate-x-6' : 'translate-x-0'}`} />
          </div>
        </div>
      ))}
    </motion.div>
  )
}
