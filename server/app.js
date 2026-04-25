import express from 'express'
import cors from 'cors'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import authRoutes from './routes/auth.js'
import postRoutes from './routes/posts.js'

const app = express()

app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
}))

app.use(express.json())

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  },
}))

app.use('/api/auth', authRoutes)
app.use('/api/posts', postRoutes)

app.use((err, _req, res, _next) => {
  const status = err.status ?? 500
  res.status(status).json({ message: err.message || 'Internal server error' })
})

export default app
