import type Scores from '@/models/Scores'
import type { GameSlug } from '@/models/games'
import type Games from '@/models/games'
import { host, myFetch } from './utils'
import { useTokenStore } from '@/stores/counter'

export const storagePathCorrection = (path?: string) =>
  path ? `${host}${path.replace(/\/games\//, '/game/').replace(/\/v\d+\//, '/')}` : undefined

export const getGames = async (sortBy?: string, sortDir?: string, page?: number, size?: number) => {
  const query = `?sortBy=${sortBy}&sortDir=${sortDir}&page=${page}&size=${size}`
  const res = await myFetch('/api/v1/games' + query, 'GET')
  return (await res.json()) as Games
}

export const getGameSlug = async (slugName?: string) => {
  const res = await myFetch('/api/v1/games/' + slugName, 'GET')
  return (await res.json()) as GameSlug
}

export const getScores = async (slugName?: string) => {
  const res = await myFetch('/api/v1/games/' + slugName + '/scores', 'GET')
  return (await res.json()) as Scores
}

export type SlugOk = {
  status: 'success'
  slug: string
}

export type SlugError = {
  status: 'invalid' | 'forbidden'
  slug?: string
  message?: string
  violations?: {
    title?: {
      message: string
    }
    description?: {
      message: string
    }
  }
}

export const postGameSlug = async (
  title: string,
  description: string
): Promise<SlugOk | SlugError> => {
  const res = await myFetch('/api/v1/games', 'POST', { title, description })
  return await res.json()
}

export const putGameSlug = async (
  slugName: string,
  title: string,
  description: string
): Promise<SlugOk | SlugError> => {
  const res = await myFetch('/api/v1/games/' + slugName, 'PUT', { title, description })
  return await res.json()
}

export const deleteGameSlug = async (slugName: string): Promise<SlugOk | SlugError> => {
  const res = await myFetch('/api/v1/games/' + slugName, 'DELETE')
  if (res.ok)
    return {
      status: 'success',
      slug: ''
    }
  return await res.json()
}

export const postScore = async (slugName: string, score: string): Promise<SlugOk | SlugError> => {
  const res = await myFetch('/api/v1/games/' + slugName + '/scores', 'POST', { score })
  return await res.json()
}

export type UploadOk = {
  status: 'success'
}

export type UploadError = {
  status: 'invalid'
  message?: string
  violations?: {
    zipfile?: {
      message: string
    }
    token?: {
      message: string
    }
  }
}

export const uploadGame = async (
  slugName: string,
  zipfile: File
): Promise<UploadOk | UploadError> => {
  const headers = new Headers()
  if (useTokenStore().token) headers.append('Authorization', 'Bearer ' + useTokenStore().token)
  headers.append('Accept', 'application/json')

  const form = new FormData()
  form.append('zipfile', zipfile)
  form.append('token', useTokenStore().token)

  const res = await fetch(host + '/api/v1/games/' + slugName + '/upload', {
    headers,
    method: 'POST',
    body: form
  })
  if (res.ok)
    return {
      status: 'success'
    }
  return await res.json()
}
