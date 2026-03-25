import { motion } from 'framer-motion'
import { FiCheckCircle, FiAlertCircle } from 'react-icons/fi'
import { Card } from '../ui/Card'

export default function InsightCards({ strengths, weaknesses }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
      <Card 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h3 className="text-xl font-black flex items-center gap-3 mb-10 tracking-tight">
          <FiCheckCircle className="text-green-500" /> Competitive Strengths
        </h3>
        <div className="space-y-4">
          {(strengths || []).map((strength, index) => (
            <div key={index} className="p-5 bg-green-500/5 border-l-4 border-green-500 rounded-r-2xl text-base font-bold text-green-800 shadow-sm">
              {strength}
            </div>
          ))}
        </div>
      </Card>

      <Card 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h3 className="text-xl font-black flex items-center gap-3 mb-10 tracking-tight">
          <FiAlertCircle className="text-amber-500" /> Improvement Areas
        </h3>
        <div className="space-y-4">
          {(weaknesses || []).map((weakness, index) => (
            <div key={index} className="p-5 bg-amber-500/5 border-l-4 border-amber-500 rounded-r-2xl text-base font-bold text-amber-800 shadow-sm">
              {weakness}
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
