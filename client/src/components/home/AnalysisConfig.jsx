import { FiTarget, FiChevronDown, FiCpu } from 'react-icons/fi'
import { motion } from 'framer-motion'

export default function AnalysisConfig({ role, setRole, onSubmit, disabled }) {
  const roles = ['Frontend Developer', 'Backend Developer', 'Full Stack Developer', 'Data Scientist', 'UI/UX Designer']

  return (
    <div className="space-y-6">
      <div className="saas-card p-8 flex flex-col gap-8">
        <h3 className="text-xl font-extrabold flex items-center gap-3 text-primary tracking-tight">
          <div className="p-2.5 bg-light rounded-xl text-primary shadow-sm">
            <FiTarget size={20} />
          </div>
          Target Profile
        </h3>
        
        <div className="space-y-4">
          <label className="text-sm font-extrabold text-secondary ml-1 uppercase tracking-widest">Desired Job Role</label>
          <div className="relative group">
            <select 
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-5 py-4 rounded-xl bg-white border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none font-bold appearance-none text-primary pr-12 group-hover:border-primary hover:shadow-md shadow-sm"
            >
              {roles.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
            <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-primary group-hover:scale-110 transition-transform">
              <FiChevronDown size={22} />
            </div>
          </div>
        </div>

        <button 
          onClick={onSubmit}
          disabled={disabled}
          className="btn-primary w-full py-4 text-lg font-bold flex items-center justify-center gap-2 group"
        >
          <FiCpu className="group-hover:rotate-90 transition-transform duration-500" />
          Analyze Now
        </button>
      </div>

      <motion.div 
        className="saas-card p-6 relative overflow-hidden group"
        whileHover={{ y: -2 }}
      >
        <div className="absolute -right-4 -top-4 w-24 h-24 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-all"></div>
        <p className="text-sm text-secondary font-bold leading-relaxed relative z-10">
          "Our AI examines over 50 specific data points to verify your skills against industry standards. Get ready for your next big move."
        </p>
      </motion.div>
    </div>
  )
}

