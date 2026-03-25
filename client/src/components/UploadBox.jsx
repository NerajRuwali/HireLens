import { motion } from 'framer-motion'
import { FiFileText, FiUploadCloud } from 'react-icons/fi'

function UploadBox({
  file,
  onFileChange,
  loading,
  error,
  dragActive,
  onDragOver,
  onDragLeave,
  onDrop,
  onRetry,
  sampleResumes,
  onSampleClick,
  selectedSample,
}) {
  return (
    <motion.div
      className="glass-card"
      style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <div>
        <h3 style={{ marginBottom: '8px' }}>Upload your resume to get AI insights</h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', margin: 0 }}>
          Choose your own resume or a sample profile to preview analysis.
        </p>
      </div>

      <motion.div
        className={`upload-dropzone ${dragActive ? 'drag-overlay' : ''}`}
        style={{
          border: `2px dashed ${dragActive ? 'var(--primary)' : 'rgba(156, 163, 175, 0.5)'}`,
          borderRadius: '16px',
          padding: '40px 20px',
          textAlign: 'center',
          transition: 'all 0.3s ease',
          background: dragActive ? 'rgba(99, 102, 241, 0.05)' : 'rgba(0,0,0,0.02)',
          position: 'relative',
          cursor: 'pointer'
        }}
        animate={dragActive ? { scale: [1, 1.02, 1] } : {}}
        transition={dragActive ? { duration: 2, repeat: Infinity, ease: 'easeInOut' } : {}}
        whileHover={{ scale: 1.01, borderColor: 'var(--primary)', background: 'rgba(99, 102, 241, 0.02)' }}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
      >
        <div style={{ pointerEvents: 'none' }}>
          <FiUploadCloud size={48} style={{ color: 'var(--primary)', marginBottom: '16px' }} />
          <p style={{ fontWeight: 600, fontSize: '1.1rem', margin: '0 0 8px 0' }}>
            Click to upload or drag & drop
          </p>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', margin: 0 }}>
            PDF only (max 5MB)
          </p>
        </div>
        <input
          id="resume-input"
          type="file"
          accept="application/pdf"
          onChange={onFileChange}
          disabled={loading}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            opacity: 0,
            cursor: 'pointer'
          }}
        />
      </motion.div>

      <motion.div 
        layout 
        style={{ 
          background: 'var(--glass-border)', 
          padding: '12px 16px', 
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          color: file || selectedSample ? 'var(--text-main)' : 'var(--text-muted)'
        }}
      >
        <FiFileText size={20} color="var(--primary)" />
        <span style={{ fontWeight: 500, fontSize: '0.95rem', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {file ? file.name : selectedSample ? selectedSample : 'No file selected'}
        </span>
      </motion.div>

      <div>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '12px' }}>or try our sample resumes</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '10px' }}>
          {sampleResumes.map((sample, idx) => (
            <motion.button
              key={sample.id}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="btn btn-secondary"
              style={{
                background: selectedSample === sample.name ? 'var(--primary-light)' : 'transparent',
                borderColor: selectedSample === sample.name ? 'var(--primary)' : 'var(--glass-border)',
                padding: '12px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                textAlign: 'left',
                width: '100%',
                borderRadius: '12px'
              }}
              onClick={() => onSampleClick(sample.name)}
              type="button"
            >
              <strong style={{ fontSize: '0.9rem', color: 'var(--text-main)', display: 'block' }}>{sample.name}</strong>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginTop: '4px' }}>{sample.role}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {error && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }} 
          animate={{ opacity: 1, y: 0 }}
          style={{ background: 'var(--danger-light)', border: '1px solid rgba(239, 68, 68, 0.3)', padding: '16px', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
        >
          <span style={{ color: 'var(--danger)', fontWeight: 600, fontSize: '0.9rem' }}>{error}</span>
          <button className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '0.85rem', borderColor: 'var(--danger)', color: 'var(--danger)' }} onClick={onRetry} disabled={loading}>
            Retry
          </button>
        </motion.div>
      )}

    </motion.div>
  )
}

export default UploadBox
