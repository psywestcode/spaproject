import User from '../models/User.js'
import { signupSchema, loginSchema } from '../../shared/validation.js'

export async function signup(req, res, next) {
  try {
    const parsed = signupSchema.safeParse(req.body)
    if (!parsed.success) {
      return res.status(400).json({ message: parsed.error.issues[0].message })
    }

    const { name, email, password } = parsed.data

    const existing = await User.findOne({ email })
    if (existing) return res.status(409).json({ message: 'Email already in use.' })

    const user = await User.create({ name, email, password })
    req.session.userId = user._id

    res.status(201).json({ user: user.toSafeObject() })
  } catch (err) {
    next(err)
  }
}

export async function login(req, res, next) {
  try {
    const parsed = loginSchema.safeParse(req.body)
    if (!parsed.success) {
      return res.status(400).json({ message: parsed.error.issues[0].message })
    }

    const { email, password } = parsed.data

    const user = await User.findOne({ email })
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid email or password.' })
    }

    req.session.userId = user._id
    res.json({ user: user.toSafeObject() })
  } catch (err) {
    next(err)
  }
}

export async function logout(req, res, next) {
  req.session.destroy((err) => {
    if (err) return next(err)
    res.clearCookie('connect.sid')
    res.json({ message: 'Logged out.' })
  })
}

export async function me(req, res, next) {
  try {
    if (!req.session?.userId) return res.json({ user: null })
    const user = await User.findById(req.session.userId)
    if (!user) return res.json({ user: null })
    res.json({ user: user.toSafeObject() })
  } catch (err) {
    next(err)
  }
}
