import { motion } from 'framer-motion'
import { FiArrowLeft, FiDownload, FiTarget } from 'react-icons/fi'
import { Button } from '../ui/Button'
import { formatDate } from '../../utils/formatters'

export default function ActionHeader({ role, timestamp, onBack, onExport }) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16 no-print">
      <motion.div
         initial={{ opacity: 0, x: -20 }}
         animate={{ opacity: 1, x: 0 }}
      >
        <h1 className="text-5xl font-black mb-3 tracking-tighter italic">
          Report <span className="gradient-text">Insights</span>
        </h1>
        <p className="text-text-muted font-bold flex items-center gap-3 bg-white/50 w-fit px-4 py-2 rounded-xl border border-glass-border">
          <FiTarget className="text-primary" /> 
          <span>{role}</span> 
          <span className="opacity-20">|</span> 
          <span className="text-xs uppercase font-black tracking-widest">{formatDate(timestamp)}</span>
        </p>
      </motion.div>
      
      <div className="flex gap-4">
        <Button variant="secondary" onClick={onBack} className="flex items-center gap-2">
          <FiArrowLeft /> Retest
        </Button>
        <Button onClick={onExport} className="flex items-center gap-3 px-8 shadow-2xl">
          <FiDownload /> <span>Export Report</span>
        </Button>
      </div>
    </div>
  )
}
