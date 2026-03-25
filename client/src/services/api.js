import axios from 'axios'
import { getToken } from './auth'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api'
console.log('API URL:', API_URL)

const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 30000,
})

apiClient.interceptors.request.use((config) => {
  const authToken = getToken()
  if (authToken) {
    config.headers.Authorization = `Bearer ${authToken}`
  }
  return config
})

export const uploadResumeForAnalysis = async (resumeFile, targetRole = "Frontend Developer") => {
  const uploadData = new FormData()
  uploadData.append('resume', resumeFile)
  uploadData.append('role', targetRole)

  const apiResponse = await apiClient.post('/analyze', uploadData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  return apiResponse.data
}

export const getAnalysisHistory = async () => {
  const apiResponse = await apiClient.get('/history')
  return apiResponse.data
}

export const loginUser = async ({ emailAddress, userPassword }) => {
  const apiResponse = await apiClient.post('/auth/login', { email: emailAddress, password: userPassword })
  return apiResponse.data
}

export const getCurrentUserProfile = async () => {
  const apiResponse = await apiClient.get('/auth/me')
  return apiResponse.data
}

// Feature Specific APIs
export const generateResumeProfile = async (userData) => {
  const apiResponse = await apiClient.post('/builder/generate', userData)
  return apiResponse.data
}

export const matchResumeWithJob = async (resumeFile, jobDescriptionText) => {
  const matchData = new FormData()
  matchData.append('resume', resumeFile)
  matchData.append('jobDescription', jobDescriptionText)

  const apiResponse = await apiClient.post('/jobs/match', matchData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  return apiResponse.data
}

export const createCoverLetter = async (resumeFile, jobDescriptionText) => {
  const letterData = new FormData()
  letterData.append('resume', resumeFile)
  letterData.append('jobDescription', jobDescriptionText)

  const apiResponse = await apiClient.post('/cover-letter/generate', letterData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  return apiResponse.data
}

export const getSalaryEstimation = async (salaryPayload) => {
  const apiResponse = await apiClient.post('/salary/estimate', salaryPayload)
  return apiResponse.data
}
