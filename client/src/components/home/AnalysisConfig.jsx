import { FiTarget } from 'react-icons/fi'
import { Card } from '../ui/Card'
import { Button } from '../ui/Button'
import { motion } from 'framer-motion'

export default function AnalysisConfig({ role, setRole, onSubmit, disabled }) {
  const roles = ['Frontend Developer', 'Backend Developer', 'Data Scientist']

  return (
    <div className="space-y-8">
      <Card className="p-10 space-y-8">
        <h3 className="text-xl font-black flex items-center gap-3">
          <FiTarget className="text-primary" /> Analysis Settings
        </h3>
        
        <div className="space-y-4">
          <label className="text-xs font-black text-text-muted uppercase tracking-widest opacity-60">Target Position</label>
          <div className="relative">
            <select 
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full p-5 rounded-2xl bg-slate-50/50 border border-glass-border focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all outline-none font-bold appearance-none text-text-main shadow-inner"
            >
              {roles.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
            <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-text-muted opacity-40 text-xs">▼</div>
          </div>
        </div>

        <Button 
          onClick={onSubmit}
          disabled={disabled}
          className="w-full py-5 text-xl font-black tracking-tight mt-6"
        >
          Analyze Resume
        </Button>
      </Card>

      <motion.div 
        className="p-8 bg-linear-to-br from-primary/5 to-secondary/5 rounded-3xl border border-primary/10"
        whileHover={{ scale: 1.02 }}
      >
        <p className="text-sm text-primary font-bold leading-relaxed italic m-0 opacity-80">
          "Precision analytics power your career pivot. Let our AI bridge the gap between where you are and where you want to be."
        </p>
      </motion.div>
    </div>
  )
}
