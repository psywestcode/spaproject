const BASE = ''

async function request(method, path, body) {
  const opts = {
    method,
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
  }
  if (body !== undefined) opts.body = JSON.stringify(body)

  const res = await fetch(`${BASE}${path}`, opts)
  const data = await res.json().catch(() => ({}))

  if (!res.ok) {
    const err = new Error(data.message || `Request failed: ${res.status}`)
    err.status = res.status
    err.data = data
    throw err
  }
  return data
}

export const get  = (path)        => request('GET',    path)
export const post = (path, body)  => request('POST',   path, body)
export const put  = (path, body)  => request('PUT',    path, body)
export const del  = (path)        => request('DELETE', path)
