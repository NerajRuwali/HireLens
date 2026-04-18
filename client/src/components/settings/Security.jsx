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
        <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:border-[#8B5CF6]/30 transition-all group">
          <div className="p-3 bg-[#F5F3FF] text-[#8B5CF6] rounded-xl w-fit mb-4 group-hover:bg-[#8B5CF6] group-hover:text-white transition-colors">
            <FiLock size={20} />
          </div>
          <h4 className="font-extrabold text-primary mb-1 tracking-tight">Change Password</h4>
          <p className="text-xs text-secondary mb-4 font-bold">Keep your account secure with a strong password.</p>
          <button className="btn-primary w-full py-2.5 text-xs">Update Password</button>
        </div>

        <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:border-[#8B5CF6]/30 transition-all group">
          <div className="p-3 bg-[#F5F3FF] text-[#8B5CF6] rounded-xl w-fit mb-4 group-hover:bg-[#8B5CF6] group-hover:text-white transition-colors">
            <FiSmartphone size={20} />
          </div>
          <h4 className="font-extrabold text-primary mb-1 tracking-tight">Two-Factor Auth</h4>
          <p className="text-xs text-secondary mb-4 font-bold">Add an extra layer of security to your account.</p>
          <button className="px-4 py-2.5 bg-white border border-gray-100 rounded-xl text-xs font-extrabold text-primary w-full hover:bg-[#F5F3FF] hover:border-[#8B5CF6]/50 transition-all cursor-pointer uppercase tracking-widest shadow-sm">Enable 2FA</button>
        </div>
      </div>

      <div className="saas-card p-8 border-purple-100 bg-[#F5F3FF]/50 mt-4">
        <h4 className="font-extrabold flex items-center gap-2 text-[#7C3AED] mb-6 tracking-tight">
          <FiShield size={20} /> Active Sessions
        </h4>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-5 bg-white rounded-xl border border-purple-100 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="p-2.5 bg-[#F5F3FF] rounded-lg text-[#8B5CF6]"><FiKey size={18} /></div>
              <div>
                <p className="text-sm font-extrabold text-primary">MacBook Pro - Chrome</p>
                <p className="text-[10px] text-muted font-extrabold uppercase mt-1 tracking-widest">Current Session • India</p>
              </div>
            </div>
            <span className="px-2.5 py-1 bg-green-100 text-green-700 text-[10px] font-extrabold rounded-lg uppercase tracking-wider">Active</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
