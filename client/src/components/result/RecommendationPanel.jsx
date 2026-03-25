import { FiInfo } from 'react-icons/fi'
import { Card } from '../ui/Card'

export default function RecommendationPanel({ suggestions }) {
  return (
    <Card 
       className="p-10 relative overflow-hidden group"
       initial={{ opacity: 0, y: 20 }}
       animate={{ opacity: 1, y: 0 }}
       transition={{ delay: 0.2 }}
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-10 -mt-10 blur-2xl group-hover:bg-primary/10 transition-colors" />
      <div className="flex items-center gap-3 text-primary font-black mb-8 text-xs tracking-widest uppercase">
        <FiInfo size={18} /> Strategic Recommendations
      </div>
      <div className="space-y-6">
        {(suggestions || []).slice(0, 3).map((suggestion, index) => (
          <div key={index} className="flex gap-6 items-start">
            <div className="w-2.5 h-2.5 rounded-full bg-primary mt-1.5 shrink-0 shadow-lg shadow-primary/30" />
            <p className="text-base font-bold leading-relaxed m-0 text-text-main/80">{suggestion}</p>
          </div>
        ))}
      </div>
    </Card>
  )
}
