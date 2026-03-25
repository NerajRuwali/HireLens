import { motion } from 'framer-motion'

export const Button = ({ children, onClick, disabled, variant = 'primary', className = '', ...props }) => {
  const variants = {
    primary: 'btn-primary',
    secondary: 'px-6 py-3 rounded-xl border-2 border-glass-border bg-white/80 text-text-muted font-black uppercase text-xs tracking-widest hover:bg-slate-50 hover:border-slate-300 shadow-sm',
    ghost: 'p-2.5 rounded-xl hover:bg-slate-100 transition-colors'
  }

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      whileHover={!disabled ? { scale: 1.03 } : {}}
      whileTap={!disabled ? { scale: 0.97 } : {}}
      className={`${variants[variant]} ${className} cursor-pointer`}
      {...props}
    >
      {children}
    </motion.button>
  )
}
