import { useTokenStore } from '@/stores/counter'
import { myFetch } from './utils'

type OkResponse = {
  status: 'success'
  token: string
}

type ErrorResponse = {
  status: 'invalid'
  message: string
  violations?: {
    username?: {
      message: string
    }
    password?: {
      message: string
    }
  }
}

export const signup = async (
  username: string,
  password: string
): Promise<OkResponse | ErrorResponse> => {
  const res = await myFetch('/api/v1/auth/signup', 'POST', { username, password })
  return await res.json()
}

export const signin = async (
  username: string,
  password: string
): Promise<OkResponse | ErrorResponse> => {
  const res = await myFetch('/api/v1/auth/signin', 'POST', { username, password })
  return await res.json()
}

export const signout = async (): Promise<OkResponse | ErrorResponse> => {
  const res = await myFetch('/api/v1/auth/signout', 'POST')
  return await res.json()
}
