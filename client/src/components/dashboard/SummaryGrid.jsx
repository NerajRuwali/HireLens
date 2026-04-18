import { FiCheckCircle, FiAlertCircle, FiTarget } from 'react-icons/fi'
import { motion } from 'framer-motion'

export default function SummaryGrid({ strengthsCount, weaknessesCount, missingSkillsCount }) {
  const cards = [
    { title: 'Strengths', count: strengthsCount, icon: FiCheckCircle, color: 'text-green-600', bg: 'bg-green-50' },
    { title: 'Weaknesses', count: weaknessesCount, icon: FiAlertCircle, color: 'text-red-500', bg: 'bg-red-50' },
    { title: 'Missing Skills', count: missingSkillsCount, icon: FiTarget, color: 'text-amber-500', bg: 'bg-amber-50' },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
      {cards.map((card, idx) => {
        const Icon = card.icon
        return (
          <motion.div 
            key={card.title}
            className="saas-card p-6 flex items-center gap-5 group"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * idx }}
          >
            <div className={`p-4 rounded-2xl ${card.bg} ${card.color} group-hover:scale-110 transition-transform duration-300 shadow-sm`}>
              <Icon size={28} />
            </div>
            <div>
              <p className="text-sm font-extrabold text-secondary mb-1 leading-none">{card.title}</p>
              <h3 className="text-3xl font-extrabold text-primary leading-tight tracking-tight">{card.count}</h3>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}

