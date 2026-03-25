import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Hero from '../components/home/Hero'
import UploadZone from '../components/home/UploadZone'
import AnalysisConfig from '../components/home/AnalysisConfig'
import Loader from '../components/Loader'
import Toast from '../components/Toast'
import { uploadResumeForAnalysis } from '../services/api'

export default function Home() {
  const navigate = useNavigate()
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [dragActive, setDragActive] = useState(false)
  const [toast, setToast] = useState({ message: '', type: 'info' })
  const [selectedRole, setSelectedRole] = useState('Frontend Developer')

  const validateFile = (selectedFile) => {
    if (selectedFile && (selectedFile.type === 'application/pdf' || selectedFile.name.toLowerCase().endsWith('.pdf'))) {
      setFile(selectedFile)
      setToast({ message: 'Resume ready for analysis!', type: 'success' })
      return true
    }
    setToast({ message: 'Please upload a valid PDF resume', type: 'error' })
    return false
  }

  const handleFileChange = (e) => validateFile(e.target.files?.[0])

  const handleDrop = (e) => {
    e.preventDefault(); e.stopPropagation(); setDragActive(false)
    if (e.dataTransfer.files?.[0]) validateFile(e.dataTransfer.files[0])
  }

  const handleDrag = (e) => {
    e.preventDefault(); e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') setDragActive(true)
    else if (e.type === 'dragleave') setDragActive(false)
  }

  const analyzeResume = async () => {
    if (!file) {
      setToast({ message: 'Please select a resume first', type: 'error' })
      return
    }
    setLoading(true)
    try {
      const analysisResult = await uploadResumeForAnalysis(file, selectedRole)
      navigate('/result', { state: { analysis: analysisResult } })
    } catch (error) {
      setToast({ message: error.message || 'Analysis failed', type: 'error' })
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div className="h-[60vh] flex items-center justify-center"><Loader text="Analyzing your profile..." /></div>

  return (
    <div className="max-w-6xl mx-auto py-8">
      <Toast message={toast.message} type={toast.type} onClose={() => setToast({ message: '', type: 'info' })} />
      <Hero />

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
        <div className="lg:col-span-3">
          <UploadZone 
            file={file} 
            dragActive={dragActive} 
            onDrag={handleDrag} 
            onDrop={handleDrop} 
            onFileChange={handleFileChange} 
          />
        </div>

        <div className="lg:col-span-2">
          <AnalysisConfig 
            role={selectedRole} 
            setRole={setSelectedRole} 
            onSubmit={analyzeResume} 
            disabled={!file} 
          />
        </div>
      </div>
    </div>
  )
}
