import { motion } from 'framer-motion'

function Loader({ text = 'Analyzing...' }) {
  return (
    <div style={{ display: 'grid', placeItems: 'center', padding: '60px 20px', width: '100%' }}>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
        style={{
          width: '64px',
          height: '64px',
          border: '4px solid var(--primary-light)',
          borderTopColor: 'var(--primary)',
          borderRadius: '50%',
          marginBottom: '24px'
        }}
      />
      <motion.p
        initial={{ opacity: 0.5 }}
        animate={{ opacity: 1 }}
        transition={{ repeat: Infinity, duration: 0.8, repeatType: 'reverse' }}
        style={{
          fontWeight: 600,
          color: 'var(--primary)',
          fontSize: '1.2rem',
          letterSpacing: '0.5px'
        }}
      >
        {text}
      </motion.p>
      
      {/* Skeletons below spinner */}
      <div style={{ width: '100%', maxWidth: '400px', marginTop: '30px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {[1, 2, 3].map((i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0.3 }}
            animate={{ opacity: 0.7 }}
            transition={{ repeat: Infinity, duration: 1.5, repeatType: 'reverse', delay: i * 0.2 }}
            style={{
              height: '16px',
              width: i === 3 ? '60%' : '100%',
              background: 'var(--glass-border)',
              borderRadius: '8px'
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default Loader
