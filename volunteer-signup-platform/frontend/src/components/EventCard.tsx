import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { format } from 'date-fns'
import api from '../lib/api'

interface EventCardProps {
  event: {
    _id: string
    title: string
    description: string
    location: string
    date: string
    capacity: number
    createdBy: { name: string }
  }
  onRegister?: () => void
}

const EventCard = ({ event, onRegister }: EventCardProps) => {
  const { user } = useAuth()

  const handleRegister = async () => {
    try {
      await api.post('/signups', { eventId: event._id })
      alert('Successfully registered!')
      onRegister?.()
    } catch (err) {
      alert('Already registered or error occurred')
    }
  }

  return (
    <div className="border p-4 rounded shadow-md bg-white">
      <h3 className="text-xl font-semibold">{event.title}</h3>
      <p className="text-sm text-gray-500">
        {format(new Date(event.date), 'dd MMM yyyy')} | {event.location}
      </p>
      <p className="my-2">{event.description}</p>
      <p className="text-sm text-gray-600">Organizer: {event.createdBy?.name}</p>

      {user?.role === 'volunteer' && (
        <button onClick={handleRegister} className="mt-3 bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">
          Register
        </button>
      )}
    </div>
  )
}

export default EventCard
