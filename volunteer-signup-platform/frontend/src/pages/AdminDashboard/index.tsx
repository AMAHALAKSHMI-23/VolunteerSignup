import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../../lib/api'
import { useAuth } from '../../context/AuthContext'

const AdminDashboard = () => {
  const [events, setEvents] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()

  const fetchMyEvents = async () => {
    try {
      const res = await api.get('/events')
      const myEvents = res.data.filter((e: any) => e.createdBy?._id === user?._id)
      setEvents(myEvents)
    } catch (err) {
      alert('Failed to fetch events')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this event?')) return
    try {
      await api.delete(`/events/${id}`)
      fetchMyEvents()
    } catch (err) {
      alert('Failed to delete')
    }
  }

  useEffect(() => {
    fetchMyEvents()
  }, [])

  return (
    <div className="max-w-4xl mx-auto space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Admin Dashboard</h2>
        <Link to="/admin/create" className="btn">Create Event</Link>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : events.length > 0 ? (
        events.map(event => (
          <div key={event._id} className="border p-4 rounded bg-white shadow-sm">
            <h3 className="text-lg font-semibold">{event.title}</h3>
            <p>{event.date} | {event.location}</p>
            <div className="flex gap-4 mt-2">
              <Link to={`/admin/edit/${event._id}`} className="text-blue-600 underline">
                Edit
              </Link>
              <button
                onClick={() => handleDelete(event._id)}
                className="text-red-600 underline"
              >
                Delete
              </button>
            </div>
          </div>
        ))
      ) : (
        <p>No events created yet.</p>
      )}
    </div>
  )
}

export default AdminDashboard

