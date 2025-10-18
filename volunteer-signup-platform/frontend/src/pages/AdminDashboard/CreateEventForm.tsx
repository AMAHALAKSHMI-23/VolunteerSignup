import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { eventSchema } from '../../lib/validation'
import api from '../../lib/api'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

type FormData = z.infer<typeof eventSchema>

const CreateEventForm = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(eventSchema)
  })

  const isEditMode = Boolean(id)

  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true)
      if (isEditMode) {
        await api.put(`/events/${id}`, data)
        alert('Event updated successfully!')
      } else {
        await api.post('/events', data)
        alert('Event created successfully!')
      }
      navigate('/admin')
    } catch (err) {
      alert('Error submitting event')
    } finally {
      setLoading(false)
    }
  }

  const fetchEvent = async () => {
    try {
      const res = await api.get(`/events/${id}`)
      const { title, description, location, date, capacity } = res.data
      setValue('title', title)
      setValue('description', description)
      setValue('location', location)
      setValue('date', date.slice(0, 10)) // format yyyy-mm-dd
      setValue('capacity', capacity)
    } catch (err) {
      alert('Failed to load event')
    }
  }

  useEffect(() => {
    if (isEditMode) {
      fetchEvent()
    }
  }, [id])

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg mx-auto p-4 bg-white shadow rounded space-y-4">
      <h2 className="text-xl font-bold">{isEditMode ? 'Edit Event' : 'Create Event'}</h2>

      <input placeholder="Title" {...register('title')} className="input" />
      {errors.title && <p className="text-red-500">{errors.title.message}</p>}

      <textarea placeholder="Description" {...register('description')} className="input" />
      {errors.description && <p className="text-red-500">{errors.description.message}</p>}

      <input placeholder="Location" {...register('location')} className="input" />
      {errors.location && <p className="text-red-500">{errors.location.message}</p>}

      <input type="date" {...register('date')} className="input" />
      {errors.date && <p className="text-red-500">{errors.date.message}</p>}

      <input type="number" placeholder="Capacity" {...register('capacity', { valueAsNumber: true })} className="input" />
      {errors.capacity && <p className="text-red-500">{errors.capacity.message}</p>}

      <button type="submit" className="btn" disabled={loading}>
        {loading ? 'Saving...' : isEditMode ? 'Update Event' : 'Create Event'}
      </button>
    </form>
  )
}

export default CreateEventForm
