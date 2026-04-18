import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiClock, FiArrowRight, FiSearch, FiInbox, FiCalendar, FiActivity } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

import { getAnalysisHistory } from "../services/api";
import { HistorySkeleton } from "../components/dashboard/Skeleton";
import { Button } from "../components/ui/Button";
import { formatDate } from "../utils/formatters";
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
    <div className="max-w-6xl mx-auto py-8 px-4 sm:px-0">
      <Toast message={notification.message} type={notification.type} onClose={() => setNotification({ message: '', type: 'info' })} />
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-extrabold mb-2 text-primary tracking-tight">Report <span className="gradient-text italic">History</span></h1>
          <p className="text-secondary font-bold text-lg">Manage and review your professional progress.</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="bg-white border border-gray-200 px-5 py-3 rounded-2xl flex items-center gap-3 w-full md:w-80 shadow-sm focus-within:ring-2 focus-within:ring-primary/20 transition-all duration-300 group">
            <FiSearch size={18} className="text-muted group-focus-within:text-primary transition-colors" />
            <input 
              type="text" 
              placeholder="Search by mission..." 
              className="bg-transparent border-none outline-none text-sm w-full font-bold text-primary placeholder:text-[#9CA3AF]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {filteredHistoryResults.length === 0 ? (
        <EmptyState onStart={() => navigate("/")} />
      ) : (
        <div className="space-y-4">
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
  const getScoreColor = (s) => {
    if (s >= 80) return 'text-[#7C3AED] bg-[#EDE9FE] border-[#C4B5FD]'
    if (s >= 50) return 'text-[#8B5CF6] bg-purple-50 border-purple-200'
    return 'text-[#4B5563] bg-slate-50 border-slate-200'
  }
  
  const scoreStyle = getScoreColor(record.score);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ scale: 1.01 }}
      className="bg-white p-5 sm:p-6 rounded-2xl border border-purple-100 shadow-sm flex items-center justify-between group cursor-pointer hover:border-[#8B5CF6]/30 transition-all duration-200"
      onClick={onClick}
    >
      <div className="flex items-center gap-4 sm:gap-8 flex-1 min-w-0">
        <div className={`w-14 h-14 shrink-0 rounded-2xl border-2 flex flex-col items-center justify-center font-extrabold ${scoreStyle}`}>
          <span className="text-base">{record.score}%</span>
          <span className="text-[8px] uppercase tracking-wider font-extrabold opacity-80">Match</span>
        </div>

        <div className="min-w-0 flex-1">
          <h4 className="text-lg sm:text-xl font-extrabold text-primary group-hover:text-[#8B5CF6] transition-colors truncate mb-1 tracking-tight">
            {record.role}
          </h4>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <span className="flex items-center gap-1.5 text-xs font-bold text-secondary uppercase tracking-wider">
              <FiCalendar size={13} className="text-[#8B5CF6]" /> {formatDate(record.timestamp)}
            </span>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-green-50 text-[10px] font-extrabold text-[#22C55E] border border-green-100 shadow-sm">
              <FiActivity size={10} />
              <span>AI Match: {record.ai_score}%</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4 ml-4">
        <div className="hidden sm:block">
          <Button variant="secondary" className="px-5 py-2 text-xs">View Result</Button>
        </div>
        <div className="p-3 bg-[#EDE9FE] rounded-xl text-[#7C3AED] transform group-hover:translate-x-1 transition-all">
          <FiArrowRight size={20} />
        </div>
      </div>
    </motion.div>
  );
}

function EmptyState({ onStart }) {
  return (
    <div className="bg-white p-16 sm:p-24 rounded-3xl border border-purple-100 shadow-sm flex flex-col items-center text-center">
      <div className="p-8 bg-[#EDE9FE] text-[#7C3AED] rounded-full mb-8 animate-bounce transition-all shadow-sm">
        <FiInbox size={64} />
      </div>
      <h3 className="text-2xl font-extrabold text-primary mb-3 tracking-tight">No Records Found</h3>
      <p className="text-secondary mb-10 max-w-xs font-bold text-lg leading-relaxed">Your resume analysis history will appear here once you upload your first resume.</p>
      <Button onClick={onStart} className="px-10 py-4 shadow-lg shadow-primary/30">Analyze Your First Resume</Button>
    </div>
  );
}
