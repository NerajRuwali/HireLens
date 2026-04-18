import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <motion.div 
      className="mb-16 text-center lg:text-left pt-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-bold mb-6">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
        </span>
        AI-Powered Resume Intelligence
      </div>
      <h1 className="text-5xl lg:text-6xl font-extrabold mb-6 text-primary tracking-tight leading-tight">
        Analyze your <span className="gradient-text">Resume</span> <br /> 
        in <span className="gradient-text">Seconds.</span>
      </h1>
      <p className="text-secondary font-bold text-lg lg:text-xl max-w-2xl leading-relaxed">
        Upload your latest resume to discover deep ATS insights, identify career gaps, and get personalized interview preparation.
      </p>
    </motion.div>
  )
}

