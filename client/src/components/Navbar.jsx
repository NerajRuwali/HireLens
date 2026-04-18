import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { BsMoonStarsFill, BsSunFill } from 'react-icons/bs'
import { FiSearch } from 'react-icons/fi'
import { Link, useNavigate } from 'react-router-dom'
import { clearSession, getUser, isLoggedIn } from '../services/auth'

function Navbar({ theme, toggleTheme }) {
  const navigate = useNavigate()
  const authUser = getUser()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleAuthAction = () => {
    if (!isLoggedIn()) {
      navigate('/login')
    } else {
      clearSession()
      window.location.reload()
    }
  }

  return (
    <div style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '24px auto',
      maxWidth: '1152px', position: 'sticky', top: '24px', zIndex: 50, padding: '0 24px',
      transition: 'all 0.3s ease-in-out'
    }}>

      {/* 1. Left Tab - Logo */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="glass-card"
        style={{
          padding: '8px 24px', borderRadius: '999px', display: 'flex', alignItems: 'center',
          backgroundColor: scrolled ? 'var(--glass-bg)' : 'transparent',
          boxShadow: scrolled ? '0 10px 30px -10px rgba(0,0,0,0.1)' : 'none',
          border: scrolled ? '1px solid rgba(255,255,255,0.08)' : '1px solid transparent',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          transition: 'all 0.3s ease-in-out'
        }}
      >
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{
            background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
            padding: '8px',
            borderRadius: '10px',
            color: 'white',
            display: 'grid',
            placeItems: 'center'
          }}>
            <FiSearch size={20} strokeWidth={3} />
          </div>
          <span style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.5px' }}>
            Hire<span className="gradient-text">Lens</span>
          </span>
        </Link>
      </motion.div>

      {/* 2. Center Tab - About */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="glass-card"
        style={{
          padding: '12px 32px', borderRadius: '999px', display: 'flex', alignItems: 'center', justifyContent: 'center',
          backgroundColor: scrolled ? 'var(--glass-bg)' : 'transparent',
          boxShadow: scrolled ? '0 10px 30px -10px rgba(0,0,0,0.1)' : 'none',
          border: scrolled ? '1px solid rgba(255,255,255,0.08)' : '1px solid transparent',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          transition: 'all 0.3s ease-in-out'
        }}
      >
        <Link to="/" style={{ textDecoration: 'none', color: 'var(--text-muted)', fontWeight: 600, transition: 'color 0.2s', fontSize: '1.05rem', marginRight: '24px' }} onMouseOver={e => e.target.style.color = 'var(--text-main)'} onMouseOut={e => e.target.style.color = 'var(--text-muted)'}>
          About
        </Link>
        <Link to="/history" style={{ textDecoration: 'none', color: 'var(--text-muted)', fontWeight: 600, transition: 'color 0.2s', fontSize: '1.05rem' }} onMouseOver={e => e.target.style.color = 'var(--text-main)'} onMouseOut={e => e.target.style.color = 'var(--text-muted)'}>
          History
        </Link>
      </motion.div>

      {/* 3. Right Tab - Actions (Theme + Auth) */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="glass-card"
        style={{
          padding: '6px 16px 6px 6px', borderRadius: '999px', display: 'flex', alignItems: 'center', gap: '16px',
          backgroundColor: scrolled ? 'var(--glass-bg)' : 'transparent',
          boxShadow: scrolled ? '0 10px 30px -10px rgba(0,0,0,0.1)' : 'none',
          border: scrolled ? '1px solid rgba(255,255,255,0.08)' : '1px solid transparent',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          transition: 'all 0.3s ease-in-out'
        }}
      >
        <button
          onClick={toggleTheme}
          aria-label="Toggle theme"
          style={{
            background: 'var(--bg-gradient-1)',
            border: 'none',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            display: 'grid',
            placeItems: 'center',
            cursor: 'pointer',
            color: 'var(--text-main)',
            transition: 'all 0.3s ease-in-out'
          }}
          onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
        >
          {theme === 'dark' ? <BsSunFill size={20} /> : <BsMoonStarsFill size={20} />}
        </button>
        <button
          onClick={handleAuthAction}
          style={{
            background: 'transparent',
            border: 'none',
            color: 'var(--text-muted)',
            fontWeight: 600,
            cursor: 'pointer',
            fontSize: '0.95rem',
            padding: '4px 8px',
            transition: 'color 0.3s ease-in-out'
          }}
          onMouseOver={e => e.target.style.color = 'var(--text-main)'}
          onMouseOut={e => e.target.style.color = 'var(--text-muted)'}
        >
          {authUser ? 'Logout' : 'Login'}
        </button>
      </motion.div>

    </div>
  )
}

export default Navbar
