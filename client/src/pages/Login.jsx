import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiMail, FiLock, FiArrowLeft, FiLogOut } from 'react-icons/fi'
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
    <div className="min-h-screen pt-32 pb-12 px-4 flex flex-col items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-text-secondary hover:text-primary transition-colors mb-8 font-medium"
        >
          <FiArrowLeft />
          Back to Home
        </Link>

        <div className="bg-white p-10 rounded-3xl shadow-xl border border-purple-100">
          <div className="mb-10 text-center">
            <h1 className="text-3xl font-bold text-text-main mb-2">Welcome Back</h1>
            <p className="text-text-secondary font-medium">Access your dashboard and reports</p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-text-secondary ml-1">Email Address</label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary group-focus-within:text-primary transition-colors">
                  <FiMail size={18} />
                </div>
                <input
                  type="email"
                  placeholder="name@company.com"
                  className="input-field pl-12"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-text-secondary ml-1">Password</label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary group-focus-within:text-primary transition-colors">
                  <FiLock size={18} />
                </div>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="input-field pl-12"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <button 
              className="btn-primary w-full py-4 text-lg font-bold mt-2" 
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Signing in...</span>
                </div>
              ) : 'Sign In'}
            </button>
            
            {message && (
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`text-center text-sm font-medium mt-4 ${message.includes('successful') ? 'text-green-600' : 'text-red-500'}`}
              >
                {message}
              </motion.p>
            )}
          </form>

          <div className="mt-10 pt-8 border-t border-purple-50 text-center">
            <p className="text-sm text-text-secondary font-medium">
              Don't have an account? <span className="text-primary hover:underline cursor-pointer">Contact support</span>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default Login


