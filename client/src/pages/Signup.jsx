import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth.js'
import styles from './Auth.module.scss'

export default function Signup() {
  const { signup, user } = useAuth()
  const navigate = useNavigate()

  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' })
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)

  if (user) {
    navigate('/dashboard', { replace: true })
    return null
  }

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const validate = () => {
    const errs = {}
    if (!form.name.trim()) errs.name = 'Name is required.'
    if (!form.email) errs.email = 'Email is required.'
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Enter a valid email.'
    if (form.password.length < 8) errs.password = 'Password must be at least 8 characters.'
    if (form.password !== form.confirm) errs.confirm = 'Passwords do not match.'
    return errs
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    setErrors(errs)
    if (Object.keys(errs).length > 0) return

    setSubmitting(true)
    try {
      await signup(form.name.trim(), form.email, form.password)
      navigate('/dashboard', { replace: true })
    } catch (err) {
      setErrors({ form: err.message || 'Signup failed.' })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <h1 className={styles.title}>Create your account</h1>
        <p className={styles.sub}>Join CampusConnect today</p>

        <form onSubmit={handleSubmit} noValidate className={styles.form}>
          {errors.form && <p className="text-danger" role="alert">{errors.form}</p>}

          <div className="form-group">
            <label htmlFor="name">Full name</label>
            <input id="name" name="name" type="text" autoComplete="name" value={form.name} onChange={handleChange} />
            {errors.name && <span className="text-danger">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" autoComplete="email" value={form.email} onChange={handleChange} />
            {errors.email && <span className="text-danger">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" autoComplete="new-password" value={form.password} onChange={handleChange} />
            {errors.password && <span className="text-danger">{errors.password}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="confirm">Confirm password</label>
            <input id="confirm" name="confirm" type="password" autoComplete="new-password" value={form.confirm} onChange={handleChange} />
            {errors.confirm && <span className="text-danger">{errors.confirm}</span>}
          </div>

          <button
            type="submit"
            className="btn btn--primary"
            style={{ width: '100%' }}
            disabled={submitting}
          >
            {submitting ? 'Creating account…' : 'Create account'}
          </button>
        </form>

        <p className={styles.switchLink}>
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </div>
    </div>
  )
}
