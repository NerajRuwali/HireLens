import { AnimatePresence, motion } from 'framer-motion'
import { FiCheckCircle, FiAlertCircle, FiX } from 'react-icons/fi'

function Toast({ message, type, onClose }) {
  const isError = type === 'error'

  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: -20, x: '-50%', scale: 0.95 }}
          animate={{ opacity: 1, y: 0, x: '-50%', scale: 1 }}
          exit={{ opacity: 0, y: -20, x: '-50%', scale: 0.95 }}
          transition={{ type: 'spring', bounce: 0.3, duration: 0.6 }}
          className={`fixed top-8 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-3 px-6 py-3.5 rounded-2xl shadow-2xl border backdrop-blur-md cursor-pointer group ${
            isError 
              ? 'bg-red-50/90 border-red-100 text-red-600' 
              : 'bg-white/90 border-purple-100 text-primary'
          }`}
          onClick={onClose}
        >
          <div className={`p-1 rounded-lg ${isError ? 'bg-red-100' : 'bg-purple-100'}`}>
            {isError ? <FiAlertCircle size={18} /> : <FiCheckCircle size={18} />}
          </div>
          <span className="text-sm font-bold tracking-tight whitespace-nowrap">
            {message}
          </span>
          <div className="ml-2 p-1 rounded-lg hover:bg-black/5 transition-colors opacity-0 group-hover:opacity-100">
            <FiX size={14} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Toast

