import { motion } from 'framer-motion'

function Loader({ text = 'Analyzing profile...' }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 w-full h-full min-h-[400px]">
      <div className="relative mb-10">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1.2, ease: 'linear' }}
          className="w-16 h-16 border-4 border-purple-100 border-t-primary rounded-full"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-2 h-2 bg-primary rounded-full animate-ping" />
        </div>
      </div>

      <motion.p
        initial={{ opacity: 0.5, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ repeat: Infinity, duration: 1, repeatType: 'reverse' }}
        className="text-xl font-extrabold text-[#7C3AED] tracking-tight"
      >
        {text}
      </motion.p>

      {/* Skeletons below spinner */}
      <div className="w-full max-w-sm mt-12 space-y-3">
        {[1, 2, 3].map((i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0.2 }}
            animate={{ opacity: 0.5 }}
            transition={{ repeat: Infinity, duration: 2, repeatType: 'reverse', delay: i * 0.3 }}
            className={`h-2.5 bg-purple-100 rounded-full ${i === 3 ? 'w-2/3' : 'w-full'}`}
          />
        ))}
      </div>
    </div>
  )
}

export default Loader

