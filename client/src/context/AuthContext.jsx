/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useEffect, useCallback } from 'react'
import { get, post } from '../services/api.js'

export const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    get('/api/auth/me')
      .then((data) => setUser(data.user ?? null))
      .catch(() => setUser(null))
      .finally(() => setLoading(false))
  }, [])

  const login = useCallback(async (email, password) => {
    const data = await post('/api/auth/login', { email, password })
    setUser(data.user)
    return data.user
  }, [])

  const signup = useCallback(async (name, email, password) => {
    const data = await post('/api/auth/signup', { name, email, password })
    setUser(data.user)
    return data.user
  }, [])

  const logout = useCallback(async () => {
    await post('/api/auth/logout', {})
    setUser(null)
  }, [])

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
