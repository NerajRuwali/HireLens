import { motion } from 'framer-motion'

export default function SkillChips({ skills, title, type = 'default' }) {
  const getColors = () => {
    switch (type) {
      case 'missing': return 'bg-amber-100/50 text-amber-700 border-amber-200/50'
      case 'strength': return 'bg-green-100/50 text-green-700 border-green-200/50'
      case 'primary': return 'bg-blue-100/50 text-blue-700 border-blue-200/50'
      default: return 'bg-slate-100/50 text-slate-700 border-slate-200/50'
    }
  }

  const colorClass = getColors()

  return (
    <div className="mt-6">
      <h4 className="text-sm font-bold text-text-muted mb-4 uppercase tracking-tighter">{title}</h4>
      <div className="flex flex-wrap gap-2">
        {skills?.map((skill, idx) => (
          <motion.span
            key={idx}
            className={`px-3 py-1.5 rounded-full text-xs font-bold border ${colorClass} backdrop-blur-sm`}
            whileHover={{ scale: 1.05, y: -2 }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.05 }}
          >
            {skill}
          </motion.span>
        ))}
      </div>
    </div>
  )
}
