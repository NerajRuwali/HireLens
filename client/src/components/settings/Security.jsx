import { FiShield, FiLock, FiSmartphone, FiKey } from 'react-icons/fi'
import { motion } from 'framer-motion'

export default function Security() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 bg-slate-50 rounded-2xl border border-glass-border hover:border-primary/30 transition-all group dark:bg-slate-700/50 dark:border-slate-600">
          <div className="p-3 bg-blue-100/50 text-blue-600 rounded-xl w-fit mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
            <FiLock size={20} />
          </div>
          <h4 className="font-bold mb-1">Change Password</h4>
          <p className="text-xs text-text-muted mb-4 font-medium">Keep your account secure with a strong password.</p>
          <button className="btn-primary w-full py-2.5 text-xs">Update Password</button>
        </div>

        <div className="p-6 bg-slate-50 rounded-2xl border border-glass-border hover:border-primary/30 transition-all group dark:bg-slate-700/50 dark:border-slate-600">
          <div className="p-3 bg-purple-100/50 text-purple-600 rounded-xl w-fit mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
            <FiSmartphone size={20} />
          </div>
          <h4 className="font-bold mb-1">Two-Factor Auth</h4>
          <p className="text-xs text-text-muted mb-4 font-medium">Add an extra layer of security to your account.</p>
          <button className="px-4 py-2.5 bg-white border border-glass-border rounded-xl text-xs font-black w-full hover:bg-slate-50 transition-all cursor-pointer dark:bg-slate-700 dark:border-slate-600 uppercase tracking-widest">Enable 2FA</button>
        </div>
      </div>

      <div className="glass-card p-8 border-amber-100 bg-amber-50/30 dark:bg-amber-900/10 dark:border-amber-900/30">
        <h4 className="font-bold flex items-center gap-2 text-amber-700 mb-4 dark:text-amber-500">
          <FiShield size={18} /> Active Sessions
        </h4>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-amber-200/50 dark:bg-slate-800 dark:border-slate-700">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-slate-100 rounded-lg dark:bg-slate-700"><FiKey size={16} /></div>
              <div>
                <p className="text-sm font-bold m-0 leading-none">MacBook Pro - Chrome</p>
                <p className="text-[10px] text-text-muted m-0 font-medium uppercase mt-1 tracking-wider">Current Session • India</p>
              </div>
            </div>
            <span className="px-2 py-1 bg-green-100 text-green-700 text-[10px] font-bold rounded-lg uppercase tracking-wider">Active</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
