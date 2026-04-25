import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth.js'

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()
  const location = useLocation()

  if (loading) return <div className="loading-spinner" aria-label="Loading…" />

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children
}
