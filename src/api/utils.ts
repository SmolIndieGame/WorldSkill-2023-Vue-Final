import { useTokenStore } from '@/stores/counter'

export const host = 'http://localhost:8000/module_c_solution'

export const myFetch = (
  path: string,
  method: string,
  body?: any,
  extraHeaders?: Record<string, string>
) => {
  const headers = new Headers()
  headers.append('Content-Type', 'application/json')
  if (useTokenStore().token) headers.append('Authorization', 'Bearer ' + useTokenStore().token)
  headers.append('Accept', 'application/json')
  for (const key in extraHeaders) {
    headers.append(key, extraHeaders[key])
  }
  console.log(host + path)
  return fetch(host + path, { headers, method, body: JSON.stringify(body) })
}
