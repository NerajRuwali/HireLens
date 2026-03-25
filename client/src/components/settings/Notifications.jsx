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
        <div key={i} className="flex items-center justify-between p-6 bg-slate-50 rounded-2xl border border-glass-border hover:border-primary/20 transition-all dark:bg-slate-700/50 dark:border-slate-600">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white rounded-xl text-primary shadow-sm dark:bg-slate-800">
              <s.icon size={20} />
            </div>
            <div>
              <h4 className="font-bold m-0">{s.title}</h4>
              <p className="text-xs text-text-muted m-0 font-medium">{s.desc}</p>
            </div>
          </div>
          <div className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors ${s.enabled ? 'bg-primary' : 'bg-slate-300 dark:bg-slate-600'}`}>
            <div className={`w-4 h-4 bg-white rounded-full transition-transform ${s.enabled ? 'translate-x-6' : 'translate-x-0'}`} />
          </div>
        </div>
      ))}
    </motion.div>
  )
}
