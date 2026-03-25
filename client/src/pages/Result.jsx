import html2pdf from "html2pdf.js";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowLeft, FiAlertCircle } from "react-icons/fi";

import ActionHeader from "../components/result/ActionHeader";
import ScoreSection from "../components/result/ScoreSection";
import InsightCards from "../components/result/InsightCards";
import RecommendationPanel from "../components/result/RecommendationPanel";
import AnalyticsCharts from "../components/dashboard/AnalyticsCharts";
import SkillChips from "../components/dashboard/SkillChips";
import { Button } from "../components/ui/Button";
import { getAnalysisHistory } from "../services/api";

const ROLE_SKILLS_MAP = {
  "Frontend Developer": ["React", "JavaScript", "HTML", "CSS", "TypeScript", "Vite", "Tailwind", "Redux", "Framer Motion", "Next.js"],
  "Backend Developer": ["Node.js", "Express", "MongoDB", "SQL", "PostgreSQL", "Python", "Java", "Docker", "AWS", "Redis", "GraphQL"],
  "Data Scientist": ["Python", "R", "SQL", "Machine Learning", "Pandas", "NumPy", "Scikit-Learn", "TensorFlow", "PyTorch", "Tableau"]
};

export default function Result() {
  const location = useLocation();
  const navigate = useNavigate();
  const { analysis } = location.state || {};
  const [historyTrend, setHistoryTrend] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const historyData = await getAnalysisHistory();
        const formattedHistory = historyData.slice(-10).map(item => ({
          date: new Date(item.timestamp).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
          score: item.score
        }));
        setHistoryTrend(formattedHistory);
      } catch (error) {
        console.error("Failed to fetch history:", error);
      }
    };
    fetchHistory();
  }, []);

  if (!analysis) {
    return <AnalysisMissing onBack={() => navigate("/")} />;
  }

  const {
    score, strengths, weaknesses, suggestions, missing_skills,
    ai_score, keyword_score, role, timestamp
  } = analysis;

  const handleExportPDF = () => {
    const element = document.getElementById('resume-report');
    const options = {
      margin: 0,
      filename: `HireLens_Analysis_${role.replace(/\s+/g, '_')}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 3, useCORS: true, letterRendering: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };
    html2pdf().set(options).from(element).save();
  };

  const chartSkillsData = [
    { name: 'Technical', value: (keyword_score || 0) },
    { name: 'AI Score', value: (ai_score || 0) },
    { name: 'Relevance', value: Math.max(0, (score || 0) - 5) }
  ];

  const chartRatioData = [
    { name: 'Strengths', value: strengths?.length || 0 },
    { name: 'Weaknesses', value: weaknesses?.length || 0 }
  ];

  return (
    <div className="max-w-7xl mx-auto pb-20 px-4">
      <ActionHeader
        role={role}
        timestamp={timestamp}
        onBack={() => navigate("/")}
        onExport={handleExportPDF}
      />

      <div id="resume-report" className="space-y-10 scale-95 origin-top md:scale-100">
        <ScoreSection
          score={score}
          aiScore={ai_score}
          keywordScore={keyword_score}
          strengths={strengths}
          weaknesses={weaknesses}
          missingSkills={missing_skills}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <RecommendationPanel suggestions={suggestions} />
          </div>
          <div className="lg:col-span-1" /> {/* Spacer */}
        </div>

        <InsightCards strengths={strengths} weaknesses={weaknesses} />

        <div className="no-print">
          <AnalyticsCharts
            skillsData={chartSkillsData}
            strengthsVsWeaknesses={chartRatioData}
            historyData={historyTrend}
          />
        </div>

        <motion.div
          className="glass-card p-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <SkillChips skills={missing_skills || []} title="Critical Missing Skills" type="missing" />
          <SkillChips skills={ROLE_SKILLS_MAP[role] || []} title="Market Standards" type="primary" />
        </motion.div>
      </div>
    </div>
  );
}

function AnalysisMissing({ onBack }) {
  return (
    <div className="flex flex-col items-center justify-center h-[60vh] text-center px-4">
      <motion.div
        className="p-8 bg-red-50 text-red-500 rounded-full mb-8 shadow-xl shadow-red-100"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
      >
        <FiAlertCircle size={64} />
      </motion.div>
      <h2 className="text-3xl font-black text-slate-800 mb-3">Analysis Missing</h2>
      <p className="text-text-muted mb-10 max-w-md font-medium">We couldn't find your analysis data. Please re-upload your resume.</p>
      <Button variant="primary" onClick={onBack} className="flex items-center gap-2">
        <FiArrowLeft /> Return to Upload
      </Button>
    </div>
  );
}