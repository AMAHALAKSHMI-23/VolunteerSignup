import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

interface Props {
  children: React.ReactNode
  allowedRoles: ('admin' | 'volunteer')[]
}

const ProtectedRoute = ({ children, allowedRoles }: Props) => {
  const { user } = useAuth()

  if (!user) return <Navigate to="/login" />
  if (!allowedRoles.includes(user.role)) return <Navigate to="/unauthorized" />

  return <>{children}</>
}

export default ProtectedRoute
