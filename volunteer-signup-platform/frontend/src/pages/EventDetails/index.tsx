import { useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import api from '../../lib/api'
import { format } from 'date-fns'
import Webcam from 'react-webcam'

const EventDetails = () => {
  const { id } = useParams()
  const [event, setEvent] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [photo, setPhoto] = useState<string | null>(null)

  const webcamRef = useRef<Webcam>(null)

  const capturePhoto = () => {
    const imageSrc = webcamRef.current?.getScreenshot()
    setPhoto(imageSrc || null)
  }

  const registerForEvent = async () => {
    try {
      await api.post('/signups', {
        eventId: id,
        photo
      })
      alert('Registered successfully!')
    } catch (err) {
      alert('Already registered or failed')
    }
  }

  const fetchEvent = async () => {
    try {
      const res = await api.get(`/events/${id}`)
      setEvent(res.data)
    } catch (err) {
      alert('Error loading event')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchEvent()
  }, [id])

  if (loading) return <p className="text-center">Loading...</p>
  if (!event) return <p>Event not found</p>

  return (
    <div className="max-w-2xl mx-auto space-y-4 p-4">
      <h2 className="text-3xl font-bold">{event.title}</h2>
      <p>{format(new Date(event.date), 'PPP')} | {event.location}</p>
      <p>{event.description}</p>

      <hr className="my-4" />

      <h3 className="text-xl font-semibold">Register with Webcam Photo</h3>

      {!photo && (
        <div>
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            className="rounded border"
          />
          <button onClick={capturePhoto} className="btn mt-2">Capture Photo</button>
        </div>
      )}

      {photo && (
        <div className="mt-4">
          <img src={photo} alt="Captured" className="rounded w-48" />
          <button onClick={() => setPhoto(null)} className="text-sm text-blue-600 mt-2 underline">
            Retake
          </button>
        </div>
      )}

      <button onClick={registerForEvent} className="btn mt-4 bg-green-600 hover:bg-green-700">
        Register
      </button>
    </div>
  )
}

export default EventDetails
