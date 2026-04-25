import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { get } from '../services/api.js'
import EventCard from '../components/events/EventCard.jsx'
import styles from './Home.module.scss'

const CATEGORIES = ['Workshops', 'Career', 'Clubs', 'Sports']

export default function Home() {
  const [posts, setPosts] = useState([])
  const [query, setQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    get('/api/posts')
      .then((data) => setPosts(data.posts ?? []))
      .catch(() => setPosts([]))
      .finally(() => setLoading(false))
  }, [])

  const filtered = posts.filter((p) => {
    const q = query.toLowerCase()
    const matchesQuery = !q || p.title.toLowerCase().includes(q) || p.category?.toLowerCase().includes(q)
    const matchesCategory = !activeCategory || p.category === activeCategory
    return matchesQuery && matchesCategory
  })

  return (
    <div className={styles.home}>
      {/* Hero */}
      <section className={styles.hero}>
        <div className="container">
          <h1>Campus events made simple.</h1>
          <p>Discover, share, and RSVP to everything happening on campus.</p>
          <div className={styles.heroSearch}>
            <input
              type="search"
              placeholder="Search events…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search events"
            />
          </div>
          <div className={styles.heroCta}>
            <Link to="/events/new" className="btn btn--primary btn--lg">Post an Event</Link>
            <a href="#upcoming" className="btn btn--secondary btn--lg">Browse Events</a>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className={styles.categories}>
        <div className="container">
          <h2>Popular Categories</h2>
          <div className={styles.categoryGrid}>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                className={`${styles.categoryChip}${activeCategory === cat ? ` ${styles.categoryChipActive}` : ''}`}
                onClick={() => setActiveCategory(activeCategory === cat ? '' : cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section id="upcoming" className={styles.upcoming}>
        <div className="container">
          <h2>Upcoming Events</h2>
          {loading ? (
            <p className="text-muted">Loading events…</p>
          ) : filtered.length === 0 ? (
            <p className="text-muted">No events found.</p>
          ) : (
            <div className={styles.eventGrid}>
              {filtered.map((post) => (
                <EventCard key={post._id} post={post} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
