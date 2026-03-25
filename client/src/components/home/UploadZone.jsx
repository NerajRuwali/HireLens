import { motion } from 'framer-motion'
import { FiUploadCloud, FiFileText } from 'react-icons/fi'
import { Card } from '../ui/Card'

export default function UploadZone({ file, dragActive, onDrag, onDrop, onFileChange }) {
  return (
    <Card 
      className={`p-16 flex flex-col items-center justify-center border-2 border-dashed transition-all duration-500 relative ${
        dragActive ? 'border-primary bg-primary/5 scale-[1.02]' : 'border-glass-border'
      }`}
      onDragEnter={onDrag}
      onDragOver={onDrag}
      onDragLeave={onDrag}
      onDrop={onDrop}
    >
      <div className="w-24 h-24 bg-primary/10 rounded-3xl flex items-center justify-center text-primary mb-8 shadow-inner">
        <FiUploadCloud size={48} />
      </div>
      <h3 className="text-2xl font-black mb-3">Drop your resume here</h3>
      <p className="text-text-muted font-medium mb-10 opacity-70">Support PDF files up to 10MB</p>
      
      <input 
        type="file" 
        id="resume-upload" 
        className="hidden" 
        accept=".pdf" 
        onChange={onFileChange}
      />
      <label 
        htmlFor="resume-upload"
        className="px-10 py-4 bg-white border border-glass-border rounded-2xl font-black shadow-sm transition-all cursor-pointer text-sm uppercase tracking-widest hover:bg-slate-50 hover:border-primary/30"
      >
        {file ? 'Change File' : 'Select PDF File'}
      </label>
      
      {file && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-10 p-5 bg-primary rounded-2xl flex items-center gap-4 border border-primary/20 w-full max-w-md shadow-2xl shadow-primary/20"
        >
          <div className="p-2.5 bg-white/20 rounded-xl text-white">
            <FiFileText size={20} />
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="text-sm font-black text-white truncate mb-0">{file.name}</p>
            <p className="text-[10px] text-white/70 uppercase font-black tracking-tighter">Ready for AI Analysis</p>
          </div>
        </motion.div>
      )}
    </Card>
  )
}
