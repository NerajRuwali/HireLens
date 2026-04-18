import { motion } from 'framer-motion'
import { FiUploadCloud, FiFileText, FiCheckCircle } from 'react-icons/fi'

export default function UploadZone({ file, dragActive, onDrag, onDrop, onFileChange }) {
  return (
    <div 
      className={`relative p-12 lg:p-16 flex flex-col items-center justify-center border-2 border-dashed transition-all duration-500 rounded-3xl bg-white shadow-sm ${
        dragActive ? 'border-primary bg-purple-50 scale-[1.01]' : 'border-purple-100 hover:border-purple-200'
      }`}
      onDragEnter={onDrag}
      onDragOver={onDrag}
      onDragLeave={onDrag}
      onDrop={onDrop}
    >
      <div className="w-20 h-20 bg-purple-100 rounded-2xl flex items-center justify-center text-primary mb-6 transition-transform duration-300 hover:scale-110">
        <FiUploadCloud size={40} />
      </div>
      <h3 className="text-2xl font-extrabold mb-2 text-primary tracking-tight">Upload your resume</h3>
      <p className="text-secondary font-bold text-lg mb-8">Drag and drop your PDF here or click to browse</p>
      
      <input 
        type="file" 
        id="resume-upload" 
        className="hidden" 
        accept=".pdf" 
        onChange={onFileChange}
      />
      
      {!file && (
        <label 
          htmlFor="resume-upload"
          className="px-10 py-4 bg-white border border-gray-200 rounded-xl font-extrabold shadow-sm transition-all cursor-pointer text-primary hover:bg-[#F5F3FF] hover:border-primary hover:scale-105 active:scale-95 flex items-center gap-2"
        >
          <FiFileText /> Select PDF File
        </label>
      )}
      
      {file && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-5 bg-[#F5F3FF] rounded-2xl flex items-center gap-4 border border-primary/20 w-full max-w-sm shadow-sm"
        >
          <div className="p-3 bg-white rounded-xl text-primary shadow-sm">
            <FiFileText size={24} />
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="text-sm font-extrabold text-primary truncate">{file.name}</p>
            <div className="flex items-center gap-1 text-[11px] text-green-600 font-extrabold uppercase tracking-widest mt-0.5">
              <FiCheckCircle size={12} />
              <span>Ready for AI Analysis</span>
            </div>
          </div>
          <label htmlFor="resume-upload" className="text-xs font-extrabold text-primary hover:underline cursor-pointer px-2 py-1 bg-white rounded-lg border border-purple-100 shadow-sm">
            Change
          </label>
        </motion.div>
      )}
      
      <p className="mt-8 text-xs text-muted font-bold tracking-wide">Supported format: PDF • Max 10MB</p>
    </div>
  )
}

