import { motion } from 'framer-motion'
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { buildResumeAPI, matchJobAPI, generateCoverLetterAPI, estimateSalaryAPI } from '../services/api'
import Loader from '../components/Loader'

const featureMeta = {
  'cv-scoring': { title: 'CV Scoring (ATS)', description: 'Upload and score resumes using ATS-friendly analysis.' },
  'job-matching': { title: 'Job Matching Score', description: 'Compare profile alignment with target role requirements.' },
  'cover-letter': { title: 'Cover Letter Generator', description: 'Generate role-specific cover letters with AI guidance.' },
  salary: { title: 'Salary Estimator', description: 'Estimate salary range based on role, skills, and experience.' },
  builder: { title: 'AI Resume Builder', description: 'Build polished resumes with guided templates and AI support.' },
}

function FeaturePage() {
  const { slug } = useParams()
  const feature = featureMeta[slug] || { title: 'Feature', description: 'This module is available and ready for integration.' }

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
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)', fontWeight: 500 }}>Upload Resume (PDF)</label>
            <input type="file" accept="application/pdf" onChange={e => setFile(e.target.files[0])} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)', fontWeight: 500 }}>Target Job Description</label>
            <textarea rows="6" value={textInput} onChange={e => setTextInput(e.target.value)} placeholder="Paste the exact JD here..." />
          </div>
        </div>
      )
    }
    if (slug === 'salary') {
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <input type="text" placeholder="Job Title (e.g., Senior Frontend Engineer)" value={salaryData.title} onChange={e => setSalaryData({...salaryData, title: e.target.value})} />
          <input type="text" placeholder="Key Skills (e.g., React, TypeScript, GraphQL)" value={salaryData.skills} onChange={e => setSalaryData({...salaryData, skills: e.target.value})} />
          <input type="text" placeholder="Years of Experience (e.g., 5)" value={salaryData.exp} onChange={e => setSalaryData({...salaryData, exp: e.target.value})} />
          <input type="text" placeholder="Location (e.g., San Francisco, CA or Remote)" value={salaryData.loc} onChange={e => setSalaryData({...salaryData, loc: e.target.value})} />
        </div>
      )
    }
    if (slug === 'builder') {
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <label style={{ color: 'var(--text-muted)', fontWeight: 500 }}>Career History / Profile Notes</label>
          <textarea rows="10" value={textInput} onChange={e => setTextInput(e.target.value)} placeholder="Dump your raw notes, past experiences, and goals here. The AI will perfectly structure it..." />
        </div>
      )
    }
    return null
  }

  return (
    <motion.main className="page" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }}>
      <div className="glass-card" style={{ maxWidth: '800px', margin: '0 auto', padding: '40px' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '8px' }}>{feature.title}</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginBottom: '40px' }}>{feature.description}</p>
        
        {slug !== 'cv-scoring' ? (
          <form onSubmit={handleSubmit} style={{ marginBottom: '32px' }}>
            {renderForm()}
            
            {error && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ color: 'var(--danger)', marginTop: '20px', background: 'var(--danger-light)', padding: '12px', borderRadius: '8px', fontWeight: 500 }}>
                {error}
              </motion.div>
            )}
            
            <motion.button type="submit" className="btn btn-primary" disabled={loading} style={{ marginTop: '32px', width: '100%', padding: '16px' }} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              {loading ? 'Processing via AI...' : `Execute ${feature.title}`}
            </motion.button>
          </form>
        ) : (
          <p style={{ color: 'var(--text-muted)', textAlign: 'center' }}>Please go to the Home page to use the ATS matcher.</p>
        )}

        {loading && <div style={{ marginTop: '20px' }}><Loader text="Crunching data with LLMs..." /></div>}

        {result && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ marginTop: '40px' }}>
            <h3 style={{ marginBottom: '16px' }}>Generated Insights</h3>
            <div style={{ background: '#0f172a', padding: '24px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)' }}>
              <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word', color: '#c4b5fd', fontFamily: 'monospace', fontSize: '0.9rem', margin: 0 }}>
                {JSON.stringify(result, null, 2)}
              </pre>
            </div>
          </motion.div>
        )}

        <div style={{ marginTop: '40px', textAlign: 'center' }}>
          <Link to="/" className="btn btn-secondary">
            ← Return Home
          </Link>
        </div>
      </div>
    </motion.main>
  )
}

export default FeaturePage
