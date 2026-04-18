import { FiEye, FiEyeOff, FiTrash2, FiDownload } from 'react-icons/fi'
import { motion } from 'framer-motion'

export default function Privacy() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="saas-card p-8 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-[#F5F3FF] text-[#8B5CF6] rounded-xl"><FiEye size={20} /></div>
            <div>
              <h4 className="font-extrabold text-primary m-0 tracking-tight">Profile Visibility</h4>
              <p className="text-sm text-secondary m-0 font-bold">Decide who can see your analysis score</p>
            </div>
          </div>
          <span className="text-[10px] font-extrabold text-[#8B5CF6] uppercase cursor-pointer hover:underline tracking-widest">Private</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gray-50 text-gray-600 rounded-xl"><FiDownload size={20} /></div>
            <div>
              <h4 className="font-extrabold text-primary m-0 tracking-tight">Data Portability</h4>
              <p className="text-sm text-secondary m-0 font-bold">Download a JSON of your analysis history</p>
            </div>
          </div>
          <button className="px-5 py-2.5 bg-gray-100 rounded-xl text-[10px] font-extrabold text-primary hover:bg-gray-200 transition-colors cursor-pointer uppercase tracking-widest border border-gray-200 shadow-sm">Export JSON</button>
        </div>
      </div>

      <div className="p-8 bg-red-50 border border-red-100 rounded-3xl">
        <h4 className="font-extrabold text-red-700 flex items-center gap-2 mb-2 tracking-tight">
          <FiTrash2 size={18} /> Danger Zone
        </h4>
        <p className="text-sm text-red-600 mb-6 font-bold leading-relaxed">Once you delete your history, it cannot be recovered. Please be certain.</p>
        <button className="px-8 py-3.5 bg-red-600 text-white rounded-xl text-xs font-extrabold shadow-lg shadow-red-200 hover:bg-red-700 hover:scale-105 active:scale-95 transition-all cursor-pointer uppercase tracking-widest">Delete All History</button>
      </div>
    </motion.div>
  )
}
