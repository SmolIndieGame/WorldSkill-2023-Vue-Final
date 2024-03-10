import { myFetch } from './utils'

export type AuthOk = {
  status: 'success'
  token: string
}

export type AuthError = {
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

export const signUp = async (username: string, password: string): Promise<AuthOk | AuthError> => {
  const res = await myFetch('/api/v1/auth/signup', 'POST', { username, password })
  return await res.json()
}

export const signIn = async (username: string, password: string): Promise<AuthOk | AuthError> => {
  const res = await myFetch('/api/v1/auth/signin', 'POST', { username, password })
  return await res.json()
}

export const signOut = async (): Promise<AuthOk | AuthError> => {
  const res = await myFetch('/api/v1/auth/signout', 'POST')
  return await res.json()
}
