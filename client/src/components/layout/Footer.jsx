import styles from './Footer.module.scss'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <p className={styles.copy}>© {new Date().getFullYear()} CampusConnect</p>
        <nav aria-label="Footer navigation" className={styles.nav}>
          <a href="#">Contact</a>
          <a href="#">Help</a>
          <a href="#">Privacy</a>
          <a href="#">Accessibility</a>
        </nav>
      </div>
    </footer>
  )
}
