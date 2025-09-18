import React, { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [userType, setUserType] = useState(null) // 'user' or 'foodPartner'
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkAuthStatus()
  }, [])

  const checkAuthStatus = async () => {
    try {
      // Try to get current user info from backend
      const response = await axios.get('http://localhost:3000/api/auth/me', {
        withCredentials: true
      })
      setUser(response.data.user)
      setUserType(response.data.userType)
    } catch (error) {
      // User not authenticated
      setUser(null)
      setUserType(null)
    } finally {
      setLoading(false)
    }
  }

  const login = (userData, type) => {
    setUser(userData)
    setUserType(type)
  }

  const logout = () => {
    setUser(null)
    setUserType(null)
  }

  return (
    <AuthContext.Provider value={{
      user,
      userType,
      loading,
      login,
      logout,
      checkAuthStatus
    }}>
      {children}
    </AuthContext.Provider>
  )
}