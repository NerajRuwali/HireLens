import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiClock, FiBarChart2, FiArrowRight, FiSearch, FiFilter } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

import { getAnalysisHistory } from "../services/api";
import { HistorySkeleton } from "../components/dashboard/Skeleton";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";
import { formatDate, getScoreColor } from "../utils/formatters";
import Toast from "../components/Toast";

export default function History() {
  const [analysisHistory, setAnalysisHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [notification, setNotification] = useState({ message: '', type: 'info' });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHistoryData = async () => {
      try {
        const historyResponse = await getAnalysisHistory();
        setAnalysisHistory(historyResponse.reverse());
      } catch (error) {
        setNotification({ message: "Failed to load history", type: "error" });
      } finally {
        setTimeout(() => setIsLoading(false), 600);
      }
    };
    fetchHistoryData();
  }, []);

  const filteredHistoryResults = analysisHistory.filter(item => 
    item.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) return <HistorySkeleton />;

  return (
    <div className="max-w-6xl mx-auto py-8">
      <Toast message={notification.message} type={notification.type} onClose={() => setNotification({ message: '', type: 'info' })} />
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-extrabold mb-2">Analysis <span className="gradient-text">History</span></h1>
          <p className="text-text-muted font-medium">Review your past resume scores and tracking progress.</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="bg-white border border-glass-border px-5 py-3 rounded-2xl flex items-center gap-3 w-72 shadow-sm focus-within:border-primary transition-all duration-300">
            <FiSearch size={18} className="text-text-muted" />
            <input 
              type="text" 
              placeholder="Search by role..." 
              className="bg-transparent border-none outline-none text-sm w-full font-bold"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {filteredHistoryResults.length === 0 ? (
        <EmptyState onStart={() => navigate("/")} />
      ) : (
        <div className="grid gap-6">
          <AnimatePresence>
            {filteredHistoryResults.map((record, index) => (
              <HistoryItem 
                key={index} 
                record={record} 
                index={index} 
                onClick={() => navigate("/result", { state: { analysis: record } })} 
              />
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}

function HistoryItem({ record, index, onClick }) {
  const scoreClass = getScoreColor(record.score);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <Card 
        className="p-6 flex items-center justify-between group cursor-pointer border hover:border-primary/30"
        onClick={onClick}
      >
        <div className="flex items-center gap-10">
          <div className={`w-16 h-16 rounded-2xl border-2 flex flex-col items-center justify-center font-black ${scoreClass}`}>
            <span className="text-lg">{record.score}%</span>
            <span className="text-[7px] uppercase tracking-tighter">Match</span>
          </div>

          <div className="space-y-2">
            <h4 className="text-2xl font-black text-text-main group-hover:text-primary transition-colors m-0 leading-none">
              {record.role}
            </h4>
            <div className="flex items-center gap-6 text-[10px] text-text-muted font-black uppercase tracking-widest opacity-60">
              <span className="flex items-center gap-2"><FiClock size={12} className="text-primary" /> {formatDate(record.timestamp)}</span>
              <Badge variant="primary">AI Logic: {record.ai_score}%</Badge>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="secondary" className="hidden md:block">Details</Button>
          <div className="p-3 bg-primary/10 rounded-xl text-primary opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-1">
            <FiArrowRight size={20} />
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

function EmptyState({ onStart }) {
  return (
    <div className="glass-card p-20 flex flex-col items-center text-center">
      <div className="p-8 bg-blue-50 text-blue-300 rounded-full mb-8">
        <FiClock size={64} />
      </div>
      <h3 className="text-2xl font-black mb-3">No History Found</h3>
      <p className="text-text-muted mb-10 max-w-xs font-medium">Upload your first resume to see your professional analysis records here.</p>
      <Button variant="primary" onClick={onStart}>Analyze Now</Button>
    </div>
  );
}
