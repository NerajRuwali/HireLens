import { motion } from 'framer-motion'

export default function SkillChips({ skills, title, type = 'default' }) {
  const getColors = () => {
    switch (type) {
      case 'missing': return 'bg-amber-50 text-amber-700 border-amber-100 hover:bg-amber-100/50 hover:border-amber-200'
      case 'strength': return 'bg-green-50 text-[#22C55E] border-green-100 hover:bg-green-100/50 hover:border-green-200'
      case 'primary': return 'bg-[#F5F3FF] text-primary border-purple-100 hover:bg-[#EDE9FE] hover:border-primary/20'
      default: return 'bg-gray-50 text-secondary border-gray-100 hover:bg-gray-100/50'
    }
  }

  const colorClass = getColors()

  return (
    <div className="mt-8 last:mb-0">
      <h4 className="text-[11px] font-extrabold text-muted mb-4 uppercase tracking-widest leading-none">{title}</h4>
      <div className="flex flex-wrap gap-2.5">
        {skills?.map((skill, idx) => (
          <motion.span
            key={idx}
            className={`px-4 py-2.5 rounded-xl text-xs font-extrabold border transition-all duration-300 cursor-default shadow-sm ${colorClass}`}
            whileHover={{ scale: 1.05, y: -2, shadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.03 }}
          >
            {skill}
          </motion.span>
        ))}
        {!skills?.length && <p className="text-sm text-secondary font-bold italic">No items found</p>}
      </div>
    </div>
  )
}

