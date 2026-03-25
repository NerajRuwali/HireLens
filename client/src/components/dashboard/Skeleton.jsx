import { motion } from 'framer-motion'

export const Skeleton = ({ className, variant = 'rect' }) => {
  const variants = {
    rect: 'rounded-xl',
    circle: 'rounded-full',
    text: 'rounded-md h-4'
  }

  return (
    <motion.div
      className={`bg-slate-200/50 relative overflow-hidden ${variants[variant]} ${className}`}
      initial={{ opacity: 0.6 }}
      animate={{ opacity: [0.6, 1, 0.6] }}
      transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
    >
      <motion.div
        className="absolute inset-0 bg-linear-to-r from-transparent via-white/40 to-transparent"
        animate={{ x: ['-100%', '100%'] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
      />
    </motion.div>
  )
}

export const DashboardSkeleton = () => (
  <div className="max-w-7xl mx-auto py-8 transition-all animate-pulse">
    <div className="mb-12">
      <Skeleton className="w-64 h-10 mb-2" />
      <Skeleton className="w-96 h-5" />
    </div>

    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
      {[1, 2, 3, 4].map(i => (
        <Skeleton key={i} className="h-24" />
      ))}
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <Skeleton className="lg:col-span-2 h-[400px]" />
      <Skeleton className="h-[400px]" />
    </div>
  </div>
)

export const HistorySkeleton = () => (
  <div className="max-w-6xl mx-auto py-8 animate-pulse">
    <div className="mb-12">
      <Skeleton className="w-64 h-10 mb-2" />
      <Skeleton className="w-96 h-5" />
    </div>
    <div className="grid gap-4">
      {[1, 2, 3, 4, 5].map(i => (
        <Skeleton key={i} className="h-24 w-full" />
      ))}
    </div>
  </div>
)
