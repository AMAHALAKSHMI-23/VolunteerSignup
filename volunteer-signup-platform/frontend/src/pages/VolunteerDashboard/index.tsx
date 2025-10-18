import { useEffect, useState } from 'react'
import api from '../../lib/api'
import { format } from 'date-fns'

const VolunteerDashboard = () => {
  const [signups, setSignups] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const fetchSignups = async () => {
    try {
      const res = await api.get('/signups/me')
      setSignups(res.data)
    } catch (err) {
      alert('Failed to fetch your registrations')
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = async (signupId: string) => {
    if (!confirm('Cancel your registration for this event?')) return
    try {
      await api.delete(`/signups/${signupId}`)
      fetchSignups()
    } catch (err) {
      alert('Failed to cancel signup')
    }
  }

  useEffect(() => {
    fetchSignups()
  }, [])

  return (
    <div className="max-w-4xl mx-auto space-y-4">
      <h2 className="text-2xl font-bold mb-4">My Registered Events</h2>

      {loading ? (
        <p>Loading...</p>
      ) : signups.length > 0 ? (
        signups.map(signup => {
          const event = signup?.event
          if (!event) {
            return (
              <div
                key={signup._id}
                className="border p-4 rounded bg-yellow-100 shadow text-red-700"
              >
                <p>Event data is missing or unavailable.</p>
              </div>
            )
          }

          return (
            <div key={signup._id} className="border p-4 rounded bg-white shadow">
              <h3 className="text-lg font-semibold">{event.title}</h3>
              <p className="text-sm text-gray-600">
                {format(new Date(event.date), 'dd MMM yyyy')} | {event.location}
              </p>
              <p className="mt-2">{event.description}</p>

              <button
                onClick={() => handleCancel(signup._id)}
                className="mt-3 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
              >
                Cancel Registration
              </button>
            </div>
          )
        })
      ) : (
        <p>You haven’t registered for any events yet.</p>
      )}
    </div>
  )
}

export default VolunteerDashboard

