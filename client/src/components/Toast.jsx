import { AnimatePresence, motion } from 'framer-motion'
import { FiCheckCircle, FiAlertCircle } from 'react-icons/fi'

function Toast({ message, type, onClose }) {
  const isError = type === 'error'

  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.9 }}
          transition={{ type: 'spring', bounce: 0.4 }}
          onClick={onClose}
          style={{
            position: 'fixed',
            top: '24px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'var(--glass-bg)',
            backdropFilter: 'blur(20px)',
            border: `1px solid ${isError ? 'rgba(239, 68, 68, 0.4)' : 'rgba(34, 197, 94, 0.4)'}`,
            boxShadow: 'var(--shadow-lg)',
            padding: '12px 24px',
            borderRadius: '999px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            cursor: 'pointer',
            zIndex: 100
          }}
        >
          {isError ? (
            <FiAlertCircle size={20} color="var(--danger)" />
          ) : (
            <FiCheckCircle size={20} color="var(--secondary)" />
          )}
          <span style={{ 
            fontWeight: 600, 
            fontSize: '0.95rem',
            color: isError ? 'var(--danger)' : 'var(--secondary)'
          }}>
            {message}
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Toast
