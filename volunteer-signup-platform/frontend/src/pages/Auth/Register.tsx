import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { registerSchema } from '../../lib/validation'
import { z } from 'zod'
import api from '../../lib/api'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

const Register = () => {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema)
  })

  const onSubmit = async (values: z.infer<typeof registerSchema>) => {
    try {
      setLoading(true)
      const res = await api.post('/auth/register', values)
      login(res.data)
      navigate('/')
    } catch (err) {
      alert('Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto p-4 bg-white shadow-md rounded">
      <h2 className="text-xl font-semibold mb-4">Register</h2>

      <input placeholder="Name" {...register('name')} className="input" />
      {errors.name && <p className="text-red-500">{errors.name.message}</p>}

      <input placeholder="Email" {...register('email')} className="input" />
      {errors.email && <p className="text-red-500">{errors.email.message}</p>}

      <input placeholder="Password" type="password" {...register('password')} className="input" />
      {errors.password && <p className="text-red-500">{errors.password.message}</p>}

      <select {...register('role')} className="input">
        <option value="volunteer">Volunteer</option>
        <option value="admin">Admin</option>
      </select>

      <button type="submit" className="btn mt-4" disabled={loading}>
        {loading ? 'Registering...' : 'Register'}
      </button>
    </form>
  )
}

export default Register
