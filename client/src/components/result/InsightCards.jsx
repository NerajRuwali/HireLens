import { motion } from 'framer-motion'
import { FiCheckCircle, FiAlertCircle, FiThumbsUp, FiAlertTriangle } from 'react-icons/fi'

export default function InsightCards({ strengths, weaknesses }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Strengths Card */}
      <motion.div 
        className="saas-card p-8 sm:p-10 group"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h3 className="text-xl font-extrabold flex items-center gap-3 mb-8 text-primary tracking-tight group-hover:text-green-600 transition-colors">
          <div className="p-2.5 bg-green-50 rounded-xl text-green-600 shadow-sm">
            <FiThumbsUp size={20} />
          </div>
          Key Strengths
        </h3>
        <div className="space-y-4">
          {(strengths || []).map((strength, index) => (
            <div key={index} className="p-5 bg-green-50/40 border border-green-100 rounded-2xl text-base font-extrabold text-primary shadow-sm flex gap-4 items-center group/item hover:bg-green-50 transition-all">
              <FiCheckCircle size={22} className="text-green-500 shrink-0" />
              <span className="leading-relaxed">{strength}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Weaknesses Card */}
      <motion.div 
        className="saas-card p-8 sm:p-10 group"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h3 className="text-xl font-extrabold flex items-center gap-3 mb-8 text-primary tracking-tight group-hover:text-amber-600 transition-colors">
          <div className="p-2.5 bg-amber-50 rounded-xl text-amber-600 shadow-sm">
            <FiAlertTriangle size={20} />
          </div>
          Areas to Improve
        </h3>
        <div className="space-y-4">
          {(weaknesses || []).map((weakness, index) => (
            <div key={index} className="p-5 bg-amber-50/40 border border-amber-100 rounded-2xl text-base font-extrabold text-primary shadow-sm flex gap-4 items-center group/item hover:bg-amber-50 transition-all">
              <FiAlertCircle size={22} className="text-amber-500 shrink-0" />
              <span className="leading-relaxed">{weakness}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

