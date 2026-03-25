import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { setSession } from '../services/auth'
import { loginUser } from '../services/api'

function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setEmail(localStorage.getItem('last_email') || 'demo@airesume.com')
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!email || !password) {
      setMessage('Please fill email and password.')
      return
    }

    setLoading(true)
    setMessage('')

    try {
      const response = await loginUser({ email, password })
      if (!response?.success || !response?.data?.token) {
        throw new Error('Invalid login response.')
      }

      setSession({
        token: response.data.token,
        user: response.data.user,
      })
      localStorage.setItem('last_email', email)
      setMessage('Login successful. Redirecting...')
      setTimeout(() => navigate('/'), 500)
    } catch (error) {
      setMessage(error?.response?.data?.message || error?.message || 'Login failed.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.main
      className="page feature-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <form className="card feature-card login-card" onSubmit={handleSubmit}>
        <h1>Login</h1>
        <p>Access your dashboard and saved resume reports.</p>

        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="primary-btn" type="submit">
          {loading ? 'Signing in...' : 'Login'}
        </button>
        {message ? <p className="small-muted">{message}</p> : null}

        <Link to="/" className="secondary-btn back-link" style={{ display: 'block', marginTop: '16px', textAlign: 'center' }}>
          Back to Home
        </Link>
      </form>
    </motion.main>
  )
}

export default Login

