import { motion } from 'framer-motion'
import { FiCheckCircle, FiXCircle, FiInfo, FiTag, FiAward, FiAlertTriangle, FiZap } from 'react-icons/fi'

function AnalysisList({ title, items = [], variant = 'default' }) {
  const isTagVariant = variant === 'tags'

  let config = {
    icon: <FiZap size={18} />,
    bg: 'bg-purple-50',
    border: 'border-purple-100',
    color: 'text-primary'
  }

  if (variant === 'strengths') {
    config = { icon: <FiAward size={18} />, bg: 'bg-green-50', border: 'border-green-100', color: 'text-green-600' }
  } else if (variant === 'weaknesses') {
    config = { icon: <FiAlertTriangle size={18} />, bg: 'bg-red-50', border: 'border-red-100', color: 'text-red-500' }
  } else if (variant === 'tags') {
    config = { icon: <FiTag size={18} />, bg: 'bg-purple-50', border: 'border-purple-100', color: 'text-primary' }
  }

  return (
    <motion.div
      className="bg-white p-6 rounded-3xl border border-purple-100 shadow-sm transition-all duration-300 hover:shadow-md group"
      initial={{ opacity: 0, x: 15 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex items-center gap-3 mb-6">
        <div className={`p-2 rounded-lg ${config.bg} ${config.color}`}>
          {config.icon}
        </div>
        <h3 className="text-lg font-bold text-text-main group-hover:text-primary transition-colors">{title}</h3>
      </div>

      {items.length > 0 ? (
        isTagVariant ? (
          <div className="flex flex-wrap gap-2.5">
            {items.map((item, index) => (
              <motion.span 
                key={`${title}-${index}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.03 }}
                className="bg-purple-50 text-primary px-3.5 py-1.5 rounded-xl text-xs font-bold border border-purple-100 hover:bg-purple-100 transition-colors"
              >
                {item}
              </motion.span>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {items.map((item, index) => (
              <motion.div 
                key={`${title}-${index}`}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-start gap-3 p-3 rounded-2xl bg-purple-50/30 border border-transparent hover:border-purple-100 transition-all group/item"
              >
                <div className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 ${config.bg.replace('bg-', 'bg-').split(' ')[0]} ${config.color.replace('text-', 'bg-').split(' ')[0]}`} />
                <p className="text-sm font-medium text-text-secondary leading-relaxed group-hover/item:text-text-main transition-colors">
                  {item}
                </p>
              </motion.div>
            ))}
          </div>
        )
      ) : (
        <div className="py-8 text-center bg-purple-50/50 rounded-2xl border border-dashed border-purple-100 italic text-text-secondary text-sm">
          No items identified in this section.
        </div>
      )}
    </motion.div>
  )
}

export default AnalysisList

