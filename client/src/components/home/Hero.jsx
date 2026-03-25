import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <motion.div 
      className="mb-12"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h1 className="text-5xl font-extrabold mb-3 text-text-main tracking-tight">
        New <span className="gradient-text">Analysis</span>
      </h1>
      <p className="text-text-muted font-bold text-lg opacity-80">
        Upload your latest resume to discover ATS insights and career gaps.
      </p>
    </motion.div>
  )
}
