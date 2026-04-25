import { useState } from 'react'
import styles from './EventForm.module.scss'

const CATEGORIES = ['Workshops', 'Career', 'Clubs', 'Sports']

const EMPTY = {
  title: '',
  category: '',
  date: '',
  location: '',
  description: '',
  image: '',
  rsvpLimit: '',
  status: 'draft',
}

function validate(fields) {
  const errs = {}
  if (!fields.title.trim()) errs.title = 'Title is required.'
  if (fields.title.length > 120) errs.title = 'Title must be 120 characters or fewer.'
  if (!fields.date) errs.date = 'Date is required.'
  else if (new Date(fields.date) < new Date()) errs.date = 'Date must be in the future.'
  if (!fields.description.trim()) errs.description = 'Description is required.'
  else if (fields.description.trim().length < 20) errs.description = 'Description must be at least 20 characters.'
  if (fields.rsvpLimit && (isNaN(fields.rsvpLimit) || Number(fields.rsvpLimit) < 1))
    errs.rsvpLimit = 'RSVP limit must be a positive number.'
  return errs
}

export default function EventForm({ initial = {}, onSubmit, loading }) {
  const [fields, setFields] = useState({ ...EMPTY, ...initial })
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setFields((f) => ({ ...f, [name]: value }))
    if (errors[name]) setErrors((e) => ({ ...e, [name]: undefined }))
  }

  const handleSubmit = (e, status) => {
    e.preventDefault()
    const withStatus = { ...fields, status }
    const errs = validate(withStatus)
    setErrors(errs)
    if (Object.keys(errs).length > 0) return
    onSubmit(withStatus)
  }

  return (
    <form className={styles.form} noValidate>
      <div className="form-group">
        <label htmlFor="title">Event title *</label>
        <input
          id="title"
          name="title"
          type="text"
          maxLength={120}
          value={fields.title}
          onChange={handleChange}
        />
        {errors.title && <span className="text-danger">{errors.title}</span>}
      </div>

      <div className={styles.row}>
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select id="category" name="category" value={fields.category} onChange={handleChange}>
            <option value="">Select…</option>
            {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="date">Date & time *</label>
          <input
            id="date"
            name="date"
            type="datetime-local"
            value={fields.date}
            onChange={handleChange}
          />
          {errors.date && <span className="text-danger">{errors.date}</span>}
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="location">Location</label>
        <input id="location" name="location" type="text" value={fields.location} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label htmlFor="description">Description *</label>
        <textarea
          id="description"
          name="description"
          rows={5}
          value={fields.description}
          onChange={handleChange}
        />
        {errors.description && <span className="text-danger">{errors.description}</span>}
      </div>

      <div className={styles.row}>
        <div className="form-group">
          <label htmlFor="image">Image URL</label>
          <input id="image" name="image" type="url" value={fields.image} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label htmlFor="rsvpLimit">RSVP limit</label>
          <input
            id="rsvpLimit"
            name="rsvpLimit"
            type="number"
            min={1}
            placeholder="No limit"
            value={fields.rsvpLimit}
            onChange={handleChange}
          />
          {errors.rsvpLimit && <span className="text-danger">{errors.rsvpLimit}</span>}
        </div>
      </div>

      <div className={styles.actions}>
        <button
          type="button"
          className="btn btn--secondary"
          onClick={(e) => handleSubmit(e, 'draft')}
          disabled={loading}
        >
          Save draft
        </button>
        <button
          type="button"
          className="btn btn--primary"
          onClick={(e) => handleSubmit(e, 'published')}
          disabled={loading}
        >
          {loading ? 'Publishing…' : 'Publish'}
        </button>
      </div>
    </form>
  )
}
