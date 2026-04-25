import { useState, useEffect, useCallback } from 'react'
import { get, post, put, del } from '../services/api.js'

export function usePosts() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const load = useCallback(() => {
    setLoading(true)
    get('/api/posts')
      .then((data) => { setPosts(data.posts ?? []); setError(null) })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  useEffect(load, [load])

  const createPost = (fields) => post('/api/posts', fields)
  const updatePost = (id, fields) => put(`/api/posts/${id}`, fields)
  const deletePost = (id) => del(`/api/posts/${id}`)

  return { posts, loading, error, createPost, updatePost, deletePost, reload: load }
}
