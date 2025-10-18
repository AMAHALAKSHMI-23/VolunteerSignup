import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema } from '../../lib/validation'
import { z } from 'zod'
import api from '../../lib/api'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

const Login = () => {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema)
  })

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    try {
      setLoading(true)
      const res = await api.post('/auth/login', values)
      login(res.data)
      navigate('/')
    } catch (err) {
      alert('Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto p-4 bg-white shadow-md rounded">
      <h2 className="text-xl font-semibold mb-4">Login</h2>

      <input placeholder="Email" {...register('email')} className="input" />
      {errors.email && <p className="text-red-500">{errors.email.message}</p>}

      <input placeholder="Password" type="password" {...register('password')} className="input" />
      {errors.password && <p className="text-red-500">{errors.password.message}</p>}

      <button type="submit" className="btn mt-4" disabled={loading}>
        {loading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  )
}

export default Login
