import { useEffect, useState } from 'react'
import api from '../../lib/api'
import EventCard from '../../components/EventCard'

const Home = () => {
  const [events, setEvents] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const fetchEvents = async () => {
    try {
      const res = await api.get('/events')
      setEvents(res.data)
    } catch (err) {
      alert('Failed to fetch events')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchEvents()
  }, [])

  return (
    <div className="max-w-4xl mx-auto space-y-4">
      <h2 className="text-2xl font-bold mb-4">Upcoming Events</h2>
      {loading ? (
        <p>Loading...</p>
      ) : events.length > 0 ? (
        events.map(event => (
          <EventCard key={event._id} event={event} onRegister={fetchEvents} />
        ))
      ) : (
        <p>No events available</p>
      )}
    </div>
  )
}

export default Home
