import React, { createContext, useContext, useState, useEffect } from 'react'

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
  const [admin, setAdmin] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for existing tokens on app load
    const userToken = localStorage.getItem('userToken')
    const adminToken = localStorage.getItem('adminToken')
    const userData = localStorage.getItem('userData')
    const adminData = localStorage.getItem('adminData')

    if (userToken && userData) {
      setUser({
        token: userToken,
        ...JSON.parse(userData)
      })
    }

    if (adminToken && adminData) {
      setAdmin({
        token: adminToken,
        ...JSON.parse(adminData)
      })
    }

    setLoading(false)
  }, [])

  const loginUser = (token, userData) => {
    localStorage.setItem('userToken', token)
    localStorage.setItem('userData', JSON.stringify(userData))
    setUser({ token, ...userData })
  }

  const loginAdmin = (token, adminData) => {
    localStorage.setItem('adminToken', token)
    localStorage.setItem('adminData', JSON.stringify(adminData))
    setAdmin({ token, ...adminData })
  }

  const logoutUser = () => {
    localStorage.removeItem('userToken')
    localStorage.removeItem('userData')
    setUser(null)
  }

  const logoutAdmin = () => {
    localStorage.removeItem('adminToken')
    localStorage.removeItem('adminData')
    setAdmin(null)
  }

  const value = {
    user,
    admin,
    loading,
    loginUser,
    loginAdmin,
    logoutUser,
    logoutAdmin,
    isUserAuthenticated: !!user,
    isAdminAuthenticated: !!admin
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}