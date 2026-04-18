import { motion } from 'framer-motion'
import { FiArrowLeft, FiDownload, FiTarget, FiCalendar } from 'react-icons/fi'
import { Button } from '../ui/Button'
import { formatDate } from '../../utils/formatters'

export default function ActionHeader({ role, timestamp, onBack, onExport }) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12 pt-8 no-print">
      <motion.div
         initial={{ opacity: 0, x: -20 }}
         animate={{ opacity: 1, x: 0 }}
         className="space-y-4"
      >
        <h1 className="text-4xl lg:text-5xl font-extrabold text-primary tracking-tight leading-tight">
          Analysis <span className="gradient-text italic">Result</span>
        </h1>
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 px-4 py-2.5 bg-light rounded-xl border border-purple-100 text-[#7C3AED] font-extrabold shadow-sm">
            <FiTarget size={18} /> 
            <span>{role}</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2.5 bg-white rounded-xl border border-gray-100 text-secondary font-bold shadow-sm">
            <FiCalendar size={16} />
            <span className="text-sm">{formatDate(timestamp)}</span>
          </div>
        </div>
      </motion.div>
      
      <div className="flex items-center gap-4">
        <Button variant="secondary" onClick={onBack} className="px-6">
          <FiArrowLeft /> Try New
        </Button>
        <Button onClick={onExport} className="px-8 shadow-lg shadow-primary/20">
          <FiDownload /> <span>Download PDF</span>
        </Button>
      </div>
    </div>
  )
}

