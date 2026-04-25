import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { get, put } from '../services/api.js'
import EventForm from '../components/events/EventForm.jsx'

export default function EditEvent() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [initial, setInitial] = useState(null)
  const [loading, setLoading] = useState(false)
  const [apiError, setApiError] = useState('')

  useEffect(() => {
    get(`/api/posts/${id}`)
      .then((data) => {
        const p = data.post
        setInitial({
          ...p,
          date: p.date ? new Date(p.date).toISOString().slice(0, 16) : '',
          rsvpLimit: p.rsvpLimit ?? '',
        })
      })
      .catch(() => setApiError('Could not load post.'))
  }, [id])

  const handleSubmit = async (fields) => {
    setApiError('')
    setLoading(true)
    try {
      await put(`/api/posts/${id}`, fields)
      navigate('/dashboard')
    } catch (err) {
      setApiError(err.message || 'Could not update event.')
    } finally {
      setLoading(false)
    }
  }

  if (!initial && !apiError) return <div className="page"><p className="text-muted">Loading…</p></div>

  return (
    <div className="page">
      <div className="page-header">
        <h1>Edit Event</h1>
        <p>Update the details below then save or re-publish.</p>
      </div>
      {apiError && <p className="text-danger" role="alert" style={{ marginBottom: '1rem' }}>{apiError}</p>}
      {initial && <EventForm initial={initial} onSubmit={handleSubmit} loading={loading} />}
    </div>
  )
}
