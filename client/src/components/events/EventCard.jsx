import styles from './EventCard.module.scss'

export default function EventCard({ post }) {
  const date = new Date(post.date).toLocaleDateString('en-AU', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })

  return (
    <article className={styles.card}>
      {post.image && (
        <img src={post.image} alt={post.title} className={styles.image} />
      )}
      <div className={styles.body}>
        {post.category && (
          <span className={styles.category}>{post.category}</span>
        )}
        <h3 className={styles.title}>{post.title}</h3>
        <p className={styles.meta}>{date}{post.location ? ` · ${post.location}` : ''}</p>
        <p className={styles.description}>{post.description}</p>
      </div>
    </article>
  )
}
