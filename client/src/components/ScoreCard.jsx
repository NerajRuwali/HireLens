import {
  Bar,
  BarChart,
  CartesianGrid,
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { motion } from 'framer-motion'

function ScoreCard({ score = 0 }) {
  const safeScore = Math.max(0, Math.min(100, score))
  const chartData = [{ name: 'Overall Match', score }]
  const radarData = [
    { subject: 'Skills', value: Math.max(45, safeScore - 12) },
    { subject: 'Impact', value: Math.max(35, safeScore - 22) },
    { subject: 'Structure', value: Math.max(50, safeScore - 8) },
    { subject: 'Keywords', value: Math.max(40, safeScore - 16) },
    { subject: 'Clarity', value: Math.max(48, safeScore - 10) },
  ]

  const scoreColor = safeScore >= 80 ? '#8B5CF6' : safeScore >= 50 ? '#A78BFA' : '#9CA3AF'

  return (
    <motion.div
      className="bg-white p-8 rounded-3xl border border-purple-100 shadow-md text-center mb-8"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-xl font-bold text-text-main mb-8">Professional Index</h2>

      <div className="relative w-56 h-56 mx-auto mb-10">
        <svg viewBox="0 0 120 120" className="rotate-[-90deg] w-full h-full">
          <circle cx="60" cy="60" r="54" fill="none" className="stroke-purple-50" strokeWidth="8" />
          <motion.circle
            cx="60" cy="60" r="54" fill="none"
            stroke={scoreColor} strokeWidth="8" strokeLinecap="round"
            initial={{ strokeDasharray: '0 340' }}
            animate={{ strokeDasharray: `${(safeScore / 100) * 339.29} 340` }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="flex items-baseline gap-1" style={{ color: scoreColor }}>
            <span className="text-5xl font-black">{safeScore}</span>
            <span className="text-lg font-bold opacity-60">/100</span>
          </div>
          <span className="text-[10px] font-bold text-text-secondary uppercase tracking-widest mt-1">AI SCORE</span>
        </div>
      </div>

      <div className="space-y-12">
        <div className="h-[220px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F3F0FF" vertical={false} />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} />
              <YAxis domain={[0, 100]} axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} />
              <Tooltip 
                cursor={{ fill: '#F5F3FF' }} 
                contentStyle={{ backgroundColor: 'white', borderRadius: '16px', border: '1px solid #E9D5FF', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} 
              />
              <Bar dataKey="score" fill="#A78BFA" radius={[6, 6, 0, 0]} barSize={50} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="h-[260px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart outerRadius="70%" data={radarData}>
              <PolarGrid stroke="#F3F0FF" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: '#6B7280', fontSize: 11, fontWeight: 600 }} />
              <Radar 
                dataKey="value" 
                stroke="#8B5CF6" 
                fill="#A78BFA" 
                fillOpacity={0.3} 
                strokeWidth={2}
              />
              <Tooltip 
                contentStyle={{ backgroundColor: 'white', borderRadius: '16px', border: '1px solid #E9D5FF', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} 
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </motion.div>
  )
}

export default ScoreCard

