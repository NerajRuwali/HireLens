import { motion } from 'framer-motion'
import ATSScoreCard from '../dashboard/ATSScoreCard'
import SummaryGrid from '../dashboard/SummaryGrid'

export default function ScoreSection({ score, aiScore, keywordScore, strengths, weaknesses, missingSkills }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
      <motion.div 
        className="lg:col-span-1 h-full"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <ATSScoreCard score={score} aiScore={aiScore} keywordScore={keywordScore} />
      </motion.div>
      
      <div className="lg:col-span-2 flex flex-col gap-10 h-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <SummaryGrid 
            strengthsCount={strengths?.length || 0}
            weaknessesCount={weaknesses?.length || 0}
            missingSkillsCount={missingSkills?.length || 0}
          />
        </motion.div>
      </div>
    </div>
  )
}
