import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, LineChart, Line, Legend 
} from 'recharts'
import { motion } from 'framer-motion'

const COLORS = ['#0ea5e9', '#38bdf8', '#0284c7', '#7dd3fc', '#bae6fd']

export default function AnalyticsCharts({ skillsData, strengthsVsWeaknesses, historyData }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
      {/* 1. Skills Distribution (Bar Chart) */}
      <motion.div 
        className="glass-card p-8 min-h-[400px]"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
      >
        <h3 className="text-lg font-bold mb-8">🛠️ Skills Distribution</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={skillsData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e0f2fe" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
            <Tooltip 
              cursor={{ fill: 'rgba(14, 165, 233, 0.05)' }}
              contentStyle={{ backgroundColor: 'rgba(255,255,255,0.95)', borderRadius: '12px', border: '1px solid #e0f2fe' }}
            />
            <Bar dataKey="value" fill="#0ea5e9" radius={[4, 4, 0, 0]} barSize={40} />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      {/* 2. Strength vs Weakness (Pie Chart) */}
      <motion.div 
        className="glass-card p-8 min-h-[400px]"
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
      >
        <h3 className="text-lg font-bold mb-8">🧠 Analysis Ratio</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={strengthsVsWeaknesses}
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={100}
              paddingAngle={8}
              dataKey="value"
            >
              {strengthsVsWeaknesses.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={index === 0 ? '#10b981' : '#ef4444'} />
              ))}
            </Pie>
            <Tooltip contentStyle={{ borderRadius: '12px' }} />
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </ResponsiveContainer>
      </motion.div>

      {/* 3. History Trend (Line Chart) */}
      <motion.div 
        className="glass-card p-8 lg:col-span-2 min-h-[400px]"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h3 className="text-lg font-bold mb-8">📈 ATS Score Progress</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={historyData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e0f2fe" />
            <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
            <Tooltip 
              contentStyle={{ backgroundColor: 'rgba(255,255,255,0.95)', borderRadius: '12px', border: '1px solid #e0f2fe' }}
            />
            <Line 
              type="monotone" 
              dataKey="score" 
              stroke="#0ea5e9" 
              strokeWidth={4} 
              dot={{ fill: '#0ea5e9', strokeWidth: 2, r: 6 }}
              activeDot={{ r: 8, stroke: 'white', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  )
}
