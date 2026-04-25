import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { get, del } from '../services/api.js'
import styles from './Dashboard.module.scss'

const FILTERS = ['All', 'Published', 'Drafts']

export default function Dashboard() {
  const [posts, setPosts] = useState([])
  const [filter, setFilter] = useState('All')
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)

  const load = () => {
    setLoading(true)
    get('/api/posts/mine')
      .then((data) => setPosts(data.posts ?? []))
      .catch(() => setPosts([]))
      .finally(() => setLoading(false))
  }

  useEffect(load, [])

  const handleDelete = async (id) => {
    if (!confirm('Delete this post?')) return
    try {
      await del(`/api/posts/${id}`)
      setPosts((p) => p.filter((post) => post._id !== id))
    } catch {
      alert('Could not delete post.')
    }
  }

  const visible = posts.filter((p) => {
    if (filter === 'Published' && p.status !== 'published') return false
    if (filter === 'Drafts' && p.status !== 'draft') return false
    if (search && !p.title.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  const counts = {
    published: posts.filter((p) => p.status === 'published').length,
    draft: posts.filter((p) => p.status === 'draft').length,
  }

  return (
    <div className="page">
      <div className={styles.header}>
        <div className="page-header">
          <h1>My Posts</h1>
          <p>Manage your campus events and posts</p>
        </div>
        <Link to="/events/new" className="btn btn--primary">+ New Post</Link>
      </div>

      {/* Stats */}
      <div className={styles.stats}>
        <div className="card">
          <p className={styles.statNum}>{posts.length}</p>
          <p className={styles.statLabel}>Total</p>
        </div>
        <div className="card">
          <p className={styles.statNum}>{counts.published}</p>
          <p className={styles.statLabel}>Published</p>
        </div>
        <div className="card">
          <p className={styles.statNum}>{counts.draft}</p>
          <p className={styles.statLabel}>Drafts</p>
        </div>
      </div>

      {/* Filters */}
      <div className={styles.toolbar}>
        <div className={styles.filterTabs}>
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`${styles.tab} ${filter === f ? styles.tabActive : ''}`}
            >
              {f}
            </button>
          ))}
        </div>
        <input
          type="search"
          placeholder="Search my posts…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={styles.searchInput}
          aria-label="Search posts"
        />
      </div>

      {/* Post list */}
      {loading ? (
        <p className="text-muted">Loading…</p>
      ) : visible.length === 0 ? (
        <p className="text-muted">No posts found.</p>
      ) : (
        <div className={styles.list}>
          {visible.map((post) => (
            <div key={post._id} className={styles.row}>
              <div className={styles.rowInfo}>
                <p className={styles.rowTitle}>{post.title}</p>
                <p className={styles.rowMeta}>
                  {new Date(post.date).toLocaleDateString('en-AU')} · {post.category ?? '—'}
                </p>
              </div>
              <span className={`badge badge--${post.status}`}>{post.status}</span>
              <div className={styles.rowActions}>
                <Link to={`/events/${post._id}/edit`} className="btn btn--ghost btn--sm">Edit</Link>
                <button
                  onClick={() => handleDelete(post._id)}
                  className="btn btn--danger btn--sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
