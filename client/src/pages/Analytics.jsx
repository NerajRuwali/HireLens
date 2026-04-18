import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiAlertCircle, FiTrendingUp, FiAward, FiZap, FiTarget, FiInfo, FiChevronUp } from "react-icons/fi";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  LineChart, Line, PieChart, Pie, Cell, Legend
} from "recharts";

import { getAnalysisHistory } from "../services/api";
import { DashboardSkeleton } from "../components/dashboard/Skeleton";
import { Button } from "../components/ui/Button";

const CHART_COLORS = ['#8B5CF6', '#7C3AED', '#A78BFA', '#DDD6FE', '#EDE9FE'];

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
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-0">
      <Header total={analysisRecords.length} />

      {/* Hero Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
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
      <h1 className="text-4xl font-extrabold mb-2 text-primary tracking-tight">Market <span className="gradient-text">Insights</span></h1>
      <p className="text-secondary font-bold text-lg">Deep analysis of your career trajectory through {total} professional assessments.</p>
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
      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-5 group hover:shadow-md transition-all duration-300">
        <div className={`p-4 rounded-2xl ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform shadow-sm`}>
          <stat.icon size={24} />
        </div>
        <div>
          <p className="text-[11px] font-extrabold text-muted uppercase tracking-widest mb-1">{stat.label}</p>
          <div className="flex items-center gap-2">
            <h3 className="text-2xl font-extrabold text-primary leading-none tracking-tight">{stat.value}</h3>
            {index === 0 && <span className="text-[10px] font-extrabold text-[#22C55E] bg-green-50 px-1.5 py-0.5 rounded-lg flex items-center gap-0.5 border border-green-100">
              <FiChevronUp /> 4%
            </span>}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ScoreTrendChart({ data }) {
  return (
    <div className="lg:col-span-2 saas-card p-8 min-h-[400px]">
      <h3 className="text-lg font-extrabold mb-8 text-primary flex items-center gap-2 tracking-tight">
        <div className="p-1 px-2.5 rounded-lg bg-green-50 text-[#22C55E] border border-green-100 text-[10px] font-extrabold tracking-widest">LIVE</div>
        ATS Score Progress
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
          <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fontSize: 12, fontWeight: 700, fill: '#4B5563'}} />
          <YAxis domain={[0, 100]} axisLine={false} tickLine={false} tick={{fontSize: 12, fontWeight: 700, fill: '#4B5563'}} />
          <Tooltip 
            contentStyle={{ backgroundColor: 'white', borderRadius: '16px', border: '1px solid #E5E7EB', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
          />
          <Line 
            type="monotone" 
            dataKey="score" 
            stroke="#8B5CF6" 
            strokeWidth={4} 
            dot={{ fill: '#8B5CF6', r: 6, stroke: '#fff', strokeWidth: 2 }} 
            activeDot={{ r: 8, stroke: 'white', strokeWidth: 3 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

function RoleDistributionChart({ data }) {
  return (
    <div className="saas-card p-8 min-h-[400px]">
      <h3 className="text-lg font-extrabold mb-8 text-primary tracking-tight">Target Roles</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie data={data} innerRadius={65} outerRadius={90} paddingAngle={8} dataKey="value" stroke="none">
            {data.map((_, i) => <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />)}
          </Pie>
          <Tooltip contentStyle={{ backgroundColor: 'white', borderRadius: '16px', border: '1px solid #E5E7EB', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
          <Legend verticalAlign="bottom" height={36} iconType="circle" />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

function SkillFrequencyChart({ data }) {
  return (
    <div className="saas-card p-8 min-h-[400px]">
      <h3 className="text-lg font-extrabold mb-8 text-primary tracking-tight">Top Technical Benchmarks</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
          <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fontWeight: 700, fill: '#4B5563'}} />
          <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fontWeight: 700, fill: '#4B5563'}} />
          <Tooltip 
            cursor={{ fill: '#F5F3FF' }}
            contentStyle={{ backgroundColor: 'white', borderRadius: '16px', border: '1px solid #E5E7EB', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
          />
          <Bar dataKey="value" fill="#8B5CF6" radius={[8, 8, 0, 0]} barSize={50} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

function NoDataView() {
  return (
    <div className="flex flex-col items-center justify-center h-[60vh] text-center px-4">
      <div className="p-8 bg-[#EDE9FE] text-[#7C3AED] rounded-full mb-6 shadow-sm">
        <FiInfo size={48} />
      </div>
      <h2 className="text-2xl font-extrabold text-primary mb-2 tracking-tight">No Insights Available Yet</h2>
      <p className="text-secondary max-w-sm mb-10 font-bold text-lg">Complete at least one resume analysis to unlock professional market insights.</p>
      <Button onClick={() => window.location.href = '/'} className="px-10 py-4 shadow-lg shadow-primary/20">Get Started Now</Button>
    </div>
  );
}

function FooterCTA() {
  return (
    <div className="mt-12 bg-[#EDE9FE] p-10 sm:p-16 rounded-3xl border border-purple-200 text-center relative overflow-hidden group">
      <div className="absolute -right-20 -top-20 w-64 h-64 bg-[#8B5CF6]/10 rounded-full blur-3xl group-hover:bg-[#8B5CF6]/20 transition-all duration-700" />
      <div className="relative z-10">
        <h4 className="text-3xl font-extrabold text-primary mb-4 tracking-tight">Evolve Your Profile 🚀</h4>
        <p className="text-secondary mb-10 max-w-2xl mx-auto font-bold text-lg leading-relaxed">Continuous analysis helps you track skill growth and stay aligned with ever-changing industry standards.</p>
        <Button onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} className="px-12 py-4 shadow-xl shadow-primary/30">
          Upload New Resume
        </Button>
      </div>
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
      { label: 'Avg. Match', value: `${avgScore}%`, icon: FiTrendingUp, color: 'text-[#7C3AED]', bg: 'bg-[#EDE9FE]' },
      { label: 'Top Rating', value: `${bestScore}%`, icon: FiAward, color: 'text-amber-500', bg: 'bg-amber-50' },
      { label: 'Assessments', value: records.length, icon: FiZap, color: 'text-primary', bg: 'bg-[#F5F3FF]' },
      { label: 'Career Paths', value: Object.keys(roles).length, icon: FiTarget, color: 'text-[#22C55E]', bg: 'bg-green-50' },
    ]
  };
}
