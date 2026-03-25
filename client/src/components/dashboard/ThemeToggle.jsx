import { FiSun, FiMoon } from 'react-icons/fi'
import { useState, useEffect } from 'react'

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(localStorage.getItem('theme') === 'dark')

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [isDark])

  return (
    <button 
      onClick={() => setIsDark(!isDark)}
      className="p-2.5 rounded-xl bg-slate-100 hover:bg-blue-50 text-slate-600 hover:text-blue-500 transition-all dark:bg-slate-700 dark:text-slate-300"
    >
      {isDark ? <FiMoon size={20} /> : <FiSun size={20} />}
    </button>
  )
}
