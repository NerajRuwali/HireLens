import { FiZap, FiLayout } from 'react-icons/fi'
import { motion } from 'framer-motion'

export default function RecommendationPanel({ suggestions }) {
  return (
    <motion.div 
       className="saas-card p-8 min-h-[500px] relative overflow-hidden group"
       initial={{ opacity: 0, y: 15 }}
       animate={{ opacity: 1, y: 0 }}
       transition={{ delay: 0.2 }}
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-10 -mt-10 blur-2xl group-hover:bg-primary/10 transition-all duration-500" />
      
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2.5 bg-[#EDE9FE] rounded-lg text-[#7C3AED] shadow-sm">
          <FiZap size={20} />
        </div>
        <h3 className="text-xl font-extrabold text-primary tracking-tight">Strategy <span className="text-[#8B5CF6] italic">Insights</span></h3>
      </div>

      <div className="space-y-6">
        {(suggestions || []).slice(0, 5).map((suggestion, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex gap-4 items-start group/item p-4 rounded-2xl bg-[#F5F3FF]/30 border border-transparent hover:border-purple-100 hover:bg-[#F5F3FF]/50 transition-all"
          >
            <div className="w-1.5 h-6 rounded-full bg-purple-200 group-hover/item:bg-[#8B5CF6] transition-colors shrink-0 mt-1" />
            <p className="text-base font-bold leading-relaxed m-0 text-secondary group-hover/item:text-primary transition-colors">
              {suggestion}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

