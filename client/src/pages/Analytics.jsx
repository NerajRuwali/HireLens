import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiAlertCircle, FiTrendingUp, FiAward, FiZap, FiTarget } from "react-icons/fi";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  LineChart, Line, PieChart, Pie, Cell, Legend
} from "recharts";

import { getAnalysisHistory } from "../services/api";
import { DashboardSkeleton } from "../components/dashboard/Skeleton";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";

const CHART_COLORS = ['#0ea5e9', '#38bdf8', '#0284c7', '#7dd3fc', '#bae6fd'];

export default function Analytics() {
  const [analysisRecords, setAnalysisRecords] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadAnalyticsData = async () => {
      try {
        const recordsResponse = await getAnalysisHistory();
        setAnalysisRecords(recordsResponse);
      } catch (error) {
        console.error("Failed to fetch analytics:", error);
      } finally {
        setTimeout(() => setIsLoading(false), 800);
      }
    };
    loadAnalyticsData();
  }, []);

  if (isLoading) return <DashboardSkeleton />;

  if (analysisRecords.length === 0) {
    return <NoDataView />;
  }

  const aggregates = calculateAggregates(analysisRecords);

  return (
    <div className="max-w-7xl mx-auto py-8">
      <Header total={analysisRecords.length} />

      {/* Hero Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        {aggregates.stats.map((stat, index) => (
          <StatCard key={index} stat={stat} index={index} />
        ))}
      </div>

      {/* Main Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <ScoreTrendChart data={aggregates.lineData} />
        <RoleDistributionChart data={aggregates.pieData} />
      </div>

      <SkillFrequencyChart data={aggregates.barData} />

      <FooterCTA />
    </div>
  );
}

// --- Sub-components ---

function Header({ total }) {
  return (
    <div className="mb-12">
      <h1 className="text-4xl font-extrabold mb-2 text-text-main">Market <span className="gradient-text">Insights</span></h1>
      <p className="text-text-muted font-medium">Aggregated data from your {total} past resume analyses.</p>
    </div>
  );
}

function StatCard({ stat, index }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Card className="p-6 flex items-center gap-4" hover={true}>
        <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
          <stat.icon size={24} />
        </div>
        <div>
          <p className="text-[10px] font-black text-text-muted uppercase tracking-tighter m-0">{stat.label}</p>
          <h3 className="text-2xl font-black m-0 leading-tight">{stat.value}</h3>
        </div>
      </Card>
    </motion.div>
  );
}

function ScoreTrendChart({ data }) {
  return (
    <Card className="lg:col-span-2 p-8 min-h-[400px]">
      <h3 className="text-lg font-bold mb-8">📈 Score Trend (Last 10 Scans)</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e0f2fe" />
          <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b'}} />
          <YAxis domain={[0, 100]} axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b'}} />
          <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e0f2fe' }} />
          <Line type="monotone" dataKey="score" stroke="#0ea5e9" strokeWidth={4} dot={{ fill: '#0ea5e9', r: 5, stroke: '#fff' }} />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
}

function RoleDistributionChart({ data }) {
  return (
    <Card className="p-8 min-h-[400px]">
      <h3 className="text-lg font-bold mb-8">🎯 Role Interest</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie data={data} innerRadius={65} outerRadius={90} paddingAngle={6} dataKey="value">
            {data.map((_, i) => <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />)}
          </Pie>
          <Tooltip contentStyle={{ borderRadius: '12px', border: 'none' }} />
          <Legend verticalAlign="bottom" height={36}/>
        </PieChart>
      </ResponsiveContainer>
    </Card>
  );
}

function SkillFrequencyChart({ data }) {
  return (
    <Card className="p-8 min-h-[400px]">
      <h3 className="text-lg font-bold mb-8">🛠️ Recognized Expertise (Top Skills)</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e0f2fe" />
          <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b'}} />
          <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b'}} />
          <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e0f2fe' }} />
          <Bar dataKey="value" fill="#0ea5e9" radius={[6, 6, 0, 0]} barSize={50} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}

function NoDataView() {
  return (
    <div className="flex flex-col items-center justify-center h-[60vh] text-center">
      <FiAlertCircle size={48} className="text-amber-500 mb-4" />
      <h2 className="text-2xl font-black">No Analytics Available</h2>
      <p className="text-text-muted max-w-sm">Perform at least one resume analysis to unlock professional insights.</p>
    </div>
  );
}

function FooterCTA() {
  return (
    <div className="mt-12 glass-card p-10 text-center bg-linear-to-br from-primary/10 to-secondary/10 border-sky-100">
      <h4 className="text-2xl font-black mb-3">Keep Growing Your Profile 🚀</h4>
      <p className="text-text-muted mb-8 max-w-2xl mx-auto font-medium">Regular analysis helps you stay aligned with market trends.</p>
      <Button variant="primary" className="px-10 py-4 text-lg shadow-xl shadow-primary/20" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
        Analyze New Resume
      </Button>
    </div>
  );
}

// --- Logic ---

function calculateAggregates(records) {
  const avgScore = Math.round(records.reduce((acc, curr) => acc + curr.score, 0) / records.length);
  const bestScore = Math.max(...records.map(item => item.score));
  
  const lineData = records.slice(-10).map(item => ({
    date: new Date(item.timestamp).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
    score: item.score
  }));

  const roles = records.reduce((acc, curr) => {
    acc[curr.role] = (acc[curr.role] || 0) + 1;
    return acc;
  }, {});
  const pieData = Object.keys(roles).map(name => ({ name, value: roles[name] }));

  const skills = records.flatMap(item => item.strengths || []).reduce((acc, curr) => {
    const skill = curr.split(' ')[0].replace(/,/g, '');
    if (skill.length > 2) acc[skill] = (acc[skill] || 0) + 1;
    return acc;
  }, {});
  const barData = Object.keys(skills).map(name => ({ name, value: skills[name] }))
    .sort((a,b) => b.value - a.value).slice(0, 6);

  return {
    lineData, pieData, barData,
    stats: [
      { label: 'Avg. Score', value: `${avgScore}%`, icon: FiTrendingUp, color: 'text-blue-500', bg: 'bg-blue-50' },
      { label: 'Best Match', value: `${bestScore}%`, icon: FiAward, color: 'text-amber-500', bg: 'bg-amber-50' },
      { label: 'Total Scans', value: records.length, icon: FiZap, color: 'text-purple-500', bg: 'bg-purple-50' },
      { label: 'Roles', value: Object.keys(roles).length, icon: FiTarget, color: 'text-green-500', bg: 'bg-green-50' },
    ]
  };
}
