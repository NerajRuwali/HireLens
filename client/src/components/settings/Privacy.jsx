import { FiEye, FiEyeOff, FiTrash2, FiDownload } from 'react-icons/fi'
import { motion } from 'framer-motion'

export default function Privacy() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="glass-card p-8 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl dark:bg-slate-700/50"><FiEye size={20} /></div>
            <div>
              <h4 className="font-bold m-0">Profile Visibility</h4>
              <p className="text-xs text-text-muted m-0 font-medium">Decide who can see your analysis score</p>
            </div>
          </div>
          <span className="text-[10px] font-black text-primary uppercase cursor-pointer hover:underline tracking-widest">Private</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-slate-50 text-slate-600 rounded-xl dark:bg-slate-700/50"><FiDownload size={20} /></div>
            <div>
              <h4 className="font-bold m-0">Data Portability</h4>
              <p className="text-xs text-text-muted m-0 font-medium">Download a JSON of your analysis history</p>
            </div>
          </div>
          <button className="px-4 py-2 bg-slate-100 rounded-xl text-[10px] font-black hover:bg-slate-200 transition-colors cursor-pointer uppercase tracking-widest dark:bg-slate-700 dark:border dark:border-slate-600">Export JSON</button>
        </div>
      </div>

      <div className="p-8 bg-red-50 border border-red-100 rounded-3xl dark:bg-red-900/10 dark:border-red-900/30">
        <h4 className="font-bold text-red-700 flex items-center gap-2 mb-2 dark:text-red-500">
          <FiTrash2 size={18} /> Danger Zone
        </h4>
        <p className="text-xs text-red-600/70 mb-6 font-medium">Once you delete your history, it cannot be recovered. Please be certain.</p>
        <button className="px-6 py-3 bg-red-500 text-white rounded-xl text-xs font-black shadow-lg shadow-red-200 hover:bg-red-600 transition-all cursor-pointer uppercase tracking-widest">Delete All History</button>
      </div>
    </motion.div>
  )
}
