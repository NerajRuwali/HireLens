import { FiCheckCircle, FiAlertCircle, FiTarget, FiLoader } from 'react-icons/fi'
import { motion } from 'framer-motion'

export default function SummaryGrid({ strengthsCount, weaknessesCount, missingSkillsCount }) {
  const cards = [
    { title: 'Strengths', count: strengthsCount, icon: FiCheckCircle, color: 'text-green-500', bg: 'bg-green-100/50' },
    { title: 'Weaknesses', count: weaknessesCount, icon: FiAlertCircle, color: 'text-red-500', bg: 'bg-red-100/50' },
    { title: 'Missing Skills', count: missingSkillsCount, icon: FiTarget, color: 'text-amber-500', bg: 'bg-amber-100/50' },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
      {cards.map((card, idx) => {
        const Icon = card.icon
        return (
          <motion.div 
            key={card.title}
            className="glass-card p-6 flex items-center gap-4 transition-all duration-300 hover:shadow-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * idx }}
          >
            <div className={`p-4 rounded-2xl ${card.bg} ${card.color}`}>
              <Icon size={24} />
            </div>
            <div>
              <p className="text-sm font-bold text-text-muted m-0">{card.title}</p>
              <h3 className="text-3xl font-black m-0 leading-tight">{card.count}</h3>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}
