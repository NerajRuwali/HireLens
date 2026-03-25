import { motion } from 'framer-motion'

export const Card = ({ children, className = '', hover = true }) => (
  <motion.div 
    className={`glass-card p-10 ${className}`}
    whileHover={hover ? { y: -5, transition: { duration: 0.3 } } : {}}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
  >
    {children}
  </motion.div>
)
