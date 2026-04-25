import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth.js'
import styles from './Navbar.module.scss'

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate('/')
  }

  return (
    <header className={styles.navbar}>
      <div className={styles.inner}>
        <Link to="/" className={styles.brand}>
          CampusConnect
        </Link>

        <nav className={styles.nav} aria-label="Main navigation">
          <NavLink to="/" end className={({ isActive }) => isActive ? styles.activeLink : styles.link}>Home</NavLink>
          {user && (
            <NavLink to="/dashboard" className={({ isActive }) => isActive ? styles.activeLink : styles.link}>
              Dashboard
            </NavLink>
          )}
        </nav>

        <div className={styles.actions}>
          {user ? (
            <>
              <span className={styles.userName}>{user.name}</span>
              <Link to="/events/new" className="btn btn--primary btn--sm">+ Post Event</Link>
              <button onClick={handleLogout} className="btn btn--ghost btn--sm">Log out</button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn--ghost btn--sm">Log in</Link>
              <Link to="/signup" className="btn btn--primary btn--sm">Sign up</Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
