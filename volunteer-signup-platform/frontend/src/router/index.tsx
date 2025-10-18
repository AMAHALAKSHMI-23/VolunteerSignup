import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import Home from '../pages/Home/Home'
import Login from '../pages/Auth/Login'
import Register from '../pages/Auth/Register'
import NotFound from '../pages/NotFound'
import AdminDashboard from '../pages/AdminDashboard'
import VolunteerDashboard from '../pages/VolunteerDashboard'
import ProtectedRoute from '../components/ProtectedRoute'
import CreateEventForm from '../pages/AdminDashboard/CreateEventForm'
import EventDetails from '../pages/EventDetails'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: 'event/:id', element: <EventDetails /> }, // ✅ New Route

      // Admin Routes
      {
        path: 'admin',
        element: (
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminDashboard />
          </ProtectedRoute>
        )
      },
      {
        path: 'admin/create',
        element: (
          <ProtectedRoute allowedRoles={['admin']}>
            <CreateEventForm />
          </ProtectedRoute>
        )
      },
      {
        path: 'admin/edit/:id',
        element: (
          <ProtectedRoute allowedRoles={['admin']}>
            <CreateEventForm />
          </ProtectedRoute>
        )
      },

      // Volunteer Dashboard
      {
        path: 'volunteer',
        element: (
          <ProtectedRoute allowedRoles={['volunteer']}>
            <VolunteerDashboard />
          </ProtectedRoute>
        )
      },

      // 404 Page
      { path: '*', element: <NotFound /> }
    ]
  }
])

export default router


