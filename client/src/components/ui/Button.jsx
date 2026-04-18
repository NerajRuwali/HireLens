import { motion } from 'framer-motion'

export const Button = ({ children, onClick, disabled, variant = 'primary', className = '', ...props }) => {
  const variants = {
    primary: 'btn-primary shadow-lg shadow-primary/20',
    secondary: 'px-6 py-3 rounded-xl border border-gray-200 bg-white text-primary font-extrabold hover:bg-light hover:border-primary/30 hover:scale-105 shadow-sm transition-all duration-200',
    ghost: 'p-2.5 rounded-xl hover:bg-[#EDE9FE] text-secondary hover:text-primary hover:scale-105 transition-all duration-200'
  }

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      whileTap={!disabled ? { scale: 0.96 } : {}}
      className={`${variants[variant]} ${className} cursor-pointer flex items-center justify-center gap-2`}
      {...props}
    >
      {children}
    </motion.button>
  )
}

