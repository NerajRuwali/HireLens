// Authentication Utility Service

export const saveUserSession = (authToken, userData) => {
  localStorage.setItem('auth_token', authToken)
  localStorage.setItem('user_profile', JSON.stringify(userData))
}

export const clearUserSession = () => {
  localStorage.removeItem('auth_token')
  localStorage.removeItem('user_profile')
}

export const getAuthToken = () => {
  return localStorage.getItem('auth_token')
}

export const getUserProfile = () => {
  const profileData = localStorage.getItem('user_profile')
  return profileData ? JSON.parse(profileData) : null
}

export const isAuthenticated = () => {
  return !!getAuthToken()
}

/** 
 * Legacy support for older components
 */
export const getToken = getAuthToken
export const clearSession = clearUserSession

// Backward compatibility for setSession({ token, user }) pattern
export const setSession = (sessionData) => {
  if (sessionData?.token && sessionData?.user) {
    saveUserSession(sessionData.token, sessionData.user)
  }
}
