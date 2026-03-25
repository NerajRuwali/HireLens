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
  const chartData = [{ name: 'Hire Score', score }]
  const radarData = [
    { subject: 'Skills', value: Math.max(45, safeScore - 12) },
    { subject: 'Impact', value: Math.max(35, safeScore - 22) },
    { subject: 'Structure', value: Math.max(50, safeScore - 8) },
    { subject: 'Keywords', value: Math.max(40, safeScore - 16) },
    { subject: 'Clarity', value: Math.max(48, safeScore - 10) },
  ]

  const scoreColor = safeScore <= 40 ? 'var(--danger)' : safeScore <= 70 ? 'var(--warning)' : 'var(--secondary)'

  return (
    <motion.div
      className="glass-card"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, type: 'spring' }}
      style={{ padding: '24px', textAlign: 'center', marginBottom: '32px' }}
    >
      <h2 style={{ marginBottom: '24px' }}>Hire Score</h2>

      <div style={{ position: 'relative', width: '220px', margin: '0 auto 32px' }}>
        <svg viewBox="0 0 120 120" style={{ transform: 'rotate(-90deg)', width: '100%' }}>
          <circle cx="60" cy="60" r="54" fill="none" stroke="var(--glass-border)" strokeWidth="8" />
          <motion.circle
            cx="60" cy="60" r="54" fill="none"
            stroke={scoreColor} strokeWidth="8" strokeLinecap="round"
            initial={{ strokeDasharray: '0 340' }}
            animate={{ strokeDasharray: `${(safeScore / 100) * 339.29} 340` }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
          />
        </svg>
        <div style={{
          position: 'absolute', inset: 0, display: 'grid', placeItems: 'center',
          flexDirection: 'column', color: scoreColor
        }}>
          <div>
            <span style={{ fontSize: '3.5rem', fontWeight: 800, lineHeight: 1 }}>{safeScore}</span>
            <span style={{ fontSize: '1.2rem', fontWeight: 500 }}>/100</span>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        <div style={{ height: '220px', width: '100%' }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--glass-border)" vertical={false} />
              <XAxis dataKey="name" stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis domain={[0, 100]} stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip cursor={{ fill: 'var(--primary-light)' }} contentStyle={{ backgroundColor: 'var(--bg-base)', border: '1px solid var(--glass-border)', borderRadius: '8px' }} />
              <Bar dataKey="score" fill="var(--primary)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div style={{ height: '260px', width: '100%' }}>
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart outerRadius="70%" data={radarData}>
              <PolarGrid stroke="var(--glass-border)" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: 'var(--text-muted)', fontSize: 11 }} />
              <Radar dataKey="value" stroke="var(--primary)" fill="var(--primary)" fillOpacity={0.4} />
              <Tooltip contentStyle={{ backgroundColor: 'var(--bg-base)', border: '1px solid var(--glass-border)', borderRadius: '8px' }} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </motion.div>
  )
}

export default ScoreCard
