import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { post } from '../services/api.js'
import EventForm from '../components/events/EventForm.jsx'

export default function CreateEvent() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [apiError, setApiError] = useState('')

  const handleSubmit = async (fields) => {
    setApiError('')
    setLoading(true)
    try {
      await post('/api/posts', fields)
      navigate('/dashboard')
    } catch (err) {
      setApiError(err.message || 'Could not create event.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page">
      <div className="page-header">
        <h1>Create Event</h1>
        <p>Fill in the details below and save as draft or publish immediately.</p>
      </div>
      {apiError && <p className="text-danger" role="alert" style={{ marginBottom: '1rem' }}>{apiError}</p>}
      <EventForm onSubmit={handleSubmit} loading={loading} />
    </div>
  )
}
