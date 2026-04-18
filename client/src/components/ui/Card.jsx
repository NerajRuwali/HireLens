import { motion } from 'framer-motion'

export const Card = ({ children, className = '', hover = true, delay = 0 }) => (
  <motion.div 
    className={`glass-card p-8 sm:p-10 ${className}`}
    whileHover={hover ? { y: -4, shadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)" } : {}}
    initial={{ opacity: 0, y: 15 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay }}
  >
    {children}
  </motion.div>
)

