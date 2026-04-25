import Post from '../models/Post.js'
import { postSchema } from '../../shared/validation.js'

export async function listPublished(_req, res, next) {
  try {
    const posts = await Post.find({ status: 'published' })
      .sort({ date: 1 })
      .populate('author', 'name')
    res.json({ posts })
  } catch (err) {
    next(err)
  }
}

export async function listMine(req, res, next) {
  try {
    const posts = await Post.find({ author: req.session.userId })
      .sort({ updatedAt: -1 })
    res.json({ posts })
  } catch (err) {
    next(err)
  }
}

export async function getOne(req, res, next) {
  try {
    const post = await Post.findById(req.params.id).populate('author', 'name')
    if (!post) return res.status(404).json({ message: 'Post not found.' })
    res.json({ post })
  } catch (err) {
    next(err)
  }
}

export async function create(req, res, next) {
  try {
    const parsed = postSchema.safeParse(req.body)
    if (!parsed.success) {
      return res.status(400).json({ message: parsed.error.issues[0].message })
    }

    const post = await Post.create({ ...parsed.data, author: req.session.userId })
    res.status(201).json({ post })
  } catch (err) {
    next(err)
  }
}

export async function update(req, res, next) {
  try {
    const post = await Post.findById(req.params.id)
    if (!post) return res.status(404).json({ message: 'Post not found.' })

    const isOwner = post.author.toString() === req.session.userId.toString()
    const isAdmin = req.session.userRole === 'admin'
    if (!isOwner && !isAdmin) return res.status(403).json({ message: 'Forbidden.' })

    const parsed = postSchema.safeParse(req.body)
    if (!parsed.success) {
      return res.status(400).json({ message: parsed.error.issues[0].message })
    }

    Object.assign(post, parsed.data)
    await post.save()
    res.json({ post })
  } catch (err) {
    next(err)
  }
}

export async function remove(req, res, next) {
  try {
    const post = await Post.findById(req.params.id)
    if (!post) return res.status(404).json({ message: 'Post not found.' })

    const isOwner = post.author.toString() === req.session.userId.toString()
    const isAdmin = req.session.userRole === 'admin'
    if (!isOwner && !isAdmin) return res.status(403).json({ message: 'Forbidden.' })

    await post.deleteOne()
    res.json({ message: 'Deleted.' })
  } catch (err) {
    next(err)
  }
}
