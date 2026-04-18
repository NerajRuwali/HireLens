import { motion } from 'framer-motion'

export default function ATSScoreCard({ score, aiScore, keywordScore }) {
  return (
    <div className="saas-card p-8 flex flex-col items-center justify-center relative overflow-hidden h-full">
      <div className="absolute top-0 left-0 w-full h-1.5 bg-linear-to-r from-primary via-[#A78BFA] to-[#DDD6FE]"></div>
      
      <h3 className="text-lg font-extrabold text-primary mb-8 tracking-tight">Match Score</h3>
      
      <div className="relative w-44 h-44 mb-8">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          {/* Background circle */}
          <circle 
            cx="50" cy="50" r="45" 
            fill="none" 
            stroke="#F5F3FF" 
            strokeWidth="10" 
          />
          {/* Progress circle */}
          <motion.circle 
            cx="50" cy="50" r="45" 
            fill="none" 
            stroke="#8B5CF6" 
            strokeWidth="10" 
            strokeLinecap="round"
            initial={{ strokeDashoffset: 283 }}
            animate={{ strokeDashoffset: 283 - (score / 100) * 283 }}
            transition={{ duration: 2, ease: "circOut" }}
            style={{ strokeDasharray: 283 }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <motion.span 
            className="text-5xl font-extrabold text-primary"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            {score}
            <span className="text-2xl text-primary font-bold">%</span>
          </motion.span>
          <span className="text-[10px] font-extrabold text-muted mt-1 uppercase tracking-widest">Confidence</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 w-full pt-6 border-t border-gray-100">
        <div className="text-center p-2">
          <p className="text-[11px] uppercase font-bold text-secondary mb-1">AI Match</p>
          <p className="text-xl font-extrabold text-primary">{aiScore}%</p>
        </div>
        <div className="text-center p-2 border-l border-gray-100">
          <p className="text-[11px] uppercase font-bold text-secondary mb-1">Keywords</p>
          <p className="text-xl font-extrabold text-[#7C3AED]">{keywordScore}%</p>
        </div>
      </div>
    </div>
  )
}
