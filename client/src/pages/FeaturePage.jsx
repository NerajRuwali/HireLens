import { motion } from 'framer-motion'
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { buildResumeAPI, matchJobAPI, generateCoverLetterAPI, estimateSalaryAPI } from '../services/api'
import Loader from '../components/Loader'
import { FiArrowLeft, FiCpu, FiFileText, FiTarget, FiDollarSign, FiEdit3 } from 'react-icons/fi'
import { Button } from '../components/ui/Button'

const featureMeta = {
  'cv-scoring': { title: 'CV Scoring (ATS)', description: 'Upload and score resumes using ATS-friendly analysis.', icon: FiTarget },
  'job-matching': { title: 'Job Matching Score', description: 'Compare profile alignment with target role requirements.', icon: FiCpu },
  'cover-letter': { title: 'Cover Letter Generator', description: 'Generate role-specific cover letters with AI guidance.', icon: FiFileText },
  salary: { title: 'Salary Estimator', description: 'Estimate salary range based on role, skills, and experience.', icon: FiDollarSign },
  builder: { title: 'AI Resume Builder', description: 'Build polished resumes with guided templates and AI support.', icon: FiEdit3 },
}

function FeaturePage() {
  const { slug } = useParams()
  const feature = featureMeta[slug] || { title: 'Feature', description: 'This module is available and ready for integration.', icon: FiCpu }

  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  const [file, setFile] = useState(null)
  const [textInput, setTextInput] = useState('')
  const [salaryData, setSalaryData] = useState({ title: '', skills: '', exp: '', loc: '' })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setResult(null)

    try {
      let res;
      if (slug === 'job-matching' || slug === 'cover-letter') {
        if (!file || !textInput) throw new Error('Please provide both resume and job description.')
        res = slug === 'job-matching' ? await matchJobAPI(file, textInput) : await generateCoverLetterAPI(file, textInput)
      } else if (slug === 'salary') {
        if (!salaryData.title) throw new Error('Job title is required.')
        res = await estimateSalaryAPI({ jobTitle: salaryData.title, skills: salaryData.skills, experience: salaryData.exp, location: salaryData.loc })
      } else if (slug === 'builder') {
        if (!textInput) throw new Error('Please provide your profile data.')
        res = await buildResumeAPI({ profileInfo: textInput })
      } else {
        throw new Error('Feature not implemented yet.')
      }
      setResult(res?.data)
    } catch (err) {
      setError(err?.response?.data?.message || err.message || 'An error occurred.')
    } finally {
      setLoading(false)
    }
  }

  const renderForm = () => {
    if (slug === 'job-matching' || slug === 'cover-letter') {
      return (
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-text-secondary">Upload Resume (PDF)</label>
            <input 
              type="file" 
              accept="application/pdf" 
              onChange={e => setFile(e.target.files[0])} 
              className="w-full p-3 bg-purple-50 border border-purple-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm font-medium"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-text-secondary">Target Job Description</label>
            <textarea 
              rows="6" 
              value={textInput} 
              onChange={e => setTextInput(e.target.value)} 
              placeholder="Paste the exact JD here..." 
              className="w-full p-4 bg-purple-50 border border-purple-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm font-medium placeholder:text-text-secondary/40"
            />
          </div>
        </div>
      )
    }
    if (slug === 'salary') {
      return (
        <div className="space-y-4">
          <input 
            type="text" 
            placeholder="Job Title (e.g., Senior Frontend Engineer)" 
            value={salaryData.title} 
            onChange={e => setSalaryData({...salaryData, title: e.target.value})} 
            className="w-full p-4 bg-purple-50 border border-purple-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm font-medium placeholder:text-text-secondary/40"
          />
          <input 
            type="text" 
            placeholder="Key Skills (e.g., React, TypeScript, GraphQL)" 
            value={salaryData.skills} 
            onChange={e => setSalaryData({...salaryData, skills: e.target.value})} 
            className="w-full p-4 bg-purple-50 border border-purple-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm font-medium placeholder:text-text-secondary/40"
          />
          <div className="grid grid-cols-2 gap-4">
            <input 
              type="text" 
              placeholder="Experience (Years)" 
              value={salaryData.exp} 
              onChange={e => setSalaryData({...salaryData, exp: e.target.value})} 
              className="w-full p-4 bg-purple-50 border border-purple-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm font-medium placeholder:text-text-secondary/40"
            />
            <input 
              type="text" 
              placeholder="Location" 
              value={salaryData.loc} 
              onChange={e => setSalaryData({...salaryData, loc: e.target.value})} 
              className="w-full p-4 bg-purple-50 border border-purple-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm font-medium placeholder:text-text-secondary/40"
            />
          </div>
        </div>
      )
    }
    if (slug === 'builder') {
      return (
        <div className="space-y-2">
          <label className="text-sm font-semibold text-text-secondary">Career History / Profile Notes</label>
          <textarea 
            rows="10" 
            value={textInput} 
            onChange={e => setTextInput(e.target.value)} 
            placeholder="Dump your raw notes, past experiences, and goals here. The AI will perfectly structure it..." 
            className="w-full p-4 bg-purple-50 border border-purple-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm font-medium placeholder:text-text-secondary/40"
          />
        </div>
      )
    }
    return null
  }

  const Icon = feature.icon

  return (
    <motion.main className="max-w-4xl mx-auto py-8 px-4" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }}>
      <div className="bg-white p-8 sm:p-12 rounded-3xl border border-purple-100 shadow-lg">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-purple-50 rounded-2xl text-primary">
            <Icon size={32} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-text-main">{feature.title}</h1>
            <p className="text-text-secondary font-medium">{feature.description}</p>
          </div>
        </div>
        
        {slug !== 'cv-scoring' ? (
          <form onSubmit={handleSubmit} className="mt-10 space-y-8">
            {renderForm()}
            
            {error && (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-red-50 border border-red-100 text-red-600 p-4 rounded-xl text-sm font-bold flex items-center gap-2">
                <FiTarget className="shrink-0" />
                {error}
              </motion.div>
            )}
            
            <Button type="submit" className="w-full py-4 text-lg shadow-lg shadow-primary/20" disabled={loading}>
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Generating Magic...
                </span>
              ) : `Generate ${feature.title}`}
            </Button>
          </form>
        ) : (
          <div className="mt-16 text-center space-y-4">
            <div className="p-6 bg-purple-50 rounded-2xl inline-block">
               <FiTarget size={48} className="text-primary animate-pulse" />
            </div>
            <p className="text-text-secondary font-medium">Please head to the Dashboard to use our flagship ATS matching system.</p>
            <Link to="/" className="inline-block mt-4">
               <Button variant="secondary">Go to Dashboard</Button>
            </Link>
          </div>
        )}

        {result && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-12 space-y-4">
            <div className="flex items-center justify-between">
               <h3 className="text-xl font-bold text-text-main">AI Insights</h3>
               <span className="text-xs font-bold text-primary bg-purple-50 px-2 py-1 rounded-lg">JSON OUTPUT</span>
            </div>
            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-inner overflow-x-auto">
              <pre className="text-purple-300 font-mono text-sm leading-relaxed">
                {JSON.stringify(result, null, 2)}
              </pre>
            </div>
          </motion.div>
        )}

        <div className="mt-12 pt-8 border-t border-purple-50 text-center">
          <Link to="/" className="text-text-secondary hover:text-primary transition-colors flex items-center justify-center gap-2 font-bold text-sm">
            <FiArrowLeft size={16} />
            Back to Dashboard
          </Link>
        </div>
      </div>
    </motion.main>
  )
}

export default FeaturePage

