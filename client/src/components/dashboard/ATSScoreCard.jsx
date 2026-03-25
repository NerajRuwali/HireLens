import { motion } from 'framer-motion'

export default function ATSScoreCard({ score, aiScore, keywordScore }) {
  const getScoreColor = (s) => {
    if (s >= 80) return '#10b981' // Green
    if (s >= 50) return '#f59e0b' // Yellow
    return '#ef4444' // Red
  }

  const scoreColor = getScoreColor(score)

  return (
    <motion.div 
      className="glass-card p-8 flex flex-col items-center justify-center relative overflow-hidden h-full"
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-primary to-secondary opacity-50"></div>
      
      <h3 className="text-lg font-bold text-text-muted mb-6 uppercase tracking-wider">Overall ATS Match</h3>
      
      <div className="relative w-48 h-48 mb-6">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <circle 
            cx="50" cy="50" r="45" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="8" 
            className="text-blue-100/30"
          />
          <motion.circle 
            cx="50" cy="50" r="45" 
            fill="none" 
            stroke={scoreColor} 
            strokeWidth="8" 
            strokeLinecap="round"
            initial={{ strokeDasharray: "0 283" }}
            animate={{ strokeDasharray: `${(score / 100) * 283} 283` }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
            transform="rotate(-90 50 50)"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span 
            className="text-5xl font-black"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            {score}%
          </motion.span>
          <span className="text-xs font-bold text-text-muted mt-1 uppercase">Match Score</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 w-full mt-4">
        <div className="bg-primary/5 p-3 rounded-xl border border-primary/10 text-center">
          <p className="text-[10px] uppercase font-bold text-primary/70 mb-1">AI Intelligence</p>
          <p className="text-lg font-black text-primary">{aiScore}%</p>
        </div>
        <div className="bg-secondary/5 p-3 rounded-xl border border-secondary/10 text-center">
          <p className="text-[10px] uppercase font-bold text-secondary/70 mb-1">Keyword Match</p>
          <p className="text-lg font-black text-secondary">{keywordScore}%</p>
        </div>
      </div>
    </motion.div>
  )
}
