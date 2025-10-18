import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'

const Navbar = () => {
  const { user, logout } = useAuth()
  const { theme, toggleTheme } = useTheme()

  return (
    <nav className="bg-gray-800 dark:bg-gray-900 text-white px-6 py-3 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold text-white hover:text-blue-300">
        VolunteerHub
      </Link>

      <div className="flex gap-4 items-center">
        {!user && (
          <>
            <Link to="/login" className="hover:underline">Login</Link>
            <Link to="/register" className="hover:underline">Register</Link>
          </>
        )}

        {user && (
          <>
            {user.role === 'admin' && (
              <>
                <Link to="/admin" className="hover:underline">Admin Dashboard</Link>
                <Link to="/admin/create" className="hover:underline">Create Event</Link>
              </>
            )}

            {user.role === 'volunteer' && (
              <Link to="/volunteer" className="hover:underline">My Events</Link>
            )}

            <span className="text-sm italic hidden sm:inline">({user.role})</span>
            <button onClick={logout} className="hover:underline">Logout</button>
          </>
        )}

        {/* 🌗 Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className="text-sm px-2 py-1 border rounded hover:bg-gray-700 transition"
        >
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
      </div>
    </nav>
  )
}

export default Navbar

