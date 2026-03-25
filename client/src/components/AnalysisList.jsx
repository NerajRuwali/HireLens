import { motion } from 'framer-motion'
import { FiCheckCircle, FiXCircle, FiInfo, FiTag } from 'react-icons/fi'

function AnalysisList({ title, items = [], variant = 'default' }) {
  const isTagVariant = variant === 'tags'

  let config = {
    icon: <FiInfo size={20} />,
    bg: 'var(--primary-light)',
    border: 'var(--primary)',
    color: 'var(--primary)'
  }

  if (variant === 'strengths') {
    config = { icon: <FiCheckCircle size={20} />, bg: 'var(--secondary-light)', border: 'var(--secondary)', color: 'var(--secondary)' }
  } else if (variant === 'weaknesses') {
    config = { icon: <FiXCircle size={20} />, bg: 'var(--danger-light)', border: 'var(--danger)', color: 'var(--danger)' }
  } else if (variant === 'tags') {
    config = { icon: <FiTag size={20} />, bg: 'var(--warning-light)', border: 'var(--warning)', color: 'var(--warning)' }
  }

  return (
    <motion.div
      className="glass-card"
      style={{ padding: '24px', borderLeft: `4px solid ${config.color}` }}
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
        <div style={{ color: config.color }}>{config.icon}</div>
        <h3 style={{ margin: 0, fontSize: '1.2rem' }}>{title}</h3>
      </div>

      {items.length > 0 ? (
        isTagVariant ? (
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {items.map((item, index) => (
              <motion.span 
                key={`${title}-${index}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                style={{
                  background: config.color,
                  color: '#fff',
                  padding: '6px 14px',
                  borderRadius: '999px',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  boxShadow: 'var(--shadow-sm)'
                }}
              >
                {item}
              </motion.span>
            ))}
          </div>
        ) : (
          <ul style={{ margin: 0, paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {items.map((item, index) => (
              <motion.li 
                key={`${title}-${index}`}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}
              >
                {item}
              </motion.li>
            ))}
          </ul>
        )
      ) : (
        <p style={{ color: 'var(--text-muted)', margin: 0, fontStyle: 'italic' }}>No items available.</p>
      )}
    </motion.div>
  )
}

export default AnalysisList
