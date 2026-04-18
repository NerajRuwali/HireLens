import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, LineChart, Line, Legend 
} from 'recharts'
import { motion } from 'framer-motion'

const COLORS = ['#8B5CF6', '#7C3AED', '#A78BFA', '#DDD6FE', '#EDE9FE']

export default function AnalyticsCharts({ skillsData, strengthsVsWeaknesses, historyData }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
      {/* 1. Skills Distribution (Bar Chart) */}
      <motion.div 
        className="saas-card p-8 min-h-[400px]"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
      >
        <h3 className="text-lg font-extrabold mb-8 text-primary tracking-tight">Skills Distribution</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={skillsData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 700, fill: '#4B5563' }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 700, fill: '#4B5563' }} />
            <Tooltip 
              cursor={{ fill: '#F5F3FF' }}
              contentStyle={{ backgroundColor: 'white', borderRadius: '16px', border: '1px solid #E5E7EB', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
            />
            <Bar dataKey="value" fill="#8B5CF6" radius={[8, 8, 0, 0]} barSize={40} />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      {/* 2. Strength vs Weakness (Pie Chart) */}
      <motion.div 
        className="saas-card p-8 min-h-[400px]"
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
      >
        <h3 className="text-lg font-extrabold mb-8 text-primary tracking-tight">Analysis Ratio</h3>
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
                <Cell key={`cell-${index}`} fill={index === 0 ? '#8B5CF6' : '#6366F1'} />
              ))}
            </Pie>
            <Tooltip contentStyle={{ backgroundColor: 'white', borderRadius: '16px', border: '1px solid #E5E7EB', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
            <Legend verticalAlign="bottom" height={36} iconType="circle" />
          </PieChart>
        </ResponsiveContainer>
      </motion.div>

      {/* 3. History Trend (Line Chart) */}
      {historyData && historyData.length > 0 && (
        <motion.div 
          className="saas-card p-8 lg:col-span-2 min-h-[400px]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-lg font-extrabold mb-8 text-primary tracking-tight">ATS Score Progress</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={historyData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
              <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 700, fill: '#4B5563' }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 700, fill: '#4B5563' }} />
              <Tooltip 
                contentStyle={{ backgroundColor: 'white', borderRadius: '16px', border: '1px solid #E5E7EB', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
              />
              <Line 
                type="monotone" 
                dataKey="score" 
                stroke="#8B5CF6" 
                strokeWidth={4} 
                dot={{ fill: '#8B5CF6', strokeWidth: 2, r: 6 }}
                activeDot={{ r: 8, stroke: 'white', strokeWidth: 3 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
      )}
    </div>
  )
}

